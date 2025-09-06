
// Bookkeeping Services - Phase 2 Business Expansion
// Comprehensive bookkeeping and accounting services for Lawson Mobile Tax

export interface BookkeepingPackage {
  id: string
  name: string
  description: string
  pricing: {
    monthly: number
    quarterly: number
    annually: number
  }
  features: string[]
  idealFor: string[]
  assignedProfessional: string
  processingTime: string
  includes: string[]
  addOns: BookkeepingAddOn[]
  maxTransactions: number
  reportingFrequency: string[]
  softwareIntegrations: string[]
}

export interface BookkeepingAddOn {
  id: string
  name: string
  description: string
  monthlyPrice: number
  oneTimePrice?: number
  category: 'reporting' | 'compliance' | 'analysis' | 'integration'
}

export interface BookkeepingTransaction {
  id: string
  date: Date
  description: string
  amount: number
  category: string
  account: string
  type: 'income' | 'expense' | 'transfer'
  status: 'pending' | 'approved' | 'reconciled'
  attachments: string[]
  notes?: string
  taxDeductible: boolean
  clientId: string
}

export interface FinancialReport {
  id: string
  type: 'profit_loss' | 'balance_sheet' | 'cash_flow' | 'tax_summary' | 'budget_variance'
  period: {
    start: Date
    end: Date
    frequency: 'monthly' | 'quarterly' | 'annually'
  }
  data: any
  insights: string[]
  recommendations: string[]
  generatedAt: Date
  generatedBy: string
}

export class BookkeepingServices {
  
  /**
   * Get all bookkeeping service packages
   */
  static getBookkeepingPackages(): BookkeepingPackage[] {
    return [
      {
        id: 'essential_books',
        name: 'Essential Bookkeeping',
        description: 'Basic monthly bookkeeping for small businesses and freelancers',
        pricing: {
          monthly: 299,
          quarterly: 799,
          annually: 2999
        },
        features: [
          'Monthly financial statements',
          'Transaction categorization and reconciliation',
          'Accounts payable and receivable tracking',
          'Basic expense management',
          'QuickBooks Online setup and maintenance',
          'Monthly financial review call',
          'Tax-ready financial records'
        ],
        idealFor: [
          'Solo entrepreneurs and freelancers',
          'Small service-based businesses',
          'E-commerce sellers under $100K revenue',
          'Consultants and contractors',
          'New businesses (first 2 years)'
        ],
        assignedProfessional: 'Sarah Chen, EA & QuickBooks ProAdvisor',
        processingTime: '5-7 business days monthly',
        includes: [
          'Up to 100 transactions per month',
          'Monthly Profit & Loss statement',
          'Monthly Balance Sheet',
          'Cash flow tracking',
          '30-minute monthly review call',
          'QuickBooks Online included ($30/month value)',
          'Tax preparation discount (15% off)'
        ],
        addOns: [
          {
            id: 'payroll_basic',
            name: 'Basic Payroll Processing',
            description: 'Monthly payroll for up to 5 employees',
            monthlyPrice: 149,
            category: 'compliance'
          },
          {
            id: 'sales_tax',
            name: 'Sales Tax Filing',
            description: 'Monthly or quarterly sales tax preparation and filing',
            monthlyPrice: 89,
            category: 'compliance'
          },
          {
            id: 'budget_analysis',
            name: 'Budget vs. Actual Analysis',
            description: 'Monthly budget variance analysis with recommendations',
            monthlyPrice: 99,
            category: 'analysis'
          }
        ],
        maxTransactions: 100,
        reportingFrequency: ['monthly'],
        softwareIntegrations: ['QuickBooks Online', 'Stripe', 'PayPal', 'Square', 'Bank Feeds']
      },

      {
        id: 'professional_books',
        name: 'Professional Bookkeeping',
        description: 'Comprehensive bookkeeping with advanced reporting for growing businesses',
        pricing: {
          monthly: 599,
          quarterly: 1699,
          annually: 6299
        },
        features: [
          'Weekly transaction processing',
          'Advanced financial statement analysis',
          'Budget creation and variance analysis',
          'Cash flow forecasting',
          'Custom reporting and KPI tracking',
          'Bi-weekly financial review calls',
          'Multi-entity bookkeeping support',
          'Integration with CRM and inventory systems'
        ],
        idealFor: [
          'Growing businesses ($100K-$500K revenue)',
          'Multi-location service businesses',
          'Product-based businesses with inventory',
          'Businesses with employees (5-20)',
          'Companies preparing for financing'
        ],
        assignedProfessional: 'Jennifer Martinez, CPA',
        processingTime: '3-5 business days weekly',
        includes: [
          'Up to 300 transactions per month',
          'Weekly financial updates',
          'Monthly comprehensive financial package',
          'Quarterly business review meeting',
          'Custom dashboard and KPI tracking',
          'Advanced software integrations',
          'Tax preparation discount (20% off)',
          'CFO-level insights and recommendations'
        ],
        addOns: [
          {
            id: 'payroll_advanced',
            name: 'Advanced Payroll & HR',
            description: 'Full payroll processing with benefits administration',
            monthlyPrice: 299,
            category: 'compliance'
          },
          {
            id: 'inventory_management',
            name: 'Inventory Accounting',
            description: 'Cost of goods sold tracking and inventory valuation',
            monthlyPrice: 199,
            category: 'reporting'
          },
          {
            id: 'financial_modeling',
            name: 'Financial Modeling & Forecasting',
            description: '12-month financial projections and scenario planning',
            oneTimePrice: 1500,
            monthlyPrice: 249,
            category: 'analysis'
          }
        ],
        maxTransactions: 300,
        reportingFrequency: ['weekly', 'monthly', 'quarterly'],
        softwareIntegrations: [
          'QuickBooks Online/Desktop', 'Xero', 'NetSuite', 'Shopify', 
          'WooCommerce', 'Amazon Seller Central', 'HubSpot', 'Salesforce'
        ]
      },

      {
        id: 'enterprise_books',
        name: 'Enterprise Financial Management',
        description: 'Full-service CFO-level financial management and strategic planning',
        pricing: {
          monthly: 1299,
          quarterly: 3599,
          annually: 13499
        },
        features: [
          'Daily financial monitoring and alerts',
          'Multi-entity consolidated reporting',
          'Advanced cash flow management',
          'Financial planning and analysis (FP&A)',
          'Board-ready financial presentations',
          'Weekly executive financial briefings',
          'Audit preparation and support',
          'Strategic financial consulting'
        ],
        idealFor: [
          'Established businesses ($500K+ revenue)',
          'Multi-entity corporations',
          'Companies with investors or board of directors',
          'Businesses preparing for sale or acquisition',
          'High-growth companies needing CFO support'
        ],
        assignedProfessional: 'Robert Williams, CPA & MBA',
        processingTime: 'Real-time to 24 hours',
        includes: [
          'Unlimited transactions',
          'Daily financial dashboard updates',
          'Weekly executive summary reports',
          'Monthly board-ready financial package',
          'Quarterly strategic business reviews',
          'Annual budget planning and forecasting',
          'Audit preparation and liaison',
          'Tax planning integration (25% discount)',
          'Direct CFO advisory access'
        ],
        addOns: [
          {
            id: 'fractional_cfo',
            name: 'Fractional CFO Services',
            description: 'Part-time CFO strategic guidance and oversight',
            monthlyPrice: 2499,
            category: 'analysis'
          },
          {
            id: 'audit_preparation',
            name: 'Audit Preparation & Support',
            description: 'Complete audit readiness and CPA firm liaison',
            oneTimePrice: 3500,
            monthlyPrice: 499,
            category: 'compliance'
          },
          {
            id: 'due_diligence',
            name: 'Due Diligence Support',
            description: 'M&A due diligence preparation and data room management',
            oneTimePrice: 7500,
            monthlyPrice: 0, // One-time service
            category: 'analysis'
          }
        ],
        maxTransactions: -1, // Unlimited
        reportingFrequency: ['daily', 'weekly', 'monthly', 'quarterly', 'annually'],
        softwareIntegrations: [
          'All major accounting software', 'ERP systems', 'BI tools',
          'Banking APIs', 'Investment platforms', 'Custom integrations'
        ]
      }
    ]
  }

