import crypto from 'crypto';

/**
 * Isolated PhonePe Service (Inactive / Dormant)
 * Preserved for future integration requirements without active customer exposure.
 */
export class PhonePeService {
  private merchantId: string;
  private saltKey: string;
  private saltIndex: string;
  private env: string;

  constructor() {
    this.merchantId = process.env.PHONEPE_CLIENT_ID || '';
    this.saltKey = process.env.PHONEPE_CLIENT_SECRET || '';
    this.saltIndex = process.env.PHONEPE_CLIENT_VERSION || '1';
    this.env = process.env.PHONEPE_ENV || 'SANDBOX';
  }

  public getUrl(): string {
    return this.env === 'PRODUCTION'
      ? 'https://api.phonepe.com/apis/hermes/pg/v1/pay'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
  }

  public verifyChecksum(payload: string, checksumHeader: string): boolean {
    if (!this.saltKey) return false;
    const expectedChecksum =
      crypto.createHash('sha256').update(payload + this.saltKey).digest('hex') +
      '###' +
      this.saltIndex;
    return checksumHeader === expectedChecksum;
  }
}

export const phonePeService = new PhonePeService();
