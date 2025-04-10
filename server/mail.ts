
import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY not found in environment variables');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(data: EmailData) {
  try {
    await sgMail.send({
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@devineseniorliving.com',
      ...data
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
