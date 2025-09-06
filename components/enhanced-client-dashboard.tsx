
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  AlertCircle,
  Heart,
  Star,
  Upload,
  MessageSquare,
  Bell,
  Calculator,
  Target,
  Award,
  Phone,
  Mail,
  Download,
  Eye,
  Shield,
  Sparkles,
  PieChart,
  BarChart3,
  CreditCard,
  History,
  BookOpen,
  Users,
  CheckSquare,
  Calendar as CalendarIcon
} from 'lucide-react'
import { ClientProfile } from '@/lib/client-personalization'

interface EnhancedClientDashboardProps {
  clientProfile: ClientProfile
}

export function EnhancedClientDashboard({ clientProfile }: EnhancedClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [refundProgress, setRefundProgress] = useState(65)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Document Received',
      message: 'Your W-2 has been successfully uploaded and processed.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning', 
      title: 'Action Required',
      message: 'Please upload your 1099-NEC for complete tax preparation.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Tax Planning Tip',
      message: 'Consider contributing to your IRA before April 15th to maximize deductions.',
      time: '3 days ago',
      read: true
    }
  ])

  const [taxReturns] = useState([
    {
      year: 2024,
      status: 'In Progress',
      progress: 75,
      estimatedRefund: '$3,247',
      filedDate: null,
      refundDate: 'Est. March 15, 2025',
      documents: ['W-2', '1099-INT', 'State Tax Document'],
      preparer: 'Jennifer Martinez, CPA'
    },
    {
      year: 2023,
      status: 'Complete',
      progress: 100,
      estimatedRefund: '$2,890',
      filedDate: 'February 28, 2024',
      refundDate: 'March 14, 2024',
      documents: ['W-2', '1099-NEC', 'Schedule C'],
      preparer: 'Jennifer Martinez, CPA'
    },
    {
      year: 2022,
      status: 'Complete',
      progress: 100,
      estimatedRefund: '$2,156',
      filedDate: 'March 10, 2023',
      refundDate: 'March 24, 2023',
      documents: ['W-2', 'Property Tax Statement'],
      preparer: 'Jennifer Martinez, CPA'
    }
  ])

  const [upcomingDeadlines] = useState([
    {
      title: 'Q1 Estimated Tax Payment',
      date: 'January 15, 2025',
      daysLeft: 25,
      amount: '$1,200',
      priority: 'high'
    },
    {
      title: '2024 Tax Filing Deadline',
      date: 'April 15, 2025',
      daysLeft: 115,
      amount: null,
      priority: 'medium'
    },
    {
      title: 'IRA Contribution Deadline',
      date: 'April 15, 2025',
      daysLeft: 115,
      amount: '$6,500 max',
      priority: 'low'
    }
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'  
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete': return 'bg-green-100 text-green-800'
      case 'in progress': return 'bg-blue-100 text-blue-800'  
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'filed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Header */}
      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                Welcome back, {clientProfile.firstName}!
              </CardTitle>
              <CardDescription className="text-white/80 text-lg mt-2">
                Your personalized tax dashboard - everything you need in one place
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-white font-bold">Premium Client</span>
              </div>
              <div className="text-white/80">Account Active Since 2022</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">$8,293</div>
              <div className="text-white/80 text-sm">Total Saved (3 Years)</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-white/80 text-sm">Tax Returns Filed</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-300" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-white/80 text-sm">Refund Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Shield className="h-6 w-6 mx-auto mb-2 text-purple-300" />
              <div className="text-2xl font-bold">Full</div>
              <div className="text-white/80 text-sm">Audit Protection</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Notifications */}
      {notifications.filter(n => !n.read).length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                You have {notifications.filter(n => !n.read).length} new notifications. 
                Most recent: "{notifications.find(n => !n.read)?.title}"
              </span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setActiveTab('notifications')}
                className="ml-4"
              >
                View All
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="tax-returns" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Returns</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
            {notifications.filter(n => !n.read).length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Current Tax Year Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                2024 Tax Return Progress
              </CardTitle>
              <CardDescription>
                Your current tax return is being prepared by Jennifer Martinez, CPA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{refundProgress}% Complete</span>
                  </div>
                  <Progress value={refundProgress} className="h-3" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Documents Received</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">8/10</div>
                    <div className="text-sm text-green-700">W-2, 1099s, Receipts</div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Processing Status</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">Review</div>
                    <div className="text-sm text-blue-700">Quality check in progress</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Estimated Refund</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">$3,247</div>
                    <div className="text-sm text-purple-700">Expected: March 15</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Eye className="mr-2 h-4 w-4" />
                    View Return Preview
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Your Preparer
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Year's Refund</p>
                    <p className="text-2xl font-bold text-green-600">$3,247</p>
                    <p className="text-xs text-green-600 mt-1">↑ 12% vs last year</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tax Savings</p>
                    <p className="text-2xl font-bold text-blue-600">$1,890</p>
                    <p className="text-xs text-blue-600 mt-1">Deductions found</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Next Deadline</p>
                    <p className="text-xl font-bold text-orange-600">25 days</p>
                    <p className="text-xs text-orange-600 mt-1">Q1 Estimated Tax</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents</p>
                    <p className="text-2xl font-bold text-purple-600">8/10</p>
                    <p className="text-xs text-purple-600 mt-1">Received</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Important Tax Deadlines
              </CardTitle>
              <CardDescription>
                Stay on top of important dates and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(deadline.priority)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{deadline.title}</h4>
                        <p className="text-sm opacity-80">
                          {deadline.date} ({deadline.daysLeft} days left)
                        </p>
                        {deadline.amount && (
                          <p className="text-sm font-medium mt-1">{deadline.amount}</p>
                        )}
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {deadline.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Returns History Tab */}
        <TabsContent value="tax-returns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-blue-600" />
                Tax Return History
              </CardTitle>
              <CardDescription>
                View and download all your tax returns and related documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxReturns.map((taxReturn, index) => (
                  <div key={index} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Tax Year {taxReturn.year}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className={getStatusColor(taxReturn.status)}>
                            {taxReturn.status}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            Prepared by: {taxReturn.preparer}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {taxReturn.estimatedRefund}
                        </div>
                        <div className="text-sm text-gray-600">
                          {taxReturn.status === 'Complete' ? 'Final Refund' : 'Estimated Refund'}
                        </div>
                      </div>
                    </div>

                    {taxReturn.status === 'In Progress' && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{taxReturn.progress}%</span>
                        </div>
                        <Progress value={taxReturn.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Filed Date:</span>
                        <div>{taxReturn.filedDate || 'In Progress'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Refund Date:</span>
                        <div>{taxReturn.refundDate}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Documents:</span>
                        <div>{taxReturn.documents.join(', ')}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {taxReturn.status === 'Complete' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download Return
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View Online
                          </Button>
                        </>
                      )}
                      {taxReturn.status === 'In Progress' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Eye className="mr-2 h-4 w-4" />
                          View Progress
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Preparer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Secure Document Upload
              </CardTitle>
              <CardDescription>
                Upload your tax documents securely. All files are encrypted and protected.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
                <Upload className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Drag & Drop Your Documents</h3>
                <p className="text-gray-600 mb-4">
                  or click to browse your files
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Upload className="mr-2 h-5 w-5" />
                  Choose Files
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Supported: PDF, JPG, PNG, DOC, DOCX (Max 25MB per file)
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Document Checklist for 2024</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { name: 'W-2 Forms', status: 'received', required: true },
                    { name: '1099-NEC Forms', status: 'needed', required: true },
                    { name: '1099-INT Forms', status: 'received', required: false },
                    { name: 'Property Tax Statement', status: 'received', required: false },
                    { name: 'Charitable Donations', status: 'needed', required: false },
                    { name: 'Business Expenses', status: 'partial', required: true }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {doc.status === 'received' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {doc.status === 'needed' && <AlertCircle className="h-5 w-5 text-red-600" />}
                        {doc.status === 'partial' && <Clock className="h-5 w-5 text-yellow-600" />}
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          {doc.required && <div className="text-xs text-red-600">Required</div>}
                        </div>
                      </div>
                      <Badge variant={doc.status === 'received' ? 'default' : 'outline'}>
                        {doc.status === 'received' ? 'Complete' : 
                         doc.status === 'partial' ? 'Partial' : 'Needed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tax Calculator */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Tax Calculator
                </CardTitle>
                <CardDescription>
                  Estimate your 2024 tax liability and refund
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-blue-600">$3,247</div>
                  <div className="text-sm text-gray-600">Estimated Refund</div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Open Calculator
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Refund Tracker */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Refund Tracker
                </CardTitle>
                <CardDescription>
                  Track your refund status with IRS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-green-600">Processing</div>
                  <div className="text-sm text-gray-600">Expected: March 15</div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Check Status
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tax Planning */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                  Tax Planning
                </CardTitle>
                <CardDescription>
                  Strategies to minimize next year's taxes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-purple-600">$1,890</div>
                  <div className="text-sm text-gray-600">Potential Savings</div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    View Strategies
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deduction Finder */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  Deduction Finder
                </CardTitle>
                <CardDescription>
                  Discover missed deduction opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-orange-600">7 Found</div>
                  <div className="text-sm text-gray-600">Potential Deductions</div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Explore Deductions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Planner */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                  Quarterly Planner
                </CardTitle>
                <CardDescription>
                  Plan estimated tax payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-cyan-600">$1,200</div>
                  <div className="text-sm text-gray-600">Next Payment Due</div>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Plan Payments
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tax Education */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-pink-600" />
                  Tax Education
                </CardTitle>
                <CardDescription>
                  Learn tax tips and strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-pink-600">12 Articles</div>
                  <div className="text-sm text-gray-600">Recommended for You</div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Secure Messages
              </CardTitle>
              <CardDescription>
                Private communication with your tax professional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Message compose */}
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-blue-800 mb-3">Send a Message</h4>
                  <textarea
                    placeholder="Ask questions about your tax return, upload status, or any tax concerns..."
                    className="w-full p-3 border rounded-md h-24"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Attach File
                      </Button>
                      <span className="text-xs text-gray-600">End-to-end encrypted</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Recent messages */}
                <div className="space-y-3">
                  {[
                    {
                      from: 'Jennifer Martinez, CPA',
                      message: 'Hi! I\'ve received your W-2 and it looks great. Still waiting on your 1099-NEC to complete the business section. Your estimated refund is looking very good!',
                      time: '2 hours ago',
                      type: 'received'
                    },
                    {
                      from: 'You',
                      message: 'Thanks! I should receive the 1099-NEC this week. What documents do I need for the home office deduction?',
                      time: '1 day ago',
                      type: 'sent'
                    },
                    {
                      from: 'Jennifer Martinez, CPA',
                      message: 'For the home office deduction, I\'ll need utility bills, rent/mortgage statements, and square footage of your office space. I can walk you through it!',
                      time: '1 day ago',
                      type: 'received'
                    }
                  ].map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      message.type === 'sent' 
                        ? 'bg-blue-100 border border-blue-200 ml-8' 
                        : 'bg-gray-100 border border-gray-200 mr-8'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-900">{message.from}</span>
                        <span className="text-xs text-gray-600">{message.time}</span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                Notifications & Alerts
              </CardTitle>
              <CardDescription>
                Stay updated on your tax return progress and important deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${
                      notification.read ? 'bg-gray-50 opacity-75' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {notification.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                          {notification.type === 'info' && <Bell className="h-5 w-5 text-blue-600" />}
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          {!notification.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                        </div>
                        <p className="text-gray-700 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setNotifications(prev => 
                              prev.map(n => n.id === notification.id ? {...n, read: true} : n)
                            )
                          }}
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
