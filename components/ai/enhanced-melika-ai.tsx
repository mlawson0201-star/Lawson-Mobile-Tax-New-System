

'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Bot, 
  Mic, 
  MicOff, 
  Camera, 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Scan,
  Languages,
  Sparkles,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Globe,
  MessageSquare,
  Send,
  Download,
  RefreshCw,
  Volume2,
  VolumeX
} from 'lucide-react'
import { toast } from 'sonner'

// Mock OCR processing - in real app, would use Tesseract.js
const processOCR = async (file: File): Promise<string> => {
  // Simulate OCR processing
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  if (file.name.includes('w2')) {
    return `W-2 Form Detected:
- Employee: John Smith
- SSN: XXX-XX-1234
- Wages: $65,420.00
- Federal Tax Withheld: $8,205.50
- State Tax Withheld: $3,271.00
- Social Security Wages: $65,420.00`
  } else if (file.name.includes('1099')) {
    return `1099-MISC Form Detected:
- Recipient: Jane Doe
- SSN: XXX-XX-5678
- Non-employee Compensation: $15,750.00
- Federal Tax Backup Withholding: $0.00`
  } else if (file.name.includes('receipt')) {
    return `Receipt Detected:
- Date: March 15, 2024
- Merchant: Office Supply Store
- Amount: $247.83
- Category: Office Supplies
- Tax Deductible: Yes`
  }
  
  return 'Document processed successfully. Please review the extracted information and make any necessary corrections.'
}

// Mock speech recognition
const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('')
  const [listening, setListening] = useState(false)
  const [supported] = useState(typeof window !== 'undefined' && 'webkitSpeechRecognition' in window)

  const startListening = () => {
    setListening(true)
    // Simulate speech recognition
    setTimeout(() => {
      setTranscript("What are the tax deductions available for my home office expenses?")
      setListening(false)
    }, 2000)
  }

  const stopListening = () => {
    setListening(false)
  }

  return { transcript, listening, supported, startListening, stopListening, resetTranscript: () => setTranscript('') }
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  language?: string
  timestamp: Date
  attachments?: {
    type: 'image' | 'document'
    name: string
    processed?: boolean
    extractedText?: string
  }[]
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

