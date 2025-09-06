
// Payroll & HR Services - Phase 3 Enterprise Domination
// Comprehensive payroll processing and human resources management

export interface PayrollService {
  id: string
  clientId: string
  companyName: string
  ein: string
  payrollSchedule: PayrollSchedule
  employees: Employee[]
  payPeriods: PayPeriod[]
  taxSetup: PayrollTaxSetup
  benefitsPackage?: BenefitsPackage
  hrCompliance: HRComplianceStatus
  serviceLevel: 'basic' | 'professional' | 'enterprise'
  monthlyFee: number
  perEmployeeFee: number
  totalMonthlyCost: number
  startDate: Date
  status: 'setup' | 'active' | 'suspended' | 'terminated'
  assignedSpecialist: string
  features: PayrollFeature[]
  integrations: PayrollIntegration[]
}

export interface PayrollSchedule {
  frequency: 'weekly' | 'biweekly' | 'semi_monthly' | 'monthly'
  payDays: string[] // Day names like 'Friday'
  firstPayDate: Date
  nextPayDate: Date
  payPeriodsPerYear: number
  autoProcessing: boolean
  cutoffDays: number // Days before payday for time entry cutoff
  approvalRequired: boolean
  approverIds: string[]
}

export interface Employee {
  id: string
  personalInfo: EmployeePersonalInfo
  employmentInfo: EmploymentInfo
  compensation: CompensationStructure
  benefits: EmployeeBenefits
  taxInfo: EmployeeTaxInfo
  timeTracking: TimeTrackingSettings
  status: 'active' | 'inactive' | 'terminated' | 'leave'
  hireDate: Date
  terminationDate?: Date
  terminationReason?: string
  documents: EmployeeDocument[]
  performanceReviews: PerformanceReview[]
  disciplinaryActions: DisciplinaryAction[]
  trainingRecords: TrainingRecord[]
}

export interface EmployeePersonalInfo {
  employeeId: string
  firstName: string
  lastName: string
  middleName?: string
  preferredName?: string
  dateOfBirth: Date
  ssn: string
  address: Address
  phone: string
  personalEmail: string
  workEmail?: string
  emergencyContacts: EmergencyContact[]
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed'
  dependents: Dependent[]
}

export interface EmploymentInfo {
  jobTitle: string
  department: string
  reportsTo?: string
  employeeType: 'full_time' | 'part_time' | 'contractor' | 'intern' | 'seasonal'
  employmentStatus: 'exempt' | 'non_exempt'
  workLocation: string
  workSchedule: WorkSchedule
  probationPeriod?: number // days
  probationEndDate?: Date
  eligibilityDates: EligibilityDates
}

export interface WorkSchedule {
  standardHours: number // per week
  workDays: string[] // Days of week
  startTime: string
  endTime: string
  lunchBreak: number // minutes
  overtimeEligible: boolean
  remoteWorkAllowed: boolean
}

export interface EligibilityDates {
  benefitsEligible: Date
  vacationAccrual: Date
  sickLeaveAccrual: Date
  retirementPlanEligible?: Date
}

export interface CompensationStructure {
  payType: 'hourly' | 'salary' | 'commission' | 'piece_rate'
  basePay: number
  overtimeRate?: number
  commissionRate?: number
  bonusStructure?: BonusStructure
  payIncreaseHistory: PayIncrease[]
  effectiveDate: Date
}

export interface BonusStructure {
  type: 'performance' | 'quarterly' | 'annual' | 'project' | 'retention'
  amount?: number
  percentage?: number
  criteria: string
  payoutSchedule: 'immediate' | 'quarterly' | 'annual'
}

export interface PayIncrease {
  effectiveDate: Date
  previousPay: number
  newPay: number
  increaseAmount: number
  increasePercentage: number
  reason: string
  reviewDate: Date
  approvedBy: string
}

export interface EmployeeBenefits {
  healthInsurance?: HealthInsurance
  dentalInsurance?: DentalInsurance
  visionInsurance?: VisionInsurance
  retirement401k?: Retirement401k
  lifeInsurance?: LifeInsurance
  disabilityInsurance?: DisabilityInsurance
  flexSpending?: FlexSpendingAccount
  paidTimeOff: PaidTimeOff
  additionalBenefits: AdditionalBenefit[]
}

export interface HealthInsurance {
  planId: string
  planName: string
  coverage: 'employee' | 'employee_spouse' | 'employee_children' | 'family'
  employeePremium: number
  employerContribution: number
  deductible: number
  startDate: Date
  carrierId: string
  policyNumber: string
}

