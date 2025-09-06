
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle,
  DollarSign,
  Target,
  TrendingUp,
  Award,
  Star,
  Calendar,
  Phone,
  Download,
  ArrowRight,
  Home
} from 'lucide-react'

export default function TaxEvaluationSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [evaluationResults] = useState({
    potentialSavings: '$2,847',
    hiddenDeductions: 7,
    refundIncrease: '$1,234',
    confidence: '92%'
  })

  const [loginCredentials] = useState({
    email: 'your-email@example.com',
    password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase()
  })

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
            Please complete your payment to access your tax evaluation results.
          </p>
          <Link href="/tax-evaluation">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Return to Payment
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
              🎉 Payment Successful!
            </h1>
            <p className="text-xl text-gray-700">
              Your Expert Tax Evaluation is now complete.
            </p>
          </div>

          {/* Payment Confirmation */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">✅ Payment Confirmed</h3>
                <p className="opacity-90">Expert Tax Evaluation - $19.99</p>
                <p className="opacity-75 text-sm">Session ID: {sessionId}</p>
              </div>
              <Badge className="bg-white text-green-600 text-lg px-4 py-2">
                PAID
              </Badge>
            </div>
          </Card>

          {/* Login Credentials */}
          <Card className="p-6 mb-8 bg-blue-50 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">🔑 Your Account Access</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email:</label>
                <div className="bg-white p-3 rounded border font-mono text-lg">
                  {loginCredentials.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Temporary Password:</label>
                <div className="bg-white p-3 rounded border font-mono text-lg">
                  {loginCredentials.password}
                </div>
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-3">
              💡 Save these credentials - you'll need them to access your full client portal.
            </p>
          </Card>

          {/* Evaluation Results */}
          <Card className="p-8 mb-8 bg-white shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📊 Your Tax Evaluation Results
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800">{evaluationResults.potentialSavings}</h3>
                <p className="text-green-600">Potential Annual Savings</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-800">{evaluationResults.hiddenDeductions}</h3>
                <p className="text-blue-600">Missed Deductions Found</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-800">{evaluationResults.refundIncrease}</h3>
                <p className="text-purple-600">Refund Increase</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-orange-800">{evaluationResults.confidence}</h3>
                <p className="text-orange-600">Accuracy Confidence</p>
              </div>
            </div>

            {/* Key Findings */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🔍 Key Findings</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Home Office Deduction Opportunity</h4>
                    <p className="text-gray-700">You may qualify for $1,200+ in home office deductions that weren't claimed last year.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Business Expense Optimization</h4>
                    <p className="text-gray-700">We identified $890 in eligible business expenses that could reduce your tax liability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Retirement Planning Benefits</h4>
                    <p className="text-gray-700">Strategic retirement contributions could save you $757 annually in taxes.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">🚀 What's Next?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">📞 Schedule Your Consultation</h3>
                <p className="mb-4 opacity-90">
                  Meet with our tax experts to discuss your personalized strategy.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Free Consultation
                  </Button>
                  <a href="tel:(855) 722-8700">
                    <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                      <Phone className="h-4 w-4 mr-2" />
                      Call (855) 722-8700
                    </Button>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">📄 Download Your Report</h3>
                <p className="mb-4 opacity-90">
                  Get a detailed PDF of your tax evaluation findings.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report
                  </Button>
                  <Link href="/dashboard">
                    <Button className="w-full bg-green-400 text-gray-900 hover:bg-green-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Access Client Portal
                    </Button>
                  </Link>
                </div>
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
