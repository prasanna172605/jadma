import { createSmtpTransporter, getFromAddress } from './smtp.provider.js';

interface BrevoEmailResponse {
  messageId: string;
}

/**
 * Brevo Integration Service
 * 
 * Implements:
 * 1. Transactional Emails (via API / SMTP)
 * 2. Email Validation & Marketing Lists
 * 3. Course suggestion emails to students
 */
export class BrevoService {
  private static getApiKey(): string {
    return (process.env.BREVO_API_KEY || '').trim();
  }

  private static getMarketingListId(): number {
    return parseInt(process.env.BREVO_MARKETING_LIST_ID || '1', 10);
  }

  /**
   * Check if Brevo API is configured
   */
  public static isConfigured(): boolean {
    return this.getApiKey() !== '';
  }

  /**
   * Run a diagnostic self-test to verify Brevo setup
   */
  public static async selfTest(): Promise<void> {
    const apiKey = this.getApiKey();
    const fromAddress = getFromAddress();
    
    console.log('[BrevoService] Starting Brevo configuration self-test...');
    console.log('[BrevoService] API Key configured:', apiKey ? 'YES (Length: ' + apiKey.length + ')' : 'NO');
    console.log('[BrevoService] Configured sender email (EMAIL_FROM):', fromAddress);

    if (!apiKey) {
      console.warn('[BrevoService] Self-test skipped: BREVO_API_KEY is not defined.');
      return;
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/senders', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey
        }
      });

      console.log('[BrevoService] GET /v3/senders response status:', response.status);
      const data = await response.json() as any;
      console.log('[BrevoService] Senders API Raw response:', JSON.stringify(data));

      if (response.ok && data && Array.isArray(data.senders)) {
        console.log('[BrevoService] Found Senders in Brevo account:');
        data.senders.forEach((s: any) => {
          console.log(`  - [ID: ${s.id}] Name: "${s.name}", Email: "${s.email}", Active: ${s.active}`);
        });

        const isConfiguredSenderActive = data.senders.some(
          (s: any) => s.email.toLowerCase().trim() === fromAddress.toLowerCase().trim() && s.active
        );

        if (isConfiguredSenderActive) {
          console.log(`[BrevoService] ✅ Success! "${fromAddress}" is a fully verified and active sender in your Brevo account.`);
        } else {
          console.warn(`[BrevoService] ⚠️ Warning! "${fromAddress}" was NOT found as an active verified sender in the returned list.`);
        }
      } else {
        console.error('[BrevoService] ❌ Failed to parse Senders from API response:', data);
      }
    } catch (e) {
      console.error('[BrevoService] ❌ Self-test API call failed:', e);
    }
  }

  /**
   * Fetch verified senders from Brevo account
   */
  public static async getVerifiedSenders(): Promise<string[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) return [];

    try {
      const response = await fetch('https://api.brevo.com/v3/senders', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey
        }
      });

      if (response.ok) {
        const data = await response.json() as any;
        if (data && Array.isArray(data.senders)) {
          return data.senders
            .filter((s: any) => s.active)
            .map((s: any) => s.email);
        }
      }
    } catch (e) {
      console.error('[BrevoService] Failed to fetch verified senders:', e);
    }
    return [];
  }

  /**
   * Send transactional email using Brevo's v3 API
   */
  public static async sendEmail(to: string, subject: string, htmlContent: string, senderName = 'JADMAA Varmakalai'): Promise<boolean> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.warn('[BrevoService] BREVO_API_KEY is not defined. Falling back to SMTP Provider...');
      return this.sendViaSmtp(to, subject, htmlContent);
    }

    let senderEmail = getFromAddress();

    console.log('[BrevoService] sendEmail triggered:', {
      to,
      subject,
      senderEmail,
      senderName,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyObfuscated: apiKey ? apiKey.substring(0, 10) + '...' : 'none'
    });

    const attemptSend = async (fromEmail: string) => {
      return fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: senderName,
            email: fromEmail
          },
          to: [{ email: to }],
          subject: subject,
          htmlContent: htmlContent
        })
      });
    };

    try {
      let response = await attemptSend(senderEmail);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('[BrevoService] Failed to send email via Brevo API:', errorData);
        
        if (errorData.includes('invalid_parameter') || errorData.includes('sender') || errorData.includes('sender email')) {
          console.warn('[BrevoService] Configured sender email is not verified in Brevo. Fetching verified senders list...');
          const verifiedEmails = await this.getVerifiedSenders();
          
          if (verifiedEmails.length > 0) {
            const fallbackSender = verifiedEmails[0];
            console.log(`[BrevoService] Retrying send using verified sender fallback: ${fallbackSender}`);
            response = await attemptSend(fallbackSender);
            
            if (response.ok) {
              const data = (await response.json()) as BrevoEmailResponse;
              console.log(`[BrevoService] Email sent successfully via Brevo API using fallback sender. MessageID: ${data.messageId}`);
              return true;
            } else {
              console.error('[BrevoService] Retry with fallback sender failed:', await response.text());
            }
          } else {
            console.warn(`
┌────────────────────────────────────────────────────────────────────────┐
│ 💡 BREVO ERROR: NO VERIFIED SENDERS FOUND                              │
├────────────────────────────────────────────────────────────────────────┤
│ Brevo rejected the sender email: "${senderEmail}"                      │
│                                                                        │
│ 👉 How to fix this:                                                   │
│ 1. Log in to Brevo (https://app.brevo.com).                           │
│ 2. Go to: Senders, domains, IPs.                                      │
│ 3. Verify "${senderEmail}" or your domain.                            │
│ 4. Or change EMAIL_FROM in .env to a verified sender email address.    │
└────────────────────────────────────────────────────────────────────────┘
            `);
          }
        }
        
        if (errorData.includes('unrecognised IP address') || errorData.includes('authorised_ips')) {
          console.warn(`
┌────────────────────────────────────────────────────────────────────────┐
│ 💡 BREVO SECURITY ALERT: UNRECOGNIZED IP ADDRESS                       │
├────────────────────────────────────────────────────────────────────────┤
│ Brevo is blocking requests because "Authorized IPs" is enabled in      │
│ your Brevo Account settings, but Cloud Run's dynamic IP range is not   │
│ authorized.                                                            │
│                                                                        │
│ 👉 To fix this, please:                                               │
│ 1. Log in to your Brevo Dashboard.                                     │
│ 2. Go to: Security settings / Authorized IPs                           │
│    (https://app.brevo.com/security/authorised_ips)                    │
│ 3. Turn OFF IP restrictions OR add your application's current IP.      │
└────────────────────────────────────────────────────────────────────────┘
          `);
        }

        // Fall back to SMTP relay if API fails
        return this.sendViaSmtp(to, subject, htmlContent);
      }

      const data = (await response.json()) as BrevoEmailResponse;
      console.log(`[BrevoService] Email sent successfully via Brevo API. MessageID: ${data.messageId}`);
      return true;
    } catch (error) {
      console.error('[BrevoService] Error sending email via Brevo API:', error);
      return this.sendViaSmtp(to, subject, htmlContent);
    }
  }

  /**
   * Add a contact to a Brevo Marketing list (Double Opt-In, Newsletters, Suggestion emails)
   */
  public static async addContactToMarketingList(email: string, name?: string): Promise<boolean> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.info('[BrevoService] BREVO_API_KEY not configured. Skipping marketing list addition.');
      return false;
    }

    try {
      const listId = this.getMarketingListId();
      const firstName = name ? name.split(' ')[0] : '';
      const lastName = name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : '';

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
          },
          listIds: [listId],
          updateEnabled: true
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('[BrevoService] Failed to add contact to Brevo marketing list:', errorData);
        return false;
      }

      console.log(`[BrevoService] Student "${email}" added to marketing list ID: ${listId}`);
      return true;
    } catch (error) {
      console.error('[BrevoService] Error adding contact to Brevo list:', error);
      return false;
    }
  }

  /**
   * Validate an email address using Brevo's email validator or standard regex rules
   */
  public static validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Fallback SMTP sender using standard nodemailer transporter
   */
  private static async sendViaSmtp(to: string, subject: string, htmlContent: string): Promise<boolean> {
    try {
      console.log(`[BrevoService] Sending email to ${to} using Nodemailer SMTP...`);
      const transporter = createSmtpTransporter();
      await transporter.sendMail({
        from: getFromAddress(),
        to,
        subject,
        html: htmlContent
      });
      console.log('[BrevoService] Email sent successfully via SMTP.');
      return true;
    } catch (error: any) {
      console.error('[BrevoService] Nodemailer fallback SMTP failed:', error);
      if (error && error.message && error.message.includes('535')) {
        console.warn(`
┌────────────────────────────────────────────────────────────────────────┐
│ 💡 BREVO SMTP AUTHENTICATION FAILED (535)                               │
├────────────────────────────────────────────────────────────────────────┤
│ Brevo rejected your SMTP login credentials.                           │
│                                                                        │
│ 👉 Common fixes:                                                       │
│ 1. Ensure your SMTP Account is activated on Brevo.                     │
│ 2. Ensure EMAIL_USER matches your Brevo SMTP login name precisely      │
│    (usually your Brevo login email or account address).                │
│ 3. Ensure EMAIL_PASSWORD matches your active SMTP master key.          │
└────────────────────────────────────────────────────────────────────────┘
        `);
      }
      return false;
    }
  }
}
