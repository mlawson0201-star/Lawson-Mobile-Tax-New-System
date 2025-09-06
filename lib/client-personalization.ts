
// Client Personalization and Communication System
// Generates detailed, personalized content based on client intake data

export interface ClientProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Personal Details
  dateOfBirth: Date
  ssn: string
  maritalStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household' | 'qualifying_widow'
  dependents: ClientDependent[]
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  residencyYears: number
  previousAddress?: string
  
  // Employment & Income
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired' | 'student'
  employer?: string
  occupation: string
  w2Income: number
  selfEmploymentIncome: number
  unemploymentIncome: number
  socialSecurityIncome: number
  retirementIncome: number
  rentalIncome: number
  investmentIncome: number
  otherIncome: number
  
  // Tax Situation
  filingStatus: string
  hasHealthInsurance: boolean
  hasRetirementContributions: boolean
  traditionalIraContributions: number
  rothIraContributions: number
  hsa401kContributions: number
  
  // Deductions & Credits
  hasCharitableDonations: boolean
  charitableDonationsAmount: number
  hasMortgageInterest: boolean
  mortgageInterestAmount: number
  hasStateLocalTaxes: boolean
  stateLocalTaxesAmount: number
  hasEducationExpenses: boolean
  educationExpensesAmount: number
  hasChildcareExpenses: boolean
  childcareExpensesAmount: number
  
  // Business Information (if applicable)
  businessName?: string
  businessType?: string
  businessIncome: number
  businessExpenses: number
  hasBusinessVehicle: boolean
  businessMileage: number
  hasHomeOffice: boolean
  homeOfficeSquareFeet: number
  
  // Previous Year Information
  previousYearAGI: number
  previousYearRefund: number
  previousYearTaxOwed: number
  changesFromPreviousYear: string[]
  
  // Goals & Concerns
  primaryTaxGoals: string[]
  specificConcerns: string[]
  planningNeeds: string[]
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  
  // Communication Preferences
  preferredContactMethod: 'email' | 'phone' | 'text' | 'portal'
  bestContactTime: string
  communicationFrequency: 'minimal' | 'regular' | 'frequent'
}

export interface ClientDependent {
  firstName: string
  lastName: string
  dateOfBirth: Date
  relationship: string
  ssn: string
  qualifiesForChildTaxCredit: boolean
  qualifiesForEITC: boolean
  hasDisability: boolean
  studentStatus: 'not_student' | 'k12' | 'college_undergraduate' | 'college_graduate' | 'vocational'
}

export class ClientPersonalizationService {
  
  /**
   * Calculate total income from all sources
   */
  static calculateTotalIncome(client: ClientProfile): number {
    return client.w2Income + 
           client.selfEmploymentIncome + 
           client.unemploymentIncome + 
           client.socialSecurityIncome + 
           client.retirementIncome + 
           client.rentalIncome + 
           client.investmentIncome + 
           client.otherIncome
  }

  /**
   * Calculate estimated tax liability
   */
  static calculateEstimatedTax(client: ClientProfile): { federal: number, state: number, selfEmployment: number } {
    const totalIncome = this.calculateTotalIncome(client)
    const federal = totalIncome * 0.22 // Simplified calculation
    const state = totalIncome * 0.05 // Varies by state
    const selfEmployment = client.selfEmploymentIncome * 0.153
    
    return { federal, state, selfEmployment }
  }

  /**
   * Calculate potential refund
   */
  static calculatePotentialRefund(client: ClientProfile): number {
    // Simplified calculation - would need actual withholding data
    const estimatedWithheld = client.w2Income * 0.20
    const estimatedTax = this.calculateEstimatedTax(client)
    const totalTax = estimatedTax.federal + estimatedTax.state + estimatedTax.selfEmployment
    
    return estimatedWithheld - totalTax
  }

  /**
   * Calculate quarterly payment amount
   */
  static calculateQuarterlyPayment(client: ClientProfile): number {
    const annualTax = this.calculateEstimatedTax(client)
    return (annualTax.federal + annualTax.state + annualTax.selfEmployment) / 4
  }

