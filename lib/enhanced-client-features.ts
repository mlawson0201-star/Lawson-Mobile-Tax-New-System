
// Enhanced Client Features - Smart Document Management & Auto-Categorization
// Phase 1 Enhancement for Lawson Mobile Tax

export interface DocumentType {
  id: string
  name: string
  category: 'income' | 'deduction' | 'business' | 'personal' | 'investment'
  required: boolean
  description: string
  aiSuggestion: string
  keywords: string[]
  fileTypes: string[]
  maxSize: number // in MB
  validationRules: string[]
  taxImplication: string
  potentialSavings?: number
}

export interface SmartUploadResult {
  suggestedCategory: string
  confidence: number
  extractedData: any
  validationStatus: 'valid' | 'warning' | 'error'
  recommendations: string[]
}

export class EnhancedClientFeatures {

  /**
   * Smart document categorization system
   */
  static getDocumentTypes(): DocumentType[] {
    return [
      {
        id: 'w2_form',
        name: 'W-2 Wage and Tax Statement',
        category: 'income',
        required: true,
        description: 'Annual wage statement from your employer showing income and tax withholdings',
        aiSuggestion: 'Upload your W-2 form from each employer. This is required for all employed individuals.',
        keywords: ['w2', 'wage', 'salary', 'employer', 'withholding'],
        fileTypes: ['pdf', 'jpg', 'png', 'heic'],
        maxSize: 10,
        validationRules: [
          'Must contain employer EIN',
          'Must show wage amounts',
          'Must be for correct tax year'
        ],
        taxImplication: 'Primary income source for tax calculation',
        potentialSavings: 0
      },
      {
        id: '1099_nec',
        name: '1099-NEC Nonemployee Compensation',
        category: 'income',
        required: true,
        description: 'Income from freelance, consulting, or contract work',
        aiSuggestion: 'Essential for self-employed individuals. Triggers quarterly payment requirements.',
        keywords: ['1099', 'nec', 'contract', 'freelance', 'self-employed'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 10,
        validationRules: [
          'Must show payer information',
          'Must contain income amount',
          'Must be for correct tax year'
        ],
        taxImplication: 'Subject to self-employment tax (15.3%)',
        potentialSavings: 0
      },
      {
        id: 'business_mileage',
        name: 'Business Mileage Log',
        category: 'business',
        required: false,
        description: 'Detailed record of business-related vehicle use',
        aiSuggestion: 'Track every business trip! Each mile is worth $0.70 in 2025.',
        keywords: ['mileage', 'vehicle', 'travel', 'business', 'log'],
        fileTypes: ['pdf', 'xlsx', 'csv', 'jpg', 'png'],
        maxSize: 5,
        validationRules: [
          'Must include dates and destinations',
          'Must show business purpose',
          'Should include odometer readings'
        ],
        taxImplication: 'Deductible at $0.70 per business mile',
        potentialSavings: 2500
      },
      {
        id: 'home_office',
        name: 'Home Office Documentation',
        category: 'business',
        required: false,
        description: 'Evidence of dedicated home office space used exclusively for business',
        aiSuggestion: 'Document your home office setup. Photos and measurements maximize your deduction.',
        keywords: ['home office', 'workspace', 'dedicated', 'exclusive'],
        fileTypes: ['pdf', 'jpg', 'png', 'heic'],
        maxSize: 20,
        validationRules: [
          'Must show exclusive business use',
          'Should include square footage',
          'Photos of workspace helpful'
        ],
        taxImplication: 'Up to $1,500 simplified deduction or actual expense method',
        potentialSavings: 1200
      },
      {
        id: 'charitable_donations',
        name: 'Charitable Contribution Receipts',
        category: 'deduction',
        required: false,
        description: 'Receipts and acknowledgments for charitable donations',
        aiSuggestion: 'Donations over $250 require written acknowledgments. Every dollar counts!',
        keywords: ['charity', 'donation', 'contribution', 'receipt', 'acknowledgment'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 15,
        validationRules: [
          'Must be from qualified organization',
          'Written acknowledgment required for $250+',
          'Must include date and amount'
        ],
        taxImplication: 'Itemized deduction reducing taxable income',
        potentialSavings: 800
      },
      {
        id: 'mortgage_interest',
        name: 'Form 1098 - Mortgage Interest Statement',
        category: 'deduction',
        required: false,
        description: 'Annual statement of mortgage interest paid',
        aiSuggestion: 'Major itemized deduction. Often makes itemizing worthwhile.',
        keywords: ['1098', 'mortgage', 'interest', 'home loan'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 10,
        validationRules: [
          'Must be from mortgage lender',
          'Must show interest amount',
          'Property address should match'
        ],
        taxImplication: 'Itemized deduction up to $750,000 of mortgage debt',
        potentialSavings: 3000
      },
      {
        id: 'education_expenses',
        name: 'Form 1098-T & Education Receipts',
        category: 'deduction',
        required: false,
        description: 'Tuition statements and qualified education expenses',
        aiSuggestion: 'Education credits can be worth up to $2,500 per student.',
        keywords: ['1098t', 'tuition', 'education', 'college', 'student'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 15,
        validationRules: [
          'Must be from eligible institution',
          'Student must be enrolled',
          'Qualified expenses only'
        ],
        taxImplication: 'American Opportunity Credit up to $2,500 or Lifetime Learning Credit',
        potentialSavings: 2500
      },
      {
        id: 'childcare_expenses',
        name: 'Childcare and Dependent Care Receipts',
        category: 'deduction',
        required: false,
        description: 'Receipts for qualifying childcare expenses',
        aiSuggestion: 'Childcare while you work qualifies for valuable tax credits.',
        keywords: ['childcare', 'daycare', 'babysitter', 'dependent care'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 10,
        validationRules: [
          'Must include provider tax ID',
          'Child must be under 13',
          'Care must be for work purposes'
        ],
        taxImplication: 'Child and Dependent Care Credit up to $3,000 per child',
        potentialSavings: 1200
      },
      {
        id: 'medical_expenses',
        name: 'Medical and Dental Expense Records',
        category: 'deduction',
        required: false,
        description: 'Receipts for unreimbursed medical and dental expenses',
        aiSuggestion: 'Medical expenses over 7.5% of AGI are deductible.',
        keywords: ['medical', 'dental', 'doctor', 'prescription', 'health'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 20,
        validationRules: [
          'Must be unreimbursed',
          'Must exceed 7.5% of AGI',
          'Qualified medical expenses only'
        ],
        taxImplication: 'Itemized deduction for amounts exceeding 7.5% of AGI',
        potentialSavings: 1500
      },
      {
        id: 'investment_statements',
        name: 'Investment Account Statements & 1099s',
        category: 'investment',
        required: false,
        description: 'Brokerage statements, dividend income, and capital gains/losses',
        aiSuggestion: 'Investment activity affects your tax strategy. Upload all 1099-INT, 1099-DIV, 1099-B forms.',
        keywords: ['investment', '1099int', '1099div', '1099b', 'brokerage', 'stocks'],
        fileTypes: ['pdf', 'jpg', 'png'],
        maxSize: 25,
        validationRules: [
          'Must include all 1099 forms',
          'Cost basis information helpful',
          'Include year-end statements'
        ],
        taxImplication: 'Various tax treatments for dividends, interest, and capital gains',
        potentialSavings: 1000
      }
    ]
  }

  /**
   * Smart document upload with AI categorization
   */
  static analyzeUploadedDocument(
    fileName: string, 
    fileContent: string, 
    clientProfile: any
  ): SmartUploadResult {
    
    const documentTypes = this.getDocumentTypes()
    let bestMatch = documentTypes[0]
    let highestConfidence = 0

    // Analyze filename and content for categorization
    const lowerFileName = fileName.toLowerCase()
    const lowerContent = fileContent.toLowerCase()

    documentTypes.forEach(docType => {
      let confidence = 0
      
      // Check keywords in filename
      docType.keywords.forEach(keyword => {
        if (lowerFileName.includes(keyword.toLowerCase())) {
          confidence += 30
        }
        if (lowerContent.includes(keyword.toLowerCase())) {
          confidence += 20
        }
      })

      // Boost confidence for required documents
      if (docType.required) {
        confidence += 10
      }

      // Context-aware suggestions based on client profile
      if (clientProfile) {
        if (docType.category === 'business' && clientProfile.selfEmploymentIncome > 0) {
          confidence += 15
        }
        if (docType.category === 'deduction' && clientProfile.hasCharitableDonations) {
          confidence += 10
        }
      }

      if (confidence > highestConfidence) {
        highestConfidence = confidence
        bestMatch = docType
      }
    })

    // Generate recommendations based on analysis
    const recommendations = this.generateDocumentRecommendations(bestMatch, clientProfile)

    return {
      suggestedCategory: bestMatch.name,
      confidence: Math.min(highestConfidence, 95),
      extractedData: this.extractDocumentData(lowerContent, bestMatch),
      validationStatus: this.validateDocument(lowerContent, bestMatch),
      recommendations
    }
  }

  /**
   * Generate personalized recommendations for uploaded document
   */
  private static generateDocumentRecommendations(
    docType: DocumentType, 
    clientProfile: any
  ): string[] {
    const recommendations: string[] = []

    recommendations.push(docType.aiSuggestion)

    if (docType.potentialSavings && docType.potentialSavings > 0) {
      recommendations.push(`This document could save you up to $${docType.potentialSavings.toLocaleString()} in taxes.`)
    }

    recommendations.push(`Tax implication: ${docType.taxImplication}`)

    // Context-specific recommendations
    if (docType.category === 'business' && clientProfile?.selfEmploymentIncome > 0) {
      recommendations.push(`As a ${clientProfile.occupation}, this business document is particularly important for your tax situation.`)
    }

    if (docType.category === 'deduction' && clientProfile?.dependents?.length > 0) {
      recommendations.push(`With ${clientProfile.dependents.length} dependents, maximizing deductions is crucial for your family's tax strategy.`)
    }

    return recommendations
  }

  /**
   * Extract relevant data from document content
   */
  private static extractDocumentData(content: string, docType: DocumentType): any {
    const extractedData: any = {}

    // Extract common patterns based on document type
    switch (docType.id) {
      case 'w2_form':
        // Look for wage amounts, withholding, etc.
        const wageMatch = content.match(/wages.*?(\d{1,3}(?:,\d{3})*\.\d{2})/i)
        if (wageMatch) {
          extractedData.wages = parseFloat(wageMatch[1].replace(/,/g, ''))
        }
        break

      case 'business_mileage':
        // Look for mileage numbers
        const mileageMatch = content.match(/(\d{1,2},?\d{0,3})\s*miles?/i)
        if (mileageMatch) {
          extractedData.totalMiles = parseInt(mileageMatch[1].replace(/,/g, ''))
          extractedData.estimatedDeduction = extractedData.totalMiles * 0.70
        }
        break

      case 'charitable_donations':
        // Look for donation amounts
        const donationMatch = content.match(/\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g)
        if (donationMatch) {
          const amounts = donationMatch.map(match => parseFloat(match.replace(/[$,]/g, '')))
          extractedData.totalDonations = amounts.reduce((sum, amt) => sum + amt, 0)
        }
        break
    }

    return extractedData
  }

  /**
   * Validate document against business rules
   */
  private static validateDocument(content: string, docType: DocumentType): 'valid' | 'warning' | 'error' {
    // Check validation rules
    const currentYear = new Date().getFullYear()
    
    // Common validations
    if (docType.category === 'income' && !content.includes(currentYear.toString())) {
      return 'warning' // Possible wrong tax year
    }

    if (docType.required && content.length < 100) {
      return 'error' // Document appears incomplete
    }

    return 'valid'
  }

  /**
   * Get document upload progress for client
   */
  static getDocumentProgress(clientProfile: any, uploadedDocuments: string[]): {
    totalRequired: number
    completed: number
    missing: DocumentType[]
    optional: DocumentType[]
    completionPercentage: number
  } {
    
    const documentTypes = this.getDocumentTypes()
    const requiredDocs = documentTypes.filter(doc => doc.required)
    const optionalDocs = documentTypes.filter(doc => !doc.required)
    
    const missing = requiredDocs.filter(doc => 
      !uploadedDocuments.some(uploaded => uploaded.includes(doc.id))
    )
    
    const relevant = optionalDocs.filter(doc => 
      this.isDocumentRelevant(doc, clientProfile)
    )
    
    const totalRequired = requiredDocs.length + relevant.length
    const completed = totalRequired - missing.length
    
    return {
      totalRequired,
      completed,
      missing,
      optional: relevant,
      completionPercentage: totalRequired > 0 ? (completed / totalRequired) * 100 : 100
    }
  }

  /**
   * Check if optional document is relevant for client
   */
  private static isDocumentRelevant(docType: DocumentType, clientProfile: any): boolean {
    if (!clientProfile) return false

    switch (docType.category) {
      case 'business':
        return clientProfile.selfEmploymentIncome > 0
      case 'deduction':
        return clientProfile.hasCharitableDonations || 
               clientProfile.hasMortgageInterest || 
               clientProfile.hasEducationExpenses
      case 'investment':
        return clientProfile.investmentIncome > 0
      default:
        return true
    }
  }

  /**
   * Generate smart reminders for clients
   */
  static generateSmartReminders(clientProfile: any): string[] {
    const reminders: string[] = []
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1 // 1-12

    // Seasonal reminders
    if (currentMonth >= 1 && currentMonth <= 4) {
      reminders.push("Tax season is here! Upload your documents early to avoid the April rush.")
    }

    if (currentMonth >= 9 && currentMonth <= 12) {
      reminders.push("Year-end tax planning time! Review your deductions and retirement contributions.")
    }

    // Profile-specific reminders
    if (clientProfile?.selfEmploymentIncome > 0) {
      const nextQuarter = Math.ceil(currentMonth / 3)
      const quarterDates = ['January 15', 'April 15', 'June 15', 'September 15']
      reminders.push(`Quarterly estimated tax payment due: ${quarterDates[nextQuarter - 1]}`)
    }

    if (clientProfile?.hasRetirementContributions && clientProfile.traditionalIraContributions < 7000) {
      const remaining = 7000 - (clientProfile.traditionalIraContributions || 0)
      reminders.push(`You can still contribute $${remaining.toLocaleString()} to your IRA before the tax deadline.`)
    }

    if (clientProfile?.dependents?.length > 0) {
      reminders.push("Don't forget to gather childcare receipts and education expenses for valuable tax credits!")
    }

    return reminders
  }
}

export default EnhancedClientFeatures
