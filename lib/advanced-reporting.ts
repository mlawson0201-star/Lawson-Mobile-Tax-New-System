
// Advanced Reporting & Analytics - Phase 2 Business Expansion
// Business intelligence and client insights for Lawson Mobile Tax

export interface ReportConfiguration {
  id: string
  name: string
  description: string
  category: 'financial' | 'tax' | 'compliance' | 'business' | 'client'
  type: 'dashboard' | 'detailed' | 'summary' | 'comparison' | 'forecast'
  frequency: 'real-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'on-demand'
  parameters: ReportParameter[]
  visualizations: VisualizationType[]
  recipients: string[]
  isAutomated: boolean
  nextRun?: Date
  lastGenerated?: Date
  accessLevel: 'public' | 'client' | 'preparer' | 'admin' | 'owner'
}

export interface ReportParameter {
  key: string
  label: string
  type: 'date' | 'dateRange' | 'select' | 'multiSelect' | 'number' | 'text' | 'boolean'
  required: boolean
  defaultValue?: any
  options?: { value: any; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export type VisualizationType = 
  | 'table' 
  | 'bar_chart' 
  | 'line_chart' 
  | 'pie_chart' 
  | 'donut_chart'
  | 'area_chart' 
  | 'scatter_plot' 
  | 'heatmap' 
  | 'gauge' 
  | 'kpi_card'
  | 'trend_indicator'
  | 'waterfall'
  | 'funnel'
  | 'comparison_table'
  | 'alert_cards'
  | 'forecast_chart'

export interface ReportData {
  id: string
  reportId: string
  generatedAt: Date
  generatedBy: string
  parameters: { [key: string]: any }
  data: {
    summary: { [key: string]: number | string }
    details: any[]
    trends: TrendData[]
    comparisons?: ComparisonData[]
    forecasts?: ForecastData[]
  }
  insights: ReportInsight[]
  recommendations: ReportRecommendation[]
  metadata: {
    recordCount: number
    dateRange: { start: Date; end: Date }
    filters: string[]
    executionTime: number
  }
}

export interface TrendData {
  period: string
  value: number
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'stable'
}

export interface ComparisonData {
  label: string
  current: number
  previous: number
  change: number
  changePercent: number
  benchmark?: number
}

export interface ForecastData {
  period: string
  predicted: number
  confidence: number
  lower_bound: number
  upper_bound: number
  factors: string[]
}

export interface ReportInsight {
  id: string
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly' | 'achievement'
  priority: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  impact: number // 1-10 scale
  confidence: number // 0-100%
  data: any
  relatedMetrics: string[]
}

export interface ReportRecommendation {
  id: string
  category: 'cost_reduction' | 'revenue_growth' | 'tax_optimization' | 'compliance' | 'efficiency'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
  description: string
  expectedBenefit: string
  effort: 'low' | 'medium' | 'high'
  timeline: string
  actionItems: string[]
  metrics: string[]
}

export interface ClientDashboard {
  clientId: string
  lastUpdated: Date
  kpis: {
    totalRefund: number
    taxSavings: number
    effectiveTaxRate: number
    deductionsClaimed: number
    complianceScore: number
  }
  alerts: ClientAlert[]
  upcomingTasks: ClientTask[]
  yearOverYearComparison: {
    metric: string
    current: number
    previous: number
    change: number
  }[]
  personalizedInsights: string[]
}

export interface ClientAlert {
  id: string
  type: 'deadline' | 'opportunity' | 'required_action' | 'information'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
  message: string
  dueDate?: Date
  actionRequired: boolean
  actionUrl?: string
}

export interface ClientTask {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  category: 'document_upload' | 'review_required' | 'signature_needed' | 'payment_due' | 'information_needed'
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  assignedTo: 'client' | 'preparer'
}

export class AdvancedReporting {

  /**
   * Get predefined report configurations
   */
  static getReportConfigurations(): ReportConfiguration[] {
    return [
      {
        id: 'client_financial_summary',
        name: 'Client Financial Summary',
        description: 'Comprehensive overview of client\'s financial position and tax situation',
        category: 'financial',
        type: 'dashboard',
        frequency: 'monthly',
        parameters: [
          {
            key: 'clientId',
            label: 'Client',
            type: 'select',
            required: true,
            options: [] // Populated dynamically
          },
          {
            key: 'dateRange',
            label: 'Date Range',
            type: 'dateRange',
            required: true,
            defaultValue: { start: '2024-01-01', end: '2024-12-31' }
          }
        ],
        visualizations: ['kpi_card', 'bar_chart', 'trend_indicator', 'table'],
        recipients: ['client', 'assigned_preparer'],
        isAutomated: true,
        accessLevel: 'client'
      },

      {
        id: 'tax_optimization_analysis',
        name: 'Tax Optimization Analysis',
        description: 'Detailed analysis of tax-saving opportunities and strategies',
        category: 'tax',
        type: 'detailed',
        frequency: 'quarterly',
        parameters: [
          {
            key: 'clientId',
            label: 'Client',
            type: 'select',
            required: true
          },
          {
            key: 'taxYear',
            label: 'Tax Year',
            type: 'select',
            required: true,
            options: [
              { value: 2025, label: '2025' },
              { value: 2024, label: '2024' },
              { value: 2023, label: '2023' }
            ],
            defaultValue: 2025
          },
          {
            key: 'includeForecasting',
            label: 'Include Next Year Forecast',
            type: 'boolean',
            required: false,
            defaultValue: true
          }
        ],
        visualizations: ['waterfall', 'pie_chart', 'comparison_table', 'trend_indicator'],
        recipients: ['client', 'assigned_preparer'],
        isAutomated: false,
        accessLevel: 'client'
      },

      {
        id: 'business_performance_dashboard',
        name: 'Business Performance Dashboard',
        description: 'Real-time business metrics and KPIs for bookkeeping clients',
        category: 'business',
        type: 'dashboard',
        frequency: 'real-time',
        parameters: [
          {
            key: 'clientId',
            label: 'Business Client',
            type: 'select',
            required: true
          },
          {
            key: 'period',
            label: 'Comparison Period',
            type: 'select',
            required: true,
            options: [
              { value: 'mtd', label: 'Month to Date' },
              { value: 'qtd', label: 'Quarter to Date' },
              { value: 'ytd', label: 'Year to Date' },
              { value: 'rolling_12', label: 'Rolling 12 Months' }
            ],
            defaultValue: 'mtd'
          }
        ],
        visualizations: ['kpi_card', 'line_chart', 'gauge', 'heatmap'],
        recipients: ['client'],
        isAutomated: true,
        accessLevel: 'client'
      },

      {
        id: 'compliance_monitoring',
        name: 'Compliance Monitoring Report',
        description: 'Track compliance deadlines, filings, and regulatory requirements',
        category: 'compliance',
        type: 'summary',
        frequency: 'weekly',
        parameters: [
          {
            key: 'clientType',
            label: 'Client Type',
            type: 'multiSelect',
            required: false,
            options: [
              { value: 'individual', label: 'Individual' },
              { value: 'business', label: 'Business' },
              { value: 'nonprofit', label: 'Non-Profit' },
              { value: 'trust', label: 'Trust/Estate' }
            ]
          },
          {
            key: 'urgencyLevel',
            label: 'Show Only Urgent Items',
            type: 'boolean',
            required: false,
            defaultValue: false
          }
        ],
        visualizations: ['table', 'funnel', 'alert_cards'],
        recipients: ['all_preparers', 'admin'],
        isAutomated: true,
        accessLevel: 'preparer'
      },

      {
        id: 'revenue_analysis',
        name: 'Firm Revenue Analysis',
        description: 'Comprehensive analysis of firm revenue, profitability, and growth trends',
        category: 'business',
        type: 'detailed',
        frequency: 'monthly',
        parameters: [
          {
            key: 'dateRange',
            label: 'Analysis Period',
            type: 'dateRange',
            required: true
          },
          {
            key: 'serviceType',
            label: 'Service Type',
            type: 'multiSelect',
            required: false,
            options: [
              { value: 'tax_prep', label: 'Tax Preparation' },
              { value: 'bookkeeping', label: 'Bookkeeping' },
              { value: 'consulting', label: 'Tax Consulting' },
              { value: 'audit_support', label: 'Audit Support' }
            ]
          },
          {
            key: 'includeForecasting',
            label: 'Include Revenue Forecasting',
            type: 'boolean',
            required: false,
            defaultValue: true
          }
        ],
        visualizations: ['bar_chart', 'line_chart', 'pie_chart', 'waterfall', 'forecast_chart'],
        recipients: ['owner', 'admin'],
        isAutomated: true,
        accessLevel: 'owner'
      },

      {
        id: 'client_satisfaction_metrics',
        name: 'Client Satisfaction & Retention Analysis',
        description: 'Track client satisfaction scores, retention rates, and feedback trends',
        category: 'client',
        type: 'dashboard',
        frequency: 'monthly',
        parameters: [
          {
            key: 'timeFrame',
            label: 'Analysis Period',
            type: 'select',
            required: true,
            options: [
              { value: '30_days', label: 'Last 30 Days' },
              { value: '90_days', label: 'Last 90 Days' },
              { value: '6_months', label: 'Last 6 Months' },
              { value: '12_months', label: 'Last 12 Months' }
            ],
            defaultValue: '90_days'
          }
        ],
        visualizations: ['gauge', 'trend_indicator', 'heatmap', 'scatter_plot'],
        recipients: ['owner', 'admin', 'team_leads'],
        isAutomated: true,
        accessLevel: 'admin'
      }
    ]
  }

  /**
   * Generate report data based on configuration
   */
  static generateReport(
    reportId: string, 
    parameters: { [key: string]: any },
    userId: string
  ): ReportData {
    
    const config = this.getReportConfigurations().find(r => r.id === reportId)
    if (!config) {
      throw new Error(`Report configuration ${reportId} not found`)
    }

    const startTime = Date.now()
    
    // Mock data generation based on report type
    const data = this.generateMockData(reportId, parameters)
    
    const executionTime = Date.now() - startTime

    return {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      reportId,
      generatedAt: new Date(),
      generatedBy: userId,
      parameters,
      data,
      insights: this.generateInsights(reportId, data),
      recommendations: this.generateRecommendations(reportId, data),
      metadata: {
        recordCount: Array.isArray(data.details) ? data.details.length : 0,
        dateRange: {
          start: parameters.dateRange?.start || new Date(2024, 0, 1),
          end: parameters.dateRange?.end || new Date()
        },
        filters: Object.keys(parameters),
        executionTime
      }
    }
  }

  /**
   * Generate client dashboard
   */
  static generateClientDashboard(clientId: string): ClientDashboard {
    
    // Mock dashboard data - would be calculated from real client data
    return {
      clientId,
      lastUpdated: new Date(),
      kpis: {
        totalRefund: 3542,
        taxSavings: 1834,
        effectiveTaxRate: 18.2,
        deductionsClaimed: 12750,
        complianceScore: 98
      },
      alerts: [
        {
          id: 'alert_1',
          type: 'deadline',
          priority: 'high',
          title: 'Q4 Estimated Tax Payment Due',
          message: 'Your Q4 estimated tax payment of $2,150 is due January 15, 2025',
          dueDate: new Date('2025-01-15'),
          actionRequired: true,
          actionUrl: '/payments/estimated-tax'
        },
        {
          id: 'alert_2',
          type: 'opportunity',
          priority: 'medium',
          title: 'Maximize IRA Contribution',
          message: 'You can still contribute $3,500 to your IRA before the tax deadline to save additional taxes',
          actionRequired: false
        }
      ],
      upcomingTasks: [
        {
          id: 'task_1',
          title: 'Upload W-2 Forms',
          description: 'Please upload your 2024 W-2 forms when received from employers',
          dueDate: new Date('2025-02-15'),
          priority: 'high',
          category: 'document_upload',
          status: 'pending',
          assignedTo: 'client'
        },
        {
          id: 'task_2',
          title: 'Review Draft Tax Return',
          description: 'Your draft tax return is ready for review and approval',
          dueDate: new Date('2025-02-28'),
          priority: 'medium',
          category: 'review_required',
          status: 'pending',
          assignedTo: 'client'
        }
      ],
      yearOverYearComparison: [
        { metric: 'Total Income', current: 85000, previous: 78000, change: 8.97 },
        { metric: 'Total Deductions', current: 16400, previous: 14200, change: 15.49 },
        { metric: 'Federal Tax Liability', current: 12480, previous: 11850, change: 5.32 },
        { metric: 'Effective Tax Rate', current: 18.2, previous: 19.1, change: -0.9 }
      ] as { metric: string; current: number; previous: number; change: number }[],
      personalizedInsights: [
        'Your effective tax rate decreased by 0.9% compared to last year due to increased retirement contributions',
        'Consider maximizing your HSA contribution to save an additional $1,200 in taxes',
        'Your home office deduction increased significantly - ensure you maintain proper documentation'
      ]
    }
  }

  /**
   * Generate business intelligence insights
   */
  private static generateInsights(reportId: string, data: any): ReportInsight[] {
    const insights: ReportInsight[] = []

    switch (reportId) {
      case 'client_financial_summary':
        if (data.summary.effectiveTaxRate > 25) {
          insights.push({
            id: `insight_${Date.now()}_1`,
            type: 'opportunity',
            priority: 'high',
            title: 'High Effective Tax Rate Detected',
            description: 'Client\'s effective tax rate is above 25%, indicating potential tax optimization opportunities',
            impact: 8,
            confidence: 85,
            data: { effectiveTaxRate: data.summary.effectiveTaxRate },
            relatedMetrics: ['tax_liability', 'deductions', 'credits']
          })
        }
        break

      case 'business_performance_dashboard':
        if (data.trends.length > 0) {
          const revenueTrend = data.trends.find((t: TrendData) => t.period.includes('Revenue'))
          if (revenueTrend && revenueTrend.changePercent < -10) {
            insights.push({
              id: `insight_${Date.now()}_2`,
              type: 'risk',
              priority: 'critical',
              title: 'Significant Revenue Decline',
              description: `Revenue has declined by ${Math.abs(revenueTrend.changePercent)}% - immediate attention required`,
              impact: 9,
              confidence: 92,
              data: revenueTrend,
              relatedMetrics: ['revenue', 'customer_acquisition', 'retention']
            })
          }
        }
        break
    }

    return insights
  }

  /**
   * Generate actionable recommendations
   */
  private static generateRecommendations(reportId: string, data: any): ReportRecommendation[] {
    const recommendations: ReportRecommendation[] = []

    switch (reportId) {
      case 'tax_optimization_analysis':
        recommendations.push({
          id: `rec_${Date.now()}_1`,
          category: 'tax_optimization',
          priority: 'high',
          title: 'Maximize Retirement Contributions',
          description: 'Increase 401(k) contribution to the maximum limit to reduce taxable income',
          expectedBenefit: 'Save approximately $2,400 in federal taxes',
          effort: 'low',
          timeline: 'Before year-end',
          actionItems: [
            'Contact HR to increase 401(k) contribution',
            'Calculate maximum allowable contribution',
            'Set up automatic payroll deduction increase'
          ],
          metrics: ['tax_liability', 'retirement_savings', 'effective_tax_rate']
        })
        break

      case 'business_performance_dashboard':
        recommendations.push({
          id: `rec_${Date.now()}_2`,
          category: 'revenue_growth',
          priority: 'medium',
          title: 'Optimize Pricing Strategy',
          description: 'Analysis shows room for 8-12% price increase based on market positioning',
          expectedBenefit: 'Increase revenue by $15,000-$25,000 annually',
          effort: 'medium',
          timeline: '60-90 days',
          actionItems: [
            'Conduct competitive pricing analysis',
            'Survey existing customers for price sensitivity',
            'Implement tiered pricing model',
            'Monitor customer retention post-increase'
          ],
          metrics: ['revenue_per_client', 'profit_margin', 'customer_retention']
        })
        break
    }

    return recommendations
  }

  /**
   * Generate mock data for reports
   */
  private static generateMockData(reportId: string, parameters: any): any {
    switch (reportId) {
      case 'client_financial_summary':
        return {
          summary: {
            totalIncome: 85000,
            totalDeductions: 16400,
            taxLiability: 12480,
            effectiveTaxRate: 18.2,
            refundAmount: 3542
          },
          details: [
            { category: 'W-2 Income', amount: 75000, percentage: 88.2 },
            { category: '1099 Income', amount: 8500, percentage: 10.0 },
            { category: 'Investment Income', amount: 1500, percentage: 1.8 }
          ],
          trends: [
            { period: '2023', value: 78000, change: 0, changePercent: 0, trend: 'stable' as const },
            { period: '2024', value: 85000, change: 7000, changePercent: 8.97, trend: 'up' as const }
          ]
        }

      case 'business_performance_dashboard':
        return {
          summary: {
            monthlyRevenue: 45000,
            monthlyExpenses: 32000,
            netIncome: 13000,
            profitMargin: 28.9,
            cashFlow: 18500
          },
          details: [
            { month: 'Jan', revenue: 42000, expenses: 30000, netIncome: 12000 },
            { month: 'Feb', revenue: 38000, expenses: 28000, netIncome: 10000 },
            { month: 'Mar', revenue: 45000, expenses: 32000, netIncome: 13000 }
          ],
          trends: [
            { period: 'Q1 2024', value: 125000, change: 8000, changePercent: 6.8, trend: 'up' as const }
          ]
        }

      default:
        return {
          summary: {},
          details: [],
          trends: []
        }
    }
  }

  /**
   * Schedule automated reports
   */
  static scheduleAutomatedReports(): void {
    const automatedReports = this.getReportConfigurations().filter(r => r.isAutomated)
    
    automatedReports.forEach(report => {
      console.log(`Scheduling ${report.frequency} report: ${report.name}`)
      // Integration with job scheduler would go here
    })
  }

  /**
   * Export report to various formats
   */
  static exportReport(
    reportData: ReportData, 
    format: 'pdf' | 'excel' | 'csv' | 'json'
  ): { url: string; filename: string } {
    
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${reportData.reportId}_${timestamp}.${format}`
    
    // Mock export URLs - would integrate with actual export service
    const exportUrls = {
      pdf: `/exports/pdf/${filename}`,
      excel: `/exports/excel/${filename}`,
      csv: `/exports/csv/${filename}`,
      json: `/exports/json/${filename}`
    }

    return {
      url: exportUrls[format],
      filename
    }
  }

  /**
   * Get report performance metrics
   */
  static getReportMetrics(): {
    totalReports: number
    mostRequested: string[]
    averageGenerationTime: number
    userEngagement: { reportId: string; views: number; exports: number }[]
  } {
    
    // Mock metrics - would be calculated from usage analytics
    return {
      totalReports: 1247,
      mostRequested: [
        'Client Financial Summary',
        'Tax Optimization Analysis', 
        'Business Performance Dashboard'
      ],
      averageGenerationTime: 2.3, // seconds
      userEngagement: [
        { reportId: 'client_financial_summary', views: 342, exports: 89 },
        { reportId: 'tax_optimization_analysis', views: 278, exports: 156 },
        { reportId: 'business_performance_dashboard', views: 195, exports: 67 }
      ]
    }
  }
}

export default AdvancedReporting
