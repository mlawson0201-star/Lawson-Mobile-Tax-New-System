
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
  Users, 
  Phone, 
  Mail, 
  DollarSign,
  Home,
  Briefcase,
  Heart,
  CheckCircle,
  FileText
} from 'lucide-react'

export default function IndividualIntakePage() {
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
    
    // Tax Info
    filingStatus: '',
    income: '',
    dependents: '',
    previousRefund: '',
    homeowner: false,
    businessOwner: false,
    investments: false,
    retirement: false,
    medical: '',
    charity: '',
    
    // Service Preferences
    serviceType: 'standard',
    mobileService: false,
    preferredDate: '',
    preferredTime: '',
    
    // Special Situations
    specialSituations: [] as string[],
    additionalNotes: ''
  })

  const steps = [
    { title: 'Personal Information', icon: Users },
    { title: 'Tax Situation', icon: FileText },
    { title: 'Service Preferences', icon: CheckCircle },
    { title: 'Review & Submit', icon: ArrowRight }
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to Lawson Mobile Tax!</h1>
                <p className="text-xl text-gray-700">
                  Your payment has been processed and your client account has been created.
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

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">What Happens Next?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>A tax professional will be assigned to your case within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>You'll receive an email confirmation with next steps</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Access your client dashboard to track progress and upload documents</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>We'll contact you to schedule your consultation</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/client/dashboard" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                    Access Your Client Dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/client/onboarding" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Selection
          </Link>
          
          {/* Upsell Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-4 mb-6 mx-auto max-w-2xl">
            <p className="text-white font-bold text-lg">
              💡 <strong>Smart Tip:</strong> Not sure if you need full service? 
              <Link href="/tax-evaluation" className="underline hover:text-yellow-200 ml-1">
                Get a $19.99 Tax Evaluation first
              </Link> 
              to discover your potential savings!
            </p>
          </div>
          
          <Badge className="bg-green-600 text-white font-bold text-lg px-6 py-2 mb-6">
            💰 STANDARD TAX SERVICE - $499
          </Badge>
          
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Individual Tax Return
            <span className="block text-green-600">Intake Form</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete this form to get started with your personal tax preparation. 
            Average client saves $3,247 with our expert service.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  step > index + 1 ? 'bg-green-600 text-white' : 
                  step === index + 1 ? 'bg-green-600 text-white' : 
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
                    step >= index + 1 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${
                    step > index + 1 ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-2xl">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Personal Information</h2>
                
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
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="john@example.com"
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

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address *</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="h-12 text-lg"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="Atlanta"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="GA">Georgia</option>
                      <option value="FL">Florida</option>
                      <option value="TX">Texas</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      {/* Add more states */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code *</label>
                    <Input
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="30309"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tax Situation */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Tax Situation</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Filing Status *</label>
                    <select
                      value={formData.filingStatus}
                      onChange={(e) => setFormData({...formData, filingStatus: e.target.value})}
                      className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                    >
                      <option value="">Select Filing Status</option>
                      <option value="single">Single</option>
                      <option value="married_jointly">Married Filing Jointly</option>
                      <option value="married_separately">Married Filing Separately</option>
                      <option value="head_of_household">Head of Household</option>
                      <option value="qualifying_widow">Qualifying Widow(er)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Annual Income *</label>
                    <Input
                      type="number"
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="75000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Dependents</label>
                    <Input
                      type="number"
                      value={formData.dependents}
                      onChange={(e) => setFormData({...formData, dependents: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Previous Year Refund</label>
                    <Input
                      type="number"
                      value={formData.previousRefund}
                      onChange={(e) => setFormData({...formData, previousRefund: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="2500"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-bold text-gray-700 mb-4">Which applies to you? (Check all that apply)</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.homeowner}
                        onChange={(e) => setFormData({...formData, homeowner: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <Home className="h-6 w-6 text-green-600" />
                      <span className="font-semibold">I own my home</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.businessOwner}
                        onChange={(e) => setFormData({...formData, businessOwner: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <Briefcase className="h-6 w-6 text-purple-600" />
                      <span className="font-semibold">I own a business</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.investments}
                        onChange={(e) => setFormData({...formData, investments: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <DollarSign className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold">I have investments</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.retirement}
                        onChange={(e) => setFormData({...formData, retirement: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <Heart className="h-6 w-6 text-red-600" />
                      <span className="font-semibold">I have retirement accounts</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Service Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Preferences</h2>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Service Type</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className={`p-6 border-2 rounded-lg cursor-pointer ${
                      formData.serviceType === 'standard' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="serviceType"
                        value="standard"
                        checked={formData.serviceType === 'standard'}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">$150</div>
                        <div className="font-bold mb-2">Standard Service</div>
                        <div className="text-sm text-gray-600">Basic tax preparation with maximum refund guarantee</div>
                      </div>
                    </label>
                    <label className={`p-6 border-2 rounded-lg cursor-pointer ${
                      formData.serviceType === 'premium' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="serviceType"
                        value="premium"
                        checked={formData.serviceType === 'premium'}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">$250</div>
                        <div className="font-bold mb-2">Premium Service</div>
                        <div className="text-sm text-gray-600">Includes tax planning and consultation for next year</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.mobileService}
                      onChange={(e) => setFormData({...formData, mobileService: e.target.checked})}
                      className="h-5 w-5"
                    />
                    <div>
                      <div className="font-semibold">Mobile Service (+$50)</div>
                      <div className="text-sm text-gray-600">We come to your home or office</div>
                    </div>
                  </label>
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
                      <option value="weekend">Weekend</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    className="w-full h-24 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Any special situations, questions, or requests..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Review & Submit</h2>
                
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">Order Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Service Type:</span>
                      <span className="text-green-600 font-bold">
                        {formData.serviceType === 'standard' ? 'Standard ($150)' : 'Premium ($250)'}
                      </span>
                    </div>
                    {formData.mobileService && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Mobile Service:</span>
                        <span className="text-green-600 font-bold">+$50</span>
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">
                          ${formData.serviceType === 'standard' ? 150 : 250}{formData.mobileService ? '+50' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Next Steps</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>We'll contact you within 24 hours to confirm your appointment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>Bring all tax documents to your appointment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>Payment due at completion of service</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <span>Guaranteed maximum refund or free re-preparation</span>
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
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg ml-auto"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isPaymentProcessing}
                  className="bg-green-600 hover:bg-green-700 px-12 py-4 text-xl font-bold ml-auto disabled:opacity-50"
                >
                  {isPaymentProcessing ? (
                    <>
                      Processing Payment...
                      <div className="ml-2 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      Pay $499 & Create Account
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
