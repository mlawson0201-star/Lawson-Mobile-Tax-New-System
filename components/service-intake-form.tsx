
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  Phone,
  Mail,
  User,
  Building2,
  FileText,
  AlertCircle,
  CreditCard,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface ServiceIntakeFormProps {
  serviceType: string
  serviceTitle: string
  onClose: () => void
}

export function ServiceIntakeForm({ serviceType, serviceTitle, onClose }: ServiceIntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Client Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Service Details
    urgentService: false,
    returnComplexity: 'simple',
    businessType: '',
    filingStatus: 'single',
    hasRentalProperty: false,
    hasSelfEmployment: false,
    hasInvestments: false,
    estimatedIncome: '',
    preferredContactMethod: 'email',
    additionalNotes: ''
  })
  const [pricing, setPricing] = useState<any>(null)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculatePricing = async () => {
    try {
      const response = await fetch(`/api/services/intake?serviceType=${serviceType}&complexity=${formData.returnComplexity}`)
      const data = await response.json()
      setPricing(data)
    } catch (error) {
      console.error('Pricing calculation error:', error)
    }
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields')
        return
      }
      await calculatePricing()
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else if (currentStep === 3) {
      await handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/services/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          serviceType,
          clientInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
          },
          serviceDetails: {
            urgentService: formData.urgentService,
            returnComplexity: formData.returnComplexity,
            businessType: formData.businessType,
            filingStatus: formData.filingStatus,
            hasRentalProperty: formData.hasRentalProperty,
            hasSelfEmployment: formData.hasSelfEmployment,
            hasInvestments: formData.hasInvestments,
            estimatedIncome: formData.estimatedIncome ? parseInt(formData.estimatedIncome) : undefined,
            preferredContactMethod: formData.preferredContactMethod,
            additionalNotes: formData.additionalNotes
          },
          source: 'SERVICE_INTAKE_FORM'
        })
      })

      const result = await response.json()

      if (response.ok) {
        setCurrentStep(4) // Success step
        toast.success('Service request submitted successfully!')
        console.log('✅ Automated workflow initiated for:', result)
      } else {
        toast.error(result.error || 'Failed to submit service request')
      }

    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Connection error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl my-8 border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold mb-2">
                {serviceTitle} - Professional Service Request
              </CardTitle>
              <p className="text-white/90">
                Complete automated service setup with certified tax professionals
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? 'bg-white text-blue-600' : 'bg-white/30 text-white'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 4 && <div className={`w-12 h-1 mx-2 ${
                  currentStep > step ? 'bg-white' : 'bg-white/30'
                }`} />}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-8">
          
          {/* Step 1: Client Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Client Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-blue-900 mb-3">🔒 Your Information is Secure</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800">CPA-Client Privilege</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800">GDPR Compliant</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600"
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
              >
                Continue to Service Details
              </Button>
            </div>
          )}

          {/* Step 2: Service Configuration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Service Configuration
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Service Complexity</Label>
                    <div className="space-y-2 mt-2">
                      {['simple', 'moderate', 'complex'].map(complexity => (
                        <label key={complexity} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="complexity"
                            value={complexity}
                            checked={formData.returnComplexity === complexity}
                            onChange={(e) => handleInputChange('returnComplexity', e.target.value)}
                            className="text-blue-600"
                          />
                          <div>
                            <div className="font-semibold capitalize">{complexity}</div>
                            <div className="text-sm text-gray-600">
                              {complexity === 'simple' && 'Basic tax situation, W-2 income only'}
                              {complexity === 'moderate' && 'Multiple income sources, some deductions'}
                              {complexity === 'complex' && 'Business income, investments, rental property'}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="urgentService"
                      checked={formData.urgentService}
                      onChange={(e) => handleInputChange('urgentService', e.target.checked)}
                      className="text-red-600"
                    />
                    <Label htmlFor="urgentService" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-red-600" />
                      Rush Service (+50% fee)
                    </Label>
                  </div>
                </div>

                {pricing && (
                  <Card className="p-6 bg-green-50 border-green-200">
                    <h4 className="font-bold text-green-800 mb-4">Service Pricing</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span className="font-bold">${pricing.pricing?.base || 0}</span>
                      </div>
                      {formData.urgentService && (
                        <div className="flex justify-between text-red-600">
                          <span>Rush Fee (50%):</span>
                          <span className="font-bold">+${Math.round((pricing.pricing?.base || 0) * 0.5)}</span>
                        </div>
                      )}
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${formData.urgentService ? Math.round((pricing.pricing?.base || 0) * 1.5) : pricing.pricing?.base || 0}</span>
                      </div>
                    </div>
                    <p className="text-sm text-green-700 mt-3">{pricing.pricing?.description}</p>
                  </Card>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Information</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Any specific requirements, questions, or details about your tax situation..."
                  className="h-24"
                />
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Review & Confirm Service
              </Button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Confirm Your Service Request
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-bold mb-4">Client Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="font-bold mb-4">Service Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Service:</strong> {serviceTitle}</div>
                    <div><strong>Complexity:</strong> {formData.returnComplexity}</div>
                    {formData.urgentService && <Badge className="bg-red-500 text-white">Rush Service</Badge>}
                  </div>
                </Card>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-bold text-yellow-900 mb-3">📋 What Happens Next:</h4>
                <div className="space-y-2 text-sm text-yellow-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Automated workflow starts immediately upon submission</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Professional CPA assigned within 2 business hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Detailed next steps sent to your email</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Secure document upload portal access provided</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Payment processing (if applicable) initiated</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing Your Request...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Submit Service Request
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="text-center space-y-6 py-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  🎉 Service Request Submitted Successfully!
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Your automated workflow has been initiated. You'll receive detailed next steps via email within minutes.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-bold text-green-900 mb-3">✅ Automated Systems Activated:</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">Professional CPA assignment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">Workflow automation triggered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">Email notifications sent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">Document portal prepared</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3"
              >
                Perfect! I'm Ready to Get Started
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
