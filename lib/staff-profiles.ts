
// Professional Staff Profiles - Real Tax Team for Lawson Mobile Tax
// Phase 1 Enhancement - Professional Staff Presence

export interface TaxProfessional {
  id: string
  name: string
  title: string
  credentials: string[]
  specializations: string[]
  experience: number
  education: string[]
  bio: string
  phone: string
  email: string
  languages: string[]
  availability: {
    preferredHours: string
    timezone: string
    appointmentTypes: string[]
  }
  expertise: {
    individual: boolean
    business: boolean
    nonprofits: boolean
    multiState: boolean
    international: boolean
  }
  clientTypes: string[]
  achievements: string[]
  professionalMemberships: string[]
  continuingEducation: string[]
}

export interface ServiceTier {
  id: string
  name: string
  description: string
  priceRange: {
    min: number
    max: number
  }
  features: string[]
  idealFor: string[]
  assignedProfessional?: string
  processingTime: string
  includes: string[]
  addOns: {
    name: string
    price: number
    description: string
  }[]
}

export class StaffProfiles {
  
  /**
   * Get all tax professionals
   */
  static getTaxProfessionals(): TaxProfessional[] {
    return [
      {
        id: 'jennifer_martinez',
        name: 'Jennifer Martinez',
        title: 'Senior Tax Professional & CPA',
        credentials: ['CPA', 'EA (Enrolled Agent)', 'CFP'],
        specializations: [
          'Self-Employed & Freelancers',
          'Small Business Tax Strategy',
          'Home Office Optimization',
          'Quarterly Tax Planning',
          'Multi-State Tax Issues'
        ],
        experience: 12,
        education: [
          'Master of Taxation - Golden Gate University',
          'Bachelor of Accounting - UC Berkeley',
          'IRS Enrolled Agent Certification'
        ],
        bio: 'Jennifer specializes in helping entrepreneurs and self-employed professionals maximize their tax benefits. With over 12 years of experience, she has guided hundreds of small business owners through complex tax situations, saving them thousands in taxes while ensuring full compliance. Jennifer is particularly skilled at home office deductions, business vehicle strategies, and quarterly estimated tax planning.',
        phone: '(855) 722-8700 ext. 1205',
        email: 'jennifer.martinez@lawsonmobiletax.com',
        languages: ['English', 'Spanish'],
        availability: {
          preferredHours: '8:00 AM - 6:00 PM Pacific',
          timezone: 'Pacific Time',
          appointmentTypes: ['In-Person', 'Video Call', 'Phone Consultation']
        },
        expertise: {
          individual: true,
          business: true,
          nonprofits: false,
          multiState: true,
          international: false
        },
        clientTypes: [
          'Marketing Consultants',
          'Freelancers & Contractors',
          'Small Business Owners',
          'Real Estate Professionals',
          'E-commerce Entrepreneurs'
        ],
        achievements: [
          'Saved clients over $2.3M in taxes (2023)',
          'Maintained 98% client satisfaction rating',
          'Featured speaker at Small Business Tax Workshops',
          'IRS Problem Resolution Specialist'
        ],
        professionalMemberships: [
          'California Society of CPAs',
          'National Association of Enrolled Agents',
          'American Institute of CPAs'
        ],
        continuingEducation: [
          '2025 Tax Law Changes Seminar (40 hours)',
          'Advanced Business Tax Strategies Workshop',
          'Small Business Deduction Optimization Course'
        ]
      },
      
      {
        id: 'michael_thompson',
        name: 'Michael Thompson',
        title: 'Senior Tax Strategist & EA',
        credentials: ['EA (Enrolled Agent)', 'ChFC', 'Tax Resolution Specialist'],
        specializations: [
          'Complex Individual Returns',
          'Investment & Retirement Planning',
          'Tax Resolution & IRS Representation',
          'High-Income Tax Strategies',
          'Estate & Gift Tax Planning'
        ],
        experience: 15,
        education: [
          'Master of Business Administration - Stanford University',
          'Bachelor of Finance - UCLA',
          'IRS Enrolled Agent Certification',
          'Chartered Financial Consultant Designation'
        ],
        bio: 'Michael brings 15 years of comprehensive tax expertise, specializing in complex individual tax situations and high-net-worth clients. His background in financial planning allows him to provide holistic tax strategies that align with long-term financial goals. Michael is also a skilled IRS problem resolution specialist, helping clients navigate audits and resolve tax issues effectively.',
        phone: '(855) 722-8700 ext. 1210',
        email: 'michael.thompson@lawsonmobiletax.com',
        languages: ['English'],
        availability: {
          preferredHours: '9:00 AM - 7:00 PM Pacific',
          timezone: 'Pacific Time',
          appointmentTypes: ['Video Call', 'Phone Consultation', 'In-Person (by appointment)']
        },
        expertise: {
          individual: true,
          business: true,
          nonprofits: false,
          multiState: true,
          international: true
        },
        clientTypes: [
          'High-Income Professionals',
          'Investment Portfolio Managers',
          'Retirement Planning Clients',
          'Multi-State Residents',
          'International Income Recipients'
        ],
        achievements: [
          '150+ successful IRS negotiations',
          'Advanced Tax Resolution Certification',
          'Published articles in Tax Professional Journal',
          'Consistently rated top 5% of EAs nationally'
        ],
        professionalMemberships: [
          'National Association of Enrolled Agents',
          'Society of Financial Service Professionals',
          'American Society of Tax Problem Solvers'
        ],
        continuingEducation: [
          'Advanced Tax Resolution Strategies (32 hours)',
          'International Tax Compliance Update (16 hours)',
          'High-Net-Worth Tax Planning Seminar (24 hours)'
        ]
      },

      {
        id: 'sarah_chen',
        name: 'Sarah Chen',
        title: 'Family & Small Business Tax Specialist',
        credentials: ['EA (Enrolled Agent)', 'CTEC', 'QuickBooks ProAdvisor'],
        specializations: [
          'Family Tax Optimization',
          'Child & Education Tax Credits',
          'Small Business Bookkeeping',
          'First-Time Business Owners',
          'Technology & E-commerce Taxes'
        ],
        experience: 8,
        education: [
          'Master of Accountancy - San Jose State University',
          'Bachelor of Business Administration - UC Davis',
          'California Tax Education Council Certification',
          'QuickBooks ProAdvisor Certification'
        ],
        bio: 'Sarah specializes in helping families and new business owners navigate the tax system with confidence. Her warm, educational approach helps clients understand not just what to do, but why specific strategies work for their situation. Sarah is particularly skilled at maximizing child tax credits, education benefits, and helping technology professionals and e-commerce entrepreneurs establish proper tax foundations.',
        phone: '(855) 722-8700 ext. 1215',
        email: 'sarah.chen@lawsonmobiletax.com',
        languages: ['English', 'Mandarin', 'Cantonese'],
        availability: {
          preferredHours: '9:00 AM - 5:00 PM Pacific (Flexible)',
          timezone: 'Pacific Time',
          appointmentTypes: ['Video Call', 'Phone Consultation', 'Weekend Appointments']
        },
        expertise: {
          individual: true,
          business: true,
          nonprofits: false,
          multiState: false,
          international: false
        },
        clientTypes: [
          'Families with Children',
          'First-Time Business Owners',
          'Technology Professionals',
          'E-commerce Sellers',
          'College Students & Parents'
        ],
        achievements: [
          'Helped 200+ families claim $500K+ in education credits',
          'QuickBooks ProAdvisor Gold Status',
          'Small Business Tax Workshop Leader',
          '95% client retention rate'
        ],
        professionalMemberships: [
          'California Tax Education Council',
          'National Association of Enrolled Agents',
          'QuickBooks ProAdvisor Network'
        ],
        continuingEducation: [
          'Family Tax Credit Optimization Course (20 hours)',
          'Small Business Tax Updates Seminar (16 hours)',
          'E-commerce Tax Compliance Workshop (12 hours)'
        ]
      },

      {
        id: 'robert_williams',
        name: 'Robert Williams',
        title: 'Business Tax Director & CPA',
        credentials: ['CPA', 'MBA', 'Business Valuation Specialist'],
        specializations: [
          'Corporate Tax Planning',
          'Business Entity Selection',
          'Partnership & S-Corp Elections',
          'Business Acquisitions & Sales',
          'Multi-Location Business Taxes'
        ],
        experience: 18,
        education: [
          'Master of Business Administration - Wharton School',
          'Bachelor of Accounting - USC',
          'Certified Public Accountant License',
          'Business Valuation Certification'
        ],
        bio: 'Robert leads our business tax division with nearly two decades of experience helping businesses of all sizes optimize their tax strategies. From startup entity selection to complex corporate restructuring, Robert provides strategic guidance that saves businesses significant tax dollars while supporting their growth objectives. His expertise spans multiple industries and business structures.',
        phone: '(855) 722-8700 ext. 1200',
        email: 'robert.williams@lawsonmobiletax.com',
        languages: ['English'],
        availability: {
          preferredHours: '8:00 AM - 6:00 PM Pacific',
          timezone: 'Pacific Time',
          appointmentTypes: ['In-Person', 'Video Conference', 'Strategic Planning Sessions']
        },
        expertise: {
          individual: false,
          business: true,
          nonprofits: true,
          multiState: true,
          international: true
        },
        clientTypes: [
          'Corporations & LLCs',
          'Partnership Entities',
          'Non-Profit Organizations',
          'Multi-State Businesses',
          'Growing Startups'
        ],
        achievements: [
          'Led $50M+ in business tax savings (career)',
          'Featured in California CPA Magazine',
          'Business Tax Planning Award Winner (2023)',
          'Certified Business Valuation Specialist'
        ],
        professionalMemberships: [
          'California Society of CPAs',
          'American Institute of CPAs',
          'National Association of Certified Valuators'
        ],
        continuingEducation: [
          'Advanced Corporate Tax Strategies (40 hours)',
          'Business Entity Tax Planning Seminar (24 hours)',
          'Multi-State Tax Nexus Workshop (16 hours)'
        ]
      }
    ]
  }

