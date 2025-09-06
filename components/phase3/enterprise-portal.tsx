
// Phase 3: Enterprise Client Portal Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { 
  Building2, 
  Users, 
  Crown, 
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Settings,
  Plus,
  Eye,
  BarChart3,
  Target,
  Award,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  Briefcase,
  Globe,
  Shield,
  Star
} from 'lucide-react'

interface EnterpriseClient {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  industry: string
  employees: number
  annualRevenue: number
  accountManager: string
  subscriptionTier: 'basic' | 'premium' | 'enterprise'
  services: string[]
  documents: number
  lastActivity: string
  status: 'active' | 'inactive' | 'at_risk' | 'prospect'
}

interface SelfServiceModule {
  id: string
  name: string
  description: string
  category: string
  features: string[]
  usage: {
    totalUses: number
    thisMonth: number
    successRate: number
  }
  status: 'enabled' | 'disabled' | 'beta'
}

export default function EnterprisePortal() {
  const [enterpriseClients, setEnterpriseClients] = useState<EnterpriseClient[]>([])
  const [selfServiceModules, setSelfServiceModules] = useState<SelfServiceModule[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [portalAnalytics, setPortalAnalytics] = useState<any>(null)

  useEffect(() => {
    fetchEnterpriseData()
    fetchSelfServiceModules()
    fetchPortalAnalytics()
  }, [selectedCategory])

  const fetchEnterpriseData = async () => {
    try {
      const response = await fetch('/api/phase3/enterprise-portal?type=enterprise-clients')
      const data = await response.json()
      setEnterpriseClients(data.clients)
    } catch (error) {
      console.error('Failed to fetch enterprise clients:', error)
    }
  }

  const fetchSelfServiceModules = async () => {
    try {
      const url = selectedCategory === 'all' ? 
        '/api/phase3/enterprise-portal?type=self-service' : 
        `/api/phase3/enterprise-portal?type=self-service&category=${selectedCategory}`
      
      const response = await fetch(url)
      const data = await response.json()
      setSelfServiceModules(data.modules)
    } catch (error) {
      console.error('Failed to fetch self-service modules:', error)
    }
  }

  const fetchPortalAnalytics = async () => {
    try {
      const response = await fetch('/api/phase3/enterprise-portal?type=portal-analytics')
      const data = await response.json()
      setPortalAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch portal analytics:', error)
    }
  }

  const onboardEnterpriseClient = async () => {
    setIsOnboarding(true)
    
    try {
      const response = await fetch('/api/phase3/enterprise-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'onboard-enterprise-client',
          clientData: {
            companyName: 'New Enterprise Corp',
            contactPerson: 'John Executive',
            email: 'john@newenterprise.com',
            phone: '(555) 987-6543',
            industry: 'Technology',
            employees: 500,
            annualRevenue: 25000000,
            accountManager: 'Enterprise Team',
            subscriptionTier: 'enterprise',
            services: ['Corporate Tax', 'Audit Support', 'Tax Planning']
          }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('Enterprise client onboarded successfully!')
        fetchEnterpriseData()
      }
    } catch (error) {
      toast.error('Failed to onboard client')
    } finally {
      setIsOnboarding(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'at_risk': return 'bg-red-100 text-red-800'
      case 'prospect': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-orange-100 text-orange-800'
      case 'basic': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'enterprise': return <Crown className="h-4 w-4 text-purple-500" />
      case 'premium': return <Star className="h-4 w-4 text-orange-500" />
      case 'basic': return <Shield className="h-4 w-4 text-blue-500" />
      default: return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 text-white">
            <Building2 className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
            Enterprise Client Portal
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced self-service portal for enterprise clients with custom workflows, 
          dedicated account management, and comprehensive analytics.
        </p>
      </div>

      {/* Portal Analytics Overview */}
      {portalAnalytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{portalAnalytics.usage.monthlyActiveUsers}</div>
              <div className="text-sm text-gray-600">Monthly Active Users</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{portalAnalytics.usage.sessionDuration}</div>
              <div className="text-sm text-gray-600">Avg Session Duration</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{portalAnalytics.usage.completionRate}%</div>
              <div className="text-sm text-gray-600">Task Completion Rate</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{portalAnalytics.satisfaction.overallScore}</div>
              <div className="text-sm text-gray-600">Satisfaction Score</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enterprise Portal Tabs */}
      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="clients">Enterprise Clients</TabsTrigger>
          <TabsTrigger value="self-service">Self-Service</TabsTrigger>
          <TabsTrigger value="features">Enterprise Features</TabsTrigger>
          <TabsTrigger value="analytics">Portal Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-6">
          {/* Client Management Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Enterprise Client Management</h3>
              <p className="text-sm text-gray-600">Manage your high-value enterprise clients</p>
            </div>
            <Button
              onClick={onboardEnterpriseClient}
              disabled={isOnboarding}
              className="bg-gradient-to-r from-orange-500 to-purple-600"
            >
              {isOnboarding ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Onboarding...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Onboard Client
                </div>
              )}
            </Button>
          </div>

          {/* Enterprise Clients Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {enterpriseClients.map((client) => (
              <Card key={client.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                          {client.companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{client.companyName}</CardTitle>
                        <CardDescription>{client.contactPerson}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getTierColor(client.subscriptionTier)}>
                        <div className="flex items-center gap-1">
                          {getTierIcon(client.subscriptionTier)}
                          {client.subscriptionTier.toUpperCase()}
                        </div>
                      </Badge>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span>{client.industry}</span>
                    </div>
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
                    <div className="text-center">
                      <div className="font-bold text-lg">{client.employees}</div>
                      <div className="text-xs text-gray-600">Employees</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">${(client.annualRevenue / 1000000).toFixed(0)}M</div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{client.documents}</div>
                      <div className="text-xs text-gray-600">Documents</div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Services:</div>
                    <div className="flex flex-wrap gap-1">
                      {client.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Account Manager */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Account Manager:</span>
                    <span className="font-medium">{client.accountManager}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="self-service" className="space-y-6">
          {/* Self-Service Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Self-Service Modules</h3>
              <p className="text-sm text-gray-600">Empower clients with self-service capabilities</p>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Self-Service Modules */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selfServiceModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={
                      module.status === 'enabled' ? 'bg-green-100 text-green-800' :
                      module.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {module.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Usage Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-lg">{(module.usage.totalUses / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-gray-600">Total Uses</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{module.usage.thisMonth}</div>
                      <div className="text-xs text-gray-600">This Month</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{module.usage.successRate}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Key Features:</div>
                    <div className="space-y-1">
                      {module.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {module.features.length > 3 && (
                        <div className="text-xs text-blue-500">
                          +{module.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Advanced Workflow Automation',
                description: 'Fully automated tax preparation workflows with AI decision-making',
                benefits: ['85% reduction in processing time', 'Consistent quality', 'Real-time tracking'],
                pricing: '$500/month',
                complexity: 'Medium'
              },
              {
                title: 'Executive Dashboard Suite',
                description: 'C-suite level reporting with predictive analytics and KPIs',
                benefits: ['Real-time business intelligence', 'Predictive modeling', 'Compliance tracking'],
                pricing: '$1,000/month',
                complexity: 'High'
              },
              {
                title: 'Custom Integration Hub',
                description: 'Connect with existing enterprise systems and workflows',
                benefits: ['Seamless data flow', 'Reduced manual entry', 'Enhanced accuracy'],
                pricing: '$750/month',
                complexity: 'High'
              },
              {
                title: 'Dedicated Account Management',
                description: 'Premium support with dedicated account managers',
                benefits: ['Priority support', 'Strategic consultation', 'Custom solutions'],
                pricing: '$300/month',
                complexity: 'Low'
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Benefits:</div>
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-gray-600">
                      Complexity: <Badge variant="outline">{feature.complexity}</Badge>
                    </div>
                    <div className="font-bold text-lg text-purple-600">{feature.pricing}</div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Request Feature
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {portalAnalytics && (
            <>
              {/* Usage Analytics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{portalAnalytics.usage.dailyActiveUsers}</div>
                    <div className="text-sm text-gray-600">Daily Active Users</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{portalAnalytics.usage.sessionDuration}</div>
                    <div className="text-sm text-gray-600">Avg Session Duration</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{portalAnalytics.usage.bounceRate}%</div>
                    <div className="text-sm text-gray-600">Bounce Rate</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{portalAnalytics.usage.completionRate}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Feature Usage Analytics
                  </CardTitle>
                  <CardDescription>
                    Most and least used features in the portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">Most Used: {portalAnalytics.features.mostUsed}</div>
                        <div className="text-sm text-gray-600">High adoption rate among users</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Popular</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <div className="font-medium">Least Used: {portalAnalytics.features.leastUsed}</div>
                        <div className="text-sm text-gray-600">Consider improving UX or training</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">New Feature Adoption</div>
                        <div className="text-2xl font-bold text-blue-600">{portalAnalytics.features.newFeatureAdoption}%</div>
                        <div className="text-sm text-gray-600">Users trying new features</div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">Support Ticket Reduction</div>
                        <div className="text-2xl font-bold text-green-600">{portalAnalytics.features.supportTicketReduction}%</div>
                        <div className="text-sm text-gray-600">Reduction in support requests</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Satisfaction Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Client Satisfaction Metrics
                  </CardTitle>
                  <CardDescription>
                    Feedback scores across different aspects of the portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(portalAnalytics.satisfaction).map(([key, value]) => (
                      <div key={key} className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">{value as number}</div>
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="mt-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 inline ${i < Math.floor(value as number) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
