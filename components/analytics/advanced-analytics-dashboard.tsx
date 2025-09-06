

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  BarChart3, 
  CalendarDays,
  MapPin,
  Clock,
  Star,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

// Sample data - will be replaced with real API calls
const revenueData = [
  { month: 'Jan', revenue: 45000, clients: 120, leads: 200 },
  { month: 'Feb', revenue: 52000, clients: 145, leads: 250 },
  { month: 'Mar', revenue: 48000, clients: 130, leads: 180 },
  { month: 'Apr', revenue: 61000, clients: 165, leads: 300 },
  { month: 'May', revenue: 75000, clients: 190, leads: 400 },
  { month: 'Jun', revenue: 82000, clients: 210, leads: 450 },
  { month: 'Jul', revenue: 95000, clients: 240, leads: 520 },
  { month: 'Aug', revenue: 108000, clients: 275, leads: 600 }
]

const serviceData = [
  { name: 'Individual Tax Returns', value: 45, revenue: 48000, color: '#8884d8' },
  { name: 'Business Tax Services', value: 30, revenue: 65000, color: '#82ca9d' },
  { name: 'Tax Planning', value: 15, revenue: 25000, color: '#ffc658' },
  { name: 'Debt Resolution', value: 10, revenue: 15000, color: '#ff7c7c' }
]

const leadSourceData = [
  { source: 'Google Ads', leads: 150, conversions: 45, cost: 2500 },
  { source: 'Facebook/Meta', leads: 120, conversions: 38, cost: 1800 },
  { source: 'Referrals', leads: 89, conversions: 67, cost: 0 },
  { source: 'Website Organic', leads: 95, conversions: 28, cost: 0 },
  { source: 'Email Marketing', leads: 78, conversions: 25, cost: 500 },
  { source: 'LinkedIn', leads: 45, conversions: 18, cost: 800 }
]

const clientMetrics = [
  { metric: 'Client Lifetime Value', value: '$4,250', trend: 12.5, period: 'vs last month' },
  { metric: 'Avg. Service Revenue', value: '$850', trend: 8.3, period: 'per client' },
  { metric: 'Client Retention Rate', value: '89%', trend: 5.2, period: 'yearly' },
  { metric: 'Referral Rate', value: '34%', trend: -2.1, period: 'this quarter' }
]

const profitabilityData = [
  { service: 'Business Tax', margin: 75, revenue: 65000, cost: 16250 },
  { service: 'Individual Returns', margin: 68, revenue: 48000, cost: 15360 },
  { service: 'Tax Planning', margin: 85, revenue: 25000, cost: 3750 },
  { service: 'Debt Resolution', margin: 45, revenue: 15000, cost: 8250 }
]

interface AnalyticsProps {
  className?: string
}

export default function AdvancedAnalyticsDashboard({ className }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('6months')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
    toast.success('Analytics data refreshed!')
  }

  const exportData = () => {
    toast.success('Analytics data exported to CSV!')
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-gray-600 mt-1">Real-time business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportData} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(metric.trend)}%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{metric.period}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-max min-w-full">
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue Analytics
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Client Insights
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Lead Sources
            </TabsTrigger>
            <TabsTrigger value="profitability" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Profitability
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Revenue Analytics */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Service Distribution
                </CardTitle>
                <CardDescription>Revenue by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Client Insights */}
        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Growth & Conversion</CardTitle>
              <CardDescription>Track client acquisition and conversion trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="clients" stroke="#8884d8" strokeWidth={3} />
                    <Line type="monotone" dataKey="leads" stroke="#82ca9d" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Sources */}
        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Performance</CardTitle>
                <CardDescription>ROI and conversion by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSourceData.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{source.source}</h4>
                          <Badge variant="outline">
                            {Math.round((source.conversions / source.leads) * 100)}% CVR
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{source.leads} leads</span>
                          <span>{source.conversions} conversions</span>
                          {source.cost > 0 && <span>${source.cost} cost</span>}
                        </div>
                        <Progress 
                          value={(source.conversions / source.leads) * 100} 
                          className="mt-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Source Chart</CardTitle>
                <CardDescription>Visual breakdown of lead generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadSourceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="leads" fill="#8884d8" />
                      <Bar dataKey="conversions" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profitability */}
        <TabsContent value="profitability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Margins by Service</CardTitle>
                <CardDescription>Analyze profitability across service lines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profitabilityData.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{service.service}</span>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{service.margin}% margin</div>
                          <div className="text-sm text-gray-600">
                            ${service.revenue.toLocaleString()} revenue
                          </div>
                        </div>
                      </div>
                      <Progress value={service.margin} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Cost Analysis</CardTitle>
                <CardDescription>Cost efficiency by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitabilityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="service" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                      <Bar dataKey="cost" fill="#82ca9d" name="Cost" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Real-time Business Activity
          </CardTitle>
          <CardDescription>Live feed of important business events</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            <div className="space-y-3">
              {[
                { time: '2 min ago', event: 'New lead from Google Ads', type: 'lead', value: '$850 potential' },
                { time: '5 min ago', event: 'Tax return completed for John Smith', type: 'completion', value: '$450 revenue' },
                { time: '12 min ago', event: 'Consultation booked for tomorrow', type: 'appointment', value: 'Business tax planning' },
                { time: '18 min ago', event: 'Payment received from Sarah Johnson', type: 'payment', value: '$1,200' },
                { time: '25 min ago', event: 'New client signed up', type: 'client', value: 'Individual tax service' },
                { time: '35 min ago', event: 'Email campaign: 23% open rate', type: 'marketing', value: '145 recipients' },
                { time: '42 min ago', event: 'Referral from existing client', type: 'referral', value: 'Business tax consultation' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'lead' ? 'bg-blue-500' :
                      activity.type === 'completion' ? 'bg-green-500' :
                      activity.type === 'appointment' ? 'bg-purple-500' :
                      activity.type === 'payment' ? 'bg-green-600' :
                      activity.type === 'client' ? 'bg-blue-600' :
                      activity.type === 'marketing' ? 'bg-orange-500' :
                      'bg-pink-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.event}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.value}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
