

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Smartphone, 
  Camera, 
  MapPin, 
  Bell, 
  Download,
  Upload,
  Scan,
  Navigation,
  Wifi,
  Battery,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Share,
  Eye,
  Settings,
  Zap,
  Shield,
  Globe,
  Image as ImageIcon,
  FileText,
  Receipt,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

interface MobileEnhancementsProps {
  className?: string
}

// Mock data for demonstration
const mockReceipts = [
  { id: '1', name: 'Office Supplies Receipt', amount: 247.83, category: 'Business Expense', date: '2024-01-15', processed: true },
  { id: '2', name: 'Gas Station Receipt', amount: 45.67, category: 'Vehicle Expense', date: '2024-01-14', processed: false },
  { id: '3', name: 'Restaurant Receipt', amount: 89.24, category: 'Business Meal', date: '2024-01-13', processed: true }
]

export default function MobileEnhancements({ className }: MobileEnhancementsProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const [pushEnabled, setPushEnabled] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)
  const [mileageTracking, setMileageTracking] = useState(false)
  const [capturedImages, setCapturedImages] = useState<string[]>([])
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced')

  useEffect(() => {
    // Check for push notification support
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setPushEnabled(Notification.permission === 'granted')
    }

    // Check online status
    const handleOnline = () => {
      setOfflineMode(false)
      setSyncStatus('syncing')
      setTimeout(() => setSyncStatus('synced'), 2000)
    }
    const handleOffline = () => {
      setOfflineMode(true)
      setSyncStatus('offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const requestPushPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setPushEnabled(permission === 'granted')
      
      if (permission === 'granted') {
        toast.success('Push notifications enabled!')
        // Show sample notification
        new Notification('LMT Tax App', {
          body: 'You\'ll now receive important tax deadline reminders',
          icon: '/lmt-avatar.jpg'
        })
      }
    }
  }

  const captureReceipt = () => {
    setIsCapturing(true)
    
    // Simulate camera capture
    setTimeout(() => {
      const newImage = `/api/placeholder/300/400?text=Receipt${capturedImages.length + 1}`
      setCapturedImages(prev => [...prev, newImage])
      setIsCapturing(false)
      toast.success('Receipt captured! Processing OCR...')
      
      // Simulate OCR processing
      setTimeout(() => {
        toast.success('Receipt processed and categorized automatically!')
      }, 2000)
    }, 1500)
  }

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          toast.success('Location captured for mileage tracking!')
        },
        (error) => {
          toast.error('Unable to get location. Please enable location services.')
        }
      )
    }
  }

  const startMileageTracking = () => {
    setMileageTracking(true)
    getCurrentLocation()
    toast.success('Mileage tracking started!')
  }

  const stopMileageTracking = () => {
    setMileageTracking(false)
    toast.success('Mileage tracking stopped. 12.4 miles recorded.')
  }

  const shareDocument = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tax Document',
        text: 'Check out this tax document from LMT',
        url: window.location.href
      })
    } else {
      toast.success('Document link copied to clipboard!')
    }
  }

  const syncData = () => {
    setSyncStatus('syncing')
    setTimeout(() => {
      setSyncStatus('synced')
      toast.success('All data synced successfully!')
    }, 2000)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Mobile Features Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl">Mobile Enhancements</CardTitle>
                <CardDescription className="text-purple-100">
                  Advanced mobile features for seamless tax management
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-purple-700">
              {offlineMode ? 'Offline' : 'Online'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Connection Status */}
      {offlineMode && (
        <Alert>
          <Wifi className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>You're offline. Changes will sync when connection is restored.</span>
            <Button onClick={syncData} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Mobile Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <Camera className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <h3 className="font-semibold">Receipt Capture</h3>
          <p className="text-sm text-gray-600">Auto-scan & categorize</p>
          <Badge className="mt-2" variant="outline">OCR Ready</Badge>
        </Card>

        <Card className="text-center p-4">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <h3 className="font-semibold">Mileage Tracking</h3>
          <p className="text-sm text-gray-600">GPS-based logging</p>
          <Badge className="mt-2" variant={mileageTracking ? "default" : "outline"}>
            {mileageTracking ? 'Active' : 'Stopped'}
          </Badge>
        </Card>

        <Card className="text-center p-4">
          <Bell className="h-8 w-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold">Push Notifications</h3>
          <p className="text-sm text-gray-600">Tax deadline alerts</p>
          <Badge className="mt-2" variant={pushEnabled ? "default" : "outline"}>
            {pushEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </Card>

        <Card className="text-center p-4">
          <Download className="h-8 w-8 mx-auto mb-2 text-purple-500" />
          <h3 className="font-semibold">Offline Mode</h3>
          <p className="text-sm text-gray-600">Work without internet</p>
          <Badge className="mt-2" variant="outline">Always Ready</Badge>
        </Card>
      </div>

      {/* Mobile Features Tabs */}
      <Tabs defaultValue="capture" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-max min-w-full">
            <TabsTrigger value="capture" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Receipt Capture
            </TabsTrigger>
            <TabsTrigger value="mileage" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Mileage Tracking
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Offline Features
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Receipt Capture Tab */}
        <TabsContent value="capture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Receipt Capture</CardTitle>
              <CardDescription>
                Take photos of receipts for automatic processing and categorization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <Button 
                    onClick={captureReceipt}
                    disabled={isCapturing}
                    size="lg"
                  >
                    {isCapturing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Capture Receipt
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Auto-detect text, amount, and category
                  </p>
                </div>
              </div>

              {/* Captured Receipts */}
              {capturedImages.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Recently Captured</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {capturedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <Receipt className="h-8 w-8 text-gray-400" />
                        </div>
                        <Badge className="absolute -top-2 -right-2" variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Processed
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Receipts List */}
              <div className="space-y-3">
                <h4 className="font-medium">Recent Receipts</h4>
                {mockReceipts.map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{receipt.name}</p>
                        <p className="text-sm text-gray-600">{receipt.category}</p>
                        <p className="text-xs text-gray-500">{receipt.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${receipt.amount}</p>
                      <Badge variant={receipt.processed ? "default" : "secondary"}>
                        {receipt.processed ? 'Processed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mileage Tracking Tab */}
        <TabsContent value="mileage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GPS Mileage Tracking</CardTitle>
              <CardDescription>
                Automatically track business miles with GPS precision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`p-8 rounded-lg ${mileageTracking ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
                  <MapPin className={`h-16 w-16 mx-auto mb-4 ${mileageTracking ? 'text-green-600' : 'text-gray-400'}`} />
                  
                  {mileageTracking ? (
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-green-700">Tracking Active</p>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <span>Distance: 12.4 miles</span>
                        <span>Duration: 23 min</span>
                      </div>
                      <Button 
                        onClick={stopMileageTracking}
                        variant="destructive"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Stop Tracking
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-lg font-semibold">Start Mileage Tracking</p>
                      <Button 
                        onClick={startMileageTracking}
                        size="lg"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Start Tracking
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {location && (
                <Alert>
                  <MapPin className="h-4 w-4" />
                  <AlertDescription>
                    Current location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </AlertDescription>
                </Alert>
              )}

              {/* Recent Trips */}
              <div className="space-y-3">
                <h4 className="font-medium">Recent Trips</h4>
                {[
                  { date: '2024-01-15', from: 'Office', to: 'Client Meeting', miles: 8.4, purpose: 'Business' },
                  { date: '2024-01-14', from: 'Home', to: 'Bank', miles: 3.2, purpose: 'Business' },
                  { date: '2024-01-13', from: 'Office', to: 'Supplier', miles: 12.7, purpose: 'Business' }
                ].map((trip, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Navigation className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{trip.from} → {trip.to}</p>
                        <p className="text-sm text-gray-600">{trip.purpose} • {trip.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{trip.miles} miles</p>
                      <Badge variant="outline">Deductible</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Stay informed about tax deadlines, document requests, and important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!pushEnabled && (
                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>Enable notifications for tax deadline reminders</span>
                    <Button onClick={requestPushPermission} size="sm">
                      Enable
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* Notification Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Tax Deadline Reminders</p>
                      <p className="text-sm text-gray-600">Quarterly and annual filing deadlines</p>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Document Requests</p>
                      <p className="text-sm text-gray-600">When additional documents are needed</p>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Service Updates</p>
                      <p className="text-sm text-gray-600">Progress on your tax returns</p>
                    </div>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="space-y-3">
                <h4 className="font-medium">Recent Notifications</h4>
                {[
                  { time: '2 hours ago', title: 'Q1 Tax Deadline Approaching', message: '10 days remaining for quarterly filing' },
                  { time: '1 day ago', title: 'Document Upload Complete', message: 'Your W-2 has been processed' },
                  { time: '3 days ago', title: 'Tax Return Status Update', message: 'Your return has been e-filed' }
                ].map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offline Features Tab */}
        <TabsContent value="offline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offline Capabilities</CardTitle>
              <CardDescription>
                Continue working even without internet connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sync Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <RefreshCw className={`h-5 w-5 ${syncStatus === 'syncing' ? 'animate-spin text-blue-600' : syncStatus === 'synced' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-medium">
                      {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'synced' ? 'All data synced' : 'Offline mode'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Last sync: {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button onClick={syncData} variant="outline" size="sm" disabled={syncStatus === 'syncing'}>
                  Sync Now
                </Button>
              </div>

              {/* Offline Features */}
              <div className="space-y-3">
                <h4 className="font-medium">Available Offline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>View client information</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Capture receipts</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Track mileage</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Use tax calculators</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span>Real-time updates</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span>Payment processing</span>
                  </div>
                </div>
              </div>

              {/* Storage Usage */}
              <div className="space-y-3">
                <h4 className="font-medium">Local Storage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cached Data</span>
                    <span>2.4 MB / 50 MB</span>
                  </div>
                  <Progress value={4.8} className="h-2" />
                  <p className="text-xs text-gray-600">
                    Storing essential data locally for offline access
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share App
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
