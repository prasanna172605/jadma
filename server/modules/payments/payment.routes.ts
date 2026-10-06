import { Router } from 'express';
import {
  createOrder,
  verifyRazorpayPayment,
  razorpayWebhook,
  checkPaymentStatus,
} from './payment.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

// 1. Create order on Razorpay (Primary customer payment entry)
router.post('/create-order', authenticate, createOrder);

// 2. Razorpay payment verification callback (Standard Checkout success verification)
router.post('/razorpay/verify', authenticate, verifyRazorpayPayment);

// 3. Razorpay webhook endpoint (Server-to-server asynchronous status events)
router.post('/razorpay/webhook', razorpayWebhook);

// 4. Check payment status by order ID (for student polling & status view)
router.get('/:merchantOrderId/status', authenticate, checkPaymentStatus);

export default router;
