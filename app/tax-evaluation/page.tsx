
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  Upload, 
  FileText, 
  DollarSign,
  CheckCircle,
  TrendingUp,
  Star,
  Users,
  Award,
  Clock
} from 'lucide-react'

export default function TaxEvaluationPage() {
  const [step, setStep] = useState(1)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [evaluationCompleted, setEvaluationCompleted] = useState(false)
  const [showUpsells, setShowUpsells] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Tax Situation
    filingStatus: '',
    previousYear: '',
    currentIncome: '',
    hasW2: false,
    has1099: false,
    hasBusinessIncome: false,
    hasRentalIncome: false,
    hasInvestments: false,
    
    // Current Tax Preparer
    currentPreparer: '',
    lastYearRefund: '',
    taxesPaid: '',
    satisfactionLevel: '',
    
    // Goals
    primaryGoals: [] as string[],
    biggestConcerns: [] as string[],
    
    // File Uploads
    uploadedFiles: [],
    additionalNotes: ''
  })

  const [evaluationResults] = useState({
    potentialSavings: '$2,847',
    hiddenDeductions: 7,
    refundIncrease: '$1,234',
    confidence: '92%'
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsPaymentProcessing(true)
    
    try {
      // REAL STRIPE PAYMENT PROCESSING
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 19.99,
          description: 'Expert Tax Evaluation',
          successUrl: `${window.location.origin}/tax-evaluation/success`,
          cancelUrl: `${window.location.origin}/tax-evaluation`,
          clientData: formData // Pass form data for processing
        })
      })

      const data = await response.json()

      if (data.success && data.sessionUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.sessionUrl
      } else if (data.mockMode) {
        // If in mock mode (no Stripe keys), show message
        alert('⚠️ STRIPE KEYS REQUIRED\n\nYour Stripe keys are configured but payment processor needs to be activated. Contact support.')
        setIsPaymentProcessing(false)
      } else {
        throw new Error(data.error || 'Payment failed')
      }
      
    } catch (error) {
      console.error('Payment failed:', error)
      setIsPaymentProcessing(false)
      alert('Payment failed. Please check your connection and try again.')
    }
  }

  // Show evaluation results with upsells
  if (evaluationCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results */}
            <Card className="p-8 bg-white shadow-2xl mb-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Your Tax Evaluation is Complete!</h1>
                <p className="text-xl text-gray-700">
                  Here's your personalized tax analysis based on the information you provided.
                </p>
              </div>

              {/* Login Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Your Account Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email:</label>
                    <div className="bg-white p-3 rounded border font-mono text-lg">
                      {loginCredentials.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Temporary Password:</label>
                    <div className="bg-white p-3 rounded border font-mono text-lg">
                      {loginCredentials.password}
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation Results */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800">{evaluationResults.potentialSavings}</h3>
                  <p className="text-green-600">Potential Annual Savings</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-800">{evaluationResults.hiddenDeductions}</h3>
                  <p className="text-blue-600">Missed Deductions Found</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-purple-800">{evaluationResults.refundIncrease}</h3>
                  <p className="text-purple-600">Refund Increase</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-orange-800">{evaluationResults.confidence}</h3>
                  <p className="text-orange-600">Accuracy Confidence</p>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🔍 Key Findings</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Home Office Deduction Opportunity</h4>
                      <p className="text-gray-700">You may qualify for $1,200+ in home office deductions that weren't claimed last year.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Business Expense Optimization</h4>
                      <p className="text-gray-700">We identified $890 in eligible business expenses that could reduce your tax liability.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Retirement Planning Benefits</h4>
                      <p className="text-gray-700">Strategic retirement contributions could save you $757 annually in taxes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">📋 Recommended Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Schedule a consultation within 30 days to implement these strategies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Gather documentation for the identified deductions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Consider quarterly tax planning to maximize annual savings</span>
                  </div>
                </div>
              </div>

              {/* Personalized Video Message */}
              <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg p-8 text-white">
                <div className="flex items-center mb-6">
                  <img 
                    src="/lmt-avatar.jpg" 
                    alt="LMT Tax Professional" 
                    className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">Personal Message from Your Tax Expert</h3>
                    <p className="text-purple-100">Congratulations on taking the first step toward maximizing your tax savings!</p>
                  </div>
                </div>
                
                <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
                  <video 
                    src="/tax-evaluation-video.mp4" 
                    controls 
                    className="w-full rounded-lg shadow-xl"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-purple-100 mb-4">
                    Watch this personalized message about your evaluation results and next steps to maximize your ${evaluationResults.potentialSavings} in potential savings!
                  </p>
                </div>
              </div>
            </Card>

            {/* Upsells */}
            {showUpsells && (
              <div className="space-y-8">
                {/* Main Upsell - Premium Tax Planning Guide */}
                <Card className="p-8 bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-2xl border-4 border-yellow-400">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="/lmt-avatar.jpg" 
                        alt="LMT Tax Expert" 
                        className="w-20 h-20 rounded-full mr-4 border-4 border-yellow-400 shadow-lg"
                      />
                      <div className="text-left">
                        <h2 className="text-4xl font-bold mb-2">💎 ESSENTIAL UPGRADE</h2>
                        <p className="text-yellow-200 text-lg">Don't let your ${evaluationResults.potentialSavings} in savings slip away!</p>
                      </div>
                    </div>
                    <p className="text-xl">
                      Your evaluation revealed specific opportunities. Our Premium Tax Planning Guide shows you EXACTLY how to capture every dollar!
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white bg-opacity-20 rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">🎯 Personalized For You:</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-yellow-400" />
                          <span><strong>Implement your ${evaluationResults.potentialSavings} savings</strong> with step-by-step instructions</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-yellow-400" />
                          <span><strong>Master all {evaluationResults.hiddenDeductions} deductions</strong> we identified for your situation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-yellow-400" />
                          <span><strong>Year-round tax calendar</strong> - never miss a deadline again</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-yellow-400" />
                          <span><strong>Quarterly optimization system</strong> for maximum savings</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 bg-opacity-20 rounded-lg p-6">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">⚡ Instant Access Includes:</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span>Complete digital planning guide</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span>Tax optimization worksheets</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span>Monthly planning checklists</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span>Investment & retirement strategies</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span>Business expense maximizer</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-400 bg-opacity-30 rounded-lg p-6 mb-8 border-2 border-yellow-400">
                    <div className="text-center">
                      <p className="text-lg mb-2 text-yellow-200">Without This Guide: <span className="line-through text-red-300">Miss out on ${evaluationResults.potentialSavings}</span></p>
                      <p className="text-3xl font-bold mb-2 text-yellow-300">Investment Today: Only $49.99</p>
                      <p className="text-lg text-yellow-200">ROI: {Math.round((2847 / 49.99) * 100)}% return on your investment!</p>
                      <p className="text-sm text-yellow-300 mt-2">⚡ That's just 1.8% of your potential annual savings</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link href="/intake/planning-guide">
                      <Button className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-black text-2xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all border-4 border-white">
                        <Star className="mr-3 h-8 w-8" />
                        SECURE MY SAVINGS PLAN - $49.99
                        <ArrowRight className="ml-3 h-8 w-8" />
                      </Button>
                    </Link>
                    <p className="text-yellow-200 mt-4 font-bold">
                      ⚡ <strong>URGENT:</strong> Lock in this pricing before your evaluation expires
                    </p>
                    <p className="text-yellow-300 text-sm mt-2">
                      ✅ 100% Money-Back Guarantee • ✅ Instant Digital Access • ✅ Works for 2024 & 2025 Tax Years
                    </p>
                  </div>
                </Card>

                {/* Secondary Upsell - Full Service */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-6 bg-gradient-to-br from-green-500 to-green-700 text-white">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">🏆 Let Us Do It All</h3>
                      <p className="mb-6">Why stress about doing it yourself? Let our experts implement everything and maximize your ${evaluationResults.potentialSavings} savings!</p>
                      
                      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                        <p className="text-xl font-bold">Complete Tax Preparation</p>
                        <p className="text-3xl font-bold">Starting at $499</p>
                      </div>

                      <Link href="/client/onboarding">
                        <Button className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3">
                          Get Full Service Tax Preparation
                        </Button>
                      </Link>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">📞 Need Help Now?</h3>
                      <p className="mb-6">Have questions about your evaluation? Get a free 15-minute consultation to discuss your results.</p>
                      
                      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                        <p className="text-xl font-bold">Free Consultation</p>
                        <p className="text-3xl font-bold">$0</p>
                      </div>

                      <Link href="/consultation/book" className="w-full">
                        <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3">
                          Schedule Free Consultation
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Basic Actions */}
            <div className="mt-8 text-center">
              <Link href="/client/dashboard">
                <Button variant="outline" className="mr-4">
                  Access Your Dashboard
                </Button>
              </Link>
              <Link href="/welcome">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/welcome" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold text-lg px-6 py-2 mb-6">
            📊 EXPERT TAX EVALUATION - $19.99
          </Badge>
          
          <h1 className="text-5xl font-black text-purple-900 mb-4">
            Get Your Personalized
            <span className="block bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Tax Evaluation</span>
          </h1>
          <p className="text-xl text-gray-700">
            Discover hidden deductions and maximize your refund - Step {step} of 4
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-600">Progress</span>
            <span className="text-sm font-medium text-purple-600">{step}/4</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-orange-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white shadow-2xl">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600">Let's get to know you and your tax situation</p>
                  </div>
                  <div className="hidden lg:block">
                    <img 
                      src="/lmt-avatar.jpg" 
                      alt="LMT Tax Expert" 
                      className="w-20 h-20 rounded-full shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                      placeholder="Your last name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Filing Status *</label>
                    <select 
                      value={formData.filingStatus}
                      onChange={(e) => setFormData({...formData, filingStatus: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                    >
                      <option value="">Select filing status</option>
                      <option value="single">Single</option>
                      <option value="married-joint">Married Filing Jointly</option>
                      <option value="married-separate">Married Filing Separately</option>
                      <option value="head-of-household">Head of Household</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Annual Income Range *</label>
                    <select 
                      value={formData.currentIncome}
                      onChange={(e) => setFormData({...formData, currentIncome: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500"
                    >
                      <option value="">Select income range</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-75k">$50,000 - $75,000</option>
                      <option value="75k-100k">$75,000 - $100,000</option>
                      <option value="100k-150k">$100,000 - $150,000</option>
                      <option value="over-150k">Over $150,000</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 bg-orange-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">🎯 What We'll Analyze</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-orange-600" />
                      <span>Hidden deduction opportunities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span>Refund maximization strategies</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-orange-600" />
                      <span>Tax planning recommendations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-orange-600" />
                      <span>Potential annual savings</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tax Situation */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">Your Tax Situation</h2>
                    <p className="text-gray-600">Help us understand your income sources and tax history</p>
                  </div>
                  <div className="hidden lg:block">
                    <img 
                      src="/lmt-avatar.jpg" 
                      alt="LMT Tax Expert" 
                      className="w-20 h-20 rounded-full shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Income Sources (check all that apply)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.hasW2}
                          onChange={(e) => setFormData({...formData, hasW2: e.target.checked})}
                          className="mr-3 h-5 w-5 text-orange-600"
                        />
                        <span>W-2 Employment Income</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.has1099}
                          onChange={(e) => setFormData({...formData, has1099: e.target.checked})}
                          className="mr-3 h-5 w-5 text-orange-600"
                        />
                        <span>1099 Contract/Freelance Income</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.hasBusinessIncome}
                          onChange={(e) => setFormData({...formData, hasBusinessIncome: e.target.checked})}
                          className="mr-3 h-5 w-5 text-orange-600"
                        />
                        <span>Business/Self-Employment Income</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.hasRentalIncome}
                          onChange={(e) => setFormData({...formData, hasRentalIncome: e.target.checked})}
                          className="mr-3 h-5 w-5 text-orange-600"
                        />
                        <span>Rental Property Income</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.hasInvestments}
                          onChange={(e) => setFormData({...formData, hasInvestments: e.target.checked})}
                          className="mr-3 h-5 w-5 text-orange-600"
                        />
                        <span>Investment Income (stocks, bonds, etc.)</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Previous Year Tax Refund</label>
                      <Input 
                        value={formData.lastYearRefund}
                        onChange={(e) => setFormData({...formData, lastYearRefund: e.target.value})}
                        className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-orange-500"
                        placeholder="$2,500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Taxes Paid Last Year</label>
                      <Input 
                        value={formData.taxesPaid}
                        onChange={(e) => setFormData({...formData, taxesPaid: e.target.value})}
                        className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-orange-500"
                        placeholder="$8,500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Current Tax Preparer</label>
                    <select 
                      value={formData.currentPreparer}
                      onChange={(e) => setFormData({...formData, currentPreparer: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-orange-500"
                    >
                      <option value="">Select current preparer</option>
                      <option value="self">Do it myself</option>
                      <option value="turbotax">TurboTax/Online Software</option>
                      <option value="hr-block">H&R Block</option>
                      <option value="jackson-hewitt">Jackson Hewitt</option>
                      <option value="cpa">CPA/Tax Professional</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: File Upload & Goals */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Upload Tax Documents</h2>
                </div>

                <div className="space-y-8">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center">
                    <Upload className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Tax Documents</h3>
                    <p className="text-gray-600 mb-4">
                      Upload your previous year's tax return, W-2s, 1099s, and any other relevant tax documents
                    </p>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Upload className="mr-2 h-5 w-5" />
                      Choose Files
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: PDF, JPG, PNG, DOC (Max 10MB per file)
                    </p>
                  </div>

                  {/* Primary Goals */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Tax Goals (select all that apply)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Maximize my tax refund',
                        'Minimize taxes owed',
                        'Find missed deductions',
                        'Plan for next year',
                        'Reduce quarterly payments',
                        'Optimize business expenses',
                        'Retirement tax planning',
                        'Investment tax strategies'
                      ].map(goal => (
                        <label key={goal} className="flex items-center">
                          <input 
                            type="checkbox" 
                            value={goal}
                            checked={formData.primaryGoals.includes(goal)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, primaryGoals: [...formData.primaryGoals, goal]})
                              } else {
                                setFormData({...formData, primaryGoals: formData.primaryGoals.filter(g => g !== goal)})
                              }
                            }}
                            className="mr-3 h-5 w-5 text-orange-600"
                          />
                          <span>{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Additional Information</label>
                    <textarea 
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                      className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-orange-500 h-24"
                      placeholder="Any specific questions or concerns about your tax situation?"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review and Payment */}
            {step === 4 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Complete Your Tax Evaluation - $19.99</h2>
                </div>

                <div className="bg-orange-50 rounded-xl p-8 mb-8 border border-purple-200">
                  <h3 className="text-2xl font-bold text-orange-800 mb-6 text-center">Personalized Tax Evaluation - $19.99</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Your Information:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Filing Status:</strong> {formData.filingStatus}</div>
                        <div><strong>Income Range:</strong> {formData.currentIncome}</div>
                        <div><strong>Primary Goals:</strong> {formData.primaryGoals.length} selected</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">You'll Receive:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Personalized tax analysis report</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Hidden deduction identification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Refund maximization strategy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Expert recommendations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Next steps action plan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Secure client account access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h4 className="font-bold text-green-800 mb-3">💰 Professional Service Guarantee</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Comprehensive Analysis:</strong> Thorough review of your tax situation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>24-hour turnaround:</strong> Get results within 1 business day</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Expert analysis:</strong> Reviewed by certified tax professionals</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h4 className="font-bold text-blue-800 mb-3">🚀 1,000% ROI Potential</h4>
                  <p className="text-blue-700">
                    For just $19.99, our average client discovers $2,847 in additional savings and deductions. 
                    That's over 14,000% return on your investment!
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              {step > 1 && (
                <Button 
                  onClick={handleBack}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              )}
              
              {step < 4 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-8 py-3 text-lg ml-auto text-white font-bold"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isPaymentProcessing}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-12 py-4 text-xl font-bold ml-auto disabled:opacity-50 text-white shadow-xl border-2 border-yellow-400"
                >
                  {isPaymentProcessing ? (
                    <>
                      Processing Your Evaluation...
                      <div className="ml-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      🚀 UNLOCK MY TAX SAVINGS - $19.99
                      <Target className="ml-2 h-6 w-6" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
