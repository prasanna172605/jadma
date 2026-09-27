import nodemailer from 'nodemailer';

export const createSmtpTransporter = () => {
  const host = (process.env.EMAIL_HOST || '').trim();
  const port = parseInt(process.env.EMAIL_PORT || '465', 10);
  const secure = port === 465;
  
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: (process.env.EMAIL_USER || '').trim(),
      pass: (process.env.EMAIL_PASSWORD || '').trim()
    }
  });
};

export const getFromAddress = () => {
  return (process.env.EMAIL_FROM || 'info@jadmaa.com').trim();
};
