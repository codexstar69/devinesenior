import sgMail from '@sendgrid/mail';

// Default email sender 
const DEFAULT_FROM_EMAIL = 'noreply@devineseniorliving.com';

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY not found in environment variables.');
  console.warn("Email functionality will be simulated in development mode.");
  // Only exit in production
  if (process.env.NODE_ENV === 'production') {
    console.error("Exiting due to missing SENDGRID_API_KEY in production.");
    process.exit(1); 
  }
} else {
  // Set API key only if it exists
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(data: EmailData) {
  // In development mode with no API key, simulate email sending
  if (!process.env.SENDGRID_API_KEY && process.env.NODE_ENV !== 'production') {
    console.log('SIMULATED EMAIL:');
    console.log('To:', data.to);
    console.log('Subject:', data.subject);
    console.log('Text:', data.text);
    console.log('HTML:', data.html);
    return { success: true, simulated: true };
  }
  
  // In production, require API key
  if (!process.env.SENDGRID_API_KEY && process.env.NODE_ENV === 'production') {
    console.error("Cannot send email: SENDGRID_API_KEY is not configured.");
    throw new Error('Failed to send email due to missing API key'); 
  }
  
  try {
    await sgMail.send({
      from: process.env.SENDGRID_FROM_EMAIL || DEFAULT_FROM_EMAIL,
      ...data
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
