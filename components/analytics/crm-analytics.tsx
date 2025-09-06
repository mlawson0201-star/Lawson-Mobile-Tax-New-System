
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
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
  Users, 
  Target, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Building2
} from 'lucide-react'

interface AnalyticsData {
  leadMetrics: {
    totalLeads: number
    newLeadsThisMonth: number
    conversionRate: number
    averageConversionTime: number
    leadsBySource: Array<{ source: string, count: number, percentage: number }>
    leadsByStatus: Array<{ status: string, count: number, percentage: number }>
  }
  clientMetrics: {
    totalClients: number
    activeClients: number
    clientRetentionRate: number
    averageClientValue: number
    clientsByType: Array<{ type: string, count: number, percentage: number }>
    monthlyGrowth: Array<{ month: string, clients: number, revenue: number }>
  }
  partnerMetrics: {
    totalPartners: number
    activePartners: number
    totalPartnerRevenue: number
    averageCommission: number
    partnerPerformance: Array<{ name: string, clients: number, revenue: number, commission: number }>
  }
  pipelineMetrics: {
    totalPipelineValue: number
    dealsByStage: Array<{ stage: string, count: number, value: number }>
    averageDealSize: number
    winRate: number
    avgSalesCycle: number
  }
  communicationMetrics: {
    totalInteractions: number
    emailsSent: number
    callsMade: number
    smsSent: number
    responseRate: number
    interactionTrends: Array<{ date: string, emails: number, calls: number, sms: number }>
  }
}

const colors = ['#2563eb', '#7c3aed', '#dc2626', '#059669', '#d97706', '#0891b2']

