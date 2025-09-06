
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff, 
  Calculator,
  TrendingUp,
  Shield,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  FileText,
  Clock,
  Zap
} from 'lucide-react'

interface AIResponse {
  id: string
  type: 'calculation' | 'recommendation' | 'warning' | 'insight'
  title: string
  content: string
  confidence: number
  savings?: number
  risk?: 'low' | 'medium' | 'high'
  timestamp: Date
}

interface TaxScenario {
  income: number
  filingStatus: 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'
  deductions: number
  dependents: number
  selfEmployed: boolean
  homeOffice: boolean
  businessExpenses: number
  retirementContributions: number
}

export function RealtimeAIAdvisor() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'ai', content: string, timestamp: Date, responses?: AIResponse[]}>>([
    {
      role: 'ai',
      content: 'Hello! I\'m your AI Tax Advisor. I can help you with real-time tax calculations, optimization strategies, and compliance guidance. What would you like to explore today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<TaxScenario>({
    income: 75000,
    filingStatus: 'single',
    deductions: 13850,
    dependents: 0,
    selfEmployed: false,
    homeOffice: false,
    businessExpenses: 0,
    retirementContributions: 6000
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Real-time tax calculation
  const calculateTax = (scenario: TaxScenario) => {
    const adjustedIncome = scenario.income - scenario.deductions - scenario.retirementContributions
    const taxableIncome = Math.max(0, adjustedIncome)
    
    // 2024 tax brackets for single filer
    let tax = 0
    if (taxableIncome <= 11000) {
      tax = taxableIncome * 0.10
    } else if (taxableIncome <= 44725) {
      tax = 1100 + (taxableIncome - 11000) * 0.12
    } else if (taxableIncome <= 95375) {
      tax = 5147 + (taxableIncome - 44725) * 0.22
    } else {
      tax = 16290 + (taxableIncome - 95375) * 0.24
    }
    
    return Math.round(tax)
  }

  const generateAIResponses = (userInput: string): AIResponse[] => {
    const responses: AIResponse[] = []
    const currentTax = calculateTax(currentScenario)
    const effectiveTaxRate = (currentTax / currentScenario.income * 100).toFixed(1)
    
    // Tax calculation response
    if (userInput.toLowerCase().includes('tax') || userInput.toLowerCase().includes('calculate')) {
      responses.push({
        id: 'calc-' + Date.now(),
        type: 'calculation',
        title: 'Current Tax Liability',
        content: `Based on your income of $${currentScenario.income.toLocaleString()}, your federal tax liability is $${currentTax.toLocaleString()} (${effectiveTaxRate}% effective rate).`,
        confidence: 98,
        timestamp: new Date()
      })
    }
    
    // Optimization recommendations
    if (!currentScenario.homeOffice && currentScenario.selfEmployed) {
      responses.push({
        id: 'rec-' + Date.now(),
        type: 'recommendation',
        title: 'Home Office Deduction Opportunity',
        content: 'You could save approximately $1,200-2,400 annually by claiming a home office deduction if you use part of your home exclusively for business.',
        confidence: 87,
        savings: 1800,
        timestamp: new Date()
      })
    }
    
    // Retirement optimization
    if (currentScenario.retirementContributions < 23000) {
      const additionalContribution = Math.min(23000 - currentScenario.retirementContributions, currentScenario.income * 0.2)
      const savings = Math.round(additionalContribution * 0.22)
      responses.push({
        id: 'ret-' + Date.now(),
        type: 'insight',
        title: 'Retirement Contribution Optimization',
        content: `You could contribute an additional $${additionalContribution.toLocaleString()} to your 401(k) and save $${savings.toLocaleString()} in taxes.`,
        confidence: 94,
        savings: savings,
        timestamp: new Date()
      })
    }
    
    // Risk assessment
    if (currentScenario.businessExpenses > currentScenario.income * 0.3) {
      responses.push({
        id: 'risk-' + Date.now(),
        type: 'warning',
        title: 'Audit Risk Assessment',
        content: 'Your business expense ratio is higher than average. Ensure you have proper documentation for all business expenses to avoid audit complications.',
        confidence: 76,
        risk: 'medium',
        timestamp: new Date()
      })
    }
    
    return responses
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return
    
    const userMessage = {
      role: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsProcessing(true)
    
    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponses = generateAIResponses(inputMessage)
      const aiMessage = {
        role: 'ai' as const,
        content: `I've analyzed your query and generated ${aiResponses.length} insights based on your current tax scenario.`,
        timestamp: new Date(),
        responses: aiResponses
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsProcessing(false)
    }, 1500)
  }

  const toggleListening = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(!isListening)
      // Speech recognition would be implemented here
    }
  }

  const getResponseIcon = (type: string) => {
    switch (type) {
      case 'calculation': return Calculator
      case 'recommendation': return Lightbulb
      case 'warning': return AlertTriangle
      case 'insight': return TrendingUp
      default: return Brain
    }
  }

  const getResponseColor = (type: string) => {
    switch (type) {
      case 'calculation': return 'border-blue-500 bg-blue-500/10'
      case 'recommendation': return 'border-green-500 bg-green-500/10'
      case 'warning': return 'border-yellow-500 bg-yellow-500/10'
      case 'insight': return 'border-purple-500 bg-purple-500/10'
      default: return 'border-slate-500 bg-slate-500/10'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tax Scenario Panel */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Current Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Annual Income</label>
              <Input
                type="number"
                value={currentScenario.income}
                onChange={(e) => setCurrentScenario(prev => ({...prev, income: Number(e.target.value)}))}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Filing Status</label>
              <select
                value={currentScenario.filingStatus}
                onChange={(e) => setCurrentScenario(prev => ({...prev, filingStatus: e.target.value as any}))}
                className="w-full p-2 rounded-md bg-slate-900 border border-slate-600 text-white"
              >
                <option value="single">Single</option>
                <option value="marriedJoint">Married Filing Jointly</option>
                <option value="marriedSeparate">Married Filing Separately</option>
                <option value="headOfHousehold">Head of Household</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300 mb-1 block">Retirement Contributions</label>
              <Input
                type="number"
                value={currentScenario.retirementContributions}
                onChange={(e) => setCurrentScenario(prev => ({...prev, retirementContributions: Number(e.target.value)}))}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Self-employed</span>
              <input
                type="checkbox"
                checked={currentScenario.selfEmployed}
                onChange={(e) => setCurrentScenario(prev => ({...prev, selfEmployed: e.target.checked}))}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Home Office</span>
              <input
                type="checkbox"
                checked={currentScenario.homeOffice}
                onChange={(e) => setCurrentScenario(prev => ({...prev, homeOffice: e.target.checked}))}
                className="rounded"
              />
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="text-lg font-bold text-white">
                Estimated Tax: ${calculateTax(currentScenario).toLocaleString()}
              </div>
              <div className="text-sm text-slate-300">
                Effective Rate: {(calculateTax(currentScenario) / currentScenario.income * 100).toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start border-blue-600 text-blue-400 hover:bg-blue-600/10"
              onClick={() => setInputMessage('Calculate my current tax liability')}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Current Tax
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start border-green-600 text-green-400 hover:bg-green-600/10"
              onClick={() => setInputMessage('Find tax optimization opportunities')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Optimize Taxes
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
              onClick={() => setInputMessage('Assess my audit risk factors')}
            >
              <Shield className="w-4 h-4 mr-2" />
              Risk Assessment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-800/50 border-slate-700 h-[700px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              AI Tax Advisor
              {isProcessing && (
                <div className="ml-auto flex items-center text-purple-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mr-2" />
                  Analyzing...
                </div>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-slate-700 text-slate-100'
                    } rounded-lg p-3`}>
                      <p>{message.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {/* AI Responses */}
                      {message.responses && (
                        <div className="mt-4 space-y-3">
                          {message.responses.map((response) => {
                            const IconComponent = getResponseIcon(response.type)
                            return (
                              <motion.div
                                key={response.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className={`border rounded-lg p-3 ${getResponseColor(response.type)}`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    <IconComponent className="w-4 h-4 mr-2" />
                                    <span className="font-medium text-sm">{response.title}</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {response.confidence}% confidence
                                  </Badge>
                                </div>
                                <p className="text-sm mb-2">{response.content}</p>
                                {response.savings && (
                                  <div className="flex items-center text-green-400 text-sm">
                                    <DollarSign className="w-3 h-3 mr-1" />
                                    Potential savings: ${response.savings.toLocaleString()}
                                  </div>
                                )}
                                {response.risk && (
                                  <div className={`text-xs mt-1 ${
                                    response.risk === 'high' ? 'text-red-400' : 
                                    response.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                  }`}>
                                    Risk Level: {response.risk.toUpperCase()}
                                  </div>
                                )}
                              </motion.div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about tax strategies, calculations, or compliance..."
                  className="bg-slate-900 border-slate-600 text-white resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={toggleListening}
                  size="sm"
                  variant={isListening ? "default" : "outline"}
                  className={isListening ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isProcessing}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
