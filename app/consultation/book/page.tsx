
'use client'

import { useState } from 'react'
import { CalendarBooking } from '@/components/calendar-booking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar,
  Clock, 
  Shield,
  Award,
  Gift,
  CheckCircle,
  Star,
  Phone,
  Mail,
  User,
  DollarSign,
  Target,
  Zap
} from 'lucide-react'

export default function ConsultationBookingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/lmt-avatar.jpg" 
              alt="LMT CPA" 
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-600">Certified Tax Professional</div>
              <div className="text-lg font-bold text-gray-900">Free Consultation Available</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Schedule Your <span className="text-blue-600">FREE</span><br />
            Tax Consultation
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get personalized tax advice from a certified CPA. We'll analyze your situation, 
            find missed deductions, and show you exactly how much you could save.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              $299 Value - FREE
            </Badge>
            <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">
              <Shield className="h-5 w-5 mr-2" />
              Certified CPA
            </Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2 text-lg">
              <Award className="h-5 w-5 mr-2" />
              Avg. $3,247 Savings
            </Badge>
          </div>

          <Button
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all"
          >
            <Calendar className="mr-3 h-6 w-6" />
            Book Your FREE Consultation Now
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Maximize Your Refund</h3>
            <p className="text-gray-600 mb-4">
              Our CPAs find an average of $3,247 in additional refunds by discovering 
              deductions and credits you didn't know about.
            </p>
            <Badge className="bg-green-100 text-green-800">Guaranteed Results</Badge>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Expert CPA Guidance</h3>
            <p className="text-gray-600 mb-4">
              Work directly with certified public accountants who specialize in 
              maximizing refunds and minimizing tax liability.
            </p>
            <Badge className="bg-blue-100 text-blue-800">Certified Professionals</Badge>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Same-Day Service</h3>
            <p className="text-gray-600 mb-4">
              Get your consultation today and receive your personalized tax 
              strategy within 24 hours. Rush service available.
            </p>
            <Badge className="bg-purple-100 text-purple-800">Fast Turnaround</Badge>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="mb-12 border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center py-8">
            <CardTitle className="text-3xl font-bold mb-2">
              What You'll Get in Your FREE Consultation
            </CardTitle>
            <p className="text-gray-300 text-lg">
              A comprehensive 45-60 minute session worth $299 - completely free
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900">
                  📊 Complete Analysis
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Tax Situation Review</div>
                      <div className="text-gray-600">Thorough examination of your current tax circumstances and documentation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Deduction Discovery</div>
                      <div className="text-gray-600">Identify missed deductions and credits specific to your situation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Accurate Refund Estimate</div>
                      <div className="text-gray-600">Precise calculation of your expected refund or tax liability</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900">
                  🎯 Personalized Strategy
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Custom Tax Plan</div>
                      <div className="text-gray-600">Tailored recommendations based on your unique financial situation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Next Steps Timeline</div>
                      <div className="text-gray-600">Clear roadmap for maximizing your tax benefits this year</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Year-Round Planning</div>
                      <div className="text-gray-600">Strategies to minimize next year's taxes and maximize future refunds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "They found $4,200 in deductions I didn't even know I qualified for. 
                The consultation was incredibly detailed and professional."
              </p>
              <div className="text-sm font-semibold text-gray-900">- Sarah M., Small Business Owner</div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The CPA explained everything in plain English and helped me understand 
                my tax situation completely. Best tax service I've ever used."
              </p>
              <div className="text-sm font-semibold text-gray-900">- Mike R., W-2 Employee</div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Saved me over $5,000 in taxes and gave me a clear plan for next year. 
                The consultation alone was worth more than what I paid other preparers."
              </p>
              <div className="text-sm font-semibold text-gray-900">- Jennifer L., Real Estate Investor</div>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <Card className="text-center p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Maximize Your Tax Refund?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Book your free consultation now and discover how much you could save. 
            No obligations, just expert guidance.
          </p>
          <Button
            onClick={() => setShowBookingModal(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all"
          >
            <Calendar className="mr-3 h-6 w-6" />
            Schedule My FREE Consultation
          </Button>
          <div className="mt-4 text-sm opacity-75">
            ⏰ Available today • 📞 45-60 minute call • 💰 Average savings: $3,247
          </div>
        </Card>

      </div>

      {/* Booking Modal */}
      <CalendarBooking 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  )
}
