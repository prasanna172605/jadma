import { Router } from 'express';
import { getCourseProgress, updateLessonProgress, getMyEnrollments, getDashboard, getCertificates } from './progress.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();


router.get('/dashboard', authenticate, getDashboard);
router.get('/certificates', authenticate, getCertificates);
router.get('/enrollments', authenticate, getMyEnrollments);
router.get('/courses/:courseId/progress', authenticate, getCourseProgress);
router.post('/lessons/:lessonId/progress', authenticate, updateLessonProgress);

export default router;
