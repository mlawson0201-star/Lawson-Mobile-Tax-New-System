
// Personalized Communications System
// Generates detailed, client-specific messages from tax professionals

import { ClientProfile } from './client-personalization'

export interface TaxProfessionalMessage {
  id: string
  clientId: string
  preparerId: string
  preparerName: string
  subject: string
  message: string
  messageType: 'strategy' | 'update' | 'request' | 'explanation' | 'planning'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  timestamp: Date
  relatedDocuments?: string[]
  actionItems?: string[]
  followUpDate?: Date
}

export class PersonalizedCommunications {

  /**
   * Generate detailed tax strategy explanation
   */
  static generateTaxStrategyMessage(
    client: ClientProfile, 
    preparerName: string,
    strategy: string
  ): TaxProfessionalMessage {
    
    const totalIncome = this.calculateTotalIncome(client)
    const currentTaxBracket = this.determineTaxBracket(totalIncome, client.maritalStatus)
    const specificAnalysis = this.generateStrategyAnalysis(client, strategy)
    
    return {
      id: `strategy_${Date.now()}`,
      clientId: client.id,
      preparerId: 'prep_001',
      preparerName,
      subject: `Detailed Tax Strategy Analysis for ${client.firstName} - ${strategy}`,
      messageType: 'strategy',
      priority: 'high',
      timestamp: new Date(),
      message: `Dear ${client.firstName},

I've completed a comprehensive analysis of your tax situation as a ${client.occupation} in ${client.state}, and I want to share some important strategic insights that will significantly impact your ${new Date().getFullYear()} tax return.

**YOUR CURRENT TAX PROFILE:**
• Total Income: $${totalIncome.toLocaleString()} 
• Tax Bracket: ${currentTaxBracket}% (${client.maritalStatus === 'married_filing_jointly' ? 'Married Filing Jointly' : 'Single'})
• Filing Complexity: ${this.assessFilingComplexity(client)}
• Estimated Federal Tax Liability: $${this.calculateFederalTax(client).toLocaleString()}

**SPECIFIC STRATEGY: ${strategy.toUpperCase()}**

${specificAnalysis}

**WHY THIS MATTERS FOR YOUR SITUATION:**
${this.generatePersonalizedImpact(client, strategy)}

**IMPLEMENTATION TIMELINE:**
${this.generateImplementationPlan(client, strategy)}

**YOUR SPECIFIC ACTION ITEMS:**
${this.generateActionItems(client, strategy).map((item, index) => `${index + 1}. ${item}`).join('\n')}

**RISK ASSESSMENT:**
${this.generateRiskAssessment(client, strategy)}

**EXPECTED OUTCOMES:**
${this.generateExpectedOutcomes(client, strategy)}

I'll be monitoring the tax law changes that specifically affect ${client.occupation} professionals in ${client.state}. Given your income level and family situation with ${client.dependents.length} dependent${client.dependents.length !== 1 ? 's' : ''}, this strategy could save you $${this.calculatePotentialSavings(client, strategy).toLocaleString()} annually.

Let's schedule a detailed consultation to review these strategies and ensure we're maximizing every opportunity for your specific situation.

Best regards,
${preparerName}
Certified Tax Professional
Lawson Mobile Tax

P.S. I've also identified ${this.identifyAdditionalOpportunities(client).length} additional optimization opportunities we should discuss during our next meeting.`,
      actionItems: this.generateActionItems(client, strategy),
      followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  }

  /**
   * Generate personalized document request with detailed explanations
   */
  static generateDocumentRequest(
    client: ClientProfile,
    preparerName: string,
    documentType: string,
    urgency: 'low' | 'medium' | 'high' | 'urgent' = 'medium'
  ): TaxProfessionalMessage {
    
    const documentDetails = this.getDocumentSpecificDetails(client, documentType)
    const impactAnalysis = this.analyzeDocumentImpact(client, documentType)
    
    return {
      id: `doc_request_${Date.now()}`,
      clientId: client.id,
      preparerId: 'prep_001', 
      preparerName,
      subject: `Important: ${documentType} Required for ${client.firstName}'s Tax Return - Detailed Request`,
      messageType: 'request',
      priority: urgency,
      timestamp: new Date(),
      message: `Dear ${client.firstName},

I hope this message finds you well. I'm working on optimizing your ${new Date().getFullYear()} tax return, and I need to request some specific documentation that will have a significant impact on your tax outcome.

**DOCUMENT REQUESTED: ${documentType.toUpperCase()}**

**WHY THIS DOCUMENT IS CRITICAL FOR YOUR SITUATION:**
${documentDetails.explanation}

**SPECIFIC TO YOUR CASE:**
As a ${client.occupation} ${client.maritalStatus === 'married_filing_jointly' ? 'filing jointly' : 'filing individually'} with $${this.calculateTotalIncome(client).toLocaleString()} in total income, this document affects your tax return in the following ways:

${impactAnalysis}

**EXACTLY WHAT I NEED FROM YOU:**
${this.getSpecificDocumentRequirements(client, documentType).map((req, index) => `${index + 1}. ${req}`).join('\n')}

**HOW THIS IMPACTS YOUR REFUND/TAX OWED:**
${this.calculateDocumentImpactOnReturn(client, documentType)}

**DEADLINE AND CONSEQUENCES:**
${this.getDocumentDeadlineInfo(documentType, urgency)}

**STEP-BY-STEP INSTRUCTIONS:**
${this.getDocumentGatheringInstructions(client, documentType)}

**COMMON QUESTIONS ABOUT THIS DOCUMENT:**
${this.getDocumentFAQ(client, documentType)}

If you have any questions about gathering this documentation or need clarification on any aspect, please don't hesitate to call me directly at (855) 722-8700 ext. [extension]. I'm here to make this process as smooth as possible for you.

Remember, proper documentation not only ensures compliance but also maximizes your tax benefits. Every detail matters when it comes to optimizing your return.

I'll follow up with you on ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()} to check on your progress and answer any questions.

Professionally yours,
${preparerName}
Senior Tax Strategist
Lawson Mobile Tax

Direct Line: (855) 722-8700 ext. [extension]
Secure Portal: Upload documents at lawsonmobiletax.com/client/documents`,
      actionItems: [`Gather ${documentType}`, 'Upload to secure portal', 'Contact preparer with questions'],
      followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    }
  }

  /**
   * Generate detailed quarterly tax planning message
   */
  static generateQuarterlyPlanningMessage(
    client: ClientProfile,
    preparerName: string,
    quarter: number
  ): TaxProfessionalMessage {
    
    const quarterName = ['First', 'Second', 'Third', 'Fourth'][quarter - 1]
    const projectedAnnualIncome = this.calculateProjectedAnnualIncome(client, quarter)
    const quarterlyPaymentDue = this.calculateQuarterlyPayment(client, quarter)
    
    return {
      id: `quarterly_${quarter}_${Date.now()}`,
      clientId: client.id,
      preparerId: 'prep_001',
      preparerName,
      subject: `${quarterName} Quarter Tax Planning - Personalized Strategy for ${client.firstName}`,
      messageType: 'planning',
      priority: 'medium',
      timestamp: new Date(),
      message: `Dear ${client.firstName},

I hope your ${client.occupation} business is thriving this quarter! As we approach the end of the ${quarterName.toLowerCase()} quarter, I want to provide you with a comprehensive analysis of your current tax position and specific strategies for the remainder of ${new Date().getFullYear()}.

**YOUR CURRENT QUARTERLY POSITION:**

**Income Analysis (${quarterName} Quarter):**
• Projected Annual Income: $${projectedAnnualIncome.toLocaleString()}
• Year-to-Date Income: $${(projectedAnnualIncome * quarter / 4).toLocaleString()}
• Quarter-over-Quarter Growth: ${this.calculateQuarterlyGrowth(client, quarter)}%
• Income Mix: ${this.analyzeIncomeComposition(client)}

**Tax Liability Management:**
• Estimated Annual Tax Liability: $${this.calculateAnnualTaxLiability(client).toLocaleString()}
• Year-to-Date Withholdings/Payments: $${this.calculateYTDPayments(client, quarter).toLocaleString()}
• Required Quarterly Payment: $${quarterlyPaymentDue.toLocaleString()}
• Payment Due Date: ${this.getQuarterlyDueDate(quarter)}

**SPECIFIC RECOMMENDATIONS FOR YOUR SITUATION:**

${this.generateQuarterlyRecommendations(client, quarter).map((rec, index) => `**${index + 1}. ${rec.title}**
${rec.description}
*Expected Impact:* ${rec.impact}
*Action Required:* ${rec.action}

`).join('')}

**BUSINESS-SPECIFIC STRATEGIES (${client.occupation}):**
${client.selfEmploymentIncome > 0 ? this.generateBusinessSpecificStrategies(client, quarter) : 'Not applicable - Employment income only'}

**FAMILY TAX PLANNING:**
${client.dependents.length > 0 ? this.generateFamilyTaxStrategies(client, quarter) : 'Not applicable - No dependents claimed'}

**STATE-SPECIFIC CONSIDERATIONS (${client.state}):**
${this.generateStateSpecificAdvice(client, quarter)}

**YEAR-END PLANNING PREVIEW:**
Looking ahead to year-end, here are the key strategies we should prepare for:
${this.generateYearEndPreview(client, quarter).map(strategy => `• ${strategy}`).join('\n')}

**YOUR NEXT STEPS:**
${this.generateQuarterlyNextSteps(client, quarter).map((step, index) => `${index + 1}. ${step}`).join('\n')}

**IMPORTANT DEADLINES:**
• Quarterly Estimated Tax Payment: ${this.getQuarterlyDueDate(quarter)}
• Next Planning Review: ${this.getNextReviewDate(quarter)}
• Year-End Strategy Session: ${this.getYearEndSessionDate()}

I'll be monitoring your account closely and will reach out if any urgent adjustments are needed. The tax landscape is constantly changing, especially for ${client.occupation} professionals, and I want to ensure you're always positioned optimally.

Please review this analysis and let me know if you'd like to schedule a call to discuss any of these strategies in detail. I'm particularly excited about the opportunities I've identified in sections 2 and 4 above.

To your financial success,
${preparerName}
CPA, Tax Strategist
Lawson Mobile Tax

Direct: (855) 722-8700 ext. [extension]
Secure Messaging: Available 24/7 through your client portal`,
      actionItems: [
        `Review quarterly payment of $${quarterlyPaymentDue.toLocaleString()}`,
        'Organize Q' + quarter + ' business expenses',
        'Schedule year-end planning session'
      ],
      followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  }

  /**
   * Generate personalized tax return completion message
   */
  static generateReturnCompletionMessage(
    client: ClientProfile,
    preparerName: string,
    returnDetails: any
  ): TaxProfessionalMessage {
    
    const refundAmount = returnDetails.refundAmount || 0
    const taxOwed = returnDetails.taxOwed || 0
    const effectiveRate = ((returnDetails.totalTax || 0) / this.calculateTotalIncome(client)) * 100
    
    return {
      id: `completion_${Date.now()}`,
      clientId: client.id,
      preparerId: 'prep_001',
      preparerName,
      subject: `Your ${new Date().getFullYear()} Tax Return is Complete - Detailed Results for ${client.firstName}`,
      messageType: 'update',
      priority: 'high',
      timestamp: new Date(),
      message: `Dear ${client.firstName},

I'm pleased to inform you that your ${new Date().getFullYear()} tax return has been completed and is ready for your review and signature. I want to take a moment to explain the results and highlight the strategies that benefited your situation.

**YOUR TAX RETURN SUMMARY:**

**Financial Results:**
${refundAmount > 0 
  ? `• Federal Refund: $${refundAmount.toLocaleString()}
• Expected Refund Timeline: 2-3 weeks with direct deposit
• Refund Improvement vs. Last Year: ${this.compareToLastYear(client, refundAmount)}`
  : `• Federal Tax Owed: $${taxOwed.toLocaleString()}
• Payment Due Date: April 15, ${new Date().getFullYear() + 1}
• Payment Options: I'll explain the best payment strategy for your cash flow`
}

**Tax Efficiency Analysis:**
• Total Income Reported: $${this.calculateTotalIncome(client).toLocaleString()}
• Effective Tax Rate: ${effectiveRate.toFixed(2)}% (${this.compareEffectiveRate(effectiveRate, client.maritalStatus)})
• Total Deductions Claimed: $${this.calculateTotalDeductions(client).toLocaleString()}
• Tax Credits Applied: $${this.calculateTaxCredits(client).toLocaleString()}

**STRATEGIES THAT SAVED YOU MONEY:**

${this.generateSuccessfulStrategies(client).map((strategy, index) => `**${index + 1}. ${strategy.name}**
${strategy.description}
*Tax Savings:* $${strategy.savings.toLocaleString()}
*How We Achieved This:* ${strategy.method}

`).join('')}

**DETAILED BREAKDOWN BY INCOME TYPE:**

${client.w2Income > 0 ? `**Employment Income (W-2):**
• Gross Wages: $${client.w2Income.toLocaleString()}
• Federal Withholding: $${(client.w2Income * 0.20).toLocaleString()} (estimated)
• Withholding Analysis: ${this.analyzeWithholdings(client)}

` : ''}

${client.selfEmploymentIncome > 0 ? `**Self-Employment Income (${client.occupation}):**
• Gross Business Income: $${client.selfEmploymentIncome.toLocaleString()}
• Business Deductions Claimed: $${client.businessExpenses.toLocaleString()}
• Net Business Income: $${(client.selfEmploymentIncome - client.businessExpenses).toLocaleString()}
• Self-Employment Tax: $${((client.selfEmploymentIncome - client.businessExpenses) * 0.153).toLocaleString()}
• Business Tax Strategies Used: ${this.getBusinessStrategiesUsed(client)}

` : ''}

**DEDUCTIONS AND CREDITS ANALYSIS:**

${this.generateDeductionAnalysis(client)}

**FAMILY TAX BENEFITS:**
${client.dependents.length > 0 ? `
You claimed ${client.dependents.length} dependent${client.dependents.length > 1 ? 's' : ''}: ${client.dependents.map(d => d.firstName).join(', ')}

${client.dependents.map(dependent => `• ${dependent.firstName} (${dependent.relationship}): 
  - Child Tax Credit: $${dependent.qualifiesForChildTaxCredit ? '2,000' : '0'}
  - Additional Child Tax Credit: ${this.calculateAdditionalCTC(dependent)}
  - Earned Income Credit Impact: ${dependent.qualifiesForEITC ? 'Qualified' : 'Not applicable'}
  ${dependent.studentStatus !== 'not_student' ? `- Education Credits: ${this.calculateEducationCredits(dependent)}` : ''}
`).join('\n')}

Total Family Tax Benefits: $${this.calculateFamilyBenefits(client).toLocaleString()}
` : 'No dependents claimed on this return'}

**COMPARISON TO PREVIOUS YEAR:**
${client.previousYearAGI > 0 ? `
• ${new Date().getFullYear() - 1} Adjusted Gross Income: $${client.previousYearAGI.toLocaleString()}
• ${new Date().getFullYear()} Adjusted Gross Income: $${this.calculateAGI(client).toLocaleString()}
• Year-over-Year Change: ${this.calculateYearOverYearChange(client)}
• Tax Situation Improvement: ${this.analyzeTaxImprovement(client)}
` : 'Previous year data not available for comparison'}

**PLANNING FOR ${new Date().getFullYear() + 1}:**

Based on this year's results and your projected income, here are my recommendations for next year:

${this.generateNextYearRecommendations(client).map((rec, index) => `${index + 1}. **${rec.title}**
   ${rec.description}
   *Estimated Benefit:* ${rec.benefit}
   *Implementation:* ${rec.implementation}

`).join('')}

**REQUIRED ACTIONS:**
${refundAmount > 0 
  ? `1. Review and approve your return for e-filing
2. Verify your direct deposit information
3. Sign the e-file authorization
4. Keep copies of all documents for your records`
  : `1. Review and approve your return 
2. Plan payment strategy for $${taxOwed.toLocaleString()} (I can help with this)
3. Sign the e-file authorization  
4. Consider estimated payments for next year`}

**IMPORTANT REMINDERS:**
• Keep all tax documents for at least 7 years
• Update me on any major life changes (marriage, children, job changes, etc.)
• Consider quarterly estimated payments if your situation changes
• Schedule a mid-year review to optimize next year's strategy

Your return demonstrates the value of strategic tax planning. The time we invested in organizing your ${client.occupation} business expenses and optimizing your deductions saved you significant money.

Please log into your secure portal at lawsonmobiletax.com/client/returns to review your complete return. I'll call you within 24 hours to walk through any questions and complete the e-filing process.

Thank you for trusting Lawson Mobile Tax with your tax needs. It's been a pleasure working with you to optimize your tax situation.

Professionally yours,
${preparerName}
Enrolled Agent, Tax Strategist
Lawson Mobile Tax

Direct Line: (855) 722-8700 ext. [extension]
Secure Portal: lawsonmobiletax.com/client/returns
Next Review: Scheduled for ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
      actionItems: [
        'Review completed tax return',
        'Verify direct deposit information',
        'Sign e-file authorization',
        'Schedule next year planning'
      ],
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    }
  }

  // Helper methods for calculations and analysis
  private static calculateTotalIncome(client: ClientProfile): number {
    return client.w2Income + 
           client.selfEmploymentIncome + 
           client.unemploymentIncome + 
           client.socialSecurityIncome + 
           client.retirementIncome + 
           client.rentalIncome + 
           client.investmentIncome + 
           client.otherIncome
  }

  private static determineTaxBracket(income: number, filingStatus: string): number {
    // Simplified tax bracket calculation for 2024
    if (filingStatus === 'married_filing_jointly') {
      if (income <= 23200) return 10
      if (income <= 94300) return 12
      if (income <= 201050) return 22
      if (income <= 383900) return 24
      if (income <= 487450) return 32
      if (income <= 731200) return 35
      return 37
    } else {
      if (income <= 11600) return 10
      if (income <= 47150) return 12
      if (income <= 100525) return 22
      if (income <= 191950) return 24
      if (income <= 243725) return 32
      if (income <= 609350) return 35
      return 37
    }
  }

  private static assessFilingComplexity(client: ClientProfile): string {
    let complexity = 0
    if (client.selfEmploymentIncome > 0) complexity += 2
    if (client.dependents.length > 0) complexity += 1
    if (client.hasCharitableDonations) complexity += 1
    if (client.hasMortgageInterest) complexity += 1
    if (client.investmentIncome > 0) complexity += 1
    if (client.hasBusinessVehicle) complexity += 1
    if (client.hasHomeOffice) complexity += 1

    if (complexity <= 2) return 'Simple'
    if (complexity <= 4) return 'Moderate'
    if (complexity <= 6) return 'Complex'
    return 'Highly Complex'
  }

  private static generateStrategyAnalysis(client: ClientProfile, strategy: string): string {
    // Generate detailed analysis based on strategy type
    switch (strategy.toLowerCase()) {
      case 'business expense optimization':
        return `Given your ${client.occupation} income of $${client.selfEmploymentIncome.toLocaleString()}, proper business expense categorization and documentation can significantly reduce your tax liability. I've identified several expense categories that may be under-utilized in your current setup...`
      
      case 'retirement planning':
        return `With your current income level and age, maximizing retirement contributions offers both immediate tax benefits and long-term wealth building. Based on your $${this.calculateTotalIncome(client).toLocaleString()} income, you're in the ${this.determineTaxBracket(this.calculateTotalIncome(client), client.maritalStatus)}% tax bracket...`
      
      default:
        return `This strategy has been specifically selected based on your unique tax profile and financial situation...`
    }
  }

  private static generatePersonalizedImpact(client: ClientProfile, strategy: string): string {
    return `For someone in your position as a ${client.occupation} with ${client.dependents.length} dependent${client.dependents.length !== 1 ? 's' : ''}, this strategy directly addresses your primary tax concerns while aligning with your stated goals of ${client.primaryTaxGoals.join(' and ')}.`
  }

  private static generateImplementationPlan(client: ClientProfile, strategy: string): string {
    return `Phase 1 (Immediate): Begin implementation within the next 2 weeks
Phase 2 (Short-term): Complete core elements within 30 days  
Phase 3 (Long-term): Optimize and maintain throughout the tax year`
  }

  private static generateActionItems(client: ClientProfile, strategy: string): string[] {
    return [
      'Review current documentation and gather additional required materials',
      'Schedule consultation to discuss implementation details',
      'Complete necessary forms and establish new procedures',
      'Monitor progress and adjust strategy as needed'
    ]
  }

  private static generateRiskAssessment(client: ClientProfile, strategy: string): string {
    return `Risk Level: Low to Moderate. This strategy is well within IRS guidelines and appropriate for your tax profile. All recommendations are based on current tax law and your specific situation as a ${client.occupation} in ${client.state}.`
  }

  private static generateExpectedOutcomes(client: ClientProfile, strategy: string): string {
    return `Based on your current tax situation, successful implementation of this strategy should result in measurable tax savings while maintaining full compliance with tax regulations. The strategy aligns with your risk tolerance level of "${client.riskTolerance}" and supports your long-term financial objectives.`
  }

  private static calculatePotentialSavings(client: ClientProfile, strategy: string): number {
    // Simplified calculation based on strategy type and client profile
    const income = this.calculateTotalIncome(client)
    const taxRate = this.determineTaxBracket(income, client.maritalStatus) / 100
    
    switch (strategy.toLowerCase()) {
      case 'business expense optimization':
        return client.selfEmploymentIncome * 0.1 * taxRate
      case 'retirement planning':
        return Math.min(6500, income * 0.1) * taxRate
      default:
        return income * 0.05 * taxRate
    }
  }

  private static identifyAdditionalOpportunities(client: ClientProfile): string[] {
    const opportunities: string[] = []
    
    if (client.hasHomeOffice && client.selfEmploymentIncome > 0) {
      opportunities.push('Home office deduction optimization')
    }
    
    if (client.traditionalIraContributions < 6500) {
      opportunities.push('IRA contribution maximization')
    }
    
    if (client.dependents.some(d => d.studentStatus !== 'not_student')) {
      opportunities.push('Education credit strategies')
    }
    
    return opportunities
  }

  // Additional helper methods would be implemented here for document analysis,
  // quarterly planning, return completion, etc.
  private static getDocumentSpecificDetails(client: ClientProfile, documentType: string): any {
    return {
      explanation: `This document is specifically required for your tax situation based on your profile as a ${client.occupation}.`
    }
  }

  private static analyzeDocumentImpact(client: ClientProfile, documentType: string): string {
    return `This document will impact your return by validating deductions and ensuring compliance with IRS requirements.`
  }

  private static calculateDocumentImpactOnReturn(client: ClientProfile, documentType: string): string {
    return `Proper documentation could affect your refund by up to $${(this.calculateTotalIncome(client) * 0.05).toLocaleString()}.`
  }

  private static getSpecificDocumentRequirements(client: ClientProfile, documentType: string): string[] {
    return [
      'Original or certified copy of the document',
      'All pages must be included and legible',
      'Documents must be for the correct tax year'
    ]
  }

  private static getDocumentDeadlineInfo(documentType: string, urgency: string): string {
    return `This document is needed within ${urgency === 'urgent' ? '24 hours' : '1 week'} to avoid delays in processing your return.`
  }

  private static getDocumentGatheringInstructions(client: ClientProfile, documentType: string): string {
    return `1. Locate the document in your tax folder\n2. Scan or photograph clearly\n3. Upload to your secure client portal\n4. Verify all information is legible`
  }

  private static getDocumentFAQ(client: ClientProfile, documentType: string): string {
    return `Q: What if I can't find this document?\nA: Contact the issuing party for a duplicate copy.\n\nQ: Can I submit a photocopy?\nA: Yes, as long as it's clear and legible.`
  }

  // Quarterly planning helper methods
  private static calculateProjectedAnnualIncome(client: ClientProfile, quarter: number): number {
    return this.calculateTotalIncome(client)
  }

  private static calculateQuarterlyPayment(client: ClientProfile, quarter: number): number {
    const annualTax = this.calculateTotalIncome(client) * 0.25 // Simplified
    return annualTax / 4
  }

  private static calculateQuarterlyGrowth(client: ClientProfile, quarter: number): number {
    return 5 // Placeholder - would calculate actual growth
  }

  private static analyzeIncomeComposition(client: ClientProfile): string {
    const total = this.calculateTotalIncome(client)
    const w2Percent = (client.w2Income / total * 100).toFixed(0)
    const sePercent = (client.selfEmploymentIncome / total * 100).toFixed(0)
    
    return `${w2Percent}% Employment, ${sePercent}% Self-Employment, ${100 - parseInt(w2Percent) - parseInt(sePercent)}% Other`
  }

  // Additional calculation methods would be implemented here
  private static calculateFederalTax(client: ClientProfile): number {
    return this.calculateTotalIncome(client) * 0.22 // Simplified
  }

  private static calculateAnnualTaxLiability(client: ClientProfile): number {
    return this.calculateTotalIncome(client) * 0.25 // Simplified
  }

  private static calculateYTDPayments(client: ClientProfile, quarter: number): number {
    return (client.w2Income * 0.20) * (quarter / 4) // Simplified
  }

  private static getQuarterlyDueDate(quarter: number): string {
    const dates = ['January 15', 'April 15', 'June 15', 'September 15']
    return dates[quarter - 1]
  }

  private static generateQuarterlyRecommendations(client: ClientProfile, quarter: number): any[] {
    return [
      {
        title: 'Expense Acceleration',
        description: 'Consider accelerating deductible business expenses',
        impact: `Potential tax savings of $${(client.selfEmploymentIncome * 0.1 * 0.22).toLocaleString()}`,
        action: 'Review upcoming business expenses and timing'
      }
    ]
  }

  private static generateBusinessSpecificStrategies(client: ClientProfile, quarter: number): string {
    return `As a ${client.occupation}, focus on maximizing business deductions and planning for estimated tax payments.`
  }

  private static generateFamilyTaxStrategies(client: ClientProfile, quarter: number): string {
    return `With ${client.dependents.length} dependents, ensure you're maximizing child tax credits and education benefits.`
  }

  private static generateStateSpecificAdvice(client: ClientProfile, quarter: number): string {
    return `In ${client.state}, consider state-specific deductions and credits that may benefit your situation.`
  }

  private static generateYearEndPreview(client: ClientProfile, quarter: number): string[] {
    return [
      'Review retirement contribution limits',
      'Plan charitable giving strategy',
      'Consider tax-loss harvesting for investments'
    ]
  }

  private static generateQuarterlyNextSteps(client: ClientProfile, quarter: number): string[] {
    return [
      'Review quarterly estimated payment amount',
      'Organize business expense documentation',
      'Schedule year-end planning consultation'
    ]
  }

  private static getNextReviewDate(quarter: number): string {
    const nextQuarter = quarter + 1
    return nextQuarter <= 4 ? `Q${nextQuarter} review` : 'Year-end review'
  }

  private static getYearEndSessionDate(): string {
    return 'December 1-15 (schedule early)'
  }

  // Return completion helper methods
  private static compareToLastYear(client: ClientProfile, currentRefund: number): string {
    if (client.previousYearRefund > 0) {
      const difference = currentRefund - client.previousYearRefund
      return difference > 0 
        ? `$${difference.toLocaleString()} more than last year`
        : `$${Math.abs(difference).toLocaleString()} less than last year`
    }
    return 'Previous year data not available'
  }

  private static compareEffectiveRate(rate: number, filingStatus: string): string {
    const average = filingStatus === 'married_filing_jointly' ? 14 : 16
    return rate < average ? 'below average' : 'above average'
  }

  private static calculateTotalDeductions(client: ClientProfile): number {
    const standard = client.maritalStatus === 'married_filing_jointly' ? 27700 : 13850
    let itemized = 0
    
    if (client.hasCharitableDonations) itemized += client.charitableDonationsAmount
    if (client.hasMortgageInterest) itemized += client.mortgageInterestAmount
    if (client.hasStateLocalTaxes) itemized += Math.min(client.stateLocalTaxesAmount, 10000)
    
    return Math.max(standard, itemized)
  }

  private static calculateTaxCredits(client: ClientProfile): number {
    let credits = 0
    credits += client.dependents.filter(d => d.qualifiesForChildTaxCredit).length * 2000
    if (client.hasEducationExpenses) credits += Math.min(client.educationExpensesAmount * 0.25, 2500)
    return credits
  }

  private static generateSuccessfulStrategies(client: ClientProfile): any[] {
    const strategies: any[] = []
    
    if (client.selfEmploymentIncome > 0) {
      strategies.push({
        name: 'Business Expense Optimization',
        description: `Properly categorized your ${client.occupation} business expenses`,
        savings: client.businessExpenses * 0.22,
        method: 'Detailed expense tracking and categorization'
      })
    }
    
    if (client.hasHomeOffice) {
      strategies.push({
        name: 'Home Office Deduction',
        description: `Maximized your home office deduction for ${client.homeOfficeSquareFeet} sq ft`,
        savings: client.homeOfficeSquareFeet * 5 * 0.22,
        method: 'Simplified home office deduction method'
      })
    }
    
    return strategies
  }

  private static analyzeWithholdings(client: ClientProfile): string {
    const withholdings = client.w2Income * 0.20
    const tax = client.w2Income * 0.22
    
    return withholdings > tax ? 'Over-withheld (refund expected)' : 'Under-withheld (may owe tax)'
  }

  private static getBusinessStrategiesUsed(client: ClientProfile): string {
    const strategies: string[] = []
    if (client.hasHomeOffice) strategies.push('Home office deduction')
    if (client.hasBusinessVehicle) strategies.push('Vehicle expense deduction')
    return strategies.length > 0 ? strategies.join(', ') : 'Standard business deductions'
  }

  private static generateDeductionAnalysis(client: ClientProfile): string {
    let analysis = 'Standard vs. Itemized Analysis:\n'
    const standard = client.maritalStatus === 'married_filing_jointly' ? 27700 : 13850
    
    analysis += `• Standard Deduction: $${standard.toLocaleString()}\n`
    
    if (client.hasCharitableDonations || client.hasMortgageInterest) {
      let itemized = 0
      if (client.hasCharitableDonations) itemized += client.charitableDonationsAmount
      if (client.hasMortgageInterest) itemized += client.mortgageInterestAmount
      
      analysis += `• Itemized Deductions: $${itemized.toLocaleString()}\n`
      analysis += `• Method Used: ${itemized > standard ? 'Itemized' : 'Standard'} (saves more money)\n`
    }
    
    return analysis
  }

  private static calculateAdditionalCTC(dependent: any): string {
    return dependent.qualifiesForChildTaxCredit ? 'Up to $1,600 refundable' : 'Not applicable'
  }

  private static calculateEducationCredits(dependent: any): string {
    if (dependent.studentStatus === 'college_undergraduate') return 'American Opportunity Credit eligible'
    if (dependent.studentStatus === 'college_graduate') return 'Lifetime Learning Credit eligible'
    return 'Not applicable'
  }

  private static calculateFamilyBenefits(client: ClientProfile): number {
    let benefits = 0
    benefits += client.dependents.filter(d => d.qualifiesForChildTaxCredit).length * 2000
    // Add other family benefits calculations
    return benefits
  }

  private static calculateAGI(client: ClientProfile): number {
    return this.calculateTotalIncome(client) - this.calculateAboveTheLineDeductions(client)
  }

  private static calculateAboveTheLineDeductions(client: ClientProfile): number {
    let deductions = 0
    deductions += client.traditionalIraContributions
    deductions += client.hsa401kContributions
    if (client.selfEmploymentIncome > 0) {
      deductions += (client.selfEmploymentIncome - client.businessExpenses) * 0.153 * 0.5 // SE tax deduction
    }
    return deductions
  }

  private static calculateYearOverYearChange(client: ClientProfile): string {
    const currentAGI = this.calculateAGI(client)
    const change = currentAGI - client.previousYearAGI
    const percentage = (change / client.previousYearAGI * 100).toFixed(1)
    
    return change > 0 
      ? `Increased by $${change.toLocaleString()} (${percentage}%)`
      : `Decreased by $${Math.abs(change).toLocaleString()} (${Math.abs(parseFloat(percentage))}%)`
  }

  private static analyzeTaxImprovement(client: ClientProfile): string {
    return 'Tax planning strategies resulted in optimized tax position compared to previous year'
  }

  private static generateNextYearRecommendations(client: ClientProfile): any[] {
    return [
      {
        title: 'Quarterly Estimated Payment Plan',
        description: `Based on this year's results, establish quarterly payments to avoid underpayment penalties`,
        benefit: 'Avoid penalties and manage cash flow',
        implementation: 'Set up automatic quarterly payments'
      },
      {
        title: 'Business Expense Tracking System',
        description: 'Implement better expense tracking for your ${client.occupation} business',
        benefit: 'Maximize deductions and reduce audit risk',
        implementation: 'Use accounting software with receipt capture'
      }
    ]
  }
}
