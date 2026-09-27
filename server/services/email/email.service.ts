import { createSmtpTransporter, getFromAddress } from './smtp.provider.js';

export const sendPasswordResetEmail = async (email: string, resetUrl: string, name: string) => {
  try {
    const transporter = createSmtpTransporter();
    
    const mailOptions = {
      from: getFromAddress(),
      to: email,
      subject: 'Reset your JADMAA password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>JADMAA Varmakalai</h2>
          <p>Hello ${name},</p>
          <p>We received a request to reset your JADMAA account password.</p>
          <p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #B12B2B; color: white; text-decoration: none; border-radius: 4px;">
              Reset Password
            </a>
          </p>
          <p>This link expires in 30 minutes.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">JADMAA Varmakalai Training & Learning</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const sendPasswordChangedEmail = async (email: string, name: string) => {
  try {
    const transporter = createSmtpTransporter();
    
    const mailOptions = {
      from: getFromAddress(),
      to: email,
      subject: 'Your JADMAA password was changed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>JADMAA Varmakalai</h2>
          <p>Hello ${name},</p>
          <p>Your JADMAA account password was successfully changed.</p>
          <p>If you did not make this change, please contact JADMAA support immediately.</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">JADMAA Varmakalai Training & Learning</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password changed email:', error);
  }
};
