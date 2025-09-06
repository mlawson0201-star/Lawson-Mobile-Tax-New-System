

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { RealEmailService, EmailTriggers } from '@/lib/real-email-service'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 400 })
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        
        // Update payment status
        const payment = await prisma.payment.findFirst({
          where: { stripePaymentIntentId: session.id }
        })

        if (payment) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: 'COMPLETED',
              stripeChargeId: session.payment_intent,
              netAmount: payment.amount - (payment.processorFee || 0)
            }
          })

          // Update tax return if applicable
          if (payment.taxReturnId) {
            const taxReturn = await prisma.taxReturn.findUnique({
              where: { id: payment.taxReturnId },
              select: { totalFee: true }
            })

            const totalFee = taxReturn?.totalFee || 0
            
            await prisma.taxReturn.update({
              where: { id: payment.taxReturnId },
              data: {
                paidAmount: payment.amount,
                status: payment.amount >= totalFee ? 'READY_FOR_SIGNATURE' : 'IN_PROGRESS'
              }
            })
          }

          // Update organization revenue metrics
          await prisma.organization.update({
            where: { id: payment.organizationId },
            data: {
              monthlyRevenue: { increment: payment.netAmount || 0 },
              lifetimeRevenue: { increment: payment.netAmount || 0 }
            }
          })

          // Start email thread with client after successful payment
          try {
            // Get client information from session metadata
            const clientData = session.metadata?.clientData ? JSON.parse(session.metadata.clientData) : null
            const clientEmail = session.customer_details?.email || clientData?.email
            const clientName = clientData ? `${clientData.firstName} ${clientData.lastName}` : 'Valued Client'

            if (clientEmail) {
              // Send immediate payment confirmation
              await EmailTriggers.onPaymentReceived(
                clientEmail, 
                clientName, 
                payment.amount, 
                payment.description || 'Tax Service'
              )

              // Start retention sequence based on service type
              const serviceType = payment.description?.toLowerCase().includes('business') ? 'business-tax-return' : 
                                payment.description?.toLowerCase().includes('evaluation') ? 'consultation' : 
                                'individual-tax-return'
              
              await RealEmailService.startRetentionSequence(clientEmail, clientName, serviceType)
              
              console.log(`✅ Email thread started for ${clientEmail} after payment completion`)
            }
          } catch (emailError) {
            console.error('Email notification failed:', emailError)
            // Don't fail the webhook if email fails
          }
        }
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        
        await prisma.payment.updateMany({
          where: { stripePaymentIntentId: failedPayment.id },
          data: { status: 'FAILED' }
        })
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

