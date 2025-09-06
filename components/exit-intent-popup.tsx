
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Gift, 
  Timer, 
  Star, 
  TrendingUp, 
  Shield,
  Phone,
  Mail,
  Sparkles,
  Crown,
  Zap,
  AlertTriangle
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
}

export function ExitIntentPopup({ isVisible, onClose }: ExitIntentPopupProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  useEffect(() => {
    if (isVisible && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isVisible, isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    
    // Simulate API call
    setTimeout(() => {
      window.open(`tel:${COMPANY_CONFIG.contact.phone}`, '_self')
    }, 2000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl relative overflow-hidden border-0 shadow-2xl">
        {/* Urgent Header */}
        <CardHeader className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white p-6 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-white animate-pulse" />
                <Badge className="bg-white/20 text-white border-0 font-bold">
                  ⏰ LIMITED TIME
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <CardTitle className="text-3xl font-bold mb-2">
              🛑 WAIT! Don't Miss Your $3,247!
            </CardTitle>
            <p className="text-white/90 text-lg">
              You're about to leave without claiming your FREE professional tax analysis
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {!isSubmitted ? (
            <>
              {/* Countdown Timer */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Timer className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 font-bold">This Offer Expires In:</span>
                </div>
                <div className="text-4xl font-bold text-red-600 animate-pulse">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-red-600 text-sm font-semibold mt-1">
                  After this, rates increase to $399!
                </p>
              </div>

              {/* Special Offer */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl mb-4">
                  <Gift className="h-6 w-6" />
                  EXCLUSIVE WEB-ONLY SPECIAL
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  FREE Professional Tax Analysis
                  <span className="block text-xl text-green-600">
                    + Guaranteed Maximum Refund Discovery
                  </span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-gray-900">$3,247</div>
                    <div className="text-sm text-gray-600">Average Extra Refund</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Accuracy Guarantee</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    🎯 Claim Your FREE Analysis Now
                  </h4>
                  <p className="text-gray-600">
                    Our CPA will call you within 15 minutes with your personalized refund estimate
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="popup-email" className="text-gray-700 font-semibold">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="popup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="popup-phone" className="text-gray-700 font-semibold">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="popup-phone"
                        type="tel"
                        placeholder="(855) 722-8700"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-16 text-xl font-bold ultra-button neon-glow"
                  disabled={!email || !phone}
                >
                  <Crown className="mr-3 h-6 w-6" />
                  YES! Get My FREE $3,247 Analysis
                  <Sparkles className="ml-3 h-6 w-6" />
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500">
                    ✅ No obligation • ✅ 100% secure • ✅ Results in 15 minutes
                  </p>
                  <p className="text-xs text-gray-400">
                    By submitting, you agree to receive calls/texts about your tax situation.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎉 Success! Your Analysis is Reserved
                </h3>
                <p className="text-gray-600 text-lg">
                  A certified CPA will call you at <strong>{phone}</strong> within the next 15 minutes!
                </p>
              </div>
              
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-3 justify-center mb-3">
                  <Gift className="h-6 w-6 text-yellow-600" />
                  <span className="font-bold text-yellow-800">BONUS UNLOCKED!</span>
                </div>
                <p className="text-yellow-800 font-semibold">
                  You'll also receive our exclusive "Tax Deduction Checklist" 
                  with 47 deductions most people miss!
                </p>
              </div>
              
              <Button 
                onClick={onClose}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
              >
                Perfect! I'll Wait for the Call
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Hook to detect exit intent
export function useExitIntent() {
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    let isExiting = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isExiting) {
        isExiting = true
        setShowExitIntent(true)
        setHasShown(true)
      }
    }

    const handleMouseEnter = () => {
      isExiting = false
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [hasShown])

  return {
    showExitIntent,
    setShowExitIntent,
    hasShown
  }
}
