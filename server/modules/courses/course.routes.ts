import { Router } from 'express';
import { getCourses, getCourseBySlug } from './course.controller.js';

const router = Router();

router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);

export default router;
