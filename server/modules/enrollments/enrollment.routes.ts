import { Router } from 'express';
import { enrollFreeCourse } from './enrollment.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/free', authenticate, enrollFreeCourse);

export default router;
