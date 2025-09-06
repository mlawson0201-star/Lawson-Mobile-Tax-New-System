
// Phase 3: Multi-Location Management Component
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
  MapPin, 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Phone,
  Mail,
  Clock,
  Star,
  Plus,
  Settings,
  BarChart3,
  Target,
  Award,
  Briefcase,
  UserCheck,
  Globe,
  Navigation,
  Handshake
} from 'lucide-react'

interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  manager: string
  status: 'active' | 'inactive' | 'pending'
  type: 'corporate' | 'franchise' | 'partner'
  openDate: string
  employees: number
  clients: number
  monthlyRevenue: number
  performanceScore: number
  services: string[]
}

export default function MultiLocationManager() {
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedType, setSelectedType] = useState('all')
  const [metrics, setMetrics] = useState<any>(null)
  const [isAddingLocation, setIsAddingLocation] = useState(false)

  useEffect(() => {
    fetchLocations()
    fetchMetrics()
  }, [selectedType])

  const fetchLocations = async () => {
    try {
      const url = selectedType === 'all' ? 
        '/api/phase3/multi-location' : 
        `/api/phase3/multi-location?type=${selectedType}`
      
      const response = await fetch(url)
      const data = await response.json()
      setLocations(data.locations)
    } catch (error) {
      console.error('Failed to fetch locations:', error)
    }
  }

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/phase3/multi-location?action=metrics')
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    }
  }

  const addNewLocation = async () => {
    setIsAddingLocation(true)
    
    try {
      const response = await fetch('/api/phase3/multi-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-location',
          locationData: {
            name: 'New Location',
            address: '123 Business Ave',
            city: 'Atlanta',
            state: 'GA',
            zip: '30309',
            phone: '(555) 123-4567',
            email: 'newlocation@lmttax.com',
            manager: 'TBD',
            type: 'corporate',
            employees: 0,
            services: ['Individual Tax', 'Business Tax']
          }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('New location added successfully!')
        fetchLocations()
      }
    } catch (error) {
      toast.error('Failed to add location')
    } finally {
      setIsAddingLocation(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'corporate': return <Building2 className="h-4 w-4 text-blue-500" />
      case 'franchise': return <Handshake className="h-4 w-4 text-purple-500" />
      case 'partner': return <Globe className="h-4 w-4 text-green-500" />
      default: return <Building2 className="h-4 w-4 text-gray-500" />
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-600'
    if (score >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white">
            <MapPin className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Multi-Location Management
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Centralized management for corporate offices, franchises, and partner locations. 
          Scale your tax practice with enterprise-grade location management.
        </p>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{metrics.overview.totalLocations}</div>
              <div className="text-sm text-gray-600">Total Locations</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{metrics.overview.totalEmployees}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{metrics.overview.totalClients.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Clients</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">${(metrics.overview.totalMonthlyRevenue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="corporate">Corporate Owned</SelectItem>
              <SelectItem value="franchise">Franchises</SelectItem>
              <SelectItem value="partner">Partners</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={addNewLocation}
            disabled={isAddingLocation}
            className="bg-gradient-to-r from-purple-500 to-blue-600"
          >
            {isAddingLocation ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Adding...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Location
              </div>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Location Management Tabs */}
      <Tabs defaultValue="locations" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="franchise">Franchise Ops</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(location.type)}
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(location.status)}>
                      {location.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {location.address}, {location.city}, {location.state} {location.zip}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Manager:</span>
                      <span className="font-medium">{location.manager}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Employees</div>
                        <div className="font-bold">{location.employees}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Clients</div>
                        <div className="font-bold">{location.clients}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Monthly Revenue:</span>
                      <span className="font-bold text-green-600">
                        ${(location.monthlyRevenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Performance:</span>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${getPerformanceColor(location.performanceScore)}`} />
                        <span className={`font-bold ${getPerformanceColor(location.performanceScore)}`}>
                          {location.performanceScore.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
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
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Award className="h-5 w-5" />
                    Top Performer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-bold">LMT Tax - Buckhead</div>
                    <div className="text-sm text-gray-600">Performance Score: 97.8%</div>
                    <div className="text-sm text-gray-600">Monthly Revenue: $125K</div>
                    <Badge className="bg-green-100 text-green-800">Exceeding Targets</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <BarChart3 className="h-5 w-5" />
                    Average Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">93.8%</div>
                    <div className="text-sm text-gray-600">Across all locations</div>
                    <div className="text-sm text-green-600">+5.2% vs last quarter</div>
                    <Badge className="bg-blue-100 text-blue-800">Above Industry</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <TrendingUp className="h-5 w-5" />
                    Growth Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">28.7%</div>
                    <div className="text-sm text-gray-600">Year-over-year growth</div>
                    <div className="text-sm text-gray-600">2 new locations this year</div>
                    <Badge className="bg-purple-100 text-purple-800">Expanding</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Individual Location Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Location Performance Details</CardTitle>
                <CardDescription>
                  Detailed performance metrics for each location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getTypeIcon(location.type)}
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-gray-600">{location.city}, {location.state}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Revenue</div>
                          <div className="font-bold">${(location.monthlyRevenue / 1000).toFixed(0)}K</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Clients</div>
                          <div className="font-bold">{location.clients}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Performance</div>
                          <div className={`font-bold ${getPerformanceColor(location.performanceScore)}`}>
                            {location.performanceScore.toFixed(1)}%
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="franchise">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-purple-500" />
                  Franchise Development
                </CardTitle>
                <CardDescription>
                  Expand your tax practice through franchising
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Available Territories</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium">North Atlanta</div>
                        <div className="text-sm text-gray-600">High-density area, low competition</div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                          <span className="text-sm font-medium">ROI: 18-25%</span>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium">Sandy Springs</div>
                        <div className="text-sm text-gray-600">Premium market, established demand</div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
                          <span className="text-sm font-medium">ROI: 20-28%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Franchise Support</h4>
                    <div className="space-y-2">
                      {[
                        'Complete 6-week training program',
                        'Marketing materials and campaigns',
                        'Technology platform access',
                        'Ongoing operational support',
                        'Territory protection guarantee',
                        'Brand guidelines and standards'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Apply for Franchise
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
