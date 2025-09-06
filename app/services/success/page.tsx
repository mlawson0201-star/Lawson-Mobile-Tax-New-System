
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle,
  Calendar,
  Phone,
  Download,
  ArrowRight,
  Home,
  FileText,
  Users,
  Clock,
  Shield,
  Star
} from 'lucide-react'

export default function ServicesSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const serviceId = searchParams.get('service_id')
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [serviceDetails, setServiceDetails] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Verify payment with backend
      const verifyPayment = async () => {
        try {
          const response = await fetch(`/api/payments/verify-session?session_id=${sessionId}`)
          const data = await response.json()
          
          if (data.success) {
            setPaymentVerified(true)
            // Load service details based on serviceId
            loadServiceDetails()
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
  }, [sessionId, serviceId])

  const loadServiceDetails = () => {
    // This would come from the service pricing data
    const serviceMapping: Record<string, any> = {
      'simple-1040': {
        name: 'Simple Personal Return',
        price: 199,
        description: 'Individual tax return preparation',
        nextSteps: [
          'Upload your tax documents via secure portal',
          'CPA will review and prepare your return',
          'You\'ll receive your completed return within 24-48 hours',
          'E-filing and direct deposit included'
        ],
        timeline: '24-48 hours',
        includes: ['W-2 processing', 'Standard deductions', 'E-filing', 'Direct deposit setup']
      },
      'complex-personal': {
        name: 'Complex Personal Return',
        price: 349,
        description: 'Advanced individual tax preparation',
        nextSteps: [
          'Consultation call to discuss complex items',
          'Document collection and review',
          'Comprehensive tax preparation',
          'Review call before filing'
        ],
        timeline: '3-5 business days',
        includes: ['Multiple income sources', 'Itemized deductions', 'Tax planning advice', 'Audit support']
      },
      'business-small': {
        name: 'Small Business Return',
        price: 599,
        description: 'Complete small business tax preparation',
        nextSteps: [
          'Business consultation to understand operations',
          'Bookkeeping review and cleanup',
          'Business tax return preparation',
          'Tax planning for next year'
        ],
        timeline: '5-7 business days',
        includes: ['Business income/expenses', 'Quarterly estimates', 'Business deductions', 'Planning session']
      }
    }

    setServiceDetails(serviceMapping[serviceId || ''] || {
      name: 'Professional Tax Service',
      price: 0,
      description: 'Comprehensive tax preparation',
      nextSteps: ['Service will be customized for your needs'],
      timeline: 'Will be determined during consultation',
      includes: ['Professional tax preparation', 'Expert review', 'Filing support']
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Verifying your payment...</p>
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
            Please complete your payment to access your tax service.
          </p>
          <Link href="/services">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Return to Services
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
              🎉 Service Payment Successful!
            </h1>
            <p className="text-xl text-gray-700">
              Your tax service has been purchased and we're ready to help you.
            </p>
          </div>

          {/* Payment Confirmation */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">✅ Payment Confirmed</h3>
                <p className="opacity-90">{serviceDetails?.name} - ${serviceDetails?.price}</p>
                <p className="opacity-75 text-sm">Session ID: {sessionId}</p>
              </div>
              <Badge className="bg-white text-green-600 text-lg px-4 py-2">
                PAID
              </Badge>
            </div>
          </Card>

          {/* Service Details */}
          <Card className="p-8 mb-8 bg-white shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📋 Your Tax Service Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Service Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Service:</span>
                    <span>{serviceDetails?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Amount Paid:</span>
                    <span className="text-green-600 font-bold">${serviceDetails?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Timeline:</span>
                    <span>{serviceDetails?.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Status:</span>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">✅ What's Included</h3>
                <div className="space-y-2">
                  {serviceDetails?.includes?.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  )) || (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Professional tax preparation</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🚀 Next Steps</h3>
              <div className="space-y-4">
                {serviceDetails?.nextSteps?.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-blue-800">{step}</p>
                  </div>
                )) || (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-blue-800">Our team will contact you within 24 hours to begin your service.</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">📞 We're Ready to Help!</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">📞 Talk to an Expert</h3>
                <p className="mb-4 opacity-90">
                  Have questions? Speak with our tax professionals now.
                </p>
                <a href="tel:(855) 722-8700">
                  <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (855) 722-8700
                  </Button>
                </a>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">📋 Schedule Consultation</h3>
                <p className="mb-4 opacity-90">
                  Book a time that works best for you.
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Now
                </Button>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">🏠 Client Portal</h3>
                <p className="mb-4 opacity-90">
                  Access your documents and track progress.
                </p>
                <Link href="/dashboard">
                  <Button className="w-full bg-green-400 text-gray-900 hover:bg-green-300">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Access Portal
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Support Information */}
          <Card className="p-6 mt-8 bg-gray-50">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Our support team is available Monday-Friday 8am-8pm EST
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="mailto:support@lawsonmobiletax.com">
                  <Button variant="outline">
                    📧 Email Support
                  </Button>
                </Link>
                <Link href="/welcome">
                  <Button variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
