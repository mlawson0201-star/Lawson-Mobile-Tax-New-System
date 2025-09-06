
// Business Formation Services - Phase 3 Enterprise Domination
// Comprehensive business entity formation and compliance services

export interface BusinessEntity {
  id: string
  clientId: string
  entityName: string
  entityType: 'LLC' | 'S_CORP' | 'C_CORP' | 'PARTNERSHIP' | 'SOLE_PROPRIETORSHIP' | 'NONPROFIT'
  state: string
  registrationDate: Date
  ein?: string
  status: 'forming' | 'active' | 'dissolved' | 'suspended' | 'merged'
  incorporationDetails: IncorporationDetails
  complianceRequirements: ComplianceRequirement[]
  annualRequirements: AnnualRequirement[]
  documents: EntityDocument[]
  registeredAgent: RegisteredAgent
  officers: EntityOfficer[]
  shares?: ShareStructure
  operatingAgreement?: OperatingAgreement
  businessLicenses: BusinessLicense[]
  taxElections: TaxElection[]
  bankingSetup?: BankingSetup
  totalCost: number
  timeline: FormationTimeline
  assignedSpecialist: string
}

export interface IncorporationDetails {
  businessPurpose: string
  principalAddress: Address
  mailingAddress: Address
  businessPhone: string
  businessEmail: string
  website?: string
  startDate: Date
  fiscalYearEnd: string
  naicsCode: string
  industryDescription: string
  numberOfEmployees: number
  projectedRevenue: number
  businessDescription: string
  targetMarkets: string[]
  competitiveAdvantages: string[]
}

export interface ComplianceRequirement {
  id: string
  type: 'annual_report' | 'franchise_tax' | 'registered_agent' | 'ein_application' | 'business_license' | 'workers_comp' | 'unemployment_insurance'
  description: string
  frequency: 'one_time' | 'annual' | 'quarterly' | 'monthly' | 'as_needed'
  dueDate: Date
  cost: number
  status: 'pending' | 'completed' | 'overdue' | 'not_required'
  jurisdiction: string
  consequences: string
  autoRenew: boolean
  reminderDays: number[]
}

export interface AnnualRequirement {
  year: number
  annualReportDue: Date
  franchiseTaxDue?: Date
  annualReportFee: number
  franchiseTaxAmount?: number
  filingStatus: 'not_due' | 'pending' | 'filed' | 'overdue'
  confirmationNumber?: string
  filedDate?: Date
}

export interface EntityDocument {
  id: string
  type: 'articles_of_incorporation' | 'operating_agreement' | 'bylaws' | 'stock_certificates' | 'annual_report' | 'amendment' | 'dissolution'
  name: string
  description: string
  url: string
  uploadedDate: Date
  expirationDate?: Date
  isRequired: boolean
  signatureRequired: boolean
  notarizationRequired: boolean
  status: 'draft' | 'pending_signature' | 'pending_notarization' | 'completed' | 'expired'
}

export interface RegisteredAgent {
  type: 'self' | 'professional_service' | 'attorney'
  name: string
  address: Address
  phone: string
  email: string
  licenseNumber?: string
  annualFee: number
  serviceLevel: 'basic' | 'premium' | 'enterprise'
  serviceIncludes: string[]
  autoRenew: boolean
}

export interface EntityOfficer {
  id: string
  type: 'president' | 'vice_president' | 'secretary' | 'treasurer' | 'director' | 'member' | 'manager' | 'partner'
  name: string
  title: string
  address: Address
  phone: string
  email: string
  ssn?: string
  ownershipPercentage?: number
  votingRights?: number
  isActive: boolean
  appointmentDate: Date
  resignationDate?: Date
  compensation?: OfficerCompensation
}

export interface OfficerCompensation {
  salary?: number
  bonus?: number
  equity?: number
  benefits: string[]
  effectiveDate: Date
}

