

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, DollarSign, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

const PRICING_TIERS = {
  BASIC: { 
    monthlyFee: 99, 
    perReturnFee: 15, 
    maxReturns: 100,
    features: ['Up to 100 returns/month', 'Basic CRM', 'Email support', '1 office location']
  },
  STANDARD: { 
    monthlyFee: 199, 
    perReturnFee: 12, 
    maxReturns: 500,
    features: ['Up to 500 returns/month', 'Advanced CRM', 'Phone support', '5 office locations', 'Analytics dashboard']
  },
  PREMIUM: { 
    monthlyFee: 399, 
    perReturnFee: 10, 
    maxReturns: 1000,
    features: ['Up to 1000 returns/month', 'Full CRM suite', 'Priority support', '15 office locations', 'Advanced analytics', 'White-label branding']
  },
  UNLIMITED: { 
    monthlyFee: 799, 
    perReturnFee: 8, 
    maxReturns: -1,
    features: ['Unlimited returns', 'Enterprise CRM', 'Dedicated support', 'Unlimited offices', 'Custom integrations', 'Full white-label', 'API access']
  }
}

export default function ServiceBureauSignup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Bureau Information
    bureauName: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    password: '',
    confirmPassword: '',
    
    // Business Details
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    ein: '',
    ptinNumber: '',
    
    // Subscription Details
    licenseLevel: 'BASIC',
    estimatedMonthlyReturns: '',
    
    // Agreement
    agreedToTerms: false,
    agreedToProcessingFees: false
  })

  const selectedTier = PRICING_TIERS[formData.licenseLevel as keyof typeof PRICING_TIERS]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/signup/service-bureau', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Service Bureau registered successfully!')
        router.push(`/setup/bureau/${result.organization.id}`)
      } else {
        toast.error(result.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Tax Service Bureau
          </h1>
          <p className="text-lg text-gray-600">
            Join the Lawson Mobile Tax network and start your own tax preparation business
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Tell us about your tax service bureau
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bureauName">Service Bureau Name *</Label>
                    <Input
                      id="bureauName"
                      value={formData.bureauName}
                      onChange={(e) => handleInputChange('bureauName', e.target.value)}
                      placeholder="e.g., ABC Tax Services"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ein">EIN (Optional)</Label>
                    <Input
                      id="ein"
                      value={formData.ein}
                      onChange={(e) => handleInputChange('ein', e.target.value)}
                      placeholder="XX-XXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerFirstName">Owner First Name *</Label>
                    <Input
                      id="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={(e) => handleInputChange('ownerFirstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerLastName">Owner Last Name *</Label>
                    <Input
                      id="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={(e) => handleInputChange('ownerLastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerEmail">Email Address *</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Next <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Business Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Business Address & Details</CardTitle>
                <CardDescription>
                  Provide your business location and tax preparer information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                    placeholder="Street Address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ptinNumber">PTIN Number (Optional)</Label>
                    <Input
                      id="ptinNumber"
                      value={formData.ptinNumber}
                      onChange={(e) => handleInputChange('ptinNumber', e.target.value)}
                      placeholder="P12345678"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Preparer Tax Identification Number
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="estimatedMonthlyReturns">Estimated Monthly Returns</Label>
                    <Input
                      id="estimatedMonthlyReturns"
                      type="number"
                      value={formData.estimatedMonthlyReturns}
                      onChange={(e) => handleInputChange('estimatedMonthlyReturns', e.target.value)}
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Pricing & Agreement */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Pricing Tiers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Choose Your Plan
                  </CardTitle>
                  <CardDescription>
                    Select the license level that fits your business needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(PRICING_TIERS).map(([key, tier]) => (
                      <div
                        key={key}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.licenseLevel === key
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('licenseLevel', key)}
                      >
                        <div className="text-center">
                          <h3 className="font-semibold text-lg">{key}</h3>
                          <div className="text-2xl font-bold text-blue-600 mt-2">
                            ${tier.monthlyFee}
                            <span className="text-sm font-normal text-gray-500">/month</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            ${tier.perReturnFee} per return
                          </p>
                        </div>
                        <ul className="mt-4 space-y-2">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Revenue Sharing Model</h4>
                    <p className="text-sm text-gray-600">
                      • You keep <strong>80%</strong> of all revenue from your offices
                    </p>
                    <p className="text-sm text-gray-600">
                      • Lawson Mobile Tax takes <strong>20%</strong> for software, support, and platform maintenance
                    </p>
                    <p className="text-sm text-gray-600">
                      • No hidden fees or setup costs
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Agreements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Agreements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked)}
                    />
                    <label htmlFor="agreedToTerms" className="text-sm">
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:underline" target="_blank">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline" target="_blank">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreedToProcessingFees"
                      checked={formData.agreedToProcessingFees}
                      onCheckedChange={(checked) => handleInputChange('agreedToProcessingFees', checked)}
                    />
                    <label htmlFor="agreedToProcessingFees" className="text-sm">
                      I understand and agree to the processing fees of ${selectedTier.monthlyFee}/month 
                      + ${selectedTier.perReturnFee} per tax return processed
                    </label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading || !formData.agreedToTerms || !formData.agreedToProcessingFees}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Creating Bureau...' : 'Create Service Bureau'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

