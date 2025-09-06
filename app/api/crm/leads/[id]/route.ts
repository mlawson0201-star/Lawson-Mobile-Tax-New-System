
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        organizationId: user.organizationId
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        tasks: {
          include: {
            assignee: {
              select: { name: true, email: true }
            }
          }
        },
        notes: {
          orderBy: { createdAt: 'desc' }
        },
        activities: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { status, priority, assigneeId, expectedValue, notes, customFields } = body

    // First, get the current lead
    const currentLead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        organizationId: user.organizationId
      }
    })

    if (!currentLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Update the lead
    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assigneeId !== undefined && { assigneeId }),
        ...(expectedValue !== undefined && { expectedValue: expectedValue ? parseFloat(expectedValue) : null }),
        ...(customFields && { customFields }),
        updatedAt: new Date()
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

    // Track status changes - simplified for now
    if (status && status !== currentLead.status) {
      // Update contacted date if moving to CONTACTED status
      if (status === 'CONTACTED' && !currentLead.contactedAt) {
        await prisma.lead.update({
          where: { id: params.id },
          data: { contactedAt: new Date() }
        })
      }

      // Convert to client if status is WON
      if (status === 'WON') {
        await prisma.lead.update({
          where: { id: params.id },
          data: { convertedAt: new Date() }
        })

        // Create client record
        await prisma.client.create({
          data: {
            firstName: currentLead.firstName,
            lastName: currentLead.lastName,
            email: currentLead.email,
            phone: currentLead.phone,
            company: currentLead.company,
            leadId: params.id,
            organizationId: user.organizationId,
            customFields: currentLead.customFields || {}
          }
        })
      }
    }

    return NextResponse.json(updatedLead)
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if lead exists and belongs to user's organization
    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        organizationId: user.organizationId
      }
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Delete related records first (due to foreign key constraints)
    await prisma.task.deleteMany({
      where: { leadId: params.id }
    })

    await prisma.note.deleteMany({
      where: { leadId: params.id }
    })

    await prisma.activity.deleteMany({
      where: { leadId: params.id }
    })

    // Delete the lead
    await prisma.lead.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
