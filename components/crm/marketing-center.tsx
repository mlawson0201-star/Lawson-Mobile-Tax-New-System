
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Target, 
  TrendingUp, 
  Mail, 
  MessageSquare, 
  Phone,
  Calendar,
  BarChart3,
  Users,
  Zap,
  Eye,
  Megaphone,
  Rocket,
  Crown,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  Play,
  Pause,
  Edit,
  Copy,
  Share,
  Download
} from 'lucide-react'
import { toast } from 'sonner'

interface Campaign {
  id: string
  name: string
  type: 'email' | 'sms' | 'social' | 'ads' | 'direct_mail'
  status: 'draft' | 'active' | 'paused' | 'completed'
  audience: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  roi: number
  createdAt: string
  launchDate?: string
}

interface Template {
  id: string
  name: string
  type: 'email' | 'sms' | 'social' | 'landing_page'
  category: string
  preview: string
  conversionRate: number
  isPopular?: boolean
}

export default function MarketingCenter() {
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/crm/campaigns')
        if (response.ok) {
          const campaigns = await response.json()
          setActiveCampaigns(campaigns)
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'Tax Season Special - Limited Time',
      type: 'email',
      category: 'Promotional',
      preview: 'Get your taxes done for just $99! Limited time offer...',
      conversionRate: 12.4,
      isPopular: true
    },
    {
      id: '2',
      name: 'Business Tax Expertise',
      type: 'email',
      category: 'Services',
      preview: 'Maximize your business deductions with our expert team...',
      conversionRate: 8.7
    },
    {
      id: '3',
      name: 'Free Tax Evaluation',
      type: 'landing_page',
      category: 'Lead Generation',
      preview: 'Discover hidden deductions with our free evaluation...',
      conversionRate: 15.2,
      isPopular: true
    },
    {
      id: '4',
      name: 'Tax Deadline Reminder',
      type: 'sms',
      category: 'Urgent',
      preview: '⚠️ Tax deadline approaching! Schedule your appointment...',
      conversionRate: 18.9,
      isPopular: true
    },
    {
      id: '5',
      name: 'Client Success Story',
      type: 'social',
      category: 'Social Proof',
      preview: 'See how we saved Sarah $2,400 in taxes this year...',
      conversionRate: 6.3
    }
  ])

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    audience: '',
    budget: '',
    content: ''
  })

  const createCampaign = () => {
    if (!newCampaign.name || !newCampaign.audience || !newCampaign.budget) {
      toast.error('Please fill in all required fields')
      return
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      type: newCampaign.type as any,
      status: 'draft',
      audience: newCampaign.audience,
      budget: parseInt(newCampaign.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0,
      createdAt: new Date().toISOString(),
    }

    setActiveCampaigns(prev => [...prev, campaign])
    setNewCampaign({ name: '', type: 'email', audience: '', budget: '', content: '' })
    toast.success('Campaign created successfully!')
  }

  const toggleCampaignStatus = (id: string) => {
    setActiveCampaigns(prev => prev.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ))
    toast.success('Campaign status updated!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail
      case 'sms': return MessageSquare
      case 'ads': return Target
      case 'social': return Share
      case 'direct_mail': return Mail
      default: return Megaphone
    }
  }

  return (
    <div className="space-y-6">
      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Campaigns</p>
                <p className="text-2xl font-bold">
                  {loading ? '...' : activeCampaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Rocket className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Conversions</p>
                <p className="text-2xl font-bold">
                  {loading ? '...' : activeCampaigns.reduce((sum, c) => sum + c.conversions, 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Average ROI</p>
                <p className="text-2xl font-bold">
                  {loading ? '...' : activeCampaigns.length > 0 ? 
                    Math.round(activeCampaigns.reduce((sum, c) => sum + c.roi, 0) / activeCampaigns.length) + '%' : 
                    '0%'
                  }
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Impressions</p>
                <p className="text-2xl font-bold">
                  {loading ? '...' : activeCampaigns.length > 0 ?
                    (activeCampaigns.reduce((sum, c) => sum + c.impressions, 0) / 1000).toFixed(0) + 'K' :
                    '0'
                  }
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* Active Campaigns */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-purple-600" />
                Campaign Performance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading campaigns...</p>
                  </div>
                </div>
              ) : activeCampaigns.length === 0 ? (
                <div className="text-center py-12">
                  <Rocket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Campaigns</h3>
                  <p className="text-gray-600 mb-6">
                    Get started by creating your first marketing campaign to attract and convert more clients.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Rocket className="h-4 w-4 mr-2" />
                      Create Your First Campaign
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Templates
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCampaigns.map((campaign) => {
                  const TypeIcon = getTypeIcon(campaign.type)
                  return (
                    <Card key={campaign.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <TypeIcon className="h-6 w-6 text-purple-600" />
                          <div>
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            <p className="text-sm text-gray-600">Audience: {campaign.audience}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleCampaignStatus(campaign.id)}
                          >
                            {campaign.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">${campaign.budget - campaign.spent}</div>
                          <div className="text-xs text-gray-500">Budget Left</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{campaign.impressions.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Impressions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{campaign.clicks.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Clicks</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{campaign.conversions}</div>
                          <div className="text-xs text-gray-500">Conversions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{campaign.roi}%</div>
                          <div className="text-xs text-gray-500">ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">
                            {((campaign.clicks / campaign.impressions) * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500">CTR</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                      </div>
                    </Card>
                  )
                })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Campaign */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                Create New Campaign
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Campaign Name *</Label>
                    <Input
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      placeholder="Spring Tax Special 2024"
                    />
                  </div>

                  <div>
                    <Label>Campaign Type *</Label>
                    <Select 
                      value={newCampaign.type} 
                      onValueChange={(value) => setNewCampaign({...newCampaign, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="sms">SMS Campaign</SelectItem>
                        <SelectItem value="ads">Digital Ads</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="direct_mail">Direct Mail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Target Audience *</Label>
                    <Select 
                      value={newCampaign.audience} 
                      onValueChange={(value) => setNewCampaign({...newCampaign, audience: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_clients">All Clients</SelectItem>
                        <SelectItem value="new_leads">New Leads</SelectItem>
                        <SelectItem value="past_clients">Past Clients</SelectItem>
                        <SelectItem value="business_owners">Small Business Owners</SelectItem>
                        <SelectItem value="high_value">High Value Prospects</SelectItem>
                        <SelectItem value="inactive">Inactive Clients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Budget *</Label>
                    <Input
                      type="number"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Campaign Content</Label>
                    <Textarea
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                      placeholder="Write your campaign message here..."
                      rows={6}
                    />
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">AI Recommendations</h4>
                    <div className="space-y-2 text-sm text-purple-700">
                      <p>• Best time to send: Tuesday 10 AM</p>
                      <p>• Expected open rate: 24-28%</p>
                      <p>• Recommended subject: "Save $500+ on Your Taxes"</p>
                      <p>• Estimated ROI: 280-320%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={createCampaign} className="bg-purple-600 hover:bg-purple-700">
                  <Rocket className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Proven Marketing Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className={`cursor-pointer transition-all hover:shadow-lg ${
                    template.isPopular ? 'border-2 border-yellow-400' : ''
                  }`}>
                    <CardContent className="p-4">
                      {template.isPopular && (
                        <Badge className="bg-yellow-100 text-yellow-800 mb-2">
                          <Crown className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <Badge variant="outline" className="mb-2">{template.type}</Badge>
                      <p className="text-sm text-gray-600 mb-3">{template.preview}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">
                            {template.conversionRate}% CVR
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-500" />
                Marketing Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <h3 className="font-semibold text-green-800">Welcome Series</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-4">
                    5-email sequence for new leads with 89% completion rate
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    View Sequence
                  </Button>
                </Card>

                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <h3 className="font-semibold text-blue-800">Follow-up Reminders</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-4">
                    Automated follow-ups based on client behavior
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Configure
                  </Button>
                </Card>

                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-6 w-6 text-yellow-500" />
                    <h3 className="font-semibold text-yellow-800">Upsell Campaigns</h3>
                  </div>
                  <p className="text-sm text-yellow-700 mb-4">
                    Promote additional services to existing clients
                  </p>
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    Set Up
                  </Button>
                </Card>

                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6 text-purple-500" />
                    <h3 className="font-semibold text-purple-800">Seasonal Campaigns</h3>
                  </div>
                  <p className="text-sm text-purple-700 mb-4">
                    Tax season, year-end, and quarterly campaigns
                  </p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Schedule
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
