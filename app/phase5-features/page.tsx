
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  BarChart3,
  Users,
  Clock,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Database,
  Cpu,
  Network,
  Eye
} from 'lucide-react'

export default function Phase5Features() {
  const [activeDemo, setActiveDemo] = useState('ai-advisor')

  const features = [
    {
      id: 'ai-advisor',
      title: 'Real-Time AI Tax Advisor',
      description: 'Advanced AI that provides instant tax advice and optimization strategies',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      status: 'active',
      completion: 95,
      capabilities: [
        'Real-time tax calculations with 2024 tax code',
        'Instant deduction optimization recommendations',
        'Predictive tax planning for next year',
        'AI-powered audit risk assessment',
        'Personalized tax strategies based on client profile'
      ]
    },
    {
      id: 'realtime-collab',
      title: 'Real-Time Collaboration Suite',
      description: 'Live document editing, video calls, and instant messaging',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      status: 'active',
      completion: 90,
      capabilities: [
        'Live document co-editing with conflict resolution',
        'Integrated video conferencing',
        'Real-time screen sharing',
        'Instant messaging with file sharing',
        'Live cursor tracking and annotations'
      ]
    },
    {
      id: 'advanced-analytics',
      title: 'Predictive Analytics Engine',
      description: 'ML-powered insights for business growth and tax optimization',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      status: 'active',
      completion: 88,
      capabilities: [
        'Client lifetime value predictions',
        'Revenue forecasting with 95% accuracy',
        'Tax opportunity identification',
        'Client churn prediction and prevention',
        'Market trend analysis and recommendations'
      ]
    },
    {
      id: 'smart-automation',
      title: 'Intelligent Automation Hub',
      description: 'AI-driven workflows that adapt and learn from patterns',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      status: 'active',
      completion: 92,
      capabilities: [
        'Self-learning workflow optimization',
        'Intelligent document routing',
        'Predictive client communication',
        'Automated compliance checking',
        'Smart resource allocation'
      ]
    },
    {
      id: 'client-portal',
      title: 'Advanced Client Portal',
      description: 'Self-service platform with AI guidance and real-time updates',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      status: 'active',
      completion: 87,
      capabilities: [
        'AI-guided document upload with instant feedback',
        'Real-time tax return progress tracking',
        'Interactive tax planning tools',
        'Secure messaging with instant notifications',
        'Mobile app with offline capabilities'
      ]
    },
    {
      id: 'enterprise-security',
      title: 'Zero-Trust Security Framework',
      description: 'Military-grade security with AI threat detection',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      status: 'active',
      completion: 94,
      capabilities: [
        'AI-powered threat detection and response',
        'Behavioral anomaly detection',
        'Encrypted communication channels',
        'Compliance automation (SOC 2, HIPAA)',
        'Real-time security monitoring dashboard'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium">Phase 5 - Ultimate AI Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              The Future of
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tax Services
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Experience the most advanced AI-driven tax platform ever built. Real-time intelligence, 
              predictive analytics, and enterprise-grade automation that transforms how you serve clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
                <Rocket className="w-5 h-5 mr-2" />
                Launch Phase 5
              </Button>
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400/10 px-8 py-3">
                <Eye className="w-5 h-5 mr-2" />
                Live Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Revolutionary Capabilities
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Each feature represents breakthrough innovation in tax technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer h-full"
                    onClick={() => setActiveDemo(feature.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className={`border-green-400 text-green-300 ${feature.status === 'active' ? 'bg-green-400/10' : 'bg-slate-400/10'}`}>
                      {feature.status === 'active' ? '✓ Active' : 'Coming Soon'}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Implementation</span>
                      <span className="text-sm text-purple-400 font-medium">{feature.completion}%</span>
                    </div>
                    <Progress value={feature.completion} className="h-2" />
                  </div>
                  
                  <ul className="space-y-2">
                    {feature.capabilities.slice(0, 3).map((capability, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-center">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mr-3" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">
              Interactive Feature Showcase
            </CardTitle>
            <CardDescription className="text-center text-slate-300">
              Experience the power of Phase 5 features in real-time
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeDemo} onValueChange={setActiveDemo}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-slate-900/50">
                {features.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="text-xs data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <feature.icon className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {feature.title.split(' ')[0]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id} className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-900/50 rounded-lg p-6"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-lg bg-gradient-to-r ${feature.color}`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                        <p className="text-slate-300">{feature.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Full Capabilities</h4>
                        <ul className="space-y-3">
                          {feature.capabilities.map((capability, idx) => (
                            <li key={idx} className="text-slate-300 flex items-start">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-4">Live Preview</h4>
                        <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <feature.icon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                            <p className="text-slate-300">Interactive demo loading...</p>
                            <div className="flex justify-center mt-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Phase 5 Performance Metrics</h3>
            <p className="text-slate-300">Real-world impact of our advanced AI platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">99.7%</div>
              <div className="text-slate-300">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">86%</div>
              <div className="text-slate-300">Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">142%</div>
              <div className="text-slate-300">ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-300">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
