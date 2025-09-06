
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { initiateServiceWorkflow, initiatePaymentFlow } from '@/lib/communication'

interface ServiceIntake {
  serviceType: 'individual-tax-return' | 'business-tax-return' | 'tax-planning' | 'bookkeeping' | 'debt-resolution' | 'consultation'
  clientInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
  }
  serviceDetails: {
    urgentService?: boolean
    returnComplexity?: 'simple' | 'moderate' | 'complex'
    businessType?: string
    filingStatus?: string
    hasRentalProperty?: boolean
    hasSelfEmployment?: boolean
    hasInvestments?: boolean
    estimatedIncome?: number
    preferredContactMethod?: 'email' | 'phone' | 'text'
    additionalNotes?: string
  }
  source: string
}

// **COMPREHENSIVE SERVICE PRICING**
const SERVICE_PRICING = {
  'individual-tax-return': {
    simple: { base: 199, description: 'W-2 only, standard deduction' },
    moderate: { base: 399, description: 'Multiple income sources, itemized deductions' },
    complex: { base: 599, description: 'Self-employment, rental property, investments' }
  },
  'business-tax-return': {
    simple: { base: 799, description: 'Single-member LLC or S-Corp' },
    moderate: { base: 1299, description: 'Multi-member LLC or Partnership' },
    complex: { base: 1999, description: 'C-Corp or complex multi-entity' }
  },
  'tax-planning': {
    simple: { base: 499, description: 'Individual tax strategy session' },
    moderate: { base: 899, description: 'Business tax planning & optimization' },
    complex: { base: 1499, description: 'Multi-entity tax planning & wealth preservation' }
  },
  'bookkeeping': {
    simple: { base: 200, description: 'Monthly bookkeeping - basic business' },
    moderate: { base: 400, description: 'Monthly bookkeeping - moderate complexity' },
    complex: { base: 600, description: 'Monthly bookkeeping - complex multi-entity' }
  },
  'debt-resolution': {
    simple: { base: 2500, description: 'IRS debt resolution - under $25K' },
    moderate: { base: 4500, description: 'IRS debt resolution - $25K-$100K' },
    complex: { base: 7500, description: 'IRS debt resolution - over $100K or complex cases' }
  },
  'consultation': {
    simple: { base: 0, description: 'Free initial consultation' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const intakeData: ServiceIntake = await request.json()
    
    // Validate required fields
    const { serviceType, clientInfo, serviceDetails, source } = intakeData
    if (!serviceType || !clientInfo.email || !clientInfo.firstName) {
      return NextResponse.json({ 
        error: 'Missing required client information' 
      }, { status: 400 })
    }

    // **CREATE OR UPDATE CLIENT RECORD**
    const client = await createOrUpdateClient(clientInfo, serviceDetails)
    
    // **CREATE SERVICE REQUEST**
    const serviceRequest = await createServiceRequest(client.id, serviceType, serviceDetails, source)
    
    // **CALCULATE SERVICE PRICING**
    const pricing = calculateServicePricing(serviceType, serviceDetails)
    
    // **INITIATE COMPREHENSIVE AUTOMATED WORKFLOW**
    await initiateServiceWorkflow(serviceType, {
      client,
      serviceRequest,
      pricing,
      urgentService: serviceDetails.urgentService || false
    })
    
    // **SETUP PAYMENT PROCESSING (if not free consultation)**
    let paymentLink = null
    if (serviceType !== 'consultation' && pricing.amount > 0) {
      paymentLink = await initiatePaymentFlow(
        client.id, 
        serviceType, 
        pricing.amount
      )
    }

    return NextResponse.json({ 
      success: true,
      clientId: client.id,
      serviceRequestId: serviceRequest.id,
      pricing: pricing,
      paymentLink: paymentLink,
      message: 'Service request submitted successfully. You will receive detailed next steps via email shortly.',
      automatedWorkflowInitiated: true
    })

  } catch (error) {
    console.error('Service intake error:', error)
    return NextResponse.json({ 
      error: 'Failed to process service request. Please try again or contact us directly.' 
    }, { status: 500 })
  }
}

// **CREATE OR UPDATE CLIENT RECORD**
async function createOrUpdateClient(clientInfo: any, serviceDetails: any) {
  const existingClient = await prisma.user.findUnique({
    where: { email: clientInfo.email.toLowerCase() }
  })

  if (existingClient) {
    // Update existing client with new information
    return await prisma.user.update({
      where: { id: existingClient.id },
      data: {
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        phone: clientInfo.phone?.replace(/\D/g, ''),
        // Additional fields would be added to user profile table
      }
    })
  } else {
    // Create new client
    return await prisma.user.create({
      data: {
        email: clientInfo.email.toLowerCase(),
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        phone: clientInfo.phone?.replace(/\D/g, ''),
        role: 'CLIENT',
        organizationId: 'default-org-id', // Would be determined by the processing organization
        // Additional fields would be stored in a separate client profile table
      }
    })
  }
}

// **CREATE SERVICE REQUEST**
async function createServiceRequest(clientId: string, serviceType: string, serviceDetails: any, source: string) {
  // Create a service request record - for now using a simplified approach
  const serviceRequest = {
    id: `srv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    clientId: clientId,
    serviceType: serviceType,
    status: 'PENDING_REVIEW',
    priority: serviceDetails.urgentService ? 'HIGH' : 'NORMAL',
    estimatedValue: calculateServicePricing(serviceType, serviceDetails).amount,
    notes: JSON.stringify(serviceDetails),
    source: source,
    organizationId: 'default-org-id',
    createdAt: new Date()
  }

  // Store service request info in user name for tracking (temporary approach)
  await prisma.user.update({
    where: { id: clientId },
    data: {
      name: `${serviceType}_client`
    }
  })
  
  return serviceRequest
}

// **INTELLIGENT SERVICE PRICING**
function calculateServicePricing(serviceType: string, serviceDetails: any) {
  const basePrice = SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING]
  
  if (!basePrice) {
    return { amount: 0, description: 'Custom pricing - consultation required' }
  }

  let complexity = 'simple'
  let multiplier = 1

  // **COMPLEXITY ANALYSIS**
  if (serviceType === 'individual-tax-return') {
    let complexityScore = 0
    
    if (serviceDetails.hasSelfEmployment) complexityScore += 2
    if (serviceDetails.hasRentalProperty) complexityScore += 2
    if (serviceDetails.hasInvestments) complexityScore += 1
    if (serviceDetails.estimatedIncome && serviceDetails.estimatedIncome > 100000) complexityScore += 1
    if (serviceDetails.filingStatus === 'married-filing-separately') complexityScore += 1
    
    if (complexityScore >= 4) {
      complexity = 'complex'
    } else if (complexityScore >= 2) {
      complexity = 'moderate'
    }
  }

  if (serviceType === 'business-tax-return') {
    if (serviceDetails.businessType?.includes('corp')) {
      complexity = serviceDetails.businessType.includes('c-corp') ? 'complex' : 'moderate'
    }
    if (serviceDetails.estimatedIncome && serviceDetails.estimatedIncome > 500000) {
      complexity = 'complex'
    }
  }

  // **URGENCY MULTIPLIER**
  if (serviceDetails.urgentService) {
    multiplier = 1.5 // 50% rush fee
  }

  const pricing = basePrice[complexity as keyof typeof basePrice] || basePrice.simple
  const finalAmount = Math.round(pricing.base * multiplier)

  return {
    amount: finalAmount,
    baseAmount: pricing.base,
    description: pricing.description,
    complexity: complexity,
    rushService: serviceDetails.urgentService,
    breakdown: {
      basePrice: pricing.base,
      rushFee: serviceDetails.urgentService ? pricing.base * 0.5 : 0,
      total: finalAmount
    }
  }
}

// **SERVICE-SPECIFIC WORKFLOW TRIGGERS**
export async function GET(request: NextRequest) {
  // Get service pricing information
  const { searchParams } = new URL(request.url)
  const serviceType = searchParams.get('serviceType')
  const complexity = searchParams.get('complexity') || 'simple'

  if (!serviceType || !SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING]) {
    return NextResponse.json({ error: 'Invalid service type' }, { status: 400 })
  }

  const pricing = SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING]
  const selectedPricing = pricing[complexity as keyof typeof pricing] || pricing.simple

  return NextResponse.json({
    serviceType,
    complexity,
    pricing: selectedPricing,
    available: true
  })
}
