
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen,
  FileSignature, 
  BarChart3,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Smartphone,
  Users,
  Calculator,
  FileText,
  Mail,
  Bell,
  Star,
  Target,
  Zap,
  Award
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export function Phase2FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState('bookkeeping')

  const phase2Features = COMPANY_CONFIG.phase2Features

  return (
    <div className="space-y-12 p-6">
      {/* Phase 2 Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
          <Award className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">Phase 2 - Business Expansion Complete</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">
          Comprehensive Financial Services Platform
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your Lawson Mobile Tax platform now offers a complete suite of financial services, 
          from tax preparation to full-service bookkeeping and business consulting.
        </p>

        {/* Feature Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600">New Service Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">15+</div>
            <div className="text-sm text-gray-600">Advanced Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">$299-$1299</div>
            <div className="text-sm text-gray-600">Monthly Bookkeeping</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">96%</div>
            <div className="text-sm text-gray-600">E-Signature Success</div>
          </div>
        </div>
      </div>

      {/* Feature Tabs */}
      <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="bookkeeping" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Bookkeeping</span>
          </TabsTrigger>
          <TabsTrigger value="esignature" className="flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            <span className="hidden sm:inline">E-Signature</span>
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Reporting</span>
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Communication</span>
          </TabsTrigger>
        </TabsList>

        {/* Bookkeeping Services */}
        <TabsContent value="bookkeeping" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              Professional Bookkeeping Services
            </h2>
            <p className="text-gray-600">
              Full-service bookkeeping from basic monthly services to enterprise financial management
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {phase2Features.bookkeepingServices.packages.map((pkg, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-purple-200 transition-colors">
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute transform rotate-45 bg-purple-600 text-white text-xs font-bold py-1 px-8 top-4 -right-6">
                    {index === 1 ? 'POPULAR' : index === 2 ? 'PRO' : 'STARTER'}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pkg.name}</span>
                    <Badge variant="outline">{pkg.assignedPro}</Badge>
                  </CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="text-3xl font-bold text-purple-600">
                    ${pkg.monthlyPrice}<span className="text-sm text-gray-500">/month</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly Transactions</span>
                      <span className="font-medium">
                        {pkg.maxTransactions === -1 ? 'Unlimited' : `Up to ${pkg.maxTransactions}`}
                      </span>
                    </div>
                    <Progress value={index === 0 ? 30 : index === 1 ? 70 : 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase2Features.bookkeepingServices.features.slice(0, index + 3).map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                    {index === 1 ? 'Get Started' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* E-Signature Integration */}
        <TabsContent value="esignature" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <FileSignature className="h-6 w-6 text-purple-600" />
              Digital Document Signing
            </h2>
            <p className="text-gray-600">
              Streamlined e-signature workflow for all tax and business documents
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Available Documents
                </CardTitle>
                <CardDescription>
                  Professional document templates ready for electronic signature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {phase2Features.eSignatureIntegration.availableDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileSignature className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">Ready</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security & Performance
                </CardTitle>
                <CardDescription>
                  Enterprise-grade security with exceptional user experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {phase2Features.eSignatureIntegration.completionRate}
                    </div>
                    <div className="text-sm text-green-700">Completion Rate</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {phase2Features.eSignatureIntegration.averageSigningTime}
                    </div>
                    <div className="text-sm text-blue-700">Avg. Signing Time</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Security Features:</h4>
                  {phase2Features.eSignatureIntegration.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Reporting */}
        <TabsContent value="reporting" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              Advanced Reporting & Analytics
            </h2>
            <p className="text-gray-600">
              Business intelligence and insights for clients and internal operations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Report Types
                </CardTitle>
                <CardDescription>
                  Comprehensive reporting suite for all stakeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {phase2Features.advancedReporting.reportTypes.map((report, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">{report}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Advanced Capabilities
                </CardTitle>
                <CardDescription>
                  Powerful features for data-driven decision making
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {phase2Features.advancedReporting.deliveryFormats.map((format, index) => (
                    <Badge key={index} variant="outline" className="justify-center py-2">
                      {format}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Features:</h4>
                  {phase2Features.advancedReporting.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="h-3 w-3 text-orange-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Communication Hub */}
        <TabsContent value="communication" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <MessageSquare className="h-6 w-6 text-purple-600" />
              Client Communication Hub
            </h2>
            <p className="text-gray-600">
              Comprehensive communication platform for seamless client interactions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  Communication Templates
                </CardTitle>
                <CardDescription>
                  Pre-built, personalized messaging templates for every interaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {phase2Features.communicationHub.templateCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">{category}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Outstanding communication performance and client satisfaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {phase2Features.communicationHub.clientSatisfactionScore}/5
                    </div>
                    <div className="text-sm text-green-700">Client Satisfaction</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {phase2Features.communicationHub.averageResponseTime}
                    </div>
                    <div className="text-sm text-blue-700">Response Time</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Communication Features:</h4>
                  {phase2Features.communicationHub.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageSquare className="h-3 w-3 text-blue-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Integrated Service Showcase */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Complete Financial Services Platform</h3>
          <p className="text-purple-100 max-w-2xl mx-auto">
            From individual tax returns to comprehensive business financial management, 
            your platform now serves every client need with professional excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {Object.entries(COMPANY_CONFIG.integratedServices).map(([category, services]) => (
            <Card key={category} className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{services.length}+</div>
                <div className="text-sm text-purple-100">Services Available</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-bold text-gray-900">
          Ready to Launch Your Comprehensive Tax & Financial Services Platform?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Phase 2 is complete! Your Lawson Mobile Tax platform is now a full-service 
          financial powerhouse ready to serve clients from basic tax prep to enterprise consulting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Launch Full Platform
          </Button>
          <Button size="lg" variant="outline">
            Schedule Demo Call
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Phase2FeaturesShowcase
