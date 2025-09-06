
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Settings, 
  Globe, 
  Code, 
  Users, 
  Shield,
  Zap,
  Download,
  Upload,
  Eye,
  Save,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface WhiteLabelConfig {
  branding: any
  features: any
  integrations: any
  licensing: any
}

export default function WhiteLabelPortal() {
  const [config, setConfig] = useState<WhiteLabelConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/phase4/white-label-config')
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
      }
    } catch (error) {
      console.error('Error fetching white label config:', error)
      toast.error('Failed to load configuration')
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    if (!config) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/phase4/white-label-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        toast.success('Configuration saved successfully!')
      } else {
        toast.error('Failed to save configuration')
      }
    } catch (error) {
      console.error('Error saving config:', error)
      toast.error('Failed to save configuration')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-lg">Loading White Label Configuration...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">White Label Portal</h2>
          <p className="text-gray-600 mt-1">Customize and configure your branded tax platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button 
            onClick={saveConfig} 
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="licensing">Licensing</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  Brand Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={config?.branding?.companyName || ''}
                    onChange={(e) => setConfig(prev => prev ? {
                      ...prev,
                      branding: { ...prev.branding, companyName: e.target.value }
                    } : null)}
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={config?.branding?.tagline || ''}
                    onChange={(e) => setConfig(prev => prev ? {
                      ...prev,
                      branding: { ...prev.branding, tagline: e.target.value }
                    } : null)}
                    placeholder="Your company tagline"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={config?.branding?.primaryColor || '#8B5CF6'}
                      onChange={(e) => setConfig(prev => prev ? {
                        ...prev,
                        branding: { ...prev.branding, primaryColor: e.target.value }
                      } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={config?.branding?.secondaryColor || '#3B82F6'}
                      onChange={(e) => setConfig(prev => prev ? {
                        ...prev,
                        branding: { ...prev.branding, secondaryColor: e.target.value }
                      } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <Input
                      id="accentColor"
                      type="color"
                      value={config?.branding?.accentColor || '#10B981'}
                      onChange={(e) => setConfig(prev => prev ? {
                        ...prev,
                        branding: { ...prev.branding, accentColor: e.target.value }
                      } : null)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg border-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${config?.branding?.primaryColor}20, ${config?.branding?.secondaryColor}20)`,
                    borderColor: config?.branding?.primaryColor 
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ 
                        background: `linear-gradient(135deg, ${config?.branding?.primaryColor}, ${config?.branding?.secondaryColor})` 
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: config?.branding?.primaryColor }}>
                        {config?.branding?.companyName || 'Your Company'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {config?.branding?.tagline || 'Your tagline here'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ backgroundColor: `${config?.branding?.primaryColor}40` }}
                    />
                    <div 
                      className="h-2 rounded-full w-3/4"
                      style={{ backgroundColor: `${config?.branding?.secondaryColor}40` }}
                    />
                    <div 
                      className="h-2 rounded-full w-1/2"
                      style={{ backgroundColor: `${config?.branding?.accentColor}40` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Feature Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(config?.features || {}).map(([feature, settings]: [string, any]) => (
                  <div key={feature} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold capitalize">
                        {feature.replace(/([A-Z])/g, ' $1')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {settings.customizable ? 'Fully customizable' : 'Standard configuration'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {settings.customizable && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          Customizable
                        </Badge>
                      )}
                      <Switch
                        checked={settings.enabled}
                        onCheckedChange={(enabled) => setConfig(prev => prev ? {
                          ...prev,
                          features: {
                            ...prev.features,
                            [feature]: { ...settings, enabled }
                          }
                        } : null)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Third-Party Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(config?.integrations || {}).map(([integration, settings]: [string, any]) => (
                  <div key={integration} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold capitalize">
                        {integration.replace(/([A-Z])/g, ' $1')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Status: {settings.configured ? 'Configured' : 'Not configured'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        settings.configured 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {settings.configured ? 'Ready' : 'Pending'}
                      </Badge>
                      <Switch
                        checked={settings.enabled}
                        onCheckedChange={(enabled) => setConfig(prev => prev ? {
                          ...prev,
                          integrations: {
                            ...prev.integrations,
                            [integration]: { ...settings, enabled }
                          }
                        } : null)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licensing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                Licensing & Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">License Tier</Label>
                    <Badge className="bg-purple-100 text-purple-800 text-lg px-3 py-1 ml-2">
                      {config?.licensing?.tier}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Max Users</span>
                      <span className="font-semibold">{config?.licensing?.maxUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Clients</span>
                      <span className="font-semibold">{config?.licensing?.maxClients?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Level</span>
                      <Badge className="bg-green-100 text-green-800">
                        {config?.licensing?.supportLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">API Limits</Label>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Requests/Hour</span>
                      <span className="font-semibold">{config?.licensing?.apiLimits?.requestsPerHour?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Limit</span>
                      <span className="font-semibold">{config?.licensing?.apiLimits?.storageLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bandwidth</span>
                      <span className="font-semibold">{config?.licensing?.apiLimits?.bandwidthLimit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-green-600" />
                Deployment Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Cloud Deployment</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Deploy your white-labeled platform to our secure cloud infrastructure.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Deploy to Cloud
                  </Button>
                </Card>

                <Card className="p-4 border-2 border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">Self-Hosted</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Download the complete package for self-hosting on your infrastructure.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Package
                  </Button>
                </Card>

                <Card className="p-4 border-2 border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">API Integration</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Integrate our APIs into your existing platform infrastructure.
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Code className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
