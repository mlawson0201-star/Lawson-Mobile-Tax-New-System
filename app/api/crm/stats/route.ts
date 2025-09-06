
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

    // Get real metrics from database
    const [
      totalLeads,
      totalClients,
      totalPartners,
      activeCampaigns,
      processedReturns,
      teamMembers,
      recentLeads,
      activeDeals
    ] = await Promise.all([
      prisma.lead.count({
        where: { organizationId: session.user.organizationId }
      }),
      prisma.user.count({
        where: { 
          organizationId: session.user.organizationId,
          role: 'CLIENT'
        }
      }),
      // Partners count - using a different approach since PARTNER role may not exist
      Promise.resolve(0),
      // For now, return 0 until campaigns table is created
      Promise.resolve(0),
      // For now, return 0 until returns table is created  
      Promise.resolve(0),
      prisma.user.count({
        where: { 
          organizationId: session.user.organizationId,
          role: 'ADMIN'  // Only count admins for now
        }
      }),
      prisma.lead.count({
        where: { 
          organizationId: session.user.organizationId,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.lead.count({
        where: { 
          organizationId: session.user.organizationId,
          status: 'QUALIFIED'
        }
      })
    ])

    // Calculate conversion rate based on actual data
    const qualifiedLeads = await prisma.lead.count({
      where: { 
        organizationId: session.user.organizationId,
        status: 'QUALIFIED'
      }
    })

    const convertedClients = totalClients
    const conversionRate = totalLeads > 0 ? Math.round((convertedClients / totalLeads) * 100) : 0

    // Get recent activity
    const recentActivity = await prisma.lead.findMany({
      where: { organizationId: session.user.organizationId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        createdAt: true
      }
    })

    const stats = {
      totalLeads,
      totalClients,
      totalPartners,
      conversionRate,
      recentLeadsThisWeek: recentLeads,
      activeDeals,
      activeCampaigns,
      processedReturns,
      teamSize: teamMembers,
      systemUptime: 99.9, // This would come from monitoring system
      recentActivity: recentActivity.map(lead => ({
        id: lead.id,
        name: `${lead.firstName} ${lead.lastName}`,
        email: lead.email,
        status: lead.status,
        date: lead.createdAt,
        value: 0  // Default value since estimatedValue field doesn't exist yet
      }))
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Error fetching CRM stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CRM statistics' },
      { status: 500 }
    )
  }
}
