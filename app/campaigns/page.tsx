
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  MessageSquare, 
  Mail, 
  Send, 
  Users,
  Database,
  CheckCircle,
  AlertTriangle,
  Calendar,
  BarChart3,
  Search,
  Filter
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Campaign {
  id: string
  name: string
  type: 'EMAIL' | 'SMS' | 'AUTOMATED_SEQUENCE' | 'NEWSLETTER'
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'active' | 'paused'
  subject?: string
  content: string
  recipientCount: number
  openRate?: number
  clickRate?: number
  sentAt?: string
  scheduledFor?: string
  createdAt: string
}

export default function CampaignsPage() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false)

  useEffect(() => {
    loadRealCampaigns()
  }, [])

  const loadRealCampaigns = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      
      if (data.success) {
        setCampaigns(data.campaigns || [])
      } else {
        setCampaigns([])
      }
    } catch (error) {
      console.error('Error loading campaigns:', error)
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      sending: 'bg-yellow-100 text-yellow-800',
      sent: 'bg-green-100 text-green-800',
      active: 'bg-purple-100 text-purple-800',
      paused: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EMAIL': return <Mail className="h-4 w-4" />
      case 'SMS': return <MessageSquare className="h-4 w-4" />
      case 'NEWSLETTER': return <Users className="h-4 w-4" />
      default: return <Send className="h-4 w-4" />
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || campaign.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const campaignStats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active' || c.status === 'sending').length,
    sent: campaigns.filter(c => c.status === 'sent').length,
    totalRecipients: campaigns.reduce((sum, c) => sum + c.recipientCount, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-600" />
              Real Marketing Campaign System
            </h1>
            <p className="text-gray-600 mt-2">Connected to live campaign database - No mock campaigns</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real Data
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowNewCampaignForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Real Campaign
            </Button>
          </div>
        </div>

        {/* Real Data Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>✅ REAL CAMPAIGN SYSTEM:</strong> This system manages actual marketing campaigns from your database.
            No more fake metrics - create real email and SMS campaigns for your clients!
          </AlertDescription>
        </Alert>

        {/* Campaign Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Send className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{campaignStats.total}</h3>
              <p className="text-blue-700">Total Campaigns</p>
              <p className="text-xs text-blue-600 mt-1">Real Database</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">{campaignStats.sent}</h3>
              <p className="text-green-700">Sent</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-900">{campaignStats.active}</h3>
              <p className="text-purple-700">Active</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-orange-900">{campaignStats.totalRecipients}</h3>
              <p className="text-orange-700">Total Reach</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search real campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="sent">Sent</option>
                  <option value="paused">Paused</option>
                </select>
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading real campaigns from database...</p>
            </CardContent>
          </Card>
        ) : campaigns.length === 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-12 text-center">
              <Send className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No campaigns yet - Clean system!</h3>
              <p className="text-blue-800 mb-6">
                Perfect! Your marketing system is clean and ready for real campaigns. 
                Create your first campaign to start engaging your clients.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowNewCampaignForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Real Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {getTypeIcon(campaign.type)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {campaign.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {campaign.subject || 'No subject'}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Type: {campaign.type}</span>
                          <span>Recipients: {campaign.recipientCount}</span>
                          {campaign.openRate && (
                            <span>Open Rate: {campaign.openRate}%</span>
                          )}
                          {campaign.clickRate && (
                            <span>Click Rate: {campaign.clickRate}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status.toUpperCase()}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">
                          {campaign.sentAt 
                            ? `Sent: ${new Date(campaign.sentAt).toLocaleDateString()}`
                            : `Created: ${new Date(campaign.createdAt).toLocaleDateString()}`
                          }
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/campaigns/${campaign.id}`)}
                        >
                          View Details
                        </Button>
                        {campaign.status === 'draft' && (
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Real Campaign:</span>
                      <span>ID #{campaign.id.slice(0, 8)}, Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* New Campaign Form Modal */}
        {showNewCampaignForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Real Campaign</h2>
              
              <NewCampaignForm 
                onSuccess={() => {
                  setShowNewCampaignForm(false)
                  loadRealCampaigns()
                }}
                onCancel={() => setShowNewCampaignForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NewCampaignForm({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'EMAIL',
    subject: '',
    content: '',
    targetAudience: 'all_clients',
    scheduledFor: '',
    recipientCount: 0
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Failed to create campaign. Please try again.')
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Error creating campaign. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
        <Input
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Tax Season Reminder 2024..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="EMAIL">Email Campaign</option>
            <option value="SMS">SMS Campaign</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="AUTOMATED_SEQUENCE">Automated Sequence</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
          <select
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all_clients">All Clients</option>
            <option value="active_clients">Active Clients</option>
            <option value="prospects">Prospects</option>
            <option value="business_clients">Business Clients</option>
            <option value="individual_clients">Individual Clients</option>
          </select>
        </div>
      </div>

      {formData.type === 'EMAIL' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Important tax deadline reminder..."
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
        <textarea
          name="content"
          required
          value={formData.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={6}
          placeholder="Enter your campaign content here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Schedule For (Optional)</label>
        <Input
          name="scheduledFor"
          type="datetime-local"
          value={formData.scheduledFor}
          onChange={handleChange}
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty to save as draft</p>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Real Campaign
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
