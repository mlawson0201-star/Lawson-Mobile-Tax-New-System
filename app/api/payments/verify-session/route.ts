

import { NextRequest, NextResponse } from 'next/server'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      // For demo mode, always return success
      return NextResponse.json({
        success: true,
        mockMode: true,
        message: 'Mock payment verification. Configure Stripe for real payments.'
      })
    }

    // Real Stripe session verification
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      
      if (session.payment_status === 'paid') {
        return NextResponse.json({
          success: true,
          sessionId,
          paymentStatus: session.payment_status,
          amountTotal: session.amount_total,
          customerEmail: session.customer_details?.email
        })
      } else {
        return NextResponse.json({
          success: false,
          error: 'Payment not completed',
          paymentStatus: session.payment_status
        }, { status: 400 })
      }
      
    } catch (stripeError) {
      console.error('Stripe session verification failed:', stripeError)
      return NextResponse.json({
        success: false,
        error: 'Invalid session ID'
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error verifying payment session:', error)
    return NextResponse.json({ error: 'Failed to verify payment session' }, { status: 500 })
  }
}