  /**
   * Generate personalized welcome message based on client intake
   */
  static generateWelcomeMessage(client: ClientProfile): string {
    const filingStatusText = this.getFilingStatusDescription(client.maritalStatus)
    const dependentsText = client.dependents.length > 0 
      ? `with ${client.dependents.length} dependent${client.dependents.length > 1 ? 's' : ''} (${client.dependents.map(d => d.firstName).join(', ')})`
      : 'with no dependents'
    
    const incomeSourcesText = this.describeIncomeSources(client)
    const deductionOpportunities = this.identifyDeductionOpportunities(client)
    
    return `Dear ${client.firstName} ${client.lastName},

Welcome to Lawson Mobile Tax! Based on your detailed intake information, I'm excited to work with you on optimizing your ${new Date().getFullYear()} tax situation.

**Your Tax Profile Summary:**
• Filing Status: ${filingStatusText} ${dependentsText}
• Primary Income Sources: ${incomeSourcesText}
• Estimated Annual Income: $${this.calculateTotalIncome(client).toLocaleString()}
• Residence: ${client.city}, ${client.state} (${client.residencyYears} years)

**Immediate Opportunities I've Identified:**
${deductionOpportunities.map(opp => `• ${opp}`).join('\n')}

**Your Personalized Action Plan:**
Based on your goals of ${client.primaryTaxGoals.join(' and ')}, I've developed a comprehensive strategy that addresses your specific situation as a ${client.occupation} in ${client.state}.

${this.generatePersonalizedStrategy(client)}

I'll be reaching out via ${client.preferredContactMethod} during your preferred time of ${client.bestContactTime} to discuss your specific situation in detail.

Your dedicated tax professional,
[Tax Preparer Name]
Lawson Mobile Tax`
  }

