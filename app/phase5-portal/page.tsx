
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RealtimeAIAdvisor } from '@/components/phase5/realtime-ai-advisor'
import { AdvancedClientPortal } from '@/components/phase5/advanced-client-portal'
import { 
  Brain, 
  Zap, 
  Shield, 
  Smartphone,
  BarChart3,
  Users,
  Settings,
  Sparkles,
  TrendingUp,
  Database,
  Globe,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react'

interface SystemStatus {
  aiAdvisor: 'active' | 'initializing' | 'error'
  predictiveAnalytics: 'active' | 'initializing' | 'error'
  realtimeCollaboration: 'active' | 'initializing' | 'error'
  enterpriseIntegrations: 'active' | 'initializing' | 'error'
  clientPortal: 'active' | 'initializing' | 'error'
  securityFramework: 'active' | 'initializing' | 'error'
}

export default function Phase5Portal() {
  const [activeView, setActiveView] = useState('overview')
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    aiAdvisor: 'initializing',
    predictiveAnalytics: 'initializing',
    realtimeCollaboration: 'initializing',
    enterpriseIntegrations: 'initializing',
    clientPortal: 'initializing',
    securityFramework: 'initializing'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate system initialization
    const initializeSystems = async () => {
      const systems = Object.keys(systemStatus) as (keyof SystemStatus)[]
      
      for (let i = 0; i < systems.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setSystemStatus(prev => ({
          ...prev,
          [systems[i]]: 'active'
        }))
      }
      
      setIsLoading(false)
    }
    
    initializeSystems()
  }, [])

  const allSystemsActive = Object.values(systemStatus).every(status => status === 'active')

  const features = [
    {
      id: 'ai-advisor',
      title: 'Real-Time AI Tax Advisor',
      description: 'Advanced AI providing instant tax calculations and optimization strategies',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      status: systemStatus.aiAdvisor,
      metrics: {
        accuracy: '99.7%',
        responseTime: '< 2 seconds',
        recommendations: '2,847',
        savings: '$847,392'
      }
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics Engine',
      description: 'ML-powered insights for business growth and tax optimization',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      status: systemStatus.predictiveAnalytics,
      metrics: {
        accuracy: '94.3%',
        predictions: '156',
        revenue_impact: '+22%',
        clients_analyzed: '1,847'
      }
    },
    {
      id: 'collaboration',
      title: 'Real-Time Collaboration Suite',
      description: 'Live document editing, video calls, and instant messaging',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      status: systemStatus.realtimeCollaboration,
      metrics: {
        active_sessions: '47',
        documents_shared: '892',
        response_time: '1.3s',
        uptime: '99.9%'
      }
    },
    {
      id: 'integrations',
      title: 'Enterprise Integration Hub',
      description: 'Seamless connections to accounting, banking, and government systems',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      status: systemStatus.enterpriseIntegrations,
      metrics: {
        connected_systems: '12',
        data_synced: '15,847',
        sync_reliability: '98.5%',
        api_calls: '247K'
      }
    },
    {
      id: 'client-portal',
      title: 'Advanced Client Portal',
      description: 'Self-service platform with AI guidance and real-time updates',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      status: systemStatus.clientPortal,
      metrics: {
        active_clients: '1,247',
        satisfaction: '4.8/5',
        mobile_usage: '73%',
        completion_rate: '94%'
      }
    },
    {
      id: 'security',
      title: 'Zero-Trust Security Framework',
      description: 'Military-grade security with AI threat detection',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      status: systemStatus.securityFramework,
      metrics: {
        threats_blocked: '3,247',
        security_score: '98/100',
        compliance: '100%',
        incidents: '0'
      }
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'initializing': return Clock
      case 'error': return Shield
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'initializing': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-pulse">
              <div className="absolute inset-4 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Initializing Phase 5 Systems</h2>
          <div className="space-y-2 max-w-md">
            {Object.entries(systemStatus).map(([system, status]) => {
              const StatusIcon = getStatusIcon(status)
              return (
                <div key={system} className="flex items-center justify-between text-slate-300">
                  <span className="capitalize">{system.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <StatusIcon className={`w-4 h-4 ${getStatusColor(status)}`} />
                </div>
              )
            })}
          </div>
          <div className="mt-6">
            <div className="text-purple-400 text-sm">
              {Object.values(systemStatus).filter(s => s === 'active').length} / {Object.keys(systemStatus).length} systems ready
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Phase 5 - Ultimate AI Platform</h1>
                <p className="text-slate-300">Enterprise-grade tax services with advanced AI capabilities</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-green-400 text-green-300 bg-green-400/10">
              <CheckCircle className="w-3 h-3 mr-1" />
              All Systems Operational
            </Badge>
            <Button variant="outline" size="sm" className="border-purple-600 text-purple-400">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <Eye className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-advisor" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              AI Advisor
            </TabsTrigger>
            <TabsTrigger value="client-portal" className="data-[state=active]:bg-purple-600">
              <Smartphone className="w-4 h-4 mr-2" />
              Client Portal
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="data-[state=active]:bg-purple-600">
              <Database className="w-4 h-4 mr-2" />
              Enterprise
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const StatusIcon = getStatusIcon(feature.status)
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer h-full"
                          onClick={() => feature.id === 'ai-advisor' ? setActiveView('ai-advisor') : feature.id === 'client-portal' ? setActiveView('client-portal') : null}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-4 h-4 ${getStatusColor(feature.status)}`} />
                            <Badge variant="outline" className={`text-xs ${
                              feature.status === 'active' ? 'border-green-400 text-green-300 bg-green-400/10' : 
                              'border-yellow-400 text-yellow-300 bg-yellow-400/10'
                            }`}>
                              {feature.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                          {feature.title}
                        </CardTitle>
                        <p className="text-slate-300 text-sm">
                          {feature.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(feature.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-purple-400">
                                {value}
                              </div>
                              <div className="text-xs text-slate-400 capitalize">
                                {key.replace(/_/g, ' ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* System Health Dashboard */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  System Health & Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                    <div className="text-slate-300 text-sm">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">1.2s</div>
                    <div className="text-slate-300 text-sm">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
                    <div className="text-slate-300 text-sm">Active Integrations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                    <div className="text-slate-300 text-sm">AI Availability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Advisor Tab */}
          <TabsContent value="ai-advisor" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  Real-Time AI Tax Advisor
                </CardTitle>
                <p className="text-slate-300">
                  Advanced AI providing instant tax calculations, optimization strategies, and compliance guidance
                </p>
              </CardHeader>
            </Card>
            <RealtimeAIAdvisor />
          </TabsContent>

          {/* Client Portal Tab */}
          <TabsContent value="client-portal" className="space-y-6">
            <AdvancedClientPortal />
          </TabsContent>

          {/* Enterprise Tab */}
          <TabsContent value="enterprise" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-400" />
                  Enterprise Integration Dashboard
                </CardTitle>
                <p className="text-slate-300">
                  Monitor and manage all enterprise integrations from a single dashboard
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">QuickBooks Online</h4>
                      <Badge className="bg-green-600 text-white">Connected</Badge>
                    </div>
                    <div className="text-slate-300 text-sm">
                      <p>Last Sync: 2 hours ago</p>
                      <p>Records: 2,847</p>
                      <p>Health: Excellent</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Plaid Banking</h4>
                      <Badge className="bg-green-600 text-white">Connected</Badge>
                    </div>
                    <div className="text-slate-300 text-sm">
                      <p>Last Sync: 30 minutes ago</p>
                      <p>Records: 15,642</p>
                      <p>Health: Excellent</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">IRS e-file</h4>
                      <Badge className="bg-green-600 text-white">Connected</Badge>
                    </div>
                    <div className="text-slate-300 text-sm">
                      <p>Last Sync: 24 hours ago</p>
                      <p>Records: 156</p>
                      <p>Health: Excellent</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage All Integrations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
