
'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MessageSquare, Send, Bot, User, Sparkles, FileText, Calculator, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    confidence?: number
    sources?: string[]
    actionButtons?: Array<{
      label: string
      action: string
      data?: any
    }>
  }
}

interface AiAssistantChatProps {
  clientId?: string
  leadId?: string
  context?: 'crm' | 'tax-prep' | 'general'
}

export function AiAssistantChat({ clientId, leadId, context = 'general' }: AiAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'assistant',
      content: `Hi! I'm Melika, your AI tax and business assistant. I can help you with:

• Tax questions and calculations
• Client management and CRM tasks
• Tax law updates and compliance
• Business process optimization
• Document analysis and review

${clientId ? 'I have context about this client and can provide personalized assistance.' : ''}
${leadId ? 'I can help you qualify and convert this lead.' : ''}

How can I assist you today?`,
      timestamp: new Date(),
      metadata: {
        confidence: 100,
        actionButtons: [
          { label: 'Tax Questions', action: 'suggest_tax_help' },
          { label: 'Client Analysis', action: 'analyze_client' },
          { label: 'Process Help', action: 'process_guidance' }
        ]
      }
    }
    setMessages([welcomeMessage])
  }, [clientId, leadId])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputValue,
          context,
          clientId,
          leadId,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        })
      })

      const data = await response.json()

      if (response.ok) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: data.message,
          timestamp: new Date(),
          metadata: {
            confidence: data.confidence,
            sources: data.sources,
            actionButtons: data.actionButtons
          }
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to get AI response')
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleActionButton = async (action: string, data?: any) => {
    let message = ''
    
    switch (action) {
      case 'suggest_tax_help':
        message = 'What tax questions can I help you with?'
        break
      case 'analyze_client':
        message = clientId 
          ? 'Please analyze this client\'s tax situation and provide recommendations'
          : 'I need a client ID to provide client analysis'
        break
      case 'process_guidance':
        message = 'What business process would you like guidance on?'
        break
      default:
        message = `Help me with: ${action}`
    }
    
    setInputValue(message)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Ask Melika GPT
            <Badge variant="outline" className="text-xs">
              {context === 'crm' ? 'CRM Assistant' : context === 'tax-prep' ? 'Tax Assistant' : 'General'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            AI-powered tax and business assistant with access to current tax law and your data
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    
                    {message.metadata?.confidence && message.metadata.confidence < 80 && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          Confidence: {message.metadata.confidence}%
                        </Badge>
                      </div>
                    )}
                    
                    {message.metadata?.sources && message.metadata.sources.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Sources:</div>
                        <div className="flex flex-wrap gap-1">
                          {message.metadata.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.metadata?.actionButtons && message.metadata.actionButtons.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.metadata.actionButtons.map((button, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            onClick={() => handleActionButton(button.action, button.data)}
                            className="text-xs"
                          >
                            {button.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-2 pt-4 border-t">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about tax questions, client management, or business processes..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputValue.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            <span>Powered by AI • Always verify important tax advice</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Floating action button version for specific pages
export function AiAssistantFab({ 
  context, 
  clientId, 
  leadId 
}: AiAssistantChatProps) {
  return <AiAssistantChat context={context} clientId={clientId} leadId={leadId} />
}

// Inline chat component for embedding in other components
export function InlineAiAssistant({
  context,
  clientId,
  leadId,
  height = '400px'
}: AiAssistantChatProps & { height?: string }) {
  // Similar implementation but without dialog wrapper
  return (
    <Card className="w-full" style={{ height }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          Ask Melika GPT
        </CardTitle>
        <CardDescription>
          AI assistant for tax and business questions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-full">
        {/* Implementation would be similar to the dialog version */}
        <div className="p-4 text-center text-gray-500">
          <p>Inline AI assistant (implementation similar to dialog version)</p>
        </div>
      </CardContent>
    </Card>
  )
}