export interface DentalInsurance {
  planId: string
  planName: string
  coverage: 'employee' | 'employee_spouse' | 'employee_children' | 'family'
  employeePremium: number
  employerContribution: number
  startDate: Date
}

export interface VisionInsurance {
  planId: string
  planName: string
  coverage: 'employee' | 'employee_spouse' | 'employee_children' | 'family'
  employeePremium: number
  employerContribution: number
  startDate: Date
}

export interface Retirement401k {
  planId: string
  planName: string
  employeeContribution: number
  employeeContributionType: 'percentage' | 'fixed'
  employerMatch: number
  employerMatchType: 'percentage' | 'fixed'
  vestingSchedule: VestingSchedule
  eligibilityDate: Date
  currentBalance?: number
}

export interface VestingSchedule {
  type: 'immediate' | 'graded' | 'cliff'
  schedule: VestingLevel[]
}

export interface VestingLevel {
  years: number
  percentage: number
}

export interface LifeInsurance {
  coverage: number
  beneficiaries: Beneficiary[]
  employeePremium: number
  employerContribution: number
}

export interface DisabilityInsurance {
  type: 'short_term' | 'long_term' | 'both'
  coverage: number
  benefitPeriod: string
  eliminationPeriod: number // days
  employeePremium: number
  employerContribution: number
}

export interface FlexSpendingAccount {
  type: 'healthcare' | 'dependent_care' | 'both'
  annualContribution: number
  currentBalance: number
  planYearStart: Date
  planYearEnd: Date
}

export interface PaidTimeOff {
  vacationDays: number
  vacationAccrued: number
  vacationUsed: number
  sickDays: number
  sickAccrued: number
  sickUsed: number
  personalDays: number
  personalUsed: number
  holidaySchedule: Holiday[]
  accrualRate: AccrualRate
  carryoverPolicy: string
}

export interface Holiday {
  name: string
  date: Date
  isPaid: boolean
  isFloating: boolean
}

export interface AccrualRate {
  vacationHoursPerPayPeriod: number
  sickHoursPerPayPeriod: number
  maxVacationAccrual: number
  maxSickAccrual: number
}

export interface AdditionalBenefit {
  name: string
  description: string
  value: number
  isOptional: boolean
  employeeCost: number
}

export interface EmployeeTaxInfo {
  federalWithholding: FederalWithholding
  stateWithholding: StateWithholding[]
  localWithholding?: LocalWithholding
  socialSecurityExempt: boolean
  medicareExempt: boolean
  fuiExempt: boolean
  suiExempt: boolean
  additionalTaxes: AdditionalTax[]
}

export interface FederalWithholding {
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household'
  allowances: number
  additionalWithholding: number
  form: 'W4_2020' | 'W4_2019_earlier'
  w4OnFile: boolean
  lastUpdated: Date
}

export interface StateWithholding {
  state: string
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household'
  allowances: number
  additionalWithholding: number
  exemptFromWithholding: boolean
  reciprocityState?: string
}

export interface LocalWithholding {
  locality: string
  taxRate: number
  exemptFromWithholding: boolean
  additionalWithholding: number
}

export interface AdditionalTax {
  taxType: string
  description: string
  amount: number
  isPercentage: boolean
}

export interface TimeTrackingSettings {
  trackingMethod: 'manual' | 'clock_in_out' | 'automated' | 'exempt'
  requiresApproval: boolean
  approverIds: string[]
  overtimeRules: OvertimeRule[]
  breakRules: BreakRule[]
  rounding: TimeRounding
}

export interface OvertimeRule {
  type: 'daily' | 'weekly' | 'consecutive_days'
  threshold: number // hours
  rate: number // multiplier (e.g., 1.5 for time and half)
  maxOvertimeHours?: number
}

export interface BreakRule {
  type: 'lunch' | 'rest_break'
  duration: number // minutes
  paid: boolean
  required: boolean
  automaticDeduction: boolean
}

export interface TimeRounding {
  enabled: boolean
  roundTo: number // minutes
  method: 'nearest' | 'up' | 'down'
}

export interface PayPeriod {
  id: string
  periodStart: Date
  periodEnd: Date
  payDate: Date
  status: 'setup' | 'in_progress' | 'approved' | 'processed' | 'paid' | 'closed'
  totalGrossPay: number
  totalNetPay: number
  totalTaxes: number
  totalDeductions: number
  employeePaystubs: EmployeePaystub[]
  payrollTaxes: PayrollTaxSummary
  directDeposits: DirectDeposit[]
  processingDate: Date
  approvedBy?: string
  approvedDate?: Date
}

