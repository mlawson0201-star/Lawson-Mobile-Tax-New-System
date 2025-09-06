
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink, Shield } from 'lucide-react'
import { googleReviews, reviewStats, googleBusinessInfo } from '@/lib/google-reviews'

export function GoogleReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % googleReviews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % googleReviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const review = googleReviews[currentReview]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 shadow-lg mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-gray-900">Google Reviews</span>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              Verified Business
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from real clients who trust us with their taxes
          </p>
        </div>

        {/* Review Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 hover-lift">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                {reviewStats.averageRating}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(5)}
              </div>
              <p className="text-gray-600 font-semibold">Average Rating</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover-lift">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {reviewStats.totalReviews.toLocaleString()}
              </div>
              <p className="text-gray-600 font-semibold">Total Reviews</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover-lift">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {Math.round((reviewStats.ratingBreakdown[5] / reviewStats.totalReviews) * 100)}%
              </div>
              <p className="text-gray-600 font-semibold">5-Star Reviews</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover-lift">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {reviewStats.verifiedReviews}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600 font-semibold">Verified</span>
              </div>
              <p className="text-gray-600 font-semibold">Verified Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Review Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Card className="ultra-premium-card p-8 md:p-12 relative overflow-hidden">
            {/* Background Quote */}
            <Quote className="absolute top-4 left-4 h-16 w-16 text-primary/10" />
            
            <div className="relative z-10">
              {/* Review Content */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{review.author}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{review.text}"
                </blockquote>

                {review.response && (
                  <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">L</span>
                      </div>
                      <span className="font-semibold text-primary text-sm">{review.response.author}</span>
                      <span className="text-xs text-gray-500">{review.response.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{review.response.text}</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevReview}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextReview}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {googleReviews.slice(0, 5).map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentReview ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentReview(index)}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => window.open(googleBusinessInfo.googleMapsUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All Reviews
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Google Business Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto p-6">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Business Name</h5>
                  <p className="text-gray-600">{googleBusinessInfo.name}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Service Area</h5>
                  <p className="text-gray-600">{googleBusinessInfo.address}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Phone</h5>
                  <a href={`tel:${googleBusinessInfo.phone}`} className="text-primary font-semibold hover:underline">
                    {googleBusinessInfo.phone}
                  </a>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Hours</h5>
                  <p className="text-gray-600">{googleBusinessInfo.hours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
