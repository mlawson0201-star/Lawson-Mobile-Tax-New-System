
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  PlayCircle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'

interface TrainingLayoutProps {
  children: React.ReactNode
}

export default function TrainingLayout({ children }: TrainingLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [studentProgress, setStudentProgress] = useState({
    overallProgress: 0,
    currentModule: 1,
    completedLessons: 0,
    totalLessons: 64,
    certificatesEarned: 0
  })

  // Mock enrollment check - in real app, check database
  const isEnrolledStudent = session?.user?.email // Simplified check

  if (!isEnrolledStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8">
          <GraduationCap className="h-24 w-24 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Restricted</h1>
          <p className="text-lg text-gray-600 mb-8">
            You need to be enrolled in the training program to access this content.
          </p>
          <div className="space-x-4">
            <Link href="/preparer/application">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Enroll Now - $499
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/training/dashboard',
      icon: Home,
      current: pathname === '/training/dashboard'
    },
    {
      title: 'Module 1: Tax Law Fundamentals', 
      href: '/training/modules/1',
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/1'),
      progress: 100
    },
    {
      title: 'Module 2: Individual Returns',
      href: '/training/modules/2', 
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/2'),
      progress: 45
    },
    {
      title: 'Module 3: Business Returns',
      href: '/training/modules/3',
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/3'),
      progress: 0
    },
    {
      title: 'Module 4: Deductions & Credits',
      href: '/training/modules/4',
      icon: BookOpen, 
      current: pathname.startsWith('/training/modules/4'),
      progress: 0
    },
    {
      title: 'Module 5: Tax Software',
      href: '/training/modules/5',
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/5'),
      progress: 0
    },
    {
      title: 'Module 6: Client Communication',
      href: '/training/modules/6',
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/6'),
      progress: 0
    },
    {
      title: 'Module 7: Ethics & PTIN',
      href: '/training/modules/7',
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/7'),
      progress: 0
    },
    {
      title: 'Module 8: Practice Management',
      href: '/training/modules/8',
      icon: BookOpen,
      current: pathname.startsWith('/training/modules/8'),
      progress: 0
    },
    {
      title: 'Certificates',
      href: '/training/certificates',
      icon: Award,
      current: pathname === '/training/certificates'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Tax Prep Training</h1>
                <p className="text-sm text-gray-500">Student Portal</p>
              </div>
            </div>
            <Button
              variant="ghost" 
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Overview */}
          <div className="p-6 border-b border-gray-200">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Overall Progress</span>
                  <span>{studentProgress.overallProgress}%</span>
                </div>
                <Progress value={studentProgress.overallProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{studentProgress.completedLessons}</div>
                  <div className="text-xs text-blue-500">Lessons Complete</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{studentProgress.certificatesEarned}</div>
                  <div className="text-xs text-green-500">Certificates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.current
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="flex-1 truncate">{item.title}</span>
                    {typeof item.progress === 'number' && (
                      <div className="flex items-center gap-2">
                        {item.progress === 100 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : item.progress > 0 ? (
                          <div className="w-12 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        ) : (
                          <div className="w-3 h-3 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || 'Student'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Training Portal</h1>
          <div /> {/* Spacer */}
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
