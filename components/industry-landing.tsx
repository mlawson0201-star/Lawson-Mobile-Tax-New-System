
'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  HeartHandshake, 
  Smartphone, 
  Building2, 
  MapPin, 
  Truck, 
  Shield,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Star,
  Award,
  Phone,
  Calendar,
  Sparkles,
  Crown
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

interface IndustryData {
  id: string
  name: string
  icon: any
  heroTitle: string
  heroSubtitle: string
  averageSavings: number
  clientCount: string
  painPoints: string[]
  solutions: string[]
  deductions: string[]
  testimonial: {
    name: string
    title: string
    content: string
    savings: number
    rating: number
  }
  caseStudy: {
    before: string
    after: string
    savings: number
    timeframe: string
  }
}

const industryData: { [key: string]: IndustryData } = {
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare Professionals',
    icon: HeartHandshake,
    heroTitle: 'Healthcare Heroes Deserve Maximum Tax Refunds',
    heroSubtitle: 'Specialized tax strategies for doctors, nurses, and healthcare workers',
    averageSavings: 4200,
    clientCount: '2,100+',
    painPoints: [
      'Complex continuing education expenses',
      'Professional license and certification fees',
      'Expensive malpractice insurance premiums',
      'Home office deductions for telehealth'
    ],
    solutions: [
      'Medical education expense optimization',
      'Professional liability insurance deductions',
      'Healthcare equipment depreciation',
      'Telehealth home office optimization'
    ],
    deductions: [
      'Medical continuing education: Up to $5,000',
      'Professional licenses & certifications: Average $800',
      'Medical equipment & supplies: Average $2,100',
      'Professional journals & memberships: Average $600'
    ],
    testimonial: {
      name: 'Dr. Sarah Martinez',
      title: 'Emergency Medicine Physician',
      content: 'They found deductions I never knew existed - from my home office for telemedicine to my continuing education expenses. Saved me over $4,000!',
      savings: 4100,
      rating: 5
    },
    caseStudy: {
      before: 'Owed $2,800 using TurboTax',
      after: 'Received $3,200 refund',
      savings: 6000,
      timeframe: '48 hours'
    }
  },
  tech: {
    id: 'tech',
    name: 'Tech & IT Professionals',
    icon: Smartphone,
    heroTitle: 'Tech Professionals: Optimize Your Tax Code',
    heroSubtitle: 'Advanced strategies for software engineers, developers, and IT specialists',
    averageSavings: 3800,
    clientCount: '3,800+',
    painPoints: [
      'Stock option tax complications',
      'Remote work expense deductions',
      'Professional development costs',
      'Equipment and software purchases'
    ],
    solutions: [
      'RSU and stock option optimization',
      'Remote work expense maximization',
      'Professional development planning',
      'Technology equipment depreciation'
    ],
    deductions: [
      'Home office for remote work: Up to $1,500',
      'Professional development & courses: Average $2,000',
      'Computer equipment & software: Average $1,200',
      'Professional memberships: Average $500'
    ],
    testimonial: {
      name: 'Mike Chen',
      title: 'Senior Software Engineer',
      content: 'As a remote worker with stock options, my taxes were complex. They handled everything perfectly and saved me thousands on my RSU taxes.',
      savings: 3600,
      rating: 5
    },
    caseStudy: {
      before: '$1,200 refund with DIY software',
      after: '$5,800 refund professionally',
      savings: 4600,
      timeframe: '24 hours'
    }
  },
  business: {
    id: 'business',
    name: 'Small Business Owners',
    icon: Building2,
    heroTitle: 'Small Business Tax Mastery',
    heroSubtitle: 'Comprehensive strategies to minimize business taxes and maximize profits',
    averageSavings: 5100,
    clientCount: '4,200+',
    painPoints: [
      'Business expense categorization',
      'Quarterly estimated tax planning',
      'Business structure optimization',
      'Equipment and asset depreciation'
    ],
    solutions: [
      'Comprehensive expense optimization',
      'Strategic tax planning throughout the year',
      'Entity structure analysis and recommendations',
      'Advanced depreciation strategies'
    ],
    deductions: [
      'Business equipment & vehicles: Average $3,500',
      'Home office business use: Up to $1,500',
      'Business meals & entertainment: Average $1,800',
      'Professional services & legal: Average $1,200'
    ],
    testimonial: {
      name: 'Jennifer Rodriguez',
      title: 'Restaurant Owner',
      content: 'They restructured my business taxes completely. What used to be overwhelming is now simple, and I save over $5,000 annually.',
      savings: 5200,
      rating: 5
    },
    caseStudy: {
      before: 'Paid $8,500 in business taxes',
      after: 'Paid only $3,200 after optimization',
      savings: 5300,
      timeframe: '1 week'
    }
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate Investors',
    icon: MapPin,
    heroTitle: 'Real Estate Tax Optimization',
    heroSubtitle: 'Advanced strategies for property investors and real estate professionals',
    averageSavings: 6200,
    clientCount: '1,900+',
    painPoints: [
      'Rental property depreciation',
      'Investment property expenses',
      '1031 exchange planning',
      'Real estate professional status'
    ],
    solutions: [
      'Accelerated depreciation strategies',
      'Complete rental expense optimization',
      '1031 exchange guidance and planning',
      'Real estate professional qualification'
    ],
    deductions: [
      'Property depreciation: Average $4,200',
      'Rental property expenses: Average $2,800',
      'Professional development: Average $800',
      'Vehicle expenses: Average $1,500'
    ],
    testimonial: {
      name: 'David Kim',
      title: 'Real Estate Investor',
      content: 'With 4 rental properties, my taxes were a nightmare. They organized everything and found deductions that saved me over $6,000.',
      savings: 6100,
      rating: 5
    },
    caseStudy: {
      before: 'Owed $4,500 on rental income',
      after: 'Received $1,800 refund',
      savings: 6300,
      timeframe: '3 days'
    }
  }
}

