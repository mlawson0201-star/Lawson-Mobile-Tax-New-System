
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Calendar, 
  Clock, 
  User,
  Sparkles,
  CheckCircle,
  Zap
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentStage, setCurrentStage] = useState('greeting') // greeting, qualifying, scheduling
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', email: '' })

  // Auto-responses based on stage
  const autoResponses = {
    greeting: [
      "👋 Hi! I'm Sarah, your personal tax advisor. I can help you maximize your refund!",
      "Quick question - what's your current tax situation? (W-2 employee, business owner, investments, etc.)"
    ],
    qualifying: [
      "Perfect! Based on that, I can already see several opportunities to increase your refund.",
      "Let me connect you with one of our CPAs for a FREE consultation. What's the best number to reach you?"
    ],
    scheduling: [
      "🎯 Excellent! I've reserved a priority slot for you.",
      "Our CPA will call you within 15 minutes to discuss your specific situation and find every deduction you deserve!"
    ]
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage(autoResponses.greeting[0])
        setTimeout(() => {
          addBotMessage(autoResponses.greeting[1])
        }, 1500)
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        isUser: false,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Process response based on current stage
    setTimeout(() => {
      handleAutoResponse(inputMessage)
    }, 1000)
  }

  const handleAutoResponse = (userInput: string) => {
    if (currentStage === 'greeting') {
      addBotMessage(autoResponses.qualifying[0])
      setTimeout(() => {
        addBotMessage(autoResponses.qualifying[1])
        setCurrentStage('qualifying')
      }, 2000)
    } else if (currentStage === 'qualifying') {
      addBotMessage(autoResponses.scheduling[0])
      setTimeout(() => {
        addBotMessage(autoResponses.scheduling[1])
        setCurrentStage('scheduling')
      }, 2000)
    }
  }

  const handleQuickAction = (action: string) => {
    if (action === 'call') {
      window.open(`tel:${COMPANY_CONFIG.contact.phone}`, '_self')
    } else if (action === 'schedule') {
      // Trigger scheduling flow
      addBotMessage("🗓️ Perfect! Let me get your contact info to schedule your FREE consultation...")
      setCurrentStage('scheduling')
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full ultra-button shadow-2xl neon-glow animate-bounce hover:animate-none"
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
          
          {/* Attention-grabbing popup */}
          <div className="absolute -top-20 -left-32 bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-900">Tax Expert Online</span>
            </div>
            <p className="text-sm text-gray-600">💰 Get your FREE refund estimate now!</p>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Tax Expert Chat</CardTitle>
                  <div className="flex items-center gap-1 text-green-200 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Online • Avg. response: 30 sec
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {currentStage === 'greeting' && messages.length > 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick options:</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickAction('call')}
                    className="text-xs"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickAction('schedule')}
                    className="text-xs"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t">
            {currentStage === 'scheduling' ? (
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-green-800">Priority Slot Reserved!</p>
                  <p className="text-xs text-green-600">A CPA will call you at {COMPANY_CONFIG.contact.phone} within 15 minutes</p>
                </div>
                <Button className="w-full ultra-button">
                  <Zap className="mr-2 h-4 w-4" />
                  Claim My FREE $3,247 Analysis
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="px-4">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
