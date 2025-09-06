
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
  Calculator, 
  Phone, 
  Building2,
  DollarSign,
  FileText,
  CheckCircle,
  Users,
  BarChart3,
  Clock
} from 'lucide-react'

export default function BookkeepingIntakePage() {
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
    industryType: '',
    yearEstablished: '',
    
    // Current Bookkeeping Status
    currentBookkeeper: false,
    bookkeepingSoftware: '',
    lastBooksUpdated: '',
    bankAccounts: '',
    creditCards: '',
    
    // Service Needs
    monthlyRevenue: '',
    monthlyTransactions: '',
    employees: '',
    
    // Service Selection
    serviceLevel: 'standard',
    additionalServices: [] as string[],
    startDate: '',
    
    // Specific Needs
    priorities: [] as string[],
    currentChallenges: '',
    additionalNotes: ''
  })

  const steps = [
    { title: 'Business Owner', icon: Users },
    { title: 'Business Info', icon: Building2 },
    { title: 'Current Status', icon: FileText },
    { title: 'Service Setup', icon: CheckCircle }
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to Lawson Mobile Tax!</h1>
                <p className="text-xl text-gray-700">
                  Your payment has been processed and your bookkeeping client account has been created.
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">What Happens Next for Your Bookkeeping?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>A bookkeeping specialist will contact you within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>QuickBooks setup and training session scheduled</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Monthly financial statements and reconciliation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Direct access to your financial dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/client/dashboard" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                    Access Your Bookkeeping Dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/client/onboarding" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Selection
          </Link>
          
          <Badge className="bg-blue-600 text-white font-bold text-lg px-6 py-2 mb-6">
            📊 BOOKKEEPING SERVICE - $200/MONTH
          </Badge>
          
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Professional Bookkeeping
            <span className="block text-blue-600">Service Setup</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional monthly bookkeeping and financial management. 
            <strong className="text-blue-600">Save $2,400/month</strong> compared to hiring in-house.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  step > index + 1 ? 'bg-blue-600 text-white' : 
                  step === index + 1 ? 'bg-blue-600 text-white' : 
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
                    step >= index + 1 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${
                    step > index + 1 ? 'bg-blue-600' : 'bg-gray-300'
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
                      placeholder="Sarah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="sarah@mybusiness.com"
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

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Professional Bookkeeping Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>Monthly Financial Reports</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>QuickBooks Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>Bank Reconciliation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>Year-Round Tax Planning</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Name *</label>
                    <Input
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="My Business LLC"
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
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">EIN (Tax ID)</label>
                    <Input
                      value={formData.ein}
                      onChange={(e) => setFormData({...formData, ein: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="12-3456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Year Established</label>
                    <Input
                      type="number"
                      value={formData.yearEstablished}
                      onChange={(e) => setFormData({...formData, yearEstablished: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="2022"
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
                    <option value="e_commerce">E-Commerce</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Revenue Range</label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Range</option>
                      <option value="under_5k">Under $5,000</option>
                      <option value="5k_15k">$5,000 - $15,000</option>
                      <option value="15k_30k">$15,000 - $30,000</option>
                      <option value="30k_50k">$30,000 - $50,000</option>
                      <option value="over_50k">Over $50,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Transactions</label>
                    <select
                      value={formData.monthlyTransactions}
                      onChange={(e) => setFormData({...formData, monthlyTransactions: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Range</option>
                      <option value="under_50">Under 50</option>
                      <option value="50_100">50-100</option>
                      <option value="100_200">100-200</option>
                      <option value="200_500">200-500</option>
                      <option value="over_500">Over 500</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Employees</label>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({...formData, employees: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Count</option>
                      <option value="0">0 (Just Owner)</option>
                      <option value="1-5">1-5 Employees</option>
                      <option value="6-15">6-15 Employees</option>
                      <option value="over_15">Over 15 Employees</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Current Bookkeeping Status */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Bookkeeping Status</h2>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    Do you currently have a bookkeeper or accountant? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      !formData.currentBookkeeper ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="currentBookkeeper"
                        checked={!formData.currentBookkeeper}
                        onChange={() => setFormData({...formData, currentBookkeeper: false})}
                        className="sr-only"
                      />
                      <div className="text-center font-semibold">No - I need help!</div>
                    </label>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      formData.currentBookkeeper ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="currentBookkeeper"
                        checked={formData.currentBookkeeper}
                        onChange={() => setFormData({...formData, currentBookkeeper: true})}
                        className="sr-only"
                      />
                      <div className="text-center font-semibold">Yes - looking to switch</div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Bookkeeping Software</label>
                  <select
                    value={formData.bookkeepingSoftware}
                    onChange={(e) => setFormData({...formData, bookkeepingSoftware: e.target.value})}
                    className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                  >
                    <option value="">Select Software (if any)</option>
                    <option value="none">No software currently</option>
                    <option value="quickbooks_online">QuickBooks Online</option>
                    <option value="quickbooks_desktop">QuickBooks Desktop</option>
                    <option value="xero">Xero</option>
                    <option value="freshbooks">FreshBooks</option>
                    <option value="wave">Wave</option>
                    <option value="excel">Excel/Spreadsheets</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">When were your books last updated?</label>
                  <select
                    value={formData.lastBooksUpdated}
                    onChange={(e) => setFormData({...formData, lastBooksUpdated: e.target.value})}
                    className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                  >
                    <option value="">Select timeframe</option>
                    <option value="current">Current/Up to date</option>
                    <option value="1_month">1 month ago</option>
                    <option value="2_3_months">2-3 months ago</option>
                    <option value="6_months">6 months ago</option>
                    <option value="over_year">Over a year ago</option>
                    <option value="never">Never been done</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Bank Accounts</label>
                    <select
                      value={formData.bankAccounts}
                      onChange={(e) => setFormData({...formData, bankAccounts: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select number</option>
                      <option value="1">1 Account</option>
                      <option value="2">2 Accounts</option>
                      <option value="3_5">3-5 Accounts</option>
                      <option value="over_5">Over 5 Accounts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Credit Cards</label>
                    <select
                      value={formData.creditCards}
                      onChange={(e) => setFormData({...formData, creditCards: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select number</option>
                      <option value="0">0 Credit Cards</option>
                      <option value="1">1 Credit Card</option>
                      <option value="2">2 Credit Cards</option>
                      <option value="3_5">3-5 Credit Cards</option>
                      <option value="over_5">Over 5 Credit Cards</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-gray-700 mb-4">What are your biggest bookkeeping challenges? (Check all that apply)</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Keeping up with daily transactions',
                      'Bank reconciliation',
                      'Organizing receipts and expenses',
                      'Understanding financial reports',
                      'Tax preparation and planning',
                      'Cash flow management',
                      'Payroll and employee expenses',
                      'Inventory tracking'
                    ].map((challenge, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                        />
                        <span className="text-sm font-medium">{challenge}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Service Setup */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Selection & Setup</h2>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Bookkeeping Service Level</label>
                  <div className="grid gap-6">
                    <label className={`p-8 border-2 rounded-lg cursor-pointer ${
                      formData.serviceLevel === 'standard' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="serviceLevel"
                        value="standard"
                        checked={formData.serviceLevel === 'standard'}
                        onChange={(e) => setFormData({...formData, serviceLevel: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">Standard Bookkeeping - $200/month</div>
                          <div className="font-bold mb-2">Essential Monthly Bookkeeping</div>
                          <div className="text-gray-600">
                            • Monthly transaction categorization<br/>
                            • Bank account reconciliation<br/>
                            • Basic financial reports (P&L, Balance Sheet)<br/>
                            • QuickBooks setup and maintenance<br/>
                            • Email support
                          </div>
                        </div>
                        <div className="text-6xl font-black text-blue-600">$200</div>
                      </div>
                    </label>
                    
                    <label className={`p-8 border-2 rounded-lg cursor-pointer ${
                      formData.serviceLevel === 'premium' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="serviceLevel"
                        value="premium"
                        checked={formData.serviceLevel === 'premium'}
                        onChange={(e) => setFormData({...formData, serviceLevel: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-600 mb-2">Premium Bookkeeping - $350/month</div>
                          <div className="font-bold mb-2">Complete Financial Management</div>
                          <div className="text-gray-600">
                            • Everything in Standard Service<br/>
                            • Advanced financial reporting & analysis<br/>
                            • Cash flow forecasting<br/>
                            • Monthly financial consultation call<br/>
                            • Accounts payable/receivable management<br/>
                            • Priority support & dedicated bookkeeper
                          </div>
                        </div>
                        <div className="text-6xl font-black text-green-600">$350</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Additional Services (Optional)</label>
                  <div className="grid gap-4">
                    <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-5 w-5 mt-1"
                        checked={formData.additionalServices.includes('cleanup')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, additionalServices: [...formData.additionalServices, 'cleanup']})
                          } else {
                            setFormData({...formData, additionalServices: formData.additionalServices.filter(s => s !== 'cleanup')})
                          }
                        }}
                      />
                      <div>
                        <div className="font-semibold">Bookkeeping Cleanup (One-time: $300-1500)</div>
                        <div className="text-sm text-gray-600">
                          Clean up and organize historical books (price varies by complexity)
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-5 w-5 mt-1"
                        checked={formData.additionalServices.includes('payroll')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, additionalServices: [...formData.additionalServices, 'payroll']})
                          } else {
                            setFormData({...formData, additionalServices: formData.additionalServices.filter(s => s !== 'payroll')})
                          }
                        }}
                      />
                      <div>
                        <div className="font-semibold">Payroll Processing (+$150/month)</div>
                        <div className="text-sm text-gray-600">
                          Complete payroll processing, tax deposits, and reporting
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-5 w-5 mt-1"
                        checked={formData.additionalServices.includes('tax_prep')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, additionalServices: [...formData.additionalServices, 'tax_prep']})
                          } else {
                            setFormData({...formData, additionalServices: formData.additionalServices.filter(s => s !== 'tax_prep')})
                          }
                        }}
                      />
                      <div>
                        <div className="font-semibold">Business Tax Return Preparation ($350+)</div>
                        <div className="text-sm text-gray-600">
                          Annual business tax return preparation (pricing based on complexity)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Service Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <p className="font-bold text-gray-700 mb-4">What are your top priorities? (Check all that apply)</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Get current with bookkeeping',
                      'Understand my financial position',
                      'Improve cash flow management',
                      'Prepare for tax season',
                      'Make better business decisions',
                      'Save time on bookkeeping tasks'
                    ].map((priority, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={formData.priorities.includes(priority)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({...formData, priorities: [...formData.priorities, priority]})
                            } else {
                              setFormData({...formData, priorities: formData.priorities.filter(p => p !== priority)})
                            }
                          }}
                        />
                        <span className="text-sm font-medium">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes & Questions</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    className="w-full h-24 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Tell us about any specific needs, questions, or concerns about your bookkeeping..."
                  />
                </div>

                {/* Service Summary */}
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-6">Service Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Monthly Service:</span>
                      <span className="text-blue-600 font-bold">
                        {formData.serviceLevel === 'standard' ? 'Standard ($200/month)' : 'Premium ($350/month)'}
                      </span>
                    </div>
                    {formData.additionalServices.includes('payroll') && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Payroll Processing:</span>
                        <span className="text-blue-600 font-bold">+$150/month</span>
                      </div>
                    )}
                    {formData.additionalServices.includes('cleanup') && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Initial Cleanup:</span>
                        <span className="text-blue-600 font-bold">$300-1500 (one-time)</span>
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Monthly Total:</span>
                        <span className="text-blue-600">
                          ${formData.serviceLevel === 'standard' ? 200 : 350}{formData.additionalServices.includes('payroll') ? '+150' : ''}/month
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-green-100 rounded-lg p-4">
                    <div className="font-bold text-green-800 mb-2">You Save Compared To:</div>
                    <div className="text-green-700 text-sm">
                      • In-house bookkeeper: $2,400+/month<br/>
                      • CPA firm: $500-800/month<br/>
                      • Your time value: Priceless!
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
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg ml-auto"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isPaymentProcessing}
                  className="bg-blue-600 hover:bg-blue-700 px-12 py-4 text-xl font-bold ml-auto disabled:opacity-50"
                >
                  {isPaymentProcessing ? (
                    <>
                      Processing Payment...
                      <div className="ml-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      Pay $199 & Create Account
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
