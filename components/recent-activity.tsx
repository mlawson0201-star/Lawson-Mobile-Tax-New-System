
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'
import { 
  Target, 
  Users, 
  FileText, 
  Calendar,
  MessageSquare,
  CheckCircle
} from 'lucide-react'

// Mock data - replace with real data from API
const activities = [
  {
    id: '1',
    type: 'lead_created',
    description: 'New lead Sarah Johnson added to pipeline',
    user: 'John Doe',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: Target,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: '2',
    type: 'client_converted',
    description: 'Lead Mark Wilson converted to client',
    user: 'Jane Smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: Users,
    color: 'bg-green-100 text-green-800'
  },
  {
    id: '3',
    type: 'tax_return_completed',
    description: 'Tax return for ABC Corp completed',
    user: 'Mike Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    icon: CheckCircle,
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: '4',
    type: 'appointment_scheduled',
    description: 'Meeting scheduled with Lisa Brown',
    user: 'Sarah Davis',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    icon: Calendar,
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: '5',
    type: 'campaign_sent',
    description: 'Email campaign "Tax Season Updates" sent to 150 contacts',
    user: 'System',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-800'
  }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates across your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>by {activity.user}</span>
                  <span>•</span>
                  <span>{formatDateTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