  /**
   * Calculate bookkeeping service cost with add-ons
   */
  static calculateBookkeepingCost(
    packageId: string,
    billingFrequency: 'monthly' | 'quarterly' | 'annually',
    addOnIds: string[] = [],
    months: number = 12
  ): {
    baseCost: number
    addOnCost: number
    totalCost: number
    monthlyCost: number
    savings?: number
  } {
    
    const package_ = this.getBookkeepingPackages().find(pkg => pkg.id === packageId)
    if (!package_) {
      return { baseCost: 0, addOnCost: 0, totalCost: 0, monthlyCost: 0 }
    }

    const baseCost = package_.pricing[billingFrequency]
    
    // Calculate add-on costs
    const addOnCost = addOnIds.reduce((total, addOnId) => {
      const addOn = package_.addOns.find(ao => ao.id === addOnId)
      if (!addOn) return total
      
      // Use monthly price for add-ons, adjusted for billing frequency
      const addOnMonthly = addOn.monthlyPrice
      switch (billingFrequency) {
        case 'monthly':
          return total + addOnMonthly
        case 'quarterly':
          return total + (addOnMonthly * 3)
        case 'annually':
          return total + (addOnMonthly * 12 * 0.9) // 10% discount for annual add-ons
        default:
          return total
      }
    }, 0)

    const totalCost = baseCost + addOnCost
    
    // Calculate monthly equivalent and savings
    const monthlyCost = billingFrequency === 'monthly' ? totalCost :
                       billingFrequency === 'quarterly' ? totalCost / 3 :
                       totalCost / 12

    const monthlyEquivalent = package_.pricing.monthly + 
      (addOnIds.reduce((total, addOnId) => {
        const addOn = package_.addOns.find(ao => ao.id === addOnId)
        return total + (addOn?.monthlyPrice || 0)
      }, 0))

    const savings = billingFrequency !== 'monthly' ? 
      (monthlyEquivalent * (billingFrequency === 'quarterly' ? 3 : 12)) - totalCost : 
      undefined

    return {
      baseCost,
      addOnCost,
      totalCost,
      monthlyCost,
      savings
    }
  }

