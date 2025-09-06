
// 2025 Tax Law Updates and Current Tax Information
// Updated for Tax Year 2025 - Filing Season 2026

export interface TaxBracket2025 {
  min: number
  max: number | null
  rate: number
}

export interface TaxLaws2025 {
  standardDeductions: {
    single: number
    marriedFilingJointly: number
    marriedFilingSeparately: number
    headOfHousehold: number
  }
  taxBrackets: {
    single: TaxBracket2025[]
    marriedFilingJointly: TaxBracket2025[]
    marriedFilingSeparately: TaxBracket2025[]
    headOfHousehold: TaxBracket2025[]
  }
  childTaxCredit: {
    amount: number
    refundableAmount: number
    phaseOutStart: {
      single: number
      marriedFilingJointly: number
    }
  }
  retirementLimits: {
    traditional401k: number
    catchUp401k: number
    traditionalIRA: number
    catchUpIRA: number
    rothIRA: number
    sep: number
    simple: number
  }
  mileageRates: {
    business: number
    medical: number
    charitable: number
  }
  importantChanges: string[]
}

export const TAX_LAWS_2025: TaxLaws2025 = {
  standardDeductions: {
    single: 14600,
    marriedFilingJointly: 29200,
    marriedFilingSeparately: 14600,
    headOfHousehold: 21900
  },
  
  taxBrackets: {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: null, rate: 0.37 }
    ],
    marriedFilingJointly: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: null, rate: 0.37 }
    ],
    marriedFilingSeparately: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 375800, rate: 0.35 },
      { min: 375800, max: null, rate: 0.37 }
    ],
    headOfHousehold: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: null, rate: 0.37 }
    ]
  },

  childTaxCredit: {
    amount: 2000,
    refundableAmount: 1700,
    phaseOutStart: {
      single: 200000,
      marriedFilingJointly: 400000
    }
  },

  retirementLimits: {
    traditional401k: 23500,
    catchUp401k: 30500, // Additional $7,000 for 50+
    traditionalIRA: 7000,
    catchUpIRA: 8000, // Additional $1,000 for 50+
    rothIRA: 7000,
    sep: 70000,
    simple: 16500
  },

  mileageRates: {
    business: 0.70, // Increased for 2025
    medical: 0.22,
    charitable: 0.14
  },

  importantChanges: [
    "Standard deductions increased by $750-$1,500 for inflation adjustment",
    "Tax brackets adjusted upward by approximately 5.4% for inflation",
    "Child Tax Credit remains at $2,000 with $1,700 refundable portion",
    "401(k) contribution limit increased to $23,500 (up $500 from 2024)",
    "Traditional and Roth IRA limits increased to $7,000 (up $500 from 2024)",
    "Business mileage rate increased to $0.70 per mile",
    "SALT deduction cap of $10,000 remains in effect",
    "Bonus depreciation phases down to 60% for 2025",
    "Enhanced Child and Dependent Care Credit provisions extended",
    "Small Business Health Care Tax Credit enhanced for qualifying employers"
  ]
}

export class TaxCalculator2025 {
  
  /**
   * Calculate federal income tax using 2025 tax brackets
   */
  static calculateFederalTax(income: number, filingStatus: keyof typeof TAX_LAWS_2025.taxBrackets): number {
    const brackets = TAX_LAWS_2025.taxBrackets[filingStatus]
    let tax = 0
    let remainingIncome = income

    for (const bracket of brackets) {
      const taxableAtThisBracket = bracket.max 
        ? Math.min(remainingIncome, bracket.max - bracket.min)
        : remainingIncome

      if (taxableAtThisBracket > 0) {
        tax += taxableAtThisBracket * bracket.rate
        remainingIncome -= taxableAtThisBracket
      }

      if (remainingIncome <= 0) break
    }

    return Math.round(tax)
  }

  /**
   * Calculate Child Tax Credit for 2025
   */
  static calculateChildTaxCredit(
    numberOfQualifyingChildren: number, 
    adjustedGrossIncome: number, 
    filingStatus: 'single' | 'marriedFilingJointly'
  ): { credit: number, refundableCredit: number } {
    
    const maxCredit = numberOfQualifyingChildren * TAX_LAWS_2025.childTaxCredit.amount
    const phaseOutThreshold = TAX_LAWS_2025.childTaxCredit.phaseOutStart[filingStatus]
    
    let credit = maxCredit
    
    // Phase out calculation
    if (adjustedGrossIncome > phaseOutThreshold) {
      const excessIncome = adjustedGrossIncome - phaseOutThreshold
      const reduction = Math.ceil(excessIncome / 1000) * 50
      credit = Math.max(0, maxCredit - reduction)
    }
    
    const refundableCredit = Math.min(
      credit, 
      numberOfQualifyingChildren * TAX_LAWS_2025.childTaxCredit.refundableAmount
    )
    
    return { credit, refundableCredit }
  }

  /**
   * Calculate business mileage deduction for 2025
   */
  static calculateMileageDeduction(businessMiles: number): number {
    return Math.round(businessMiles * TAX_LAWS_2025.mileageRates.business)
  }

  /**
   * Calculate quarterly estimated tax payments
   */
  static calculateQuarterlyEstimatedTax(
    annualIncome: number,
    filingStatus: keyof typeof TAX_LAWS_2025.taxBrackets,
    selfEmploymentIncome: number = 0
  ): number {
    
    const federalTax = this.calculateFederalTax(annualIncome, filingStatus)
    const selfEmploymentTax = selfEmploymentIncome * 0.153
    const totalAnnualTax = federalTax + selfEmploymentTax
    
    // Safe harbor rule: Pay 100% of prior year tax or 90% of current year
    const quarterlyPayment = Math.ceil(totalAnnualTax * 0.90 / 4)
    
    return quarterlyPayment
  }

  /**
   * Get effective tax rate
   */
  static getEffectiveTaxRate(totalTax: number, totalIncome: number): number {
    return totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0
  }

  /**
   * Get marginal tax rate
   */
  static getMarginalTaxRate(income: number, filingStatus: keyof typeof TAX_LAWS_2025.taxBrackets): number {
    const brackets = TAX_LAWS_2025.taxBrackets[filingStatus]
    
    for (const bracket of brackets) {
      if (!bracket.max || income <= bracket.max) {
        return bracket.rate * 100
      }
    }
    
    return brackets[brackets.length - 1].rate * 100
  }
}

export default TAX_LAWS_2025
