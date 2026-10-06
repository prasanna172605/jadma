import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../../db.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { BrevoService } from '../../services/email/brevo.service.js';

const generateTokens = (user: any) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'supersecret_jwt_key',
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || 'supersecret_refresh_key',
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);
    const email = validated.email.trim().toLowerCase();
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'Email already exists' } });
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validated.name.trim(),
        email,
        phone: validated.phone.trim(),
        passwordHash,
      }
    });

    // Add registered student to Brevo marketing list in the background
    BrevoService.addContactToMarketingList(user.email, user.name).catch(err => {
      console.error('[AuthController] Failed to add contact to Brevo marketing list:', err);
    });

    res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: 'Validation error', details: (err as any).errors } });
    }
    console.error('Register error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.parse(req.body);
    const email = validated.email.trim().toLowerCase();
    
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { enrollments: { select: { courseId: true } } }
    });
    if (!user) {
      console.warn(`[Auth:Login] Login failed: User with email "${validated.email}" not found.`);
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials or inactive account' } });
    }

    if (!user.isActive) {
      console.warn(`[Auth:Login] Login failed: User "${validated.email}" is marked inactive.`);
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials or inactive account' } });
    }

    const isValid = await bcrypt.compare(validated.password, user.passwordHash);
    if (!isValid) {
      console.warn(`[Auth:Login] Login failed: Password comparison failed for "${validated.email}". Hash format: ${user.passwordHash.substring(0, 4)}`);
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

        prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    }).catch(console.error);

    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

        res.json({ 
      success: true, 
      data: { 
        token: accessToken,
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          phone: user.phone,
          role: user.role, 
          avatarUrl: user.avatarUrl,
          enrolledCourses: user.enrollments.map(e => e.courseId) 
        } 
      } 
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: 'Validation error', details: (err as any).errors } });
    }
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, error: { message: 'No refresh token provided' } });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'supersecret_refresh_key') as any;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: { message: 'Invalid refresh token or inactive account' } });
    }

    const tokens = generateTokens(user);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, data: { token: tokens.accessToken } });
  } catch (err) {
    res.status(401).json({ success: false, error: { message: 'Invalid or expired refresh token' } });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, data: { message: 'Logged out successfully' } });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: (req as any).user.id },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        phone: true,
        role: true, 
        avatarUrl: true,
        enrollments: {
          select: { courseId: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }

    const formattedUser = {
      ...user,
      enrolledCourses: user.enrollments.map(e => e.courseId)
    };
    delete (formattedUser as any).enrollments;

    res.json({ success: true, data: formattedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, phone } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, error: { message: 'Name is required' } });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, phone }
    });

    res.json({ success: true, data: { name: user.name, phone: user.phone } });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

