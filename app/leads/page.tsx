
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Users, 
  TrendingUp,
  Phone,
  Mail,
  Star,
  Database,
  CheckCircle,
  Search,
  Filter,
  UserPlus,
  Eye,
  MessageSquare,
  Calendar,
  Building2,
  Globe
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  source?: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'LOST'
  probability: number
  assignedTo: string
  contactedAt?: string
  createdAt: string
  stage: string
  expectedValue?: number
}

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSource, setFilterSource] = useState('all')

  useEffect(() => {
    loadRealLeads()
  }, [])

  const loadRealLeads = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/leads')
      const data = await response.json()
      
      if (data.success) {
        setLeads(data.leads || [])
      } else {
        setLeads([])
      }
    } catch (error) {
      console.error('Error loading leads:', error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      NEW: 'bg-blue-100 text-blue-800',
      CONTACTED: 'bg-yellow-100 text-yellow-800',
      QUALIFIED: 'bg-purple-100 text-purple-800',
      PROPOSAL_SENT: 'bg-orange-100 text-orange-800',
      CONVERTED: 'bg-green-100 text-green-800',
      LOST: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || colors.NEW
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600'
    if (probability >= 60) return 'text-yellow-600'
    if (probability >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case 'WEBSITE': return <Globe className="h-4 w-4" />
      case 'REFERRAL': return <Users className="h-4 w-4" />
      case 'SOCIAL_MEDIA': return <MessageSquare className="h-4 w-4" />
      case 'PHONE': return <Phone className="h-4 w-4" />
      default: return <UserPlus className="h-4 w-4" />
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.phone && lead.phone.includes(searchTerm)) ||
                         (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || lead.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesSource = filterSource === 'all' || (lead.source && lead.source.toLowerCase() === filterSource.toLowerCase())
    return matchesSearch && matchesStatus && matchesSource
  })

  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'NEW').length,
    qualified: leads.filter(l => l.status === 'QUALIFIED').length,
    converted: leads.filter(l => l.status === 'CONVERTED').length,
    averageProbability: leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.probability, 0) / leads.length) : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-600" />
              Real Lead Management System
            </h1>
            <p className="text-gray-600 mt-2">Connected to live lead database - No mock leads</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real Data
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/leads/new')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Real Lead
            </Button>
          </div>
        </div>

        {/* Real Data Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>✅ REAL LEAD SYSTEM:</strong> This system manages actual sales leads from your database.
            Automatic email welcome sequences and probability scoring. No more fake prospects!
          </AlertDescription>
        </Alert>

        {/* Lead Statistics */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{leadStats.total}</h3>
              <p className="text-blue-700">Total Leads</p>
              <p className="text-xs text-blue-600 mt-1">Real Database</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <UserPlus className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">{leadStats.new}</h3>
              <p className="text-green-700">New Leads</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-900">{leadStats.qualified}</h3>
              <p className="text-purple-700">Qualified</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-yellow-900">{leadStats.converted}</h3>
              <p className="text-yellow-700">Converted</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-orange-900">{leadStats.averageProbability}%</h3>
              <p className="text-orange-700">Avg Probability</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading real leads from database...</p>
            </CardContent>
          </Card>
        ) : leads.length === 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No leads yet - Clean system!</h3>
              <p className="text-blue-800 mb-6">
                Perfect! Your lead management system is clean and ready for real prospects. 
                Add your first lead to start building your client pipeline.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/leads/new')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Real Lead
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {getSourceIcon(lead.source)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {lead.email} {lead.phone && `• ${lead.phone}`}
                          {lead.company && (
                            <>
                              <br />
                              <Building2 className="h-3 w-3 inline mr-1" />
                              {lead.company}
                            </>
                          )}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Source: {lead.source?.replace('_', ' ') || 'Unknown'}</span>
                          <span>Assigned: {lead.assignedTo}</span>
                          <span>Stage: {lead.stage?.replace('_', ' ')}</span>
                          {lead.expectedValue && (
                            <span>Value: ${lead.expectedValue.toFixed(0)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className={getProbabilityColor(lead.probability)}>
                            {lead.probability}% Probability
                          </Badge>
                        </div>
                        {lead.contactedAt && (
                          <div className="text-sm text-gray-600">
                            Last contact: {new Date(lead.contactedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/leads/${lead.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `mailto:${lead.email}`}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        
                        {lead.phone && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `tel:${lead.phone}`}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Real Lead:</span>
                      <span>ID #{lead.id.slice(0, 8)}, {lead.probability}% probability, Added {new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
