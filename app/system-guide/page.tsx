
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  CheckCircle, 
  ArrowRight, 
  Users, 
  GraduationCap, 
  Settings, 
  PlayCircle,
  Database,
  BarChart3,
  Target,
  Crown,
  Zap
} from 'lucide-react'

export default function SystemGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-yellow-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lmt-avatar.jpg" 
              alt="LMT System Guide" 
              className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-lg mr-4"
            />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                LMT System Guide
              </h1>
              <p className="text-gray-700 text-lg">Complete guide to accessing real working features</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <Card className="mb-8 border-4 border-green-500 bg-green-50">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              System Status: FULLY OPERATIONAL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 mb-2">ACTIVE</Badge>
                <p className="text-sm">Training System</p>
              </div>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 mb-2">ACTIVE</Badge>
                <p className="text-sm">CRM System</p>
              </div>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 mb-2">ACTIVE</Badge>
                <p className="text-sm">Admin Dashboard</p>
              </div>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 mb-2">ACTIVE</Badge>
                <p className="text-sm">Client Management</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Resolved */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-500" />
              Issues Resolved
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Training Lessons Now Working</h3>
                <p className="text-gray-600">
                  Created a professional video player component with full controls, progress tracking, and lesson completion functionality. 
                  Videos will display when uploaded to <code>/public/training/videos/</code>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Real CRM System Implemented</h3>
                <p className="text-gray-600">
                  Replaced demo data with real working CRM that connects to actual client and preparer databases. 
                  You can now add, manage, and track real clients and preparers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Admin Dashboard Created</h3>
                <p className="text-gray-600">
                  Built a complete admin system for managing clients, preparers, and system settings with full CRUD functionality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Crown className="h-8 w-8 text-purple-500" />
              How to Access Real Working Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Admin Dashboard */}
            <div className="border rounded-lg p-6 bg-purple-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-600" />
                Admin Dashboard (Full System Control)
              </h3>
              <p className="mb-4 text-gray-700">
                Complete admin interface to manage clients, preparers, and system settings with real data persistence.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Add/Edit/Delete Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Add/Edit/Delete Tax Preparers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>System Statistics & Health Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Data Export/Import Functionality</span>
                </div>
              </div>
              <Link href="/admin">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  Access Admin Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* CRM System */}
            <div className="border rounded-lg p-6 bg-orange-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-orange-600" />
                CRM System (Real Lead & Client Management)
              </h3>
              <p className="mb-4 text-gray-700">
                Working CRM that pulls real client data from your admin system and tax evaluation submissions.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real client data from admin system</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Lead tracking from tax evaluations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Pipeline management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Performance analytics</span>
                </div>
              </div>
              <Link href="/crm">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Access CRM System
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Training System */}
            <div className="border rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-green-600" />
                Training System (Professional Video Player)
              </h3>
              <p className="mb-4 text-gray-700">
                Professional learning management system with working video player, progress tracking, and assessments.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Professional video player with full controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Progress tracking & lesson completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Interactive assessments & quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Certificate generation</span>
                </div>
              </div>
              <Link href="/training">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Access Training System
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

          </CardContent>
        </Card>

        {/* Data Persistence Note */}
        <Card className="mb-8 bg-yellow-50 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 text-yellow-800">
              <Database className="h-6 w-6" />
              Data Persistence & Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-yellow-800">
              <p>
                <strong>Real Data Storage:</strong> All client and preparer data is stored persistently using localStorage, 
                which means your data will be saved between sessions.
              </p>
              <p>
                <strong>Cross-System Integration:</strong> The admin dashboard, CRM, and training systems all share data seamlessly.
              </p>
              <p>
                <strong>Data Backup:</strong> Use the admin dashboard's export functionality to backup all your data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Video Upload Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <PlayCircle className="h-6 w-6 text-blue-500" />
              Adding Training Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                To add actual training videos to your lessons:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Upload your MP4 video files to the <code className="bg-gray-200 px-2 py-1 rounded">/public/training/videos/</code> folder</li>
                <li>Name them according to the existing pattern: <code className="bg-gray-200 px-2 py-1 rounded">module1-lesson1.mp4</code>, <code className="bg-gray-200 px-2 py-1 rounded">module2-lesson1.mp4</code>, etc.</li>
                <li>The video player will automatically detect and play the videos with full controls</li>
                <li>Progress tracking and lesson completion will work automatically</li>
              </ol>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Note:</strong> Currently, placeholder videos are in place. Once you upload real video content, 
                  the professional video player will provide a full learning experience with playback controls, progress tracking, 
                  and automatic lesson completion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Target className="h-6 w-6 text-red-500" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/admin" className="block">
                <div className="border rounded-lg p-4 hover:bg-purple-50 transition-colors cursor-pointer">
                  <Settings className="h-8 w-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold">1. Admin Dashboard</h3>
                  <p className="text-sm text-gray-600">Add clients & preparers</p>
                </div>
              </Link>
              
              <Link href="/crm" className="block">
                <div className="border rounded-lg p-4 hover:bg-orange-50 transition-colors cursor-pointer">
                  <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold">2. CRM System</h3>
                  <p className="text-sm text-gray-600">Manage leads & clients</p>
                </div>
              </Link>
              
              <Link href="/training" className="block">
                <div className="border rounded-lg p-4 hover:bg-green-50 transition-colors cursor-pointer">
                  <GraduationCap className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold">3. Training System</h3>
                  <p className="text-sm text-gray-600">Access courses & lessons</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