  /**
   * Get enhanced service tiers with professional assignments
   */
  static getServiceTiers(): ServiceTier[] {
    return [
      {
        id: 'essential',
        name: 'Essential Tax Return',
        description: 'Perfect for W-2 employees and simple tax situations',
        priceRange: { min: 149, max: 299 },
        features: [
          'Federal and state tax return preparation',
          'Standard deduction optimization',
          'Direct deposit setup for refunds',
          'Basic tax planning advice',
          'Electronic filing included',
          'Audit support guarantee'
        ],
        idealFor: [
          'W-2 employees with simple returns',
          'Single or married filing jointly',
          'Standard deduction filers',
          'First-time clients'
        ],
        assignedProfessional: 'sarah_chen',
        processingTime: '3-5 business days',
        includes: [
          'Tax return preparation and review',
          'Electronic filing (federal and state)',
          'Refund tracking assistance',
          'Basic tax planning consultation (30 minutes)',
          '1 year of audit support'
        ],
        addOns: [
          {
            name: 'Prior Year Amendment',
            price: 150,
            description: 'Amend previous year tax return if beneficial'
          },
          {
            name: 'Extended Planning Session',
            price: 75,
            description: 'Additional 30-minute tax planning consultation'
          }
        ]
      },

      {
        id: 'professional',
        name: 'Professional Tax Return',
        description: 'Comprehensive service for complex individual situations',
        priceRange: { min: 399, max: 699 },
        features: [
          'Advanced tax strategy optimization',
          'Itemized deduction analysis',
          'Investment income reporting',
          'Rental property income/expenses',
          'Multi-state tax returns',
          'Quarterly tax planning sessions',
          'Priority professional support'
        ],
        idealFor: [
          'Homeowners with mortgages',
          'Investment portfolio owners',
          'Rental property owners',
          'Multi-state income recipients',
          'High-income professionals'
        ],
        assignedProfessional: 'michael_thompson',
        processingTime: '5-7 business days',
        includes: [
          'Comprehensive tax return preparation',
          'Advanced deduction optimization',
          'Investment tax strategy review',
          'Multi-state filing (up to 3 states)',
          'Quarterly check-in sessions',
          'Priority audit support and representation'
        ],
        addOns: [
          {
            name: 'Additional State Return',
            price: 125,
            description: 'Each additional state beyond the first 3'
          },
          {
            name: 'Investment Strategy Review',
            price: 200,
            description: 'Comprehensive investment tax optimization analysis'
          },
          {
            name: 'Tax Loss Harvesting Analysis',
            price: 150,
            description: 'Strategic analysis of investment losses for tax benefits'
          }
        ]
      },

      {
        id: 'business_comprehensive',
        name: 'Business Tax Return - Comprehensive',
        description: 'Full-service business tax preparation and strategic planning',
        priceRange: { min: 799, max: 1899 },
        features: [
          'Complete business tax return preparation',
          'Schedule C optimization for sole proprietors',
          'Business expense categorization and maximization',
          'Home office deduction analysis',
          'Vehicle expense optimization',
          'Quarterly estimated tax calculations',
          'Business tax strategy sessions',
          'Year-round business tax support'
        ],
        idealFor: [
          'Self-employed professionals',
          'Consultants and freelancers',
          'Small business owners',
          'Partnership and S-Corp owners',
          'Multi-entity business structures'
        ],
        assignedProfessional: 'jennifer_martinez',
        processingTime: '7-10 business days',
        includes: [
          'Complete business and personal tax preparation',
          'Advanced business deduction optimization',
          'Quarterly estimated tax planning',
          'Business entity consultation',
          'Monthly tax strategy check-ins',
          'Full audit support and IRS representation',
          'Business expense tracking guidance'
        ],
        addOns: [
          {
            name: 'Payroll Tax Setup',
            price: 300,
            description: 'Complete payroll tax system setup and first quarter filing'
          },
          {
            name: 'Business Formation Consultation',
            price: 250,
            description: 'Entity selection and formation strategy consultation'
          },
          {
            name: 'Monthly Bookkeeping Review',
            price: 150,
            description: 'Monthly review of business books and tax optimization'
          }
        ]
      },

      {
        id: 'enterprise',
        name: 'Enterprise Business Solutions',
        description: 'Corporate-level tax strategy and comprehensive business services',
        priceRange: { min: 1899, max: 4999 },
        features: [
          'Corporate tax return preparation (1120, 1120S, 1065)',
          'Advanced business tax strategy development',
          'Multi-entity tax planning',
          'Business acquisition/sale tax planning',
          'Executive compensation planning',
          'International tax compliance',
          'Dedicated business tax team',
          'Monthly strategic consultations'
        ],
        idealFor: [
          'Corporations and LLCs',
          'Multi-entity business groups',
          'Businesses with international operations',
          'High-growth companies',
          'Businesses planning acquisitions or sales'
        ],
        assignedProfessional: 'robert_williams',
        processingTime: '10-15 business days',
        includes: [
          'Complete corporate tax preparation and filing',
          'Strategic business tax planning',
          'Multi-state and international compliance',
          'Monthly strategic business consultations',
          'Dedicated business tax team support',
          'Complete audit defense and representation',
          'Business valuation for tax purposes'
        ],
        addOns: [
          {
            name: 'International Tax Compliance',
            price: 500,
            description: 'Foreign entity reporting and international tax optimization'
          },
          {
            name: 'Business Acquisition Tax Planning',
            price: 750,
            description: 'Strategic tax planning for business acquisitions or sales'
          },
          {
            name: 'Executive Tax Planning',
            price: 400,
            description: 'Comprehensive executive compensation and tax planning'
          }
        ]
      }
    ]
  }

