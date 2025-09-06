

import { NextRequest, NextResponse } from 'next/server'

// Dynamic pricing calculation API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      serviceType, 
      complexity, 
      isRush, 
      clientType, 
      location, 
      seasonalFactor,
      loyaltyLevel 
    } = body

    // Base pricing structure
    const basePricing: { [key: string]: number } = {
      'individual-basic': 199,
      'individual-complex': 349,
      'business-small': 599,
      'business-large': 1299,
      'tax-planning': 299,
      'debt-resolution': 2999,
      'bookkeeping': 150,
      'consultation': 150
    }

    let basePrice = basePricing[serviceType] || 199

    // Complexity multipliers
    const complexityMultipliers: { [key: string]: number } = {
      'simple': 1.0,
      'moderate': 1.3,
      'complex': 1.7,
      'very-complex': 2.2
    }

    // Apply complexity multiplier
    if (complexity && complexityMultipliers[complexity]) {
      basePrice *= complexityMultipliers[complexity]
    }

    // Rush service fees
    const rushFees: { [key: string]: number } = {
      'individual-basic': 50,
      'individual-complex': 75,
      'business-small': 150,
      'business-large': 300,
      'tax-planning': 60,
      'debt-resolution': 500,
      'bookkeeping': 30,
      'consultation': 25
    }

    let rushFee = 0
    if (isRush) {
      rushFee = rushFees[serviceType] || 50
    }

    // Client type discounts
    const clientDiscounts: { [key: string]: number } = {
      'new': 0,
      'returning': 0.05,
      'vip': 0.10,
      'enterprise': 0.15
    }

    let clientDiscount = 0
    if (clientType && clientDiscounts[clientType]) {
      clientDiscount = clientDiscounts[clientType]
    }

    // Loyalty level discounts
    const loyaltyDiscounts: { [key: string]: number } = {
      'bronze': 0.02,
      'silver': 0.05,
      'gold': 0.08,
      'platinum': 0.12
    }

    let loyaltyDiscount = 0
    if (loyaltyLevel && loyaltyDiscounts[loyaltyLevel]) {
      loyaltyDiscount = loyaltyDiscounts[loyaltyLevel]
    }

    // Location-based adjustments (simulate different tax rates/market conditions)
    const locationAdjustments: { [key: string]: number } = {
      'urban': 1.1,
      'suburban': 1.0,
      'rural': 0.9
    }

    let locationMultiplier = 1.0
    if (location && locationAdjustments[location]) {
      locationMultiplier = locationAdjustments[location]
    }

    // Seasonal pricing adjustments
    let seasonalMultiplier = seasonalFactor || 1.0

    // Calculate subtotal
    const subtotal = (basePrice * locationMultiplier * seasonalMultiplier) + rushFee

    // Apply discounts
    const totalDiscount = clientDiscount + loyaltyDiscount
    const discountAmount = subtotal * totalDiscount

    // Calculate tax (example: 8.25%)
    const taxRate = 0.0825
    const taxAmount = (subtotal - discountAmount) * taxRate

    // Calculate payment processing fees (varies by method)
    const processingFeeRate = 0.029 // 2.9% default
    const processingFee = (subtotal - discountAmount + taxAmount) * processingFeeRate

    // Final total
    const total = subtotal - discountAmount + taxAmount + processingFee

    // Generate pricing breakdown
    const pricingBreakdown = {
      basePrice,
      complexityAdjustment: basePrice * (complexityMultipliers[complexity] - 1),
      rushFee,
      locationAdjustment: basePrice * (locationMultiplier - 1),
      seasonalAdjustment: basePrice * (seasonalMultiplier - 1),
      subtotal,
      clientDiscount: subtotal * clientDiscount,
      loyaltyDiscount: subtotal * loyaltyDiscount,
      totalDiscount: discountAmount,
      taxAmount,
      processingFee,
      total: Math.round(total * 100) / 100
    }

    // Generate smart recommendations
    const recommendations = generatePricingRecommendations(body, pricingBreakdown)

    return NextResponse.json({
      success: true,
      pricing: pricingBreakdown,
      recommendations,
      metadata: {
        serviceType,
        complexity,
        isRush,
        clientType,
        loyaltyLevel,
        calculatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Dynamic pricing calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate pricing' },
      { status: 500 }
    )
  }
}

function generatePricingRecommendations(input: any, pricing: any) {
  const recommendations = []

  // Rush service recommendation
  if (!input.isRush && pricing.total > 500) {
    recommendations.push({
      type: 'service',
      title: 'Consider Standard Processing',
      description: 'Save money by choosing standard processing time',
      savings: pricing.rushFee
    })
  }

  // Loyalty program recommendation
  if (input.clientType === 'new') {
    recommendations.push({
      type: 'loyalty',
      title: 'Join Our Loyalty Program',
      description: 'Save 5-12% on future services',
      potentialSavings: pricing.subtotal * 0.05
    })
  }

  // Bundle recommendation
  if (input.serviceType.includes('individual') && pricing.total > 200) {
    recommendations.push({
      type: 'bundle',
      title: 'Tax Planning Bundle',
      description: 'Add tax planning for just $99 more (save $200)',
      savings: 200
    })
  }

  // Payment method recommendation
  recommendations.push({
    type: 'payment',
    title: 'Save with ACH Transfer',
    description: 'Pay by bank transfer and save on processing fees',
    savings: pricing.processingFee * 0.7
  })

  return recommendations
}

// GET endpoint for pricing factors and multipliers
export async function GET(request: NextRequest) {
  try {
    const pricingFactors = {
      basePricing: {
        'individual-basic': 199,
        'individual-complex': 349,
        'business-small': 599,
        'business-large': 1299,
        'tax-planning': 299,
        'debt-resolution': 2999,
        'bookkeeping': 150,
        'consultation': 150
      },
      complexityMultipliers: {
        'simple': 1.0,
        'moderate': 1.3,
        'complex': 1.7,
        'very-complex': 2.2
      },
      clientDiscounts: {
        'new': 0,
        'returning': 0.05,
        'vip': 0.10,
        'enterprise': 0.15
      },
      loyaltyDiscounts: {
        'bronze': 0.02,
        'silver': 0.05,
        'gold': 0.08,
        'platinum': 0.12
      },
      locationAdjustments: {
        'urban': 1.1,
        'suburban': 1.0,
        'rural': 0.9
      },
      seasonalFactors: {
        'peak': 1.2, // Tax season
        'normal': 1.0,
        'off-season': 0.9
      }
    }

    return NextResponse.json({
      success: true,
      data: pricingFactors
    })

  } catch (error) {
    console.error('Pricing factors retrieval error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve pricing factors' },
      { status: 500 }
    )
  }
}
