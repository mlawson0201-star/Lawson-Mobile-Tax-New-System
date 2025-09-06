

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Bureau Information
      bureauName,
      ownerFirstName,
      ownerLastName,
      ownerEmail,
      password,
      confirmPassword,
      
      // Business Details
      businessAddress,
      city,
      state,
      zipCode,
      phone,
      ein,
      ptinNumber,
      
      // Subscription Details
      licenseLevel = 'BASIC',
      estimatedMonthlyReturns,
      
      // Agreement
      agreedToTerms,
      agreedToProcessingFees
    } = body

    // Validation
    if (!bureauName || !ownerFirstName || !ownerLastName || !ownerEmail || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    if (!agreedToTerms || !agreedToProcessingFees) {
      return NextResponse.json({ error: 'You must agree to terms and processing fees' }, { status: 400 })
    }

    // Check if bureau or user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: ownerEmail }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const existingBureau = await prisma.organization.findFirst({
      where: { 
        OR: [
          { name: bureauName },
          { slug: bureauName.toLowerCase().replace(/[^a-z0-9]/g, '-') }
        ]
      }
    })

    if (existingBureau) {
      return NextResponse.json({ error: 'Service bureau with this name already exists' }, { status: 400 })
    }

    // Determine pricing based on license level
    const pricingTiers = {
      BASIC: { monthlyFee: 99, perReturnFee: 15, maxReturns: 100 },
      STANDARD: { monthlyFee: 199, perReturnFee: 12, maxReturns: 500 },
      PREMIUM: { monthlyFee: 399, perReturnFee: 10, maxReturns: 1000 },
      UNLIMITED: { monthlyFee: 799, perReturnFee: 8, maxReturns: -1 }
    }

    const pricing = pricingTiers[licenseLevel as keyof typeof pricingTiers] || pricingTiers.BASIC

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create service bureau organization
    const organization = await prisma.organization.create({
      data: {
        name: bureauName,
        slug: bureauName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        type: 'SERVICE_BUREAU',
        email: ownerEmail,
        phone,
        address: businessAddress,
        city,
        state,
        zipCode,
        licenseLevel: licenseLevel as any,
        monthlyFee: pricing.monthlyFee,
        perReturnFee: pricing.perReturnFee,
        settings: JSON.stringify({
          maxReturns: pricing.maxReturns,
          estimatedMonthlyReturns: parseInt(estimatedMonthlyReturns) || 0,
          ein,
          ptinNumber,
          setupCompleted: false,
          needsStripeSetup: true
        }),
        isActive: true
      }
    })

    // Create bureau owner user
    const user = await prisma.user.create({
      data: {
        firstName: ownerFirstName,
        lastName: ownerLastName,
        name: `${ownerFirstName} ${ownerLastName}`,
        email: ownerEmail,
        password: hashedPassword,
        role: 'BUREAU_ADMIN',
        organizationId: organization.id,
        permissions: [
          'manage_organization',
          'manage_offices', 
          'manage_users',
          'view_all_clients',
          'manage_billing',
          'view_reports'
        ],
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Service bureau registered successfully!',
      organization: {
        id: organization.id,
        name: organization.name,
        type: organization.type,
        licenseLevel: organization.licenseLevel
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      nextSteps: {
        completeSetup: `/setup/bureau/${organization.id}`,
        addOffices: true,
        setupPayments: true
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating service bureau:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

