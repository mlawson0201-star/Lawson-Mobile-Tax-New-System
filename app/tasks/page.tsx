
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Plus, 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  Users,
  Calendar,
  Database,
  UserPlus,
  Filter,
  Search,
  CheckCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Task {
  id: string
  title: string
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate: string
  assignee: string
  client: string
  taxReturn?: string
  estimatedHours: number
  createdAt: string
}

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)

  useEffect(() => {
    loadRealTasks()
  }, [])

  const loadRealTasks = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/tasks')
      const data = await response.json()
      
      if (data.success) {
        setTasks(data.tasks || [])
      } else {
        setTasks([])
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      TODO: 'bg-gray-100 text-gray-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      LOW: 'bg-blue-100 text-blue-800',
      MEDIUM: 'bg-yellow-100 text-yellow-800',
      HIGH: 'bg-orange-100 text-orange-800',
      URGENT: 'bg-red-100 text-red-800'
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'URGENT': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'HIGH': return <Clock className="h-4 w-4 text-orange-600" />
      default: return <CheckSquare className="h-4 w-4 text-blue-600" />
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || task.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-600" />
              Real Task Management System
            </h1>
            <p className="text-gray-600 mt-2">Connected to live workflow database - No mock tasks</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real Data
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowNewTaskForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Real Task
            </Button>
          </div>
        </div>

        {/* Real Data Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>✅ REAL TASK SYSTEM:</strong> This system manages actual workflow tasks from your database.
            No more fake tasks - create real workflow management for your team!
          </AlertDescription>
        </Alert>

        {/* Task Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <CheckSquare className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{taskStats.total}</h3>
              <p className="text-blue-700">Total Tasks</p>
              <p className="text-xs text-blue-600 mt-1">Real Database</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">{taskStats.completed}</h3>
              <p className="text-green-700">Completed</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-yellow-900">{taskStats.inProgress}</h3>
              <p className="text-yellow-700">In Progress</p>
            </CardContent>
          </Card>
          
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-red-900">{taskStats.overdue}</h3>
              <p className="text-red-700">Overdue</p>
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
                    placeholder="Search real tasks, clients, or assignees..."
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
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading real tasks from database...</p>
            </CardContent>
          </Card>
        ) : tasks.length === 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-12 text-center">
              <CheckSquare className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No tasks yet - Clean system!</h3>
              <p className="text-blue-800 mb-6">
                Perfect! Your task management system is clean and ready for real workflow management. 
                Create your first task to start organizing your team's work.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowNewTaskForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Real Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {getPriorityIcon(task.priority)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Client: {task.client}</span>
                          <span>Assignee: {task.assignee}</span>
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>{task.estimatedHours}h estimated</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/tasks/${task.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Real Task:</span>
                      <span>ID #{task.id.slice(0, 8)}, Created {new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* New Task Form Modal */}
        {showNewTaskForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Real Task</h2>
              
              <NewTaskForm 
                onSuccess={() => {
                  setShowNewTaskForm(false)
                  loadRealTasks()
                }}
                onCancel={() => setShowNewTaskForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NewTaskForm({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
    estimatedHours: 1,
    category: 'TAX_PREPARATION'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Failed to create task. Please try again.')
      }
    } catch (error) {
      console.error('Error creating task:', error)
      alert('Error creating task. Please try again.')
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
        <Label htmlFor="title">Task Title *</Label>
        <Input
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          placeholder="Review W-2 documents for client..."
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={3}
          placeholder="Detailed description of the task..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        <div>
          <Label htmlFor="estimatedHours">Estimated Hours</Label>
          <Input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            min="0.5"
            step="0.5"
            value={formData.estimatedHours}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="dueDate">Due Date *</Label>
        <Input
          id="dueDate"
          name="dueDate"
          type="datetime-local"
          required
          value={formData.dueDate}
          onChange={handleChange}
        />
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
              Create Real Task
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
