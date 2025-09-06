
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  CheckCircle,
  Bot,
  Sparkles,
  MessageCircle,
  Mail,
  Phone,
  Smartphone,
  ArrowRight,
  Gift,
  Clock,
  Zap
} from 'lucide-react'

export default function MelikaAIWelcomePage() {
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    // Simulate activation check (in real app would verify with backend)
    const timer = setTimeout(() => setIsActivated(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Header */}
        <Card className="text-center mb-8 border-0 shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-black mb-4">
              🎉 Welcome to Melika AI!
            </CardTitle>
            <p className="text-xl text-green-50">
              Your AI Tax Assistant is now active and ready to help
            </p>
            <div className="mt-6">
              <Badge className="bg-white text-green-600 font-bold px-6 py-3 text-lg">
                <Gift className="h-5 w-5 mr-2" />
                First 3 months: try now • Then $19.99/month
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {!isActivated ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Setting up your AI assistant...</h3>
                <p className="text-gray-600">This will just take a moment</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-center mb-6">
                  <img 
                    src="/lmt-avatar.jpg" 
                    alt="Melika AI" 
                    className="w-20 h-20 rounded-full border-4 border-green-500"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Meet Melika, Your Personal Tax AI 🤖
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  I'm here to help with all your tax questions, 24/7. Let's get started!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How to Access Melika */}
        {isActivated && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6" />
                  Chat with Melika Now
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <span>Visit the AI Assistant page</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <span>Ask any tax question</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <span>Get instant expert answers</span>
                  </div>
                </div>
                <Link href="/ai-assistant" className="w-full mt-6 block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    Start Chatting with Melika
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Smartphone className="h-6 w-6" />
                  Multiple Ways to Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <span>Chat widget on any page</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <span>Text "ASK" to (855) 722-8700</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <span>Email: ai@lawsonmobiletax.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-purple-600" />
                    <span>Voice commands (coming soon)</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 border-purple-600 text-purple-600 hover:bg-purple-50">
                  Save Contact Info
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* What Melika Can Help With */}
        {isActivated && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                <Sparkles className="inline h-6 w-6 mr-2 text-yellow-500" />
                What Melika Can Help You With
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Deduction Discovery</h3>
                  <p className="text-gray-600 text-sm">Find every tax deduction you qualify for</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Tax Law Guidance</h3>
                  <p className="text-gray-600 text-sm">Complex tax rules explained simply</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Instant Answers</h3>
                  <p className="text-gray-600 text-sm">Get responses in seconds, not days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Example Questions */}
        {isActivated && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Try Asking Melika:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "What deductions can I claim as a freelancer?",
                  "When is the tax deadline for 2024?",
                  "Should I itemize or take the standard deduction?",
                  "How do I report cryptocurrency gains?",
                  "What business expenses are deductible?",
                  "Can I deduct my home office expenses?"
                ].map((question, index) => (
                  <button
                    key={index}
                    className="text-left p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all"
                    onClick={() => {
                      // This would open the AI chat with this question pre-filled
                      window.open(`/ai-assistant?q=${encodeURIComponent(question)}`, '_blank')
                    }}
                  >
                    <MessageCircle className="h-4 w-4 text-blue-600 mb-2" />
                    <p className="text-sm font-medium">{question}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {isActivated && (
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">You're All Set! 🚀</h2>
              <p className="text-lg text-gray-700 mb-6">
                Melika AI is ready to help you maximize your tax savings and answer any questions you have.
              </p>
              <div className="space-y-4">
                <Link href="/ai-assistant">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-xl">
                    <MessageCircle className="mr-3 h-6 w-6" />
                    Start Your First Chat
                  </Button>
                </Link>
                <div className="text-sm text-gray-600">
                  Questions about your subscription? Email support@lawsonmobiletax.com
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}
