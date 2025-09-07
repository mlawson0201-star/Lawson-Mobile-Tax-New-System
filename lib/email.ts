
import { Resend } from 'resend'

let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text: string
  from?: string
  replyTo?: string
  cc?: string[]
  bcc?: string[]
}

export async function sendEmail(options: EmailOptions) {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_YOUR_REAL_RESEND_API_KEY_HERE') {
      throw new Error('Resend API key not configured. Please add real RESEND_API_KEY to .env file.')
    }

    const resendClient = getResendClient()
    if (!resendClient) {
      throw new Error('Failed to initialize Resend client')
    }

    const result = await resendClient.emails.send({
      from: options.from || 'noreply@lawsonmobiletax.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc
    })

    if (result.error) {
      throw new Error(`Email sending failed: ${result.error.message}`)
    }

    return {
      success: true,
      messageId: result.data?.id,
      message: 'Email sent successfully'
    }

  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export async function sendWelcomeEmail(clientEmail: string, clientName: string) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Welcome to LMT, ${clientName}!</h1>
      
      <p>Thank you for choosing Lawson Mobile Tax for your professional tax services.</p>
      
      <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">What's Next:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Access your secure client portal</li>
          <li>Upload your tax documents securely</li>
          <li>Schedule your consultation</li>
          <li>Track your tax return progress</li>
        </ul>
      </div>
      
      <p>
        <a href="https://lawsonmobiletax.com/client/dashboard" 
           style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Access Your Portal
        </a>
      </p>
      
      <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
        Questions? Reply to this email or call us at (855) 722-8700
      </p>
    </div>
  `
  
  const textContent = `Welcome to LMT - Lawson Mobile Tax, ${clientName}! Access your portal at https://lawsonmobiletax.com/client/dashboard`

  return sendEmail({
    to: clientEmail,
    subject: 'Welcome to LMT - Lawson Mobile Tax!',
    html: htmlContent,
    text: textContent
  })
}

export async function sendPaymentConfirmationEmail(clientEmail: string, clientName: string, amount: number, serviceName: string) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10B981;">Payment Confirmed!</h1>
      
      <p>Dear ${clientName},</p>
      
      <p>We've successfully received your payment for our tax services.</p>
      
      <div style="background: #F0FDF4; border: 1px solid #10B981; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0; color: #10B981;">Payment Details:</h3>
        <p style="margin: 5px 0;"><strong>Service:</strong> ${serviceName}</p>
        <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      
      <p>Our team will begin processing your tax return within 24 hours. You'll receive updates via email as we progress.</p>
      
      <p>
        <a href="https://lawsonmobiletax.com/client/dashboard" 
           style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Track Your Return
        </a>
      </p>
      
      <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
        Thank you for choosing LMT - Lawson Mobile Tax!<br>
        Questions? Reply to this email or call (855) 722-8700
      </p>
    </div>
  `
  
  const textContent = `Payment confirmed for ${serviceName}: $${amount.toFixed(2)}. Track your return at https://lawsonmobiletax.com/client/dashboard`

  return sendEmail({
    to: clientEmail,
    subject: 'Payment Confirmation - LMT Tax Services',
    html: htmlContent,
    text: textContent
  })
}
