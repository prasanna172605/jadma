import { Router } from 'express';
import { getReviews } from './reviews.controller.js';

const router = Router();

router.get('/', getReviews);

export default router;
