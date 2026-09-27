import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import { prisma } from './server/db.js';
import authRoutes from './server/modules/auth/auth.routes.js';
import courseRoutes from './server/modules/courses/course.routes.js';
import paymentRoutes from './server/modules/payments/payment.routes.js';
import enrollmentRoutes from './server/modules/enrollments/enrollment.routes.js';
import progressRoutes from './server/modules/progress/progress.routes.js';
import blogRoutes from './server/modules/blog/blog.routes.js';
import adminRoutes from './server/modules/admin/admin.routes.js';
import dbRoutes from './server/modules/admin/db.routes.js';
import reviewsRoutes from './server/modules/reviews/reviews.routes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for dev, configure properly in prod
  }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