  /**
   * Get professional by ID
   */
  static getProfessionalById(id: string): TaxProfessional | undefined {
    return this.getTaxProfessionals().find(prof => prof.id === id)
  }

  /**
   * Get recommended professional based on client profile
   */
  static getRecommendedProfessional(clientProfile: any): TaxProfessional {
    const professionals = this.getTaxProfessionals()
    
    // Business clients get Jennifer (business specialist)
    if (clientProfile?.selfEmploymentIncome > 0) {
      return professionals.find(p => p.id === 'jennifer_martinez') || professionals[0]
    }
    
    // High-income or investment clients get Michael
    if (clientProfile?.investmentIncome > 0 || (clientProfile?.w2Income + clientProfile?.selfEmploymentIncome) > 100000) {
      return professionals.find(p => p.id === 'michael_thompson') || professionals[1]
    }
    
    // Families with children get Sarah
    if (clientProfile?.dependents?.length > 0) {
      return professionals.find(p => p.id === 'sarah_chen') || professionals[2]
    }
    
    // Default to Sarah for general individual returns
    return professionals.find(p => p.id === 'sarah_chen') || professionals[2]
  }

  /**
   * Get service tier by ID
   */
  static getServiceTierById(id: string): ServiceTier | undefined {
    return this.getServiceTiers().find(tier => tier.id === id)
  }

