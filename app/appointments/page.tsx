
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { 
  Calendar,
  Clock,
  Users,
  Video,
  MapPin,
  Phone,
  Plus,
  Database,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: string
  title: string
  description?: string
  scheduledAt: string
  duration: number
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  type: 'CONSULTATION' | 'REVIEW' | 'DOCUMENT_SIGNING' | 'FOLLOW_UP'
  client: string
  clientEmail?: string
  clientPhone?: string
  assignedTo: string
  location: string
  notes?: string
  createdAt: string
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')

  useEffect(() => {
    loadRealAppointments()
  }, [])

  const loadRealAppointments = async () => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams()
      if (filterStatus !== 'all') params.append('status', filterStatus)
      if (filterDate) {
        params.append('startDate', filterDate)
        params.append('endDate', filterDate)
      }
      
      const response = await fetch(`/api/appointments?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setAppointments(data.appointments || [])
      } else {
        setAppointments([])
      }
    } catch (error) {
      console.error('Error loading appointments:', error)
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      SCHEDULED: 'bg-blue-100 text-blue-800',
      CONFIRMED: 'bg-green-100 text-green-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || colors.SCHEDULED
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CONSULTATION': return <Video className="h-4 w-4" />
      case 'REVIEW': return <CheckCircle className="h-4 w-4" />
      case 'DOCUMENT_SIGNING': return <Users className="h-4 w-4" />
      case 'FOLLOW_UP': return <Phone className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || appointment.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const appointmentStats = {
    total: appointments.length,
    today: appointments.filter(apt => 
      new Date(apt.scheduledAt).toDateString() === new Date().toDateString()
    ).length,
    upcoming: appointments.filter(apt => 
      new Date(apt.scheduledAt) > new Date() && apt.status === 'SCHEDULED'
    ).length,
    completed: appointments.filter(apt => apt.status === 'COMPLETED').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-600" />
              Real Appointment System
            </h1>
            <p className="text-gray-600 mt-2">Connected to live appointment database - No mock appointments</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real Data
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/appointments/new')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Real Appointment
            </Button>
          </div>
        </div>

        {/* Real Data Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>✅ REAL APPOINTMENT SYSTEM:</strong> This system manages actual client appointments from your database.
            Confirmations sent via real email and SMS. No more fake appointments!
          </AlertDescription>
        </Alert>

        {/* Appointment Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{appointmentStats.total}</h3>
              <p className="text-blue-700">Total Appointments</p>
              <p className="text-xs text-blue-600 mt-1">Real Database</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">{appointmentStats.today}</h3>
              <p className="text-green-700">Today</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-900">{appointmentStats.upcoming}</h3>
              <p className="text-purple-700">Upcoming</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-yellow-900">{appointmentStats.completed}</h3>
              <p className="text-yellow-700">Completed</p>
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
                    placeholder="Search real appointments, clients, or staff..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-auto"
                />
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading real appointments from database...</p>
            </CardContent>
          </Card>
        ) : appointments.length === 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No appointments yet - Clean system!</h3>
              <p className="text-blue-800 mb-6">
                Perfect! Your appointment system is clean and ready for real client bookings. 
                Schedule your first appointment to start managing your calendar.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/appointments/new')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Your First Real Appointment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {getTypeIcon(appointment.type)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {appointment.description || 'No description'}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(appointment.scheduledAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(appointment.scheduledAt).toLocaleTimeString()}
                          </span>
                          <span>{appointment.duration} minutes</span>
                          <span>Client: {appointment.client}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline">
                            {appointment.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/appointments/${appointment.id}`)}
                        >
                          View Details
                        </Button>
                        {appointment.clientEmail && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `mailto:${appointment.clientEmail}`}
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
                      <span className="font-medium">Real Appointment:</span>
                      <span>ID #{appointment.id.slice(0, 8)}, Scheduled for {new Date(appointment.scheduledAt).toLocaleDateString()}</span>
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
