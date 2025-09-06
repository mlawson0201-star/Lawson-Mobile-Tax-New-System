
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  Quote,
  ThumbsUp,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  Calendar,
  Building2
} from 'lucide-react'

export function ClientTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Rodriguez",
      role: "Small Business Owner",
      business: "Freelance Marketing Consultant",
      location: "Atlanta, GA",
      rating: 5,
      date: "December 2024",
      savings: "$4,247",
      testimonial: "Jennifer Martinez and the LMT team transformed my tax situation completely! As a freelancer, I was missing so many deductions. They found business expenses I didn't even know were deductible and set up a quarterly planning system that keeps me ahead of the IRS. The $4,247 in additional savings more than paid for their services.",
      verified: true,
      services: ["Business Tax Prep", "Quarterly Planning", "Home Office Deduction"],
      beforeAfter: {
        before: "Paying $8,500 in taxes",
        after: "Reduced to $4,253 with proper deductions"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Professional",
      business: "Software Developer",
      location: "Austin, TX",
      rating: 5,
      date: "November 2024",
      savings: "$3,890",
      testimonial: "I had been doing my own taxes with TurboTax for years and thought I was doing fine. Boy was I wrong! LMT found deductions I never knew existed - home office, professional development, even my coding bootcamp expenses. The personalized approach and year-round support is worth every penny.",
      verified: true,
      services: ["Individual Tax Prep", "Tech Industry Deductions", "Investment Planning"],
      beforeAfter: {
        before: "DIY tax prep with basic software",
        after: "Professional optimization with ongoing support"
      }
    },
    {
      id: 3,
      name: "Jennifer Williams",
      role: "Working Mother",
      business: "Real Estate Agent",
      location: "Denver, CO",
      rating: 5,
      date: "October 2024",
      savings: "$5,156",
      testimonial: "As a busy mom and real estate agent, I needed someone I could trust with my complex tax situation. LMT not only maximized my refund but also helped me plan for my children's education expenses. The child tax credits and business deductions they found were incredible. Plus, their mobile service came to my office - so convenient!",
      verified: true,
      services: ["Business Tax Prep", "Child Tax Credits", "Education Planning"],
      beforeAfter: {
        before: "Paying someone who missed major deductions",
        after: "Comprehensive tax strategy with family planning"
      }
    },
    {
      id: 4,
      name: "David Park",
      role: "Restaurant Owner",
      business: "Korean BBQ Restaurant",
      location: "Los Angeles, CA",
      rating: 5,
      date: "September 2024",
      savings: "$12,340",
      testimonial: "Running a restaurant means complex business taxes. LMT's expertise in the food service industry is unmatched. They helped me navigate PPP loan forgiveness, maximize equipment deductions, and set up proper bookkeeping systems. The $12,340 in tax savings was just the beginning - their ongoing advice has improved my entire business.",
      verified: true,
      services: ["Business Formation", "Monthly Bookkeeping", "Industry-Specific Advice"],
      beforeAfter: {
        before: "Struggling with complex restaurant finances",
        after: "Streamlined systems with massive tax savings"
      }
    },
    {
      id: 5,
      name: "Amanda Foster",
      role: "Healthcare Professional",
      business: "Physical Therapist",
      location: "Miami, FL",
      rating: 5,
      date: "August 2024",
      savings: "$2,995",
      testimonial: "The attention to detail and personal service exceeded my expectations. They found medical education deductions, professional license fees, and even helped me plan for starting my own practice. The tax education resources they provide have made me much more confident about my financial future.",
      verified: true,
      services: ["Healthcare Professional Tax Prep", "Business Planning", "Education Credits"],
      beforeAfter: {
        before: "Confused about healthcare-specific deductions",
        after: "Clear strategy for professional growth and tax savings"
      }
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Retiree",
      business: "Former Corporate Executive",
      location: "Phoenix, AZ",
      rating: 5,
      date: "July 2024",
      savings: "$6,789",
      testimonial: "After retiring, my tax situation became incredibly complex with 401k distributions, Social Security, and investment income. LMT's retirement tax planning expertise saved me thousands. They optimized my withdrawal strategy and helped me understand Medicare tax implications. Truly professionals who care about their clients.",
      verified: true,
      services: ["Retirement Tax Planning", "Social Security Optimization", "Investment Strategy"],
      beforeAfter: {
        before: "Paying too much tax on retirement distributions",
        after: "Optimized withdrawal strategy with significant savings"
      }
    }
  ]

  const stats = {
    totalClients: 27500,
    averageSavings: 4247,
    satisfactionRate: 99.2,
    totalSaved: 89000000
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Award className="h-8 w-8" />
            Client Success Stories
          </CardTitle>
          <p className="text-green-100 text-lg">
            Real results from real clients - see why thousands trust Lawson Mobile Tax
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Users className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{stats.totalClients.toLocaleString()}+</div>
              <div className="text-green-100 text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-300" />
              <div className="text-2xl font-bold">${stats.averageSavings.toLocaleString()}</div>
              <div className="text-green-100 text-sm">Average Savings</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Star className="h-6 w-6 mx-auto mb-2 text-orange-300" />
              <div className="text-2xl font-bold">{stats.satisfactionRate}%</div>
              <div className="text-green-100 text-sm">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="text-2xl font-bold">${(stats.totalSaved / 1000000).toFixed(0)}M+</div>
              <div className="text-green-100 text-sm">Total Client Savings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      {testimonial.verified && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.business} • {testimonial.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Savings Highlight */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Tax Savings Achieved</p>
                    <p className="text-2xl font-bold text-green-600">{testimonial.savings}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="relative">
                <Quote className="absolute top-0 left-0 h-6 w-6 text-gray-300 -translate-x-1 -translate-y-1" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  "{testimonial.testimonial}"
                </p>
              </div>

              {/* Services Used */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Services Used:</p>
                <div className="flex flex-wrap gap-1">
                  {testimonial.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Before/After */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-3">Transformation</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs text-red-700 font-medium">Before:</p>
                      <p className="text-sm text-red-600">{testimonial.beforeAfter.before}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs text-green-700 font-medium">After:</p>
                      <p className="text-sm text-green-600">{testimonial.beforeAfter.after}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('/client/onboarding', '_blank')}
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Join 27,500+ Satisfied Clients?</h3>
          <p className="text-xl text-purple-100 mb-6">
            Get the same personalized tax optimization that saved these clients thousands
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-300" />
              <div className="font-bold">Free Consultation</div>
              <div className="text-purple-100 text-sm">No commitment required</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Award className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
              <div className="font-bold">Maximum Refund</div>
              <div className="text-purple-100 text-sm">Guaranteed or it's free</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-300" />
              <div className="font-bold">Expert Support</div>
              <div className="text-purple-100 text-sm">Year-round assistance</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('/tax-evaluation', '_blank')}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 font-bold"
            >
              <Star className="h-5 w-5 mr-2" />
              Start Your Success Story - $19.99
            </Button>
            <Button 
              onClick={() => window.open('tel:(855) 722-8700', '_self')}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3 font-bold"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Call: (855) 722-8700
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