interface IndustryLandingProps {
  industryId: string
}

export function IndustryLanding({ industryId }: IndustryLandingProps) {
  const industry = industryData[industryId]
  
  if (!industry) {
    return <div>Industry not found</div>
  }

  const IconComponent = industry.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  IRS Authorized
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  <Star className="h-4 w-4 mr-1" />
                  4.9/5 Rating
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                  <Shield className="h-4 w-4 mr-1" />
                  CPA Certified
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      {industry.heroTitle}
                    </h1>
                  </div>
                </div>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  {industry.heroSubtitle}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-green-600">
                      ${industry.averageSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Average Savings</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {industry.clientCount}
                    </div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="ultra-button text-xl px-8 py-6 rounded-2xl">
                  <Calendar className="mr-2 h-6 w-6" />
                  Get FREE Industry Analysis
                </Button>
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-xl px-8 py-6 rounded-2xl">
                  <Phone className="mr-2 h-6 w-6" />
                  {COMPANY_CONFIG.contact.phone}
                </Button>
              </div>
            </div>

            {/* Case Study Card */}
            <div className="ultra-premium-card p-8">
              <div className="text-center mb-6">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mb-4">
                  <Award className="h-4 w-4 mr-1" />
                  CASE STUDY
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Real {industry.name} Success Story
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="text-lg font-bold text-red-600 mb-1">BEFORE</div>
                    <div className="text-sm text-red-800">{industry.caseStudy.before}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-lg font-bold text-green-600 mb-1">AFTER</div>
                    <div className="text-sm text-green-800">{industry.caseStudy.after}</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    ${industry.caseStudy.savings.toLocaleString()}
                  </div>
                  <div className="text-orange-800 font-semibold">
                    Total Savings in {industry.caseStudy.timeframe}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(industry.testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic text-center mb-4">
                    "{industry.testimonial.content}"
                  </blockquote>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{industry.testimonial.name}</div>
                    <div className="text-sm text-primary font-semibold">{industry.testimonial.title}</div>
                    <div className="text-xs text-gray-600 mt-2">
                      Saved ${industry.testimonial.savings.toLocaleString()} with our service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              We Understand Your Unique Tax Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {industry.name} face specific tax complications that generic services miss
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pain Points */}
            <Card className="ultra-premium-card">
              <CardHeader>
                <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
                  <span className="text-3xl">❌</span>
                  Common Tax Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {industry.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-red-800 font-semibold">{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card className="ultra-premium-card">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
                  <span className="text-3xl">✅</span>
                  Our Expert Solutions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {industry.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-green-800 font-semibold">{solution}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry-Specific Deductions */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Exclusive {industry.name} Deductions
            </h2>
            <p className="text-xl text-gray-600">
              Specialized deductions that can save you thousands
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industry.deductions.map((deduction, index) => (
              <Card key={index} className="ultra-premium-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {deduction.split(':')[0]}
                      </h3>
                      <p className="text-primary font-bold text-xl">
                        {deduction.split(':')[1]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to Join {industry.clientCount} Happy {industry.name}?
            </h2>
            <p className="text-xl lg:text-2xl opacity-90">
              Get your FREE industry-specific tax analysis and discover exactly how much you could save
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100 text-2xl px-12 py-8 rounded-2xl font-bold shadow-2xl">
                <Crown className="mr-3 h-8 w-8" />
                Get My FREE ${industry.averageSavings.toLocaleString()} Analysis
                <Sparkles className="ml-3 h-8 w-8" />
              </Button>
            </div>

            <p className="text-white/80 text-lg">
              ✅ No obligation • ✅ Results in 15 minutes • ✅ 100% confidential
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
