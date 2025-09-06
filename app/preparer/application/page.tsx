
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
  GraduationCap, 
  Phone, 
  Mail, 
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  User,
  Briefcase,
  Award
} from 'lucide-react'

export default function PreparerApplicationPage() {
  const [step, setStep] = useState(1)
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
    ssn: '',
    dateOfBirth: '',
    
    // Background Check
    felonyConviction: '',
    misdemeanorConviction: '',
    taxCompliance: '',
    irsIssues: '',
    backgroundDetails: '',
    
    // Experience & Education
    education: '',
    taxExperience: '',
    previousEmployment: '',
    certifications: '',
    
    // Payment Info
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    
    // Agreements
    backgroundCheckConsent: false,
    termsAccepted: false,
    privacyAccepted: false
  })

  const [applicationStatus, setApplicationStatus] = useState('pending') // pending, approved, denied

  const steps = [
    { title: 'Personal Information', icon: User },
    { title: 'Background Check', icon: Shield },
    { title: 'Experience & Education', icon: GraduationCap },
    { title: 'Payment & Submit', icon: CreditCard }
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const checkEligibility = () => {
    // Check for disqualifying factors
    if (formData.felonyConviction === 'yes' || 
        formData.misdemeanorConviction === 'yes' ||
        formData.taxCompliance === 'no' ||
        formData.irsIssues === 'yes') {
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    // Check eligibility first
    const isEligible = checkEligibility()
    
    if (!isEligible) {
      setApplicationStatus('denied')
      alert('Application denied due to background check requirements. Please see details below.')
      return
    }

    // Process payment (mock)
    if (formData.paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      alert('Please complete payment information')
      return
    }

    // Submit application
    setApplicationStatus('approved')
    
    // Redirect to training portal after successful enrollment
    setTimeout(() => {
      window.location.href = '/training/dashboard'
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/welcome" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-xl px-8 py-3 mb-8">
            🎓 TAX PREPARER TRAINING - $499
          </Badge>
          
          <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
            Become a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Tax Preparer
            </span>
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
            Complete your application and payment to start your comprehensive journey from 
            <strong className="text-purple-600"> zero knowledge to tax expert AND successful business owner!</strong>
          </p>
          
          {/* Enhanced Program Features */}
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                💎 Complete Tax Preparer & Business Mastery Program
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">210+</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Training Hours</h4>
                  <p className="text-gray-600">Comprehensive curriculum covering everything from tax law to business marketing</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">8</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Expert Modules</h4>
                  <p className="text-gray-600">From IRS regulations to social media marketing and client acquisition</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">92%</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Success Rate</h4>
                  <p className="text-gray-600">Of our graduates earn $2,500+ per month within 6 months</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-800">🎓 Tax Preparation Mastery:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• IRS-compliant tax law fundamentals</li>
                    <li>• Individual & business tax return preparation</li>
                    <li>• Advanced deductions and tax credits</li>
                    <li>• Professional tax software training</li>
                    <li>• Ethics, PTIN requirements & compliance</li>
                    <li>• Real-world practice with actual returns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-purple-800">🚀 Business & Marketing Mastery:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Social media marketing that attracts clients</li>
                    <li>• Google Ads and Facebook advertising</li>
                    <li>• Client acquisition funnels and automation</li>
                    <li>• Online business setup and scaling</li>
                    <li>• Content creation and video marketing</li>
                    <li>• Pricing strategies and profit optimization</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <h4 className="font-bold text-xl text-center mb-4">🏆 What Makes This Program Different:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Complete Learning Management System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>HD video lessons with real examples</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Interactive assessments & certificates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Social media templates & content calendars</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Marketing automation tools & strategies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Client acquisition systems that work</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>24/7 student support community</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Lifetime access to all course materials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Status Messages */}
        {applicationStatus === 'denied' && (
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-8 bg-red-50 border-2 border-red-200">
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
                <div>
                  <h3 className="text-2xl font-bold text-red-800">Application Denied</h3>
                  <p className="text-red-700">Unfortunately, your application cannot be processed at this time.</p>
                </div>
              </div>
              <div className="bg-red-100 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">Reasons for Denial:</h4>
                <ul className="text-red-700 space-y-1">
                  {formData.felonyConviction === 'yes' && <li>• Felony conviction reported</li>}
                  {formData.misdemeanorConviction === 'yes' && <li>• Misdemeanor conviction reported</li>}
                  {formData.taxCompliance === 'no' && <li>• Tax non-compliance reported</li>}
                  {formData.irsIssues === 'yes' && <li>• IRS issues reported</li>}
                </ul>
                <p className="text-red-600 mt-4 text-sm">
                  For questions about eligibility requirements, please call (855) 722-8700.
                </p>
              </div>
            </Card>
          </div>
        )}

        {applicationStatus === 'approved' && (
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-8 bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-green-800">Application Approved!</h3>
                  <p className="text-green-700">Welcome to our tax preparer training program!</p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">🎉 Enrollment Complete! You're being redirected to your training portal...</h4>
                
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="font-semibold text-green-800 mb-2">📚 Tax Preparation Training:</h5>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• Module 1: Tax Law Fundamentals (15h)</li>
                      <li>• Module 2: Individual Tax Returns (20h)</li>
                      <li>• Module 3: Business Tax Returns (25h)</li>
                      <li>• Module 4: Advanced Deductions (18h)</li>
                      <li>• Module 5: Tax Software Mastery (16h)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-800 mb-2">🚀 Business & Marketing Training:</h5>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• Module 6: Client Acquisition & Digital Marketing (24h)</li>
                      <li>• Module 7: Ethics, PTIN & IRS Enrollment (14h)</li>
                      <li>• Module 8: Online Business Mastery (28h)</li>
                      <li>• Bonus: Social Media Marketing Masterclass</li>
                      <li>• Interactive assessments & professional certificates</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🚀</span>
                    </div>
                    <p className="text-blue-800 font-semibold">
                      Redirecting to your premium training dashboard in 3 seconds...
                    </p>
                  </div>
                  <p className="text-blue-700 text-sm">
                    You now have access to 210+ hours of professional training, marketing tools, 
                    and everything you need to build a successful tax preparation business!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

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
          <Card className="p-10 shadow-2xl">
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Social Security Number *</label>
                    <Input
                      type="password"
                      value={formData.ssn}
                      onChange={(e) => setFormData({...formData, ssn: e.target.value})}
                      className="h-12 text-lg"
                      placeholder="XXX-XX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address *</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="h-12 text-lg"
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
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code *</label>
                    <Input
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      className="h-12 text-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Background Check */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">Background Check Required</h3>
                  </div>
                  <p className="text-red-700 mb-4">
                    All tax preparers must pass a comprehensive background check. Answering "Yes" to any of the following may result in automatic denial.
                  </p>
                  <p className="text-red-600 text-sm font-semibold">
                    Please answer all questions honestly. False information will result in immediate disqualification.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-8">Background Information</h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      Have you ever been convicted of a felony? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.felonyConviction === 'no' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="felonyConviction"
                          value="no"
                          checked={formData.felonyConviction === 'no'}
                          onChange={(e) => setFormData({...formData, felonyConviction: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-green-800">No</div>
                      </label>
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.felonyConviction === 'yes' ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="felonyConviction"
                          value="yes"
                          checked={formData.felonyConviction === 'yes'}
                          onChange={(e) => setFormData({...formData, felonyConviction: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-red-800">Yes</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      Have you ever been convicted of a misdemeanor involving fraud, theft, or financial crimes? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.misdemeanorConviction === 'no' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="misdemeanorConviction"
                          value="no"
                          checked={formData.misdemeanorConviction === 'no'}
                          onChange={(e) => setFormData({...formData, misdemeanorConviction: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-green-800">No</div>
                      </label>
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.misdemeanorConviction === 'yes' ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="misdemeanorConviction"
                          value="yes"
                          checked={formData.misdemeanorConviction === 'yes'}
                          onChange={(e) => setFormData({...formData, misdemeanorConviction: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-red-800">Yes</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      Are you current and compliant with all your personal tax obligations? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.taxCompliance === 'yes' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="taxCompliance"
                          value="yes"
                          checked={formData.taxCompliance === 'yes'}
                          onChange={(e) => setFormData({...formData, taxCompliance: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-green-800">Yes</div>
                      </label>
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.taxCompliance === 'no' ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="taxCompliance"
                          value="no"
                          checked={formData.taxCompliance === 'no'}
                          onChange={(e) => setFormData({...formData, taxCompliance: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-red-800">No</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      Do you have any outstanding issues with the IRS (liens, levies, audits, etc.)? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.irsIssues === 'no' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="irsIssues"
                          value="no"
                          checked={formData.irsIssues === 'no'}
                          onChange={(e) => setFormData({...formData, irsIssues: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-green-800">No</div>
                      </label>
                      <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                        formData.irsIssues === 'yes' ? 'border-red-600 bg-red-50' : 'border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="irsIssues"
                          value="yes"
                          checked={formData.irsIssues === 'yes'}
                          onChange={(e) => setFormData({...formData, irsIssues: e.target.value})}
                          className="sr-only"
                        />
                        <div className="text-center font-semibold text-red-800">Yes</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.backgroundCheckConsent}
                        onChange={(e) => setFormData({...formData, backgroundCheckConsent: e.target.checked})}
                        className="h-5 w-5"
                      />
                      <div className="text-sm">
                        <div className="font-semibold">I consent to a background check</div>
                        <div className="text-gray-600">I authorize a comprehensive background investigation including criminal history and credit check</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Experience & Education */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience & Education</h2>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Highest Level of Education</label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                  >
                    <option value="">Select Education Level</option>
                    <option value="high_school">High School Diploma/GED</option>
                    <option value="some_college">Some College</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tax Preparation Experience</label>
                  <select
                    value={formData.taxExperience}
                    onChange={(e) => setFormData({...formData, taxExperience: e.target.value})}
                    className="h-12 text-lg w-full border border-gray-300 rounded-md px-3"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="none">No Experience</option>
                    <option value="personal">Personal Tax Returns Only</option>
                    <option value="volunteer">Volunteer Tax Prep (VITA/TCE)</option>
                    <option value="1-2_years">1-2 Years Professional</option>
                    <option value="3-5_years">3-5 Years Professional</option>
                    <option value="5+_years">5+ Years Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current/Previous Employment</label>
                  <textarea
                    value={formData.previousEmployment}
                    onChange={(e) => setFormData({...formData, previousEmployment: e.target.value})}
                    className="w-full h-24 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Describe your current job and relevant work experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Professional Certifications</label>
                  <textarea
                    value={formData.certifications}
                    onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                    className="w-full h-24 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="List any professional certifications (CPA, EA, CTEC, etc.)..."
                  />
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Don't worry if you're new to taxes!</h3>
                  <p className="text-blue-700">
                    Our comprehensive training program is designed for complete beginners. 
                    We'll take you from zero knowledge to professional tax preparer in just 90 days.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Payment & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Payment & Submit</h2>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Training Package</h3>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-2xl text-gray-500 line-through">Regular: $899</div>
                      <div className="text-6xl font-black text-orange-600">$499</div>
                    </div>
                    <Badge className="bg-red-500 text-white font-bold text-lg px-6 py-2">
                      SAVE $400 - LIMITED TIME!
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Training Includes:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          8 Comprehensive Modules
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Live Virtual Classes
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Tax Software Training
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          IRS Exam Preparation
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Support & Benefits:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          Official Certification
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          1-Year Mentorship
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          Job Placement Help
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          Client Referral Network
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      formData.paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Credit/Debit Card</div>
                      </div>
                    </label>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${
                      formData.paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">PayPal</div>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Card Number *</label>
                        <Input
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                          className="h-12 text-lg"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date *</label>
                          <Input
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                            className="h-12 text-lg"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">CVV *</label>
                          <Input
                            value={formData.cvv}
                            onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                            className="h-12 text-lg"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                      className="h-5 w-5 mt-1 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <div className="font-semibold">I accept the Terms and Conditions *</div>
                      <div className="text-gray-600">I agree to the program terms, refund policy, and enrollment requirements</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({...formData, privacyAccepted: e.target.checked})}
                      className="h-5 w-5 mt-1 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <div className="font-semibold">I accept the Privacy Policy *</div>
                      <div className="text-gray-600">I understand how my personal information will be used and protected</div>
                    </div>
                  </label>
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
                  disabled={!formData.termsAccepted || !formData.privacyAccepted || !formData.backgroundCheckConsent}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 px-12 py-6 text-2xl font-bold ml-auto disabled:opacity-50"
                >
                  Complete Payment - $499
                  <CheckCircle className="ml-3 h-8 w-8" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
