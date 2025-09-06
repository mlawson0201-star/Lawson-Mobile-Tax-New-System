
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
import { Plus, Search, Building2, Users, DollarSign, Globe, Settings, Palette } from 'lucide-react'
import { toast } from 'sonner'

interface Partner {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  type: 'PARTNER' | 'BRANCH'
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  subscriptionPlan: 'basic' | 'professional' | 'enterprise'
  customDomain?: string
  branding: {
    logo?: string
    primaryColor: string
    secondaryColor: string
  }
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  stats: {
    totalClients: number
    monthlyRevenue: number
    totalUsers: number
    taxReturnsProcessed: number
  }
  commissionRate: number
  joinDate: string
  lastActive?: string
  settings: Record<string, any>
}

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800'
}

const planColors = {
  basic: 'bg-blue-100 text-blue-800',
  professional: 'bg-purple-100 text-purple-800',
  enterprise: 'bg-gold-100 text-gold-800'
}

export function PartnerManagement() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [isAddingPartner, setIsAddingPartner] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Sample data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      setPartners([
        {
          id: '1',
          name: 'Metro Tax Services',
          slug: 'metro-tax-services',
          email: 'admin@metrotax.com',
          phone: '+1 (555) 123-4567',
          type: 'PARTNER',
          status: 'ACTIVE',
          subscriptionPlan: 'professional',
          customDomain: 'metrotax.com',
          branding: {
            logo: '/logos/metro-tax.png',
            primaryColor: '#2563eb',
            secondaryColor: '#64748b'
          },
          address: {
            street: '123 Business Ave',
            city: 'Chicago',
            state: 'IL',
            zipCode: '60601'
          },
          stats: {
            totalClients: 245,
            monthlyRevenue: 15600,
            totalUsers: 6,
            taxReturnsProcessed: 189
          },
          commissionRate: 15,
          joinDate: '2023-09-15',
          lastActive: '2024-01-20',
          settings: { autoBackup: true, emailNotifications: true }
        },
        {
          id: '2',
          name: 'Sunshine Tax Solutions',
          slug: 'sunshine-tax',
          email: 'contact@sunshinetax.com',
          phone: '+1 (555) 987-6543',
          type: 'PARTNER',
          status: 'ACTIVE',
          subscriptionPlan: 'enterprise',
          customDomain: 'sunshinetax.com',
          branding: {
            primaryColor: '#f59e0b',
            secondaryColor: '#f3f4f6'
          },
          address: {
            street: '456 Tax Plaza',
            city: 'Miami',
            state: 'FL',
            zipCode: '33101'
          },
          stats: {
            totalClients: 892,
            monthlyRevenue: 45200,
            totalUsers: 18,
            taxReturnsProcessed: 673
          },
          commissionRate: 20,
          joinDate: '2023-06-01',
          lastActive: '2024-01-21',
          settings: { autoBackup: true, emailNotifications: true, smsNotifications: true }
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = `${partner.name} ${partner.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter
    const matchesPlan = planFilter === 'all' || partner.subscriptionPlan === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const totalStats = partners.reduce((acc, partner) => ({
    totalClients: acc.totalClients + partner.stats.totalClients,
    totalRevenue: acc.totalRevenue + partner.stats.monthlyRevenue,
    totalUsers: acc.totalUsers + partner.stats.totalUsers,
    totalReturns: acc.totalReturns + partner.stats.taxReturnsProcessed
  }), { totalClients: 0, totalRevenue: 0, totalUsers: 0, totalReturns: 0 })

  const handleAddPartner = async (partnerData: any) => {
    try {
      // API call would go here
      toast.success('Partner added successfully!')
      setIsAddingPartner(false)
      // Refresh partners
    } catch (error) {
      toast.error('Failed to add partner')
    }
  }

  const handleStatusUpdate = async (partnerId: string, newStatus: string) => {
    try {
      setPartners(prev => prev.map(partner => 
        partner.id === partnerId ? { ...partner, status: newStatus as any } : partner
      ))
      toast.success('Partner status updated!')
    } catch (error) {
      toast.error('Failed to update partner status')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Partner Management</h2>
          <p className="text-gray-600 mt-1">
            Manage your white-label partners and reseller network
          </p>
        </div>
        <Dialog open={isAddingPartner} onOpenChange={setIsAddingPartner}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Partner</DialogTitle>
              <DialogDescription>
                Set up a new white-label partner with custom branding and configuration
              </DialogDescription>
            </DialogHeader>
            <AddPartnerForm onSubmit={handleAddPartner} onCancel={() => setIsAddingPartner(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{partners.length}</div>
            <p className="text-sm text-gray-600">Active Partners</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{totalStats.totalClients.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Network Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">${totalStats.totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{totalStats.totalReturns.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Tax Returns Processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search partners..."
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
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Partners Grid */}
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
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => setSelectedPartner(partner)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {partner.branding.logo ? (
                      <img src={partner.branding.logo} alt={partner.name} className="w-10 h-10 rounded" />
                    ) : (
                      <div 
                        className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: partner.branding.primaryColor }}
                      >
                        {partner.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <CardDescription className="text-sm">{partner.customDomain || partner.slug}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={statusColors[partner.status]}>
                      {partner.status}
                    </Badge>
                    <Badge className={planColors[partner.subscriptionPlan]}>
                      {partner.subscriptionPlan.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Clients:</span>
                    <div className="font-semibold text-blue-600">{partner.stats.totalClients.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Revenue:</span>
                    <div className="font-semibold text-green-600">${partner.stats.monthlyRevenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Users:</span>
                    <div className="font-semibold">{partner.stats.totalUsers}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Returns:</span>
                    <div className="font-semibold">{partner.stats.taxReturnsProcessed}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Commission:</span>
                  <span className="font-semibold text-purple-600">{partner.commissionRate}%</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Joined:</span>
                  <span>{new Date(partner.joinDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Palette className="h-3 w-3 mr-1" />
                    Branding
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredPartners.length === 0 && !isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No partners found</p>
            <Button onClick={() => setIsAddingPartner(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Partner
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Partner Details Modal */}
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedPartner && <PartnerDetails partner={selectedPartner} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PartnerDetails({ partner }: { partner: Partner }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {partner.branding.logo ? (
            <img src={partner.branding.logo} alt={partner.name} className="w-16 h-16 rounded-lg" />
          ) : (
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: partner.branding.primaryColor }}
            >
              {partner.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold">{partner.name}</h3>
            <p className="text-gray-600">{partner.customDomain || `${partner.slug}.formalitytax.com`}</p>
            <p className="text-sm text-gray-500">Member since {new Date(partner.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={statusColors[partner.status]}>{partner.status}</Badge>
          <Badge className={planColors[partner.subscriptionPlan]}>{partner.subscriptionPlan.toUpperCase()}</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{partner.stats.totalClients}</div>
                <p className="text-sm text-gray-600">Total Clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">${partner.stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{partner.stats.totalUsers}</div>
                <p className="text-sm text-gray-600">Active Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{partner.stats.taxReturnsProcessed}</div>
                <p className="text-sm text-gray-600">Tax Returns</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Email:</strong> {partner.email}</div>
                {partner.phone && <div><strong>Phone:</strong> {partner.phone}</div>}
                <div>
                  <strong>Address:</strong><br />
                  {partner.address.street}<br />
                  {partner.address.city}, {partner.address.state} {partner.address.zipCode}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partnership Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><strong>Commission Rate:</strong> {partner.commissionRate}%</div>
                <div><strong>Subscription Plan:</strong> {partner.subscriptionPlan}</div>
                <div><strong>Join Date:</strong> {new Date(partner.joinDate).toLocaleDateString()}</div>
                {partner.lastActive && (
                  <div><strong>Last Active:</strong> {new Date(partner.lastActive).toLocaleDateString()}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Brand Configuration</CardTitle>
              <CardDescription>Customize the partner's white-label branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: partner.branding.primaryColor }}
                    />
                    <span className="font-mono">{partner.branding.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: partner.branding.secondaryColor }}
                    />
                    <span className="font-mono">{partner.branding.secondaryColor}</span>
                  </div>
                </div>
              </div>
              {partner.customDomain && (
                <div>
                  <Label>Custom Domain</Label>
                  <p className="text-sm text-gray-600">{partner.customDomain}</p>
                </div>
              )}
              <div>
                <Label>Logo</Label>
                {partner.branding.logo ? (
                  <img src={partner.branding.logo} alt="Partner logo" className="w-24 h-24 object-contain border rounded" />
                ) : (
                  <p className="text-sm text-gray-500">No logo uploaded</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Performance analytics will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Billing and commission details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Partner configuration settings will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Support tickets and help resources will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddPartnerForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subscriptionPlan: 'basic',
    customDomain: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    commissionRate: 15,
    street: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Partner Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
              <Select value={formData.subscriptionPlan} onValueChange={(value) => setFormData(prev => ({ ...prev, subscriptionPlan: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - $99/month</SelectItem>
                  <SelectItem value="professional">Professional - $299/month</SelectItem>
                  <SelectItem value="enterprise">Enterprise - $599/month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="customDomain">Custom Domain (optional)</Label>
            <Input
              id="customDomain"
              value={formData.customDomain}
              onChange={(e) => setFormData(prev => ({ ...prev, customDomain: e.target.value }))}
              placeholder="e.g., partnertax.com"
            />
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-20 h-10 p-1"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="font-mono"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-20 h-10 p-1"
                />
                <Input
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <div>
            <Label htmlFor="commissionRate">Commission Rate (%)</Label>
            <Input
              id="commissionRate"
              type="number"
              min="0"
              max="100"
              value={formData.commissionRate}
              onChange={(e) => setFormData(prev => ({ ...prev, commissionRate: parseInt(e.target.value) }))}
            />
          </div>

          <div>
            <Label>Business Address</Label>
            <div className="space-y-2">
              <Input
                placeholder="Street Address"
                value={formData.street}
                onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
              />
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                />
                <Input
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                />
                <Input
                  placeholder="ZIP"
                  value={formData.zipCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Partner
        </Button>
      </div>
    </form>
  )
}
