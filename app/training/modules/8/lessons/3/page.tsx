
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Video,
  Camera,
  Edit3,
  Megaphone,
  Zap,
  Star,
  MessageCircle,
  Share2,
  Eye,
  ThumbsUp,
  Heart,
  BookOpen,
  Download,
  ExternalLink
} from 'lucide-react'

export default function AdvancedSocialMediaLesson() {
  const [activeStrategy, setActiveStrategy] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())

  const toggleSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections)
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId)
    } else {
      newCompleted.add(sectionId)
    }
    setCompletedSections(newCompleted)
  }

  const advancedStrategies = [
    {
      title: 'Facebook & Instagram Ad Mastery',
      icon: Megaphone,
      color: 'bg-blue-500',
      roi: '400-800%',
      difficulty: 'Advanced',
      timeToMaster: '2-3 weeks',
      keyTactics: [
        'Lookalike audiences based on existing clients',
        'Retargeting website visitors with tax offers',
        'Local awareness campaigns during tax season',
        'Lead generation ads with free tax consultations'
      ],
      adTypes: [
        {
          name: 'Carousel Ads',
          description: 'Showcase multiple tax services in one ad',
          bestFor: 'Service awareness, multiple offerings',
          avgCTR: '1.8%'
        },
        {
          name: 'Video Ads',
          description: 'Engaging tax tips or client testimonials',
          bestFor: 'Brand awareness, trust building',
          avgCTR: '2.1%'
        },
        {
          name: 'Lead Generation',
          description: 'Direct contact form in the ad',
          bestFor: 'Client acquisition, consultation booking',
          avgCTR: '1.2%'
        }
      ]
    },
    {
      title: 'TikTok & YouTube Marketing',
      icon: Video,
      color: 'bg-red-500',
      roi: '300-600%',
      difficulty: 'Intermediate',
      timeToMaster: '1-2 weeks',
      keyTactics: [
        'Educational tax content that goes viral',
        'Behind-the-scenes tax preparation videos',
        'Quick tax tips using trending audio',
        'Client reaction videos to tax savings'
      ],
      videoIdeas: [
        'POV: You find a deduction worth $3,000',
        'Tax myths vs. reality (educational series)',
        'Day in the life of a tax preparer',
        'Client reactions to their refund amounts',
        'Tax deadline countdown with tips',
        '5 receipts you should always keep'
      ]
    },
    {
      title: 'Influencer Partnerships',
      icon: Users,
      color: 'bg-purple-500',
      roi: '250-500%',
      difficulty: 'Advanced',
      timeToMaster: '3-4 weeks',
      keyTactics: [
        'Partner with local business influencers',
        'Collaborate with finance content creators',
        'Cross-promote with complementary services',
        'Create tax education content series'
      ],
      partnershipTypes: [
        {
          type: 'Micro-Influencers',
          followerRange: '1K-10K',
          avgCost: '$100-500',
          bestFor: 'Local market penetration'
        },
        {
          type: 'Business Coaches',
          followerRange: '10K-100K',
          avgCost: '$500-2000',
          bestFor: 'Small business owner clients'
        },
        {
          type: 'Finance Creators',
          followerRange: '50K-500K',
          avgCost: '$1000-5000',
          bestFor: 'Brand awareness and credibility'
        }
      ]
    }
  ]

  const contentStrategies = [
    {
      name: 'The Authority Builder',
      description: 'Position yourself as the go-to tax expert',
      tactics: [
        'Share complex tax law explanations simplified',
        'Predict and explain tax law changes',
        'Debate common tax myths publicly',
        'Host live Q&A sessions regularly'
      ],
      expectedResults: '25-40% increase in consultation requests'
    },
    {
      name: 'The Problem Solver',
      description: 'Address specific client pain points',
      tactics: [
        'Create content around common tax problems',
        'Show before/after client tax situations',
        'Address audit fears and IRS concerns',
        'Explain complex forms in simple terms'
      ],
      expectedResults: '30-50% improvement in lead quality'
    },
    {
      name: 'The Local Champion',
      description: 'Dominate your local market',
      tactics: [
        'Cover local business tax incentives',
        'Partner with local business organizations',
        'Attend and post about community events',
        'Highlight local client success stories'
      ],
      expectedResults: '40-60% increase in local market share'
    }
  ]

  const analyticsMetrics = [
    { metric: 'Reach', target: '10,000+', description: 'Monthly unique accounts reached' },
    { metric: 'Engagement Rate', target: '3-5%', description: 'Likes, comments, shares divided by reach' },
    { metric: 'Click-Through Rate', target: '1.5-2.5%', description: 'Link clicks divided by impressions' },
    { metric: 'Conversion Rate', target: '5-10%', description: 'Consultations booked divided by clicks' },
    { metric: 'Cost Per Lead', target: '$15-30', description: 'Ad spend divided by qualified leads' },
    { metric: 'Client Acquisition Cost', target: '$75-150', description: 'Total marketing cost per new client' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/training/modules/8">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Module
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Lesson 3: Advanced Social Media Marketing & Content Strategy
                </h1>
                <p className="text-sm text-gray-500">Module 8 • Online Tax Business Mastery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                85 minutes
              </Badge>
              <Badge className="bg-purple-100 text-purple-700">
                <Video className="h-3 w-3 mr-1" />
                Advanced
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Advanced Marketing That Converts</h2>
                    <p className="text-purple-100 text-lg">Transform social media followers into high-paying clients</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">$2,500</div>
                    <div className="text-sm text-purple-100">Avg monthly revenue increase</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">47%</div>
                    <div className="text-sm text-purple-100">Client acquisition improvement</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 text-center">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">400%+</div>
                    <div className="text-sm text-purple-100">Average ROI on ad spend</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Strategies */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Advanced Marketing Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex space-x-4">
                    {advancedStrategies.map((strategy, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStrategy(index)}
                        className={`flex-1 p-4 rounded-lg border text-left transition-all ${
                          activeStrategy === index
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 ${strategy.color} rounded-lg flex items-center justify-center mb-3`}>
                          <strategy.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-bold text-sm mb-1">{strategy.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>ROI: {strategy.roi}</span>
                          <span>•</span>
                          <span>{strategy.difficulty}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{advancedStrategies[activeStrategy].title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Time to Master: {advancedStrategies[activeStrategy].timeToMaster}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700">
                          ROI: {advancedStrategies[activeStrategy].roi}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Tactics:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {advancedStrategies[activeStrategy].keyTactics.map((tactic, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {tactic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {advancedStrategies[activeStrategy].adTypes && (
                        <div>
                          <h4 className="font-semibold mb-3">Ad Types & Performance:</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            {advancedStrategies[activeStrategy].adTypes!.map((adType, i) => (
                              <div key={i} className="bg-white rounded-lg p-4 border">
                                <h5 className="font-semibold mb-2">{adType.name}</h5>
                                <p className="text-sm text-gray-600 mb-2">{adType.description}</p>
                                <div className="text-xs text-gray-500">
                                  <div>Best for: {adType.bestFor}</div>
                                  <div className="font-semibold text-green-600">CTR: {adType.avgCTR}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {advancedStrategies[activeStrategy].videoIdeas && (
                        <div>
                          <h4 className="font-semibold mb-3">Viral Content Ideas:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {advancedStrategies[activeStrategy].videoIdeas!.map((idea, i) => (
                              <div key={i} className="bg-white rounded-lg p-3 border flex items-center gap-2">
                                <Video className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-sm">{idea}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {advancedStrategies[activeStrategy].partnershipTypes && (
                        <div>
                          <h4 className="font-semibold mb-3">Partnership Opportunities:</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            {advancedStrategies[activeStrategy].partnershipTypes!.map((partnership, i) => (
                              <div key={i} className="bg-white rounded-lg p-4 border">
                                <h5 className="font-semibold mb-2">{partnership.type}</h5>
                                <div className="text-sm space-y-1">
                                  <div>Followers: {partnership.followerRange}</div>
                                  <div>Cost: {partnership.avgCost}</div>
                                  <div className="text-gray-600">{partnership.bestFor}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => toggleSectionComplete(`strategy-${activeStrategy}`)}
                      className="mt-4"
                    >
                      {completedSections.has(`strategy-${activeStrategy}`) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        'Mark Strategy Complete'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Strategies */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Content Strategies That Convert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {contentStrategies.map((strategy, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-3">{strategy.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{strategy.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {strategy.tactics.map((tactic, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {tactic}
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs font-semibold text-green-700 mb-1">Expected Results:</div>
                        <div className="text-sm text-green-800">{strategy.expectedResults}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics & Tracking */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  Performance Metrics & Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">📊 Why Metrics Matter</h4>
                  <p className="text-blue-700 text-sm">
                    Tax preparers who track their marketing metrics earn 67% more than those who don't. 
                    Here are the key performance indicators (KPIs) you must monitor:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analyticsMetrics.map((metric, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                        <div className="text-lg font-bold text-green-600">{metric.target}</div>
                      </div>
                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-800 mb-2">🎯 Setting Up Tracking</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                    <div>
                      <h5 className="font-semibold mb-2">Essential Tools:</h5>
                      <ul className="space-y-1">
                        <li>• Google Analytics 4</li>
                        <li>• Facebook Pixel</li>
                        <li>• UTM parameters for campaigns</li>
                        <li>• Call tracking numbers</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Weekly Review Process:</h5>
                      <ul className="space-y-1">
                        <li>• Monday: Review weekend performance</li>
                        <li>• Wednesday: Mid-week optimization</li>
                        <li>• Friday: Week summary and planning</li>
                        <li>• Sunday: Content calendar updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practical Exercise */}
            <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-indigo-600" />
                  Hands-On Project: Launch Your First Ad Campaign
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold mb-4">🚀 Your $100 Ad Campaign Challenge</h4>
                  <p className="text-gray-600 mb-4">
                    Launch a real Facebook ad campaign with just $100 budget to test these strategies.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">1</div>
                      <div>
                        <p className="font-semibold">Define Your Target Audience</p>
                        <p className="text-sm text-gray-600">Age 30-65, small business owners, 10-mile radius</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Create Your Ad Creative</p>
                        <p className="text-sm text-gray-600">Carousel ad showcasing your top 3 services with pricing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Set Up Conversion Tracking</p>
                        <p className="text-sm text-gray-600">Track consultation bookings and contact form submissions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Launch & Optimize</p>
                        <p className="text-sm text-gray-600">Run for 7 days, then optimize based on performance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h5 className="font-bold text-green-800 mb-2">Expected Results:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 2,000-3,000 people reached</li>
                      <li>• 15-25 link clicks</li>
                      <li>• 2-5 consultation bookings</li>
                      <li>• $20-50 cost per consultation</li>
                      <li>• 2-4x ROI if conversions occur</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Campaign Template
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Access Facebook Ads Manager
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Link href="/training/modules/8/lessons/2">
                    <Button variant="outline">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous: Technology Stack
                    </Button>
                  </Link>
                  
                  <div className="flex items-center gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Lesson
                    </Button>
                    
                    <Link href="/training/modules/8/lessons/4">
                      <Button>
                        Next: Email Marketing Automation
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Lesson Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {Math.round((completedSections.size / 6) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSections.size / 6) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg bg-gradient-to-br from-green-400 to-blue-500 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">📈 Success Metrics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Client Acquisition Increase</span>
                    <span className="font-bold">47%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average ROI</span>
                    <span className="font-bold">400%+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Per Lead</span>
                    <span className="font-bold">$15-30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue Boost</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Essential Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-semibold text-sm">Facebook Ads Library</div>
                    <div className="text-xs text-gray-600">Research competitor ads</div>
                  </a>
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-semibold text-sm">Canva Templates</div>
                    <div className="text-xs text-gray-600">Tax-themed social media designs</div>
                  </a>
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-semibold text-sm">Hootsuite Academy</div>
                    <div className="text-xs text-gray-600">Free social media courses</div>
                  </a>
                  <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-semibold text-sm">Google Analytics</div>
                    <div className="text-xs text-gray-600">Track website conversions</div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
