
import twilio from 'twilio'

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export interface SMSOptions {
  to: string
  message: string
  from?: string
}

export async function sendSMS(options: SMSOptions) {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_ACCOUNT_SID === 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      throw new Error('Twilio not configured. Please add real TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to .env file.')
    }

    const result = await twilioClient.messages.create({
      body: options.message,
      from: options.from || process.env.TWILIO_PHONE_NUMBER,
      to: options.to
    })

    return {
      success: true,
      messageId: result.sid,
      status: result.status,
      message: 'SMS sent successfully'
    }

  } catch (error) {
    console.error('SMS sending error:', error)
    throw error
  }
}

export async function sendPaymentConfirmationSMS(clientPhone: string, clientName: string, amount: number) {
  return sendSMS({
    to: clientPhone,
    message: `Hi ${clientName}! Your $${amount.toFixed(2)} payment to LMT Tax has been confirmed. We'll start processing your return within 24hrs. Track progress at lawsonmobiletax.com`
  })
}

export async function sendReturnReadySMS(clientPhone: string, clientName: string) {
  return sendSMS({
    to: clientPhone,
    message: `Great news ${clientName}! Your tax return is ready for review. Log in to lawsonmobiletax.com to view and approve. Questions? Call (855) 722-8700`
  })
}

export async function sendAppointmentReminderSMS(clientPhone: string, clientName: string, appointmentDate: Date) {
  return sendSMS({
    to: clientPhone,
    message: `Reminder: Your tax consultation with LMT is tomorrow at ${appointmentDate.toLocaleTimeString()}. Call (855) 722-8700 if you need to reschedule.`
  })
}