export interface EmployeePaystub {
  employeeId: string
  payPeriodId: string
  regularHours: number
  overtimeHours: number
  regularPay: number
  overtimePay: number
  commissions: number
  bonuses: number
  grossPay: number
  federalTax: number
  stateTax: number
  socialSecurity: number
  medicare: number
  benefits: BenefitDeduction[]
  otherDeductions: Deduction[]
  netPay: number
  ytdGross: number
  ytdTaxes: number
  ytdNet: number
}

export interface BenefitDeduction {
  benefitType: string
  description: string
  employeeContribution: number
  employerContribution: number
  pretax: boolean
}

export interface Deduction {
  type: string
  description: string
  amount: number
  pretax: boolean
  courtOrdered: boolean
}

export interface PayrollTaxSummary {
  payPeriodId: string
  federalIncomeTax: number
  federalUnemployment: number
  socialSecurityEmployer: number
  medicareEmployer: number
  stateIncomeTax: number
  stateUnemployment: number
  stateTaxes: StateTaxSummary[]
  totalEmployerTaxes: number
  totalTaxesDeposited: number
  depositDates: TaxDeposit[]
}

export interface StateTaxSummary {
  state: string
  incomeTax: number
  unemployment: number
  disability?: number
  other?: number
}

export interface TaxDeposit {
  taxType: string
  amount: number
  dueDate: Date
  depositDate?: Date
  confirmationNumber?: string
  status: 'pending' | 'deposited' | 'late' | 'failed'
}

export interface DirectDeposit {
  employeeId: string
  bankName: string
  routingNumber: string
  accountNumber: string
  accountType: 'checking' | 'savings'
  amount: number
  isPercentage: boolean
  isPrimary: boolean
  status: 'pending' | 'sent' | 'processed' | 'returned'
  transactionId?: string
}

export interface PayrollTaxSetup {
  federalTaxId: string
  stateTaxIds: { [state: string]: string }
  unemploymentAccounts: { [state: string]: UnemploymentAccount }
  workersCompPolicy?: WorkersCompPolicy
  taxFilingElections: TaxFilingElection[]
  quarterlyReports: QuarterlyReport[]
  annualReports: AnnualReport[]
}

export interface UnemploymentAccount {
  accountNumber: string
  rate: number
  experienceRating: string
  taxableWageBase: number
  lastRateNotice?: Date
}

export interface WorkersCompPolicy {
  policyNumber: string
  carrier: string
  effectiveDate: Date
  expirationDate: Date
  premium: number
  classificationCodes: WorkersCompClass[]
}

export interface WorkersCompClass {
  classCode: string
  description: string
  rate: number
  payroll: number
}

export interface TaxFilingElection {
  taxType: string
  frequency: 'monthly' | 'quarterly' | 'annually'
  filingMethod: 'electronic' | 'paper'
  isAutomatic: boolean
}

export interface QuarterlyReport {
  quarter: number
  year: number
  reportType: 'federal_941' | 'state_unemployment' | 'state_income'
  jurisdiction: string
  dueDate: Date
  filedDate?: Date
  status: 'not_due' | 'due' | 'filed' | 'late' | 'amended'
  totalWages: number
  totalTaxes: number
  confirmationNumber?: string
}

export interface AnnualReport {
  year: number
  reportType: 'W2' | 'W3' | 'federal_940' | 'state_annual'
  jurisdiction: string
  dueDate: Date
  filedDate?: Date
  status: 'not_due' | 'due' | 'filed' | 'late' | 'amended'
  confirmationNumber?: string
}

export interface BenefitsPackage {
  id: string
  packageName: string
  description: string
  healthPlans: HealthPlan[]
  dentalPlans: DentalPlan[]
  visionPlans: VisionPlan[]
  retirementPlan?: RetirementPlan
  lifeInsurancePlans: LifeInsurancePlan[]
  disabilityPlans: DisabilityPlan[]
  additionalBenefits: AdditionalBenefitOption[]
  enrollmentPeriods: EnrollmentPeriod[]
  eligibilityRules: BenefitEligibilityRule[]
  totalEmployerCost: number
  employerContributionStrategy: ContributionStrategy
}

export interface HealthPlan {
  id: string
  planName: string
  carrier: string
  planType: 'HMO' | 'PPO' | 'EPO' | 'HDHP'
  monthlyPremiums: PremiumStructure
  deductibles: DeductibleStructure
  coverageDetails: CoverageDetails
  networkProviders: string[]
}

