
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get real activity data from leads and user actions
    const recentLeads = await prisma.lead.findMany({
      where: { 
        organizationId: session.user.organizationId,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        createdAt: true,
        source: true
      }
    })

    const activities = recentLeads.map(lead => ({
      id: lead.id,
      type: 'lead_created',
      title: 'New Lead Generated',
      description: `${lead.firstName} ${lead.lastName} submitted inquiry`,
      timestamp: lead.createdAt,
      value: 0,  // Default since estimatedValue doesn't exist yet
      source: lead.source,
      priority: 'normal'  // Default priority
    }))

    // Add system activities (these would come from audit logs in production)
    const systemActivities = [
      {
        id: 'system-1',
        type: 'system',
        title: 'CRM System Online',
        description: 'All systems operational and ready for client management',
        timestamp: new Date(),
        priority: 'normal'
      }
    ]

    const allActivities = [...activities, ...systemActivities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json(allActivities)

  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}
