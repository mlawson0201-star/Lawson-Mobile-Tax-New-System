
'use client'

import { useEffect, useState } from 'react'
import { MelikaAIPopup } from './melika-ai-popup'
import { usePathname } from 'next/navigation'

export function MelikaAIGlobalWrapper() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShownInSession, setHasShownInSession] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Don't show on certain pages
    const excludePaths = ['/auth/', '/admin/', '/crm', '/dashboard']
    if (excludePaths.some(path => pathname.startsWith(path))) {
      return
    }

    // Don't show if already shown in this session
    if (hasShownInSession) return

    // Time-based trigger: Show after 45 seconds
    const timeTimer = setTimeout(() => {
      if (!hasShownInSession) {
        setShowPopup(true)
        setHasShownInSession(true)
      }
    }, 45000)

    // Exit-intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownInSession) {
        setShowPopup(true)
        setHasShownInSession(true)
      }
    }

    // Scroll trigger: Show after scrolling 70% of page
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 70 && !hasShownInSession) {
        setShowPopup(true)
        setHasShownInSession(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timeTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasShownInSession, pathname])

  // Also provide global trigger for manual activation
  useEffect(() => {
    // Listen for custom events to trigger popup
    const handleTriggerPopup = () => {
      setShowPopup(true)
      setHasShownInSession(true)
    }

    window.addEventListener('triggerMelikaPopup', handleTriggerPopup)
    return () => window.removeEventListener('triggerMelikaPopup', handleTriggerPopup)
  }, [])

  return (
    <>
      <MelikaAIPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        triggerReason={hasShownInSession ? 'manual' : 'time_based'}
      />
      
      {/* Global Melika AI trigger button - Mobile First */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => {
            setShowPopup(true)
            setHasShownInSession(true)
          }}
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
          style={{ padding: '12px 16px' }}
          title="Ask Melika AI - Try now for free!"
          aria-label="Try Ask Melika AI Assistant"
        >
          <div className="flex items-center gap-2">
            <img 
              src="/lmt-avatar.jpg" 
              alt="Melika AI" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0"
              style={{ minWidth: '32px', minHeight: '32px' }}
              onError={(e) => {
                const target = e.currentTarget;
                target.src = "/lmt-logo-64.png";
                target.className = "w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-white shadow-sm flex-shrink-0";
                target.style.minWidth = '32px';
                target.style.minHeight = '32px';
              }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base leading-tight">Ask Melika AI</span>
              <span className="text-xs text-blue-100 leading-tight">Try now</span>
            </div>
          </div>
          
          {/* Enhanced notification badge */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-lg border-2 border-white">
            FREE
          </div>
        </button>
      </div>
    </>
  )
}

// Helper function to manually trigger the popup from anywhere
export const triggerMelikaPopup = () => {
  window.dispatchEvent(new CustomEvent('triggerMelikaPopup'))
}
