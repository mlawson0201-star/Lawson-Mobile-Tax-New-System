
// Phase 2: Integration Marketplace Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { 
  Puzzle, 
  Star, 
  Download, 
  CheckCircle, 
  Search,
  Filter,
  Zap,
  DollarSign,
  Users,
  Mail,
  FileText,
  BarChart3,
  Settings,
  Shield,
  Clock,
  Sparkles,
  TrendingUp
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  category: string
  description: string
  provider: string
  rating: number
  installations: number
  pricing: 'free' | 'paid' | 'freemium'
  status: 'available' | 'installed' | 'pending'
  features: string[]
  setupComplexity: 'easy' | 'medium' | 'advanced'
  icon: string
}

export default function IntegrationMarketplace() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [installingId, setInstallingId] = useState<string | null>(null)

  useEffect(() => {
    fetchIntegrations()
  }, [])

  useEffect(() => {
    filterIntegrations()
  }, [integrations, selectedCategory, searchTerm])

  const fetchIntegrations = async () => {
    try {
      const response = await fetch('/api/phase2/integrations')
      const data = await response.json()
      setIntegrations(data.integrations)
    } catch (error) {
      console.error('Failed to fetch integrations:', error)
    }
  }

  const filterIntegrations = () => {
    let filtered = integrations

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(integration => 
        integration.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(integration =>
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredIntegrations(filtered)
  }

  const installIntegration = async (integrationId: string) => {
    setInstallingId(integrationId)
    
    try {
      const response = await fetch('/api/phase2/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'install', integrationId })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success(`Integration installed successfully!`)
        // Update the integration status in the list
        setIntegrations(prev =>
          prev.map(integration =>
            integration.id === integrationId
              ? { ...integration, status: 'installed' as const }
              : integration
          )
        )
      } else {
        toast.error('Installation failed')
      }
    } catch (error) {
      toast.error('Installation failed')
    } finally {
      setInstallingId(null)
    }
  }

  const categories = ['All', 'Accounting', 'Payments', 'Communication', 'Marketing', 'Document Management', 'Automation', 'Productivity', 'CRM']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'installed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'paid': return 'bg-blue-100 text-blue-800'
      default: return 'bg-purple-100 text-purple-800'
    }
  }

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'easy': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
      default: return <Settings className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-white">
            <Puzzle className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Integration Marketplace
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with 50+ third-party services to supercharge your tax practice. 
          One-click installations with zero coding required.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Integration Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="all">All Apps</TabsTrigger>
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {integration.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          {integration.provider}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {integration.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{integration.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {integration.installations.toLocaleString()}
                      </span>
                    </div>
                    <Badge className={getPricingColor(integration.pricing)}>
                      {integration.pricing}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {getComplexityIcon(integration.setupComplexity)}
                    <span className="text-sm text-gray-600">
                      {integration.setupComplexity} setup
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {integration.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {integration.features.length > 3 && (
                      <div className="text-xs text-blue-500">
                        +{integration.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => installIntegration(integration.id)}
                    disabled={integration.status === 'installed' || installingId === integration.id}
                    className={`w-full ${
                      integration.status === 'installed' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}
                  >
                    {installingId === integration.id ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Installing...
                      </div>
                    ) : integration.status === 'installed' ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Installed
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Install
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="installed">
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Great Progress!</h3>
            <p className="text-gray-600 mb-4">
              You have {integrations.filter(i => i.status === 'installed').length} integrations installed
            </p>
            <Badge className="bg-green-100 text-green-800">
              Saving $2,450/month in operational costs
            </Badge>
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations
              .filter(integration => integration.rating >= 4.7)
              .slice(0, 6)
              .map((integration) => (
                <Card key={integration.id} className="border-2 border-yellow-200 bg-yellow-50">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1" />
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                    </div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-yellow-600">
                        {integration.rating}★
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-600">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Try Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Integration Impact</h3>
          <p className="opacity-90">See how our marketplace transforms tax practices</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <p className="opacity-90">Available Integrations</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">89%</div>
            <p className="opacity-90">Efficiency Increase</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">$2.4K</div>
            <p className="opacity-90">Monthly Savings</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">35hrs</div>
            <p className="opacity-90">Time Saved/Week</p>
          </div>
        </div>
      </div>
    </div>
  )
}
