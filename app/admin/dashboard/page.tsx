
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Building2, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  Shield,
  Settings,
  BarChart3,
  Database,
  Activity,
  Clock
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Mock admin data - replace with actual API calls
    setDashboardData({
      stats: {
        totalUsers: 156,
        totalClients: 89,
        totalPreparers: 12,
        monthlyRevenue: 45600,
        activeTaxReturns: 234,
        completedReturns: 1847
      },
      recentActivity: [
        { id: '1', type: 'user_created', description: 'New preparer John Smith registered', timestamp: '2 hours ago' },
        { id: '2', type: 'return_completed', description: 'Tax return #TR-2024-0891 completed', timestamp: '4 hours ago' },
        { id: '3', type: 'payment_received', description: 'Payment of $899 received for client #CL-4521', timestamp: '6 hours ago' },
        { id: '4', type: 'system_alert', description: 'Database backup completed successfully', timestamp: '8 hours ago' }
      ],
      systemHealth: {
        database: 'healthy',
        api: 'healthy',
        storage: 'healthy',
        security: 'healthy'
      }
    })
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_created':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'return_completed':
        return <FileText className="h-4 w-4 text-green-600" />
      case 'payment_received':
        return <DollarSign className="h-4 w-4 text-emerald-600" />
      case 'system_alert':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getHealthColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{COMPANY_CONFIG.name}</h1>
                <p className="text-sm text-purple-600">Administrator Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Administrator: {session?.user?.name}
                </p>
                <p className="text-sm text-gray-600">{session?.user?.email}</p>
              </div>
              <Button variant="outline" size="sm">
                <a href="/api/auth/signout">Sign Out</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData?.stats.totalUsers || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData?.stats.totalClients || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Preparers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData?.stats.totalPreparers || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${dashboardData?.stats.monthlyRevenue?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Returns</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData?.stats.activeTaxReturns || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData?.stats.completedReturns || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest system activities and events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.recentActivity.map((activity: any) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 border rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.location.href = '/crm'}
                    >
                      <Users className="h-6 w-6" />
                      Manage Users
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => window.location.href = '/dashboard'}
                    >
                      <BarChart3 className="h-6 w-6" />
                      View Reports
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => window.location.href = '/settings'}
                    >
                      <Settings className="h-6 w-6" />
                      System Config
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => alert('Database administration tools coming soon!')}
                    >
                      <Database className="h-6 w-6" />
                      Database Admin
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage system users and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Recent User Activity</h4>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.location.href = '/crm'}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 text-center py-8">
                      User management interface will be displayed here.
                      <br />
                      Connect to the CRM system for full user management capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health Monitor</CardTitle>
                <CardDescription>
                  Monitor system components and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Database</span>
                    </div>
                    <Badge className={getHealthColor(dashboardData?.systemHealth.database || 'healthy')}>
                      {dashboardData?.systemHealth.database || 'Healthy'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">API</span>
                    </div>
                    <Badge className={getHealthColor(dashboardData?.systemHealth.api || 'healthy')}>
                      {dashboardData?.systemHealth.api || 'Healthy'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Storage</span>
                    </div>
                    <Badge className={getHealthColor(dashboardData?.systemHealth.storage || 'healthy')}>
                      {dashboardData?.systemHealth.storage || 'Healthy'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Security</span>
                    </div>
                    <Badge className={getHealthColor(dashboardData?.systemHealth.security || 'healthy')}>
                      {dashboardData?.systemHealth.security || 'Healthy'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Company Information</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Company Name:</span>
                        <p className="text-gray-600">{COMPANY_CONFIG.name}</p>
                      </div>
                      <div>
                        <span className="font-medium">Domain:</span>
                        <p className="text-gray-600">{COMPANY_CONFIG.domain}</p>
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>
                        <p className="text-gray-600">{COMPANY_CONFIG.contact.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <p className="text-gray-600">{COMPANY_CONFIG.contact.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Actions</h4>
                    <div className="flex gap-4">
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = '/settings'}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Settings
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => alert('System backup initiated successfully!')}
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Backup System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
