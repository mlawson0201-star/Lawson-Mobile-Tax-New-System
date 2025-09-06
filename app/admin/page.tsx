
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  Settings, 
  Database, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  DollarSign,
  Target,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'

interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  services: string[]
  totalSpent: number
  lastService?: string
  createdAt: string
  updatedAt: string
}

interface Preparer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  certification?: string
  specialties: string[]
  status: 'ACTIVE' | 'TRAINING' | 'INACTIVE'
  clientsAssigned: number
  completedReturns: number
  rating: number
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [clients, setClients] = useState<Client[]>([])
  const [preparers, setPreparers] = useState<Preparer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddingClient, setIsAddingClient] = useState(false)
  const [isAddingPreparer, setIsAddingPreparer] = useState(false)
  const [newClient, setNewClient] = useState<Partial<Client>>({})
  const [newPreparer, setNewPreparer] = useState<Partial<Preparer>>({})

  // Load data from localStorage for demo purposes
  useEffect(() => {
    const savedClients = localStorage.getItem('lmt-clients')
    const savedPreparers = localStorage.getItem('lmt-preparers')
    
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    } else {
      // Initialize with sample data
      const sampleClients: Client[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '(555) 123-4567',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          status: 'ACTIVE',
          services: ['Individual Tax Return', 'Tax Planning'],
          totalSpent: 599,
          lastService: '2024-03-15',
          createdAt: '2024-01-15',
          updatedAt: '2024-03-15'
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@email.com',
          phone: '(555) 987-6543',
          address: '456 Oak Ave',
          city: 'Downtown',
          state: 'NY',
          zip: '67890',
          status: 'ACTIVE',
          services: ['Business Tax Return'],
          totalSpent: 1299,
          lastService: '2024-04-01',
          createdAt: '2024-02-01',
          updatedAt: '2024-04-01'
        }
      ]
      setClients(sampleClients)
      localStorage.setItem('lmt-clients', JSON.stringify(sampleClients))
    }

    if (savedPreparers) {
      setPreparers(JSON.parse(savedPreparers))
    } else {
      // Initialize with sample data
      const samplePreparers: Preparer[] = [
        {
          id: '1',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@lmt.com',
          phone: '(555) 234-5678',
          certification: 'EA',
          specialties: ['Individual Returns', 'Small Business'],
          status: 'ACTIVE',
          clientsAssigned: 45,
          completedReturns: 234,
          rating: 4.9,
          createdAt: '2023-06-01',
          updatedAt: '2024-04-15'
        },
        {
          id: '2',
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.b@lmt.com',
          phone: '(555) 345-6789',
          certification: 'CPA',
          specialties: ['Business Tax', 'Complex Returns'],
          status: 'ACTIVE',
          clientsAssigned: 38,
          completedReturns: 189,
          rating: 4.8,
          createdAt: '2023-08-15',
          updatedAt: '2024-04-10'
        }
      ]
      setPreparers(samplePreparers)
      localStorage.setItem('lmt-preparers', JSON.stringify(samplePreparers))
    }

    setIsLoading(false)
  }, [])

  const addClient = () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      toast.error('Please fill in all required fields')
      return
    }

    const client: Client = {
      id: Date.now().toString(),
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      email: newClient.email,
      phone: newClient.phone || '',
      address: newClient.address || '',
      city: newClient.city || '',
      state: newClient.state || '',
      zip: newClient.zip || '',
      status: 'ACTIVE',
      services: [],
      totalSpent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedClients = [...clients, client]
    setClients(updatedClients)
    localStorage.setItem('lmt-clients', JSON.stringify(updatedClients))
    setNewClient({})
    setIsAddingClient(false)
    toast.success('Client added successfully!')
  }

  const addPreparer = () => {
    if (!newPreparer.firstName || !newPreparer.lastName || !newPreparer.email) {
      toast.error('Please fill in all required fields')
      return
    }

    const preparer: Preparer = {
      id: Date.now().toString(),
      firstName: newPreparer.firstName,
      lastName: newPreparer.lastName,
      email: newPreparer.email,
      phone: newPreparer.phone || '',
      certification: newPreparer.certification || '',
      specialties: newPreparer.specialties || [],
      status: 'TRAINING',
      clientsAssigned: 0,
      completedReturns: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedPreparers = [...preparers, preparer]
    setPreparers(updatedPreparers)
    localStorage.setItem('lmt-preparers', JSON.stringify(updatedPreparers))
    setNewPreparer({})
    setIsAddingPreparer(false)
    toast.success('Preparer added successfully!')
  }

  const deleteClient = (id: string) => {
    const updatedClients = clients.filter(c => c.id !== id)
    setClients(updatedClients)
    localStorage.setItem('lmt-clients', JSON.stringify(updatedClients))
    toast.success('Client deleted successfully!')
  }

  const deletePreparer = (id: string) => {
    const updatedPreparers = preparers.filter(p => p.id !== id)
    setPreparers(updatedPreparers)
    localStorage.setItem('lmt-preparers', JSON.stringify(updatedPreparers))
    toast.success('Preparer deleted successfully!')
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredPreparers = preparers.filter(preparer => {
    const matchesSearch = 
      preparer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      preparer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      preparer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || preparer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') return <div>Access denied</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lmt-avatar.jpg" 
              alt="LMT Admin" 
              className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                LMT Admin Dashboard
              </h1>
              <p className="text-gray-700 text-lg">Complete system management and oversight</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <div className="text-3xl font-bold">{clients.length}</div>
              <p className="text-purple-100">Total Clients</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <div className="text-3xl font-bold">{preparers.length}</div>
              <p className="text-orange-100">Tax Preparers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <div className="text-3xl font-bold">
                ${clients.reduce((sum, client) => sum + client.totalSpent, 0).toLocaleString()}
              </div>
              <p className="text-green-100">Total Revenue</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-purple-700" />
              <div className="text-3xl font-bold">
                {preparers.reduce((sum, preparer) => sum + preparer.completedReturns, 0)}
              </div>
              <p className="text-yellow-100">Returns Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clients">Client Management</TabsTrigger>
            <TabsTrigger value="preparers">Preparer Management</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Client Management
                  </CardTitle>
                  <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-orange-500">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Client
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>First Name *</Label>
                            <Input
                              value={newClient.firstName || ''}
                              onChange={(e) => setNewClient({...newClient, firstName: e.target.value})}
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <Label>Last Name *</Label>
                            <Input
                              value={newClient.lastName || ''}
                              onChange={(e) => setNewClient({...newClient, lastName: e.target.value})}
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            value={newClient.email || ''}
                            onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={newClient.phone || ''}
                            onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input
                            value={newClient.address || ''}
                            onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>City</Label>
                            <Input
                              value={newClient.city || ''}
                              onChange={(e) => setNewClient({...newClient, city: e.target.value})}
                              placeholder="Anytown"
                            />
                          </div>
                          <div>
                            <Label>State</Label>
                            <Input
                              value={newClient.state || ''}
                              onChange={(e) => setNewClient({...newClient, state: e.target.value})}
                              placeholder="CA"
                            />
                          </div>
                          <div>
                            <Label>ZIP</Label>
                            <Input
                              value={newClient.zip || ''}
                              onChange={(e) => setNewClient({...newClient, zip: e.target.value})}
                              placeholder="12345"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button onClick={addClient} className="flex-1">Add Client</Button>
                          <Button variant="outline" onClick={() => setIsAddingClient(false)}>Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clients List */}
                <div className="space-y-4">
                  {filteredClients.map((client) => (
                    <Card key={client.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {client.firstName} {client.lastName}
                              </h3>
                              <p className="text-gray-600">{client.email}</p>
                              <p className="text-sm text-gray-500">
                                {client.city}, {client.state} {client.zip}
                              </p>
                            </div>
                            <Badge className={
                              client.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                              client.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {client.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">${client.totalSpent}</div>
                          <p className="text-sm text-gray-500">Total Spent</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deleteClient(client.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparers Tab */}
          <TabsContent value="preparers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    Tax Preparer Management
                  </CardTitle>
                  <Dialog open={isAddingPreparer} onOpenChange={setIsAddingPreparer}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-orange-500">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Preparer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Tax Preparer</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>First Name *</Label>
                            <Input
                              value={newPreparer.firstName || ''}
                              onChange={(e) => setNewPreparer({...newPreparer, firstName: e.target.value})}
                              placeholder="Sarah"
                            />
                          </div>
                          <div>
                            <Label>Last Name *</Label>
                            <Input
                              value={newPreparer.lastName || ''}
                              onChange={(e) => setNewPreparer({...newPreparer, lastName: e.target.value})}
                              placeholder="Johnson"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            value={newPreparer.email || ''}
                            onChange={(e) => setNewPreparer({...newPreparer, email: e.target.value})}
                            placeholder="sarah.j@lmt.com"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={newPreparer.phone || ''}
                            onChange={(e) => setNewPreparer({...newPreparer, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label>Certification</Label>
                          <Select 
                            value={newPreparer.certification || ''} 
                            onValueChange={(value) => setNewPreparer({...newPreparer, certification: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select certification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CPA">CPA (Certified Public Accountant)</SelectItem>
                              <SelectItem value="EA">EA (Enrolled Agent)</SelectItem>
                              <SelectItem value="CTEC">CTEC (California Tax Education Council)</SelectItem>
                              <SelectItem value="AFSP">AFSP (Annual Filing Season Program)</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-4">
                          <Button onClick={addPreparer} className="flex-1">Add Preparer</Button>
                          <Button variant="outline" onClick={() => setIsAddingPreparer(false)}>Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search preparers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="TRAINING">In Training</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preparers List */}
                <div className="space-y-4">
                  {filteredPreparers.map((preparer) => (
                    <Card key={preparer.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {preparer.firstName} {preparer.lastName}
                              </h3>
                              <p className="text-gray-600">{preparer.email}</p>
                              <p className="text-sm text-gray-500">
                                {preparer.certification && `${preparer.certification} • `}
                                {preparer.specialties.join(', ')}
                              </p>
                            </div>
                            <Badge className={
                              preparer.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                              preparer.status === 'TRAINING' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {preparer.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">{preparer.completedReturns} Returns</div>
                          <p className="text-sm text-gray-500">{preparer.clientsAssigned} Clients</p>
                          <p className="text-sm text-gray-500">★ {preparer.rating.toFixed(1)}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deletePreparer(preparer.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  System Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Data Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Data
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Data
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Database className="h-4 w-4 mr-2" />
                        Backup Database
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Database Status</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Server Status</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Training System</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>CRM System</span>
                        <Badge className="bg-green-100 text-green-800">Running</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-sm">View Reports</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <Users className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-sm">Bulk Actions</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <Settings className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-sm">System Config</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <Database className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-sm">Maintenance</span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
