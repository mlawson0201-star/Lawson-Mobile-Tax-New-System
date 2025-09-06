
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  Zap, 
  Crown,
  ArrowRight,
  CheckCircle,
  Star,
  Briefcase,
  Handshake,
  Calculator,
  PieChart,
  FileText,
  Gift,
  Rocket,
  Shield,
  Phone,
  Mail
} from 'lucide-react'

export default function AffiliatePage() {
  const [applicationForm, setApplicationForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    experience: '',
    marketing_channels: '',
    monthly_leads: '',
    motivation: '',
    social_media: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      tiktok: ''
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setApplicationForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }))
    } else {
      setApplicationForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const commissionTiers = [
    {
      tier: 'Bronze Partner',
      threshold: '$0 - $5,000',
      commission: '25%',
      perks: ['Marketing Materials', 'Monthly Training', 'Affiliate Dashboard'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      tier: 'Silver Partner', 
      threshold: '$5,000 - $15,000',
      commission: '30%',
      perks: ['Priority Support', 'Custom Landing Pages', 'Co-marketing Opportunities'],
      color: 'from-gray-400 to-gray-600'
    },
    {
      tier: 'Gold Partner',
      threshold: '$15,000 - $50,000', 
      commission: '35%',
      perks: ['Dedicated Account Manager', 'White-label Options', 'Revenue Sharing'],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      tier: 'Platinum Partner',
      threshold: '$50,000+',
      commission: '40%',
      perks: ['Custom Commission Structure', 'Joint Ventures', 'Executive Access'],
      color: 'from-purple-500 to-purple-700'
    }
  ]

  const earningsExamples = [
    { referrals: 10, avgValue: 500, monthly: 1250, annually: 15000 },
    { referrals: 25, avgValue: 500, monthly: 3750, annually: 45000 },
    { referrals: 50, avgValue: 500, monthly: 8750, annually: 105000 },
    { referrals: 100, avgValue: 500, monthly: 20000, annually: 240000 }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-12">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Application Submitted Successfully!
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Thank you for your interest in becoming an LMT affiliate partner. 
                  Our team will review your application and contact you within 24-48 hours.
                </p>
                
                <div className="bg-green-50 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-green-800 mb-4">Next Steps:</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Application review (24-48 hours)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Background verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Affiliate dashboard setup</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Marketing materials provided</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/welcome">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Back to Home
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('tel:(855) 722-8700', '_self')}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Questions? Call Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-yellow-400 text-black font-bold text-lg px-6 py-2 mb-6">
            💰 AFFILIATE PARTNERSHIP PROGRAM
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            BECOME AN
            <span className="block text-yellow-300">AFFILIATE PARTNER</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 opacity-90 max-w-4xl mx-auto">
            Earn <strong className="text-yellow-300">up to 40% commission</strong> by referring clients to 
            America's #1 mobile tax service. No investment required!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">40%</div>
              <div className="text-white/90 font-semibold">Max Commission</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">$0</div>
              <div className="text-white/90 font-semibold">Startup Cost</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">24/7</div>
              <div className="text-white/90 font-semibold">Marketing Support</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">$500</div>
              <div className="text-white/90 font-semibold">Avg Order Value</div>
            </div>
          </div>
          
          <Button 
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-3xl px-16 py-8 font-black rounded-full shadow-2xl transform hover:scale-105 transition-all"
          >
            <Rocket className="mr-4 h-10 w-10" />
            APPLY NOW - IT'S FREE!
            <ArrowRight className="ml-4 h-10 w-10" />
          </Button>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Unlimited Earning Potential
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our tiered commission structure rewards performance. The more you refer, the more you earn!
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {commissionTiers.map((tier, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10`}></div>
                <CardHeader className="text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{tier.tier}</CardTitle>
                  <CardDescription>{tier.threshold}</CardDescription>
                  <div className="text-3xl font-black text-green-600 mt-2">
                    {tier.commission}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tier.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Earnings Calculator */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                <Calculator className="inline h-8 w-8 mr-3" />
                Earnings Calculator
              </CardTitle>
              <CardDescription className="text-purple-100 text-lg">
                See your potential monthly and annual earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {earningsExamples.map((example, index) => (
                  <div key={index} className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="text-2xl font-black mb-2">{example.referrals} Referrals</div>
                    <div className="text-sm opacity-90 mb-4">@ ${example.avgValue} avg value</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xl font-bold text-yellow-300">${example.monthly.toLocaleString()}</div>
                        <div className="text-xs opacity-80">Monthly</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black">${example.annually.toLocaleString()}</div>
                        <div className="text-sm opacity-90">Annually</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Why Partner With LMT?
            </h2>
            <p className="text-xl text-gray-600">
              We provide everything you need to succeed as an affiliate partner
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">High-Converting Offers</h3>
              <p className="text-gray-600 leading-relaxed">
                Our proven tax services convert at industry-leading rates. Average client saves over $12,000 annually.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Marketing Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional marketing materials, landing pages, email templates, and social media content provided.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Dedicated Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Personal affiliate manager, training sessions, and 24/7 support to maximize your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-black text-gray-900 mb-4">
                  Affiliate Application
                </CardTitle>
                <CardDescription className="text-lg">
                  Join our exclusive network of high-earning affiliate partners
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                      <Input
                        type="text"
                        required
                        value={applicationForm.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                      <Input
                        type="text"
                        required
                        value={applicationForm.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        required
                        value={applicationForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Company/Organization</label>
                      <Input
                        type="text"
                        value={applicationForm.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Website URL</label>
                      <Input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={applicationForm.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Marketing Experience */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Marketing Experience *</label>
                    <Textarea
                      required
                      placeholder="Describe your experience with affiliate marketing, lead generation, or business development..."
                      value={applicationForm.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Marketing Channels *</label>
                      <Textarea
                        required
                        placeholder="Social media, email, content marketing, paid ads, etc."
                        value={applicationForm.marketing_channels}
                        onChange={(e) => handleInputChange('marketing_channels', e.target.value)}
                        className="w-full min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Expected Monthly Leads</label>
                      <Input
                        type="text"
                        placeholder="e.g., 10-50 qualified leads"
                        value={applicationForm.monthly_leads}
                        onChange={(e) => handleInputChange('monthly_leads', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Social Media Profiles (Optional)</label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="url"
                        placeholder="Facebook Profile/Page"
                        value={applicationForm.social_media.facebook}
                        onChange={(e) => handleInputChange('social_media.facebook', e.target.value)}
                      />
                      <Input
                        type="url"
                        placeholder="Instagram Profile"
                        value={applicationForm.social_media.instagram}
                        onChange={(e) => handleInputChange('social_media.instagram', e.target.value)}
                      />
                      <Input
                        type="url"
                        placeholder="LinkedIn Profile"
                        value={applicationForm.social_media.linkedin}
                        onChange={(e) => handleInputChange('social_media.linkedin', e.target.value)}
                      />
                      <Input
                        type="url"
                        placeholder="Twitter Profile"
                        value={applicationForm.social_media.twitter}
                        onChange={(e) => handleInputChange('social_media.twitter', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to partner with us? *</label>
                    <Textarea
                      required
                      placeholder="Tell us about your goals and why you're interested in promoting our tax services..."
                      value={applicationForm.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  {/* Terms */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">Application Requirements:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Must have legitimate marketing channels or audience</li>
                          <li>• Subject to background verification</li>
                          <li>• Must comply with FTC disclosure requirements</li>
                          <li>• No spamming or unethical marketing practices</li>
                          <li>• Applications reviewed within 48 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-xl py-6 font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Application...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-3 h-6 w-6" />
                        SUBMIT AFFILIATE APPLICATION
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Questions About Our Affiliate Program?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our affiliate team is here to help you succeed. Get in touch with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => window.open('tel:(855) 722-8700', '_self')}
              className="bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-4 font-bold"
            >
              <Phone className="mr-2 h-6 w-6" />
              Call: (855) 722-8700
            </Button>
            <Button 
              onClick={() => window.open('mailto:affiliates@lawsonmobiletax.com?subject=Affiliate Program Inquiry', '_blank')}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-900 text-xl px-10 py-4 font-bold"
            >
              <Mail className="mr-2 h-6 w-6" />
              Email Affiliate Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
