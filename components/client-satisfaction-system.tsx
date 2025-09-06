
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, 
  ThumbsUp,
  MessageSquare,
  Send,
  Gift,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Copy
} from 'lucide-react'

export function ClientSatisfactionSystem() {
  const [currentRating, setCurrentRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [selectedAspects, setSelectedAspects] = useState<string[]>([])
  const [submittedFeedback, setSubmittedFeedback] = useState(false)
  const [referralCode] = useState('SAVE2024')
  const [copiedCode, setCopiedCode] = useState(false)

  const satisfactionAspects = [
    'Communication quality',
    'Tax savings achieved',
    'Professional expertise',
    'Response time',
    'Ease of process',
    'Value for money',
    'Document handling',
    'Follow-up service'
  ]

  const recentReviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2 days ago',
      comment: 'Incredible service! Found deductions I never knew existed. Saved me $3,247!',
      verified: true,
      savings: '$3,247'
    },
    {
      id: 2, 
      name: 'David L.',
      rating: 5,
      date: '1 week ago',
      comment: 'Professional, thorough, and they actually care about maximizing your refund.',
      verified: true,
      savings: '$4,156'
    },
    {
      id: 3,
      name: 'Jennifer R.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Best tax service I\'ve ever used. Year-round support is amazing.',
      verified: true,
      savings: '$2,890'
    }
  ]

  const referralBenefits = [
    {
      title: '$100 Credit',
      description: 'You get $100 credit for each successful referral',
      icon: DollarSign
    },
    {
      title: '50% Discount',
      description: 'Your friend gets 50% off their first service',
      icon: Gift
    },
    {
      title: 'Bonus Services',
      description: 'Unlock premium features with multiple referrals',
      icon: Award
    }
  ]

  const handleAspectToggle = (aspect: string) => {
    if (selectedAspects.includes(aspect)) {
      setSelectedAspects(selectedAspects.filter(a => a !== aspect))
    } else {
      setSelectedAspects([...selectedAspects, aspect])
    }
  }

  const handleSubmitFeedback = () => {
    if (currentRating > 0) {
      // In real app, send to server
      console.log('Feedback submitted:', {
        rating: currentRating,
        aspects: selectedAspects,
        comment: feedback
      })
      setSubmittedFeedback(true)
    }
  }

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const getRatingEmoji = (rating: number) => {
    if (rating <= 2) return <Frown className="h-6 w-6 text-red-500" />
    if (rating <= 3) return <Meh className="h-6 w-6 text-yellow-500" />
    return <Smile className="h-6 w-6 text-green-500" />
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Very Dissatisfied'
      case 2: return 'Dissatisfied'
      case 3: return 'Neutral'
      case 4: return 'Satisfied'
      case 5: return 'Very Satisfied'
      default: return 'Rate your experience'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Heart className="h-8 w-8" />
            Your Experience Matters
          </CardTitle>
          <CardDescription className="text-purple-100 text-lg">
            Help us serve you better and earn rewards for sharing your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="font-bold">99.2%</div>
              <div className="text-purple-100 text-sm">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="font-bold">10,000+</div>
              <div className="text-purple-100 text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Award className="h-6 w-6 mx-auto mb-2 text-green-300" />
              <div className="font-bold">5-Star</div>
              <div className="text-purple-100 text-sm">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="feedback" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Give Feedback
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Client Reviews
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Earn Rewards
          </TabsTrigger>
        </TabsList>

        {/* Feedback Form */}
        <TabsContent value="feedback">
          {!submittedFeedback ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  How was your experience with us?
                </CardTitle>
                <CardDescription>
                  Your feedback helps us improve our services and better serve clients like you
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Star Rating */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">
                    Rate your overall experience
                  </h4>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setCurrentRating(star)}
                      >
                        <Star
                          className={`h-10 w-10 ${
                            star <= (hoveredRating || currentRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  
                  {currentRating > 0 && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {getRatingEmoji(currentRating)}
                        <span className="font-medium text-lg">
                          {getRatingText(currentRating)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Specific Aspects */}
                {currentRating > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      What aspects were you most {currentRating >= 4 ? 'satisfied' : 'unsatisfied'} with?
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {satisfactionAspects.map((aspect) => (
                        <label
                          key={aspect}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                            selectedAspects.includes(aspect)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedAspects.includes(aspect)}
                            onChange={() => handleAspectToggle(aspect)}
                            className="sr-only"
                          />
                          <div className={`text-sm font-medium ${
                            selectedAspects.includes(aspect) ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {aspect}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Written Feedback */}
                {currentRating > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Tell us more about your experience (optional)
                    </h4>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder={
                        currentRating >= 4 
                          ? "What did you like most about our service? How much did we help you save?"
                          : "How can we improve your experience? What didn't meet your expectations?"
                      }
                      className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
                    />
                  </div>
                )}

                {/* Submit Button */}
                {currentRating > 0 && (
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleSubmitFeedback}
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-bold"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Submit Feedback
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-green-700 mb-6">
                  Your input helps us continuously improve our services. 
                  {currentRating >= 4 && " Would you mind sharing your experience with others?"}
                </p>
                
                {currentRating >= 4 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">Share Your Success Story</h4>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Button 
                          onClick={() => window.open('https://www.google.com/search?q=Lawson+Mobile+Tax+reviews', '_blank')}
                          variant="outline"
                          className="bg-white"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Google Review
                        </Button>
                        <Button 
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: 'Great Tax Service!',
                                text: 'I had an amazing experience with Lawson Mobile Tax. They saved me thousands!',
                                url: 'https://lawsonmobiletax.com'
                              })
                            }
                          }}
                          variant="outline"
                          className="bg-white"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Client Reviews */}
        <TabsContent value="reviews">
          <div className="space-y-6">
            {/* Overall Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Client Satisfaction Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-gray-600">Overall Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">$4,247</div>
                    <div className="text-gray-600">Average Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                    <div className="text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">99.2%</div>
                    <div className="text-gray-600">Would Recommend</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Client Reviews</CardTitle>
                <CardDescription>
                  See what our clients are saying about their experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-700">Verified</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{review.savings}</div>
                          <div className="text-xs text-gray-500">Savings</div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button 
                    onClick={() => window.open('https://www.google.com/search?q=Lawson+Mobile+Tax+reviews', '_blank')}
                    variant="outline"
                  >
                    View All Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Referral Program */}
        <TabsContent value="referrals">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-orange-600" />
                  Referral Rewards Program
                </CardTitle>
                <CardDescription>
                  Share the savings with friends and earn money for each referral!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {referralBenefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-white rounded-lg border border-orange-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-center">Your Referral Code</h4>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-gray-100 px-6 py-3 rounded-lg font-mono text-2xl font-bold text-gray-800 tracking-wider">
                      {referralCode}
                    </div>
                    <Button
                      onClick={handleCopyReferralCode}
                      variant="outline"
                      className={copiedCode ? 'bg-green-50 text-green-700' : ''}
                    >
                      {copiedCode ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedCode ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Share this code with friends. They get 50% off, you get $100 credit!
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button 
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: 'Save Money on Taxes!',
                              text: `Use my referral code ${referralCode} to get 50% off professional tax services at Lawson Mobile Tax!`,
                              url: 'https://lawsonmobiletax.com/client/onboarding'
                            })
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Code
                      </Button>
                      <Button 
                        onClick={() => window.open(`mailto:?subject=Save Money on Taxes!&body=I had a great experience with Lawson Mobile Tax and thought you might be interested! Use my referral code ${referralCode} to get 50% off your first service. They saved me thousands! https://lawsonmobiletax.com/client/onboarding`, '_blank')}
                        variant="outline"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Friends
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Statistics</CardTitle>
                <CardDescription>Track your referral success and earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-blue-700">Pending Referrals</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-green-700">Successful Referrals</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">$0</div>
                    <div className="text-sm text-yellow-700">Total Earned</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">$0</div>
                    <div className="text-sm text-purple-700">Available Credit</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
