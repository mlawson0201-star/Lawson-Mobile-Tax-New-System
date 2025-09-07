

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organization: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const organizationId = user.organizationId
    const isServiceBureau = user.organization.type === 'SERVICE_BUREAU'

    // Get real metrics from database
    const [
      totalClients,
      totalReturns,
      totalRevenue,
      monthlyRevenue,
      pendingReturns,
      completedReturns,
      activeStaff,
      recentPayments,
      topPreparers
    ] = await Promise.all([
      // Total clients
      prisma.client.count({
        where: { organizationId }
      }),
      
      // Total tax returns
      prisma.taxReturn.count({
        where: { organizationId }
      }),
      
      // Total revenue (from payments)
      prisma.payment.aggregate({
        where: { 
          organizationId,
          status: 'COMPLETED'
        },
        _sum: { netAmount: true }
      }),
      
      // Monthly revenue (current month)
      prisma.payment.aggregate({
        where: {
          organizationId,
          status: 'COMPLETED',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { netAmount: true }
      }),
      
      // Pending returns
      prisma.taxReturn.count({
        where: { 
          organizationId,
          status: { in: ['DRAFT', 'IN_PROGRESS', 'UNDER_REVIEW'] }
        }
      }),
      
      // Completed returns
      prisma.taxReturn.count({
        where: { 
          organizationId,
          status: { in: ['FILED', 'ACCEPTED'] }
        }
      }),
      
      // Active staff
      prisma.user.count({
        where: { 
          organizationId,
          isActive: true,
          role: { in: ['TAX_PREPARER', 'STAFF', 'OFFICE_ADMIN'] }
        }
      }),
      
      // Recent payments (last 30 days)
      prisma.payment.findMany({
        where: {
          organizationId,
          status: 'COMPLETED',
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        include: {
          client: { select: { firstName: true, lastName: true } },
          taxReturn: { select: { taxYear: true, returnType: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      
      // Top preparers by returns completed
      prisma.user.findMany({
        where: {
          organizationId,
          role: 'TAX_PREPARER'
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          _count: {
            select: {
              taxReturns: {
                where: {
                  status: { in: ['FILED', 'ACCEPTED'] },
                  completedAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1) // This year
                  }
                }
              }
            }
          }
        },
        orderBy: {
          taxReturns: { _count: 'desc' }
        },
        take: 5
      })
    ])

    // If service bureau, also get office metrics
    let officeMetrics = null
    if (isServiceBureau) {
      officeMetrics = await prisma.organization.findMany({
        where: { 
          parentOrganizationId: organizationId,
          type: 'OFFICE'
        },
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          totalClients: true,
          totalReturns: true,
          monthlyRevenue: true,
          lifetimeRevenue: true,
          isActive: true,
          createdAt: true
        },
        orderBy: { lifetimeRevenue: 'desc' }
      })
    }

    // Calculate growth metrics
    const lastMonthStart = new Date(new Date().setMonth(new Date().getMonth() - 1))
    lastMonthStart.setDate(1)
    const lastMonthEnd = new Date(new Date().setMonth(new Date().getMonth(), 0))
    
    const lastMonthRevenue = await prisma.payment.aggregate({
      where: {
        organizationId,
        status: 'COMPLETED',
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd
        }
      },
      _sum: { netAmount: true }
    })

    const revenueGrowth = lastMonthRevenue._sum.netAmount 
      ? ((monthlyRevenue._sum.netAmount || 0) - lastMonthRevenue._sum.netAmount) / lastMonthRevenue._sum.netAmount * 100
      : 0

    const analytics = {
      overview: {
        totalClients,
        totalReturns,
        totalRevenue: totalRevenue._sum.netAmount || 0,
        monthlyRevenue: monthlyRevenue._sum.netAmount || 0,
        pendingReturns,
        completedReturns,
        activeStaff,
        revenueGrowth: Math.round(revenueGrowth * 100) / 100
      },
      recentPayments: recentPayments.map((payment: any) => ({
        id: payment.id,
        amount: payment.amount,
        client: payment.client ? `${payment.client.firstName} ${payment.client.lastName}` : 'Unknown',
        service: payment.taxReturn ? `${payment.taxReturn.taxYear} ${payment.taxReturn.returnType}` : payment.description,
        date: payment.createdAt,
        status: payment.status
      })),
      topPreparers: topPreparers.map((preparer: any) => ({
        id: preparer.id,
        name: `${preparer.firstName} ${preparer.lastName}`,
        completedReturns: preparer._count.taxReturns
      })),
      officeMetrics: officeMetrics?.map((office: any) => ({
        ...office,
        performance: office.lifetimeRevenue > 10000 ? 'excellent' : 
                    office.lifetimeRevenue > 5000 ? 'good' : 
                    office.lifetimeRevenue > 1000 ? 'average' : 'needs_attention'
      })) || null
    }

    return NextResponse.json({
      success: true,
      analytics,
      organizationType: user.organization.type,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching real analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

