

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Office Information
      officeName,
      managerFirstName,
      managerLastName,
      managerEmail,
      password,
      confirmPassword,
      
      // Business Details
      officeAddress,
      city,
      state,
      zipCode,
      phone,
      ptinNumber,
      efsId,
      
      // Service Bureau Connection
      serviceBureauId,
      serviceBureauCode,
      
      // Agreement
      agreedToTerms,
      agreedToRevenueshare
    } = body

    // Validation
    if (!officeName || !managerFirstName || !managerLastName || !managerEmail || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    if (!agreedToTerms || !agreedToRevenueshare) {
      return NextResponse.json({ error: 'You must agree to terms and revenue sharing agreement' }, { status: 400 })
    }

    // Find service bureau
    let parentBureau
    if (serviceBureauId) {
      parentBureau = await prisma.organization.findFirst({
        where: { 
          id: serviceBureauId,
          type: 'SERVICE_BUREAU',
          isActive: true
        }
      })
    } else if (serviceBureauCode) {
      parentBureau = await prisma.organization.findFirst({
        where: { 
          slug: serviceBureauCode,
          type: 'SERVICE_BUREAU',
          isActive: true
        }
      })
    }

    if (!parentBureau) {
      return NextResponse.json({ error: 'Invalid service bureau. Please check your bureau code.' }, { status: 400 })
    }

    // Check if office or user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: managerEmail }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const existingOffice = await prisma.organization.findFirst({
      where: { 
        name: officeName,
        parentOrganizationId: parentBureau.id
      }
    })

    if (existingOffice) {
      return NextResponse.json({ error: 'Office with this name already exists under this bureau' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create office organization
    const office = await prisma.organization.create({
      data: {
        name: officeName,
        slug: `${parentBureau.slug}-${officeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        type: 'OFFICE',
        parentOrganizationId: parentBureau.id,
        email: managerEmail,
        phone,
        address: officeAddress,
        city,
        state,
        zipCode,
        licenseLevel: parentBureau.licenseLevel,
        monthlyFee: parentBureau.monthlyFee,
        perReturnFee: parentBureau.perReturnFee,
        revenueShare: parentBureau.revenueShare,
        officeManager: `${managerFirstName} ${managerLastName}`,
        ptinNumber,
        efsId,
        settings: JSON.stringify({
          setupCompleted: false,
          parentBureauId: parentBureau.id,
          needsEquipmentSetup: true,
          needsStaffTraining: true
        }),
        isActive: true
      }
    })

    // Create office manager user
    const user = await prisma.user.create({
      data: {
        firstName: managerFirstName,
        lastName: managerLastName,
        name: `${managerFirstName} ${managerLastName}`,
        email: managerEmail,
        password: hashedPassword,
        role: 'OFFICE_ADMIN',
        organizationId: office.id,
        permissions: [
          'manage_office',
          'manage_staff',
          'manage_clients',
          'process_returns',
          'view_office_reports'
        ],
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Office registered successfully!',
      office: {
        id: office.id,
        name: office.name,
        type: office.type,
        parentBureau: {
          id: parentBureau.id,
          name: parentBureau.name
        }
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      nextSteps: {
        completeSetup: `/setup/office/${office.id}`,
        addStaff: true,
        setupWorkstation: true,
        accessTraining: true
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating office:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

