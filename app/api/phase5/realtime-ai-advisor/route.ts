
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface TaxScenario {
  income: number
  filingStatus: 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'
  deductions: number
  dependents: number
  selfEmployed: boolean
  homeOffice: boolean
  businessExpenses: number
  retirementContributions: number
}

interface AIInsight {
  id: string
  type: 'calculation' | 'optimization' | 'warning' | 'planning'
  title: string
  description: string
  impact: number
  confidence: number
  actionRequired: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
}

// REAL TAX CALCULATION ENGINE
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { scenario, query } = await request.json()
    
    // Real-time tax calculations using 2024 tax brackets
    const insights = await generateRealTimeInsights(scenario, query)
    const taxCalculations = calculateRealTimeTax(scenario)
    const optimizations = findTaxOptimizations(scenario)
    const riskAssessment = assessAuditRisk(scenario)
    
    return NextResponse.json({
      success: true,
      insights,
      calculations: taxCalculations,
      optimizations,
      riskAssessment,
      timestamp: new Date().toISOString(),
      aiConfidence: calculateOverallConfidence(insights)
    })

  } catch (error) {
    console.error('Real-time AI advisor error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI insights' },
      { status: 500 }
    )
  }
}

async function generateRealTimeInsights(scenario: TaxScenario, query: string): Promise<AIInsight[]> {
  const insights: AIInsight[] = []
  
  // REAL TAX OPTIMIZATION INSIGHTS
  const marginalRate = calculateMarginalTaxRate(scenario.income, scenario.filingStatus)
  
  // Home Office Opportunity
  if (scenario.selfEmployed && !scenario.homeOffice && scenario.income > 30000) {
    const potentialSavings = Math.min(1500, scenario.income * 0.05) * marginalRate
    insights.push({
      id: 'home-office-' + Date.now(),
      type: 'optimization',
      title: 'Home Office Deduction Opportunity',
      description: `You could potentially claim up to $1,500 in home office deductions using the simplified method (300 sq ft × $5/sq ft), saving approximately $${Math.round(potentialSavings)} in taxes.`,
      impact: potentialSavings,
      confidence: 92,
      actionRequired: true,
      priority: 'high',
      category: 'Business Deductions'
    })
  }
  
  // Retirement Contribution Optimization
  const currentContributions = scenario.retirementContributions || 0
  const maxContribution = Math.min(23000, scenario.income * 0.25) // 2024 401k limit
  if (currentContributions < maxContribution) {
    const additionalContribution = Math.min(maxContribution - currentContributions, 5000)
    const taxSavings = additionalContribution * marginalRate
    insights.push({
      id: 'retirement-' + Date.now(),
      type: 'optimization',
      title: 'Retirement Contribution Optimization',
      description: `Consider contributing an additional $${additionalContribution.toLocaleString()} to your retirement accounts. This could reduce your tax liability by $${Math.round(taxSavings)}.`,
      impact: taxSavings,
      confidence: 96,
      actionRequired: false,
      priority: 'medium',
      category: 'Retirement Planning'
    })
  }
  
  // Quarterly Payment Planning for Self-Employed
  if (scenario.selfEmployed) {
    const estimatedTax = calculateRealTimeTax(scenario).federalTax
    const quarterlyAmount = Math.round(estimatedTax / 4)
    insights.push({
      id: 'quarterly-' + Date.now(),
      type: 'planning',
      title: 'Quarterly Payment Recommendation',
      description: `Based on your projected income, consider making quarterly estimated payments of $${quarterlyAmount.toLocaleString()} to avoid underpayment penalties.`,
      impact: 0,
      confidence: 89,
      actionRequired: true,
      priority: 'high',
      category: 'Tax Compliance'
    })
  }
  
  // Business Expense Analysis
  if (scenario.businessExpenses > scenario.income * 0.35) {
    insights.push({
      id: 'expense-warning-' + Date.now(),
      type: 'warning',
      title: 'Business Expense Ratio Alert',
      description: `Your business expenses represent ${Math.round((scenario.businessExpenses / scenario.income) * 100)}% of your income, which is above the typical range. Ensure all expenses are properly documented and legitimate business expenses.`,
      impact: 0,
      confidence: 78,
      actionRequired: true,
      priority: 'medium',
      category: 'Audit Risk'
    })
  }
  
  // Income Tax Bracket Optimization
  const currentBracket = getCurrentTaxBracket(scenario.income, scenario.filingStatus)
  const nextBracketThreshold = getNextBracketThreshold(scenario.income, scenario.filingStatus)
  if (nextBracketThreshold && (nextBracketThreshold - scenario.income) < 5000) {
    insights.push({
      id: 'bracket-' + Date.now(),
      type: 'planning',
      title: 'Tax Bracket Management',
      description: `You're close to the next tax bracket threshold. Consider deferring $${nextBracketThreshold - scenario.income} in income or increasing deductions to stay in your current ${currentBracket}% bracket.`,
      impact: (nextBracketThreshold - scenario.income) * 0.03, // Rough savings estimate
      confidence: 84,
      actionRequired: false,
      priority: 'low',
      category: 'Tax Planning'
    })
  }
  
  return insights
}

