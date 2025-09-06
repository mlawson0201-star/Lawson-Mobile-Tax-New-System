
// Phase 2: Real-Time Collaboration Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share, 
  Edit,
  Clock,
  CheckCircle,
  Eye,
  Monitor,
  Mic,
  Camera,
  FileText,
  Activity,
  Send,
  Phone,
  Settings,
  Sparkles
} from 'lucide-react'

export default function CollaborationTools() {
  const [activeSession, setActiveSession] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate fetching active collaboration session
    fetchActiveSession()
  }, [])

  const fetchActiveSession = async () => {
    try {
      const response = await fetch('/api/phase2/collaboration?sessionId=collab_001')
      const data = await response.json()
      setActiveSession(data.session)
      setIsConnected(true)
    } catch (error) {
      console.error('Failed to fetch collaboration session:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const response = await fetch('/api/phase2/collaboration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-message',
          sessionId: activeSession?.id,
          userId: 'prep_789',
          data: {
            senderName: 'Michael Chen',
            content: newMessage,
            type: 'text'
          }
        })
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Message sent successfully!')
        setNewMessage('')
      }
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  const startVideoCall = async () => {
    toast.success('Video call initiated!')
    // In a real implementation, this would start a video conference
  }

  const features = [
    {
      icon: <Video className="h-6 w-6" />,
      title: 'Live Video Consultations',
      description: 'Face-to-face meetings with HD video and crystal-clear audio',
      color: 'from-blue-500 to-cyan-500',
      metrics: '97% client satisfaction'
    },
    {
      icon: <Share className="h-6 w-6" />,
      title: 'Screen Sharing',
      description: 'Share documents and applications in real-time',
      color: 'from-green-500 to-emerald-500',
      metrics: '73% faster resolution'
    },
    {
      icon: <Edit className="h-6 w-6" />,
      title: 'Real-Time Editing',
      description: 'Collaborative document editing with live cursors',
      color: 'from-purple-500 to-pink-500',
      metrics: '45% time savings'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Secure Messaging',
      description: 'Encrypted chat with file sharing and notifications',
      color: 'from-orange-500 to-red-500',
      metrics: '100% secure communication'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <Users className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Real-Time Collaboration
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Work together seamlessly with clients and team members. 
          Boost productivity by 73% with real-time collaboration tools.
        </p>
      </div>

      {/* Active Session */}
      {activeSession && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <CardTitle className="text-blue-800">Active Collaboration Session</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {activeSession.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Participants */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participants ({activeSession.participants.length})
                </h4>
                <div className="space-y-2">
                  {activeSession.participants.map((participant: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {participant.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{participant.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{participant.role}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        participant.status === 'online' ? 'bg-green-500' : 
                        participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {activeSession.activities.slice(-3).map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.userName}</div>
                        <div className="text-xs text-gray-600">{activity.description}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collaboration Tools */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button 
                onClick={startVideoCall}
                className="bg-gradient-to-r from-green-500 to-blue-500"
              >
                <Video className="h-4 w-4 mr-2" />
                Start Video Call
              </Button>
              <Button variant="outline">
                <Monitor className="h-4 w-4 mr-2" />
                Share Screen
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Share Document
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            {/* Quick Message */}
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Send a quick message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <Badge className="bg-blue-100 text-blue-800">
                    {feature.metrics}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Collaboration Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <div className="text-2xl font-bold mb-2">73%</div>
            <p className="text-gray-600">Faster Tax Preparation</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <div className="text-2xl font-bold mb-2">89%</div>
            <p className="text-gray-600">Client Satisfaction</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <MessageSquare className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <div className="text-2xl font-bold mb-2">45%</div>
            <p className="text-gray-600">Fewer Email Exchanges</p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Experience Real-Time Collaboration</h3>
          <p className="opacity-90">See how our tools transform client interactions</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5" />
              <span>Instant document sharing and editing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5" />
              <span>HD video calls with screen sharing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5" />
              <span>Real-time activity tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5" />
              <span>Secure, encrypted communications</span>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Start Demo Session
            </Button>
            <p className="text-sm opacity-80 mt-2">
              Connect with a live demo in under 30 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
