
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  Star,
  Zap,
  Gift,
  Crown,
  Shield,
  Award
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

interface TimeSlot {
  time: string
  available: boolean
  popular?: boolean
  urgent?: boolean
}

interface CalendarBookingProps {
  isOpen: boolean
  onClose: () => void
}

export function CalendarBooking({ isOpen, onClose }: CalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    taxSituation: ''
  })
  const [currentStep, setCurrentStep] = useState(1) // 1: date/time, 2: info, 3: confirmation
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true, popular: true },
    { time: '9:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true, urgent: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '1:00 PM', available: true, popular: true },
    { time: '1:30 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '2:30 PM', available: false },
    { time: '3:00 PM', available: true, urgent: true },
    { time: '3:30 PM', available: true },
    { time: '4:00 PM', available: true, popular: true },
    { time: '4:30 PM', available: true },
    { time: '5:00 PM', available: true },
    { time: '5:30 PM', available: false }
  ]

  const getNextAvailableDates = () => {
    const dates = []
    for (let i = 0; i < 14; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      // Skip weekends for this demo
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
      }
    }
    return dates.slice(0, 7) // Show 7 weekdays
  }

  const availableDates = getNextAvailableDates()

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime('') // Reset time when date changes
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleNext = () => {
    if (currentStep === 1 && selectedDate && selectedTime) {
      setCurrentStep(2)
    } else if (currentStep === 2 && clientInfo.name && clientInfo.phone && clientInfo.email) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // **REAL BOOKING API INTEGRATION**
      const bookingData = {
        name: clientInfo.name,
        phone: clientInfo.phone,
        email: clientInfo.email,
        date: selectedDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        }),
        time: selectedTime,
        taxSituation: clientInfo.taxSituation,
        source: 'CONSULTATION_BOOKING_WIDGET'
      }

      const response = await fetch('/api/consultation/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()

      if (response.ok) {
        // Success - move to confirmation step
        setCurrentStep(3)
        
        // **AUTOMATED WORKFLOW INITIATED**
        console.log('✅ Consultation booked successfully:', result)
        console.log('🚀 Automated workflow started for:', clientInfo.email)
        
      } else {
        // Error handling
        console.error('Booking failed:', result.error)
        alert('Booking failed: ' + result.error + '\n\nPlease call us directly at (855) 722-8700 for immediate assistance.')
      }

    } catch (error) {
      console.error('Network error:', error)
      alert('Connection error. Please check your internet and try again, or call us directly at (855) 722-8700.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl my-8 border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                🗓️ Schedule Your FREE Tax Consultation
              </CardTitle>
              <p className="text-white/90 text-lg">
                Book directly with a certified CPA - Average savings: $3,247
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4 mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? 'bg-white text-primary' : 'bg-white/30 text-white'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 3 && <div className={`w-12 h-1 mx-2 ${
                  currentStep > step ? 'bg-white' : 'bg-white/30'
                }`} />}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Step 1: Date & Time Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              {/* Special Offers Banner */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="font-bold text-gray-900">FREE Analysis</div>
                    <div className="text-sm text-gray-600">$299 Value</div>
                  </div>
                  <div>
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-bold text-gray-900">Max Refund Guarantee</div>
                    <div className="text-sm text-gray-600">Or It's Free</div>
                  </div>
                  <div>
                    <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-gray-900">Same Day Service</div>
                    <div className="text-sm text-gray-600">Rush Available</div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Select Your Preferred Date
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-primary hover:bg-primary/10'
                      }`}
                    >
                      <div className="text-sm font-semibold">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {date.getDate()}
                      </div>
                      <div className="text-xs">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Choose Your Time Slot
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                          !slot.available 
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : selectedTime === slot.time
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 hover:border-primary hover:bg-primary/10'
                        }`}
                      >
                        <div className="font-bold">{slot.time}</div>
                        {slot.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                            Popular
                          </Badge>
                        )}
                        {slot.urgent && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                            Last Spot
                          </Badge>
                        )}
                        {!slot.available && (
                          <div className="text-xs mt-1">Booked</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                className="w-full h-14 text-lg font-bold ultra-button"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Continue to Contact Info
              </Button>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Almost Done! Just Need Your Details
                </h3>
                <p className="text-gray-600">
                  Selected: {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-semibold">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                      className="pl-10 h-12 border-2"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(855) 722-8700"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                      className="pl-10 h-12 border-2"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                      className="pl-10 h-12 border-2"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situation" className="text-gray-700 font-semibold">
                    Tax Situation
                  </Label>
                  <select
                    id="situation"
                    value={clientInfo.taxSituation}
                    onChange={(e) => setClientInfo({...clientInfo, taxSituation: e.target.value})}
                    className="w-full h-12 border-2 border-gray-200 rounded-lg px-3 focus:border-primary"
                  >
                    <option value="">Select your situation</option>
                    <option value="w2-simple">W-2 Employee (Simple)</option>
                    <option value="w2-complex">W-2 Employee (Complex)</option>
                    <option value="self-employed">Self-Employed/1099</option>
                    <option value="small-business">Small Business Owner</option>
                    <option value="rental-property">Rental Property</option>
                    <option value="investments">Stocks/Investments</option>
                    <option value="other">Other/Multiple Income</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-blue-900 mb-3">What to Expect in Your Consultation:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 text-sm">Complete tax situation review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 text-sm">Personalized refund estimate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 text-sm">Deduction discovery session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-800 text-sm">Next steps & timeline</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={!clientInfo.name || !clientInfo.phone || !clientInfo.email || isSubmitting}
                className="w-full h-14 text-lg font-bold ultra-button"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Booking Your Consultation...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-5 w-5" />
                    Book My FREE Consultation
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="text-center space-y-8 py-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  🎉 Your Consultation is Confirmed!
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    Scheduled For:
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at {selectedTime}
                  </div>
                  <div className="text-gray-600 mt-2">
                    CPA will call: <strong>{clientInfo.phone}</strong>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">BONUS #1</div>
                  <div className="text-sm text-gray-600">Tax Deduction Checklist</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">BONUS #2</div>
                  <div className="text-sm text-gray-600">Priority Processing</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">BONUS #3</div>
                  <div className="text-sm text-gray-600">VIP Support Access</div>
                </div>
              </div>

              <div className="text-left bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">What Happens Next:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                    <span className="text-gray-700">You'll receive a confirmation email with preparation tips</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                    <span className="text-gray-700">Our CPA will call at your scheduled time</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                    <span className="text-gray-700">Get your personalized refund maximization plan</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={onClose}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
              >
                Perfect! I'm Ready for My Call
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
