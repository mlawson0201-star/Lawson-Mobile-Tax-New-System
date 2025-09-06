
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { EnhancedClientDashboard } from '@/components/enhanced-client-dashboard'
import { MobileTaxTools } from '@/components/mobile-tax-tools'
import { ClientCommunicationHub } from '@/components/client-communication-hub'
import { TaxEducationHub } from '@/components/tax-education-hub'
import { ClientReferralProgram } from '@/components/client-referral-program'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  Upload, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  Building2,
  MessageSquare,
  Bell,
  Calculator,
  BookOpen
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'
import { ClientProfile, ClientPersonalizationService } from '@/lib/client-personalization'
import { PersonalizedCommunications, TaxProfessionalMessage } from '@/lib/personalized-communications'

export default function ClientDashboardPage() {
  const { data: session } = useSession()
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null)
  const [recentMessages, setRecentMessages] = useState<TaxProfessionalMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Generate real client profile based on session
    const generateClientProfile = (): ClientProfile => {
      return {
        id: session?.user?.id || 'client_' + Date.now(),
        firstName: session?.user?.name?.split(' ')[0] || 'Client',
        lastName: session?.user?.name?.split(' ')[1] || 'User',
        email: session?.user?.email || 'client@lawsonmobiletax.com',
        phone: '(855) 722-8700',
        
        // Personal Details - Dynamic based on session if available
        dateOfBirth: new Date(),
        ssn: '***-**-****', // Always masked for security
        maritalStatus: 'single' as const,
        dependents: [], // Will be populated from real data when available
        
        // Address Information - Dynamic if available
        address: '',
        city: '',
        state: '',
        zipCode: '',
        residencyYears: 0,
        
        // Employment & Income - Will be populated from real tax data
        employmentStatus: 'employed' as const,
        employer: '',
        occupation: 'Tax Client',
        w2Income: 0,
        selfEmploymentIncome: 0,
        unemploymentIncome: 0,
        socialSecurityIncome: 0,
        retirementIncome: 0,
        rentalIncome: 0,
        investmentIncome: 0,
        otherIncome: 0,
        
        // Tax Situation - Will be loaded from actual tax returns
        filingStatus: 'single' as const,
        hasHealthInsurance: false,
        hasRetirementContributions: false,
        traditionalIraContributions: 0,
        rothIraContributions: 0,
        hsa401kContributions: 0,
        
        // Deductions & Credits - Will be loaded from tax data
        hasCharitableDonations: false,
        charitableDonationsAmount: 0,
        hasMortgageInterest: false,
        mortgageInterestAmount: 0,
        hasStateLocalTaxes: false,
        stateLocalTaxesAmount: 0,
        hasEducationExpenses: false,
        educationExpensesAmount: 0,
        hasChildcareExpenses: false,
        childcareExpensesAmount: 0,
        
        // Business Information - Will be loaded from business tax returns
        businessName: '',
        businessType: '',
        businessIncome: 0,
        businessExpenses: 0,
        hasBusinessVehicle: false,
        businessMileage: 0,
        hasHomeOffice: false,
        homeOfficeSquareFeet: 0,
        
        // Previous Year Information - Will be loaded from tax history
        previousYearAGI: 0,
        previousYearRefund: 0,
        previousYearTaxOwed: 0,
        changesFromPreviousYear: [],
        
        // Goals & Concerns - Will be collected during onboarding
        primaryTaxGoals: [],
        specificConcerns: [],
        planningNeeds: [],
        riskTolerance: 'moderate' as const,
        
        // Communication Preferences
        preferredContactMethod: 'email' as const,
        bestContactTime: '9:00 AM - 5:00 PM',
        communicationFrequency: 'regular'
      }
    }

    const profile = generateClientProfile()
    setClientProfile(profile)

    // Generate sample personalized messages
    const sampleMessages: TaxProfessionalMessage[] = [
      PersonalizedCommunications.generateTaxStrategyMessage(
        profile,
        'Jennifer Martinez, CPA',
        'Business Expense Optimization'
      ),
      PersonalizedCommunications.generateDocumentRequest(
        profile,
        'Jennifer Martinez, CPA',
        'Business Mileage Log',
        'high'
      ),
      PersonalizedCommunications.generateQuarterlyPlanningMessage(
        profile,
        'Jennifer Martinez, CPA',
        2
      )
    ]

    setRecentMessages(sampleMessages)
    setLoading(false)
  }, [session])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filed':
      case 'processed':
        return 'bg-green-100 text-green-800'
      case 'in progress':
      case 'under review':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'high':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'medium':
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading || !clientProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-medium text-gray-900">Loading your personalized dashboard...</p>
          <p className="text-sm text-gray-600">Analyzing your tax profile and generating customized content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{COMPANY_CONFIG.name}</h1>
                <p className="text-sm text-purple-600">
                  {clientProfile.firstName}'s Personal Tax Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {clientProfile.firstName} {clientProfile.lastName}
                </p>
                <p className="text-sm text-gray-600">{clientProfile.occupation}</p>
              </div>
              <Button variant="outline" size="sm">
                <a href="/api/auth/signout">Sign Out</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert for Recent Messages */}
        {recentMessages.length > 0 && (
          <Alert className="mb-6 border-purple-200 bg-purple-50">
            <MessageSquare className="h-4 w-4 text-purple-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  You have {recentMessages.length} new message{recentMessages.length > 1 ? 's' : ''} from your tax professional. 
                  The most recent is about: "{recentMessages[0].subject}"
                </span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="ml-4"
                  onClick={() => {
                    const tabs = document.querySelector('[value="messages"]') as HTMLElement
                    tabs?.click()
                  }}
                >
                  View Messages
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Personalized Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Tax Tools</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
              {recentMessages.filter(m => m.priority === 'urgent').length > 0 && (
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </TabsTrigger>
            <TabsTrigger value="referral" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <EnhancedClientDashboard clientProfile={clientProfile} />
          </TabsContent>

          <TabsContent value="tools">
            <MobileTaxTools />
          </TabsContent>

          <TabsContent value="communication">
            <ClientCommunicationHub />
          </TabsContent>

          <TabsContent value="referral">
            <ClientReferralProgram />
          </TabsContent>

          <TabsContent value="education">
            <TaxEducationHub clientProfile={clientProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
