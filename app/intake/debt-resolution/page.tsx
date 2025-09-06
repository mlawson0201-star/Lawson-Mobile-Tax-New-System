
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
  Shield, 
  Phone, 
  Mail, 
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText
} from 'lucide-react'

export default function DebtResolutionIntakePage() {
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
    address: '',
    city: '',
    state: '',
    zip: '',
    
    // Tax Debt Info
    debtAmount: '',
    taxYears: '',
    irsCommunications: '',
    currentStatus: '',
    paymentAbility: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    
    // Additional Details
    hasAssets: false,
    hasLiens: false,
    hasLevies: false,
    hasWageGarnishment: false,
    previousFilings: '',
    urgencyLevel: '',
    additionalNotes: ''
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
      // 3. Send welcome email with credentials
      // 4. Schedule urgent consultation
      
    } catch (error) {
      console.error('Payment failed:', error)
      setIsPaymentProcessing(false)
      alert('Payment failed. Please try again.')
    }
  }

  // Show account created success screen
  if (accountCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Help is On The Way!</h1>
                <p className="text-xl text-gray-700">
                  Your tax debt resolution consultation has been scheduled and your client account created.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-red-800 mb-4">Your Login Credentials</h3>
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
                <p className="text-sm text-red-700 mt-4">
                  <strong>Important:</strong> Save these credentials securely. You can change your password once you log in.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-red-800 mb-4">What Happens Next - URGENT</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span><strong>Within 2 hours:</strong> Tax debt specialist will contact you</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span><strong>Same day:</strong> Complete debt analysis and strategy review</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span><strong>24-48 hours:</strong> IRS communication on your behalf begins</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span><strong>Ongoing:</strong> Full representation and resolution process</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/client/dashboard" className="flex-1">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3">
                    Access Your Debt Resolution Dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/client/onboarding" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Selection
          </Link>
          
          <Badge className="bg-red-600 text-white font-bold text-lg px-6 py-2 mb-6">
            🚨 TAX DEBT RESOLUTION - $299 CONSULTATION RETAINER
          </Badge>
          
          <h1 className="text-5xl font-black text-red-900 mb-4">
            Tax Debt Resolution
            <span className="block text-red-600">$299 Consultation Retainer</span>
          </h1>
          <p className="text-xl text-gray-600">
            Get immediate help with IRS debt - Step {step} of 4
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-red-600">Progress</span>
            <span className="text-sm font-medium text-red-600">{step}/4</span>
          </div>
          <div className="w-full bg-red-200 rounded-full h-3">
            <div 
              className="bg-red-600 h-3 rounded-full transition-all duration-300" 
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
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="Your last name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Current Address *</label>
                    <Input 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="Street address"
                    />
                  </div>
                </div>

                <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Immediate Action Required</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Stop IRS collection actions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-red-600" />
                      <span>2-hour response guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tax Debt Information */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Tax Debt Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Tax Debt Amount *</label>
                    <select 
                      value={formData.debtAmount}
                      onChange={(e) => setFormData({...formData, debtAmount: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                    >
                      <option value="">Select amount range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                      <option value="unknown">Unknown/Not Sure</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tax Years Involved *</label>
                    <Input 
                      value={formData.taxYears}
                      onChange={(e) => setFormData({...formData, taxYears: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="e.g., 2020, 2021, 2022"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Current IRS Status *</label>
                    <select 
                      value={formData.currentStatus}
                      onChange={(e) => setFormData({...formData, currentStatus: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                    >
                      <option value="">Select current status</option>
                      <option value="notices-only">Receiving IRS notices only</option>
                      <option value="payment-plan">On existing payment plan</option>
                      <option value="collections">In active collections</option>
                      <option value="lien-filed">Tax lien filed</option>
                      <option value="levy-threat">Levy threatened</option>
                      <option value="wage-garnishment">Wage garnishment active</option>
                      <option value="bank-levy">Bank account levied</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Payment Ability *</label>
                    <select 
                      value={formData.paymentAbility}
                      onChange={(e) => setFormData({...formData, paymentAbility: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                    >
                      <option value="">Select payment ability</option>
                      <option value="cannot-pay">Cannot pay anything</option>
                      <option value="small-payments">Can make small payments</option>
                      <option value="payment-plan">Can handle payment plan</option>
                      <option value="lump-sum-partial">Can pay lump sum (partial)</option>
                      <option value="lump-sum-full">Can pay in full</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Current IRS Actions</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.hasLiens}
                        onChange={(e) => setFormData({...formData, hasLiens: e.target.checked})}
                        className="mr-3 h-5 w-5 text-red-600"
                      />
                      <span>Tax liens have been filed</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.hasLevies}
                        onChange={(e) => setFormData({...formData, hasLevies: e.target.checked})}
                        className="mr-3 h-5 w-5 text-red-600"
                      />
                      <span>Bank accounts or assets have been levied</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.hasWageGarnishment}
                        onChange={(e) => setFormData({...formData, hasWageGarnishment: e.target.checked})}
                        className="mr-3 h-5 w-5 text-red-600"
                      />
                      <span>Wages are being garnished</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Financial Situation</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Income (Gross)</label>
                    <Input 
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="$5,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Expenses</label>
                    <Input 
                      value={formData.monthlyExpenses}
                      onChange={(e) => setFormData({...formData, monthlyExpenses: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                      placeholder="$4,500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Urgency Level *</label>
                    <select 
                      value={formData.urgencyLevel}
                      onChange={(e) => setFormData({...formData, urgencyLevel: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500"
                    >
                      <option value="">Select urgency level</option>
                      <option value="immediate">IMMEDIATE - Collections action threatened</option>
                      <option value="urgent">URGENT - Recent IRS notices</option>
                      <option value="soon">SOON - Need to address soon</option>
                      <option value="planning">PLANNING - Proactive resolution</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Additional Information</label>
                    <textarea 
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-500 h-24"
                      placeholder="Describe your situation, any IRS notices received, deadlines, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review and Payment */}
            {step === 4 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Tax Debt Resolution - $299 Consultation Retainer</h2>
                </div>

                <div className="bg-red-50 rounded-xl p-8 mb-8 border border-red-200">
                  <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">$299 Consultation Retainer</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Your Information:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Debt Amount:</strong> {formData.debtAmount}</div>
                        <div><strong>Urgency:</strong> {formData.urgencyLevel}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Immediate Actions:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Emergency IRS intervention</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Collection action defense</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Payment plan negotiations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Offer in compromise review</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Full IRS representation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h4 className="font-bold text-green-800 mb-3">Emergency Response Guarantee</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>2-hour response:</strong> Tax debt specialist will contact you</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Same-day action:</strong> IRS communication begins immediately</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span><strong>Full representation:</strong> We handle all IRS communications</span>
                    </div>
                  </div>
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
                  className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg ml-auto"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isPaymentProcessing}
                  className="bg-red-600 hover:bg-red-700 px-12 py-4 text-xl font-bold ml-auto disabled:opacity-50"
                >
                  {isPaymentProcessing ? (
                    <>
                      Processing Payment...
                      <div className="ml-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      Secure $299 Consultation Retainer
                      <CheckCircle className="ml-2 h-6 w-6" />
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
