
'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  DollarSign,
  Clock,
  Shield,
  TrendingUp,
  Zap,
  Crown,
  Users,
  Building2,
  PieChart,
  AlertTriangle,
  Home,
  Calculator,
  FileText,
  Award,
  Sparkles,
  Target,
  Banknote
} from 'lucide-react'
import { quickServices, serviceStats } from '@/lib/services-data'

export function ServicesShowcase() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-green-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 particles opacity-40"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-lime-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 premium-badge rounded-full px-8 py-3 mb-8">
            <Crown className="h-6 w-6" />
            <span className="font-bold text-lg">Premium Tax Services</span>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-black premium-gradient-text mb-12 elite-text-shadow">
            Maximize Your Wealth
          </h2>
          <p className="text-2xl lg:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light">
            Elite tax strategies that have saved our clients over <span className="success-metric text-4xl font-bold">${Math.round(serviceStats.totalRefundsSecured / 1000000)}M+</span> in taxes
          </p>
        </div>

        {/* Elite Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-24">
          <Card className="service-card text-center p-6">
            <div className="text-4xl font-black success-metric mb-2">
              {serviceStats.totalClientsServed.toLocaleString()}+
            </div>
            <p className="text-sm font-semibold text-gray-600">Elite Clients</p>
          </Card>

          <Card className="service-card text-center p-6">
            <div className="text-4xl font-black price-highlight mb-2">
              ${serviceStats.averageSavings.toLocaleString()}
            </div>
            <p className="text-sm font-semibold text-gray-600">Avg Savings</p>
          </Card>

          <Card className="service-card text-center p-6">
            <div className="text-4xl font-black text-purple-600 mb-2">
              ${Math.round(serviceStats.totalRefundsSecured / 1000000)}M+
            </div>
            <p className="text-sm font-semibold text-gray-600">Total Secured</p>
          </Card>

          <Card className="service-card text-center p-6">
            <div className="text-4xl font-black text-emerald-600 mb-2">
              {serviceStats.satisfactionRate}%
            </div>
            <p className="text-sm font-semibold text-gray-600">Satisfaction</p>
          </Card>

          <Card className="service-card text-center p-6">
            <div className="text-4xl font-black text-blue-600 mb-2">
              {serviceStats.averageRefundTime}
            </div>
            <p className="text-sm font-semibold text-gray-600">Avg Speed</p>
          </Card>

          <Card className="service-card text-center p-6">
            <div className="text-4xl font-black text-red-600 mb-2">
              {serviceStats.auditWinRate}%
            </div>
            <p className="text-sm font-semibold text-gray-600">Audit Win</p>
          </Card>
        </div>

        {/* Premium Services Grid */}
        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {quickServices.map((service, index) => (
            <Card key={service.name} className="service-card group relative overflow-hidden">
              {/* Premium Badge for Popular Services */}
              {index < 3 && (
                <div className="absolute -top-3 -right-3 z-20">
                  <Badge className="premium-badge text-white px-4 py-2 rounded-full">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${
                    index === 0 ? 'from-emerald-500 to-green-600' :
                    index === 1 ? 'from-green-600 to-lime-500' :
                    index === 2 ? 'from-purple-600 to-indigo-500' :
                    index === 3 ? 'from-orange-500 to-red-500' :
                    index === 4 ? 'from-yellow-500 to-orange-500' :
                    'from-indigo-600 to-purple-600'
                  } rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 pulse-ring`}>
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-black price-highlight">
                      ${service.startingPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Starting Price</div>
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-3">
                  {service.name}
                </CardTitle>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Value Proposition */}
                <div className="revenue-card p-6 rounded-2xl mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black success-metric">
                        ${(service.startingPrice * 8).toLocaleString()}+
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Avg Tax Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-purple-600">
                        {Math.round((service.startingPrice * 8) / service.startingPrice)}x
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">Return on Investment</div>
                    </div>
                  </div>
                </div>

                {/* Elite Features */}
                <div className="space-y-3 mb-8">
                  {[
                    'Maximum refund guarantee',
                    '100% accuracy promise',
                    'Elite CPA review',
                    'Audit defense included',
                    'Year-round support'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Premium CTAs */}
                <div className="space-y-4">
                  <Link href={service.link}>
                    <Button className="w-full mega-cta text-white font-bold py-4 rounded-2xl text-lg group/btn">
                      <Sparkles className="h-5 w-5 mr-2" />
                      <span>View Premium Details</span>
                      <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <Link href="/auth/client/signin">
                    <Button className="w-full conversion-optimized text-white font-bold py-4 rounded-2xl">
                      <Crown className="h-5 w-5 mr-2" />
                      Start Maximizing Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Elite Value Proposition Banner */}
        <div className="ultra-premium-card p-12 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-purple-500/5"></div>
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl lg:text-5xl font-black mb-6 premium-gradient-text">
                  Why Elite Clients Choose LMT
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: Crown, text: "Certified Elite CPAs", color: "text-purple-600" },
                    { icon: Zap, text: "AI-Powered Precision", color: "text-blue-600" },
                    { icon: Shield, text: "Complete Audit Protection", color: "text-green-600" },
                    { icon: TrendingUp, text: "Guaranteed Maximization", color: "text-emerald-600" },
                    { icon: Clock, text: "24/7 Elite Support", color: "text-indigo-600" },
                    { icon: Award, text: "Industry-Leading Results", color: "text-orange-600" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <span className="font-bold text-gray-800 text-lg">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="mb-8">
                  <div className="text-6xl font-black premium-gradient-text mb-2">
                    ${Math.round(serviceStats.totalRefundsSecured / serviceStats.totalClientsServed).toLocaleString()}
                  </div>
                  <p className="text-xl text-gray-600 font-semibold">
                    Average Per Client Savings
                  </p>
                </div>
                
                <Link href="/auth/client/signin">
                  <Button className="mega-cta text-white text-2xl px-16 py-8 rounded-3xl font-black shadow-2xl neon-glow">
                    <Target className="mr-4 h-8 w-8" />
                    Start Your Wealth Journey
                    <Banknote className="ml-4 h-8 w-8" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Premium Services */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-8 premium-gradient-text">
            Specialized Elite Services
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { name: "Multi-State Elite", price: "$299/state", icon: "🗺️", savings: "$2,400+" },
              { name: "Amendment Recovery", price: "$399 each", icon: "📝", savings: "$4,800+" },
              { name: "Quarterly Wealth Planning", price: "$199/quarter", icon: "📊", savings: "$12,000+" },
              { name: "Elite Bookkeeping", price: "$699/month", icon: "📚", savings: "$8,400+" }
            ].map((service, index) => (
              <Card key={index} className="service-card p-6 hover-lift">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="font-bold text-gray-900 text-xl mb-2">{service.name}</h4>
                <div className="price-highlight text-2xl font-black mb-2">{service.price}</div>
                <div className="success-metric font-bold">Avg Savings: {service.savings}</div>
              </Card>
            ))}
          </div>

          <Link href="/services">
            <Button className="mega-cta text-white text-xl px-12 py-6 rounded-2xl font-bold">
              <ArrowRight className="mr-3 h-6 w-6" />
              Explore All Elite Services
              <Crown className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