  /**
   * Generate financial insights from bookkeeping data
   */
  static generateFinancialInsights(
    transactions: BookkeepingTransaction[],
    previousPeriod?: BookkeepingTransaction[]
  ): {
    insights: string[]
    recommendations: string[]
    kpis: { [key: string]: number }
    trends: { [key: string]: 'up' | 'down' | 'stable' }
  } {
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const netIncome = income - expenses
    const profitMargin = income > 0 ? (netIncome / income) * 100 : 0
    
    const taxDeductibleExpenses = transactions
      .filter(t => t.type === 'expense' && t.taxDeductible)
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate trends if previous period provided
    const trends: { [key: string]: 'up' | 'down' | 'stable' } = {}
    if (previousPeriod) {
      const prevIncome = previousPeriod
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const incomeChange = income - prevIncome
      trends.income = incomeChange > (prevIncome * 0.05) ? 'up' : 
                     incomeChange < -(prevIncome * 0.05) ? 'down' : 'stable'
    }

    const insights: string[] = []
    const recommendations: string[] = []

    // Generate insights
    if (profitMargin > 20) {
      insights.push(`Strong profit margin of ${profitMargin.toFixed(1)}% indicates healthy business operations.`)
    } else if (profitMargin < 10) {
      insights.push(`Profit margin of ${profitMargin.toFixed(1)}% is below industry average - review pricing and expenses.`)
      recommendations.push('Consider raising prices or reducing operational costs to improve profitability.')
    }

    if (taxDeductibleExpenses > expenses * 0.3) {
      insights.push(`${((taxDeductibleExpenses/expenses)*100).toFixed(1)}% of expenses are tax-deductible - good tax planning.`)
    } else {
      recommendations.push('Review expense categorization to maximize tax deductions.')
    }

    // Cash flow insights
    if (trends.income === 'up') {
      insights.push('Revenue is trending upward - consider scaling operations or increasing marketing investment.')
    } else if (trends.income === 'down') {
      insights.push('Revenue decline detected - investigate customer retention and acquisition strategies.')
      recommendations.push('Implement customer feedback surveys and review pricing strategy.')
    }

    const kpis = {
      totalRevenue: income,
      totalExpenses: expenses,
      netIncome,
      profitMargin,
      taxDeductibleExpenses,
      averageTransactionValue: transactions.length > 0 ? income / transactions.filter(t => t.type === 'income').length : 0
    }

    return { insights, recommendations, kpis, trends }
  }

  /**
   * Get recommended bookkeeping package based on business profile
   */
  static getRecommendedPackage(businessProfile: {
    annualRevenue: number
    monthlyTransactions: number
    employees: number
    businessType: string
    hasInventory: boolean
    multipleLocations: boolean
    seekingFinancing: boolean
  }): BookkeepingPackage {
    
    const packages = this.getBookkeepingPackages()
    
    // Enterprise level
    if (businessProfile.annualRevenue >= 500000 || 
        businessProfile.multipleLocations || 
        businessProfile.seekingFinancing ||
        businessProfile.employees > 20) {
      return packages.find(p => p.id === 'enterprise_books') || packages[2]
    }
    
    // Professional level
    if (businessProfile.annualRevenue >= 100000 || 
        businessProfile.monthlyTransactions > 100 ||
        businessProfile.employees > 5 ||
        businessProfile.hasInventory) {
      return packages.find(p => p.id === 'professional_books') || packages[1]
    }
    
    // Essential level
    return packages.find(p => p.id === 'essential_books') || packages[0]
  }

  /**
   * Generate monthly bookkeeping report
   */
  static generateMonthlyReport(
    transactions: BookkeepingTransaction[],
    previousMonth?: BookkeepingTransaction[]
  ): FinancialReport {
    
    const insights = this.generateFinancialInsights(transactions, previousMonth)
    
    return {
      id: `report_${Date.now()}`,
      type: 'profit_loss',
      period: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        frequency: 'monthly'
      },
      data: {
        summary: insights.kpis,
        transactions: transactions.length,
        categories: this.categorizeTransactions(transactions)
      },
      insights: insights.insights,
      recommendations: insights.recommendations,
      generatedAt: new Date(),
      generatedBy: 'Lawson Mobile Tax Bookkeeping Services'
    }
  }

  /**
   * Categorize transactions for reporting
   */
  private static categorizeTransactions(transactions: BookkeepingTransaction[]): { [category: string]: number } {
    return transactions.reduce((categories, transaction) => {
      const category = transaction.category || 'Uncategorized'
      categories[category] = (categories[category] || 0) + Math.abs(transaction.amount)
      return categories
    }, {} as { [category: string]: number })
  }
}

export default BookkeepingServices
