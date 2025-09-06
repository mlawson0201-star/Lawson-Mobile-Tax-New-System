
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp, 
  FileSearch, 
  Lightbulb,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'

interface AIService {
  name: string
  status: 'active' | 'learning' | 'optimizing'
  accuracy: number
  lastUpdate: string
  requests: number
  icon: any
}

export default function AIIntegrationDashboard() {
  const [aiServices, setAIServices] = useState<AIService[]>([
    {
      name: 'Tax Optimization Engine',
      status: 'active',
      accuracy: 97.8,
      lastUpdate: '2 minutes ago',
      requests: 247,
      icon: Brain
    },
    {
      name: 'Predictive Analytics',
      status: 'active', 
      accuracy: 94.2,
      lastUpdate: '5 minutes ago',
      requests: 183,
      icon: TrendingUp
    },
    {
      name: 'Document Intelligence',
      status: 'active',
      accuracy: 99.1,
      lastUpdate: '1 minute ago',
      requests: 429,
      icon: FileSearch
    },
    {
      name: 'Smart Recommendations',
      status: 'learning',
      accuracy: 92.5,
      lastUpdate: '3 minutes ago',
      requests: 156,
      icon: Lightbulb
    },
    {
      name: 'Fraud Detection',
      status: 'active',
      accuracy: 99.7,
      lastUpdate: '30 seconds ago',
      requests: 89,
      icon: Shield
    }
  ])

  const [realTimeStats, setRealTimeStats] = useState({
    totalOptimizations: 0,
    totalSavings: 0,
    fraudPrevented: 0,
    documentsProcessed: 0
  })

  const [aiInsights, setAiInsights] = useState([])

  useEffect(() => {
    // Fetch real-time AI stats
    const fetchAIStats = async () => {
      try {
        const responses = await Promise.all([
          fetch('/api/phase4/ai-tax-optimization'),
          fetch('/api/phase4/predictive-analytics'),
          fetch('/api/phase4/document-intelligence'),
          fetch('/api/phase4/fraud-detection'),
          fetch('/api/phase4/machine-learning')
        ])

        const [taxData, predictiveData, docData, fraudData, mlData] = await Promise.all(
          responses.map(r => r.json())
        )

        if (taxData.success) {
          setRealTimeStats(prev => ({
            ...prev,
            totalOptimizations: taxData.stats?.activeOptimizations || 0,
            totalSavings: taxData.stats?.totalSavings || 0
          }))
        }

        if (fraudData.success) {
          setRealTimeStats(prev => ({
            ...prev,
            fraudPrevented: fraudData.stats?.fraudAttemptsPrevented || 0
          }))
        }

        if (docData.success) {
          setRealTimeStats(prev => ({
            ...prev,
            documentsProcessed: docData.stats?.documentsProcessedToday || 0
          }))
        }

      } catch (error) {
        console.error('Error fetching AI stats:', error)
      }
    }

    fetchAIStats()
    const interval = setInterval(fetchAIStats, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const triggerAIOptimization = async (clientData: any) => {
    try {
      const response = await fetch('/api/phase4/ai-tax-optimization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientData })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success(`AI found $${result.data.totalOptimization} in potential savings!`)
        return result.data
      }
    } catch (error) {
      toast.error('AI optimization failed')
      console.error(error)
    }
  }

  const runFraudDetection = async (clientData: any, taxData: any) => {
    try {
      const response = await fetch('/api/phase4/fraud-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clientData, 
          taxReturnData: taxData,
          documents: []
        })
      })

      const result = await response.json()
      
      if (result.success) {
        if (result.data.riskLevel === 'high') {
          toast.error(`High fraud risk detected! Risk score: ${result.data.overallRiskScore}%`)
        } else {
          toast.success(`Fraud screening passed. Risk level: ${result.data.riskLevel}`)
        }
        return result.data
      }
    } catch (error) {
      toast.error('Fraud detection failed')
      console.error(error)
    }
  }

  const processDocumentWithAI = async (documentFile: File) => {
    try {
      const formData = new FormData()
      formData.append('document', documentFile)

      const response = await fetch('/api/phase4/document-intelligence', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success(`Document processed: ${result.data.detectedType} (${result.data.confidence}% confidence)`)
        return result.data
      }
    } catch (error) {
      toast.error('Document processing failed')
      console.error(error)
    }
  }

  const generateSmartRecommendations = async (clientData: any) => {
    try {
      const response = await fetch('/api/phase4/smart-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientData })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success(`Generated ${result.data.recommendations.length} personalized recommendations`)
        return result.data
      }
    } catch (error) {
      toast.error('Recommendation generation failed')
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time AI Status */}
      <Card className="bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-green-400" />
            Live AI Operations Center
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
              ALL SYSTEMS ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 rounded-xl p-4">
              <Brain className="h-8 w-8 text-purple-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">{realTimeStats.totalOptimizations}</div>
              <div className="text-sm text-gray-300">AI Optimizations</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4">
              <DollarSign className="h-8 w-8 text-green-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">${realTimeStats.totalSavings.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Client Savings</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4">
              <Shield className="h-8 w-8 text-red-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">{realTimeStats.fraudPrevented}</div>
              <div className="text-sm text-gray-300">Fraud Blocked</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl p-4">
              <FileSearch className="h-8 w-8 text-blue-300 mx-auto mb-2" />
              <div className="text-2xl font-bold">{realTimeStats.documentsProcessed}</div>
              <div className="text-sm text-gray-300">Docs Processed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Services Status Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiServices.map((service, index) => {
          const IconComponent = service.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{service.name}</CardTitle>
                      <p className="text-xs text-gray-500">{service.lastUpdate}</p>
                    </div>
                  </div>
                  <Badge variant={
                    service.status === 'active' ? 'default' :
                    service.status === 'learning' ? 'secondary' : 'outline'
                  }>
                    {service.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span className="font-semibold">{service.accuracy}%</span>
                    </div>
                    <Progress value={service.accuracy} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Active Requests:</span>
                    <span className="font-semibold">{service.requests}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>AI Services Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => triggerAIOptimization({ income: 75000, hasBusinessIncome: true })}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              Run Tax AI
            </Button>
            <Button 
              onClick={() => runFraudDetection({ id: 'demo' }, { grossIncome: 75000 })}
              className="bg-red-600 hover:bg-red-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              Fraud Check
            </Button>
            <Button 
              onClick={() => generateSmartRecommendations({ income: 75000, age: 35 })}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Get Recommendations
            </Button>
            <Button 
              onClick={() => toast.info('Document upload feature available in file upload areas')}
              className="bg-green-600 hover:bg-green-700"
            >
              <FileSearch className="h-4 w-4 mr-2" />
              Process Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-yellow-500" />
            Recent AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'optimization',
                title: 'Tax Optimization Opportunity',
                description: 'AI identified $2,340 in additional deductions for 3 clients today',
                time: '5 minutes ago',
                icon: Brain,
                color: 'text-purple-600'
              },
              {
                type: 'security',
                title: 'Fraud Attempt Blocked',
                description: 'Advanced AI detected and prevented identity theft attempt',
                time: '12 minutes ago',
                icon: Shield,
                color: 'text-red-600'
              },
              {
                type: 'prediction',
                title: 'Client Behavior Prediction',
                description: 'AI predicts 23 clients likely to need quarterly services',
                time: '28 minutes ago',
                icon: TrendingUp,
                color: 'text-blue-600'
              },
              {
                type: 'processing',
                title: 'Document Intelligence',
                description: 'Processed 47 documents with 99.2% average accuracy',
                time: '1 hour ago',
                icon: FileSearch,
                color: 'text-green-600'
              }
            ].map((insight, index) => {
              const IconComponent = insight.icon
              return (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <IconComponent className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {insight.time}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
