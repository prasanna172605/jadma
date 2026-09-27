import { Request, Response } from 'express';
import { prisma } from '../../db.js';
import crypto from 'crypto';

// PhonePe helper variables
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_CLIENT_ID || 'PGTESTPAYUAT86';
const PHONEPE_SALT_KEY = process.env.PHONEPE_CLIENT_SECRET || '96434309-7796-489d-8924-ab56988a6076';
const PHONEPE_SALT_INDEX = process.env.PHONEPE_CLIENT_VERSION || '1';
const PHONEPE_ENV = process.env.PHONEPE_ENV || 'SANDBOX';

const PHONEPE_URL = PHONEPE_ENV === 'PRODUCTION' 
  ? 'https://api.phonepe.com/apis/hermes/pg/v1/pay'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, error: { message: 'Course ID is required' } });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course || course.status !== 'PUBLISHED') {
      return res.status(404).json({ success: false, error: { message: 'Course not found or not published' } });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: course.id } }
    });

    if (existingEnrollment && existingEnrollment.status === 'ACTIVE') {
      return res.status(400).json({ success: false, error: { message: 'Already enrolled in this course' } });
    }

    if (course.isFree || course.price === 0) {
      // Free course logic handled separately via enrollments endpoint, but we can catch it here just in case.
      return res.status(400).json({ success: false, error: { message: 'This course is free. Use the free enrollment endpoint.' } });
    }

    const merchantTransactionId = `MT_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    
    // Store payment as PENDING
    await prisma.payment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        merchantOrderId: merchantTransactionId,
        amount: course.price,
        gateway: 'PHONEPE',
        status: 'PENDING'
      }
    });

    // Prepare PhonePe payload
    const payload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: user.id,
      amount: course.price * 100, // PhonePe expects amount in paise
      redirectUrl: `${process.env.FRONTEND_URL}/payment/status/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${process.env.API_BASE_URL}/payments/callback`,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const endpoint = '/pg/v1/pay';
    const stringToHash = base64Payload + endpoint + PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = `${sha256}###${PHONEPE_SALT_INDEX}`;

    // Actually, rather than making the server-to-server call to PhonePe from here, we can just return the base64 and checksum for the frontend to post, OR we can make the server-to-server call here to get the redirect url and send it to the frontend.
    // Making the S2S call:
    const response = await fetch(PHONEPE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'accept': 'application/json'
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const data = await response.json() as any;

    if (data.success && data.data && data.data.instrumentResponse && data.data.instrumentResponse.redirectInfo) {
      const redirectUrl = data.data.instrumentResponse.redirectInfo.url;
      res.json({ success: true, data: { redirectUrl, merchantTransactionId } });
    } else {
      console.error("PhonePe Create Order Failed:", data);
      res.status(500).json({ success: false, error: { message: 'Failed to initiate payment' } });
    }
  } catch (err) {
    console.error('createOrder error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const paymentCallback = async (req: Request, res: Response) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res.status(400).send("No response");
    }

    const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
    const parsedResponse = JSON.parse(decodedResponse);

    const merchantTransactionId = parsedResponse.data.merchantTransactionId;
    const transactionId = parsedResponse.data.transactionId;
    const state = parsedResponse.code; // e.g. PAYMENT_SUCCESS
    
    // Verify checksum provided in headers
    const checksum = req.headers['x-verify'] as string;
    const expectedChecksum = crypto.createHash('sha256').update(response + PHONEPE_SALT_KEY).digest('hex') + '###' + PHONEPE_SALT_INDEX;
    
    if (checksum !== expectedChecksum) {
      return res.status(400).send("Invalid checksum");
    }

    // Process payment in a transaction
    await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({ where: { merchantOrderId: merchantTransactionId } });
      if (!payment || payment.status === 'SUCCESS') return; // Idempotent

      const isSuccess = state === 'PAYMENT_SUCCESS';

      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: isSuccess ? 'SUCCESS' : 'FAILED',
          gatewayTransactionId: transactionId,
          paymentResponse: decodedResponse,
          paidAt: isSuccess ? new Date() : null
        }
      });

      if (isSuccess) {
        // Enroll user
        await tx.enrollment.upsert({
          where: { userId_courseId: { userId: payment.userId, courseId: payment.courseId } },
          update: { status: 'ACTIVE', paymentId: payment.id },
          create: {
            userId: payment.userId,
            courseId: payment.courseId,
            paymentId: payment.id,
            status: 'ACTIVE'
          }
        });
      }
    });

    res.send("OK");
  } catch (err) {
    console.error('paymentCallback error:', err);
    res.status(500).send("Error");
  }
};

export const checkPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { merchantOrderId } = req.params;
    const payment = await prisma.payment.findUnique({ where: { merchantOrderId } });
    
    if (!payment) {
      return res.status(404).json({ success: false, error: { message: 'Payment not found' } });
    }
    
    // In a real scenario you would also check status API of PhonePe if status is still PENDING
    // For this implementation, we will just return our DB status since the webhook handles the update
    
    res.json({ success: true, data: { status: payment.status, courseId: payment.courseId } });
  } catch (err) {
    console.error('checkPaymentStatus error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};