export interface PremiumStructure {
  employee: number
  employeeSpouse: number
  employeeChildren: number
  family: number
}

export interface DeductibleStructure {
  individual: number
  family: number
  inNetwork: boolean
  outOfNetwork?: number
}

export interface CoverageDetails {
  preventiveCare: string
  primaryCare: string
  specialistCare: string
  emergencyRoom: string
  prescription: string
  mentalHealth: string
}

export interface DentalPlan {
  id: string
  planName: string
  carrier: string
  monthlyPremiums: PremiumStructure
  annualMaximum: number
  coveragePercentages: DentalCoverage
}

export interface DentalCoverage {
  preventive: number
  basic: number
  major: number
  orthodontics?: number
}

export interface VisionPlan {
  id: string
  planName: string
  carrier: string
  monthlyPremiums: PremiumStructure
  benefits: VisionBenefits
}

export interface VisionBenefits {
  eyeExam: string
  lenses: string
  frames: string
  contacts: string
}

export interface RetirementPlan {
  id: string
  planType: '401k' | '403b' | 'SIMPLE' | 'SEP'
  provider: string
  matchingFormula: string
  maxEmployerMatch: number
  vestingSchedule: VestingSchedule
  investmentOptions: InvestmentOption[]
  loans: boolean
  hardshipWithdrawals: boolean
}

export interface InvestmentOption {
  id: string
  name: string
  category: 'stock' | 'bond' | 'mixed' | 'target_date' | 'stable_value'
  expenseRatio: number
  description: string
}

export interface LifeInsurancePlan {
  id: string
  planName: string
  carrier: string
  coverage: number
  employerPaid: number
  employeeCost: number
  beneficiaryDesignation: boolean
}

export interface DisabilityPlan {
  id: string
  planName: string
  carrier: string
  type: 'short_term' | 'long_term'
  coveragePercentage: number
  maxBenefit: number
  eliminationPeriod: number
  benefitPeriod: string
  employerPaid: boolean
}

export interface AdditionalBenefitOption {
  id: string
  benefitName: string
  description: string
  cost: number
  frequency: 'monthly' | 'annual'
  taxable: boolean
  category: 'wellness' | 'financial' | 'lifestyle' | 'education'
}

export interface EnrollmentPeriod {
  id: string
  name: string
  type: 'initial' | 'open' | 'qualifying_event'
  startDate: Date
  endDate: Date
  eligibilityRules: string[]
  coverageEffectiveDate: Date
}

export interface BenefitEligibilityRule {
  benefitType: string
  waitingPeriod: number // days
  hoursRequirement?: number // per week
  employmentType: EmploymentInfo['employeeType'][]
  isAutoEnroll: boolean
}

export interface ContributionStrategy {
  healthInsurance: number // percentage
  dentalInsurance: number
  visionInsurance: number
  retirementMatch: string
  lifeInsurance: number
  totalBudget: number
  budgetAllocation: { [key: string]: number }
}

export interface HRComplianceStatus {
  federalCompliance: ComplianceArea[]
  stateCompliance: ComplianceArea[]
  localCompliance: ComplianceArea[]
  industryCompliance: ComplianceArea[]
  auditHistory: ComplianceAudit[]
  trainingRequirements: TrainingRequirement[]
  policyManagement: PolicyManagement
  documentRetention: DocumentRetention
  riskAssessment: RiskAssessment
}

export interface ComplianceArea {
  area: string
  description: string
  requirements: string[]
  status: 'compliant' | 'non_compliant' | 'needs_attention' | 'unknown'
  lastReview: Date
  nextReview: Date
  responsibleParty: string
  documentation: string[]
  penalties: string
}

export interface ComplianceAudit {
  id: string
  auditDate: Date
  auditType: 'internal' | 'external' | 'regulatory'
  auditor: string
  scope: string[]
  findings: AuditFinding[]
  correctionActions: CorrectionAction[]
  status: 'in_progress' | 'completed' | 'closed'
}

export interface AuditFinding {
  findingId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  regulation: string
  recommendation: string
  dueDate: Date
}

export interface CorrectionAction {
  findingId: string
  action: string
  assignedTo: string
  targetDate: Date
  completedDate?: Date
  status: 'assigned' | 'in_progress' | 'completed' | 'overdue'
  evidence: string[]
}

export interface TrainingRequirement {
  trainingType: string
  description: string
  frequency: 'onetime' | 'annual' | 'biennial' | 'as_needed'
  applicableRoles: string[]
  requiredBy: 'federal' | 'state' | 'local' | 'industry' | 'company'
  provider: string
  cost: number
  trackingMethod: string
}

