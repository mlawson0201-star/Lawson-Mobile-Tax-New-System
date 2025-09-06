
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  UserPlus, 
  FileText, 
  Calendar, 
  MessageSquare,
  Target,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: 'Add New Lead',
      description: 'Capture a new potential client',
      icon: Target,
      href: '/leads/new',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600'
    },
    {
      title: 'Convert to Client',
      description: 'Convert qualified leads',
      icon: UserPlus,
      href: '/clients/new',
      color: 'bg-green-50 hover:bg-green-100 text-green-600'
    },
    {
      title: 'Create Tax Return',
      description: 'Start a new tax preparation',
      icon: FileText,
      href: '/tax-returns/new',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-600'
    },
    {
      title: 'Schedule Meeting',
      description: 'Book client appointment',
      icon: Calendar,
      href: '/appointments/new',
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-600'
    },
    {
      title: 'Send Campaign',
      description: 'Email or SMS campaign',
      icon: MessageSquare,
      href: '/campaigns/new',
      color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks to streamline your workflow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button
              variant="ghost"
              className={`w-full justify-start h-auto p-4 ${action.color}`}
            >
              <div className="flex items-center gap-3">
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-70">{action.description}</div>
                </div>
              </div>
            </Button>
          </Link>
        ))}
        
        <div className="pt-4 border-t">
          <Link href="/ai-assistant">
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
