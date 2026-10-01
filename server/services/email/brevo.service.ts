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
   * Strict Transactional Email for Password Resets (No SMTP Fallback)
   */
  public static async sendTransactionalEmail(to: string, subject: string, htmlContent: string, senderName = 'JADMAA Varmakalai'): Promise<{success: boolean, reason?: string}> {
    const apiKey = this.getApiKey();
    const maskedEmail = to.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + '*'.repeat(gp3.length));
    const timestamp = new Date().toISOString();

    if (!apiKey) {
      console.error(`[${timestamp}] [BrevoService] sendTransactionalEmail failed: BREVO_API_KEY is missing. Recipient: ${maskedEmail}`);
      return { success: false, reason: "BREVO_API_KEY is missing" };
    }

    let senderEmail = getFromAddress();

    const attemptSend = async (fromEmail: string) => {
      return fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: senderName, email: fromEmail },
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
        console.error(`[${timestamp}] [BrevoService] Transactional email failed for ${maskedEmail}. HTTP: ${response.status}. Error: ${errorData}`);
        
        // Retry with verified sender if configured sender is rejected
        if (errorData.includes('invalid_parameter') || errorData.includes('sender') || errorData.includes('sender email')) {
          console.warn(`[${timestamp}] [BrevoService] Sender not verified. Fetching verified senders...`);
          const verifiedEmails = await this.getVerifiedSenders();
          if (verifiedEmails.length > 0) {
            const fallbackSender = verifiedEmails[0];
            console.log(`[${timestamp}] [BrevoService] Retrying with verified sender: ${fallbackSender}`);
            response = await attemptSend(fallbackSender);
          }
        }
        
        if (!response.ok) {
           const finalError = await response.text().catch(() => errorData);
           return { success: false, reason: `Brevo API rejected the request. Status: ${response.status}. Details: ${finalError}` };
        }
      }

      const data = (await response.json()) as BrevoEmailResponse;
      console.log(`[${timestamp}] [BrevoService] Transactional email sent to ${maskedEmail}. HTTP: ${response.status}. MessageID: ${data.messageId}`);
      return { success: true };
    } catch (error: any) {
      console.error(`[${timestamp}] [BrevoService] Error sending transactional email to ${maskedEmail}: ${error.message}`);
      return { success: false, reason: error.message };
    }
  }

  /**
   * Send general email using Brevo's v3 API with SMTP fallback
   */
  public static async sendEmail(to: string, subject: string, htmlContent: string, senderName = 'JADMAA Varmakalai'): Promise<boolean> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.warn('[BrevoService] BREVO_API_KEY is not defined. Falling back to SMTP Provider...');
      return this.sendViaSmtp(to, subject, htmlContent);
    }

    let senderEmail = getFromAddress();

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
        return this.sendViaSmtp(to, subject, htmlContent);
      }

      return true;
    } catch (error) {
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
