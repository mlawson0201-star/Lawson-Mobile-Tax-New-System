
'use client'

import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Flame, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Timer,
  Zap,
  Target
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export function UrgencyBanner() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [slotsLeft, setSlotsLeft] = useState(12)
  const [recentBookings, setRecentBookings] = useState(3)

  const urgencyMessages = [
    {
      icon: Flame,
      text: "🔥 URGENT: Tax rates increase 40% after March 1st - Lock in current pricing!",
      color: "from-red-500 to-orange-500",
      action: "Save $600 Now"
    },
    {
      icon: Users,
      text: `⚡ ONLY ${slotsLeft} priority slots remaining this week - Don't miss out!`,
      color: "from-purple-500 to-pink-500", 
      action: "Reserve My Spot"
    },
    {
      icon: Timer,
      text: "🎯 LIMITED TIME: FREE $3,247 analysis expires at midnight!",
      color: "from-yellow-500 to-red-500",
      action: "Claim Now"
    },
    {
      icon: TrendingUp,
      text: `💰 ${recentBookings} people claimed their max refund in the last hour!`,
      color: "from-green-500 to-blue-500",
      action: "Join Them"
    }
  ]

  useEffect(() => {
    // Rotate messages every 5 seconds
    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % urgencyMessages.length)
    }, 5000)

    // Simulate slot countdown
    const slotTimer = setInterval(() => {
      setSlotsLeft(prev => prev > 8 ? prev - 1 : 12) // Reset at 8 to maintain urgency
    }, 180000) // Every 3 minutes

    // Simulate booking activity
    const bookingTimer = setInterval(() => {
      setRecentBookings(prev => Math.floor(Math.random() * 5) + 1)
    }, 60000) // Every minute

    return () => {
      clearInterval(messageTimer)
      clearInterval(slotTimer)
      clearInterval(bookingTimer)
    }
  }, [])

  const currentMsg = urgencyMessages[currentMessage]

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <currentMsg.icon className="h-6 w-6 animate-pulse text-white" />
            <span className="font-bold text-lg animate-pulse">
              {currentMsg.text}
            </span>
            <Badge className="bg-white/20 text-white border-0 animate-bounce">
              HOT
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Live counter */}
            <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {slotsLeft} spots left
              </span>
            </div>
            
            <Button
              size="sm"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold shadow-lg neon-glow"
              onClick={() => {
                const element = document.getElementById('refund-calculator')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Zap className="mr-1 h-4 w-4" />
              {currentMsg.action}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ScarcityIndicators() {
  const [currentClients, setCurrentClients] = useState(847)
  const [todayBookings, setTodayBookings] = useState(23)

  useEffect(() => {
    // Simulate real-time client activity
    const interval = setInterval(() => {
      setCurrentClients(prev => prev + Math.floor(Math.random() * 3))
      setTodayBookings(prev => prev + (Math.random() > 0.7 ? 1 : 0))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
      <div className="text-center space-y-4">
        <h4 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Target className="h-6 w-6 text-red-500" />
          High Demand Alert
        </h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-semibold text-gray-600">ACTIVE NOW</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{currentClients.toLocaleString()}</div>
            <div className="text-xs text-gray-600">people getting help</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-xs font-semibold text-gray-600">TODAY</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{todayBookings}</div>
            <div className="text-xs text-gray-600">consultations booked</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-semibold text-gray-600">AVERAGE SAVED</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">$3,247</div>
            <div className="text-xs text-gray-600">per client</div>
          </div>
        </div>
        
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 animate-pulse" />
            <span className="font-bold text-yellow-800">LIMITED AVAILABILITY</span>
          </div>
          <p className="text-sm text-yellow-700">
            Due to high demand, new client consultations are currently booking 
            <strong> 2-3 weeks out</strong>. However, we've reserved emergency slots 
            for website visitors - available for <strong>the next 4 hours only</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}

export function SocialProofTicker() {
  const [currentProof, setCurrentProof] = useState(0)

  const socialProofs = [
    "💰 Sarah M. from Austin just saved $4,250 with our professional service!",
    "🎯 Mike T. from Seattle discovered $3,100 in missed deductions!",
    "⭐ Jennifer R. from Miami: 'Best tax service I've ever used - saved me $2,800!'",
    "🔥 David L. from Phoenix got a $5,400 refund instead of owing $1,200!",
    "💎 Maria G. from Denver: '10x better than TurboTax - found $3,600 more!'",
    "🏆 Robert K. from Atlanta avoided a $12,000 audit penalty with our help!"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProof((prev) => (prev + 1) % socialProofs.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="font-semibold text-white animate-fade-in">
          {socialProofs[currentProof]}
        </span>
      </div>
    </div>
  )
}
