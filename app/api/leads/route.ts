
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get real leads from database
    const leads = await prisma.lead.findMany({
      where: {
        organizationId: session.user.organizationId || 'default-org'
      },
      include: {
        assignee: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      leads: leads.map(lead => ({
        id: lead.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: lead.status,
        probability: lead.probability,
        assignedTo: lead.assignee?.name || 'Unassigned',
        contactedAt: lead.contactedAt,
        createdAt: lead.createdAt,
        company: lead.company,
        stage: lead.stage,
        expectedValue: lead.expectedValue
      })),
      count: leads.length,
      message: 'Real leads from database'
    })

  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({
      success: true,
      leads: [],
      count: 0,
      message: 'Clean system - no leads yet. Generate your first lead!'
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone,
      company,
      source = 'WEBSITE',
      serviceInterest,
      estimatedValue
    } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'First name, last name, and email are required' }, { status: 400 })
    }

    // Check if lead already exists
    const existingLead = await prisma.lead.findFirst({
      where: { email }
    })

    if (existingLead) {
      return NextResponse.json({ error: 'Lead with this email already exists' }, { status: 409 })
    }

    // Calculate probability based on provided information
    let probability = 20 // Base probability
    if (phone) probability += 10
    if (company) probability += 15
    if (serviceInterest && serviceInterest.includes('business')) probability += 25
    if (source === 'REFERRAL') probability += 30

    // Create real lead in database
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        source: source.toUpperCase(),
        status: 'NEW',
        probability: Math.min(probability, 100),
        expectedValue: estimatedValue || null,
        stage: 'initial_contact',
        assigneeId: session.user.id,
        createdById: session.user.id,
        organizationId: session.user.organizationId || 'default-org'
      }
    })

    // Send welcome email to new lead
    try {
      await sendWelcomeEmail(email, `${firstName} ${lastName}`)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail lead creation for email errors
    }

    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: lead.status,
        probability: lead.probability,
        createdAt: lead.createdAt
      },
      message: 'Real lead created and welcome email sent'
    })

  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
