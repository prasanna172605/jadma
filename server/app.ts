import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRoutes from './modules/auth/auth.routes.js';
import courseRoutes from './modules/courses/course.routes.js';
import paymentRoutes from './modules/payments/payment.routes.js';
import enrollmentRoutes from './modules/enrollments/enrollment.routes.js';
import progressRoutes from './modules/progress/progress.routes.js';
import blogRoutes from './modules/blog/blog.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';
import dbRoutes from './modules/admin/db.routes.js';
import reviewsRoutes from './modules/reviews/reviews.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

app.get('/api/v1/settings', async (req, res) => {
  try {
    const settings = await prisma.systemSetting.findMany();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/v1/me', progressRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/db-admin', dbRoutes);
app.use('/api/v1/reviews', reviewsRoutes);

export default app;