export default function EnhancedMelikaAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '👋 Hello! I\'m Melika, your enhanced AI tax assistant. I can now:\n\n• 📄 Scan and extract data from tax documents (W-2s, 1099s, receipts)\n• 🎤 Understand voice commands in 8 languages\n• 💡 Provide personalized tax recommendations\n• 🌍 Communicate in multiple languages\n• 🧠 Learn from your tax situation for better advice\n\nHow can I help you today?',
      timestamp: new Date(),
      language: 'en'
    }
  ])
  
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [ocrProcessing, setOcrProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { transcript, listening, supported, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  // Handle voice input
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
    }
  }, [transcript])

  const handleSendMessage = async () => {
    if (!input.trim() && !transcript) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input || transcript,
      timestamp: new Date(),
      language: currentLanguage
    }

    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)
    setInput('')
    resetTranscript()

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
        language: currentLanguage
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsProcessing(false)
      
      // Text-to-speech if enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.content)
        utterance.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US'
        speechSynthesis.speak(utterance)
      }
    }, 1500)
  }

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase()
    
    if (q.includes('deduction') || q.includes('expense')) {
      return '💰 Based on your situation, here are relevant deductions:\n\n• Home office expenses (if you work from home)\n• Business meals (50% deductible)\n• Professional development and education\n• Health insurance premiums (if self-employed)\n• Vehicle expenses for business use\n\nWould you like me to analyze specific receipts or documents to maximize your deductions?'
    }
    
    if (q.includes('document') || q.includes('scan') || q.includes('upload')) {
      return '📄 I can help process your tax documents! I can scan and extract information from:\n\n• W-2 forms\n• 1099 forms (all types)\n• Receipts and invoices\n• Bank statements\n• Investment statements\n\nSimply upload or take a photo of your documents, and I\'ll extract the key information automatically.'
    }
    
    if (q.includes('refund') || q.includes('owe')) {
      return '🧮 Let me help estimate your tax situation:\n\n• Upload your W-2s and 1099s for instant analysis\n• I\'ll calculate potential refunds or payments\n• Get personalized strategies to minimize taxes\n• Receive deadline reminders and filing guidance\n\nThe more information you provide, the more accurate my estimates will be!'
    }
    
    return `🤖 I understand you're asking about "${question}". Let me provide you with comprehensive tax guidance:\n\n• I can analyze your specific tax situation\n• Provide personalized recommendations\n• Help with document processing and organization\n• Calculate potential savings and refunds\n\nWould you like me to dive deeper into any specific aspect of your tax situation?`
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setOcrProcessing(true)
    
    for (const file of Array.from(files)) {
      try {
        const extractedText = await processOCR(file)
        
        const userMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: `Uploaded document: ${file.name}`,
          timestamp: new Date(),
          attachments: [{
            type: file.type.startsWith('image/') ? 'image' : 'document',
            name: file.name,
            processed: true,
            extractedText
          }]
        }
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `✅ Successfully processed "${file.name}"!\n\n📋 Extracted Information:\n${extractedText}\n\n💡 I've automatically categorized this information. Would you like me to:\n• Add this to your tax summary\n• Suggest related deductions\n• Process additional documents`,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, userMessage, aiMessage])
        toast.success(`Document "${file.name}" processed successfully!`)
        
      } catch (error) {
        toast.error(`Error processing ${file.name}`)
      }
    }
    
    setOcrProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Enhanced AI Header */}
      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-12 w-12" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-2xl">Enhanced Melika AI</CardTitle>
                <CardDescription className="text-blue-100">
                  Advanced AI with OCR, Voice Recognition & Multi-Language Support
                </CardDescription>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <select 
                value={currentLanguage} 
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-black">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <Scan className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <h3 className="font-semibold">OCR Processing</h3>
          <p className="text-sm text-gray-600">Scan tax documents automatically</p>
        </Card>
        <Card className="text-center p-4">
          <Mic className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <h3 className="font-semibold">Voice Recognition</h3>
          <p className="text-sm text-gray-600">Ask questions by speaking</p>
        </Card>
        <Card className="text-center p-4">
          <Languages className="h-8 w-8 mx-auto mb-2 text-purple-500" />
          <h3 className="font-semibold">Multi-Language</h3>
          <p className="text-sm text-gray-600">Support for 8 languages</p>
        </Card>
        <Card className="text-center p-4">
          <Brain className="h-8 w-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold">Smart Learning</h3>
          <p className="text-sm text-gray-600">Learns your tax situation</p>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Document Upload
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Commands
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="p-6">
              <ScrollArea className="h-96 mb-4 border rounded-lg p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.attachments && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {attachment.type === 'image' ? <ImageIcon className="h-3 w-3 mr-1" /> : <FileText className="h-3 w-3 mr-1" />}
                                {attachment.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Melika is thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder={`Ask me anything in ${SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.name || 'English'}...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  {supported && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={listening ? stopListening : startListening}
                      className={listening ? 'bg-red-50 text-red-600' : ''}
                    >
                      {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                  <Button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    variant="outline"
                    size="sm"
                  >
                    {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={isProcessing}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {transcript && (
                <Alert className="mt-2">
                  <Mic className="h-4 w-4" />
                  <AlertDescription>
                    Voice input: "{transcript}"
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Upload Tax Documents</h3>
                  <p className="text-gray-600 mb-4">
                    I can process W-2s, 1099s, receipts, and other tax documents
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={ocrProcessing}
                      >
                        {ocrProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Processing Documents...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Documents
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Drag & drop files or click to browse<br />
                      Supports PDF, JPG, PNG (Max 10MB each)
                    </p>
                  </div>
                </div>

                {ocrProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing documents...</span>
                      <span>Extracting text data</span>
                    </div>
                    <Progress value={65} />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Voice Tab */}
            <TabsContent value="voice" className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Voice Commands</h3>
                  <p className="text-gray-600">
                    Speak naturally in {SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.name || 'English'}
                  </p>
                </div>

                {!supported && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Voice recognition is not supported in your browser. Please use Chrome, Safari, or Edge for voice features.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={listening ? stopListening : startListening}
                    disabled={!supported}
                    className={`w-32 h-32 rounded-full ${
                      listening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {listening ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {listening ? 'Listening... Speak now' : 'Click to start voice input'}
                  </p>
                </div>

                {/* Voice Commands Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Example Voice Commands</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Questions:</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• "What deductions can I claim?"</li>
                          <li>• "How much will my refund be?"</li>
                          <li>• "When is the tax deadline?"</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Commands:</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• "Calculate my estimated taxes"</li>
                          <li>• "Show me business deductions"</li>
                          <li>• "Upload my W-2 documents"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