export interface ShareStructure {
  authorizedShares: number
  issuedShares: number
  parValue: number
  shareClasses: ShareClass[]
  stockTransferRestrictions: string[]
  buyBackProvisions?: string
}

export interface ShareClass {
  class: string
  type: 'common' | 'preferred'
  votingRights: boolean
  dividendRights: boolean
  liquidationPreference: number
  shares: number
  parValue: number
}

export interface OperatingAgreement {
  id: string
  templateType: 'single_member' | 'multi_member' | 'manager_managed' | 'member_managed'
  customizationLevel: 'basic' | 'standard' | 'comprehensive'
  provisions: OperatingAgreementProvision[]
  signatureDate?: Date
  amendmentHistory: OperatingAgreementAmendment[]
  cost: number
}

export interface OperatingAgreementProvision {
  section: string
  provision: string
  customization: string
  isRequired: boolean
}

export interface OperatingAgreementAmendment {
  id: string
  date: Date
  description: string
  reason: string
  amendedBy: string
}

export interface BusinessLicense {
  id: string
  licenseType: string
  licenseName: string
  jurisdiction: string
  licenseNumber?: string
  issuedDate?: Date
  expirationDate?: Date
  cost: number
  status: 'research_needed' | 'application_pending' | 'active' | 'expired' | 'not_required'
  requirements: string[]
  renewalReminder: boolean
  renewalDays: number
}

export interface TaxElection {
  id: string
  electionType: 'S_CORP_ELECTION' | 'C_CORP_ELECTION' | 'CHECK_THE_BOX' | 'INSTALLMENT_METHOD' | 'SECTION_179'
  formNumber: string
  description: string
  deadline: Date
  status: 'recommended' | 'elected' | 'not_applicable' | 'declined'
  taxSavings: number
  requirements: string[]
  consequences: string[]
  filedDate?: Date
}

export interface BankingSetup {
  bankName?: string
  accountType: 'checking' | 'savings' | 'money_market' | 'multiple'
  requiredDocuments: string[]
  setupStatus: 'not_started' | 'documents_prepared' | 'application_submitted' | 'approved' | 'account_opened'
  estimatedTimeframe: string
  minimumDeposit: number
  monthlyFees: number
  features: string[]
}

export interface FormationTimeline {
  totalEstimatedDays: number
  phases: FormationPhase[]
  currentPhase: string
  percentComplete: number
  startDate: Date
  estimatedCompletionDate: Date
  actualCompletionDate?: Date
  delays?: TimelineDelay[]
}

export interface FormationPhase {
  phase: string
  description: string
  estimatedDays: number
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed'
  startDate?: Date
  completionDate?: Date
  dependencies: string[]
  deliverables: string[]
}

export interface TimelineDelay {
  phase: string
  reason: string
  delayDays: number
  newEstimatedCompletion: Date
  clientNotified: boolean
}

export interface Address {
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface FormationPackage {
  id: string
  name: string
  description: string
  entityTypes: BusinessEntity['entityType'][]
  basePrice: number
  includedServices: string[]
  addOnServices: FormationAddOn[]
  timeline: string
  popularityRank: number
  recommended: boolean
  targetClientType: 'startup' | 'small_business' | 'growing_business' | 'enterprise'
  stateAvailability: string[]
}

export interface FormationAddOn {
  id: string
  name: string
  description: string
  price: number
  category: 'legal' | 'tax' | 'compliance' | 'banking' | 'consulting'
  estimatedTime: string
  isRecommended: boolean
  applicableEntities: BusinessEntity['entityType'][]
  requirements: string[]
}

export class BusinessFormationServices {

