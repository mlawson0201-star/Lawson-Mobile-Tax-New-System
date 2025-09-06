
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
  FileText, 
  Phone, 
  Mail, 
  DollarSign,
  Target,
  TrendingUp,
  CheckCircle,
  Download,
  Star
} from 'lucide-react'

export default function PlanningGuideIntakePage() {
  const [step, setStep] = useState(1)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Financial Profile
    annualIncome: '',
    incomeType: '',
    maritalStatus: '',
    dependents: '',
    homeOwnership: '',
    retirementSavings: '',
    
    // Tax Planning Goals
    planningGoals: [] as string[],
    currentChallenges: [] as string[],
    timeHorizon: '',
    investmentExperience: '',
    riskTolerance: '',
    
    // Preferences
    deliveryMethod: 'digital',
    additionalServices: false,
    additionalNotes: ''
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsPaymentProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate temporary login credentials
      const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase()
      
      setLoginCredentials({
        email: formData.email,
        password: tempPassword
      })
      
      setAccountCreated(true)
      setIsPaymentProcessing(false)
      
      // In a real app, this would:
      // 1. Process payment via Stripe/PayPal
      // 2. Create user account in database  
      // 3. Generate personalized tax planning guide
      // 4. Send digital delivery
      
    } catch (error) {
      console.error('Payment failed:', error)
      setIsPaymentProcessing(false)
      alert('Payment failed. Please try again.')
    }
  }

  // Show account created success screen
  if (accountCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Your Tax Planning Guide is Ready!</h1>
                <p className="text-xl text-gray-700">
                  Your personalized tax planning guide has been created and your account is active.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Your Login Credentials</h3>
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
                <p className="text-sm text-yellow-700 mt-4">
                  <strong>Important:</strong> Save these credentials securely. You can change your password once you log in.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Your Tax Planning Guide Includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                    <span><strong>Personalized tax strategy</strong> based on your financial profile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                    <span><strong>Comprehensive deduction checklist</strong> for maximum savings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                    <span><strong>Year-round optimization tips</strong> and quarterly reminders</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                    <span><strong>Investment tax strategies</strong> for your situation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                    <span><strong>Retirement planning guidance</strong> with tax benefits</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-green-800 mb-3">Instant Access Available</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-green-600" />
                    <span>Download your guide immediately from your dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span>Emailed copy sent to your registered email address</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-green-600" />
                    <span>Lifetime access to your personalized guide</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/client/dashboard" className="flex-1">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3">
                    Access Your Tax Planning Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/welcome">
                  <Button variant="outline" className="px-8 py-3">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/client/onboarding" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Selection
          </Link>
          
          <Badge className="bg-yellow-600 text-white font-bold text-lg px-6 py-2 mb-6">
            📋 PREMIUM TAX PLANNING GUIDE - $49.99
          </Badge>
          
          <h1 className="text-5xl font-black text-yellow-900 mb-4">
            Personalized Tax Planning
            <span className="block text-yellow-600">Strategy Guide</span>
          </h1>
          <p className="text-xl text-gray-600">
            Get your custom tax optimization plan - Step {step} of 3
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-yellow-600">Progress</span>
            <span className="text-sm font-medium text-yellow-600">{step}/3</span>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-3">
            <div 
              className="bg-yellow-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white shadow-2xl">
            {/* Step 1: Personal & Financial Information */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Financial Profile</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      placeholder="Your last name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Annual Income Range *</label>
                    <select 
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                    >
                      <option value="">Select income range</option>
                      <option value="under-50k">Under $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-200k">$100,000 - $200,000</option>
                      <option value="200k-500k">$200,000 - $500,000</option>
                      <option value="over-500k">Over $500,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Income Type *</label>
                    <select 
                      value={formData.incomeType}
                      onChange={(e) => setFormData({...formData, incomeType: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                    >
                      <option value="">Select primary income type</option>
                      <option value="w2-employee">W-2 Employee</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="business-owner">Business Owner</option>
                      <option value="investor">Investor/Rental Income</option>
                      <option value="retired">Retired</option>
                      <option value="mixed">Mixed Income Sources</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Marital Status</label>
                    <select 
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married-joint">Married Filing Jointly</option>
                      <option value="married-separate">Married Filing Separately</option>
                      <option value="head-of-household">Head of Household</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Dependents</label>
                    <Input 
                      value={formData.dependents}
                      onChange={(e) => setFormData({...formData, dependents: e.target.value})}
                      className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">💡 What You'll Get</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-yellow-600" />
                      <span>Custom tax optimization strategy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-yellow-600" />
                      <span>Personalized deduction checklist</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tax Planning Goals */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Planning Goals & Preferences</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Tax Planning Goals (select all that apply)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Minimize current year taxes',
                        'Maximize retirement savings',
                        'Optimize business deductions',
                        'Plan for investment taxes',
                        'Estate tax planning',
                        'Education tax benefits',
                        'Real estate tax strategies',
                        'Charitable giving optimization'
                      ].map(goal => (
                        <label key={goal} className="flex items-center">
                          <input 
                            type="checkbox" 
                            value={goal}
                            checked={formData.planningGoals.includes(goal)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, planningGoals: [...formData.planningGoals, goal]})
                              } else {
                                setFormData({...formData, planningGoals: formData.planningGoals.filter(g => g !== goal)})
                              }
                            }}
                            className="mr-3 h-5 w-5 text-yellow-600"
                          />
                          <span>{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Current Tax Challenges (select all that apply)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'High tax liability',
                        'Missing deductions',
                        'Complex investment income',
                        'Self-employment taxes',
                        'Multiple income sources',
                        'State tax issues',
                        'Retirement distributions',
                        'Business tax complications'
                      ].map(challenge => (
                        <label key={challenge} className="flex items-center">
                          <input 
                            type="checkbox" 
                            value={challenge}
                            checked={formData.currentChallenges.includes(challenge)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, currentChallenges: [...formData.currentChallenges, challenge]})
                              } else {
                                setFormData({...formData, currentChallenges: formData.currentChallenges.filter(c => c !== challenge)})
                              }
                            }}
                            className="mr-3 h-5 w-5 text-yellow-600"
                          />
                          <span>{challenge}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Planning Time Horizon</label>
                      <select 
                        value={formData.timeHorizon}
                        onChange={(e) => setFormData({...formData, timeHorizon: e.target.value})}
                        className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      >
                        <option value="">Select time horizon</option>
                        <option value="immediate">Immediate (this year)</option>
                        <option value="short-term">Short-term (1-3 years)</option>
                        <option value="medium-term">Medium-term (3-10 years)</option>
                        <option value="long-term">Long-term (10+ years)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Investment Experience</label>
                      <select 
                        value={formData.investmentExperience}
                        onChange={(e) => setFormData({...formData, investmentExperience: e.target.value})}
                        className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500"
                      >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="professional">Professional Investor</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review and Payment */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Your Personalized Guide - $49.99</h2>
                </div>

                <div className="bg-yellow-50 rounded-xl p-8 mb-8 border border-yellow-200">
                  <h3 className="text-2xl font-bold text-yellow-800 mb-6 text-center">Premium Tax Planning Guide - $49.99</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Your Profile:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Income Range:</strong> {formData.annualIncome}</div>
                        <div><strong>Income Type:</strong> {formData.incomeType}</div>
                        <div><strong>Goals:</strong> {formData.planningGoals.length} selected</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Your Guide Will Include:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Custom tax optimization strategy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Personalized deduction checklist</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Year-round optimization tips</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Investment tax strategies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Quarterly planning calendar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Expert recommendations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h4 className="font-bold text-green-800 mb-3">Value Guarantee</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Instant download:</strong> Get your guide immediately after purchase</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Lifetime access:</strong> Keep your guide forever with updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Save $2,000+:</strong> Typical annual tax savings from our strategies</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h4 className="font-bold text-blue-800 mb-3">💰 40x Return on Investment</h4>
                  <p className="text-blue-700">
                    For just $49.99, most clients save over $2,000 annually using our personalized tax strategies. 
                    That's a 4,000% return on your investment in the first year alone!
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
              
              {step < 3 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-yellow-600 hover:bg-yellow-700 px-8 py-3 text-lg ml-auto"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isPaymentProcessing}
                  className="bg-yellow-600 hover:bg-yellow-700 px-12 py-4 text-xl font-bold ml-auto disabled:opacity-50"
                >
                  {isPaymentProcessing ? (
                    <>
                      Processing Payment...
                      <div className="ml-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      Pay $49.99 & Get Your Guide
                      <Download className="ml-2 h-6 w-6" />
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
