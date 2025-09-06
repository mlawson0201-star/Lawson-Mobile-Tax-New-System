
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield, 
  Globe, 
  BarChart3,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain,
  Award,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface EnterpriseMetrics {
  businessMetrics: any
  performanceMetrics: any
  aiMetrics: any
  competitiveAnalysis: any
  forecasting: any
  riskAssessment: any
}

export default function EnterpriseDashboard() {
  const [metrics, setMetrics] = useState<EnterpriseMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchEnterpriseMetrics = async () => {
    try {
      const response = await fetch('/api/phase4/enterprise-analytics')
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Error fetching enterprise metrics:', error)
      toast.error('Failed to load enterprise analytics')
    } finally {
      setLoading(false)
    }
  }

  const refreshMetrics = async () => {
    setRefreshing(true)
    await fetchEnterpriseMetrics()
    setRefreshing(false)
    toast.success('Enterprise metrics refreshed')
  }

  useEffect(() => {
    fetchEnterpriseMetrics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-lg">Loading Enterprise Analytics...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Enterprise Dashboard</h2>
          <p className="text-gray-600 mt-1">Advanced business intelligence and analytics</p>
        </div>
        <Button 
          onClick={refreshMetrics} 
          disabled={refreshing}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Enterprise KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${metrics?.businessMetrics?.totalRevenue?.toLocaleString()}
                </p>
                <p className="text-green-200 text-xs mt-1">
                  +{metrics?.businessMetrics?.monthlyGrowth}% this month
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Client Retention</p>
                <p className="text-2xl font-bold">
                  {metrics?.businessMetrics?.clientRetentionRate}%
                </p>
                <p className="text-blue-200 text-xs mt-1">Industry leading</p>
              </div>
              <Users className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">AI Accuracy</p>
                <p className="text-2xl font-bold">
                  {metrics?.aiMetrics?.documentProcessingAccuracy}%
                </p>
                <p className="text-purple-200 text-xs mt-1">Continuously improving</p>
              </div>
              <Brain className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Market Share</p>
                <p className="text-2xl font-bold">
                  {metrics?.competitiveAnalysis?.marketShare}%
                </p>
                <p className="text-orange-200 text-xs mt-1">Growing rapidly</p>
              </div>
              <Target className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="competitive">Competitive</TabsTrigger>
          <TabsTrigger value="risks">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Operational Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Processing Speed</span>
                    <Badge className="bg-green-100 text-green-800">
                      {metrics?.performanceMetrics?.processingSpeed?.avgDocumentProcessing} min avg
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accuracy Rate</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {metrics?.performanceMetrics?.qualityMetrics?.accuracyRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Client Satisfaction</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      {metrics?.performanceMetrics?.qualityMetrics?.clientSatisfactionScore}/5.0
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compliance Score</span>
                    <Badge className="bg-green-100 text-green-800">
                      {metrics?.performanceMetrics?.qualityMetrics?.complianceScore}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Business Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profit Margin</span>
                      <span className="font-semibold">{metrics?.businessMetrics?.profitMargin}%</span>
                    </div>
                    <Progress value={metrics?.businessMetrics?.profitMargin} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Operational Efficiency</span>
                      <span className="font-semibold">{metrics?.businessMetrics?.operationalEfficiency}%</span>
                    </div>
                    <Progress value={metrics?.businessMetrics?.operationalEfficiency} className="h-2" />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Average Client Value</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${metrics?.businessMetrics?.avgClientValue?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {metrics?.aiMetrics?.documentProcessingAccuracy}%
                </div>
                <p className="text-sm text-gray-600">Processing accuracy rate</p>
                <Progress value={metrics?.aiMetrics?.documentProcessingAccuracy} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {metrics?.aiMetrics?.taxOptimizationSuccess}%
                </div>
                <p className="text-sm text-gray-600">Success rate</p>
                <Progress value={metrics?.aiMetrics?.taxOptimizationSuccess} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {metrics?.aiMetrics?.automationEfficiency}%
                </div>
                <p className="text-sm text-gray-600">Automation efficiency</p>
                <Progress value={metrics?.aiMetrics?.automationEfficiency} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">Next 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Revenue</span>
                    <span className="font-semibold">
                      ${metrics?.forecasting?.next30Days?.expectedRevenue?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Clients</span>
                    <span className="font-semibold">{metrics?.forecasting?.next30Days?.newClients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Returns</span>
                    <span className="font-semibold">{metrics?.forecasting?.next30Days?.returnCompletions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Next 90 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Revenue</span>
                    <span className="font-semibold">
                      ${metrics?.forecasting?.next90Days?.expectedRevenue?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Clients</span>
                    <span className="font-semibold">{metrics?.forecasting?.next90Days?.newClients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Returns</span>
                    <span className="font-semibold">{metrics?.forecasting?.next90Days?.returnCompletions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-600">Next Year</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Revenue</span>
                    <span className="font-semibold">
                      ${metrics?.forecasting?.nextYear?.expectedRevenue?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Clients</span>
                    <span className="font-semibold">{metrics?.forecasting?.nextYear?.newClients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Returns</span>
                    <span className="font-semibold">{metrics?.forecasting?.nextYear?.returnCompletions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gold-600" />
                Market Position Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Current Position</h4>
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                      {metrics?.competitiveAnalysis?.marketPosition}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Market Share: {metrics?.competitiveAnalysis?.marketShare}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Brand Recognition: {metrics?.competitiveAnalysis?.brandRecognition}%
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Competitive Advantages</h4>
                  <div className="space-y-2">
                    {Object.entries(metrics?.competitiveAnalysis?.competitorComparison || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <Badge className={
                          value === 'Superior' || value === 'Excellent' || value === 'Advanced' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }>
                          {value as string}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Risk Assessment & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {metrics?.riskAssessment?.financialHealth}
                    </div>
                    <p className="text-sm text-gray-600">Financial Health</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics?.riskAssessment?.creditRating}
                    </div>
                    <p className="text-sm text-gray-600">Credit Rating</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Operational Risk Analysis</h4>
                <div className="space-y-3">
                  {metrics?.riskAssessment?.operationalRisks?.map((risk: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium">{risk.risk}</h5>
                        <p className="text-sm text-gray-600">{risk.mitigation}</p>
                      </div>
                      <Badge className={
                        risk.level === 'High' 
                          ? 'bg-red-100 text-red-800'
                          : risk.level === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }>
                        {risk.level} Risk
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
