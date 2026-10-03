import Razorpay from 'razorpay';
import crypto from 'crypto';

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

export class RazorpayService {
  private static instance: RazorpayService;
  private client: Razorpay | null = null;
  private keyId: string;
  private keySecret: string;
  private webhookSecret: string;

  private constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || '';
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';
    this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

    if (this.keyId && this.keySecret) {
      this.client = new Razorpay({
        key_id: this.keyId,
        key_secret: this.keySecret,
      });
    }
  }

  public static getInstance(): RazorpayService {
    if (!RazorpayService.instance) {
      RazorpayService.instance = new RazorpayService();
    }
    return RazorpayService.instance;
  }

  public getKeyId(): string {
    return this.keyId;
  }

  public isConfigured(): boolean {
    return Boolean(this.keyId && this.keySecret);
  }

  private getClient(): Razorpay {
    if (!this.client) {
      // Re-read in case env vars were set after load
      this.keyId = process.env.RAZORPAY_KEY_ID || '';
      this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';
      this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

      if (!this.keyId || !this.keySecret) {
        throw new Error('Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are not configured.');
      }
      this.client = new Razorpay({
        key_id: this.keyId,
        key_secret: this.keySecret,
      });
    }
    return this.client;
  }

  /**
   * Create an order on Razorpay
   */
  public async createOrder(params: CreateRazorpayOrderParams) {
    const rzp = this.getClient();
    const options = {
      amount: Math.round(params.amountInPaise),
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
    };

    const order = await rzp.orders.create(options);
    return order;
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
    if (!this.keySecret) {
      this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';
    }
    if (!this.keySecret) {
      throw new Error('RAZORPAY_KEY_SECRET is not configured for signature verification');
    }

    const payload = `${params.orderId}|${params.paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', this.keySecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'utf-8'),
      Buffer.from(params.signature, 'utf-8')
    );
  }

  /**
   * Verify webhook event signature
   * HMAC_SHA256(raw_body, webhook_secret)
   */
  public verifyWebhookSignature(rawBody: string, signature: string): boolean {
    const secret = this.webhookSecret || process.env.RAZORPAY_WEBHOOK_SECRET || '';
    if (!secret) {
      throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured for webhook verification');
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  }
}

export const razorpayService = RazorpayService.getInstance();
