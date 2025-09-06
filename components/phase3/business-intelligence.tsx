
// Phase 3: Business Intelligence Dashboard Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign,
  Users,
  Clock,
  Star,
  Brain,
  FileText,
  Calendar,
  Download,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Eye,
  Settings,
  Sparkles
} from 'lucide-react'

interface BusinessMetric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  period: string
  category: 'revenue' | 'clients' | 'efficiency' | 'growth'
}

export default function BusinessIntelligence() {
  const [metrics, setMetrics] = useState<BusinessMetric[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [forecasting, setForecasting] = useState<any>(null)

  useEffect(() => {
    fetchMetrics()
    fetchForecasting()
  }, [selectedCategory])

  const fetchMetrics = async () => {
    try {
      const url = selectedCategory === 'all' ? 
        '/api/phase3/business-intelligence?type=metrics' : 
        `/api/phase3/business-intelligence?type=metrics&category=${selectedCategory}`
      
      const response = await fetch(url)
      const data = await response.json()
      setMetrics(data.metrics)
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    }
  }

  const fetchForecasting = async () => {
    try {
      const response = await fetch('/api/phase3/business-intelligence?type=forecasting')
      const data = await response.json()
      setForecasting(data)
    } catch (error) {
      console.error('Failed to fetch forecasting data:', error)
    }
  }

  const generateCustomReport = async () => {
    setIsGeneratingReport(true)
    
    try {
      const response = await fetch('/api/phase3/business-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-report',
          reportConfig: {
            metrics: selectedCategory,
            period: '30_days',
            format: 'pdf'
          }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('Custom report generated successfully!')
      }
    } catch (error) {
      toast.error('Failed to generate report')
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' || change > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />
    if (trend === 'down' || change < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up' || change > 0) return 'text-green-600'
    if (trend === 'down' || change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue': return <DollarSign className="h-5 w-5 text-green-500" />
      case 'clients': return <Users className="h-5 w-5 text-blue-500" />
      case 'efficiency': return <Zap className="h-5 w-5 text-purple-500" />
      case 'growth': return <TrendingUp className="h-5 w-5 text-orange-500" />
      default: return <BarChart3 className="h-5 w-5 text-gray-500" />
    }
  }

  const formatValue = (value: number, category: string) => {
    if (category === 'revenue') return `$${value.toLocaleString()}`
    if (category === 'efficiency' && value < 100) return `${value}%`
    if (value > 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toLocaleString()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Business Intelligence
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced reporting and analytics with AI-powered insights. 
          Transform your data into actionable business intelligence.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="clients">Clients</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            onClick={generateCustomReport}
            disabled={isGeneratingReport}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {isGeneratingReport ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </div>
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure KPIs
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(metric.category)}
                  <CardTitle className="text-sm text-gray-600">{metric.name}</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {metric.period}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {formatValue(metric.value, metric.category)}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric.trend, metric.change)}`}>
                    {getTrendIcon(metric.trend, metric.change)}
                    <span>{Math.abs(metric.change).toFixed(1)}%</span>
                    <span className="text-gray-500">vs last period</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Analytics */}
      <Tabs defaultValue="forecasting" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="forecasting">AI Forecasting</TabsTrigger>
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="comparisons">Benchmarking</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="forecasting" className="space-y-6">
          {forecasting && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Revenue Forecast
                  </CardTitle>
                  <CardDescription>AI-powered revenue predictions for next 4 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-green-600">
                      ${forecasting.forecasts.revenue.projected[3]?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Projected for Dec 2025
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {forecasting.forecasts.revenue.confidence}% Confidence
                    </Badge>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Factors:</p>
                      {forecasting.forecasts.revenue.factors.slice(0, 2).map((factor: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Client Growth Forecast
                  </CardTitle>
                  <CardDescription>Projected client base expansion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-purple-600">
                      {forecasting.forecasts.clients.projected[3]?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Projected clients by Dec 2025
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {forecasting.forecasts.clients.confidence}% Confidence
                    </Badge>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Growth Drivers:</p>
                      {forecasting.forecasts.clients.factors.slice(0, 2).map((factor: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI-Generated Business Insights
              </CardTitle>
              <CardDescription>
                Machine learning analysis of your business performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecasting?.aiInsights?.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800">{insight}</p>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600">
                  <Brain className="h-4 w-4 mr-2" />
                  Generate More Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparisons">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Industry Benchmarking
              </CardTitle>
              <CardDescription>
                Compare your performance against industry standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">68.4%</div>
                  <div className="text-sm text-gray-600 mb-2">Your Profit Margin</div>
                  <Badge className="bg-green-100 text-green-800">Top 5% Industry</Badge>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">96.8%</div>
                  <div className="text-sm text-gray-600 mb-2">Client Satisfaction</div>
                  <Badge className="bg-blue-100 text-blue-800">Above Average</Badge>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">87.3%</div>
                  <div className="text-sm text-gray-600 mb-2">Automation Rate</div>
                  <Badge className="bg-purple-100 text-purple-800">Industry Leading</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Custom Report Builder
              </CardTitle>
              <CardDescription>
                Create and schedule personalized business reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Available Report Types</h4>
                    <div className="space-y-2">
                      {['Financial Performance', 'Client Analytics', 'Operational Efficiency', 'Growth Metrics', 'Compliance Status'].map((type, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Delivery Options</h4>
                    <div className="space-y-3">
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Generate Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
