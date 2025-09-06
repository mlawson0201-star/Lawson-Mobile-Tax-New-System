
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share, 
  Monitor,
  Edit,
  Eye,
  Clock,
  Phone,
  Mic,
  MicOff,
  VideoOff
} from 'lucide-react'
import { toast } from 'sonner'

export default function CollaborationHub() {
  const [collaborationStats, setCollaborationStats] = useState<any>(null)
  const [activeSessions, setActiveSessions] = useState<any[]>([])
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCollaborationData()
    fetchActiveSessions()
  }, [])

  const fetchCollaborationData = async () => {
    try {
      const response = await fetch('/api/phase2/collaboration')
      const data = await response.json()
      
      if (data.success) {
        setCollaborationStats(data.collaboration_stats)
      }
    } catch (error) {
      console.error('Failed to fetch collaboration data:', error)
      toast.error('Failed to load collaboration data')
    }
  }

  const fetchActiveSessions = async () => {
    try {
      const response = await fetch('/api/phase2/collaboration?action=sessions')
      const data = await response.json()
      
      if (data.success) {
        setActiveSessions(data.active_sessions)
      }
    } catch (error) {
      console.error('Failed to fetch active sessions:', error)
    }
  }

  const createSession = async () => {
    try {
      const response = await fetch('/api/phase2/collaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_session',
          user_id: 'current_user',
          data: {
            document_id: 'demo_doc_123',
            document_name: 'Client Tax Review 2024.pdf',
            allow_editing: true,
            allow_annotations: true
          }
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setSelectedSession(data.session)
        toast.success('Collaboration session created!')
        fetchActiveSessions()
      } else {
        toast.error(data.error || 'Failed to create session')
      }
    } catch (error) {
      console.error('Session creation error:', error)
      toast.error('Failed to create collaboration session')
    }
  }

  const joinSession = async (sessionId: string) => {
    try {
      const response = await fetch('/api/phase2/collaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'join_session',
          session_id: sessionId,
          user_id: 'current_user'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setSelectedSession(data.session)
        toast.success('Joined collaboration session!')
      } else {
        toast.error(data.error || 'Failed to join session')
      }
    } catch (error) {
      console.error('Session join error:', error)
      toast.error('Failed to join session')
    }
  }

  const sendMessage = async () => {
    if (!message.trim() || !selectedSession) return

    try {
      const response = await fetch('/api/phase2/collaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_message',
          session_id: selectedSession.session_id,
          user_id: 'current_user',
          data: { message }
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage('')
        toast.success('Message sent!')
        // In a real app, you'd update the session messages
      } else {
        toast.error('Failed to send message')
      }
    } catch (error) {
      console.error('Send message error:', error)
      toast.error('Failed to send message')
    }
  }

  const startVideoCall = () => {
    setIsVideoCall(true)
    toast.success('Video call started!')
  }

  const endVideoCall = () => {
    setIsVideoCall(false)
    toast.info('Video call ended')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Real-Time Collaboration Hub</CardTitle>
              <CardDescription className="text-indigo-100">
                Connect, collaborate, and work together seamlessly
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Collaboration Stats */}
      {collaborationStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{collaborationStats.online_users}</div>
              <div className="text-sm text-gray-600">Online Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Monitor className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{collaborationStats.active_sessions}</div>
              <div className="text-sm text-gray-600">Active Sessions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{collaborationStats.messages_today}</div>
              <div className="text-sm text-gray-600">Messages Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Share className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{collaborationStats.documents_shared}</div>
              <div className="text-sm text-gray-600">Docs Shared</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Collaboration Sessions
            </CardTitle>
            <CardDescription>Create or join collaboration sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={createSession}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Create New Session
            </Button>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Active Sessions</h4>
              {activeSessions.length > 0 ? (
                activeSessions.map((session) => (
                  <div key={session.session_id} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{session.document_name}</span>
                      <Badge variant="outline">
                        {session.participants} users
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      Created by {session.created_by} • {new Date(session.created_at).toLocaleTimeString()}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => joinSession(session.session_id)}
                      >
                        Join
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-4">No active sessions</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Session */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedSession ? `Session: ${selectedSession.document_name}` : 'Select Session'}
            </CardTitle>
            <CardDescription>
              {selectedSession ? 'Collaborate in real-time' : 'Join or create a session to start collaborating'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedSession ? (
              <div className="space-y-4">
                {/* Video Call Interface */}
                {isVideoCall && (
                  <div className="bg-gray-900 rounded-lg p-6 text-center text-white relative">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center">
                          <div className="text-center">
                            <Avatar className="h-12 w-12 mx-auto mb-2">
                              <AvatarFallback>CU</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">Current User</p>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center">
                          <div className="text-center">
                            <Avatar className="h-12 w-12 mx-auto mb-2">
                              <AvatarFallback>TC</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">Tax Consultant</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          size="sm"
                          variant={isMuted ? "destructive" : "secondary"}
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={endVideoCall}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session Controls */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={isVideoCall ? endVideoCall : startVideoCall}
                    variant={isVideoCall ? "destructive" : "default"}
                  >
                    <Video className="h-3 w-3 mr-1" />
                    {isVideoCall ? 'End Call' : 'Video Call'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Monitor className="h-3 w-3 mr-1" />
                    Screen Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Co-Edit
                  </Button>
                </div>

                {/* Participants */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">Participants</h4>
                  <div className="space-y-2">
                    {selectedSession.participants?.map((participant: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {participant.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{participant}</span>
                        <div className="ml-auto flex gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-gray-500">online</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-900">Chat</h4>
                  <div className="border border-gray-200 rounded-lg p-3 h-32 overflow-y-auto bg-gray-50">
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500 text-center">
                        Session started • {new Date(selectedSession.created_at).toLocaleTimeString()}
                      </div>
                      {selectedSession.messages?.map((msg: any, index: number) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{msg.user_id}: </span>
                          <span>{msg.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Create or join a session to start collaborating</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {collaborationStats?.recent_activities && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Collaboration Activity</CardTitle>
            <CardDescription>Live updates from active collaborations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {collaborationStats.recent_activities.map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'document_share' ? 'bg-blue-500' :
                    activity.type === 'annotation_added' ? 'bg-green-500' :
                    activity.type === 'video_call_started' ? 'bg-purple-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      {activity.type === 'document_share' && `${activity.user} shared ${activity.document}`}
                      {activity.type === 'annotation_added' && `${activity.user} added annotation: "${activity.annotation}"`}
                      {activity.type === 'video_call_started' && `Video call started with ${activity.participants.join(', ')}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
