
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  X,
  Bot,
  Sparkles,
  CheckCircle,
  CreditCard,
  Clock,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { RealStripeService, STRIPE_PRODUCTS } from '@/lib/real-stripe-service'
import { toast } from 'sonner'

interface MelikaAIPopupProps {
  isOpen: boolean
  onClose: () => void
  triggerReason?: 'time_based' | 'page_visit' | 'manual' | 'service_interest'
}

export function MelikaAIPopup({ isOpen, onClose, triggerReason = 'manual' }: MelikaAIPopupProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

  // Auto-popup logic based on user behavior
  useEffect(() => {
    if (triggerReason === 'time_based') {
      // Show after 30 seconds on site
      const timer = setTimeout(() => {
        // Popup logic would go here
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [triggerReason])

  const handleStartTrial = async () => {
    if (!userEmail || !userName) {
      setShowEmailForm(true)
      return
    }

    setIsProcessing(true)
    
    try {
      // **REAL STRIPE CHECKOUT SESSION**
      const result = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productKey: 'melika_ai_intro',
          customerEmail: userEmail,
          customerName: userName,
          successUrl: `${window.location.origin}/melika-ai/welcome`,
          cancelUrl: `${window.location.origin}/melika-ai/cancelled`,
          metadata: {
            triggerReason,
            source: 'popup_conversion'
          }
        }),
      })

      const data = await result.json()

      if (data.success && data.url) {
        // Redirect to real Stripe checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Payment session creation failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Payment setup failed. Please try again or call (855) 722-8700')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowEmailForm(false)
    handleStartTrial()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl max-h-[95vh] border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 overflow-y-auto">
        
        {/* Header - Mobile Optimized */}
        <CardHeader className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 sm:p-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <img 
                src="/lmt-avatar.jpg" 
                alt="Melika AI" 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white"
              />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-black mb-2">
              Meet Melika AI Assistant 🤖
            </CardTitle>
            <p className="text-white/90 text-base sm:text-lg">
              Your Personal Tax Expert - Available 24/7
            </p>
          </div>

          {/* Special Offer Badge - Mobile Optimized */}
          <Badge className="bg-yellow-500 text-black font-bold px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-lg animate-pulse">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">LIMITED TIME: 50% OFF First 3 Months!</span>
            <span className="sm:hidden">50% OFF First 3 Months!</span>
          </Badge>
        </CardHeader>

        <CardContent className="p-4 sm:p-8">
          
          {/* Pricing Cards - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            
            {/* Intro Offer */}
            <Card className="border-2 border-green-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-bold">
                INTRO OFFER
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl font-black text-green-600 mb-2">try now</div>
                <div className="text-gray-600 mb-4">First 3 months</div>
                <div className="text-sm text-gray-500 line-through mb-2">Regular: $19.99/month</div>
                <Badge className="bg-green-100 text-green-800 mb-4">Save $30!</Badge>
              </div>
            </Card>

            {/* Regular Pricing */}
            <Card className="border border-gray-200">
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-gray-700 mb-2">$19.99</div>
                <div className="text-gray-600 mb-4">After intro period</div>
                <div className="text-sm text-gray-500 mb-2">Monthly subscription</div>
                <Badge className="bg-gray-100 text-gray-700">Cancel anytime</Badge>
              </div>
            </Card>
          </div>

          {/* Features - Mobile Optimized */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">What You Get with Melika AI:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {STRIPE_PRODUCTS.melika_ai_intro.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Propositions - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">24/7 Available</div>
              <div className="text-sm text-gray-600">Never wait for tax help</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">Instant Answers</div>
              <div className="text-sm text-gray-600">Get responses in seconds</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">CPA Trained</div>
              <div className="text-sm text-gray-600">Professional tax knowledge</div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-2">
              "Melika AI saved me $2,400 in taxes and answered all my questions instantly. 
              Best investment I've made!"
            </p>
            <div className="text-sm font-semibold text-gray-900">- Sarah M., Small Business Owner</div>
          </div>

          {/* Email Form (if needed) - Mobile Optimized */}
          {showEmailForm && (
            <form onSubmit={handleEmailSubmit} className="mb-4 sm:mb-6 p-4 sm:p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-lg">Start Your Melika AI Trial:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg font-bold">
                Continue to Secure Payment
              </Button>
            </form>
          )}

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleStartTrial}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 sm:py-6 text-lg sm:text-xl font-black rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Setting up your trial...
                </>
              ) : (
                <>
                  <CreditCard className="mr-3 h-6 w-6" />
                  Try Now - Start Trial
                  <ArrowRight className="ml-3 h-6 w-6" />
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <Shield className="h-4 w-4 inline mr-1" />
              Secure payment by Stripe • Cancel anytime • No hidden fees
            </div>

            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Maybe later
            </Button>
          </div>

          {/* Guarantees */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>✅ 30-day money-back guarantee</p>
            <p>✅ Cancel anytime, no questions asked</p>
            <p>✅ Your data is encrypted and secure</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// **POPUP TRIGGER LOGIC**
export function useMelikaAIPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Don't show if already shown in this session
    if (hasShown) return

    // Time-based trigger: Show after 45 seconds
    const timeTimer = setTimeout(() => {
      setShowPopup(true)
      setHasShown(true)
    }, 45000)

    // Intent-based trigger: Show when user tries to leave
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timeTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const triggerPopup = () => {
    setShowPopup(true)
    setHasShown(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return { showPopup, triggerPopup, closePopup }
}