function calculateRealTimeTax(scenario: TaxScenario) {
  const adjustedGrossIncome = scenario.income - scenario.retirementContributions
  const taxableIncome = Math.max(0, adjustedGrossIncome - scenario.deductions)
  
  // 2024 Federal Tax Brackets
  const brackets = {
    single: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 }
    ],
    marriedJoint: [
      { min: 0, max: 22000, rate: 0.10 },
      { min: 22000, max: 89450, rate: 0.12 },
      { min: 89450, max: 190750, rate: 0.22 },
      { min: 190750, max: 364200, rate: 0.24 },
      { min: 364200, max: 462500, rate: 0.32 },
      { min: 462500, max: 693750, rate: 0.35 },
      { min: 693750, max: Infinity, rate: 0.37 }
    ]
  }
  
  const applicableBrackets = brackets[scenario.filingStatus as keyof typeof brackets] || brackets.single
  let federalTax = 0
  
  for (const bracket of applicableBrackets) {
    if (taxableIncome > bracket.min) {
      const taxableInThisBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min)
      federalTax += taxableInThisBracket * bracket.rate
    }
  }
  
  // Self-employment tax calculation
  let selfEmploymentTax = 0
  if (scenario.selfEmployed) {
    const seTaxableIncome = scenario.income * 0.9235 // 92.35% of SE income
    selfEmploymentTax = seTaxableIncome * 0.153 // 15.3% SE tax rate
  }
  
  return {
    adjustedGrossIncome,
    taxableIncome,
    federalTax: Math.round(federalTax),
    selfEmploymentTax: Math.round(selfEmploymentTax),
    totalTax: Math.round(federalTax + selfEmploymentTax),
    effectiveRate: ((federalTax + selfEmploymentTax) / scenario.income * 100).toFixed(2),
    marginalRate: (calculateMarginalTaxRate(scenario.income, scenario.filingStatus) * 100).toFixed(0)
  }
}

function calculateMarginalTaxRate(income: number, filingStatus: string): number {
  const brackets = {
    single: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 }
    ]
  }
  
  const applicableBrackets = brackets.single // Simplified for now
  
  for (const bracket of applicableBrackets) {
    if (income >= bracket.min && income < bracket.max) {
      return bracket.rate
    }
  }
  
  return 0.37 // Highest bracket
}

function findTaxOptimizations(scenario: TaxScenario) {
  const optimizations = []
  const marginalRate = calculateMarginalTaxRate(scenario.income, scenario.filingStatus)
  
  // Retirement optimization
  const maxRetirement = Math.min(23000, scenario.income * 0.25)
  if ((scenario.retirementContributions || 0) < maxRetirement) {
    const additional = Math.min(5000, maxRetirement - (scenario.retirementContributions || 0))
    optimizations.push({
      strategy: 'Maximize Retirement Contributions',
      potentialSavings: Math.round(additional * marginalRate),
      description: `Contribute an additional $${additional.toLocaleString()} to retirement accounts`,
      difficulty: 'Easy',
      timeline: 'Before year-end'
    })
  }
  
  // Business deductions for self-employed
  if (scenario.selfEmployed) {
    const potentialDeductions = estimateBusinessDeductions(scenario)
    optimizations.push({
      strategy: 'Optimize Business Deductions',
      potentialSavings: Math.round(potentialDeductions * marginalRate),
      description: `Review and maximize legitimate business expenses`,
      difficulty: 'Medium',
      timeline: 'Ongoing'
    })
  }
  
  return optimizations
}

