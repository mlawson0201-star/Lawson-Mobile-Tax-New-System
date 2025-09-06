
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ServiceIntakeForm } from '@/components/service-intake-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  DollarSign,
  Clock,
  Shield,
  Users,
  Building2,
  PieChart,
  AlertTriangle,
  Phone,
  Calendar,
  Crown,
  Zap,
  Award,
  Target,
  TrendingUp,
  Banknote,
  Sparkles
} from 'lucide-react'
import { taxServices, serviceStats } from '@/lib/services-data'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('individual')
  const [showServiceIntake, setShowServiceIntake] = useState(false)
  const [selectedService, setSelectedService] = useState<{type: string, title: string} | null>(null)

  const handleServiceSelection = async (serviceId: string, serviceName: string) => {
    // Get service pricing from data
    const service = taxServices
      .flatMap(category => category.services)
      .find(s => s.id === serviceId)
    
    if (!service) {
      alert('Service not found. Please try again.')
      return
    }

    // Create real Stripe payment session for this service
    try {
      const response = await fetch('/api/services/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          price: service.price.starting, // Use the real service price
          clientEmail: '', // Will be collected in Stripe checkout
          clientName: ''
        })
      })

      const data = await response.json()
      
      if (data.sessionId && data.url) {
        // Redirect to Stripe checkout for real payment
        window.location.href = data.url
      } else {
        alert('Payment system temporarily unavailable. Please try again or call us.')
      }
    } catch (error) {
      console.error('Payment creation error:', error)
      alert('Payment system error. Please try again or contact support.')
    }


  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/20 to-purple-50/20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 particles opacity-30"></div>
      
      {/* Elite Header */}
      <section className="py-32 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/20 text-white border border-white/30 rounded-full px-8 py-4 mb-8">
            <Crown className="h-6 w-6" />
            <span className="font-bold text-xl">Elite Tax Solutions</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black mb-8 text-glow">
            Premium Tax Mastery
          </h1>
          <p className="text-2xl lg:text-3xl text-white/90 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
            Where high-net-worth individuals and businesses turn for unparalleled tax optimization and wealth preservation
          </p>

          {/* Elite Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Elite Clients", value: `${serviceStats.totalClientsServed.toLocaleString()}+`, icon: Crown },
              { label: "Avg Savings", value: `$${serviceStats.averageSavings.toLocaleString()}`, icon: TrendingUp },
              { label: "Client Satisfaction", value: `${serviceStats.satisfactionRate}%`, icon: Star },
              { label: "Audit Success", value: `${serviceStats.auditWinRate}%`, icon: Shield }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-lime-300" />
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-white/80 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black premium-gradient-text mb-6">
                Elite Service Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive suite of premium tax services designed for wealth maximization
              </p>
            </div>

            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16 h-auto p-2 bg-white shadow-2xl rounded-3xl gap-2">
              {taxServices.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-lime-500 data-[state=active]:text-white data-[state=active]:shadow-xl py-4 sm:py-6 px-3 sm:px-6 text-center rounded-2xl transition-all duration-300 min-h-[80px] flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <category.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    <div>
                      <div className="font-bold text-sm sm:text-lg">{category.name}</div>
                      <div className="text-xs sm:text-sm opacity-70 hidden sm:block">{category.description}</div>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {taxServices.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="text-center mb-16">
                  <div className={`w-24 h-24 bg-gradient-to-br ${category.color} rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl pulse-ring`}>
                    <category.icon className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-5xl font-black text-gray-900 mb-6">{category.name}</h2>
                  <p className="text-2xl text-gray-600 max-w-4xl mx-auto">{category.description}</p>
                </div>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
                  {category.services.map((service, index) => (
                    <Card key={service.id} className="service-card relative group">
                      {/* Popular Badge */}
                      {service.popularityRank <= 3 && (
                        <div className="absolute -top-4 -right-4 z-20">
                          <Badge className="premium-badge text-white px-4 py-2 rounded-full shadow-xl">
                            <Star className="h-4 w-4 mr-1" />
                            Elite Choice
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="pb-6">
                        <div className="flex items-center gap-6 mb-6">
                          <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                            <service.icon className="h-10 w-10 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                              {service.name}
                            </CardTitle>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-black price-highlight">
                                ${service.price.starting.toLocaleString()}+
                              </span>
                              <span className="text-lg text-gray-500 font-semibold">
                                (avg ${service.price.average.toLocaleString()})
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {service.description}
                        </p>
                      </CardHeader>

                      <CardContent>
                        {/* Value Metrics */}
                        <div className="revenue-card p-6 rounded-2xl mb-8">
                          <div className="grid grid-cols-2 gap-6 text-center">
                            <div>
                              <div className="text-3xl font-black success-metric">
                                ${service.savings.average.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600 font-semibold">Average Savings</div>
                            </div>
                            <div>
                              <div className="text-3xl font-black text-blue-600">{service.processingTime}</div>
                              <div className="text-sm text-gray-600 font-semibold">Processing Time</div>
                            </div>
                          </div>
                        </div>

                        {/* Elite Features */}
                        <div className="mb-8">
                          <h4 className="font-bold text-gray-900 mb-4 text-lg">Premium Inclusions:</h4>
                          <div className="space-y-3">
                            {service.features.slice(0, 5).map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mt-0.5">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                            {service.features.length > 5 && (
                              <div className="text-sm success-metric font-bold">
                                + {service.features.length - 5} additional premium features
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Target Clients */}
                        <div className="mb-8">
                          <h4 className="font-bold text-gray-900 mb-4 text-lg">Perfect For:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.idealFor.map((type, idx) => (
                              <Badge key={idx} className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Elite Guarantees */}
                        <div className="mb-8">
                          <h4 className="font-bold text-gray-900 mb-4 text-lg">Our Elite Guarantees:</h4>
                          <div className="space-y-3">
                            {service.guarantees.map((guarantee, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{guarantee}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ROI Showcase */}
                        <div className="ultra-premium-card p-6 mb-8">
                          <div className="text-center">
                            <div className="text-2xl font-black premium-gradient-text mb-2">
                              {Math.round(service.savings.average / service.price.average)}x ROI
                            </div>
                            <div className="text-sm text-gray-600 font-semibold">
                              Average Return on Investment
                            </div>
                          </div>
                        </div>

                        {/* Premium CTAs */}
                        <div className="space-y-4">
                          <Button 
                            onClick={() => handleServiceSelection(service.id, service.name)}
                            className="w-full mega-cta text-white font-bold py-6 text-lg"
                          >
                            <Calendar className="h-5 w-5 mr-2" />
                            Start {service.name}
                          </Button>
                          
                          <a href={`tel:${COMPANY_CONFIG.contact.phone}`}>
                            <Button className="w-full conversion-optimized text-white font-bold py-4">
                              <Phone className="h-5 w-5 mr-2" />
                              Call Elite Advisor
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Elite Value Proposition */}
      <section className="py-24 hero-gradient text-white relative">
        <div className="absolute inset-0 particles opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black mb-8 text-glow">
              Why {serviceStats.totalClientsServed.toLocaleString()}+ Elite Clients Choose LMT
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Crown,
                title: "Certified Elite CPAs",
                description: "Only the top 1% of tax professionals with advanced certifications and ongoing elite training"
              },
              {
                icon: Target,
                title: "Guaranteed Maximum Refunds",
                description: "We guarantee to find every deduction you deserve or we'll refund our fee - no exceptions"
              },
              {
                icon: Clock,
                title: "24/7 Elite Support",
                description: "Tax questions don't wait for business hours - neither do we. Elite support whenever you need it"
              },
              {
                icon: Shield,
                title: "Complete Audit Protection",
                description: "Full audit defense and representation included with every service - we'll fight for you"
              },
              {
                icon: Sparkles,
                title: "AI-Enhanced Precision",
                description: "Our proprietary AI finds deductions humans miss while maintaining the personal elite touch"
              },
              {
                icon: Award,
                title: "Industry-Leading Results",
                description: "Consistently ranked #1 for client satisfaction and tax savings in independent reviews"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white hover-lift backdrop-blur-xl">
                <CardContent className="p-8 text-center">
                  <benefit.icon className="h-16 w-16 text-lime-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-white/80 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final Premium CTA */}
      <section className="py-32 bg-gradient-to-br from-green-50/30 to-purple-50/30 relative">
        <div className="absolute inset-0 particles opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-black premium-gradient-text mb-12">
            Ready to Maximize Your Wealth?
          </h2>
          <p className="text-2xl text-gray-600 mb-16 max-w-4xl mx-auto font-light">
            Join thousands of elite clients who trust LMT with their wealth optimization. 
            See why we're the #1 choice for high-net-worth tax strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link href="/client/onboarding">
              <Button className="mega-cta text-white text-3xl px-16 py-10 rounded-3xl font-black shadow-2xl neon-glow">
                <Crown className="mr-4 h-10 w-10" />
                Start Elite Service
              </Button>
            </Link>
            
            <a href={`tel:${COMPANY_CONFIG.contact.phone}`}>
              <Button className="conversion-optimized text-white text-3xl px-16 py-10 rounded-3xl font-black">
                <Phone className="mr-4 h-10 w-10" />
                {COMPANY_CONFIG.contact.phone}
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-gray-700">No Hidden Fees</div>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-gray-700">Maximum Refund Guaranteed</div>
            </div>
            <div className="text-center">
              <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-gray-700">100% Elite Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Intake Form Modal */}
      {showServiceIntake && selectedService && (
        <ServiceIntakeForm
          serviceType={selectedService.type}
          serviceTitle={selectedService.title}
          onClose={() => {
            setShowServiceIntake(false)
            setSelectedService(null)
          }}
        />
      )}
    </div>
  )
}