export function CRMAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState('30')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    try {
      // Mock data - replace with actual API call
      setTimeout(() => {
        setData({
          leadMetrics: {
            totalLeads: 342,
            newLeadsThisMonth: 58,
            conversionRate: 68.5,
            averageConversionTime: 14,
            leadsBySource: [
              { source: 'Website', count: 125, percentage: 36.5 },
              { source: 'Referral', count: 89, percentage: 26.0 },
              { source: 'Social Media', count: 67, percentage: 19.6 },
              { source: 'Advertisement', count: 45, percentage: 13.2 },
              { source: 'Cold Outreach', count: 16, percentage: 4.7 }
            ],
            leadsByStatus: [
              { status: 'New', count: 78, percentage: 22.8 },
              { status: 'Contacted', count: 95, percentage: 27.8 },
              { status: 'Qualified', count: 89, percentage: 26.0 },
              { status: 'Proposal Sent', count: 45, percentage: 13.2 },
              { status: 'Negotiation', count: 25, percentage: 7.3 },
              { status: 'Won', count: 10, percentage: 2.9 }
            ]
          },
          clientMetrics: {
            totalClients: 234,
            activeClients: 198,
            clientRetentionRate: 92.3,
            averageClientValue: 1250,
            clientsByType: [
              { type: 'Individual', count: 156, percentage: 66.7 },
              { type: 'Business', count: 67, percentage: 28.6 },
              { type: 'Nonprofit', count: 11, percentage: 4.7 }
            ],
            monthlyGrowth: [
              { month: 'Jan', clients: 180, revenue: 225000 },
              { month: 'Feb', clients: 190, revenue: 237500 },
              { month: 'Mar', clients: 205, revenue: 256250 },
              { month: 'Apr', clients: 218, revenue: 272500 },
              { month: 'May', clients: 225, revenue: 281250 },
              { month: 'Jun', clients: 234, revenue: 292500 }
            ]
          },
          partnerMetrics: {
            totalPartners: 12,
            activePartners: 10,
            totalPartnerRevenue: 145600,
            averageCommission: 18.2,
            partnerPerformance: [
              { name: 'Metro Tax Services', clients: 89, revenue: 45200, commission: 6780 },
              { name: 'Sunshine Tax Solutions', clients: 67, revenue: 38900, commission: 5835 },
              { name: 'City Financial Group', clients: 45, revenue: 28500, commission: 4275 },
              { name: 'QuickBooks Partners', clients: 33, revenue: 19800, commission: 2970 }
            ]
          },
          pipelineMetrics: {
            totalPipelineValue: 189500,
            dealsByStage: [
              { stage: 'Initial Contact', count: 78, value: 67500 },
              { stage: 'Qualified', count: 45, value: 52000 },
              { stage: 'Proposal Sent', count: 28, value: 38900 },
              { stage: 'Negotiation', count: 15, value: 31100 }
            ],
            averageDealSize: 1450,
            winRate: 72.5,
            avgSalesCycle: 18
          },
          communicationMetrics: {
            totalInteractions: 1256,
            emailsSent: 678,
            callsMade: 389,
            smsSent: 189,
            responseRate: 68.5,
            interactionTrends: [
              { date: 'Mon', emails: 125, calls: 78, sms: 34 },
              { date: 'Tue', emails: 110, calls: 85, sms: 29 },
              { date: 'Wed', emails: 132, calls: 67, sms: 41 },
              { date: 'Thu', emails: 98, calls: 92, sms: 38 },
              { date: 'Fri', emails: 145, calls: 45, sms: 28 },
              { date: 'Sat', emails: 45, calls: 15, sms: 12 },
              { date: 'Sun', emails: 23, calls: 7, sms: 7 }
            ]
          }
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading analytics data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">CRM Analytics</h2>
            <p className="text-gray-600">Comprehensive insights into your sales and marketing performance</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CRM Analytics</h2>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your sales and marketing performance
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Leads</p>
                <div className="text-2xl font-bold text-blue-600">{data.leadMetrics.totalLeads}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{data.leadMetrics.newLeadsThisMonth} this month</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <div className="text-2xl font-bold text-green-600">{data.leadMetrics.conversionRate}%</div>
                <Progress value={data.leadMetrics.conversionRate} className="mt-2" />
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Clients</p>
                <div className="text-2xl font-bold text-purple-600">{data.clientMetrics.activeClients}</div>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{data.clientMetrics.clientRetentionRate}% retention</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pipeline Value</p>
                <div className="text-2xl font-bold text-orange-600">
                  ${(data.pipelineMetrics.totalPipelineValue / 1000).toFixed(0)}K
                </div>
                <div className="flex items-center mt-1">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{data.pipelineMetrics.winRate}% win rate</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.leadMetrics.leadsBySource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percentage }) => `${source}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data.leadMetrics.leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Deals by stage and value</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.pipelineMetrics.dealsByStage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" name="Count" />
                <Bar dataKey="value" fill="#7c3aed" name="Value ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>Monthly client acquisition and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.clientMetrics.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="clients" stackId="1" stroke="#2563eb" fill="#2563eb" name="Clients" />
                <Area type="monotone" dataKey="revenue" stackId="2" stroke="#059669" fill="#059669" name="Revenue ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Communication Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Activity</CardTitle>
            <CardDescription>Weekly interaction trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.communicationMetrics.interactionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emails" stroke="#2563eb" strokeWidth={2} name="Emails" />
                <Line type="monotone" dataKey="calls" stroke="#059669" strokeWidth={2} name="Calls" />
                <Line type="monotone" dataKey="sms" stroke="#dc2626" strokeWidth={2} name="SMS" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Partner Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Partner Network Performance
          </CardTitle>
          <CardDescription>Top performing partners in your network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.partnerMetrics.partnerPerformance.map((partner, index) => (
              <div key={partner.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <span className="font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.clients} clients</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">${partner.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">${partner.commission.toLocaleString()} commission</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{data.communicationMetrics.emailsSent}</div>
            <p className="text-sm text-gray-600">Emails Sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{data.communicationMetrics.callsMade}</div>
            <p className="text-sm text-gray-600">Calls Made</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{data.communicationMetrics.smsSent}</div>
            <p className="text-sm text-gray-600">SMS Sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{data.communicationMetrics.responseRate}%</div>
            <p className="text-sm text-gray-600">Response Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
