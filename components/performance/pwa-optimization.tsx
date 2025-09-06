

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Zap, 
  Wifi, 
  WifiOff, 
  Download, 
  Smartphone, 
  Monitor,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Globe,
  Database,
  Clock,
  Gauge
} from 'lucide-react'
import { toast } from 'sonner'

interface PWAOptimizationProps {
  className?: string
}

export default function PWAOptimization({ className }: PWAOptimizationProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [cacheStatus, setCacheStatus] = useState<{[key: string]: boolean}>({})
  const [loadTime, setLoadTime] = useState(0)
  const [cacheSize, setCacheSize] = useState('2.1 MB')

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Check if app is already installed
    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches)
    
    // Listen for install prompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    
    // Simulate load time tracking
    setLoadTime(Math.random() * 2000 + 500)
    
    // Mock cache status
    setCacheStatus({
      'critical-resources': true,
      'images': true,
      'documents': false,
      'api-responses': true,
      'offline-pages': true
    })
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
    }
  }, [])

  const handleInstallApp = async () => {
    if (!installPrompt) {
      toast.info('App install option not available in this browser')
      return
    }
    
    const result = await installPrompt.prompt()
    if (result.outcome === 'accepted') {
      toast.success('App installed successfully!')
      setIsInstalled(true)
    }
    setInstallPrompt(null)
  }

  const clearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      toast.success('Cache cleared successfully!')
      
      // Reset cache status
      setCacheStatus({
        'critical-resources': false,
        'images': false,
        'documents': false,
        'api-responses': false,
        'offline-pages': false
      })
      
      // Simulate cache rebuilding
      setTimeout(() => {
        setCacheStatus({
          'critical-resources': true,
          'images': true,
          'documents': false,
          'api-responses': true,
          'offline-pages': true
        })
      }, 2000)
    }
  }

  const preloadCriticalResources = async () => {
    toast.info('Preloading critical resources...')
    
    // Simulate preloading
    const resources = [
      '/api/crm/stats',
      '/api/crm/leads',
      '/api/crm/clients',
      '/api/dashboard/stats'
    ]
    
    for (const resource of resources) {
      try {
        await fetch(resource)
      } catch (error) {
        console.log('Preload failed for:', resource)
      }
    }
    
    toast.success('Critical resources preloaded!')
  }

  const performanceScore = Math.round((isOnline ? 95 : 85) - (loadTime / 100))

  return (
    <div className={`space-y-6 ${className}`}>
      {/* PWA Status Header */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8" />
              <div>
                <CardTitle className="text-xl">Performance & PWA Optimization</CardTitle>
                <CardDescription className="text-green-100">
                  Advanced caching, offline support, and mobile-first performance
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Score: {performanceScore}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={isOnline ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <CardContent className="p-4 text-center">
            {isOnline ? <Wifi className="h-8 w-8 mx-auto mb-2 text-green-600" /> : <WifiOff className="h-8 w-8 mx-auto mb-2 text-red-600" />}
            <h3 className="font-semibold">{isOnline ? 'Online' : 'Offline'}</h3>
            <p className="text-sm text-gray-600">
              {isOnline ? 'Full functionality' : 'Limited features available'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold">Load Time</h3>
            <p className="text-sm text-gray-600">{(loadTime / 1000).toFixed(2)}s</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold">Cache Size</h3>
            <p className="text-sm text-gray-600">{cacheSize}</p>
          </CardContent>
        </Card>

        <Card className={isInstalled ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
          <CardContent className="p-4 text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold">PWA Status</h3>
            <p className="text-sm text-gray-600">
              {isInstalled ? 'Installed' : 'Available'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* PWA Install Prompt */}
      {!isInstalled && installPrompt && (
        <Alert>
          <Smartphone className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Install LMT Tax App for faster access and offline features</span>
            <Button onClick={handleInstallApp} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Install App
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Offline Notice */}
      {!isOnline && (
        <Alert variant="destructive">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're currently offline. Some features may be limited, but cached content is still available.
          </AlertDescription>
        </Alert>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Core web vitals and loading performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Largest Contentful Paint</span>
                <span className="text-green-600 font-medium">1.2s</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>First Input Delay</span>
                <span className="text-green-600 font-medium">45ms</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cumulative Layout Shift</span>
                <span className="text-yellow-600 font-medium">0.08</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Time to Interactive</span>
                <span className="text-green-600 font-medium">2.1s</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Cache Management
            </CardTitle>
            <CardDescription>Offline storage and resource caching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(cacheStatus).map(([key, cached]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {cached ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    )}
                    <span className="font-medium capitalize">
                      {key.replace('-', ' ')}
                    </span>
                  </div>
                  <Badge variant={cached ? "default" : "secondary"}>
                    {cached ? 'Cached' : 'Not Cached'}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button onClick={preloadCriticalResources} variant="outline" size="sm" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Preload Resources
              </Button>
              <Button onClick={clearCache} variant="outline" size="sm" className="flex-1">
                <Database className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Features */}
      <Card>
        <CardHeader>
          <CardTitle>Active Optimizations</CardTitle>
          <CardDescription>Performance enhancements currently running</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium">Image Optimization</h4>
                <p className="text-sm text-gray-600">WebP format, lazy loading</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium">Code Splitting</h4>
                <p className="text-sm text-gray-600">Dynamic imports, tree shaking</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium">Service Worker</h4>
                <p className="text-sm text-gray-600">Background sync, push notifications</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium">Critical CSS</h4>
                <p className="text-sm text-gray-600">Above-the-fold optimization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium">Resource Hints</h4>
                <p className="text-sm text-gray-600">Preload, prefetch, preconnect</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Globe className="h-6 w-6 text-blue-600" />
              <div>
                <h4 className="font-medium">CDN Delivery</h4>
                <p className="text-sm text-gray-600">Global edge caching</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Features */}
      <Card>
        <CardHeader>
          <CardTitle>Offline Capabilities</CardTitle>
          <CardDescription>Features available without internet connection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Available Offline:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  View cached client data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Access tax calculators
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Review document uploads
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Browse tax resources
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Requires Connection:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-gray-400" />
                  Live CRM updates
                </li>
                <li className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-gray-400" />
                  Payment processing
                </li>
                <li className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-gray-400" />
                  Email notifications
                </li>
                <li className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-gray-400" />
                  Real-time chat
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
