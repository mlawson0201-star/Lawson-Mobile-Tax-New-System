
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle,
  ArrowRight,
  Home,
  Users,
  FileText,
  Calendar,
  Phone
} from 'lucide-react'

export default function CRMPaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const clientId = searchParams.get('client_id')
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Verify payment with backend
      const verifyPayment = async () => {
        try {
          const response = await fetch(`/api/payments/verify-session?session_id=${sessionId}`)
          const data = await response.json()
          
          if (data.success) {
            setPaymentVerified(true)
          }
        } catch (error) {
          console.error('Payment verification failed:', error)
        } finally {
          setLoading(false)
        }
      }
      
      verifyPayment()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Verifying payment...</p>
        </div>
      </div>
    )
  }

  if (!sessionId || !paymentVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Required</h1>
          <p className="text-gray-700 mb-6">
            Please complete your payment to process this client transaction.
          </p>
          <Link href="/crm/clients">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Return to Client Management
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/20 to-purple-50/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🎉 Client Payment Successful!
            </h1>
            <p className="text-xl text-gray-700">
              The payment has been processed and recorded in your CRM system.
            </p>
          </div>

          {/* Payment Confirmation */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">✅ CRM Payment Confirmed</h3>
                <p className="opacity-90">Client payment processed successfully</p>
                <p className="opacity-75 text-sm">Session ID: {sessionId}</p>
                {clientId && <p className="opacity-75 text-sm">Client ID: {clientId}</p>}
              </div>
              <Badge className="bg-white text-green-600 text-lg px-4 py-2">
                PAID
              </Badge>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-8 mb-8 bg-white shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📋 Payment Recorded Successfully
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">💼 CRM Updated</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-blue-800">Payment recorded in client profile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-blue-800">Client status updated automatically</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-blue-800">Payment history logged</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-blue-800">Revenue metrics updated</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">📊 Automated Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-green-800">Receipt generated and emailed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-green-800">Client notification sent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-green-800">Tax return status updated</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-green-800">Follow-up tasks created</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">🚀 What's Next?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">👥 Back to CRM</h3>
                <p className="mb-4 opacity-90">
                  Continue managing your clients and revenue.
                </p>
                <Link href="/crm/clients">
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                    <Users className="h-4 w-4 mr-2" />
                    Client Management
                  </Button>
                </Link>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">📋 View Client</h3>
                <p className="mb-4 opacity-90">
                  View the updated client profile and payment history.
                </p>
                <Link href={clientId ? `/crm/clients/${clientId}` : '/crm/clients'}>
                  <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                    <FileText className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">📊 Dashboard</h3>
                <p className="mb-4 opacity-90">
                  See your updated revenue and business metrics.
                </p>
                <Link href="/dashboard">
                  <Button className="w-full bg-green-400 text-gray-900 hover:bg-green-300">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Home Link */}
          <div className="text-center mt-8">
            <Link href="/welcome">
              <Button variant="outline" className="bg-white">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
