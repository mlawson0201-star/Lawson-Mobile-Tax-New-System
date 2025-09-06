
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
  Building2, 
  Phone, 
  Mail, 
  DollarSign,
  FileText,
  Briefcase,
  CheckCircle,
  Users,
  Calculator
} from 'lucide-react'

export default function BusinessIntakePage() {
  const [step, setStep] = useState(1)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const [formData, setFormData] = useState({
    // Business Owner Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Business Info
    businessName: '',
    entityType: '',
    ein: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    yearEstablished: '',
    industryType: '',
    
    // Financial Info
    annualRevenue: '',
    numberOfEmployees: '',
    payrollExpenses: '',
    businessExpenses: '',
    
    // Tax Situation
    previousAccountant: false,
    previousRefund: '',
    quarterlyPayments: false,
    multiState: false,
    inventory: false,
    
    // Service Selection
    serviceType: 'standard',
    additionalServices: [] as string[],
    
    // Meeting Preferences
    preferredDate: '',
    preferredTime: '',
    meetingType: 'office',
    
    additionalNotes: ''
  })

  const steps = [
    { title: 'Business Owner', icon: Users },
    { title: 'Business Details', icon: Building2 },
    { title: 'Financial Info', icon: Calculator },
    { title: 'Service & Schedule', icon: CheckCircle }
  ]

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
      // 4. Redirect to client dashboard
      
    } catch (error) {
      console.error('Payment failed:', error)
      setIsPaymentProcessing(false)
      alert('Payment failed. Please try again.')
    }
  }

  // Show account created success screen
  if (accountCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to Lawson Mobile Tax!</h1>
                <p className="text-xl text-gray-700">
                  Your payment has been processed and your business client account has been created.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Your Login Credentials</h3>
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
                <p className="text-sm text-blue-700 mt-4">
                  <strong>Important:</strong> Save these credentials securely. You can change your password once you log in.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-purple-800 mb-4">What Happens Next for Your Business?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>A business tax specialist will be assigned within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>Quarterly tax planning consultation scheduled</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>Business deduction maximization review</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span>Multi-state filing setup if applicable</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/client/dashboard" className="flex-1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3">
                    Access Your Business Dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/client/onboarding" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Selection
          </Link>
          
          {/* Upsell Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-4 mb-6 mx-auto max-w-2xl">
            <p className="text-white font-bold text-lg">
              🚀 <strong>Before You Commit:</strong> Want to see your business tax opportunities? 
              <Link href="/tax-evaluation" className="underline hover:text-yellow-200 ml-1">
                Start with our $19.99 Business Tax Evaluation
              </Link>!
            </p>
          </div>
          
          <Badge className="bg-purple-600 text-white font-bold text-lg px-6 py-2 mb-6">
            💼 BUSINESS TAX SERVICE - $1,499
          </Badge>
          
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Business Tax Service
            <span className="block text-purple-600">Intake Form</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional business tax preparation for LLCs, S-Corps, partnerships, and corporations. 
            <strong className="text-purple-600">Average client saves $8,950 annually.</strong>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  step > index + 1 ? 'bg-purple-600 text-white' : 
                  step === index + 1 ? 'bg-purple-600 text-white' : 
                  'bg-gray-300 text-gray-600'
                }`}>
                  {step > index + 1 ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <stepItem.icon className="h-6 w-6" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className={`font-semibold ${
                    step >= index + 1 ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${
                    step > index + 1 ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-2xl">
            {/* Step 1: Business Owner Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Owner Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="john@business.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">Business Tax Expertise</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                      <span>LLC & S-Corp Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                      <span>Quarterly Tax Planning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                      <span>Multi-State Filing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                      <span>Business Deduction Maximization</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Name *</label>
                    <Input
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="ABC Company LLC"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Entity Type *</label>
                    <select
                      value={formData.entityType}
                      onChange={(e) => setFormData({...formData, entityType: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Entity Type</option>
                      <option value="sole_proprietorship">Sole Proprietorship</option>
                      <option value="llc">LLC (Single Member)</option>
                      <option value="llc_multi">LLC (Multi-Member)</option>
                      <option value="s_corp">S-Corporation</option>
                      <option value="c_corp">C-Corporation</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">EIN (Tax ID) *</label>
                    <Input
                      value={formData.ein}
                      onChange={(e) => setFormData({...formData, ein: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="12-3456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Year Established *</label>
                    <Input
                      type="number"
                      value={formData.yearEstablished}
                      onChange={(e) => setFormData({...formData, yearEstablished: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="2020"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Industry Type *</label>
                  <select
                    value={formData.industryType}
                    onChange={(e) => setFormData({...formData, industryType: e.target.value})}
                    className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                  >
                    <option value="">Select Industry</option>
                    <option value="retail">Retail</option>
                    <option value="restaurant">Restaurant/Food Service</option>
                    <option value="construction">Construction</option>
                    <option value="professional_services">Professional Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="technology">Technology</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="transportation">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Business Address *</label>
                  <Input
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                    className="h-12 text-lg"
                    placeholder="123 Business Ave"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                    <Input
                      value={formData.businessCity}
                      onChange={(e) => setFormData({...formData, businessCity: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="Atlanta"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                    <select
                      value={formData.businessState}
                      onChange={(e) => setFormData({...formData, businessState: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="GA">Georgia</option>
                      <option value="FL">Florida</option>
                      <option value="TX">Texas</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code *</label>
                    <Input
                      value={formData.businessZip}
                      onChange={(e) => setFormData({...formData, businessZip: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="30309"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Financial Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Annual Revenue *</label>
                    <select
                      value={formData.annualRevenue}
                      onChange={(e) => setFormData({...formData, annualRevenue: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Revenue Range</option>
                      <option value="under_50k">Under $50,000</option>
                      <option value="50k_100k">$50,000 - $100,000</option>
                      <option value="100k_250k">$100,000 - $250,000</option>
                      <option value="250k_500k">$250,000 - $500,000</option>
                      <option value="500k_1m">$500,000 - $1M</option>
                      <option value="over_1m">Over $1M</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Employees</label>
                    <select
                      value={formData.numberOfEmployees}
                      onChange={(e) => setFormData({...formData, numberOfEmployees: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Employee Count</option>
                      <option value="0">0 (Just Owner)</option>
                      <option value="1-5">1-5 Employees</option>
                      <option value="6-10">6-10 Employees</option>
                      <option value="11-25">11-25 Employees</option>
                      <option value="26-50">26-50 Employees</option>
                      <option value="over_50">Over 50 Employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Annual Payroll Expenses</label>
                    <Input
                      type="number"
                      value={formData.payrollExpenses}
                      onChange={(e) => setFormData({...formData, payrollExpenses: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="150000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Annual Business Expenses</label>
                    <Input
                      type="number"
                      value={formData.businessExpenses}
                      onChange={(e) => setFormData({...formData, businessExpenses: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="75000"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-bold text-gray-700 mb-4">Business Situation (Check all that apply)</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.previousAccountant}
                        onChange={(e) => setFormData({...formData, previousAccountant: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <Briefcase className="h-6 w-6 text-purple-600" />
                      <span className="font-semibold">Had previous accountant/preparer</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.quarterlyPayments}
                        onChange={(e) => setFormData({...formData, quarterlyPayments: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <Calculator className="h-6 w-6 text-green-600" />
                      <span className="font-semibold">Make quarterly tax payments</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.multiState}
                        onChange={(e) => setFormData({...formData, multiState: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <Building2 className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold">Operate in multiple states</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inventory}
                        onChange={(e) => setFormData({...formData, inventory: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <FileText className="h-6 w-6 text-orange-600" />
                      <span className="font-semibold">Maintain inventory</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Previous Year Tax Refund/Payment</label>
                  <Input
                    type="number"
                    value={formData.previousRefund}
                    onChange={(e) => setFormData({...formData, previousRefund: e.target.value})}
                    className="h-12 text-lg"
                    placeholder="Enter amount (positive for refund, negative for payment owed)"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Service Selection & Schedule */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Selection & Schedule</h2>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Business Tax Service Level</label>
                  <div className="grid gap-6">
                    <label className={`p-8 border-2 rounded-lg cursor-pointer ${
                      formData.serviceType === 'standard' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="serviceType"
                        value="standard"
                        checked={formData.serviceType === 'standard'}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-purple-600 mb-2">Standard Business Service - $350</div>
                          <div className="font-bold mb-2">Complete Business Tax Return</div>
                          <div className="text-gray-600">
                            • Business tax return preparation<br/>
                            • Basic deduction optimization<br/>
                            • Electronic filing<br/>
                            • IRS correspondence support
                          </div>
                        </div>
                        <div className="text-6xl font-black text-purple-600">$350</div>
                      </div>
                    </label>
                    
                    <label className={`p-8 border-2 rounded-lg cursor-pointer ${
                      formData.serviceType === 'premium' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="serviceType"
                        value="premium"
                        checked={formData.serviceType === 'premium'}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-600 mb-2">Premium Business Service - $750</div>
                          <div className="font-bold mb-2">Complete + Tax Planning & Consultation</div>
                          <div className="text-gray-600">
                            • Everything in Standard Service<br/>
                            • Quarterly tax planning sessions<br/>
                            • Business structure optimization<br/>
                            • Year-round tax strategy consulting<br/>
                            • Priority support & faster processing
                          </div>
                        </div>
                        <div className="text-6xl font-black text-green-600">$750</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Additional Services (Optional)</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.additionalServices.includes('bookkeeping')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, additionalServices: [...formData.additionalServices, 'bookkeeping']})
                          } else {
                            setFormData({...formData, additionalServices: formData.additionalServices.filter(s => s !== 'bookkeeping')})
                          }
                        }}
                        className="h-5 w-5"
                      />
                      <div>
                        <div className="font-semibold">Monthly Bookkeeping (+$200/month)</div>
                        <div className="text-sm text-gray-600">Professional books & financial reports</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.additionalServices.includes('payroll')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, additionalServices: [...formData.additionalServices, 'payroll']})
                          } else {
                            setFormData({...formData, additionalServices: formData.additionalServices.filter(s => s !== 'payroll')})
                          }
                        }}
                        className="h-5 w-5"
                      />
                      <div>
                        <div className="font-semibold">Payroll Services (+$150/month)</div>
                        <div className="text-sm text-gray-600">Full payroll processing & tax deposits</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Meeting Preference</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      formData.meetingType === 'office' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="meetingType"
                        value="office"
                        checked={formData.meetingType === 'office'}
                        onChange={(e) => setFormData({...formData, meetingType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <Building2 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Our Office</div>
                      </div>
                    </label>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      formData.meetingType === 'mobile' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="meetingType"
                        value="mobile"
                        checked={formData.meetingType === 'mobile'}
                        onChange={(e) => setFormData({...formData, meetingType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Your Location (+$100)</div>
                      </div>
                    </label>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      formData.meetingType === 'virtual' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="meetingType"
                        value="virtual"
                        checked={formData.meetingType === 'virtual'}
                        onChange={(e) => setFormData({...formData, meetingType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <Phone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Virtual Meeting</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
                    <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Time</option>
                      <option value="morning">Morning (9am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 5pm)</option>
                      <option value="evening">Evening (5pm - 8pm)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    className="w-full h-24 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Any specific business tax concerns, special situations, or questions..."
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-800 mb-6">Service Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Base Service:</span>
                      <span className="text-purple-600 font-bold">
                        {formData.serviceType === 'standard' ? 'Standard ($350)' : 'Premium ($750)'}
                      </span>
                    </div>
                    {formData.meetingType === 'mobile' && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Mobile Service:</span>
                        <span className="text-purple-600 font-bold">+$100</span>
                      </div>
                    )}
                    {formData.additionalServices.includes('bookkeeping') && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Monthly Bookkeeping:</span>
                        <span className="text-purple-600 font-bold">+$200/month</span>
                      </div>
                    )}
                    {formData.additionalServices.includes('payroll') && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Payroll Services:</span>
                        <span className="text-purple-600 font-bold">+$150/month</span>
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Tax Return Total:</span>
                        <span className="text-purple-600">
                          ${formData.serviceType === 'standard' ? 350 : 750}{formData.meetingType === 'mobile' ? '+100' : ''}
                        </span>
                      </div>
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
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg ml-auto"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isPaymentProcessing}
                  className="bg-purple-600 hover:bg-purple-700 px-12 py-4 text-xl font-bold ml-auto disabled:opacity-50"
                >
                  {isPaymentProcessing ? (
                    <>
                      Processing Payment...
                      <div className="ml-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      Pay $1,499 & Create Account
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