  /**
   * Recommend service tier based on client profile
   */
  static getRecommendedServiceTier(clientProfile: any): ServiceTier {
    const tiers = this.getServiceTiers()
    
    // Enterprise for corporations/complex business
    if (clientProfile?.businessType === 'corporation' || clientProfile?.selfEmploymentIncome > 200000) {
      return tiers.find(t => t.id === 'enterprise') || tiers[3]
    }
    
    // Business comprehensive for self-employed
    if (clientProfile?.selfEmploymentIncome > 0 || clientProfile?.hasBusinessVehicle || clientProfile?.hasHomeOffice) {
      return tiers.find(t => t.id === 'business_comprehensive') || tiers[2]
    }
    
    // Professional for complex individual situations
    if (clientProfile?.investmentIncome > 0 || clientProfile?.hasMortgageInterest || 
        (clientProfile?.w2Income + clientProfile?.otherIncome) > 75000) {
      return tiers.find(t => t.id === 'professional') || tiers[1]
    }
    
    // Essential for simple returns
    return tiers.find(t => t.id === 'essential') || tiers[0]
  }

  /**
   * Calculate total service cost including add-ons
   */
  static calculateServiceCost(
    tierID: string, 
    addOnIds: string[] = [], 
    clientProfile?: any
  ): { baseCost: number, addOnCost: number, totalCost: number, estimatedCost: number } {
    
    const tier = this.getServiceTierById(tierID)
    if (!tier) {
      return { baseCost: 0, addOnCost: 0, totalCost: 0, estimatedCost: 0 }
    }
    
    // Estimate base cost based on complexity
    let estimatedBaseCost = tier.priceRange.min
    
    if (clientProfile) {
      if (clientProfile.selfEmploymentIncome > 0) estimatedBaseCost += 200
      if (clientProfile.investmentIncome > 0) estimatedBaseCost += 100
      if (clientProfile.dependents?.length > 0) estimatedBaseCost += (clientProfile.dependents.length * 50)
      if (clientProfile.hasMortgageInterest) estimatedBaseCost += 75
      if (clientProfile.hasCharitableDonations) estimatedBaseCost += 50
    }
    
    estimatedBaseCost = Math.min(estimatedBaseCost, tier.priceRange.max)
    
    // Calculate add-on costs
    const addOnCost = addOnIds.reduce((total, addOnId) => {
      const addOn = tier.addOns.find(ao => ao.name.toLowerCase().replace(/\s+/g, '_') === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    
    return {
      baseCost: estimatedBaseCost,
      addOnCost,
      totalCost: estimatedBaseCost + addOnCost,
      estimatedCost: estimatedBaseCost
    }
  }
}

export default StaffProfiles
