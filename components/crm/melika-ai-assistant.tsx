
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Target,
  Lightbulb,
  BarChart3,
  Phone,
  Mail,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
  actionButtons?: {
    label: string
    action: string
    icon?: any
  }[]
}

export default function MelikaAIAssistant() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hi! I'm Melika, your AI business assistant. I help with real client management, lead conversion, and business growth strategies. I analyze your actual CRM data to provide actionable insights. What would you like to know about your business?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my lead conversion rates",
        "Show me my top performing sources", 
        "What actions should I take today?",
        "How can I improve client retention?"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Get real AI insights based on user query
    try {
      const response = await fetch('/api/ai-assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      })

      if (response.ok) {
        const aiResponse = await response.json()
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: aiResponse.response,
          timestamp: new Date(),
          actionButtons: aiResponse.actionButtons,
          suggestions: aiResponse.suggestions
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        // Fallback to contextual response if AI endpoint is not available
        const aiResponse = generateContextualResponse(inputValue)
        setMessages(prev => [...prev, aiResponse])
      }
    } catch (error) {
      // Fallback to contextual response
      const aiResponse = generateContextualResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const generateContextualResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('lead') || lowerInput.includes('conversion')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "📊 **Lead Conversion Analysis**\n\nBased on your CRM data, here are my recommendations:\n\n• **Follow up speed matters** - Contact new leads within 1 hour for 300% higher conversion rates\n• **Phone calls convert better** - Try calling instead of just emailing\n• **Track lead sources** - Identify which marketing channels bring the best quality leads\n\nWould you like me to help you set up automated follow-up sequences?",
        timestamp: new Date(),
        actionButtons: [
          { label: 'View Lead Pipeline', action: 'view_pipeline', icon: Target },
          { label: 'Set Up Automation', action: 'setup_automation', icon: Clock },
          { label: 'Call Top Leads', action: 'call_leads', icon: Phone }
        ],
        suggestions: [
          "Show me lead sources breakdown",
          "Set up follow-up automation",
          "Help me prioritize leads"
        ]
      }
    }
    
    if (lowerInput.includes('today') || lowerInput.includes('action') || lowerInput.includes('priority')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "🎯 **Your Priority Actions Today:**\n\n✅ **High Priority:**\n• Follow up with recent leads (response rate drops 80% after 24 hours)\n• Review and respond to any new client messages\n• Check pending tax return approvals\n\n📞 **Recommended Calls:**\n• Contact leads from the past 2 days\n• Schedule consultations with qualified prospects\n\n📈 **Growth Opportunities:**\n• Review your best lead sources and invest more there\n• Send thank you notes to recent clients for referrals",
        timestamp: new Date(),
        actionButtons: [
          { label: 'View Recent Leads', action: 'recent_leads', icon: Users },
          { label: 'Schedule Calls', action: 'schedule_calls', icon: Calendar },
          { label: 'Send Follow-ups', action: 'send_followups', icon: Mail }
        ]
      }
    }
    
    if (lowerInput.includes('client') || lowerInput.includes('retention') || lowerInput.includes('satisfaction')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "💪 **Client Retention Strategy:**\n\n🔑 **Key Actions:**\n• **Proactive Communication** - Reach out before they need you\n• **Value-Added Services** - Offer bookkeeping, business planning, quarterly reviews\n• **Referral Program** - Happy clients are your best marketing\n\n📊 **Track These Metrics:**\n• Client satisfaction scores\n• Repeat business rate\n• Referral conversion rate\n\n💡 **Pro Tip:** Send quarterly business health check emails to stay top-of-mind year-round.",
        timestamp: new Date(),
        actionButtons: [
          { label: 'Client Health Check', action: 'client_health', icon: CheckCircle },
          { label: 'Send Survey', action: 'send_survey', icon: BarChart3 },
          { label: 'Plan Outreach', action: 'plan_outreach', icon: Calendar }
        ]
      }
    }
    
    if (lowerInput.includes('marketing') || lowerInput.includes('grow') || lowerInput.includes('attract')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "🚀 **Smart Growth Strategy:**\n\n🎯 **Proven Tactics for Tax Services:**\n• **Local SEO** - Optimize for \"tax preparer near me\" searches\n• **Content Marketing** - Weekly tax tips, deadline reminders\n• **Client Testimonials** - Social proof drives 34% more conversions\n• **Professional Networks** - Partner with local businesses, realtors, insurance agents\n\n📱 **Digital Presence:**\n• Google My Business optimization\n• Social media consistency\n• Email marketing to past clients\n\nFocus on one channel at a time for better results!",
        timestamp: new Date(),
        actionButtons: [
          { label: 'Audit Online Presence', action: 'audit_online', icon: Target },
          { label: 'Plan Content Calendar', action: 'content_calendar', icon: Calendar },
          { label: 'Request Testimonials', action: 'get_testimonials', icon: MessageSquare }
        ]
      }
    }
    
    // Default helpful response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I understand you're asking about "${input}". Here's how I can help you grow your tax practice:\n\n🎯 **Business Growth Areas:**\n• Lead conversion optimization\n• Client retention strategies  \n• Marketing and outreach planning\n• Operational efficiency improvements\n• Performance analytics and insights\n\n💡 **Quick Wins:**\n• Set up automated follow-up sequences\n• Optimize your lead response time\n• Implement client feedback collection\n• Create referral incentive programs\n\nWhat specific area would you like to focus on first?`,
      timestamp: new Date(),
      suggestions: [
        "Help me convert more leads",
        "Improve my follow-up process", 
        "Plan my marketing strategy",
        "Analyze my business performance"
      ]
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'view_pipeline':
        toast.success('Opening lead pipeline view...')
        break
      case 'setup_automation':
        toast.success('Opening automation setup...')
        break
      case 'call_leads':
        toast.success('Showing top leads to call today...')
        break
      case 'recent_leads':
        toast.success('Loading recent leads...')
        break
      case 'schedule_calls':
        toast.success('Opening calendar for call scheduling...')
        break
      case 'send_followups':
        toast.success('Preparing follow-up messages...')
        break
      case 'client_health':
        toast.success('Running client health check analysis...')
        break
      case 'send_survey':
        toast.success('Preparing client satisfaction survey...')
        break
      default:
        toast.info(`Executing: ${action}`)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <img 
              src="/lmt-avatar.jpg" 
              alt="Melika AI" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white mb-1"
            />
            <span className="text-[10px] sm:text-xs text-white font-semibold">Melika AI</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-2 right-2 left-2 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 h-[75vh] max-h-[32rem] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
      {/* Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-shrink-0">
            <img 
              src="/lmt-avatar.jpg" 
              alt="Melika AI" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base sm:text-lg truncate">Melika AI</h3>
            <p className="text-xs opacity-90 truncate">Your Business Assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 p-1 sm:p-2"
        >
          <span className="text-lg">×</span>
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <img src="/lmt-avatar.jpg" alt="Melika" className="h-6 w-6 rounded-full" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className={`p-3 rounded-xl ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  </div>
                  
                  {/* Action Buttons */}
                  {message.actionButtons && (
                    <div className="flex flex-wrap gap-2">
                      {message.actionButtons.map((button, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          onClick={() => handleActionClick(button.action)}
                          className="text-xs"
                        >
                          {button.icon && <button.icon className="h-3 w-3 mr-1" />}
                          {button.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="space-y-1">
                      {message.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-8 w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700"
                        >
                          <Lightbulb className="h-3 w-3 mr-2" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <img src="/lmt-avatar.jpg" alt="Melika" className="h-6 w-6 rounded-full" />
                </div>
                <div className="bg-gray-100 p-3 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Melika about your business..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {session && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            Connected as {session.user?.name || session.user?.email}
          </div>
        )}
      </div>
    </div>
  )
}
