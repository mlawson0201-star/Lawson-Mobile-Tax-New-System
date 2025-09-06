
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Home,
  BookOpen,
  CheckCircle,
  FileText
} from 'lucide-react'

export default function StudentIntakePage() {
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
    
    // Student Info
    studentStatus: '',
    school: '',
    degreeProgram: '',
    graduationYear: '',
    tuitionPaid: '',
    scholarships: '',
    studentLoanInterest: '',
    
    // Income Info
    hasW2: false,
    has1098T: false,
    hasOtherIncome: false,
    employerName: '',
    totalWages: '',
    
    // Service Preferences
    serviceType: 'student',
    preferredContact: 'email',
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to Lawson Mobile Tax!</h1>
                <p className="text-xl text-gray-700">
                  Your payment has been processed and your student client account has been created.
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
                <h3 className="text-xl font-bold text-blue-800 mb-4">What Happens Next for Students?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>A student tax specialist will be assigned within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Education credit optimization review</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>1098-T form processing and verification</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Fast student refund processing</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Link href="/client/dashboard" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                    Access Your Student Dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/client/onboarding" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Service Selection
          </Link>
          
          <Badge className="bg-blue-600 text-white font-bold text-lg px-6 py-2 mb-6">
            🎓 STUDENT TAX SERVICE - $199
          </Badge>
          
          <h1 className="text-5xl font-black text-blue-900 mb-4">
            Student Tax Return Application
          </h1>
          <p className="text-xl text-gray-600">
            Special pricing for students - Step {step} of 4
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-600">Progress</span>
            <span className="text-sm font-medium text-blue-600">{step}/4</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
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
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="Your last name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="your.email@student.edu"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Current Address *</label>
                    <Input 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                    <Input 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                    <Input 
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="State"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Student Information */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Education Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Student Status *</label>
                    <select 
                      value={formData.studentStatus}
                      onChange={(e) => setFormData({...formData, studentStatus: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                    >
                      <option value="">Select status</option>
                      <option value="full-time">Full-time Student</option>
                      <option value="part-time">Part-time Student</option>
                      <option value="graduate">Graduate Student</option>
                      <option value="professional">Professional School</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">School/University *</label>
                    <Input 
                      value={formData.school}
                      onChange={(e) => setFormData({...formData, school: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="University name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Degree Program</label>
                    <Input 
                      value={formData.degreeProgram}
                      onChange={(e) => setFormData({...formData, degreeProgram: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="Major/Program"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Expected Graduation Year</label>
                    <Input 
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="2024"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tuition Paid (2023)</label>
                    <Input 
                      value={formData.tuitionPaid}
                      onChange={(e) => setFormData({...formData, tuitionPaid: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="$15,000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Scholarships/Grants Received</label>
                    <Input 
                      value={formData.scholarships}
                      onChange={(e) => setFormData({...formData, scholarships: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="$5,000"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Documents Available</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.has1098T}
                        onChange={(e) => setFormData({...formData, has1098T: e.target.checked})}
                        className="mr-3 h-5 w-5 text-blue-600"
                      />
                      <span>I have a 1098-T (Tuition Statement) form</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.hasW2}
                        onChange={(e) => setFormData({...formData, hasW2: e.target.checked})}
                        className="mr-3 h-5 w-5 text-blue-600"
                      />
                      <span>I have W-2 forms from employment</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.hasOtherIncome}
                        onChange={(e) => setFormData({...formData, hasOtherIncome: e.target.checked})}
                        className="mr-3 h-5 w-5 text-blue-600"
                      />
                      <span>I have other income sources (1099s, etc.)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Income Information */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Income Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {formData.hasW2 && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Employer Name</label>
                        <Input 
                          value={formData.employerName}
                          onChange={(e) => setFormData({...formData, employerName: e.target.value})}
                          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                          placeholder="Company name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Total Wages (Box 1)</label>
                        <Input 
                          value={formData.totalWages}
                          onChange={(e) => setFormData({...formData, totalWages: e.target.value})}
                          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                          placeholder="$8,500"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Student Loan Interest Paid</label>
                    <Input 
                      value={formData.studentLoanInterest}
                      onChange={(e) => setFormData({...formData, studentLoanInterest: e.target.value})}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500"
                      placeholder="$2,500 (if applicable)"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Student-Specific Benefits</h3>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3">We'll help you claim these student benefits:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>American Opportunity Tax Credit (up to $2,500)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Lifetime Learning Credit (up to $2,000)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Student Loan Interest Deduction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span>Tuition and Fees Deduction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review and Payment */}
            {step === 4 && (
              <div className="animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Review & Complete</h2>
                </div>

                <div className="bg-blue-50 rounded-xl p-8 mb-8 border border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Student Tax Service - $199</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Your Information:</h4>
                      <div className="space-y-2 text-gray-700">
                        <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>School:</strong> {formData.school}</div>
                        <div><strong>Status:</strong> {formData.studentStatus}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Service Includes:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Student tax return preparation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Education credit optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Student loan interest deduction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Fast refund processing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Student support specialist</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h4 className="font-bold text-green-800 mb-3">Student Guarantee</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Maximum education credits claimed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Student-specific deductions maximized</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Free re-preparation if our error</span>
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
