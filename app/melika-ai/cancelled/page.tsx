
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  XCircle,
  ArrowLeft,
  MessageCircle,
  Gift,
  Clock,
  Star
} from 'lucide-react'

export default function MelikaAICancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Cancellation Notice */}
        <Card className="text-center mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              Payment Cancelled
            </CardTitle>
            <p className="text-xl text-orange-50">
              Your Melika AI subscription was not activated
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No worries! 😊
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              You can still get help with your taxes through our free consultation 
              or try Melika AI anytime.
            </p>
          </CardContent>
        </Card>

        {/* What You're Missing */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">
              <Gift className="inline h-5 w-5 mr-2 text-yellow-500" />
              What You Would Have Gotten:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span>24/7 AI tax assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <span>Instant answers to tax questions</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Personalized deduction recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-purple-600" />
                <span>First 3 months for only try now</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Actions */}
        <div className="space-y-4">
          <Link href="/consultation/book" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-bold">
              <MessageCircle className="mr-3 h-5 w-5" />
              Book a FREE Tax Consultation Instead
            </Button>
          </Link>
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('triggerMelikaPopup'))}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-bold rounded-lg transition-all"
          >
            <Gift className="mr-3 h-5 w-5" />
            Try Ask Melika AI Again - try now!
          </button>

          <Link href="/welcome">
            <Button variant="outline" className="w-full py-4">
              <ArrowLeft className="mr-3 h-5 w-5" />
              Back to Homepage
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            Questions? We're here to help!
          </p>
          <div className="mt-2 space-x-4">
            <a href="tel:8552228700" className="text-blue-600 hover:underline">
              📞 (855) 722-8700
            </a>
            <a href="mailto:support@lawsonmobiletax.com" className="text-blue-600 hover:underline">
              📧 support@lawsonmobiletax.com
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
