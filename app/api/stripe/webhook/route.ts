
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendPaymentConfirmationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
    }

    if (!webhookSecret || webhookSecret === 'whsec_YOUR_REAL_STRIPE_WEBHOOK_SECRET_HERE') {
      console.error('❌ Stripe webhook secret not configured properly')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle different webhook events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
        
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const { metadata } = session
    
    if (!metadata?.serviceId || !metadata?.serviceName) {
      console.error('Missing metadata in checkout session')
      return
    }

    // Create payment record in database using correct schema fields
    const payment = await prisma.payment.create({
      data: {
        amount: (session.amount_total || 0) / 100, // Convert from cents
        currency: session.currency?.toUpperCase() || 'USD',
        paymentMethod: 'CREDIT_CARD',
        status: 'COMPLETED',
        stripePaymentIntentId: session.payment_intent as string,
        stripeChargeId: session.payment_intent as string,
        description: `${metadata.serviceName} - Tax Service`,
        organizationId: 'default-org'
      }
    })

    // Send confirmation email if customer email is available
    if (session.customer_details?.email) {
      try {
        await sendPaymentConfirmationEmail(
          session.customer_details.email,
          metadata.clientName || 'Valued Client',
          (session.amount_total || 0) / 100,
          metadata.serviceName
        )
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
        // Don't fail the webhook for email errors
      }
    }

    console.log('✅ Payment processed successfully:', payment.id)

  } catch (error) {
    console.error('Error handling checkout completion:', error)
    throw error
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update payment status if exists
    await prisma.payment.updateMany({
      where: {
        stripePaymentIntentId: paymentIntent.id
      },
      data: {
        status: 'COMPLETED'
      }
    })

    console.log('✅ Payment intent succeeded:', paymentIntent.id)

  } catch (error) {
    console.error('Error handling payment success:', error)
    throw error
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update payment status if exists
    await prisma.payment.updateMany({
      where: {
        stripePaymentIntentId: paymentIntent.id
      },
      data: {
        status: 'FAILED'
      }
    })

    console.log('❌ Payment intent failed:', paymentIntent.id)

  } catch (error) {
    console.error('Error handling payment failure:', error)
    throw error
  }
}
