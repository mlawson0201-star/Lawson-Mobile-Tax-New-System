
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Camera,
  Smartphone,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Bell,
  Download,
  Star,
  Zap,
  Eye,
  Users,
  MapPin
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'W-2' | '1099' | 'Receipt' | 'Bank Statement' | 'Other'
  status: 'pending' | 'processing' | 'completed' | 'needs-attention'
  uploadDate: Date
  aiConfidence: number
  extractedData: any
}

interface TaxReturn {
  id: string
  year: number
  status: 'draft' | 'review' | 'completed' | 'filed'
  progress: number
  estimatedRefund: number
  filingDeadline: Date
  preparer: {
    name: string
    photo: string
    title: string
  }
}

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'urgent'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function AdvancedClientPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'W-2_ABC_Corporation.pdf',
      type: 'W-2',
      status: 'completed',
      uploadDate: new Date(2024, 7, 15),
      aiConfidence: 98,
      extractedData: { wages: 75000, federalTax: 8250 }
    },
    {
      id: '2',
      name: 'Office_Supplies_Receipt.jpg',
      type: 'Receipt',
      status: 'processing',
      uploadDate: new Date(2024, 7, 20),
      aiConfidence: 85,
      extractedData: { amount: 247.83, vendor: 'Office Supply Store' }
    }
  ])

  const [taxReturn, setTaxReturn] = useState<TaxReturn>({
    id: 'tax-2024',
    year: 2024,
    status: 'review',
    progress: 75,
    estimatedRefund: 3247,
    filingDeadline: new Date(2025, 3, 15),
    preparer: {
      name: 'Sarah Johnson',
      photo: '/api/placeholder/40/40',
      title: 'Senior Tax Preparer, CPA'
    }
  })

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Document Processed',
      message: 'Your W-2 has been successfully processed and added to your tax return.',
      timestamp: new Date(2024, 7, 25, 10, 30),
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Additional Information Needed',
      message: 'We need clarification on your home office expenses. Please provide more details.',
      timestamp: new Date(2024, 7, 24, 14, 15),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Tax Planning Tip',
      message: 'Consider maximizing your retirement contributions before year-end to reduce tax liability.',
      timestamp: new Date(2024, 7, 23, 9, 0),
      read: true
    }
  ])

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          
          // Add new document
          const newDocument: Document = {
            id: Date.now().toString(),
            name: file.name,
            type: 'Other',
            status: 'processing',
            uploadDate: new Date(),
            aiConfidence: 0,
            extractedData: {}
          }
          
          setDocuments(prev => [...prev, newDocument])
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-yellow-500'
      case 'pending': return 'bg-blue-500'
      case 'needs-attention': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'processing': return Clock
      case 'pending': return Clock
      case 'needs-attention': return AlertTriangle
      default: return FileText
    }
  }

  const markNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
            <p className="text-slate-300">Your advanced tax portal with AI-powered insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-purple-600 text-purple-400">
              <Camera className="w-4 h-4 mr-2" />
              Mobile Scan
            </Button>
            <div className="relative">
              <Button variant="outline" size="sm" className="border-slate-600">
                <Bell className="w-4 h-4" />
              </Button>
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="tax-return" className="data-[state=active]:bg-purple-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Tax Return
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-purple-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-purple-600">
              <Calendar className="w-4 h-4 mr-2" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="mobile" className="data-[state=active]:bg-purple-600">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Estimated Refund</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${taxReturn.estimatedRefund.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Return Progress</p>
                      <p className="text-2xl font-bold text-blue-400">{taxReturn.progress}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Documents</p>
                      <p className="text-2xl font-bold text-purple-400">{documents.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">AI Confidence</p>
                      <p className="text-2xl font-bold text-yellow-400">94%</p>
                    </div>
                    <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} 
                         className={`flex items-center gap-4 p-4 rounded-lg border ${
                           notification.read ? 'border-slate-600 bg-slate-700/30' : 'border-purple-600/50 bg-purple-600/10'
                         }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        notification.type === 'success' ? 'bg-green-400' :
                        notification.type === 'warning' ? 'bg-yellow-400' :
                        notification.type === 'urgent' ? 'bg-red-400' : 'bg-blue-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{notification.title}</p>
                        <p className="text-slate-300 text-sm">{notification.message}</p>
                        <p className="text-slate-400 text-xs mt-1">
                          {notification.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markNotificationRead(notification.id)}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Document Management
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Progress */}
                {isUploading && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-purple-600/20 border border-purple-600/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Uploading and processing...</span>
                      <span className="text-purple-400">{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </motion.div>
                )}

                <div className="grid gap-4">
                  {documents.map((doc) => {
                    const StatusIcon = getStatusIcon(doc.status)
                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-600/50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(doc.status)}/20`}>
                            <StatusIcon className={`w-6 h-6 ${getStatusColor(doc.status).replace('bg-', 'text-')}`} />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-white font-medium">{doc.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                          <p className="text-slate-300 text-sm">
                            Uploaded {doc.uploadDate.toLocaleDateString()}
                          </p>
                          {doc.aiConfidence > 0 && (
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-slate-400 mr-2">AI Confidence:</span>
                              <Progress value={doc.aiConfidence} className="h-1 w-20" />
                              <span className="text-xs text-slate-400 ml-2">{doc.aiConfidence}%</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-purple-400">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-slate-400">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Return Tab */}
          <TabsContent value="tax-return" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">2024 Tax Return Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Overall Progress</span>
                        <span className="text-purple-400 font-medium">{taxReturn.progress}%</span>
                      </div>
                      <Progress value={taxReturn.progress} className="h-3" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Income Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300">W-2 Wages</span>
                            <span className="text-white">$75,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300">1099 Income</span>
                            <span className="text-white">$12,500</span>
                          </div>
                          <div className="flex justify-between text-sm border-t border-slate-600 pt-2">
                            <span className="text-white font-medium">Total Income</span>
                            <span className="text-white font-medium">$87,500</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Deductions</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300">Standard Deduction</span>
                            <span className="text-white">$13,850</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-300">Business Expenses</span>
                            <span className="text-white">$4,200</span>
                          </div>
                          <div className="flex justify-between text-sm border-t border-slate-600 pt-2">
                            <span className="text-white font-medium">Total Deductions</span>
                            <span className="text-white font-medium">$18,050</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-400 font-medium">Estimated Refund</p>
                          <p className="text-2xl font-bold text-green-400">
                            ${taxReturn.estimatedRefund.toLocaleString()}
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Your Tax Preparer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">SJ</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{taxReturn.preparer.name}</p>
                        <p className="text-slate-300 text-sm">{taxReturn.preparer.title}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Sarah
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-slate-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Important Dates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Filing Deadline</span>
                      <span className="text-white">{taxReturn.filingDeadline.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Extension Deadline</span>
                      <span className="text-white">Oct 15, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Q1 Estimated</span>
                      <span className="text-white">Jan 15, 2025</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Secure Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">SJ</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Sarah Johnson</p>
                        <p className="text-slate-400 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Hi John! I've reviewed your W-2 and business expenses. Everything looks good. 
                      I have a few questions about your home office setup. Can we schedule a quick call?
                    </p>
                    <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">
                      Reply
                    </Button>
                  </div>

                  <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">AI Assistant</p>
                        <p className="text-slate-400 text-xs">1 day ago</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm">
                      I noticed you might be eligible for the home office deduction based on your business expenses. 
                      Would you like me to calculate the potential savings?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Tax Planning & Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
                    <h4 className="text-green-400 font-medium mb-2">Optimization Opportunities</h4>
                    <ul className="space-y-2">
                      <li className="text-slate-300 text-sm flex items-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-2" />
                        Increase retirement contributions
                      </li>
                      <li className="text-slate-300 text-sm flex items-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-2" />
                        Home office deduction eligible
                      </li>
                      <li className="text-slate-300 text-sm flex items-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-2" />
                        Business expense optimization
                      </li>
                    </ul>
                    <p className="text-green-400 font-bold mt-3">Potential Savings: $2,400</p>
                  </div>

                  <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">Next Year Planning</h4>
                    <ul className="space-y-2">
                      <li className="text-slate-300 text-sm flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                        Set up quarterly payments
                      </li>
                      <li className="text-slate-300 text-sm flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                        Maximize HSA contributions
                      </li>
                      <li className="text-slate-300 text-sm flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                        Consider Roth conversion
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-4">Interactive Tax Calculator</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm mb-1 block">Additional Income</label>
                      <input 
                        type="number" 
                        className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-1 block">Extra Deductions</label>
                      <input 
                        type="number" 
                        className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Button className="mt-6 bg-purple-600 hover:bg-purple-700 w-full">
                        Calculate Impact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mobile Tab */}
          <TabsContent value="mobile" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Mobile Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                    <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-white font-medium mb-2">Smart Document Scan</h4>
                    <p className="text-slate-300 text-sm mb-4">
                      Use your phone camera to capture and instantly process tax documents with AI
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Launch Camera
                    </Button>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                    <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-white font-medium mb-2">Location-Based Receipts</h4>
                    <p className="text-slate-300 text-sm mb-4">
                      Automatically detect business expenses based on your location
                    </p>
                    <Button variant="outline" className="border-green-600 text-green-400">
                      Enable Tracking
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/50 rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <Smartphone className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="text-white font-medium">Download Mobile App</h4>
                      <p className="text-slate-300 text-sm">
                        Get the full mobile experience with offline capabilities and push notifications
                      </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
