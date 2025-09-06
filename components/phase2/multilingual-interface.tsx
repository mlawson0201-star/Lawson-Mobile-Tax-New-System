
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  Globe, 
  Mic, 
  Volume2, 
  Languages, 
  CheckCircle,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react'
import { toast } from 'sonner'

export default function MultiLanguageInterface() {
  const [supportedLanguages, setSupportedLanguages] = useState<any>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [translationText, setTranslationText] = useState('')
  const [translatedResult, setTranslatedResult] = useState<any>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    fetchSupportedLanguages()
  }, [])

  const fetchSupportedLanguages = async () => {
    try {
      const response = await fetch('/api/phase2/multilingual')
      const data = await response.json()
      
      if (data.success) {
        setSupportedLanguages(data.supported_languages)
      }
    } catch (error) {
      console.error('Failed to fetch supported languages:', error)
      toast.error('Failed to load language support')
    }
  }

  const handleTranslation = async () => {
    if (!translationText.trim()) {
      toast.error('Please enter text to translate')
      return
    }

    setIsTranslating(true)
    try {
      const response = await fetch('/api/phase2/multilingual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: translationText,
          fromLang: 'en',
          toLang: selectedLanguage
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setTranslatedResult(data)
        toast.success(`Translated to ${data.language_info.name}`)
      } else {
        toast.error(data.error || 'Translation failed')
      }
    } catch (error) {
      console.error('Translation error:', error)
      toast.error('Translation service unavailable')
    } finally {
      setIsTranslating(false)
    }
  }

  const simulateVoiceInput = () => {
    setIsListening(true)
    toast.info('Voice recognition active...')
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranslationText('I need help with my tax deductions this year')
      setIsListening(false)
      toast.success('Voice input captured')
    }, 2000)
  }

  const speakTranslation = () => {
    if (translatedResult?.translated_text) {
      // Simulate text-to-speech
      toast.success(`Speaking in ${translatedResult.language_info.name}`)
    }
  }

  const taxTermExamples = [
    { en: 'Tax Return', term: 'tax_return' },
    { en: 'Deduction', term: 'deduction' },
    { en: 'Income', term: 'income' },
    { en: 'Refund', term: 'refund' }
  ]

  if (!supportedLanguages) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Multi-Language Tax Platform</CardTitle>
              <CardDescription className="text-purple-100">
                Professional tax services in 8 languages with AI-powered translation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Selection & Translation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Real-Time Translation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Target Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(supportedLanguages).map(([code, info]: [string, any]) => (
                    <SelectItem key={code} value={code}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {code === 'en' ? '🇺🇸' : code === 'es' ? '🇪🇸' : code === 'fr' ? '🇫🇷' : 
                           code === 'de' ? '🇩🇪' : code === 'it' ? '🇮🇹' : code === 'pt' ? '🇧🇷' : 
                           code === 'zh' ? '🇨🇳' : '🇸🇦'}
                        </span>
                        {info.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Text (English)</label>
              <div className="relative">
                <Textarea
                  placeholder="Type or speak your tax question..."
                  value={translationText}
                  onChange={(e) => setTranslationText(e.target.value)}
                  className="min-h-24"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-2 right-2"
                  onClick={simulateVoiceInput}
                  disabled={isListening}
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleTranslation}
              disabled={isTranslating || !translationText.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Translating...
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Translate
                </>
              )}
            </Button>

            {translatedResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">
                    Translation Result ({translatedResult.language_info.name})
                  </span>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    {Math.round(translatedResult.confidence * 100)}% confident
                  </Badge>
                </div>
                <p className="text-lg text-green-900">{translatedResult.translated_text}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={speakTranslation}
                  className="text-green-700 border-green-300 hover:bg-green-100"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Speak Translation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tax Terminology */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Terms in Multiple Languages</CardTitle>
            <CardDescription>
              Common tax terminology translated for better client communication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {taxTermExamples.map((term, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{term.en}</span>
                  <Badge variant="outline">English</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedLanguage === 'es' && term.term === 'tax_return' && 'Declaración de Impuestos'}
                  {selectedLanguage === 'es' && term.term === 'deduction' && 'Deducción'}
                  {selectedLanguage === 'es' && term.term === 'income' && 'Ingresos'}
                  {selectedLanguage === 'es' && term.term === 'refund' && 'Reembolso'}
                  
                  {selectedLanguage === 'fr' && term.term === 'tax_return' && 'Déclaration de Revenus'}
                  {selectedLanguage === 'fr' && term.term === 'deduction' && 'Déduction'}
                  {selectedLanguage === 'fr' && term.term === 'income' && 'Revenus'}
                  {selectedLanguage === 'fr' && term.term === 'refund' && 'Remboursement'}
                  
                  {selectedLanguage === 'zh' && term.term === 'tax_return' && '税务申报'}
                  {selectedLanguage === 'zh' && term.term === 'deduction' && '扣除'}
                  {selectedLanguage === 'zh' && term.term === 'income' && '收入'}
                  {selectedLanguage === 'zh' && term.term === 'refund' && '退款'}
                  
                  {selectedLanguage === 'en' && term.en}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Language Support Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Global Reach & Language Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Supported Languages</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Translation Accuracy</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.3s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Multilingual Support</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
