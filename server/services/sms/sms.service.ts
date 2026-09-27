import { sendSmsMessage } from './sms.provider.js';

export const sendOtpSms = async (phoneNumber: string, otp: string) => {
  try {
    const message = `Your JADMAA verification code is: ${otp}. Valid for 5 minutes.`;
    await sendSmsMessage(phoneNumber, message);
  } catch (error) {
    console.error('Error sending OTP SMS:', error);
  }
};
