

import { NextRequest, NextResponse } from 'next/server'

// Enhanced analytics API with real-time data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '6months'
    const metric = searchParams.get('metric') || 'all'

    // Simulate enhanced analytics data
    const analyticsData = {
      overview: {
        totalRevenue: 825000,
        totalClients: 1847,
        totalLeads: 3294,
        conversionRate: 56.1,
        avgClientValue: 447,
        profitMargin: 68.5
      },
      revenueData: [
        { month: 'Jan', revenue: 45000, clients: 120, leads: 200, conversions: 85 },
        { month: 'Feb', revenue: 52000, clients: 145, leads: 250, conversions: 110 },
        { month: 'Mar', revenue: 48000, clients: 130, leads: 180, conversions: 95 },
        { month: 'Apr', revenue: 61000, clients: 165, leads: 300, conversions: 140 },
        { month: 'May', revenue: 75000, clients: 190, leads: 400, conversions: 175 },
        { month: 'Jun', revenue: 82000, clients: 210, leads: 450, conversions: 195 },
        { month: 'Jul', revenue: 95000, clients: 240, leads: 520, conversions: 225 },
        { month: 'Aug', revenue: 108000, clients: 275, leads: 600, conversions: 260 }
      ],
      serviceBreakdown: [
        { name: 'Individual Tax Returns', revenue: 248000, clients: 892, avgValue: 278 },
        { name: 'Business Tax Services', revenue: 365000, clients: 387, avgValue: 943 },
        { name: 'Tax Planning', revenue: 125000, clients: 285, avgValue: 439 },
        { name: 'Debt Resolution', revenue: 87000, clients: 38, avgValue: 2289 }
      ],
      leadSources: [
        { source: 'Google Ads', leads: 890, conversions: 456, cost: 15600, roi: 285 },
        { source: 'Facebook/Meta', leads: 720, conversions: 398, cost: 12800, roi: 310 },
        { source: 'Referrals', leads: 645, conversions: 567, cost: 0, roi: Infinity },
        { source: 'Website Organic', leads: 523, conversions: 287, cost: 0, roi: Infinity },
        { source: 'Email Marketing', leads: 398, conversions: 189, cost: 2400, roi: 195 },
        { source: 'LinkedIn', leads: 118, conversions: 67, cost: 3200, roi: 87 }
      ],
      realTimeActivity: [
        {
          timestamp: new Date(Date.now() - 2 * 60000),
          type: 'lead',
          description: 'New lead from Google Ads',
          value: '$850 potential',
          priority: 'high'
        },
        {
          timestamp: new Date(Date.now() - 5 * 60000),
          type: 'completion',
          description: 'Tax return completed for John Smith',
          value: '$450 revenue',
          priority: 'normal'
        },
        {
          timestamp: new Date(Date.now() - 8 * 60000),
          type: 'payment',
          description: 'Payment received from Sarah Johnson',
          value: '$1,200',
          priority: 'normal'
        }
      ],
      performanceMetrics: {
        clientLifetimeValue: 4250,
        avgServiceRevenue: 850,
        clientRetentionRate: 89,
        referralRate: 34,
        profitMarginTrend: 12.5
      }
    }

    // Filter data based on requested metric
    if (metric !== 'all') {
      return NextResponse.json({
        success: true,
        data: analyticsData[metric as keyof typeof analyticsData] || {},
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}

// POST endpoint for updating analytics preferences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { preferences, customFilters } = body

    // Simulate saving preferences
    console.log('Analytics preferences updated:', { preferences, customFilters })

    return NextResponse.json({
      success: true,
      message: 'Analytics preferences updated successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics preferences update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