export interface PolicyManagement {
  policies: HRPolicy[]
  lastReview: Date
  nextReview: Date
  approvedBy: string
  distributionMethod: string[]
  acknowledgmentTracking: boolean
}

export interface HRPolicy {
  id: string
  policyName: string
  category: string
  version: number
  effectiveDate: Date
  lastUpdated: Date
  content: string
  applicableEmployees: string[]
  requiresAcknowledgment: boolean
  acknowledgments: PolicyAcknowledgment[]
}

export interface PolicyAcknowledgment {
  employeeId: string
  acknowledgedDate: Date
  digitalSignature: string
  ipAddress: string
}

export interface DocumentRetention {
  retentionSchedule: RetentionSchedule[]
  storageMethod: 'physical' | 'digital' | 'both'
  accessControls: AccessControl[]
  disposalProcedures: string[]
  auditTrail: boolean
}

export interface RetentionSchedule {
  documentType: string
  retentionPeriod: string
  legalRequirement: string
  disposalMethod: string
  responsibleParty: string
}

export interface AccessControl {
  documentType: string
  authorizedRoles: string[]
  securityLevel: 'public' | 'internal' | 'confidential' | 'restricted'
  auditAccess: boolean
}

export interface RiskAssessment {
  lastAssessment: Date
  nextAssessment: Date
  riskAreas: RiskArea[]
  overallRiskLevel: 'low' | 'medium' | 'high'
  mitigationStrategies: MitigationStrategy[]
}

export interface RiskArea {
  area: string
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  riskLevel: 'low' | 'medium' | 'high'
  currentControls: string[]
  recommendations: string[]
}

export interface MitigationStrategy {
  riskArea: string
  strategy: string
  implementation: string
  timeline: string
  cost: number
  effectiveness: 'low' | 'medium' | 'high'
  status: 'planned' | 'implementing' | 'completed'
}

export interface PayrollFeature {
  featureName: string
  description: string
  isIncluded: boolean
  additionalCost?: number
  category: 'core' | 'advanced' | 'premium'
}

export interface PayrollIntegration {
  integrationName: string
  description: string
  status: 'active' | 'inactive' | 'pending' | 'error'
  dataSync: 'real_time' | 'daily' | 'weekly' | 'manual'
  lastSync?: Date
  configuration: { [key: string]: any }
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
  address?: Address
  isPrimary: boolean
}

export interface Dependent {
  name: string
  relationship: 'spouse' | 'child' | 'other'
  dateOfBirth: Date
  ssn?: string
  isFullTimeStudent: boolean
  isDisabled: boolean
}

export interface Beneficiary {
  name: string
  relationship: string
  percentage: number
  contingent: boolean
  ssn?: string
  dateOfBirth?: Date
  address?: Address
}

export interface EmployeeDocument {
  id: string
  documentType: string
  fileName: string
  uploadDate: Date
  expirationDate?: Date
  isRequired: boolean
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  uploadedBy: string
  notes?: string
}

export interface PerformanceReview {
  id: string
  reviewPeriod: string
  reviewDate: Date
  reviewType: 'annual' | 'quarterly' | 'probationary' | 'project_based'
  overallRating: number
  goalAchievement: GoalAchievement[]
  skillAssessment: SkillAssessment[]
  developmentPlan: DevelopmentGoal[]
  reviewedBy: string
  acknowledgedBy: string
  acknowledgedDate?: Date
}

export interface GoalAchievement {
  goal: string
  target: string
  achievement: string
  rating: number
  comments: string
}

export interface SkillAssessment {
  skillArea: string
  currentLevel: number
  targetLevel: number
  improvementPlan: string
}

export interface DevelopmentGoal {
  goal: string
  targetDate: Date
  resources: string[]
  progressMilestones: string[]
  status: 'not_started' | 'in_progress' | 'completed' | 'deferred'
}

export interface DisciplinaryAction {
  id: string
  date: Date
  actionType: 'verbal_warning' | 'written_warning' | 'suspension' | 'termination'
  reason: string
  description: string
  actionTaken: string
  followUpRequired: boolean
  followUpDate?: Date
  issuedBy: string
  acknowledged: boolean
  acknowledgedDate?: Date
  employeeComments?: string
}

export interface TrainingRecord {
  id: string
  trainingName: string
  category: string
  provider: string
  completionDate: Date
  expirationDate?: Date
  certificateNumber?: string
  cost: number
  required: boolean
  status: 'completed' | 'expired' | 'in_progress' | 'scheduled'
}

