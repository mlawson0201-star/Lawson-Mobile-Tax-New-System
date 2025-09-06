
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, FileText, Calendar, DollarSign, User, Building2, Phone, Mail } from 'lucide-react'
import { EmailIntegration } from './email-integration'
import { toast } from 'sonner'

// Payment processing function for CRM clients
const processClientPayment = async (clientId: string, amount: number, description: string) => {
  try {
    const response = await fetch('/api/payments/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        amount,
        description: `Client Payment: ${description}`,
        successUrl: `${window.location.origin}/crm/payment-success?client_id=${clientId}`,
        cancelUrl: `${window.location.origin}/crm/clients`
      })
    })

    const data = await response.json()
    if (data.success && data.sessionUrl) {
      window.location.href = data.sessionUrl
    } else {
      toast.error('Payment processing failed. Please try again.')
    }
  } catch (error) {
    console.error('Payment error:', error)
    toast.error('Payment system error. Please contact support.')
  }
}

interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  clientType: 'INDIVIDUAL' | 'BUSINESS' | 'NONPROFIT'
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  accountType: 'MAIN' | 'SUB'
  parentClientId?: string
  parentClient?: {
    id: string
    firstName: string
    lastName: string
    company?: string
  }
  subAccounts?: Client[]
  totalValue: number
  taxReturnsCount: number
  lastContactDate?: string
  nextAppointment?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  businessInfo?: {
    ein: string
    businessType: string
    yearlyRevenue: number
  }
  customFields: Record<string, any>
}

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-yellow-100 text-yellow-800',
  ARCHIVED: 'bg-gray-100 text-gray-800'
}

const clientTypeColors = {
  INDIVIDUAL: 'bg-blue-100 text-blue-800',
  BUSINESS: 'bg-purple-100 text-purple-800',
  NONPROFIT: 'bg-orange-100 text-orange-800'
}

