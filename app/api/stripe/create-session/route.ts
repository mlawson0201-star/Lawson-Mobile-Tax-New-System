
import { NextRequest, NextResponse } from 'next/server'
import { RealStripeService } from '@/lib/real-stripe-service'

export async function POST(request: NextRequest) {
  try {
    const {
      productKey,
      customerEmail,
      customerName,
      successUrl,
      cancelUrl,
      metadata = {}
    } = await request.json()

    if (!productKey || !customerEmail || !customerName) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // **CREATE REAL STRIPE CHECKOUT SESSION**
    const result = await RealStripeService.createPaymentSession(
      productKey,
      customerEmail,
      customerName,
      successUrl,
      cancelUrl,
      {
        source: 'lmt_website',
        timestamp: new Date().toISOString(),
        ...metadata
      }
    )

    if (result.success) {
      return NextResponse.json({
        success: true,
        sessionId: result.sessionId,
        url: result.url
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to create payment session'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Stripe session creation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
