
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Users,
  FileText,
  Calculator,
  Star,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  Phone,
  Mail,
  Calendar,
  Lightbulb,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  Heart,
  PiggyBank
} from 'lucide-react'

export function EnhancedClientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    
    // Tax Situation Assessment
    filingStatus: '',
    dependents: 0,
    currentIncome: '',
    employmentType: '',
    
    // Deduction Opportunities
    hasHomeOffice: false,
    hasBusinessVehicle: false,
    hasBusinessExpenses: false,
    hasEducationExpenses: false,
    hasCharitableGiving: false,
    hasRetirementContributions: false,
    
    // Goals and Concerns
    primaryGoals: [] as string[],
    specificConcerns: [] as string[],
    expectedSavings: '',
    
    // Service Preferences
    serviceType: '',
    mobilePref: false,
    meetingPreference: '',
    
    // Previous Experience
    previousPreparer: '',
    lastYearRefund: '',
    satisfactionLevel: ''
  })

  const [estimatedSavings, setEstimatedSavings] = useState(0)
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([])

  const steps = [
    { 
      title: 'Welcome & Assessment', 
      description: 'Tell us about yourself',
      icon: Users,
      fields: ['firstName', 'lastName', 'email', 'phone']
    },
    { 
      title: 'Tax Situation', 
      description: 'Your current tax profile',
      icon: FileText,
      fields: ['filingStatus', 'dependents', 'currentIncome', 'employmentType']
    },
    { 
      title: 'Deduction Discovery', 
      description: 'Find hidden savings',
      icon: Sparkles,
      fields: ['hasHomeOffice', 'hasBusinessVehicle', 'hasBusinessExpenses']
    },
    { 
      title: 'Goals & Preferences', 
      description: 'Customize your experience',
      icon: Target,
      fields: ['primaryGoals', 'serviceType', 'meetingPreference']
    },
    { 
      title: 'Your Savings Report', 
      description: 'See your potential',
      icon: DollarSign,
      fields: []
    }
  ]

  const deductionCategories = [
    {
      id: 'hasHomeOffice',
      name: 'Home Office',
      icon: Home,
      potential: 1200,
      description: 'Deduct portion of home expenses for business use'
    },
    {
      id: 'hasBusinessVehicle', 
      name: 'Vehicle Expenses',
      icon: Car,
      potential: 1500,
      description: 'Business mileage and vehicle depreciation'
    },
    {
      id: 'hasBusinessExpenses',
      name: 'Business Expenses',
      icon: Briefcase,
      potential: 800,
      description: 'Office supplies, software, professional development'
    },
    {
      id: 'hasEducationExpenses',
      name: 'Education Credits',
      icon: GraduationCap,
      potential: 2500,
      description: 'Tuition, student loan interest, professional courses'
    },
    {
      id: 'hasCharitableGiving',
      name: 'Charitable Deductions',
      icon: Heart,
      potential: 600,
      description: 'Cash donations, non-cash donations, volunteer expenses'
    },
    {
      id: 'hasRetirementContributions',
      name: 'Retirement Savings',
      icon: PiggyBank,
      potential: 1400,
      description: 'IRA contributions, 401k, HSA contributions'
    }
  ]

  const goalOptions = [
    'Maximize my tax refund',
    'Minimize taxes owed', 
    'Plan for next year',
    'Understand my deductions',
    'Organize my tax documents',
    'Get audit protection',
    'Save time on tax prep',
    'Business tax optimization',
    'Retirement tax planning',
    'Investment tax strategies'
  ]

  // Calculate estimated savings based on selections
  useEffect(() => {
    let totalSavings = 0
    const tips: string[] = []
    
    deductionCategories.forEach(category => {
      if (formData[category.id as keyof typeof formData]) {
        totalSavings += category.potential
        tips.push(`${category.name}: Save up to $${category.potential}`)
      }
    })

    // Income-based adjustments
    const incomeMultiplier = formData.currentIncome === 'over-150k' ? 1.5 : 
                            formData.currentIncome === '100k-150k' ? 1.3 :
                            formData.currentIncome === '75k-100k' ? 1.1 : 1.0

    totalSavings = Math.round(totalSavings * incomeMultiplier)
    
    if (formData.dependents > 0) {
      const childCredit = formData.dependents * 2000
      totalSavings += childCredit
      tips.push(`Child Tax Credit: $${childCredit} for ${formData.dependents} ${formData.dependents === 1 ? 'child' : 'children'}`)
    }

    setEstimatedSavings(totalSavings)
    setPersonalizedTips(tips)
  }, [formData])

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGoalToggle = (goal: string) => {
    if (formData.primaryGoals.includes(goal)) {
      setFormData({
        ...formData,
        primaryGoals: formData.primaryGoals.filter(g => g !== goal)
      })
    } else {
      setFormData({
        ...formData,
        primaryGoals: [...formData.primaryGoals, goal]
      })
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg px-6 py-2 mb-6">
              🚀 SMART ONBOARDING WIZARD
            </Badge>
            
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              Let's Maximize Your
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Tax Savings
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Answer a few questions and we'll create a personalized tax strategy just for you
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-3 mb-4" />
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index + 1 === currentStep
                  const isCompleted = index + 1 < currentStep
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted ? 'bg-green-600 text-white' :
                        isActive ? 'bg-blue-600 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <div className={`text-xs text-center hidden sm:block ${
                        isActive ? 'font-bold text-blue-600' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-6 w-6 text-blue-600"
                })}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-lg">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Step 1: Welcome & Assessment */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-3">
                      Welcome to Personalized Tax Optimization!
                    </h3>
                    <p className="text-purple-700 mb-4">
                      We'll analyze your unique situation and find every deduction you deserve. 
                      Our average client saves <strong>$4,247</strong> annually with our personalized approach.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                        <div className="text-sm font-bold">99.2% Success Rate</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <Shield className="h-6 w-6 text-green-500 mx-auto mb-1" />
                        <div className="text-sm font-bold">Audit Protection</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                        <div className="text-sm font-bold">Year-Round Support</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="h-12 text-lg"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="h-12 text-lg"
                        placeholder="Your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-12 text-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="h-12 text-lg"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Preferred Contact Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'email', name: 'Email', icon: Mail },
                        { id: 'phone', name: 'Phone Call', icon: Phone }
                      ].map(method => {
                        const Icon = method.icon
                        return (
                          <label
                            key={method.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.preferredContact === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="preferredContact"
                              value={method.id}
                              checked={formData.preferredContact === method.id}
                              onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{method.name}</span>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional steps would continue here... */}
              {currentStep > 1 && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Steps 2-5 Implementation
                  </h3>
                  <p className="text-gray-600 mb-6">
                    The remaining onboarding steps would include tax situation assessment, 
                    deduction discovery, goals & preferences, and savings report.
                  </p>
                  <Button 
                    onClick={() => window.open('/tax-evaluation', '_blank')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue to Tax Evaluation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                {currentStep > 1 ? (
                  <Button onClick={handleBack} variant="outline" className="px-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {currentStep === 5 ? 'Complete your savings analysis' : `${steps.length - currentStep} more steps`}
                  </p>
                </div>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-8">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