export interface Address {
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class PayrollHRServices {

  /**
   * Get available payroll service tiers
   */
  static getPayrollServiceTiers(): {
    basic: PayrollServiceTier
    professional: PayrollServiceTier  
    enterprise: PayrollServiceTier
  } {
    return {
      basic: {
        name: 'Basic Payroll',
        description: 'Essential payroll processing for small businesses',
        monthlyFee: 89,
        perEmployeeFee: 12,
        maxEmployees: 25,
        features: [
          'Bi-weekly and monthly payroll processing',
          'Direct deposit and paper checks',
          'Tax calculations and deposits',
          'Basic time tracking',
          'Employee self-service portal',
          'Basic reporting (pay stubs, tax summaries)',
          'W-2 and 1099 preparation',
          'Basic compliance monitoring'
        ],
        addOnServices: [
          'Workers compensation insurance',
          'Health insurance administration', 
          'Time clock hardware',
          'Advanced reporting'
        ],
        support: 'Email and phone support during business hours',
        setup: 'Self-service setup with guided tutorials',
        assignedSpecialist: 'Sarah Chen, EA - Payroll Specialist'
      },
      
      professional: {
        name: 'Professional Payroll Plus',
        description: 'Comprehensive payroll and HR for growing businesses',
        monthlyFee: 159,
        perEmployeeFee: 8,
        maxEmployees: 100,
        features: [
          'All Basic Payroll features',
          'Weekly, bi-weekly, semi-monthly, monthly processing',
          'Multi-state payroll processing',
          'Benefits administration',
          'Performance management system',
          'Employee handbook templates',
          'Advanced time tracking with GPS',
          'Comprehensive reporting dashboard',
          'HR compliance assistance',
          'Employee document management',
          'Applicant tracking system (basic)',
          'COBRA administration'
        ],
        addOnServices: [
          'Full-service HR consulting',
          'Background check services',
          'Workers compensation management',
          'Retirement plan administration'
        ],
        support: 'Dedicated payroll specialist with priority support',
        setup: 'White-glove setup with data migration',
        assignedSpecialist: 'Jennifer Martinez, CPA - Senior HR Consultant'
      },

      enterprise: {
        name: 'Enterprise HR Suite',
        description: 'Complete HR platform for large organizations',
        monthlyFee: 299,
        perEmployeeFee: 5,
        maxEmployees: -1, // Unlimited
        features: [
          'All Professional Payroll Plus features',
          'Multi-location payroll management',
          'Advanced benefits administration',
          'Comprehensive performance management',
          'Learning management system',
          'Advanced analytics and reporting',
          'Full applicant tracking system',
          'Employee engagement surveys',
          'Succession planning tools',
          'Custom workflow automation',
          'API integrations',
          'White-label employee portal',
          'Advanced compliance management',
          'Risk management tools',
          'Custom reporting builder'
        ],
        addOnServices: [
          'Fractional CHRO services',
          'Organization development consulting',
          'Executive compensation consulting',
          'Merger & acquisition HR support'
        ],
        support: '24/7 support with dedicated account manager',
        setup: 'Executive onboarding with custom configuration',
        assignedSpecialist: 'Robert Williams, CPA - VP of HR Services'
      }
    }
  }

  /**
   * Calculate monthly payroll costs
   */
  static calculatePayrollCosts(
    serviceLevel: 'basic' | 'professional' | 'enterprise',
    employeeCount: number,
    addOns: string[] = [],
    payrollFrequency: PayrollSchedule['frequency'] = 'biweekly'
  ): {
    baseMonthlyCost: number
    employeeFees: number
    addOnCosts: number
    frequencyMultiplier: number
    totalMonthlyCost: number
    annualCost: number
    costPerEmployee: number
    breakdown: { item: string; cost: number }[]
  } {

    const tiers = this.getPayrollServiceTiers()
    const tier = tiers[serviceLevel]

    const baseMonthlyCost = tier.monthlyFee
    const employeeFees = employeeCount * tier.perEmployeeFee

    // Frequency multipliers (more frequent = slightly higher cost)
    const frequencyMultipliers = {
      'weekly': 1.15,
      'biweekly': 1.0,
      'semi_monthly': 1.0,
      'monthly': 0.85
    }
    const frequencyMultiplier = frequencyMultipliers[payrollFrequency]

    // Add-on costs (examples)
    const addOnPricing: { [key: string]: number } = {
      'workers_comp_insurance': 45,
      'health_insurance_admin': 25,
      'time_clock_hardware': 15,
      'advanced_reporting': 35,
      'hr_consulting': 150,
      'background_checks': 20,
      'retirement_plan_admin': 75,
      'fractional_chro': 500
    }

    const addOnCosts = addOns.reduce((total, addOn) => {
      return total + (addOnPricing[addOn] || 0)
    }, 0)

    const subtotal = (baseMonthlyCost + employeeFees + addOnCosts)
    const totalMonthlyCost = subtotal * frequencyMultiplier
    const annualCost = totalMonthlyCost * 12
    const costPerEmployee = employeeCount > 0 ? totalMonthlyCost / employeeCount : 0

    const breakdown = [
      { item: `${tier.name} Base Fee`, cost: baseMonthlyCost },
      { item: `Employee Fees (${employeeCount} × $${tier.perEmployeeFee})`, cost: employeeFees },
      ...addOns.map(addOn => ({ 
        item: addOn.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
        cost: addOnPricing[addOn] || 0 
      })),
      ...(frequencyMultiplier !== 1.0 ? [{ 
        item: `${payrollFrequency.replace('_', ' ')} Processing Adjustment`, 
        cost: subtotal * (frequencyMultiplier - 1) 
      }] : [])
    ]

    return {
      baseMonthlyCost,
      employeeFees,
      addOnCosts,
      frequencyMultiplier,
      totalMonthlyCost,
      annualCost,
      costPerEmployee,
      breakdown
    }
  }

  /**
   * Create payroll service setup
   */
  static createPayrollService(
    clientId: string,
    companyName: string,
    ein: string,
    serviceLevel: 'basic' | 'professional' | 'enterprise',
    payrollSchedule: Partial<PayrollSchedule>,
    employees: Partial<Employee>[],
    addOns: string[] = []
  ): PayrollService {

    const tiers = this.getPayrollServiceTiers()
    const tier = tiers[serviceLevel]
    const costs = this.calculatePayrollCosts(serviceLevel, employees.length, addOns, payrollSchedule.frequency)

    const service: PayrollService = {
      id: `payroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      companyName,
      ein,
      payrollSchedule: {
        frequency: payrollSchedule.frequency || 'biweekly',
        payDays: payrollSchedule.payDays || ['Friday'],
        firstPayDate: payrollSchedule.firstPayDate || this.getNextPayDate('biweekly'),
        nextPayDate: payrollSchedule.nextPayDate || this.getNextPayDate('biweekly'),
        payPeriodsPerYear: this.getPayPeriodsPerYear(payrollSchedule.frequency || 'biweekly'),
        autoProcessing: payrollSchedule.autoProcessing || false,
        cutoffDays: payrollSchedule.cutoffDays || 2,
        approvalRequired: payrollSchedule.approvalRequired || true,
        approverIds: payrollSchedule.approverIds || []
      },
      employees: employees.map(emp => this.createEmployeeRecord(emp)),
      payPeriods: [],
      taxSetup: this.createTaxSetup(ein),
      hrCompliance: this.createHRComplianceStatus(serviceLevel),
      serviceLevel,
      monthlyFee: tier.monthlyFee,
      perEmployeeFee: tier.perEmployeeFee,
      totalMonthlyCost: costs.totalMonthlyCost,
      startDate: new Date(),
      status: 'setup',
      assignedSpecialist: tier.assignedSpecialist,
      features: tier.features.map(feature => ({
        featureName: feature,
        description: feature,
        isIncluded: true,
        category: 'core'
      })),
      integrations: []
    }

    return service
  }

  /**
   * Generate comprehensive payroll analytics
   */
  static generatePayrollAnalytics(
    payrollServices: PayrollService[],
    dateRange: { start: Date; end: Date }
  ): {
    totalClients: number
    totalEmployees: number
    totalMonthlyRevenue: number
    averageEmployeesPerClient: number
    serviceDistribution: { [key: string]: number }
    payrollTrends: { month: string; revenue: number; clients: number; employees: number }[]
    complianceMetrics: { compliant: number; needsAttention: number; nonCompliant: number }
    topAddOns: { addOn: string; usage: number; revenue: number }[]
    clientSatisfactionScore: number
    processingMetrics: {
      onTimeProcessing: number
      averageProcessingTime: number
      errorRate: number
      directDepositSuccess: number
    }
  } {

    const totalClients = payrollServices.length
    const totalEmployees = payrollServices.reduce((sum, service) => sum + service.employees.length, 0)
    const totalMonthlyRevenue = payrollServices.reduce((sum, service) => sum + service.totalMonthlyCost, 0)
    const averageEmployeesPerClient = totalClients > 0 ? totalEmployees / totalClients : 0

    // Service distribution
    const serviceDistribution = payrollServices.reduce((dist, service) => {
      dist[service.serviceLevel] = (dist[service.serviceLevel] || 0) + 1
      return dist
    }, {} as { [key: string]: number })

    // Mock trends data (would be calculated from historical data)
    const payrollTrends = [
      { month: 'Jan 2025', revenue: 45000, clients: 120, employees: 850 },
      { month: 'Feb 2025', revenue: 48500, clients: 128, employees: 920 },
      { month: 'Mar 2025', revenue: 52000, clients: 135, employees: 1050 },
      { month: 'Apr 2025', revenue: 56700, clients: 142, employees: 1180 }
    ]

    // Compliance metrics (mock data)
    const complianceMetrics = {
      compliant: Math.round(totalClients * 0.85),
      needsAttention: Math.round(totalClients * 0.12),
      nonCompliant: Math.round(totalClients * 0.03)
    }

    // Top add-ons (mock data)
    const topAddOns = [
      { addOn: 'Health Insurance Admin', usage: 67, revenue: 1675 },
      { addOn: 'Workers Comp Insurance', usage: 45, revenue: 2025 },
      { addOn: 'Advanced Reporting', usage: 38, revenue: 1330 },
      { addOn: 'HR Consulting', usage: 23, revenue: 3450 }
    ]

    const clientSatisfactionScore = 4.8 // Mock score

    const processingMetrics = {
      onTimeProcessing: 98.5, // percentage
      averageProcessingTime: 2.3, // hours
      errorRate: 0.02, // percentage
      directDepositSuccess: 99.8 // percentage
    }

    return {
      totalClients,
      totalEmployees,
      totalMonthlyRevenue,
      averageEmployeesPerClient,
      serviceDistribution,
      payrollTrends,
      complianceMetrics,
      topAddOns,
      clientSatisfactionScore,
      processingMetrics
    }
  }

  /**
   * Helper functions
   */
  private static getNextPayDate(frequency: PayrollSchedule['frequency']): Date {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const friday = 5

    let daysUntilFriday = (friday - dayOfWeek + 7) % 7
    if (daysUntilFriday === 0) daysUntilFriday = 7 // Next Friday if today is Friday

    const nextFriday = new Date(today)
    nextFriday.setDate(today.getDate() + daysUntilFriday)

    return nextFriday
  }

  private static getPayPeriodsPerYear(frequency: PayrollSchedule['frequency']): number {
    const frequencies = {
      'weekly': 52,
      'biweekly': 26,
      'semi_monthly': 24,
      'monthly': 12
    }
    return frequencies[frequency]
  }

  private static createEmployeeRecord(empData: Partial<Employee>): Employee {
    // This would create a full employee record with defaults
    // Simplified for brevity
    return {
      id: `emp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      personalInfo: empData.personalInfo || {} as EmployeePersonalInfo,
      employmentInfo: empData.employmentInfo || {} as EmploymentInfo,
      compensation: empData.compensation || {} as CompensationStructure,
      benefits: empData.benefits || {} as EmployeeBenefits,
      taxInfo: empData.taxInfo || {} as EmployeeTaxInfo,
      timeTracking: empData.timeTracking || {} as TimeTrackingSettings,
      status: 'active',
      hireDate: new Date(),
      documents: [],
      performanceReviews: [],
      disciplinaryActions: [],
      trainingRecords: []
    }
  }

  private static createTaxSetup(ein: string): PayrollTaxSetup {
    return {
      federalTaxId: ein,
      stateTaxIds: {},
      unemploymentAccounts: {},
      taxFilingElections: [
        {
          taxType: 'Federal Income Tax',
          frequency: 'monthly',
          filingMethod: 'electronic',
          isAutomatic: true
        }
      ],
      quarterlyReports: [],
      annualReports: []
    }
  }

  private static createHRComplianceStatus(serviceLevel: string): HRComplianceStatus {
    return {
      federalCompliance: [],
      stateCompliance: [],
      localCompliance: [],
      industryCompliance: [],
      auditHistory: [],
      trainingRequirements: [],
      policyManagement: {} as PolicyManagement,
      documentRetention: {} as DocumentRetention,
      riskAssessment: {} as RiskAssessment
    }
  }
}

export interface PayrollServiceTier {
  name: string
  description: string
  monthlyFee: number
  perEmployeeFee: number
  maxEmployees: number
  features: string[]
  addOnServices: string[]
  support: string
  setup: string
  assignedSpecialist: string
}

export default PayrollHRServices
