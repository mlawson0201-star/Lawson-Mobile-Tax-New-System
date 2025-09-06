
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Search, Filter, MoreHorizontal, Phone, Mail, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  source?: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST' | 'NURTURING'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  stage: string
  expectedValue?: number
  probability: number
  assignee?: {
    name: string
    email: string
  }
  createdAt: string
  contactedAt?: string
  customFields: Record<string, any>
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-green-100 text-green-800',
  PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
  NEGOTIATION: 'bg-orange-100 text-orange-800',
  WON: 'bg-emerald-100 text-emerald-800',
  LOST: 'bg-red-100 text-red-800',
  NURTURING: 'bg-gray-100 text-gray-800'
}

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-blue-100 text-blue-600',
  HIGH: 'bg-orange-100 text-orange-600',
  URGENT: 'bg-red-100 text-red-600'
}

export function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddingLead, setIsAddingLead] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Sample data - replace with API call
  useEffect(() => {
    const loadLeads = () => {
      try {
        // Load leads from tax evaluation submissions and client data
        const savedClients = localStorage.getItem('lmt-clients')
        const savedLeads = localStorage.getItem('lmt-leads')
        
        let allLeads: Lead[] = []
        
        // Convert clients to leads if they exist
        if (savedClients) {
          const clients = JSON.parse(savedClients)
          const clientLeads: Lead[] = clients.map((client: any) => ({
            id: `client-${client.id}`,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phone: client.phone,
            company: client.company || '',
            source: 'Client Database',
            status: client.status === 'ACTIVE' ? 'WON' : 'QUALIFIED',
            priority: client.totalSpent > 1000 ? 'HIGH' : 'MEDIUM',
            stage: client.status === 'ACTIVE' ? 'won' : 'qualified',
            expectedValue: client.totalSpent || 0,
            probability: client.status === 'ACTIVE' ? 100 : 75,
            assignee: {
              name: 'LMT Team',
              email: 'team@lmt.com'
            },
            createdAt: client.createdAt,
            contactedAt: client.updatedAt,
            customFields: {
              services: client.services?.join(', ') || '',
              totalSpent: client.totalSpent
            }
          }))
          allLeads = [...allLeads, ...clientLeads]
        }
        
        // Load additional leads from lead management
        if (savedLeads) {
          const leads = JSON.parse(savedLeads)
          allLeads = [...allLeads, ...leads]
        } else {
          // Add some sample leads if none exist
          const sampleLeads: Lead[] = [
            {
              id: 'lead-1',
              firstName: 'Robert',
              lastName: 'Williams',
              email: 'robert.w@email.com',
              phone: '+1 (555) 321-9876',
              company: 'Williams Consulting',
              source: 'Tax Evaluation',
              status: 'NEW',
              priority: 'HIGH',
              stage: 'new',
              expectedValue: 899,
              probability: 80,
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              customFields: {
                evaluationAmount: '$19.99',
                interestedServices: 'Individual Tax Return, Tax Planning'
              }
            },
            {
              id: 'lead-2',
              firstName: 'Lisa',
              lastName: 'Davis',
              email: 'lisa.d@email.com',
              phone: '+1 (555) 654-3210',
              company: 'Davis Marketing',
              source: 'Website Contact',
              status: 'CONTACTED',
              priority: 'MEDIUM',
              stage: 'contacted',
              expectedValue: 1299,
              probability: 60,
              assignee: {
                name: 'Sarah Johnson',
                email: 'sarah@lmt.com'
              },
              createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              contactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              customFields: {
                businessType: 'Marketing Agency',
                employees: '5-10'
              }
            }
          ]
          allLeads = [...allLeads, ...sampleLeads]
          localStorage.setItem('lmt-leads', JSON.stringify(sampleLeads))
        }
        
        setLeads(allLeads)
      } catch (error) {
        console.error('Error loading leads:', error)
        toast.error('Error loading leads data')
      }
      setIsLoading(false)
    }
    
    loadLeads()
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadLeads, 30000)
    return () => clearInterval(interval)
  }, [])

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = `${lead.firstName} ${lead.lastName} ${lead.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddLead = async (leadData: any) => {
    try {
      // API call would go here
      toast.success('Lead added successfully!')
      setIsAddingLead(false)
      // Refresh leads
    } catch (error) {
      toast.error('Failed to add lead')
    }
  }

  const handleStatusUpdate = async (leadId: string, newStatus: string) => {
    try {
      // API call would go here
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus as any } : lead
      ))
      toast.success('Lead status updated!')
    } catch (error) {
      toast.error('Failed to update lead status')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
          <p className="text-gray-600 mt-1">
            Manage and track your sales leads through the conversion process
          </p>
        </div>
        <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Enter the lead information to start tracking them through your pipeline
              </DialogDescription>
            </DialogHeader>
            <AddLeadForm onSubmit={handleAddLead} onCancel={() => setIsAddingLead(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="QUALIFIED">Qualified</SelectItem>
            <SelectItem value="PROPOSAL_SENT">Proposal Sent</SelectItem>
            <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
            <SelectItem value="WON">Won</SelectItem>
            <SelectItem value="LOST">Lost</SelectItem>
            <SelectItem value="NURTURING">Nurturing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {lead.firstName} {lead.lastName}
                  </CardTitle>
                  <Badge className={priorityColors[lead.priority]}>
                    {lead.priority}
                  </Badge>
                </div>
                <CardDescription>{lead.company || lead.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={statusColors[lead.status]}>
                    {lead.status.replace('_', ' ')}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {lead.probability}% probability
                  </span>
                </div>

                {lead.expectedValue && (
                  <div className="text-sm">
                    <span className="text-gray-600">Expected Value: </span>
                    <span className="font-medium">${lead.expectedValue.toLocaleString()}</span>
                  </div>
                )}

                {lead.assignee && (
                  <div className="text-sm">
                    <span className="text-gray-600">Assigned to: </span>
                    <span className="font-medium">{lead.assignee.name}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    SMS
                  </Button>
                </div>

                <Select
                  value={lead.status}
                  onValueChange={(value) => handleStatusUpdate(lead.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="CONTACTED">Contacted</SelectItem>
                    <SelectItem value="QUALIFIED">Qualified</SelectItem>
                    <SelectItem value="PROPOSAL_SENT">Proposal Sent</SelectItem>
                    <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
                    <SelectItem value="WON">Won</SelectItem>
                    <SelectItem value="LOST">Lost</SelectItem>
                    <SelectItem value="NURTURING">Nurturing</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredLeads.length === 0 && !isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No leads found</p>
            <Button onClick={() => setIsAddingLead(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Lead
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddLeadForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    status: 'NEW',
    priority: 'MEDIUM',
    expectedValue: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      expectedValue: formData.expectedValue ? parseFloat(formData.expectedValue) : undefined
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="source">Source</Label>
          <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
              <SelectItem value="Advertisement">Advertisement</SelectItem>
              <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="CONTACTED">Contacted</SelectItem>
              <SelectItem value="QUALIFIED">Qualified</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="expectedValue">Expected Value ($)</Label>
          <Input
            id="expectedValue"
            type="number"
            value={formData.expectedValue}
            onChange={(e) => setFormData(prev => ({ ...prev, expectedValue: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Additional notes about this lead..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Lead
        </Button>
      </div>
    </form>
  )
}
