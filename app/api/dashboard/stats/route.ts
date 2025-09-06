
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const organizationId = session.user.organizationId

    // Get dashboard stats
    const [
      totalLeads,
      convertedLeads,
      activeTaxReturns,
      completedReturns,
      totalClients
    ] = await Promise.all([
      // Total leads
      prisma.lead.count({
        where: { organizationId }
      }),
      
      // Converted leads (have associated client)
      prisma.lead.count({
        where: { 
          organizationId,
          client: { isNot: null }
        }
      }),
      
      // Active tax returns (in progress)
      prisma.taxReturn.count({
        where: { 
          organizationId,
          status: {
            in: ['DRAFT', 'IN_PROGRESS', 'UNDER_REVIEW', 'READY_FOR_SIGNATURE']
          }
        }
      }),
      
      // Completed tax returns
      prisma.taxReturn.count({
        where: { 
          organizationId,
          status: {
            in: ['FILED', 'ACCEPTED']
          }
        }
      }),
      
      // Total clients
      prisma.client.count({
        where: { organizationId }
      })
    ])

    // Calculate mock revenue and growth (you can replace with actual calculations)
    const avgRevenuePerClient = 500 // Average revenue per client
    const totalRevenue = totalClients * avgRevenuePerClient
    const monthlyGrowth = totalLeads > 0 ? Math.round(((convertedLeads / totalLeads) * 100) * 100) / 100 : 0

    const stats = {
      totalLeads,
      convertedLeads,
      activeTaxReturns,
      completedReturns,
      totalRevenue,
      monthlyGrowth
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
