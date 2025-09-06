
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const where: any = {
      organizationId: user.organizationId
    }

    if (status && status !== 'all') {
      where.status = status
    }

    if (priority && priority !== 'all') {
      where.priority = priority
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          assignee: {
            select: { name: true, email: true }
          },
          createdBy: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      }),
      prisma.lead.count({ where })
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      source,
      status = 'NEW',
      priority = 'MEDIUM',
      expectedValue,
      assigneeId,
      notes,
      customFields = {}
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        source,
        status,
        priority,
        expectedValue: expectedValue ? parseFloat(expectedValue) : null,
        assigneeId,
        createdById: session.user.id,
        organizationId: user.organizationId,
        customFields,
        stage: status === 'NEW' ? 'initial_contact' : 'qualified'
      },
      include: {
        assignee: {
          select: { name: true, email: true }
        },
        createdBy: {
          select: { name: true, email: true }
        }
      }
    })

    // Create initial activity - commented out due to schema mismatch
    // await prisma.activity.create({
    //   data: {
    //     type: 'LEAD_CREATED',
    //     description: `Lead created: ${firstName} ${lastName}`,
    //     userId: session.user.id,
    //     organizationId: user.organizationId,
    //     leadId: lead.id,
    //     metadata: { source, priority, expectedValue }
    //   }
    // })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
