
// Phase 3: API & White-label Solutions Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { 
  Code, 
  Key, 
  Palette, 
  Globe,
  Settings,
  Copy,
  Eye,
  EyeOff,
  Download,
  Play,
  Book,
  Zap,
  Star,
  Shield,
  Webhook,
  Package,
  Crown,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react'

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  rateLimit: number
  usage: {
    current: number
    limit: number
    resetDate: string
  }
  environment: 'sandbox' | 'production'
  status: 'active' | 'inactive' | 'revoked'
  created: string
  lastUsed: string
}

interface WhitelabelConfig {
  id: string
  companyName: string
  domain: string
  status: 'active' | 'inactive' | 'pending_setup'
  theme: {
    primaryColor: string
    secondaryColor: string
    logoUrl: string
  }
  pricing: {
    plan: 'starter' | 'professional' | 'enterprise'
    monthlyFee: number
    setupFee: number
  }
}

export default function APIWhitelabel() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [whitelabelConfigs, setWhitelabelConfigs] = useState<WhitelabelConfig[]>([])
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({})
  const [isCreatingKey, setIsCreatingKey] = useState(false)
  const [isCreatingWhitelabel, setIsCreatingWhitelabel] = useState(false)

  useEffect(() => {
    fetchAPIData()
    fetchWhitelabelData()
  }, [])

  const fetchAPIData = async () => {
    try {
      const response = await fetch('/api/phase3/api-whitelabel?type=api-keys')
      const data = await response.json()
      setApiKeys(data.apiKeys)
    } catch (error) {
      console.error('Failed to fetch API keys:', error)
    }
  }

  const fetchWhitelabelData = async () => {
    try {
      const response = await fetch('/api/phase3/api-whitelabel?type=whitelabel')
      const data = await response.json()
      setWhitelabelConfigs(data.configs)
    } catch (error) {
      console.error('Failed to fetch white-label configs:', error)
    }
  }

  const createAPIKey = async () => {
    setIsCreatingKey(true)
    
    try {
      const response = await fetch('/api/phase3/api-whitelabel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-api-key',
          apiKeyConfig: {
            name: 'New API Key',
            environment: 'sandbox',
            permissions: ['read:clients', 'read:reports'],
            rateLimit: 1000
          }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('API key created successfully!')
        fetchAPIData()
      }
    } catch (error) {
      toast.error('Failed to create API key')
    } finally {
      setIsCreatingKey(false)
    }
  }

  const createWhitelabelConfig = async () => {
    setIsCreatingWhitelabel(true)
    
    try {
      const response = await fetch('/api/phase3/api-whitelabel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-whitelabel',
          whitelabelConfig: {
            companyName: 'Custom Tax Solutions',
            domain: 'customtax.com',
            theme: {
              primaryColor: '#3B82F6',
              secondaryColor: '#10B981',
              logoUrl: '/custom-logo.png'
            },
            pricing: {
              plan: 'professional',
              monthlyFee: 199,
              setupFee: 499
            }
          }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('White-label configuration created!')
        fetchWhitelabelData()
      }
    } catch (error) {
      toast.error('Failed to create white-label config')
    } finally {
      setIsCreatingWhitelabel(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const getEnvironmentColor = (env: string) => {
    return env === 'production' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'revoked': return 'bg-red-100 text-red-800'
      case 'pending_setup': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter': return 'bg-blue-100 text-blue-800'
      case 'professional': return 'bg-purple-100 text-purple-800'
      case 'enterprise': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Code className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            API & White-label Solutions
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Powerful APIs and white-label solutions to extend your tax practice. 
          Build custom integrations and offer branded solutions to partners.
        </p>
      </div>

      {/* API & White-label Tabs */}
      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="documentation">API Docs</TabsTrigger>
          <TabsTrigger value="whitelabel">White-label</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-6">
          {/* API Key Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">API Key Management</h3>
              <p className="text-sm text-gray-600">Create and manage API keys for your integrations</p>
            </div>
            <Button
              onClick={createAPIKey}
              disabled={isCreatingKey}
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              {isCreatingKey ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Create API Key
                </div>
              )}
            </Button>
          </div>

          {/* API Keys Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {apiKeys.map((apiKey) => (
              <Card key={apiKey.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{apiKey.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getEnvironmentColor(apiKey.environment)}>
                        {apiKey.environment}
                      </Badge>
                      <Badge className={getStatusColor(apiKey.status)}>
                        {apiKey.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* API Key Display */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">API Key</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type={showApiKey[apiKey.id] ? 'text' : 'password'}
                        value={apiKey.key}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleApiKeyVisibility(apiKey.id)}
                      >
                        {showApiKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Usage Statistics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Usage this month:</span>
                      <span className="font-medium">{apiKey.usage.current.toLocaleString()} / {apiKey.usage.limit.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(apiKey.usage.current / apiKey.usage.limit) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Permissions</label>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
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

        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-blue-500" />
                API Documentation
              </CardTitle>
              <CardDescription>
                Comprehensive API reference and integration guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Quick Start</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium mb-2">Authentication</h5>
                      <code className="text-sm bg-gray-800 text-green-400 p-2 rounded block">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium mb-2">Base URL</h5>
                      <code className="text-sm bg-gray-800 text-blue-400 p-2 rounded block">
                        https://api.lmttax.com/v1
                      </code>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium mb-2">Example Request</h5>
                      <code className="text-sm bg-gray-800 text-white p-2 rounded block whitespace-pre">
{`curl -X GET \\
  https://api.lmttax.com/v1/clients \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Available Endpoints</h4>
                  <div className="space-y-2">
                    {[
                      { method: 'GET', path: '/clients', desc: 'List all clients' },
                      { method: 'POST', path: '/clients', desc: 'Create new client' },
                      { method: 'POST', path: '/documents/upload', desc: 'Upload tax document' },
                      { method: 'POST', path: '/tax/calculate', desc: 'Calculate tax liability' },
                      { method: 'GET', path: '/reports/financial', desc: 'Generate reports' }
                    ].map((endpoint, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <Badge variant="outline" className="font-mono text-xs">
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm flex-1">{endpoint.path}</code>
                        <span className="text-xs text-gray-500">{endpoint.desc}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Book className="h-4 w-4 mr-2" />
                    View Full Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SDKs Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-500" />
                Official SDKs
              </CardTitle>
              <CardDescription>
                Ready-to-use libraries for popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { lang: 'JavaScript', install: 'npm install @lmttax/js-sdk' },
                  { lang: 'Python', install: 'pip install lmttax-python' },
                  { lang: 'PHP', install: 'composer require lmttax/php-sdk' },
                  { lang: 'Ruby', install: 'gem install lmttax' }
                ].map((sdk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">{sdk.lang}</h5>
                    <code className="text-xs bg-gray-100 p-2 rounded block mb-3">
                      {sdk.install}
                    </code>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whitelabel" className="space-y-6">
          {/* White-label Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">White-label Configurations</h3>
              <p className="text-sm text-gray-600">Create branded solutions for your partners</p>
            </div>
            <Button
              onClick={createWhitelabelConfig}
              disabled={isCreatingWhitelabel}
              className="bg-gradient-to-r from-purple-500 to-pink-600"
            >
              {isCreatingWhitelabel ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Create Configuration
                </div>
              )}
            </Button>
          </div>

          {/* White-label Configs */}
          <div className="space-y-6">
            {whitelabelConfigs.map((config) => (
              <Card key={config.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        {config.companyName}
                      </CardTitle>
                      <CardDescription>{config.domain}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPlanColor(config.pricing.plan)}>
                        {config.pricing.plan}
                      </Badge>
                      <Badge className={getStatusColor(config.status)}>
                        {config.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Theme Preview */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Brand Theme</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: config.theme.primaryColor }}
                          />
                          <span className="text-sm">Primary: {config.theme.primaryColor}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: config.theme.secondaryColor }}
                          />
                          <span className="text-sm">Secondary: {config.theme.secondaryColor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Pricing</h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600">Setup Fee:</span>
                          <span className="font-medium ml-2">${config.pricing.setupFee}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Monthly Fee:</span>
                          <span className="font-medium ml-2">${config.pricing.monthlyFee}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Actions</h4>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Globe className="h-4 w-4 mr-2" />
                          Go Live
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                White-label Pricing Plans
              </CardTitle>
              <CardDescription>
                Choose the right plan for your partner program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Starter',
                    price: '$99/month',
                    setup: '$199 setup',
                    features: ['Custom branding', 'Custom domain', 'Basic API access']
                  },
                  {
                    name: 'Professional',
                    price: '$199/month',
                    setup: '$499 setup',
                    features: ['All starter features', 'White-label reports', 'Custom email templates', 'Priority support']
                  },
                  {
                    name: 'Enterprise',
                    price: '$499/month',
                    setup: '$1,999 setup',
                    features: ['All professional features', 'Full API access', 'Custom integrations', 'Dedicated support']
                  }
                ].map((plan, index) => (
                  <div key={index} className="p-6 border rounded-lg text-center space-y-4">
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    <div>
                      <div className="text-2xl font-bold">{plan.price}</div>
                      <div className="text-sm text-gray-600">{plan.setup}</div>
                    </div>
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full">
                      Choose {plan.name}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-purple-500" />
                Webhook Management
              </CardTitle>
              <CardDescription>
                Real-time notifications for your integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Available Events</h4>
                    <div className="space-y-2">
                      {[
                        'client.created',
                        'document.processed',
                        'tax.calculated',
                        'payment.received',
                        'report.generated'
                      ].map((event, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <input type="checkbox" className="rounded" />
                          <code className="text-sm">{event}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Webhook URL</label>
                        <Input placeholder="https://your-app.com/webhooks" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Secret Key</label>
                        <Input type="password" placeholder="Your webhook secret" />
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600">
                        <Webhook className="h-4 w-4 mr-2" />
                        Create Webhook
                      </Button>
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