  /**
   * Get available business formation packages
   */
  static getFormationPackages(): FormationPackage[] {
    return [
      {
        id: 'startup_essential',
        name: 'Startup Essential',
        description: 'Perfect for new entrepreneurs getting started with basic business formation',
        entityTypes: ['LLC', 'SOLE_PROPRIETORSHIP'],
        basePrice: 899,
        includedServices: [
          'Business name availability check',
          'Articles of incorporation filing',
          'Registered agent service (1 year)',
          'EIN application',
          'Basic operating agreement',
          'Corporate resolution template',
          'Business banking setup guidance',
          'Tax election consultation'
        ],
        addOnServices: [
          {
            id: 'trademark_search',
            name: 'Trademark Search & Application',
            description: 'Comprehensive trademark search and federal application filing',
            price: 599,
            category: 'legal',
            estimatedTime: '2-3 weeks',
            isRecommended: true,
            applicableEntities: ['LLC', 'S_CORP', 'C_CORP'],
            requirements: ['Unique business name', 'Clear service/product description']
          },
          {
            id: 'business_license_research',
            name: 'Business License Research',
            description: 'Comprehensive research of required business licenses and permits',
            price: 299,
            category: 'compliance',
            estimatedTime: '3-5 business days',
            isRecommended: true,
            applicableEntities: ['LLC', 'S_CORP', 'C_CORP', 'PARTNERSHIP'],
            requirements: ['Business description', 'Operating location', 'Target markets']
          }
        ],
        timeline: '7-14 business days',
        popularityRank: 1,
        recommended: true,
        targetClientType: 'startup',
        stateAvailability: ['ALL']
      },

      {
        id: 'business_builder',
        name: 'Business Builder Pro',
        description: 'Comprehensive formation for serious entrepreneurs with growth plans',
        entityTypes: ['LLC', 'S_CORP', 'C_CORP'],
        basePrice: 1499,
        includedServices: [
          'Priority business name reservation',
          'Expedited state filing',
          'Registered agent service (2 years)',
          'EIN application with IRS communication',
          'Comprehensive operating agreement',
          'Custom bylaws and corporate resolutions',
          'Stock certificate preparation',
          'Business banking setup assistance',
          'S-Corp tax election (if applicable)',
          'Business license research (up to 3 licenses)',
          'First-year compliance calendar',
          'Quarterly compliance reminders'
        ],
        addOnServices: [
          {
            id: 'business_plan_review',
            name: 'Business Plan Review & Optimization',
            description: 'Professional review and optimization of business plan for funding/growth',
            price: 899,
            category: 'consulting',
            estimatedTime: '1-2 weeks',
            isRecommended: true,
            applicableEntities: ['LLC', 'S_CORP', 'C_CORP'],
            requirements: ['Existing business plan draft', 'Financial projections']
          },
          {
            id: 'website_domain_setup',
            name: 'Website & Domain Package',
            description: 'Professional website setup with business domain and basic SEO',
            price: 1299,
            category: 'consulting',
            estimatedTime: '2-3 weeks',
            isRecommended: false,
            applicableEntities: ['LLC', 'S_CORP', 'C_CORP', 'PARTNERSHIP'],
            requirements: ['Business branding preferences', 'Content requirements']
          }
        ],
        timeline: '5-10 business days',
        popularityRank: 2,
        recommended: true,
        targetClientType: 'small_business',
        stateAvailability: ['ALL']
      },

      {
        id: 'enterprise_formation',
        name: 'Enterprise Formation Suite',
        description: 'Premium formation package for established businesses and complex structures',
        entityTypes: ['C_CORP', 'LLC', 'PARTNERSHIP'],
        basePrice: 2999,
        includedServices: [
          'Same-day business name reservation',
          'Expedited premium filing',
          'Premium registered agent (3 years)',
          'EIN application with priority processing',
          'Custom operating agreement with attorney review',
          'Comprehensive bylaws and governance documents',
          'Custom stock structure and certificates',
          'Multi-class share structure setup',
          'Banking relationship facilitation',
          'Tax optimization consultation',
          'Business license research and applications',
          'Compliance management system setup',
          'Quarterly business review sessions',
          'Annual compliance management'
        ],
        addOnServices: [
          {
            id: 'securities_compliance',
            name: 'Securities Law Compliance Package',
            description: 'Comprehensive securities law compliance for investment raising',
            price: 4999,
            category: 'legal',
            estimatedTime: '3-4 weeks',
            isRecommended: true,
            applicableEntities: ['C_CORP'],
            requirements: ['Investment plans', 'Investor profiles', 'Financial statements']
          },
          {
            id: 'international_expansion',
            name: 'International Business Setup',
            description: 'Multi-jurisdiction business setup for international operations',
            price: 7999,
            category: 'legal',
            estimatedTime: '4-8 weeks',
            isRecommended: false,
            applicableEntities: ['C_CORP', 'LLC'],
            requirements: ['Target countries', 'Business model', 'Regulatory requirements']
          }
        ],
        timeline: '3-7 business days',
        popularityRank: 3,
        recommended: false,
        targetClientType: 'enterprise',
        stateAvailability: ['ALL']
      },

      {
        id: 'nonprofit_formation',
        name: 'Nonprofit Formation Complete',
        description: 'Comprehensive 501(c)(3) nonprofit formation with tax-exemption',
        entityTypes: ['NONPROFIT'],
        basePrice: 1999,
        includedServices: [
          'Nonprofit name reservation',
          'Articles of incorporation for nonprofits',
          'Registered agent service (2 years)',
          'EIN application for tax-exempt entities',
          'IRS Form 1023 preparation and filing',
          'Corporate bylaws for nonprofits',
          'Board resolution templates',
          'Conflict of interest policy',
          'Document retention policy',
          'State charity registration',
          'Annual filing compliance setup',
          'Grant readiness consultation'
        ],
        addOnServices: [
          {
            id: 'grant_writing_service',
            name: 'Professional Grant Writing',
            description: 'Professional grant application writing and submission services',
            price: 2499,
            category: 'consulting',
            estimatedTime: '2-4 weeks',
            isRecommended: true,
            applicableEntities: ['NONPROFIT'],
            requirements: ['Mission statement', 'Program descriptions', 'Budget planning']
          }
        ],
        timeline: '4-8 weeks (including IRS processing)',
        popularityRank: 4,
        recommended: true,
        targetClientType: 'startup',
        stateAvailability: ['ALL']
      }
    ]
  }