  /**
   * Generate detailed tax situation analysis
   */
  static generateTaxAnalysis(client: ClientProfile): string {
    const currentYear = new Date().getFullYear()
    const totalIncome = this.calculateTotalIncome(client)
    const estimatedTax = this.calculateEstimatedTax(client)
    const potentialRefund = this.calculatePotentialRefund(client)
    
    return `**Comprehensive Tax Analysis for ${client.firstName} ${client.lastName}**

**Income Analysis (Tax Year ${currentYear}):**
• W-2 Employment Income: $${client.w2Income.toLocaleString()}
• Self-Employment Income: $${client.selfEmploymentIncome.toLocaleString()}
• Investment Income: $${client.investmentIncome.toLocaleString()}
• Other Income Sources: $${(client.unemploymentIncome + client.socialSecurityIncome + client.retirementIncome + client.rentalIncome + client.otherIncome).toLocaleString()}
• **Total Gross Income: $${totalIncome.toLocaleString()}**

**Deductions & Credits Analysis:**
${this.generateDeductionsAnalysis(client)}

**Tax Liability Projection:**
• Estimated Federal Tax: $${estimatedTax.federal.toLocaleString()}
• Estimated State Tax (${client.state}): $${estimatedTax.state.toLocaleString()}
• Self-Employment Tax: $${estimatedTax.selfEmployment.toLocaleString()}
• **Total Estimated Tax: $${(estimatedTax.federal + estimatedTax.state + estimatedTax.selfEmployment).toLocaleString()}**

**Refund/Payment Projection:**
${potentialRefund > 0 
  ? `Based on your withholdings and estimated payments, you're projected to receive a refund of approximately **$${potentialRefund.toLocaleString()}**.`
  : `Based on your withholdings and estimated payments, you may owe approximately **$${Math.abs(potentialRefund).toLocaleString()}** in additional taxes.`
}

**Specific Recommendations for Your Situation:**
${this.generatePersonalizedRecommendations(client).map(rec => `• ${rec}`).join('\n')}

**Next Steps in Your Tax Process:**
1. Review and verify all income documentation
2. Organize deduction receipts and supporting documents
3. Schedule detailed consultation to review strategies
4. Implement tax planning recommendations for next year
5. Complete and file your return with maximum accuracy`
  }

  /**
   * Generate personalized document checklist
   */
  static generateDocumentChecklist(client: ClientProfile): string {
    const docs: string[] = []
    
    // Income Documents
    if (client.w2Income > 0) {
      docs.push(`**W-2 Forms** from ${client.employer || 'your employer'} - Required for your $${client.w2Income.toLocaleString()} in employment income`)
    }
    
    if (client.selfEmploymentIncome > 0) {
      docs.push(`**1099-NEC Forms** for your self-employment income of $${client.selfEmploymentIncome.toLocaleString()} as a ${client.occupation}`)
      docs.push(`**Business Expense Records** - Detailed receipts for deducting against your $${client.selfEmploymentIncome.toLocaleString()} business income`)
      
      if (client.hasBusinessVehicle) {
        docs.push(`**Vehicle Mileage Log** - You reported ${client.businessMileage} business miles, worth approximately $${(client.businessMileage * 0.655).toFixed(0)} in deductions`)
      }
      
      if (client.hasHomeOffice) {
        docs.push(`**Home Office Documentation** - For your ${client.homeOfficeSquareFeet} sq ft home office deduction`)
      }
    }
    
    if (client.investmentIncome > 0) {
      docs.push(`**1099-INT & 1099-DIV Forms** for your $${client.investmentIncome.toLocaleString()} in investment income`)
      docs.push(`**Investment Statement Summary** showing all transactions during ${new Date().getFullYear()}`)
    }
    
    // Deduction Documents
    if (client.hasCharitableDonations) {
      docs.push(`**Charitable Donation Receipts** for your $${client.charitableDonationsAmount.toLocaleString()} in charitable contributions`)
    }
    
    if (client.hasMortgageInterest) {
      docs.push(`**Form 1098** from your mortgage lender for $${client.mortgageInterestAmount.toLocaleString()} in mortgage interest`)
    }
    
    if (client.hasEducationExpenses) {
      docs.push(`**Form 1098-T** and education expense receipts for $${client.educationExpensesAmount.toLocaleString()} in qualified education expenses`)
    }
    
    if (client.hasChildcareExpenses && client.dependents.length > 0) {
      docs.push(`**Childcare Provider Information** - Tax ID and receipts for $${client.childcareExpensesAmount.toLocaleString()} in childcare for ${client.dependents.filter(d => new Date().getFullYear() - d.dateOfBirth.getFullYear() < 13).length} qualifying children`)
    }
    
    // Dependent Information
    if (client.dependents.length > 0) {
      client.dependents.forEach(dependent => {
        docs.push(`**SSN Documentation for ${dependent.firstName}** - Birth certificate or Social Security card for your ${dependent.relationship}`)
        if (dependent.studentStatus !== 'not_student') {
          docs.push(`**Student Status Verification for ${dependent.firstName}** - Enrollment documentation for education credits`)
        }
      })
    }
    
    return `**Personalized Document Checklist for ${client.firstName} ${client.lastName}**

Based on your specific tax situation, here are the exact documents you need to gather:

**Priority 1 - Income Documents (Required):**
${docs.filter(doc => doc.includes('W-2') || doc.includes('1099')).join('\n')}

**Priority 2 - Deduction Documents (High Value):**
${docs.filter(doc => doc.includes('Charitable') || doc.includes('Mortgage') || doc.includes('Education')).join('\n')}

**Priority 3 - Supporting Documents:**
${docs.filter(doc => !doc.includes('W-2') && !doc.includes('1099') && !doc.includes('Charitable') && !doc.includes('Mortgage') && !doc.includes('Education')).join('\n')}

**Document Organization Tips for Your Situation:**
• Create a folder labeled "${client.lastName} Tax ${new Date().getFullYear()}"
• Separate business expenses by category (office supplies, travel, meals, etc.)
• Keep original receipts for any deduction over $75
• Scan important documents to your secure client portal

**Estimated Time to Gather:** 2-3 hours based on your filing complexity
**Potential Tax Savings from Proper Documentation:** $${this.calculateDocumentationSavings(client).toLocaleString()}`
  }

  /**
   * Generate quarterly tax planning advice
   */
  static generateQuarterlyPlanning(client: ClientProfile, quarter: number): string {
    const year = new Date().getFullYear()
    const quarterNames = ['First', 'Second', 'Third', 'Fourth']
    const quarterName = quarterNames[quarter - 1]
    
    return `**${quarterName} Quarter ${year} Tax Planning for ${client.firstName} ${client.lastName}**

**Your Current Tax Position:**
Based on your year-to-date income of $${(client.w2Income * quarter / 4 + client.selfEmploymentIncome * quarter / 4).toLocaleString()} and withholdings, here's your personalized quarterly update:

**Quarterly Estimated Tax Analysis:**
• Projected Annual Income: $${this.calculateTotalIncome(client).toLocaleString()}
• Required Quarterly Payment: $${this.calculateQuarterlyPayment(client).toLocaleString()}
• Year-to-Date Withholdings: $${this.calculateYTDWithholdings(client, quarter).toLocaleString()}
• Recommended Action: ${this.getQuarterlyAction(client, quarter)}

**Specific Action Items for This Quarter:**
${this.generateQuarterlyActions(client, quarter).map(action => `• ${action}`).join('\n')}

**Year-End Planning Strategies:**
${this.generateYearEndStrategies(client, quarter).map(strategy => `• ${strategy}`).join('\n')}

**Important Deadlines for ${client.firstName}:**
• Quarterly Estimated Tax Due: ${this.getQuarterlyDueDate(quarter)}
• Recommended Review Date: ${this.getReviewDate(quarter)}
• Next Planning Session: ${this.getNextPlanningDate(quarter)}

Your tax professional will contact you on ${this.getContactDate(quarter)} to discuss these recommendations in detail.`
  }

  // Helper methods for calculations and analysis
  private static getFilingStatusDescription(status: string): string {
    const descriptions = {
      'single': 'Single',
      'married_filing_jointly': 'Married Filing Jointly',
      'married_filing_separately': 'Married Filing Separately', 
      'head_of_household': 'Head of Household',
      'qualifying_widow': 'Qualifying Widow(er)'
    }
    return descriptions[status as keyof typeof descriptions] || status
  }

  private static describeIncomeSources(client: ClientProfile): string {
    const sources: string[] = []
    if (client.w2Income > 0) sources.push(`Employment ($${client.w2Income.toLocaleString()})`)
    if (client.selfEmploymentIncome > 0) sources.push(`Self-Employment ($${client.selfEmploymentIncome.toLocaleString()})`)
    if (client.investmentIncome > 0) sources.push(`Investments ($${client.investmentIncome.toLocaleString()})`)
    if (client.retirementIncome > 0) sources.push(`Retirement ($${client.retirementIncome.toLocaleString()})`)
    
    return sources.length > 0 ? sources.join(', ') : 'Employment'
  }

  private static identifyDeductionOpportunities(client: ClientProfile): string[] {
    const opportunities: string[] = []
    
    if (client.hasCharitableDonations) {
      opportunities.push(`Maximize your $${client.charitableDonationsAmount.toLocaleString()} charitable contribution deduction`)
    }
    
    if (client.hasMortgageInterest) {
      opportunities.push(`Optimize your $${client.mortgageInterestAmount.toLocaleString()} mortgage interest deduction`)
    }
    
    if (client.selfEmploymentIncome > 0) {
      opportunities.push(`Maximize business deductions from your ${client.occupation} income`)
    }
    
    if (client.traditionalIraContributions < 6500 && client.w2Income > 0) {
      opportunities.push(`Consider increasing Traditional IRA contributions for additional deductions`)
    }
    
    return opportunities.length > 0 ? opportunities : ['Review all potential deductions for your situation']
  }

  private static generatePersonalizedStrategy(client: ClientProfile): string {
    let strategy = `**Phase 1: Income Optimization**\n`
    
    if (client.selfEmploymentIncome > 0) {
      strategy += `As a ${client.occupation}, you have significant opportunities to reduce taxable income through business expense deductions. `
    }
    
    strategy += `**Phase 2: Deduction Maximization**\n`
    strategy += `Based on your ${client.maritalStatus} filing status and ${client.dependents.length} dependents, we'll implement strategies to maximize your standard or itemized deductions.\n\n`
    
