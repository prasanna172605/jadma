import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../../db.js';
import { z } from 'zod';
import { sendPasswordResetEmail, sendPasswordChangedEmail } from '../../services/email/email.service.js';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: "This email address is not registered with us. Please register first to create an account."
        }
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        error: {
          message: "This account has been deactivated. Please contact support."
        }
      });
    }

    // Invalidate existing unused tokens for this user
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() }
    });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = await bcrypt.hash(rawToken, 10);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt
      }
    });

    let frontendUrl = process.env.FRONTEND_URL;
    if (frontendUrl && (frontendUrl.includes('frontend_url=') || frontendUrl === '/')) {
      frontendUrl = '';
    }
    if (!frontendUrl) {
      frontendUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
        : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173');
    }

    const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}&id=${user.id}`;

    await sendPasswordResetEmail(user.email, resetUrl, user.name);

    res.json({
      success: true,
      message: "Password reset instructions have been sent to your email address."
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: 'Invalid email address' } });
    }
    console.error('forgotPassword error:', err);
    res.status(500).json({ success: false, error: { message: 'Internal server error' } });
  }
};

const resetPasswordSchema = z.object({
  userId: z.string().uuid(),
  token: z.string(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Password must contain uppercase, lowercase and a number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { userId, token, password } = resetPasswordSchema.parse(req.body);

    const resetTokenRecord = await prisma.passwordResetToken.findFirst({
      where: { 
        userId,
        usedAt: null,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!resetTokenRecord) {
      return res.status(400).json({ success: false, error: { message: 'This password reset link is invalid or has expired.' } });
    }

    const isValidToken = await bcrypt.compare(token, resetTokenRecord.tokenHash);
    if (!isValidToken) {
      return res.status(400).json({ success: false, error: { message: 'This password reset link is invalid or has expired.' } });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { passwordHash }
      }),
      prisma.passwordResetToken.update({
        where: { id: resetTokenRecord.id },
        data: { usedAt: new Date() }
      }),
      // Invalidate existing sessions in RefreshSession if we were using it (we are now starting to use it or just stateless)
      prisma.refreshSession.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() }
      })
    ]);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      await sendPasswordChangedEmail(user.email, user.name);
    }

    res.json({
      success: true,
      message: "Your password has been reset successfully."
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: (err as any).errors[0].message } });
    }
    console.error('resetPassword error:', err);
    res.status(500).json({ success: false, error: { message: 'Internal server error' } });
  }
};

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Password must contain uppercase, lowercase and a number'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userContext = (req as any).user;
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: userContext.id } });
    if (!user) {
      return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: { message: 'Incorrect current password' } });
    }
    
    if (currentPassword === newPassword) {
        return res.status(400).json({ success: false, error: { message: 'New password must be different from current password' } });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash }
      }),
      prisma.refreshSession.updateMany({
        where: { userId: user.id, revokedAt: null },
        data: { revokedAt: new Date() }
      })
    ]);

    await sendPasswordChangedEmail(user.email, user.name);

    res.json({
      success: true,
      message: "Your password has been changed successfully."
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: (err as any).errors[0].message } });
    }
    console.error('changePassword error:', err);
    res.status(500).json({ success: false, error: { message: 'Internal server error' } });
  }
};
