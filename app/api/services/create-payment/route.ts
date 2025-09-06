
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, serviceName, price, clientEmail, clientName } = body

    if (!serviceId || !serviceName || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create Stripe checkout session for ANY service
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceName,
              description: `Professional tax service: ${serviceName}`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/services/success?session_id={CHECKOUT_SESSION_ID}&service=${encodeURIComponent(serviceName)}`,
      cancel_url: `${request.headers.get('origin')}/services?canceled=true`,
      customer_email: clientEmail,
      metadata: {
        serviceId,
        serviceName,
        clientName: clientName || 'Unknown',
        amount: price.toString()
      }
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Payment session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    )
  }
}
