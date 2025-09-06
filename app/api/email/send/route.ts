
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendEmail } from '@/lib/email'
import { sendSMS } from '@/lib/sms'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

interface CommunicationRequest {
  type: 'email' | 'sms'
  to: string
  subject?: string
  message: string
  clientId?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}

export async function POST(request: NextRequest) {
  let requestData: CommunicationRequest
  
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    requestData = await request.json()
    const { type, to, subject, message, clientId, priority = 'medium' } = requestData

    if (!to || !message) {
      return NextResponse.json({ error: 'Recipient and message are required' }, { status: 400 })
    }

    let result: any

    if (type === 'email') {
      if (!subject) {
        return NextResponse.json({ error: 'Subject required for email' }, { status: 400 })
      }
      
      // Send real email using Resend
      result = await sendEmail({
        to,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #8B5CF6; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">LMT - Lawson Mobile Tax</h1>
            </div>
            <div style="padding: 20px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <div style="background: #F3F4F6; padding: 15px; text-align: center; color: #6B7280; font-size: 14px;">
              Questions? Reply to this email or call (855) 722-8700
            </div>
          </div>
        `,
        text: message
      })
    } else if (type === 'sms') {
      // Send real SMS using Twilio
      result = await sendSMS({
        to,
        message: `${message}\n\n- LMT Tax Services\n(855) 722-8700`
      })
    } else {
      return NextResponse.json({ error: 'Invalid communication type' }, { status: 400 })
    }

    // Log communication success
    console.log(`${type.toUpperCase()} sent successfully:`, {
      to,
      subject,
      messageId: result.messageId,
      sentBy: session.user.id,
      clientId
    })

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      type: type,
      message: `${type.toUpperCase()} sent successfully`
    })

  } catch (error) {
    console.error('Communication sending error:', error)

    return NextResponse.json({ 
      error: `Failed to send communication. Please check API configuration.`,
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
