import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key') as any;
    
    // Load fresh user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: { message: 'Unauthorized: Account inactive or not found' } });
    }
    
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: { message: 'Invalid or expired token' } });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ success: false, error: { message: 'Forbidden: Insufficient permissions' } });
    }
    next();
  };
};

export const requireAdmin = authorize(['admin', 'super_admin']);
export const requireSuperAdmin = authorize(['super_admin']);
