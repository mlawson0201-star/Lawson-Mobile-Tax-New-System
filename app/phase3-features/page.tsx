
// Phase 3: Enterprise & Scaling Features Showcase Page
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import BusinessIntelligence from '@/components/phase3/business-intelligence'
import MultiLocationManager from '@/components/phase3/multi-location-manager'
import SecurityCompliance from '@/components/phase3/security-compliance'
import APIWhitelabel from '@/components/phase3/api-whitelabel'
import EnterprisePortal from '@/components/phase3/enterprise-portal'
import { 
  BarChart3, 
  MapPin, 
  Shield, 
  Code, 
  Building2,
  Crown,
  Sparkles,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Target,
  Lightbulb,
  Rocket,
  Star,
  Globe,
  Zap,
  Award
} from 'lucide-react'

export default function Phase3FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState('overview')

  const features = [
    {
      id: 'business-intelligence',
      name: 'Business Intelligence',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-blue-500 to-purple-600',
      description: 'Advanced reporting & analytics with AI-powered insights and forecasting',
      benefits: ['Real-time business intelligence', '92% faster decision making', 'Predictive analytics'],
      metrics: { reports: '50+', accuracy: '98.5%', roi: '+340%' }
    },
    {
      id: 'multi-location',
      name: 'Multi-Location Management',
      icon: <MapPin className="h-6 w-6" />,
      color: 'from-purple-500 to-blue-600',
      description: 'Centralized management for corporate offices, franchises, and partner locations',
      benefits: ['Unified operations', '35% cost reduction', 'Scalable franchise model'],
      metrics: { locations: '50+', efficiency: '+89%', growth: '+28%' }
    },
    {
      id: 'security-compliance',
      name: 'Security & Compliance',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-red-500 to-orange-600',
      description: 'Enterprise-grade security monitoring and regulatory compliance management',
      benefits: ['SOC 2 compliance', '96.8% security score', 'Automated audit trails'],
      metrics: { compliance: '98.5%', threats: '0', uptime: '99.9%' }
    },
    {
      id: 'api-whitelabel',
      name: 'API & White-label',
      icon: <Code className="h-6 w-6" />,
      color: 'from-blue-500 to-purple-600',
      description: 'Powerful APIs and white-label solutions for partners and integrations',
      benefits: ['50+ API endpoints', 'Custom branding', 'Revenue sharing'],
      metrics: { apis: '50+', partners: '25+', revenue: '+45%' }
    },
    {
      id: 'enterprise-portal',
      name: 'Enterprise Portal',
      icon: <Building2 className="h-6 w-6" />,
      color: 'from-orange-500 to-purple-600',
      description: 'Advanced self-service portal for enterprise clients with custom workflows',
      benefits: ['Self-service capabilities', '73% support reduction', '4.7/5 satisfaction'],
      metrics: { clients: '100+', automation: '87%', satisfaction: '4.7/5' }
    }
  ]

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'business-intelligence':
        return <BusinessIntelligence />
      case 'multi-location':
        return <MultiLocationManager />
      case 'security-compliance':
        return <SecurityCompliance />
      case 'api-whitelabel':
        return <APIWhitelabel />
      case 'enterprise-portal':
        return <EnterprisePortal />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 via-purple-900 to-orange-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold text-lg px-6 py-3 mb-6">
            <Crown className="h-5 w-5 mr-2" />
            🏢 PHASE 3 - ENTERPRISE & SCALING
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            ENTERPRISE-READY
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-purple-300">
              TAX PLATFORM
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 opacity-90 leading-relaxed max-w-4xl mx-auto">
            Transform your practice into an <strong className="text-orange-300">enterprise powerhouse</strong> with 
            multi-location management, advanced security, and <strong className="text-yellow-300">white-label solutions</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-400 to-purple-500 hover:from-orange-500 hover:to-purple-600 text-white font-bold text-lg px-8 py-4"
            >
              <Crown className="h-6 w-6 mr-2" />
              EXPLORE ENTERPRISE
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-8 py-4"
            >
              <BarChart3 className="h-6 w-6 mr-2" />
              View ROI Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Phase 3 Overview */}
      {activeFeature === 'overview' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Phase 3: Enterprise & Scaling Platform</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced enterprise features designed for scaling tax practices, multi-location operations, 
                and white-label partner programs.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature) => (
                <Card 
                  key={feature.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    activeFeature === feature.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.name}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex gap-2">
                        {Object.entries(feature.metrics).map(([key, value]) => (
                          <Badge key={key} className="bg-blue-100 text-blue-800 text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className={`bg-gradient-to-r ${feature.color}`}>
                        Explore <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enterprise Benefits */}
            <Card className="bg-gradient-to-r from-blue-700 via-purple-800 to-orange-700 text-white">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Award className="h-8 w-8" />
                  Enterprise-Grade Benefits
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Transform your tax practice into a scalable enterprise platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10X</div>
                    <p className="opacity-90">Operational Scale</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">98.5%</div>
                    <p className="opacity-90">Security Compliance</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">$2M+</div>
                    <p className="opacity-90">Annual Revenue Potential</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">500%</div>
                    <p className="opacity-90">ROI Within 2 Years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Feature Content */}
      {activeFeature !== 'overview' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={() => setActiveFeature('overview')}
                  variant="outline"
                  className="mb-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Overview
                </Button>
                {features.map((feature) => (
                  <Button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    variant={activeFeature === feature.id ? 'default' : 'outline'}
                    className={`mb-2 ${
                      activeFeature === feature.id 
                        ? `bg-gradient-to-r ${feature.color} text-white` 
                        : ''
                    }`}
                  >
                    {feature.icon}
                    <span className="ml-2 hidden sm:inline">{feature.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Render Feature Content */}
            {renderFeatureContent()}
          </div>
        </section>
      )}

      {/* Enterprise CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Tax Practice?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading tax practices using Phase 3 enterprise features to scale operations, 
            manage multiple locations, and create new revenue streams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100 font-bold"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Start Enterprise Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-700 font-bold"
            >
              <Star className="h-5 w-5 mr-2" />
              Book Enterprise Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
