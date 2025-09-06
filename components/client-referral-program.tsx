
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Gift, 
  Users,
  DollarSign,
  Award,
  Share2,
  Mail,
  MessageSquare,
  Copy,
  CheckCircle,
  TrendingUp,
  Star,
  Crown,
  Target,
  Zap,
  Heart
} from 'lucide-react'

export function ClientReferralProgram() {
  const [referralCode] = useState('SAVE2024')
  const [copiedCode, setCopiedCode] = useState(false)
  const [friendEmail, setFriendEmail] = useState('')

  const referralTiers = [
    {
      tier: 1,
      referralsNeeded: 1,
      rewards: ['$100 Credit', '5% Bonus on Future Services'],
      badgeColor: 'bg-blue-100 text-blue-700',
      icon: Star
    },
    {
      tier: 2,
      referralsNeeded: 3,
      rewards: ['$300 Total Credit', '10% Bonus', 'Priority Support'],
      badgeColor: 'bg-purple-100 text-purple-700',
      icon: Award
    },
    {
      tier: 3,
      referralsNeeded: 5,
      rewards: ['$500 Total Credit', '15% Bonus', 'VIP Status', 'Free Tax Planning'],
      badgeColor: 'bg-yellow-100 text-yellow-700',
      icon: Crown
    }
  ]

  const successStories = [
    {
      name: 'Sarah M.',
      referrals: 7,
      earned: '$700',
      testimonial: 'The referral program is amazing! I\'ve earned enough credits to cover my taxes for the next 2 years.'
    },
    {
      name: 'Mike R.',
      referrals: 4,
      earned: '$400',
      testimonial: 'My friends love the service, and I love the rewards. Win-win for everyone!'
    },
    {
      name: 'Jennifer L.',
      referrals: 12,
      earned: '$1,200',
      testimonial: 'I tell everyone about LMT. The savings they provide plus the referral rewards make it a no-brainer.'
    }
  ]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleSendInvite = () => {
    if (friendEmail) {
      window.open(`mailto:${friendEmail}?subject=Save Money on Your Taxes!&body=Hi! I had an amazing experience with Lawson Mobile Tax and thought you'd be interested. They found deductions I never knew existed and saved me thousands! Use my referral code ${referralCode} to get 50% off your first service. Check them out: https://lawsonmobiletax.com/client/onboarding`, '_blank')
      setFriendEmail('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Gift className="h-8 w-8" />
            Referral Rewards Program
          </CardTitle>
          <CardDescription className="text-green-100 text-lg">
            Share the tax savings with friends and earn money for every referral!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="font-bold">$100</div>
              <div className="text-green-100 text-sm">Per Referral</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="font-bold">50% Off</div>
              <div className="text-green-100 text-sm">Friend's Discount</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-300" />
              <div className="font-bold">Unlimited</div>
              <div className="text-green-100 text-sm">Referrals</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Heart className="h-6 w-6 mx-auto mb-2 text-pink-300" />
              <div className="font-bold">Both Win</div>
              <div className="text-green-100 text-sm">You & Friends</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Referral Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Your Personal Referral Code
          </CardTitle>
          <CardDescription>
            Share this code with friends to unlock rewards for both of you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Code</h3>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white px-8 py-4 rounded-lg border-2 border-green-300 font-mono text-3xl font-black text-green-600 tracking-widest">
                  {referralCode}
                </div>
                <Button
                  onClick={handleCopyCode}
                  className={`${copiedCode ? 'bg-green-600' : 'bg-blue-600'} hover:opacity-90`}
                >
                  {copiedCode ? <CheckCircle className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Your Friend Gets:
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>50% off their first tax service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Free tax evaluation ($19.99 value)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Priority scheduling</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  You Get:
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>$100 service credit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Bonus rewards at higher tiers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>VIP status upgrades</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-purple-600" />
            Easy Ways to Share
          </CardTitle>
          <CardDescription>
            Multiple ways to spread the word and earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Invite */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Personal Invite
            </h4>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="friend@email.com"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSendInvite}
                disabled={!friendEmail}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Invite
              </Button>
            </div>
          </div>

          {/* Social Share */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Save Money on Taxes!',
                    text: `Use my code ${referralCode} for 50% off professional tax services!`,
                    url: 'https://lawsonmobiletax.com/client/onboarding'
                  })
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 h-16 flex-col gap-1"
            >
              <Share2 className="h-5 w-5" />
              Share Link
            </Button>
            
            <Button
              onClick={() => window.open(`https://wa.me/?text=Hey! I found this amazing tax service that saved me thousands. Use my referral code ${referralCode} to get 50% off: https://lawsonmobiletax.com/client/onboarding`, '_blank')}
              className="bg-green-600 hover:bg-green-700 h-16 flex-col gap-1"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp
            </Button>
            
            <Button
              onClick={() => window.open(`mailto:?subject=Save Money on Taxes!&body=I had a great experience with Lawson Mobile Tax! Use my referral code ${referralCode} to get 50% off your first service: https://lawsonmobiletax.com/client/onboarding`, '_blank')}
              className="bg-red-600 hover:bg-red-700 h-16 flex-col gap-1"
            >
              <Mail className="h-5 w-5" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            Referral Reward Tiers
          </CardTitle>
          <CardDescription>
            Unlock bigger rewards as you refer more friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {referralTiers.map((tier) => {
              const Icon = tier.icon
              return (
                <Card key={tier.tier} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-yellow-400 border-r-transparent">
                    <span className="absolute -top-8 -right-8 text-xs font-bold text-yellow-800 transform rotate-45 translate-x-2">
                      Tier {tier.tier}
                    </span>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-full ${tier.badgeColor}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>Tier {tier.tier}</CardTitle>
                        <p className="text-sm text-gray-600">{tier.referralsNeeded} referral{tier.referralsNeeded > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tier.rewards.map((reward, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{reward}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Success Stories
          </CardTitle>
          <CardDescription>
            See how other clients are earning with our referral program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">{story.name.charAt(0)}</span>
                    </div>
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{story.referrals} referrals</span>
                      <span className="font-bold text-green-600">{story.earned} earned</span>
                    </div>
                  </div>
                  <blockquote className="text-sm text-gray-700 italic">
                    "{story.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Your Referral Dashboard
          </CardTitle>
          <CardDescription>
            Track your progress and earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-blue-700">Pending</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-green-700">Successful</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">$0</div>
              <div className="text-sm text-yellow-700">Earned</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">$0</div>
              <div className="text-sm text-purple-700">Available</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">Tier 1</div>
              <div className="text-sm text-orange-700">Current</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Get Started */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-xl text-purple-100 mb-6">
            Share your code with friends and family today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleCopyCode}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 font-bold"
            >
              <Copy className="h-5 w-5 mr-2" />
              Copy Code: {referralCode}
            </Button>
            <Button 
              onClick={() => window.open('tel:(855) 722-8700', '_self')}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3 font-bold"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Questions? Call Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
