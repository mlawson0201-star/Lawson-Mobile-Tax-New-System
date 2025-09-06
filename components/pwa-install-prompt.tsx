

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Smartphone, Download, Zap, Shield, Wifi } from 'lucide-react'
import { toast } from 'sonner'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if user has dismissed prompt before
    const dismissed = localStorage.getItem('pwa-prompt-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
      
      if (dismissedTime > oneDayAgo) {
        setDismissed(true)
        return
      }
    }

    // Listen for install prompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        if (!dismissed && !isInstalled) {
          setShowPrompt(true)
        }
      }, 5000)
    }

    // Listen for app install
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      toast.success('LMT Tax app installed successfully! 🎉')
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [dismissed, isInstalled])

  const handleInstall = async () => {
    if (!installPrompt) return

    try {
      await installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      
      if (outcome === 'accepted') {
        setShowPrompt(false)
        setIsInstalled(true)
      } else {
        handleDismiss()
      }
    } catch (error) {
      console.error('Install prompt error:', error)
      toast.error('Install not available in this browser')
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  const handleLater = () => {
    setShowPrompt(false)
    // Don't set as permanently dismissed, just hide for this session
  }

  if (isInstalled || !showPrompt || dismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-50 animate-in slide-in-from-bottom-4">
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Install LMT Tax App</h3>
                <p className="text-sm text-gray-600">Get the full experience</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center">
              <Zap className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <p className="text-xs text-gray-600">Faster</p>
            </div>
            <div className="text-center">
              <Shield className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <p className="text-xs text-gray-600">Secure</p>
            </div>
            <div className="text-center">
              <Wifi className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-600">Offline</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="secondary" className="text-xs">Receipt Capture</Badge>
            <Badge variant="secondary" className="text-xs">Push Notifications</Badge>
            <Badge variant="secondary" className="text-xs">Offline Access</Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              onClick={handleInstall}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Install
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLater}
              size="sm"
            >
              Later
            </Button>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            Free • No registration required • Works offline
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
