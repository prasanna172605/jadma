import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../../db.js';
import { registerSchema, loginSchema } from './auth.validation.js';

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
    
    const existing = await prisma.user.findUnique({ where: { email: validated.email } });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'Email already exists' } });
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        passwordHash,
      }
    });

    res.json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: 'Validation error', details: err.errors } });
    }
    console.error('Register error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.parse(req.body);
    
        const user = await prisma.user.findUnique({ 
      where: { email: validated.email },
      include: { enrollments: { select: { courseId: true } } }
    });
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials or inactive account' } });
    }

    const isValid = await bcrypt.compare(validated.password, user.passwordHash);
    if (!isValid) {
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
          role: user.role, 
          avatarUrl: user.avatarUrl,
          enrolledCourses: user.enrollments.map(e => e.courseId) 
        } 
      } 
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { message: 'Validation error', details: err.errors } });
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