  /**
   * Recommend optimal entity type based on business profile
   */
  static recommendEntityType(businessProfile: {
    owners: number
    projectedRevenue: number
    businessType: string
    growthPlans: 'none' | 'moderate' | 'aggressive'
    investorPlans: boolean
    liabilityConcerns: 'low' | 'moderate' | 'high'
    taxOptimization: 'simple' | 'moderate' | 'aggressive'
    operationalComplexity: 'simple' | 'moderate' | 'complex'
  }): {
    primaryRecommendation: BusinessEntity['entityType']
    alternatives: BusinessEntity['entityType'][]
    reasoning: string
    considerations: string[]
    taxImplications: string
    complianceRequirements: string
    estimatedCost: number
    timeline: string
  } {

    let primaryRecommendation: BusinessEntity['entityType'] = 'LLC'
    let alternatives: BusinessEntity['entityType'][] = []
    let reasoning = ''
    let considerations: string[] = []
    let taxImplications = ''
    let complianceRequirements = ''
    let estimatedCost = 899
    let timeline = '7-14 business days'

    // Single owner analysis
    if (businessProfile.owners === 1) {
      if (businessProfile.liabilityConcerns === 'low' && businessProfile.projectedRevenue < 50000) {
        primaryRecommendation = 'SOLE_PROPRIETORSHIP'
        alternatives = ['LLC']
        reasoning = 'For single owners with low liability concerns and modest revenue, sole proprietorship offers simplicity and cost savings'
        considerations = [
          'No liability protection for personal assets',
          'Cannot easily add partners or investors later',
          'May face self-employment tax on all profits'
        ]
        taxImplications = 'Pass-through taxation, self-employment tax applies to all profits'
        complianceRequirements = 'Minimal - business license and tax filings only'
        estimatedCost = 299
        timeline = '1-3 business days'
      } else {
        primaryRecommendation = 'LLC'
        alternatives = ['S_CORP']
        reasoning = 'Single-member LLC provides liability protection with operational flexibility and tax benefits'
        considerations = [
          'Can elect S-Corp taxation to save on self-employment taxes',
          'Easy to add members or convert to multi-member LLC later',
          'Credibility benefits for business relationships'
        ]
        taxImplications = 'Pass-through taxation by default, can elect corporate taxation'
        complianceRequirements = 'Annual reports and registered agent required in most states'
        estimatedCost = 899
      }
    }

    // Multiple owners
    else if (businessProfile.owners > 1 && businessProfile.owners <= 5) {
      if (businessProfile.investorPlans || businessProfile.growthPlans === 'aggressive') {
        primaryRecommendation = 'C_CORP'
        alternatives = ['LLC', 'S_CORP']
        reasoning = 'C-Corporation provides maximum flexibility for investment raising and aggressive growth plans'
        considerations = [
          'Double taxation on profits (corporate + individual level)',
          'Most attractive structure for outside investors',
          'Can offer stock options and multiple share classes',
          'More complex compliance and governance requirements'
        ]
        taxImplications = 'Corporate taxation at entity level, dividends taxed at individual level'
        complianceRequirements = 'Board meetings, annual shareholder meetings, detailed record keeping'
        estimatedCost = 1499
        timeline = '5-10 business days'
      } else if (businessProfile.projectedRevenue > 100000 && businessProfile.taxOptimization !== 'simple') {
        primaryRecommendation = 'S_CORP'
        alternatives = ['LLC']
        reasoning = 'S-Corporation provides tax advantages for profitable businesses while maintaining pass-through taxation'
        considerations = [
          'Limited to 100 shareholders, all must be US persons',
          'Salary requirements for owner-employees',
          'Can save significant self-employment taxes',
          'Annual tax filing required'
        ]
        taxImplications = 'Pass-through taxation, potential self-employment tax savings'
        complianceRequirements = 'Annual tax return, payroll compliance, board meetings'
        estimatedCost = 1499
      } else {
        primaryRecommendation = 'LLC'
        alternatives = ['S_CORP', 'PARTNERSHIP']
        reasoning = 'Multi-member LLC offers maximum flexibility with favorable tax treatment and operational simplicity'
        considerations = [
          'Can elect different tax treatments as business grows',
          'Flexible profit and loss allocation among members',
          'Less formal governance requirements than corporations'
        ]
        taxImplications = 'Pass-through taxation with flexible allocation options'
        complianceRequirements = 'Operating agreement required, annual reports in most states'
        estimatedCost = 1499
      }
    }

    // Large organizations
    else {
      primaryRecommendation = 'C_CORP'
      alternatives = ['LLC']
      reasoning = 'Large organizations benefit from corporate structure for governance, investment, and operational management'
      estimatedCost = 2999
      timeline = '3-7 business days'
    }

    return {
      primaryRecommendation,
      alternatives,
      reasoning,
      considerations,
      taxImplications,
      complianceRequirements,
      estimatedCost,
      timeline
    }
  }

