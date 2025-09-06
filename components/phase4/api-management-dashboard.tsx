
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Key, 
  Activity, 
  Shield, 
  Globe, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface APIEndpoint {
  id: string
  name: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  description: string
  status: 'active' | 'inactive' | 'deprecated'
  requestsToday: number
  avgResponseTime: number
  errorRate: number
  lastUsed: string
}

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  requestsUsed: number
  requestsLimit: number
  createdAt: string
  lastUsed: string
  status: 'active' | 'inactive' | 'suspended'
}

export default function APIManagementDashboard() {
  const [apiKeys, setAPIKeys] = useState<APIKey[]>([])
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([])
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with real API calls
    setEndpoints([
      {
        id: '1',
        name: 'Client Management',
        endpoint: '/api/clients',
        method: 'GET',
        description: 'Retrieve client information and manage client data',
        status: 'active',
        requestsToday: 1247,
        avgResponseTime: 245,
        errorRate: 0.8,
        lastUsed: '2 minutes ago'
      },
      {
        id: '2',
        name: 'Tax Calculation',
        endpoint: '/api/tax-calculation',
        method: 'POST',
        description: 'Calculate taxes using AI-powered algorithms',
        status: 'active',
        requestsToday: 892,
        avgResponseTime: 387,
        errorRate: 1.2,
        lastUsed: '5 minutes ago'
      },
      {
        id: '3',
        name: 'Document Processing',
        endpoint: '/api/documents/process',
        method: 'POST',
        description: 'AI-powered document analysis and data extraction',
        status: 'active',
        requestsToday: 634,
        avgResponseTime: 1200,
        errorRate: 2.1,
        lastUsed: '12 minutes ago'
      },
      {
        id: '4',
        name: 'Analytics',
        endpoint: '/api/analytics',
        method: 'GET',
        description: 'Business intelligence and reporting data',
        status: 'active',
        requestsToday: 456,
        avgResponseTime: 523,
        errorRate: 0.5,
        lastUsed: '18 minutes ago'
      }
    ])

    setAPIKeys([
      {
        id: '1',
        name: 'Production Key',
        key: 'lmt_prod_ak_7f8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o',
        permissions: ['read:clients', 'write:clients', 'read:analytics', 'process:documents'],
        requestsUsed: 8743,
        requestsLimit: 10000,
        createdAt: '2024-01-15',
        lastUsed: '2 minutes ago',
        status: 'active'
      },
      {
        id: '2',
        name: 'Development Key',
        key: 'lmt_dev_ak_9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z',
        permissions: ['read:clients', 'read:analytics'],
        requestsUsed: 2341,
        requestsLimit: 5000,
        createdAt: '2024-01-20',
        lastUsed: '1 hour ago',
        status: 'active'
      },
      {
        id: '3',
        name: 'Partner Integration',
        key: 'lmt_partner_ak_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
        permissions: ['read:clients', 'process:documents'],
        requestsUsed: 4567,
        requestsLimit: 8000,
        createdAt: '2024-02-01',
        lastUsed: '3 hours ago',
        status: 'active'
      }
    ])
    
    setLoading(false)
  }, [])

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const generateNewKey = () => {
    const newKey = `lmt_${Date.now()}_ak_${Math.random().toString(36).substring(2)}`
    toast.success('New API key generated!')
    // In real implementation, this would make an API call
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-lg">Loading API Management...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">API Management</h2>
          <p className="text-gray-600 mt-1">Manage API keys, endpoints, and monitor usage</p>
        </div>
        <Button 
          onClick={generateNewKey}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Key className="h-4 w-4 mr-2" />
          Generate New Key
        </Button>
      </div>

      {/* API Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Requests Today</p>
                <p className="text-2xl font-bold">
                  {endpoints.reduce((total, endpoint) => total + endpoint.requestsToday, 0).toLocaleString()}
                </p>
              </div>
              <Activity className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active API Keys</p>
                <p className="text-2xl font-bold">
                  {apiKeys.filter(key => key.status === 'active').length}
                </p>
              </div>
              <Key className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Response Time</p>
                <p className="text-2xl font-bold">
                  {Math.round(endpoints.reduce((total, endpoint) => total + endpoint.avgResponseTime, 0) / endpoints.length)}ms
                </p>
              </div>
              <Zap className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Error Rate</p>
                <p className="text-2xl font-bold">
                  {(endpoints.reduce((total, endpoint) => total + endpoint.errorRate, 0) / endpoints.length).toFixed(1)}%
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-purple-600" />
                API Key Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <Card key={apiKey.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{apiKey.name}</h4>
                          <Badge className={
                            apiKey.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }>
                            {apiKey.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                            {showKey[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 20) + '...'}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Usage</p>
                            <p className="font-semibold">{apiKey.requestsUsed.toLocaleString()} / {apiKey.requestsLimit.toLocaleString()}</p>
                            <Progress 
                              value={(apiKey.requestsUsed / apiKey.requestsLimit) * 100} 
                              className="mt-1 h-2" 
                            />
                          </div>
                          <div>
                            <p className="text-gray-600">Created</p>
                            <p className="font-semibold">{new Date(apiKey.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Used</p>
                            <p className="font-semibold">{apiKey.lastUsed}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Permissions</p>
                            <p className="font-semibold">{apiKey.permissions.length} granted</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                          <div className="flex flex-wrap gap-1">
                            {apiKey.permissions.map((permission) => (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                API Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint) => (
                  <Card key={endpoint.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {endpoint.method}
                          </Badge>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {endpoint.endpoint}
                          </code>
                          <Badge className={
                            endpoint.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : endpoint.status === 'deprecated'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }>
                            {endpoint.status}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold mb-1">{endpoint.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{endpoint.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Requests Today</p>
                            <p className="font-semibold text-blue-600">{endpoint.requestsToday.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Avg Response Time</p>
                            <p className="font-semibold">{endpoint.avgResponseTime}ms</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Error Rate</p>
                            <p className="font-semibold text-red-600">{endpoint.errorRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Used</p>
                            <p className="font-semibold">{endpoint.lastUsed}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                API Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Request Volume by Endpoint</h4>
                  <div className="space-y-3">
                    {endpoints.map((endpoint) => (
                      <div key={endpoint.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{endpoint.name}</span>
                          <span className="font-semibold">{endpoint.requestsToday}</span>
                        </div>
                        <Progress 
                          value={(endpoint.requestsToday / Math.max(...endpoints.map(e => e.requestsToday))) * 100} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Response Time Performance</h4>
                  <div className="space-y-3">
                    {endpoints.map((endpoint) => (
                      <div key={endpoint.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{endpoint.name}</span>
                          <span className="font-semibold">{endpoint.avgResponseTime}ms</span>
                        </div>
                        <Progress 
                          value={Math.min((endpoint.avgResponseTime / 2000) * 100, 100)} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security & Access Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Rate Limiting</h4>
                    </div>
                    <p className="text-sm text-green-700">Active and properly configured</p>
                    <Badge className="bg-green-500 text-white mt-2">Enabled</Badge>
                  </Card>

                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">SSL/TLS Encryption</h4>
                    </div>
                    <p className="text-sm text-blue-700">All endpoints secured</p>
                    <Badge className="bg-blue-500 text-white mt-2">Enforced</Badge>
                  </Card>

                  <Card className="p-4 bg-purple-50 border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-800">Token Authentication</h4>
                    </div>
                    <p className="text-sm text-purple-700">Bearer token required</p>
                    <Badge className="bg-purple-500 text-white mt-2">Required</Badge>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Security Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Require HTTPS</p>
                        <p className="text-sm text-gray-600">Force all API requests to use HTTPS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">IP Whitelisting</p>
                        <p className="text-sm text-gray-600">Restrict API access to specific IP addresses</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Request Logging</p>
                        <p className="text-sm text-gray-600">Log all API requests for security auditing</p>
                      </div>
                      <Switch defaultChecked />
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
