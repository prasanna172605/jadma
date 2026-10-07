import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export interface CreateRazorpayOrderParams {
  amountInPaise: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface VerifyRazorpaySignatureParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

const cleanEnv = (val?: string): string => {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '');
};

export class RazorpayService {
  private static instance: RazorpayService;
  private client: Razorpay | null = null;
  private keyId: string = '';
  private keySecret: string = '';
  private webhookSecret: string = '';

  private constructor() {
    this.refreshCredentials();
  }

  public static getInstance(): RazorpayService {
    if (!RazorpayService.instance) {
      RazorpayService.instance = new RazorpayService();
    }
    return RazorpayService.instance;
  }

  private refreshCredentials(): void {
    dotenv.config();
    this.keyId = cleanEnv(process.env.RAZORPAY_KEY_ID);
    this.keySecret = cleanEnv(process.env.RAZORPAY_KEY_SECRET);
    this.webhookSecret = cleanEnv(process.env.RAZORPAY_WEBHOOK_SECRET);

    if (this.keyId && this.keySecret) {
      this.client = new Razorpay({
        key_id: this.keyId,
        key_secret: this.keySecret,
      });
      const isTest = this.keyId.startsWith('rzp_test_');
      console.log(`[RazorpayService] Initialized with Key ID: ${this.keyId.substring(0, 8)}... (${isTest ? 'TEST MODE' : 'PRODUCTION'})`);
    } else {
      this.client = null;
      console.warn('[RazorpayService] Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment.');
    }
  }

  public getKeyId(): string {
    const raw = cleanEnv(process.env.RAZORPAY_KEY_ID) || this.keyId;
    return raw;
  }

  public isConfigured(): boolean {
    const kid = cleanEnv(process.env.RAZORPAY_KEY_ID) || this.keyId;
    const ksec = cleanEnv(process.env.RAZORPAY_KEY_SECRET) || this.keySecret;
    return Boolean(kid && ksec);
  }

  private getClient(): Razorpay {
    const currentKeyId = cleanEnv(process.env.RAZORPAY_KEY_ID);
    const currentKeySecret = cleanEnv(process.env.RAZORPAY_KEY_SECRET);

    if (!this.client || currentKeyId !== this.keyId || currentKeySecret !== this.keySecret) {
      this.refreshCredentials();
    }

    if (!this.client) {
      throw new Error('Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are missing or invalid.');
    }

    return this.client;
  }

  /**
   * Create an order on Razorpay
   */
  public async createOrder(params: CreateRazorpayOrderParams) {
    const rzp = this.getClient();
    const options: any = {
      amount: Math.round(params.amountInPaise),
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
      // Enforce the specific payment configuration created in the Dashboard
      // This MUST be applied server-side during order creation.
      checkout_config_id: 'config_TkzeThxteaJycd',
    };

    try {
      const order = await rzp.orders.create(options);
      return order;
    } catch (err: any) {
      console.error('[RazorpayService:createOrder:Failed]', err?.error || err);
      const detail = err?.error?.description || err?.message || 'Razorpay order creation failed';
      throw new Error(`Razorpay error: ${detail}`);
    }
  }

  /**
   * Fetch an order from Razorpay
   */
  public async getOrder(orderId: string) {
    const rzp = this.getClient();
    return await rzp.orders.fetch(orderId);
  }

  /**
   * Fetch a payment from Razorpay
   */
  public async getPayment(paymentId: string) {
    const rzp = this.getClient();
    return await rzp.payments.fetch(paymentId);
  }

  /**
   * Verify standard checkout signature
   * HMAC_SHA256(order_id + "|" + razorpay_payment_id, secret)
   */
  public verifyPaymentSignature(params: VerifyRazorpaySignatureParams): boolean {
    const secret = cleanEnv(process.env.RAZORPAY_KEY_SECRET) || this.keySecret;
    if (!secret) {
      throw new Error('RAZORPAY_KEY_SECRET is not configured for signature verification');
    }

    const payload = `${params.orderId}|${params.paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const genBuf = Buffer.from(generatedSignature, 'utf-8');
    const sigBuf = Buffer.from(params.signature, 'utf-8');

    if (genBuf.length !== sigBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(genBuf, sigBuf);
  }

  /**
   * Verify webhook event signature
   * HMAC_SHA256(raw_body, webhook_secret)
   */
  public verifyWebhookSignature(rawBody: string, signature: string): boolean {
    const secret = cleanEnv(process.env.RAZORPAY_WEBHOOK_SECRET) || this.webhookSecret;
    if (!secret) {
      throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured for webhook verification');
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const genBuf = Buffer.from(generatedSignature, 'utf-8');
    const sigBuf = Buffer.from(signature, 'utf-8');

    if (genBuf.length !== sigBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(genBuf, sigBuf);
  }
}

export const razorpayService = RazorpayService.getInstance();
