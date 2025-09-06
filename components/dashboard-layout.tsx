
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Building2,
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  FolderOpen,
  Target,
  CheckSquare
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'CRM',
    icon: Users,
    children: [
      { name: 'Leads', href: '/leads', icon: Target },
      { name: 'Clients', href: '/clients', icon: Users },
      { name: 'Pipeline', href: '/pipeline', icon: TrendingUp }
    ]
  },
  {
    name: 'Tax Returns',
    href: '/tax-returns',
    icon: FileText
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FolderOpen
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: CheckSquare
  },
  {
    name: 'Appointments',
    href: '/appointments',
    icon: Calendar
  },
  {
    name: 'Campaigns',
    href: '/campaigns',
    icon: MessageSquare
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession() || {}

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-purple-100 transform transition-transform duration-200 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Lawson Mobile Tax</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Organization info */}
          <div className="px-6 py-4 border-b">
            <div className="text-sm font-medium text-gray-900">
              {session?.user?.organization?.name || 'Loading...'}
            </div>
            <div className="text-xs text-gray-500">
              {session?.user?.role || ''}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700">
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </div>
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'sidebar-link',
                            pathname === child.href && 'active'
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <child.icon className="h-4 w-4" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'sidebar-link',
                      pathname === item.href && 'active'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t">
            <div className="mb-3">
              <div className="text-sm font-medium text-gray-900">
                {session?.user?.name || session?.user?.email}
              </div>
              <div className="text-xs text-gray-500">
                {session?.user?.email}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">Lawson Mobile Tax</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="min-h-screen p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