    strategy += `**Phase 3: Tax Credit Optimization**\n`
    if (client.dependents.some(d => d.qualifiesForChildTaxCredit)) {
      strategy += `Your qualifying children will generate Child Tax Credits worth up to $2,000 each.\n`
    }
    
    return strategy
  }

  private static generateDeductionsAnalysis(client: ClientProfile): string {
    let analysis = ''
    const standardDeduction = client.maritalStatus === 'married_filing_jointly' ? 27700 : 13850
    let itemizedTotal = 0
    
    if (client.hasCharitableDonations) {
      itemizedTotal += client.charitableDonationsAmount
      analysis += `• Charitable Contributions: $${client.charitableDonationsAmount.toLocaleString()}\n`
    }
    
    if (client.hasMortgageInterest) {
      itemizedTotal += client.mortgageInterestAmount
      analysis += `• Mortgage Interest: $${client.mortgageInterestAmount.toLocaleString()}\n`
    }
    
    if (client.hasStateLocalTaxes) {
      const saltDeduction = Math.min(client.stateLocalTaxesAmount, 10000)
      itemizedTotal += saltDeduction
      analysis += `• State & Local Taxes: $${saltDeduction.toLocaleString()} (capped at $10,000)\n`
    }
    
    analysis += `\n**Deduction Strategy:** ${itemizedTotal > standardDeduction ? 'Itemize' : 'Standard'} Deduction\n`
    analysis += `• Standard Deduction: $${standardDeduction.toLocaleString()}\n`
    analysis += `• Itemized Deductions: $${itemizedTotal.toLocaleString()}\n`
    analysis += `• **Recommended: $${Math.max(standardDeduction, itemizedTotal).toLocaleString()}**`
    
    return analysis
  }

  private static generatePersonalizedRecommendations(client: ClientProfile): string[] {
    const recommendations: string[] = []
    
    // Business recommendations
    if (client.selfEmploymentIncome > 0) {
      recommendations.push(`Establish a dedicated business banking account to clearly separate business and personal expenses`)
      recommendations.push(`Consider quarterly estimated tax payments of $${this.calculateQuarterlyPayment(client).toLocaleString()} to avoid underpayment penalties`)
      
      if (client.hasHomeOffice) {
        const homeOfficeDeduction = (client.homeOfficeSquareFeet * 5) // Simplified calculation
        recommendations.push(`Your ${client.homeOfficeSquareFeet} sq ft home office could generate $${homeOfficeDeduction.toLocaleString()} in deductions`)
      }
    }
    
    // Retirement recommendations
    if (client.traditionalIraContributions < 6500 && client.w2Income > 50000) {
      const additionalContribution = Math.min(6500 - client.traditionalIraContributions, client.w2Income * 0.1)
      recommendations.push(`Consider contributing an additional $${additionalContribution.toLocaleString()} to your Traditional IRA for tax savings`)
    }
    
    // Family-specific recommendations
    if (client.dependents.length > 0) {
      const qualifyingChildren = client.dependents.filter(d => d.qualifiesForChildTaxCredit).length
      if (qualifyingChildren > 0) {
        recommendations.push(`Your ${qualifyingChildren} qualifying children will generate $${(qualifyingChildren * 2000).toLocaleString()} in Child Tax Credits`)
      }
    }
    
    return recommendations
  }



  private static calculateDocumentationSavings(client: ClientProfile): number {
    let savings = 0
    
    if (client.hasCharitableDonations) savings += client.charitableDonationsAmount * 0.22
    if (client.hasMortgageInterest) savings += client.mortgageInterestAmount * 0.22
    if (client.hasEducationExpenses) savings += Math.min(client.educationExpensesAmount, 2500) * 0.22
    
    return savings
  }

  private static calculateYTDWithholdings(client: ClientProfile, quarter: number): number {
    return client.w2Income * 0.20 * (quarter / 4)
  }

  private static getQuarterlyAction(client: ClientProfile, quarter: number): string {
    const quarterlyPayment = this.calculateQuarterlyPayment(client)
    const ytdWithholdings = this.calculateYTDWithholdings(client, quarter)
    
    if (quarterlyPayment * quarter > ytdWithholdings) {
      return `Make estimated payment of $${(quarterlyPayment * quarter - ytdWithholdings).toLocaleString()}`
    }
    return 'No additional payment needed at this time'
  }

  private static generateQuarterlyActions(client: ClientProfile, quarter: number): string[] {
    const actions: string[] = []
    
    if (client.selfEmploymentIncome > 0) {
      actions.push('Review and categorize all business expenses from this quarter')
      actions.push('Update mileage log for business vehicle use')
    }
    
    if (client.hasRetirementContributions) {
      actions.push(`Consider increasing retirement contributions - you have $${(6500 - client.traditionalIraContributions).toLocaleString()} remaining capacity`)
    }
    
    return actions
  }

  private static generateYearEndStrategies(client: ClientProfile, quarter: number): string[] {
    const strategies: string[] = []
    const remainingQuarters = 4 - quarter
    
    if (remainingQuarters > 0) {
      strategies.push('Accelerate deductible expenses into current tax year')
      strategies.push('Review investment portfolio for tax-loss harvesting opportunities')
      
      if (client.hasCharitableDonations) {
        strategies.push('Consider bunching charitable contributions for maximum deduction benefit')
      }
    }
    
    return strategies
  }

  private static getQuarterlyDueDate(quarter: number): string {
    const dueDates = ['January 15', 'April 15', 'June 15', 'September 15']
    return dueDates[quarter - 1]
  }

  private static getReviewDate(quarter: number): string {
    // Two weeks before quarterly due date
    const reviewDates = ['January 1', 'April 1', 'June 1', 'September 1']
    return reviewDates[quarter - 1]
  }

  private static getNextPlanningDate(quarter: number): string {
    const planningDates = ['March 1', 'June 1', 'September 1', 'December 1']
    return planningDates[quarter - 1]
  }

  private static getContactDate(quarter: number): string {
    const today = new Date()
    today.setDate(today.getDate() + 7) // One week from now
    return today.toLocaleDateString()
  }
}
