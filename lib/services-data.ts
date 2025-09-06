
// Comprehensive Services Data for LMT - Lawson Mobile Tax

import { 
  Calculator, 
  Building2, 
  Users, 
  FileText, 
  PieChart, 
  Shield, 
  Clock, 
  Smartphone,
  HeartHandshake,
  TrendingUp,
  Briefcase,
  Home,
  Car,
  GraduationCap,
  Baby,
  DollarSign,
  Scale,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react'

export interface TaxService {
  id: string
  name: string
  description: string
  icon: any
  price: {
    starting: number
    average: number
  }
  features: string[]
  idealFor: string[]
  processingTime: string
  guarantees: string[]
  popularityRank: number
  savings: {
    average: number
    range: {
      min: number
      max: number
    }
  }
  includedDocuments: string[]
  addOnOptions?: string[]
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: any
  services: TaxService[]
  color: string
}

export const taxServices: ServiceCategory[] = [
  {
    id: "individual",
    name: "Individual Tax Returns",
    description: "Personal tax preparation for individuals and families",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    services: [
      {
        id: "simple-1040",
        name: "Simple Personal Return",
        description: "Perfect for W-2 employees with straightforward tax situations",
        icon: FileText,
        price: { starting: 199, average: 249 },
        features: [
          "W-2 wage reporting",
          "Standard deduction optimization",
          "Basic tax credits (EITC, Child Tax Credit)",
          "Direct deposit setup",
          "E-filing included",
          "Basic audit support"
        ],
        idealFor: [
          "Single filers with W-2 income",
          "Married couples filing jointly",
          "Students with simple income",
          "Retirees with pension/SS income"
        ],
        processingTime: "24-48 hours",
        guarantees: [
          "Maximum refund guarantee",
          "100% accuracy guarantee",
          "Free amendments if our error"
        ],
        popularityRank: 1,
        savings: { average: 847, range: { min: 200, max: 2400 } },
        includedDocuments: ["W-2", "1099-INT", "1099-DIV", "1098", "Basic receipts"]
      },
      {
        id: "complex-personal",
        name: "Complex Personal Return",
        description: "Comprehensive service for complex individual tax situations",
        icon: Calculator,
        price: { starting: 349, average: 449 },
        features: [
          "Multiple income sources",
          "Itemized deduction analysis",
          "Investment gains/losses optimization",
          "Rental property income/expenses",
          "Self-employment income",
          "Advanced tax planning",
          "Quarterly estimated tax setup",
          "State tax optimization"
        ],
        idealFor: [
          "Self-employed professionals",
          "Property owners/landlords",
          "Investors with multiple accounts",
          "Multi-state residents"
        ],
        processingTime: "3-5 business days",
        guarantees: [
          "Maximum refund guarantee",
          "100% accuracy guarantee", 
          "Free audit defense included"
        ],
        popularityRank: 2,
        savings: { average: 2847, range: { min: 800, max: 8500 } },
        includedDocuments: [
          "All W-2s and 1099s",
          "Schedule K-1s",
          "Rental property documents",
          "Investment statements",
          "Business expense receipts",
          "Medical expenses",
          "Charitable contributions"
        ],
        addOnOptions: [
          "Prior year amendments ($199)",
          "Multi-state filing ($149/state)",
          "IRA conversion analysis ($299)"
        ]
      },
      {
        id: "premium-executive",
        name: "Executive & High-Income",
        description: "Premium service for high-income individuals and executives",
        icon: TrendingUp,
        price: { starting: 599, average: 899 },
        features: [
          "Stock option tax optimization",
          "Executive compensation planning",
          "Alternative Minimum Tax (AMT) planning",
          "Trust and estate considerations",
          "International tax compliance",
          "Advanced retirement planning",
          "Tax loss harvesting strategies",
          "Year-round tax planning"
        ],
        idealFor: [
          "Corporate executives",
          "High-income professionals",
          "Stock option holders",
          "International earners"
        ],
        processingTime: "5-7 business days",
        guarantees: [
          "Maximum refund guarantee",
          "Comprehensive audit defense",
          "Quarterly tax planning included"
        ],
        popularityRank: 4,
        savings: { average: 5247, range: { min: 2000, max: 25000 } },
        includedDocuments: [
          "All income documents",
          "Stock option records",
          "International forms",
          "Trust documents",
          "Executive compensation details"
        ],
        addOnOptions: [
          "Estate planning consultation ($499)",
          "International tax compliance ($699)",
          "Tax attorney consultation ($399)"
        ]
      }
    ]
  },
  {
    id: "business",
    name: "Business Tax Services",
    description: "Complete tax solutions for businesses of all sizes",
    icon: Building2,
    color: "from-green-500 to-emerald-500",
    services: [
      {
        id: "small-business",
        name: "Small Business Tax Return",
        description: "Comprehensive tax preparation for small businesses and LLCs",
        icon: Briefcase,
        price: { starting: 449, average: 649 },
        features: [
          "Business income optimization",
          "Expense categorization and maximization",
          "Equipment depreciation strategies",
          "Home office deduction analysis",
          "Business vehicle optimization",
          "Inventory management",
          "Quarterly estimated tax setup",
          "Business entity optimization advice"
        ],
        idealFor: [
          "LLC owners",
          "Sole proprietors",
          "Small corporations",
          "Professional services"
        ],
        processingTime: "5-7 business days",
        guarantees: [
          "Maximum deduction guarantee",
          "Business audit defense",
          "Year-round support included"
        ],
        popularityRank: 3,
        savings: { average: 3847, range: { min: 1200, max: 15000 } },
        includedDocuments: [
          "Profit & Loss statements",
          "Business expense receipts",
          "Equipment purchase records",
          "Vehicle mileage logs",
          "Bank statements",
          "1099s received/issued"
        ]
      },
      {
        id: "corporate-tax",
        name: "Corporate Tax Returns",
        description: "Full-service corporate tax preparation and planning",
        icon: Building2,
        price: { starting: 899, average: 1299 },
        features: [
          "Corporate income tax optimization",
          "Multi-state tax compliance",
          "Payroll tax management",
          "Business structure analysis",
          "Tax credit identification",
          "Advanced depreciation strategies",
          "International business compliance",
          "Merger & acquisition tax planning"
        ],
        idealFor: [
          "C-Corporations",
          "S-Corporations", 
          "Multi-state businesses",
          "Growing companies"
        ],
        processingTime: "7-10 business days",
        guarantees: [
          "Comprehensive tax optimization",
          "Full audit defense",
          "Quarterly business reviews"
        ],
        popularityRank: 6,
        savings: { average: 8247, range: { min: 3000, max: 50000 } },
        includedDocuments: [
          "Corporate financial statements",
          "Payroll records",
          "Multi-state documentation",
          "International compliance forms",
          "Business contracts and agreements"
        ]
      },
      {
        id: "business-formation",
        name: "Business Formation & Setup",
        description: "Complete business entity formation with tax optimization",
        icon: Building2,
        price: { starting: 499, average: 899 },
        features: [
          "Entity structure consultation",
          "LLC/Corporation formation",
          "Tax election optimization",
          "EIN application processing",
          "Operating agreement drafting",
          "Initial compliance setup",
          "Bank account establishment guidance",
          "Ongoing tax planning included"
        ],
        idealFor: [
          "New entrepreneurs",
          "Solo professionals",
          "Growing partnerships",
          "Tax optimization seekers"
        ],
        processingTime: "5-10 business days",
        guarantees: [
          "Proper legal formation",
          "Tax-optimized structure",
          "Complete compliance setup"
        ],
        popularityRank: 8,
        savings: { average: 2847, range: { min: 1000, max: 15000 } },
        includedDocuments: ["Formation documents", "Operating agreements", "Tax elections"]
      }
    ]
  },
  {
    id: "specialized",
    name: "Specialized Services",
    description: "Expert services for unique tax situations",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    services: [
      {
        id: "audit-defense",
        name: "IRS Audit Defense & Resolution",
        description: "Complete protection and representation for IRS audits",
        icon: Scale,
        price: { starting: 599, average: 1299 },
        features: [
          "Professional IRS representation",
          "Document preparation and organization",
          "Audit strategy development",
          "Negotiation with IRS agents",
          "Settlement and payment plan setup",
          "Appeals process management",
          "Penalty abatement requests",
          "Future compliance planning"
        ],
        idealFor: [
          "Audit notice recipients",
          "High-risk tax situations",
          "Business owners",
          "Complex financial situations"
        ],
        processingTime: "Immediate response",
        guarantees: [
          "Professional representation guarantee",
          "Best possible outcome assurance",
          "Complete confidentiality"
        ],
        popularityRank: 8,
        savings: { average: 12547, range: { min: 2000, max: 100000 } },
        includedDocuments: ["All audit-related documentation", "IRS correspondence", "Supporting records"]
      },
      {
        id: "tax-planning",
        name: "Year-Round Tax Planning",
        description: "Strategic tax planning to minimize future tax liability",
        icon: PieChart,
        price: { starting: 299, average: 499 },
        features: [
          "Quarterly tax projections",
          "Strategic income timing",
          "Deduction optimization planning",
          "Retirement contribution strategies",
          "Tax-efficient investment advice",
          "Business structure optimization",
          "Estate tax planning",
          "Multi-year tax strategies"
        ],
        idealFor: [
          "High-income earners",
          "Business owners",
          "Investors",
          "Retirement planners"
        ],
        processingTime: "Ongoing consultation",
        guarantees: [
          "Measurable tax savings",
          "Quarterly strategy updates",
          "Proactive planning approach"
        ],
        popularityRank: 7,
        savings: { average: 4247, range: { min: 1500, max: 20000 } },
        includedDocuments: ["Financial statements", "Investment portfolios", "Business projections"]
      }
    ]
  },
  {
    id: "amendments",
    name: "Tax Amendments & Corrections",
    description: "Fix past returns and claim missed deductions",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
    services: [
      {
        id: "amended-returns",
        name: "Amended Tax Returns",
        description: "Correct errors and claim missed deductions from prior years",
        icon: FileText,
        price: { starting: 249, average: 399 },
        features: [
          "Prior year return analysis",
          "Error identification and correction",
          "Missed deduction recovery",
          "Form 1040X preparation",
          "IRS correspondence handling",
          "Refund maximization",
          "Interest calculation",
          "State amendment coordination"
        ],
        idealFor: [
          "Missed deduction situations",
          "Filing error corrections",
          "Life change updates",
          "Professional review needs"
        ],
        processingTime: "3-5 business days",
        guarantees: [
          "Maximum recovery guarantee",
          "Error-free amendments",
          "Full IRS correspondence support"
        ],
        popularityRank: 5,
        savings: { average: 1847, range: { min: 500, max: 8500 } },
        includedDocuments: ["Original returns", "New documentation", "Supporting receipts"]
      },
      {
        id: "tax-consultation",
        name: "Professional Tax Consultation",
        description: "Expert advice and strategic tax planning sessions",
        icon: Users,
        price: { starting: 149, average: 249 },
        features: [
          "One-on-one expert consultation",
          "Customized tax strategy development",
          "Deduction optimization review",
          "Year-round planning guidance",
          "Business structure advice",
          "Investment tax strategies",
          "Retirement planning coordination",
          "Follow-up session included"
        ],
        idealFor: [
          "New business owners",
          "Complex tax situations",
          "Strategic planning needs",
          "Compliance questions"
        ],
        processingTime: "Same-day scheduling",
        guarantees: [
          "Expert certified professionals",
          "Confidential consultation",
          "Actionable tax strategies"
        ],
        popularityRank: 6,
        savings: { average: 1247, range: { min: 300, max: 5000 } },
        includedDocuments: ["Consultation notes", "Strategy recommendations", "Action plan"]
      }
    ]
  }
]

export const quickServices = [
  {
    name: "Individual Tax Returns",
    description: "Personal tax prep for individuals and families",
    icon: Users,
    startingPrice: 199,
    link: "/services/individual"
  },
  {
    name: "Business Tax Services", 
    description: "Complete solutions for businesses of all sizes",
    icon: Building2,
    startingPrice: 449,
    link: "/services/business"
  },
  {
    name: "Tax Planning & Strategy",
    description: "Year-round planning to minimize tax liability", 
    icon: PieChart,
    startingPrice: 299,
    link: "/services/planning"
  },
  {
    name: "IRS Audit Defense",
    description: "Professional representation and resolution",
    icon: Shield,
    startingPrice: 599,
    link: "/services/audit-defense"
  },
  {
    name: "Amended Returns",
    description: "Fix errors and claim missed deductions",
    icon: AlertTriangle,
    startingPrice: 249,
    link: "/services/amendments"
  },
  {
    name: "Real Estate Taxes",
    description: "Specialized service for property investors",
    icon: Home,
    startingPrice: 349,
    link: "/services/real-estate"
  }
]

export const serviceStats = {
  totalClientsServed: 27500,
  averageSavings: 3247,
  totalRefundsSecured: 89000000,
  satisfactionRate: 99.2,
  averageRefundTime: "8 days",
  auditWinRate: 94
}
