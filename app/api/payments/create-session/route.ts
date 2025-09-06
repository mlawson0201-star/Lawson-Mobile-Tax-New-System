

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const body = await request.json()
    const {
      taxReturnId,
      clientId,
      amount,
      description = 'Tax Preparation Service',
      successUrl,
      cancelUrl,
      clientData,
      serviceData
    } = body

    // Allow anonymous payments for tax evaluations and services
    const isAnonymousPayment = description === 'Expert Tax Evaluation' || description.includes('Tax Service')
    
    if (!isAnonymousPayment && !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For anonymous payments, use a default organization ID
    const DEFAULT_ORG_ID = 'public-tax-evaluations'
    const organizationId = session?.user?.organizationId || DEFAULT_ORG_ID

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      // Create mock payment for demo/testing
      const payment = await prisma.payment.create({
        data: {
          amount: parseFloat(amount),
          currency: 'USD',
          paymentMethod: 'CREDIT_CARD',
          status: 'COMPLETED', // Mock as completed
          description,
          taxReturnId: taxReturnId || null,
          clientId: clientId || null,
          organizationId,
          stripePaymentIntentId: `mock_pi_${Date.now()}`,
          processorFee: parseFloat(amount) * 0.029 + 0.30, // Standard Stripe fees
          netAmount: parseFloat(amount) - (parseFloat(amount) * 0.029 + 0.30)
        }
      })

      return NextResponse.json({
        success: true,
        payment,
        mockMode: true,
        message: 'Mock payment created. Configure Stripe for real payments.'
      })
    }

    // Real Stripe integration
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const paymentSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description,
              description: taxReturnId ? `Tax Return #${taxReturnId}` : 'Tax Services',
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.headers.get('origin')}/payment/cancelled`,
      metadata: {
        taxReturnId: taxReturnId || '',
        clientId: clientId || '',
        organizationId,
        isAnonymousPayment: isAnonymousPayment.toString(),
        clientData: clientData ? JSON.stringify(clientData) : '',
        serviceData: serviceData ? JSON.stringify(serviceData) : '',
      },
    })

    // Create pending payment record
    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        currency: 'USD',
        paymentMethod: 'CREDIT_CARD',
        status: 'PENDING',
        description,
        taxReturnId: taxReturnId || null,
        clientId: clientId || null,
        organizationId,
        stripePaymentIntentId: paymentSession.id
      }
    })

    return NextResponse.json({
      success: true,
      sessionId: paymentSession.id,
      sessionUrl: paymentSession.url,
      paymentId: payment.id
    })

  } catch (error) {
    console.error('Error creating payment session:', error)
    return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 })
  }
}

