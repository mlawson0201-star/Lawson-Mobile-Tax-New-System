
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get real campaigns from database
    const campaigns = await prisma.campaign.findMany({
      where: {
        organizationId: session.user.organizationId || 'default-org'
      },
      include: {
        recipients: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedCampaigns = campaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.type,
      status: campaign.status,
      subject: campaign.subject,
      content: campaign.content,
      recipientCount: campaign.recipients.length,
      scheduledAt: campaign.scheduledAt,
      sentAt: campaign.sentAt,
      createdAt: campaign.createdAt,
      // Calculate basic metrics from recipients
      openRate: campaign.recipients.length > 0 ? 
        Math.round((campaign.recipients.filter(r => r.openedAt).length / campaign.recipients.length) * 100) : 0,
      clickRate: campaign.recipients.length > 0 ? 
        Math.round((campaign.recipients.filter(r => r.clickedAt).length / campaign.recipients.length) * 100) : 0
    }))

    return NextResponse.json({
      success: true,
      campaigns: formattedCampaigns,
      count: campaigns.length,
      message: 'Real campaigns from database'
    })

  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json({
      success: true,
      campaigns: [],
      count: 0,
      message: 'Clean system - no campaigns yet. Create your first marketing campaign!'
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
      name, 
      description,
      type, 
      subject,
      content,
      scheduledAt
    } = body

    if (!name || !type || !content) {
      return NextResponse.json({ error: 'Name, type, and content are required' }, { status: 400 })
    }

    // Create real campaign in database
    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        type: type.toUpperCase() as any,
        subject,
        content,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: scheduledAt ? 'SCHEDULED' : 'DRAFT',
        organizationId: session.user.organizationId || 'default-org'
      }
    })

    return NextResponse.json({
      success: true,
      campaign: {
        id: campaign.id,
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        scheduledAt: campaign.scheduledAt,
        createdAt: campaign.createdAt
      },
      message: 'Real campaign created successfully'
    })

  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
