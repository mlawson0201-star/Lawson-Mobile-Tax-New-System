
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  MessageSquare, 
  Phone, 
  Video,
  Mail,
  Bell,
  Send,
  Paperclip,
  Calendar,
  Clock,
  Shield,
  Star,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Headphones,
  MessageCircle
} from 'lucide-react'

export function ClientCommunicationHub() {
  const [activeTab, setActiveTab] = useState('messages')
  const [newMessage, setNewMessage] = useState('')
  const [messages] = useState([
    {
      id: 1,
      type: 'received',
      from: 'Jennifer Martinez, CPA',
      fromTitle: 'Your Tax Professional',
      message: `Hi! Great news - I've completed your tax return and found some excellent deductions you weren't aware of! 

Your estimated refund is $3,247 (up from our initial estimate of $2,890). Here's what made the difference:

• Home office deduction: $1,200
• Business mileage: $890  
• Professional development: $450

I need you to review and approve the return before filing. Would you like to schedule a quick 15-minute call to go over everything?`,
      timestamp: '2 hours ago',
      priority: 'high',
      attachments: ['2024_Tax_Return_Preview.pdf'],
      read: false
    },
    {
      id: 2,
      type: 'sent',
      from: 'You',
      message: `That's fantastic news! Yes, I'd love to schedule a call. I'm available tomorrow between 2-4 PM or Thursday morning. 

Quick question about the home office deduction - does this include the basement office I mentioned?`,
      timestamp: '1 day ago',
      priority: 'normal',
      attachments: [],
      read: true
    },
    {
      id: 3,
      type: 'received',
      from: 'Jennifer Martinez, CPA',
      fromTitle: 'Your Tax Professional',
      message: `Perfect! I've scheduled us for tomorrow at 2:30 PM. You'll receive a calendar invite shortly.

Yes, the home office deduction includes your basement office (240 sq ft). I calculated it based on the photos and measurements you provided. The deduction covers:

• Portion of utilities
• Depreciation on office furniture
• Office supplies and equipment

Everything looks great - this will be your largest refund yet!`,
      timestamp: '1 day ago',
      priority: 'normal',
      attachments: ['Home_Office_Calculation.pdf'],
      read: false
    },
    {
      id: 4,
      type: 'system',
      from: 'Lawson Mobile Tax System',
      message: 'Your W-2 from ABC Corporation has been successfully uploaded and processed. All required documents for your tax return are now complete.',
      timestamp: '3 days ago',
      priority: 'low',
      attachments: [],
      read: true
    }
  ])

  const [appointments] = useState([
    {
      id: 1,
      title: 'Tax Return Review Call',
      date: 'Tomorrow',
      time: '2:30 PM - 2:45 PM',
      type: 'phone',
      with: 'Jennifer Martinez, CPA',
      status: 'confirmed',
      description: 'Review final tax return and discuss deductions found',
      meetingLink: 'tel:(855) 722-8700',
      notes: 'Have questions ready about home office deduction'
    },
    {
      id: 2,
      title: '2025 Tax Planning Session',
      date: 'March 15, 2025',
      time: '10:00 AM - 11:00 AM',
      type: 'video',
      with: 'Jennifer Martinez, CPA',
      status: 'scheduled',
      description: 'Quarterly tax planning and strategy discussion',
      meetingLink: 'https://zoom.us/j/1234567890',
      notes: 'Discuss retirement contributions and business expansion'
    }
  ])

  const [notifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from Jennifer Martinez',
      content: 'Your tax return is ready for review!',
      time: '2 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Reminder: Call tomorrow at 2:30 PM',
      content: 'Tax return review with Jennifer Martinez',
      time: '8 hours ago',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'document',
      title: 'Document uploaded successfully',
      content: 'Your W-2 has been processed',
      time: '3 days ago',
      priority: 'low',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'Account security update',
      content: 'Your account password was changed',
      time: '1 week ago',
      priority: 'low',
      read: true
    }
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message to server
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-600" />
      case 'appointment': return <Calendar className="h-5 w-5 text-green-600" />
      case 'document': return <FileText className="h-5 w-5 text-purple-600" />
      case 'system': return <Bell className="h-5 w-5 text-gray-600" />
      default: return <MessageCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <MessageSquare className="h-8 w-8" />
            Communication Hub
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            Stay connected with your tax professional - secure, encrypted communication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Shield className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="font-bold">Encrypted</div>
              <div className="text-blue-100 text-sm">End-to-end secure</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Clock className="h-6 w-6 mx-auto mb-2 text-green-300" />
              <div className="font-bold">&lt; 4 Hours</div>
              <div className="text-blue-100 text-sm">Response Time</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="font-bold">24/7</div>
              <div className="text-blue-100 text-sm">Support Available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <Button 
          onClick={() => window.open('tel:(855) 722-8700', '_self')}
          className="bg-green-600 hover:bg-green-700 h-16 flex-col gap-1"
        >
          <Phone className="h-5 w-5" />
          Call Now
        </Button>
        <Button 
          onClick={() => setActiveTab('messages')}
          variant="outline" 
          className="h-16 flex-col gap-1"
        >
          <MessageSquare className="h-5 w-5" />
          New Message
        </Button>
        <Button 
          onClick={() => setActiveTab('appointments')}
          variant="outline" 
          className="h-16 flex-col gap-1"
        >
          <Calendar className="h-5 w-5" />
          Schedule Call
        </Button>
        <Button 
          onClick={() => window.open('mailto:support@lawsonmobiletax.com', '_blank')}
          variant="outline" 
          className="h-16 flex-col gap-1"
        >
          <Mail className="h-5 w-5" />
          Email
        </Button>
      </div>

      {/* Unread Notifications Alert */}
      {notifications.filter(n => !n.read).length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                You have {notifications.filter(n => !n.read).length} unread notifications
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setActiveTab('notifications')}
              >
                View All
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
            {messages.filter(m => !m.read).length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Meetings</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
            {notifications.filter(n => !n.read).length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        {/* Secure Messages */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Secure Messages
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Encrypted
                </Badge>
              </CardTitle>
              <CardDescription>
                Direct communication with Jennifer Martinez, CPA - your dedicated tax professional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Message Compose */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Send a Message</h4>
                <div className="space-y-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask questions about your tax return, request documents, or share updates..."
                    className="w-full p-3 border rounded-md h-32 resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="outline">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach File
                      </Button>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        End-to-end encrypted
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* Message History */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recent Messages</h4>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`border rounded-lg p-4 ${
                      message.type === 'sent' 
                        ? 'bg-blue-50 border-blue-200 ml-6' 
                        : message.type === 'system'
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-white border-gray-200 mr-6'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'sent' 
                            ? 'bg-blue-600' 
                            : message.type === 'system'
                            ? 'bg-gray-500'
                            : 'bg-green-600'
                        }`}>
                          {message.type === 'sent' && <User className="h-4 w-4 text-white" />}
                          {message.type === 'system' && <Bell className="h-4 w-4 text-white" />}
                          {message.type === 'received' && <MessageSquare className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{message.from}</span>
                            {message.fromTitle && (
                              <Badge variant="outline" className="text-xs">
                                {message.fromTitle}
                              </Badge>
                            )}
                            {getPriorityIcon(message.priority)}
                            {!message.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600">{message.timestamp}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-md border mb-3">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                        {message.message}
                      </pre>
                    </div>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {message.attachments.map((attachment, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span>{attachment}</span>
                            <Button size="sm" variant="ghost" className="p-0 h-auto">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.type === 'received' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Back
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments */}
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Scheduled Meetings
              </CardTitle>
              <CardDescription>
                Your upcoming appointments with tax professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{appointment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {appointment.type === 'phone' ? 
                              <Phone className="h-4 w-4" /> : 
                              <Video className="h-4 w-4" />
                            }
                            {appointment.type === 'phone' ? 'Phone Call' : 'Video Call'}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          With: {appointment.with}
                        </div>
                      </div>
                      <Badge 
                        variant={appointment.status === 'confirmed' ? 'default' : 'outline'}
                        className={appointment.status === 'confirmed' ? 'bg-green-600' : ''}
                      >
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-sm text-gray-700">{appointment.description}</p>
                      {appointment.notes && (
                        <div className="mt-2 text-xs text-gray-600">
                          <strong>Notes:</strong> {appointment.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => window.open(appointment.meetingLink, '_blank')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {appointment.type === 'phone' ? (
                          <>
                            <Phone className="h-4 w-4 mr-2" />
                            Join Call
                          </>
                        ) : (
                          <>
                            <Video className="h-4 w-4 mr-2" />
                            Join Video
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Reschedule
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-6 bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Schedule New Appointment</h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Need to discuss your tax situation? Schedule a call with your tax professional.
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => window.open('tel:(855) 722-8700', '_self')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call to Schedule
                    </Button>
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Online Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                Notifications & Updates
              </CardTitle>
              <CardDescription>
                Stay informed about your tax return progress and important updates
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
                      <div className="flex items-start gap-3 flex-1">
                        {getMessageTypeIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                            {getPriorityIcon(notification.priority)}
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{notification.content}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                      {!notification.read && (
                        <Button size="sm" variant="outline">
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

        {/* Support */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-600" />
                Customer Support
              </CardTitle>
              <CardDescription>
                Get help when you need it - multiple ways to reach us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-800 mb-2">Call Support</h3>
                    <p className="text-green-700 mb-4">
                      Speak directly with a tax professional
                    </p>
                    <div className="text-2xl font-bold text-green-600 mb-2">(855) 722-8700</div>
                    <div className="text-sm text-green-600 mb-4">
                      Mon-Fri: 9 AM - 8 PM EST<br/>
                      Sat-Sun: 10 AM - 6 PM EST
                    </div>
                    <Button 
                      onClick={() => window.open('tel:(855) 722-8700', '_self')}
                      className="bg-green-600 hover:bg-green-700 w-full"
                    >
                      Call Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Live Chat</h3>
                    <p className="text-blue-700 mb-4">
                      Get instant answers to your questions
                    </p>
                    <div className="text-lg font-bold text-blue-600 mb-2">Available Now</div>
                    <div className="text-sm text-blue-600 mb-4">
                      Average response time: 30 seconds
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Email Support</h3>
                    <p className="text-purple-700 mb-4">
                      Send detailed questions or documents
                    </p>
                    <div className="text-lg font-bold text-purple-600 mb-2">&lt; 4 Hour Response</div>
                    <div className="text-sm text-purple-600 mb-4">
                      support@lawsonmobiletax.com
                    </div>
                    <Button 
                      onClick={() => window.open('mailto:support@lawsonmobiletax.com', '_blank')}
                      className="bg-purple-600 hover:bg-purple-700 w-full"
                    >
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-yellow-800 mb-2">Help Center</h3>
                    <p className="text-yellow-700 mb-4">
                      Browse FAQs and helpful articles
                    </p>
                    <div className="text-lg font-bold text-yellow-600 mb-2">100+ Articles</div>
                    <div className="text-sm text-yellow-600 mb-4">
                      Self-service support available
                    </div>
                    <Button className="bg-yellow-600 hover:bg-yellow-700 w-full">
                      Visit Help Center
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Emergency Tax Support</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    For urgent tax matters (IRS notices, audit support, payment issues):
                  </p>
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={() => window.open('tel:(855) 722-8700', '_self')}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Emergency Line: (855) 722-8700
                    </Button>
                    <span className="text-sm text-gray-600">Available 24/7 for emergencies</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
