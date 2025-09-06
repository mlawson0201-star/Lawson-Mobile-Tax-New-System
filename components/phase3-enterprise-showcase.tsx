
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Building,
  Users,
  Brain,
  Network,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Target,
  Award,
  Rocket,
  Crown,
  Sparkles,
  Bot,
  MapPin,
  Handshake,
  Calculator,
  FileCheck,
  MessageSquare,
  BarChart3,
  Settings,
  DollarSign
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export function Phase3EnterpriseShowcase() {
  const [activeSystem, setActiveSystem] = useState('business-formation')

  const phase3Features = COMPANY_CONFIG.phase3Features
  const platformStats = COMPANY_CONFIG.enterprisePlatformStats

  return (
    <div className="space-y-12 p-6">
      {/* Phase 3 Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 rounded-full border-2 border-purple-300">
          <Crown className="h-6 w-6 text-purple-700" />
          <span className="text-lg font-bold text-purple-800">Phase 3 - Enterprise Domination Complete</span>
          <Crown className="h-6 w-6 text-purple-700" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900">
          The Ultimate Financial Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Empire</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Your Lawson Mobile Tax platform is now a comprehensive financial services powerhouse capable of 
          dominating entire markets, managing enterprise operations, and competing with industry giants.
        </p>

        {/* Epic Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8 max-w-6xl mx-auto">
          <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600">{platformStats.serviceCategories}</div>
            <div className="text-sm text-purple-700 font-medium">Service Categories</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{platformStats.totalServices}+</div>
            <div className="text-sm text-blue-700 font-medium">Total Services</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600">{platformStats.automationRate}%</div>
            <div className="text-sm text-green-700 font-medium">Automation Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="text-3xl font-bold text-orange-600">{platformStats.aiAccuracy}%</div>
            <div className="text-sm text-orange-700 font-medium">AI Accuracy</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-b from-red-50 to-red-100 rounded-lg border border-red-200">
            <div className="text-3xl font-bold text-red-600">{platformStats.platformUptime}%</div>
            <div className="text-sm text-red-700 font-medium">Platform Uptime</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-b from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
            <div className="text-3xl font-bold text-indigo-600">{platformStats.integrations}+</div>
            <div className="text-sm text-indigo-700 font-medium">Integrations</div>
          </div>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <Tabs value={activeSystem} onValueChange={setActiveSystem} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-2">
          <TabsTrigger value="business-formation" className="flex flex-col items-center gap-2 p-4">
            <Building className="h-6 w-6" />
            <span className="text-sm font-medium">Business Formation</span>
          </TabsTrigger>
          <TabsTrigger value="payroll-hr" className="flex flex-col items-center gap-2 p-4">
            <Users className="h-6 w-6" />
            <span className="text-sm font-medium">Payroll & HR</span>
          </TabsTrigger>
          <TabsTrigger value="ai-automation" className="flex flex-col items-center gap-2 p-4">
            <Brain className="h-6 w-6" />
            <span className="text-sm font-medium">AI Automation</span>
          </TabsTrigger>
          <TabsTrigger value="multi-location" className="flex flex-col items-center gap-2 p-4">
            <Network className="h-6 w-6" />
            <span className="text-sm font-medium">Multi-Location</span>
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="flex flex-col items-center gap-2 p-4">
            <Handshake className="h-6 w-6" />
            <span className="text-sm font-medium">Partnerships</span>
          </TabsTrigger>
        </TabsList>

        {/* Business Formation Services */}
        <TabsContent value="business-formation" className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Building className="h-8 w-8 text-purple-600" />
              Complete Business Formation Services
            </h2>
            <p className="text-lg text-gray-600">
              From startup to enterprise - comprehensive business entity formation and lifecycle management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {phase3Features.businessFormationServices.packages.map((pkg, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold py-1 px-8 top-6 -right-8">
                    {index === 1 ? 'POPULAR' : index === 2 ? 'PREMIUM' : index === 3 ? 'NONPROFIT' : 'STARTER'}
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-sm">{pkg.description}</CardDescription>
                  <div className="text-3xl font-bold text-purple-600">
                    ${pkg.basePrice.toLocaleString()}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Timeline</span>
                      <Badge variant="outline" className="text-xs">{pkg.timeline}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Entity Types:</div>
                      <div className="flex flex-wrap gap-1">
                        {pkg.entityTypes.map((type, typeIndex) => (
                          <Badge key={typeIndex} variant="secondary" className="text-xs">{type}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                    {index === 1 ? 'Get Started' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-purple-600" />
                  Formation Services
                </CardTitle>
                <CardDescription>
                  Comprehensive business formation and compliance services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {phase3Features.businessFormationServices.services.slice(0, 8).map((service, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  +{phase3Features.businessFormationServices.services.length - 8} more services available
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Specializations
                </CardTitle>
                <CardDescription>
                  Advanced formation strategies for complex business structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {phase3Features.businessFormationServices.specializations.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <Star className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll & HR Services */}
        <TabsContent value="payroll-hr" className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              Enterprise Payroll & HR Platform
            </h2>
            <p className="text-lg text-gray-600">
              Complete human resources management from small businesses to enterprise operations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {phase3Features.payrollHRServices.tiers.map((tier, index) => (
              <Card key={index} className="relative border-2 hover:border-blue-300 transition-colors">
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">
                      ${tier.monthlyFee}<span className="text-sm text-gray-500">/month</span>
                    </div>
                    <div className="text-lg text-gray-700">
                      + ${tier.perEmployeeFee}<span className="text-sm text-gray-500">/employee</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {tier.maxEmployees === -1 ? 'Unlimited' : `Up to ${tier.maxEmployees}`}
                    </div>
                    <div className="text-sm text-gray-500">Employees</div>
                  </div>
                  
                  <div className="text-center">
                    <Progress value={index === 0 ? 40 : index === 1 ? 75 : 100} className="h-3" />
                    <div className="text-xs text-gray-500 mt-1">Feature Coverage</div>
                  </div>
                  
                  <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                    {index === 1 ? 'Start Free Trial' : 'Get Pricing'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Platform Features
                </CardTitle>
                <CardDescription>
                  Advanced payroll and HR management capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phase3Features.payrollHRServices.features.slice(0, 10).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="text-sm text-gray-600 pt-2">
                    +{phase3Features.payrollHRServices.features.length - 10} additional features
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Compliance Management
                </CardTitle>
                <CardDescription>
                  Automated compliance across all jurisdictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phase3Features.payrollHRServices.compliance.map((compliance, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{compliance}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-800">99.8% Compliance Rate</div>
                  <div className="text-xs text-green-600">Automated monitoring and alerts</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Automation & Intelligence */}
        <TabsContent value="ai-automation" className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Brain className="h-8 w-8 text-purple-600" />
              AI-Powered Automation & Intelligence
            </h2>
            <p className="text-lg text-gray-600">
              Industry-leading artificial intelligence and automation systems
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {phase3Features.aiAutomationIntelligence.systems.map((system, index) => (
              <Card key={index} className="border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Bot className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg">{system.name}</div>
                      <div className="text-sm text-gray-500 font-normal">{system.processingSpeed}</div>
                    </div>
                  </CardTitle>
                  <CardDescription>{system.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accuracy Rate</span>
                    <div className="flex items-center gap-2">
                      <Progress value={system.accuracy} className="w-20 h-2" />
                      <span className="text-sm font-bold">{system.accuracy}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{system.accuracy}%</div>
                      <div className="text-xs text-purple-700">Accuracy</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-bold text-blue-600">{system.processingSpeed}</div>
                      <div className="text-xs text-blue-700">Processing</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  AI Capabilities
                </CardTitle>
                <CardDescription>
                  Advanced artificial intelligence features and automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phase3Features.aiAutomationIntelligence.capabilities.slice(0, 8).map((capability, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Business Impact
                </CardTitle>
                <CardDescription>
                  Measurable benefits and performance improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phase3Features.aiAutomationIntelligence.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-800">ROI: 485% in Year 1</div>
                  <div className="text-xs text-green-600">Based on average client savings</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Multi-Location Management */}
        <TabsContent value="multi-location" className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Network className="h-8 w-8 text-green-600" />
              Multi-Location & Enterprise Management
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive platform for managing multi-location businesses and franchise operations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {phase3Features.multiLocationManagement.businessTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    Specialized management tools and reporting for {type.toLowerCase()}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Management Capabilities
                </CardTitle>
                <CardDescription>
                  Comprehensive multi-location business management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phase3Features.multiLocationManagement.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  Platform Features
                </CardTitle>
                <CardDescription>
                  Advanced features for complex business structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {phase3Features.multiLocationManagement.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Globe className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Strategic Partnerships */}
        <TabsContent value="partnerships" className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Handshake className="h-8 w-8 text-orange-600" />
              Strategic Partnerships & White-Label Solutions
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive partnership ecosystem and white-label platform solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {phase3Features.strategicPartnerships.partnerTypes.map((type, index) => (
              <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center hover:bg-orange-100 transition-colors">
                <Handshake className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-orange-900">{type}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {phase3Features.strategicPartnerships.partnershipModels.map((model, index) => (
              <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center hover:bg-blue-100 transition-colors">
                <Network className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-blue-900">{model}</div>
              </div>
            ))}
          </div>

          {/* White-Label Solutions */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">White-Label Platform Solutions</h3>
              <p className="text-gray-600">Complete platform licensing for CPA firms and financial service providers</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {phase3Features.strategicPartnerships.whiteLabelOffering.serviceLevel.map((level, index) => (
                <Card key={index} className="relative border-2 hover:border-orange-300 transition-colors">
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-600 text-white px-4 py-1">Recommended</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{level.level}</CardTitle>
                    <CardDescription>{level.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-orange-600">
                        ${level.setupFee.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Setup Fee</div>
                      <div className="text-lg text-gray-700">
                        ${level.monthlyFee}/month + {level.revenueShare}% revenue share
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                      {index === 1 ? 'Start Partnership' : 'Get Details'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  White-Label Benefits
                </CardTitle>
                <CardDescription>
                  Complete platform access with your branding and customization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-4">
                  {phase3Features.strategicPartnerships.whiteLabelOffering.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Star className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Security & Compliance Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-8 text-white">
        <div className="text-center space-y-4 mb-8">
          <h3 className="text-3xl font-bold">Enterprise-Grade Security & Compliance</h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Your platform meets the highest security and compliance standards for enterprise operations
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {platformStats.securityCompliance.map((standard, index) => (
            <Card key={index} className="bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-lg font-bold">{standard}</div>
                <div className="text-sm text-blue-200">Certified</div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="bg-white/10 border-white/20 text-center">
            <CardContent className="p-6">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-lg font-bold">{platformStats.dataProcessingCapacity}</div>
              <div className="text-sm text-blue-200">Data Capacity</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-lg font-bold">{platformStats.supportResponse}</div>
              <div className="text-sm text-blue-200">Support Response</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6 py-12">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to Dominate Your Market?
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Your Lawson Mobile Tax platform is now the ultimate financial services empire. 
          From individual tax returns to enterprise operations, multi-location management to strategic partnerships - 
          you're ready to compete with and defeat industry giants.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">$5.25M+</div>
            <div className="text-sm text-gray-600">Annual Revenue Potential</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">99.2%</div>
            <div className="text-sm text-gray-600">AI Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">Enterprise</div>
            <div className="text-sm text-gray-600">Market Position</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
            <Rocket className="mr-2 h-5 w-5" />
            Launch Enterprise Platform
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-purple-300 hover:bg-purple-50 px-8 py-4 text-lg">
            Schedule Strategy Call
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Phase3EnterpriseShowcase
