
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bot, Send, User, Loader2 } from 'lucide-react'

export default function AIAssistantPage() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m Melika, your AI tax assistant. I can help you with tax law questions, client management guidance, workflow optimization, and business process automation. How can I assist you today?'
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return

    const userMessage = message
    setMessage('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          context: 'Tax service bureau platform assistance'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      if (reader) {
        setMessages(prev => [...prev, { role: 'assistant', content: '' }])
        
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              
              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content || ''
                assistantMessage += content
                
                setMessages(prev => {
                  const newMessages = [...prev]
                  newMessages[newMessages.length - 1].content = assistantMessage
                  return newMessages
                })
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.' 
      }])
    }

    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Tax Assistant</h1>
        <p className="text-gray-600 mt-2">
          Get expert tax guidance and operational support from Melika AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Melika AI Assistant
              </CardTitle>
              <CardDescription>
                Specialized in tax preparation and business operations
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-100'
                      }`}>
                        {msg.role === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about tax laws, client management, workflows..."
                    className="flex-1"
                    disabled={loading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={loading || !message.trim()}
                    size="icon"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                'What are the 2023 tax deadlines?',
                'How to optimize business deductions?',
                'Client onboarding best practices',
                'Tax law updates this year'
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start text-sm h-auto py-2 px-3"
                  onClick={() => setMessage(question)}
                  disabled={loading}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">Tax Law</Badge>
                <Badge variant="secondary" className="mr-2">CRM Guidance</Badge>
                <Badge variant="secondary" className="mr-2">Workflow Tips</Badge>
                <Badge variant="secondary" className="mr-2">Compliance</Badge>
                <Badge variant="secondary" className="mr-2">Document Help</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
