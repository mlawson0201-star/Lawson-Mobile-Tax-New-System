
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  Send, 
  Reply, 
  Forward, 
  Archive, 
  Star,
  Paperclip,
  Calendar,
  User,
  Building2,
  Phone
} from 'lucide-react'
import { toast } from 'sonner'

interface Email {
  id: string
  from: string
  to: string
  subject: string
  body: string
  timestamp: Date
  read: boolean
  starred: boolean
  clientId?: string
  attachments?: string[]
}

interface EmailIntegrationProps {
  clientId?: string
  clientName?: string
  clientEmail?: string
}

export function EmailIntegration({ clientId, clientName, clientEmail }: EmailIntegrationProps) {
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [composing, setComposing] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Email | null>(null)
  
  const [composeForm, setComposeForm] = useState({
    to: clientEmail || '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  })

  // Mock email data - replace with real email API integration
  useEffect(() => {
    const mockEmails: Email[] = [
      {
        id: '1',
        from: 'lmt@lawsonmobiletax.com',
        to: clientEmail || 'client@example.com',
        subject: 'Tax Return Status Update',
        body: 'Your 2023 tax return has been completed and is ready for review.',
        timestamp: new Date(2024, 7, 25, 14, 30),
        read: true,
        starred: false,
        clientId,
        attachments: ['tax_return_2023.pdf']
      },
      {
        id: '2',
        from: clientEmail || 'client@example.com',
        to: 'lmt@lawsonmobiletax.com',
        subject: 'Additional Documents',
        body: 'Hi, I have some additional receipts to submit for my tax return.',
        timestamp: new Date(2024, 7, 24, 9, 15),
        read: false,
        starred: true,
        clientId,
        attachments: ['receipts.jpg', 'bank_statement.pdf']
      }
    ]
    
    setEmails(mockEmails)
  }, [clientId, clientEmail])

  const handleSendEmail = async () => {
    try {
      // TODO: Integrate with real email API (Microsoft Graph, Gmail, etc.)
      const emailData = {
        to: composeForm.to,
        cc: composeForm.cc,
        bcc: composeForm.bcc,
        subject: composeForm.subject,
        body: composeForm.body,
        clientId
      }

      // For now, simulate sending
      const newEmail: Email = {
        id: Date.now().toString(),
        from: 'lmt@lawsonmobiletax.com',
        to: composeForm.to,
        subject: composeForm.subject,
        body: composeForm.body,
        timestamp: new Date(),
        read: true,
        starred: false,
        clientId
      }

      setEmails(prev => [newEmail, ...prev])
      setComposeForm({ to: '', cc: '', bcc: '', subject: '', body: '' })
      setComposing(false)
      toast.success('Email sent successfully!')

      // TODO: Call real email API
      // await fetch('/api/email/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // })

    } catch (error) {
      toast.error('Failed to send email')
    }
  }

  const handleReply = (email: Email) => {
    setReplyingTo(email)
    setComposeForm({
      to: email.from === 'lmt@lawsonmobiletax.com' ? email.to : email.from,
      cc: '',
      bcc: '',
      subject: `Re: ${email.subject}`,
      body: `\n\n--- Original Message ---\nFrom: ${email.from}\nTo: ${email.to}\nSubject: ${email.subject}\n\n${email.body}`
    })
    setComposing(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Email Integration</h3>
          <p className="text-gray-600">
            {clientName ? `Emails with ${clientName}` : 'Client Email Communication'}
          </p>
        </div>
        <Button onClick={() => setComposing(true)} className="bg-blue-600 hover:bg-blue-700">
          <Mail className="h-4 w-4 mr-2" />
          Compose Email
        </Button>
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox ({emails.filter(e => e.to === 'lmt@lawsonmobiletax.com').length})</TabsTrigger>
          <TabsTrigger value="sent">Sent ({emails.filter(e => e.from === 'lmt@lawsonmobiletax.com').length})</TabsTrigger>
          <TabsTrigger value="starred">Starred ({emails.filter(e => e.starred).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Inbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emails
                  .filter(e => e.to === 'lmt@lawsonmobiletax.com')
                  .map(email => (
                    <div 
                      key={email.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        !email.read ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-semibold">{email.from}</p>
                            <p className="text-sm text-gray-600">{email.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {email.starred && <Star className="h-4 w-4 text-yellow-500" />}
                          {!email.read && <Badge variant="secondary">New</Badge>}
                          <span className="text-sm text-gray-500">
                            {email.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {email.attachments && email.attachments.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Paperclip className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {email.attachments.length} attachment{email.attachments.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emails
                  .filter(e => e.from === 'lmt@lawsonmobiletax.com')
                  .map(email => (
                    <div 
                      key={email.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Send className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold">To: {email.to}</p>
                            <p className="text-sm text-gray-600">{email.subject}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {email.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="starred">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Starred
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emails
                  .filter(e => e.starred)
                  .map(email => (
                    <div 
                      key={email.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="font-semibold">{email.from}</p>
                            <p className="text-sm text-gray-600">{email.subject}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {email.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Compose Email Modal */}
      {composing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {replyingTo ? 'Reply to Email' : 'Compose Email'}
              </h3>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setComposing(false)
                  setReplyingTo(null)
                  setComposeForm({ to: '', cc: '', bcc: '', subject: '', body: '' })
                }}
              >
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">To:</label>
                  <Input
                    value={composeForm.to}
                    onChange={(e) => setComposeForm(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="recipient@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CC:</label>
                  <Input
                    value={composeForm.cc}
                    onChange={(e) => setComposeForm(prev => ({ ...prev, cc: e.target.value }))}
                    placeholder="cc@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <Input
                  value={composeForm.subject}
                  onChange={(e) => setComposeForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message:</label>
                <Textarea
                  rows={12}
                  value={composeForm.body}
                  onChange={(e) => setComposeForm(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Write your email message here..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setComposing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendEmail} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedEmail.subject}</h3>
              <Button variant="ghost" onClick={() => setSelectedEmail(null)}>
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold">From: {selectedEmail.from}</p>
                    <p className="text-sm text-gray-600">To: {selectedEmail.to}</p>
                    <p className="text-sm text-gray-500">{selectedEmail.timestamp.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReply(selectedEmail)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Forward className="h-4 w-4 mr-1" />
                    Forward
                  </Button>
                </div>
              </div>

              {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments ({selectedEmail.attachments.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmail.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-100">
                        {attachment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg">
                <div className="whitespace-pre-wrap">{selectedEmail.body}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