function estimateBusinessDeductions(scenario: TaxScenario): number {
  let estimatedDeductions = 0
  
  // Home office (simplified method)
  if (!scenario.homeOffice) {
    estimatedDeductions += Math.min(1500, scenario.income * 0.03)
  }
  
  // Professional development
  estimatedDeductions += Math.min(2000, scenario.income * 0.02)
  
  // Equipment and software
  estimatedDeductions += Math.min(3000, scenario.income * 0.04)
  
  return estimatedDeductions
}

function assessAuditRisk(scenario: TaxScenario) {
  let riskScore = 0
  const riskFactors = []
  
  // High business expense ratio
  if (scenario.businessExpenses > scenario.income * 0.3) {
    riskScore += 2
    riskFactors.push('High business expense ratio')
  }
  
  // High income
  if (scenario.income > 200000) {
    riskScore += 1
    riskFactors.push('High income bracket')
  }
  
  // Self-employment
  if (scenario.selfEmployed) {
    riskScore += 1
    riskFactors.push('Self-employment income')
  }
  
  let riskLevel: 'low' | 'medium' | 'high'
  if (riskScore <= 1) riskLevel = 'low'
  else if (riskScore <= 3) riskLevel = 'medium'
  else riskLevel = 'high'
  
  return {
    score: riskScore,
    level: riskLevel,
    factors: riskFactors,
    recommendations: generateRiskMitigationRecommendations(riskFactors)
  }
}

function generateRiskMitigationRecommendations(riskFactors: string[]): string[] {
  const recommendations = []
  
  if (riskFactors.includes('High business expense ratio')) {
    recommendations.push('Maintain detailed records and receipts for all business expenses')
    recommendations.push('Ensure business expenses have clear business purpose documentation')
  }
  
  if (riskFactors.includes('High income bracket')) {
    recommendations.push('Consider professional tax preparation')
    recommendations.push('Keep comprehensive documentation for all deductions')
  }
  
  if (riskFactors.includes('Self-employment income')) {
    recommendations.push('Separate business and personal expenses clearly')
    recommendations.push('Make quarterly estimated tax payments on time')
  }
  
  return recommendations
}

function getCurrentTaxBracket(income: number, filingStatus: string): number {
  return Math.round(calculateMarginalTaxRate(income, filingStatus) * 100)
}

function getNextBracketThreshold(income: number, filingStatus: string): number | null {
  const brackets = [11000, 44725, 95375, 182050, 231250, 578125]
  
  for (const threshold of brackets) {
    if (income < threshold) {
      return threshold
    }
  }
  
  return null
}

function calculateOverallConfidence(insights: AIInsight[]): number {
  if (insights.length === 0) return 0
  
  const totalConfidence = insights.reduce((sum, insight) => sum + insight.confidence, 0)
  return Math.round(totalConfidence / insights.length)
}

// GET endpoint for retrieving saved scenarios
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In a real implementation, fetch user's saved tax scenarios from database
    const savedScenarios = [
      {
        id: 'current-2024',
        name: 'Current 2024 Projection',
        scenario: {
          income: 85000,
          filingStatus: 'single',
          deductions: 13850,
          dependents: 0,
          selfEmployed: true,
          homeOffice: false,
          businessExpenses: 15000,
          retirementContributions: 6000
        },
        lastUpdated: new Date().toISOString()
      }
    ]

    return NextResponse.json({
      success: true,
      scenarios: savedScenarios
    })

  } catch (error) {
    console.error('Error fetching scenarios:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    )
  }
}