  /**
   * Calculate total formation cost with add-ons and timeline
   */
  static calculateFormationCost(
    packageId: string,
    addOnIds: string[] = [],
    expeditedService: boolean = false,
    stateFilingFees: boolean = true
  ): {
    packageCost: number
    addOnCost: number
    expeditedFee: number
    stateFilingFee: number
    totalCost: number
    timeline: string
    breakdown: { item: string; cost: number }[]
  } {

    const package_ = this.getFormationPackages().find(p => p.id === packageId)
    if (!package_) {
      throw new Error(`Formation package ${packageId} not found`)
    }

    const packageCost = package_.basePrice
    
    const addOnCost = addOnIds.reduce((total, addOnId) => {
      const addOn = package_.addOnServices.find(ao => ao.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)

    const expeditedFee = expeditedService ? Math.round(packageCost * 0.25) : 0 // 25% expedite fee
    const stateFilingFee = stateFilingFees ? 275 : 0 // Average state filing fee

    const totalCost = packageCost + addOnCost + expeditedFee + stateFilingFee

    // Calculate timeline
    let baseTimeline = package_.timeline
    let timeline = baseTimeline
    if (expeditedService) {
      timeline = timeline.replace(/(\d+)-(\d+)/, (match, start, end) => {
        const newStart = Math.max(1, Math.round(parseInt(start) / 2))
        const newEnd = Math.max(newStart, Math.round(parseInt(end) / 2))
        return `${newStart}-${newEnd}`
      })
    }

    const breakdown = [
      { item: `${package_.name} Package`, cost: packageCost },
      ...(addOnIds.map(addOnId => {
        const addOn = package_.addOnServices.find(ao => ao.id === addOnId)
        return { item: addOn?.name || 'Unknown Add-on', cost: addOn?.price || 0 }
      })),
      ...(expeditedService ? [{ item: 'Expedited Processing', cost: expeditedFee }] : []),
      ...(stateFilingFees ? [{ item: 'State Filing Fees', cost: stateFilingFee }] : [])
    ]

    return {
      packageCost,
      addOnCost,
      expeditedFee,
      stateFilingFee,
      totalCost,
      timeline,
      breakdown
    }
  }

  /**
   * Create new business formation project
   */
  static createFormationProject(
    clientId: string,
    entityName: string,
    entityType: BusinessEntity['entityType'],
    state: string,
    packageId: string,
    addOnIds: string[] = [],
    incorporationDetails: Partial<IncorporationDetails>
  ): BusinessEntity {

    const package_ = this.getFormationPackages().find(p => p.id === packageId)
    if (!package_) {
      throw new Error(`Formation package ${packageId} not found`)
    }

    const costBreakdown = this.calculateFormationCost(packageId, addOnIds)
    const phases = this.generateFormationTimeline(entityType, package_, addOnIds)

    const businessEntity: BusinessEntity = {
      id: `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      entityName,
      entityType,
      state,
      registrationDate: new Date(),
      status: 'forming',
      incorporationDetails: {
        businessPurpose: incorporationDetails.businessPurpose || 'General business purposes',
        principalAddress: incorporationDetails.principalAddress || {} as Address,
        mailingAddress: incorporationDetails.mailingAddress || {} as Address,
        businessPhone: incorporationDetails.businessPhone || '',
        businessEmail: incorporationDetails.businessEmail || '',
        website: incorporationDetails.website,
        startDate: incorporationDetails.startDate || new Date(),
        fiscalYearEnd: incorporationDetails.fiscalYearEnd || '12/31',
        naicsCode: incorporationDetails.naicsCode || '999999',
        industryDescription: incorporationDetails.industryDescription || 'General business',
        numberOfEmployees: incorporationDetails.numberOfEmployees || 1,
        projectedRevenue: incorporationDetails.projectedRevenue || 0,
        businessDescription: incorporationDetails.businessDescription || '',
        targetMarkets: incorporationDetails.targetMarkets || [],
        competitiveAdvantages: incorporationDetails.competitiveAdvantages || []
      },
      complianceRequirements: this.generateComplianceRequirements(entityType, state),
      annualRequirements: [this.generateAnnualRequirement(new Date().getFullYear() + 1, state)],
      documents: [],
      registeredAgent: this.getDefaultRegisteredAgent(state),
      officers: [],
      businessLicenses: [],
      taxElections: this.getRecommendedTaxElections(entityType),
      totalCost: costBreakdown.totalCost,
      timeline: {
        totalEstimatedDays: this.calculateTimelineDays(costBreakdown.timeline),
        phases,
        currentPhase: phases[0]?.phase || 'planning',
        percentComplete: 0,
        startDate: new Date(),
        estimatedCompletionDate: this.addBusinessDays(new Date(), this.calculateTimelineDays(costBreakdown.timeline))
      },
      assignedSpecialist: this.assignFormationSpecialist(entityType)
    }

    return businessEntity
  }

  /**
   * Get compliance requirements for entity type and state
   */
  private static generateComplianceRequirements(entityType: BusinessEntity['entityType'], state: string): ComplianceRequirement[] {
    const requirements: ComplianceRequirement[] = []

    // EIN Application (all entities except sole prop)
    if (entityType !== 'SOLE_PROPRIETORSHIP') {
      requirements.push({
        id: 'ein_application',
        type: 'ein_application',
        description: 'Federal Employer Identification Number application with IRS',
        frequency: 'one_time',
        dueDate: this.addBusinessDays(new Date(), 3),
        cost: 0,
        status: 'pending',
        jurisdiction: 'Federal',
        consequences: 'Cannot open business bank accounts or file tax returns',
        autoRenew: false,
        reminderDays: []
      })
    }

    // Annual Report (most states require)
    requirements.push({
      id: 'annual_report',
      type: 'annual_report',
      description: `Annual report filing with ${state} Secretary of State`,
      frequency: 'annual',
      dueDate: new Date(new Date().getFullYear() + 1, 3, 15), // April 15th typically
      cost: this.getAnnualReportFee(state),
      status: 'pending',
      jurisdiction: state,
      consequences: 'Entity may be dissolved or suspended for non-filing',
      autoRenew: true,
      reminderDays: [60, 30, 14, 7, 1]
    })

    // Registered Agent
    if (entityType !== 'SOLE_PROPRIETORSHIP') {
      requirements.push({
        id: 'registered_agent',
        type: 'registered_agent',
        description: `Maintain registered agent in ${state}`,
        frequency: 'annual',
        dueDate: new Date(new Date().getFullYear() + 1, 0, 1),
        cost: 199,
        status: 'pending',
        jurisdiction: state,
        consequences: 'Entity may be suspended or dissolved',
        autoRenew: true,
        reminderDays: [90, 30, 14]
      })
    }

    return requirements
  }

  /**
   * Generate formation timeline phases
   */
  private static generateFormationTimeline(
    entityType: BusinessEntity['entityType'],
    package_: FormationPackage,
    addOnIds: string[]
  ): FormationPhase[] {
    
    const phases: FormationPhase[] = [
      {
        phase: 'planning',
        description: 'Business planning and document preparation',
        estimatedDays: 1,
        status: 'completed',
        startDate: new Date(),
        completionDate: new Date(),
        dependencies: [],
        deliverables: ['Business name reservation', 'Document preparation', 'Filing package assembly']
      },
      {
        phase: 'state_filing',
        description: 'State incorporation filing',
        estimatedDays: entityType === 'C_CORP' ? 7 : 5,
        status: 'not_started',
        dependencies: ['planning'],
        deliverables: ['Articles of incorporation filed', 'Certificate of incorporation received']
      },
      {
        phase: 'federal_filing',
        description: 'Federal tax ID and elections',
        estimatedDays: 2,
        status: 'not_started',
        dependencies: ['state_filing'],
        deliverables: ['EIN obtained', 'Tax elections filed (if applicable)']
      },
      {
        phase: 'governance_setup',
        description: 'Corporate governance and internal documents',
        estimatedDays: 3,
        status: 'not_started',
        dependencies: ['federal_filing'],
        deliverables: ['Operating agreement/bylaws', 'Corporate resolutions', 'Stock certificates']
      }
    ]

    // Add banking setup phase if included
    if (package_.includedServices.some(s => s.includes('banking'))) {
      phases.push({
        phase: 'banking_setup',
        description: 'Business banking account setup',
        estimatedDays: 5,
        status: 'not_started',
        dependencies: ['governance_setup'],
        deliverables: ['Bank account opened', 'Banking documents organized']
      })
    }

    // Add compliance setup phase
    phases.push({
      phase: 'compliance_setup',
      description: 'Compliance system and ongoing requirements setup',
      estimatedDays: 2,
      status: 'not_started',
      dependencies: ['governance_setup'],
      deliverables: ['Compliance calendar created', 'Reminder system activated', 'Client training completed']
    })

    return phases
  }

  /**
   * Helper functions
   */
  private static addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date)
    let addedDays = 0
    while (addedDays < days) {
      result.setDate(result.getDate() + 1)
      if (result.getDay() !== 0 && result.getDay() !== 6) { // Skip weekends
        addedDays++
      }
    }
    return result
  }

  private static calculateTimelineDays(timeline: string): number {
    const match = timeline.match(/(\d+)-(\d+)/)
    return match ? parseInt(match[2]) : 14
  }

  private static getAnnualReportFee(state: string): number {
    const fees: { [key: string]: number } = {
      'CA': 20, 'NY': 50, 'TX': 50, 'FL': 50, 'DE': 300, 'NV': 350
    }
    return fees[state] || 100
  }

  private static getDefaultRegisteredAgent(state: string): RegisteredAgent {
    return {
      type: 'professional_service',
      name: 'Lawson Mobile Tax Registered Agent Services',
      address: {
        street1: '123 Business Center Dr',
        city: 'State Capital',
        state: state,
        zipCode: '12345',
        country: 'USA'
      },
      phone: '(555) 123-4567',
      email: 'registeredagent@lawsonmobiletax.com',
      annualFee: 199,
      serviceLevel: 'premium',
      serviceIncludes: [
        'Document receipt and forwarding',
        'Email and phone notifications',
        'Document scanning and storage',
        'Compliance monitoring',
        '24/7 customer support'
      ],
      autoRenew: true
    }
  }

  private static getRecommendedTaxElections(entityType: BusinessEntity['entityType']): TaxElection[] {
    const elections: TaxElection[] = []

    if (entityType === 'LLC') {
      elections.push({
        id: 'scorp_election',
        electionType: 'S_CORP_ELECTION',
        formNumber: 'Form 2553',
        description: 'S-Corporation tax election for LLC (potential payroll tax savings)',
        deadline: new Date(new Date().getFullYear(), 2, 15), // March 15
        status: 'recommended',
        taxSavings: 3500,
        requirements: [
          'LLC must be domestic',
          'No more than 100 members',
          'All members must be individuals, certain trusts, or estates'
        ],
        consequences: [
          'Owner-employees must receive reasonable salaries',
          'Annual corporate tax return required',
          'Potential self-employment tax savings'
        ]
      })
    }

    return elections
  }

  private static assignFormationSpecialist(entityType: BusinessEntity['entityType']): string {
    const specialists = {
      'LLC': 'Jennifer Martinez, CPA - LLC Formation Specialist',
      'S_CORP': 'Robert Williams, CPA - Corporate Formation Expert',
      'C_CORP': 'Robert Williams, CPA - Corporate Formation Expert',
      'PARTNERSHIP': 'Jennifer Martinez, CPA - Business Partnership Specialist',
      'SOLE_PROPRIETORSHIP': 'Sarah Chen, EA - Small Business Specialist',
      'NONPROFIT': 'Robert Williams, CPA - Nonprofit Formation Expert'
    }
    return specialists[entityType] || 'Jennifer Martinez, CPA'
  }

  private static generateAnnualRequirement(year: number, state: string): AnnualRequirement {
    return {
      year,
      annualReportDue: new Date(year, 3, 15), // April 15
      annualReportFee: this.getAnnualReportFee(state),
      filingStatus: 'not_due'
    }
  }
}

export default BusinessFormationServices
