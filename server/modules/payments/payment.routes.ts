import { Router } from 'express';
import { createOrder, paymentCallback, checkPaymentStatus } from './payment.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/create-order', authenticate, createOrder);
router.post('/callback', paymentCallback); // Webhook, no auth required
router.get('/:merchantOrderId/status', authenticate, checkPaymentStatus);

export default router;