export function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isAddingClient, setIsAddingClient] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Real API call to fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/crm/clients')
        if (response.ok) {
          const data = await response.json()
          setClients(data.clients || [])
        } else {
          console.error('Failed to fetch clients')
          toast.error('Failed to load clients')
        }
      } catch (error) {
        console.error('Error fetching clients:', error)
        toast.error('Error loading clients')
      } finally {
        setIsLoading(false)
      }
    }

    fetchClients()
  }, [])

  const filteredClients = clients.filter(client => {
    const matchesSearch = `${client.firstName} ${client.lastName} ${client.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    const matchesType = typeFilter === 'all' || client.clientType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddClient = async (clientData: any) => {
    try {
      const response = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      })

      if (response.ok) {
        const newClient = await response.json()
        setClients(prev => [newClient, ...prev])
        toast.success('Client added successfully!')
        setIsAddingClient(false)
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to add client')
      }
    } catch (error) {
      console.error('Error adding client:', error)
      toast.error('Failed to add client')
    }
  }

  const handleStatusUpdate = async (clientId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/crm/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedClient = await response.json()
        setClients(prev => prev.map(client => 
          client.id === clientId ? { ...client, ...updatedClient } : client
        ))
        toast.success('Client status updated!')
      } else {
        toast.error('Failed to update client status')
      }
    } catch (error) {
      console.error('Error updating client status:', error)
      toast.error('Failed to update client status')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600 mt-1">
            Manage your clients and their tax service history
          </p>
        </div>
        <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter client information to create a new client profile
              </DialogDescription>
            </DialogHeader>
            <AddClientForm onSubmit={handleAddClient} onCancel={() => setIsAddingClient(false)} clients={clients} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{clients.filter(c => c.status === 'ACTIVE').length}</div>
            <p className="text-sm text-gray-600">Active Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{clients.filter(c => c.clientType === 'BUSINESS').length}</div>
            <p className="text-sm text-gray-600">Business Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              ${clients.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {clients.reduce((sum, c) => sum + c.taxReturnsCount, 0)}
            </div>
            <p className="text-sm text-gray-600">Tax Returns</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search clients..."
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
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="INDIVIDUAL">Individual</SelectItem>
            <SelectItem value="BUSINESS">Business</SelectItem>
            <SelectItem value="NONPROFIT">Nonprofit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients Grid */}
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
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => setSelectedClient(client)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {client.firstName} {client.lastName}
                    {client.accountType === 'SUB' && (
                      <span className="text-sm text-gray-500 ml-2">(Sub-account)</span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[client.status]}>
                      {client.status}
                    </Badge>
                    <Badge className={clientTypeColors[client.clientType]}>
                      {client.clientType}
                    </Badge>
                    {client.accountType === 'MAIN' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        MAIN
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription>
                  {client.company || client.email}
                  {client.parentClient && (
                    <div className="text-xs text-gray-500 mt-1">
                      Parent: {client.parentClient.firstName} {client.parentClient.lastName}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Value:</span>
                  <span className="font-semibold text-green-600">${client.totalValue.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tax Returns:</span>
                  <span className="font-semibold">{client.taxReturnsCount}</span>
                </div>

                {client.subAccounts && client.subAccounts.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sub-accounts:</span>
                    <span className="font-semibold text-blue-600">{client.subAccounts.length}</span>
                  </div>
                )}

                {client.lastContactDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Contact:</span>
                    <span>{new Date(client.lastContactDate).toLocaleDateString()}</span>
                  </div>
                )}

                {client.nextAppointment && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Appointment:</span>
                    <span className="text-blue-600">{new Date(client.nextAppointment).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                </div>

                {client.accountType === 'MAIN' && (
                  <div className="pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-full text-blue-600 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Add sub-account functionality
                        toast.success('Sub-account management coming soon!')
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Sub-Account
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredClients.length === 0 && !isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No clients found</p>
            <Button onClick={() => setIsAddingClient(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Client Details Modal */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedClient && <ClientDetails client={selectedClient} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ClientDetails({ client }: { client: Client }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{client.firstName} {client.lastName}</h3>
          <p className="text-gray-600">{client.company || client.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={statusColors[client.status]}>{client.status}</Badge>
          <Badge className={clientTypeColors[client.clientType]}>{client.clientType}</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tax-returns">Tax Returns</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Account Type:</strong> {client.accountType === 'MAIN' ? 'Main Account' : 'Sub-Account'}</div>
                <div><strong>Email:</strong> {client.email}</div>
                {client.phone && <div><strong>Phone:</strong> {client.phone}</div>}
                {client.parentClient && (
                  <div>
                    <strong>Parent Account:</strong> {client.parentClient.firstName} {client.parentClient.lastName}
                    {client.parentClient.company && ` (${client.parentClient.company})`}
                  </div>
                )}
                {client.address && (
                  <div>
                    <strong>Address:</strong><br />
                    {client.address.street}<br />
                    {client.address.city}, {client.address.state} {client.address.zipCode}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Total Value:</strong> ${client.totalValue.toLocaleString()}</div>
                <div><strong>Tax Returns:</strong> {client.taxReturnsCount}</div>
                {client.subAccounts && client.subAccounts.length > 0 && (
                  <div><strong>Sub-accounts:</strong> {client.subAccounts.length}</div>
                )}
                {client.lastContactDate && (
                  <div><strong>Last Contact:</strong> {new Date(client.lastContactDate).toLocaleDateString()}</div>
                )}
                {client.nextAppointment && (
                  <div><strong>Next Appointment:</strong> {new Date(client.nextAppointment).toLocaleDateString()}</div>
                )}
              </CardContent>
            </Card>

            {client.businessInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>EIN:</strong> {client.businessInfo.ein}</div>
                  <div><strong>Business Type:</strong> {client.businessInfo.businessType}</div>
                  <div><strong>Annual Revenue:</strong> ${client.businessInfo.yearlyRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>
            )}

            {client.subAccounts && client.subAccounts.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Sub-Accounts ({client.subAccounts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {client.subAccounts.map((subAccount) => (
                      <div key={subAccount.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">
                            {subAccount.firstName} {subAccount.lastName}
                          </div>
                          <div className="text-sm text-gray-600">{subAccount.email}</div>
                          {subAccount.customFields?.relationship && (
                            <div className="text-xs text-gray-500">
                              Relationship: {subAccount.customFields.relationship}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${subAccount.totalValue.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {subAccount.taxReturnsCount} returns
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tax-returns">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Tax returns history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Client documents will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <EmailIntegration 
            clientId={client.id}
            clientName={`${client.firstName} ${client.lastName}`}
            clientEmail={client.email}
          />
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Communication history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Client notes will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddClientForm({ onSubmit, onCancel, clients }: { 
  onSubmit: (data: any) => void, 
  onCancel: () => void,
  clients?: Client[]
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    clientType: 'INDIVIDUAL',
    accountType: 'MAIN',
    parentClientId: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    // Business fields
    ein: '',
    businessType: '',
    yearlyRevenue: '',
    // Relationship field for sub-accounts
    relationship: ''
  })

  // Filter main accounts only for parent selection
  const mainClients = clients?.filter(client => client.accountType === 'MAIN') || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          {formData.clientType === 'BUSINESS' && <TabsTrigger value="business">Business Info</TabsTrigger>}
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
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
              <Label htmlFor="clientType">Client Type</Label>
              <Select value={formData.clientType} onValueChange={(value) => setFormData(prev => ({ ...prev, clientType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                  <SelectItem value="BUSINESS">Business</SelectItem>
                  <SelectItem value="NONPROFIT">Nonprofit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select value={formData.accountType} onValueChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAIN">Main Account</SelectItem>
                  <SelectItem value="SUB">Sub-Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.accountType === 'SUB' && mainClients.length > 0 && (
            <div>
              <Label htmlFor="parentClient">Parent Account *</Label>
              <Select value={formData.parentClientId} onValueChange={(value) => setFormData(prev => ({ ...prev, parentClientId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent account" />
                </SelectTrigger>
                <SelectContent>
                  {mainClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.firstName} {client.lastName} {client.company && `(${client.company})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.accountType === 'SUB' && (
            <div>
              <Label htmlFor="relationship">Relationship to Parent Account</Label>
              <Input
                id="relationship"
                value={formData.relationship}
                onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                placeholder="e.g., Spouse, Child, Subsidiary, Partner"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {formData.clientType === 'BUSINESS' && (
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="address" className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
              />
            </div>
          </div>
        </TabsContent>

        {formData.clientType === 'BUSINESS' && (
          <TabsContent value="business" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ein">EIN</Label>
                <Input
                  id="ein"
                  value={formData.ein}
                  onChange={(e) => setFormData(prev => ({ ...prev, ein: e.target.value }))}
                  placeholder="XX-XXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="S Corporation">S Corporation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="yearlyRevenue">Annual Revenue ($)</Label>
              <Input
                id="yearlyRevenue"
                type="number"
                value={formData.yearlyRevenue}
                onChange={(e) => setFormData(prev => ({ ...prev, yearlyRevenue: e.target.value }))}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Client
        </Button>
      </div>
    </form>
  )
}
