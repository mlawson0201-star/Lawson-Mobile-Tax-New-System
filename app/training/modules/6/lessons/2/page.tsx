
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
  Lightbulb,
  Target,
  Calendar,
  Users,
  TrendingUp,
  Instagram,
  Facebook,
  Linkedin,
  Video,
  Camera,
  Edit,
  Share2,
  MessageSquare,
  Heart,
  Eye,
  Download
} from 'lucide-react'

export default function SocialMediaMarketingLesson() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [showContentCalendar, setShowContentCalendar] = useState(false)

  const toggleSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections)
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId)
    } else {
      newCompleted.add(sectionId)
    }
    setCompletedSections(newCompleted)
  }

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600 bg-blue-100',
      bestFor: 'Local community engagement, event promotion',
      contentTypes: ['Educational posts', 'Client testimonials', 'Tax tips', 'Live Q&A sessions'],
      postingFrequency: '1-2 times daily during tax season, 3-4 times weekly off-season',
      keyTips: [
        'Use Facebook Groups to build community',
        'Share behind-the-scenes content',
        'Post local tax law updates',
        'Host live tax tip sessions'
      ]
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600 bg-pink-100',
      bestFor: 'Visual storytelling, younger demographics',
      contentTypes: ['Infographics', 'Stories', 'Reels', 'Carousel posts'],
      postingFrequency: '1 feed post daily, 3-5 stories daily',
      keyTips: [
        'Use relevant hashtags (#TaxTips #SmallBusiness)',
        'Create visually appealing tax infographics',
        'Share quick tax facts in Stories',
        'Partner with local business influencers'
      ]
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700 bg-blue-100',
      bestFor: 'B2B clients, professional networking',
      contentTypes: ['Industry insights', 'Professional tips', 'Business tax advice', 'Thought leadership'],
      postingFrequency: '3-4 times weekly',
      keyTips: [
        'Share business tax strategies',
        'Connect with local business owners',
        'Publish long-form articles',
        'Engage in tax professional groups'
      ]
    },
    {
      name: 'TikTok',
      icon: Video,
      color: 'text-black bg-gray-100',
      bestFor: 'Gen Z clients, viral content',
      contentTypes: ['Short tax tips', 'Trending audio with tax facts', 'Day-in-the-life content'],
      postingFrequency: '1-2 times daily during tax season',
      keyTips: [
        'Keep videos under 60 seconds',
        'Use trending sounds and hashtags',
        'Make complex tax topics simple',
        'Show your personality and humor'
      ]
    }
  ]

  const contentCalendarTemplate = [
    { day: 'Monday', theme: 'Motivation Monday', content: 'Inspirational tax success stories, client wins' },
    { day: 'Tuesday', theme: 'Tax Tip Tuesday', content: 'Educational tax tips, deduction advice' },
    { day: 'Wednesday', theme: 'Workflow Wednesday', content: 'Behind-the-scenes content, process videos' },
    { day: 'Thursday', theme: 'Throwback Thursday', content: 'Tax law history, industry changes' },
    { day: 'Friday', theme: 'FAQ Friday', content: 'Answer common tax questions' },
    { day: 'Saturday', theme: 'Small Business Saturday', content: 'Business tax tips, entrepreneur support' },
    { day: 'Sunday', theme: 'Sunday Prep', content: 'Week ahead tax deadlines, reminders' }
  ]

  const samplePosts = [
    {
      platform: 'Facebook',
      type: 'Educational Post',
      content: '💡 Tax Tip Tuesday: Did you know home office expenses can be deducted if you use part of your home regularly and exclusively for business? The simplified method allows you to deduct $5 per square foot up to 300 sq ft. That\'s up to $1,500 in deductions! 🏠💰 #TaxTips #HomeOffice #SmallBusiness',
      engagement: '45 likes, 8 comments, 12 shares'
    },
    {
      platform: 'Instagram',
      type: 'Carousel Post',
      content: '📊 SWIPE ➡️ for 5 tax deductions every small business owner should know! From office supplies to business meals, these deductions could save you thousands. Save this post for tax season! 💾 #SmallBusinessTips #TaxDeductions #TaxSeason2024',
      engagement: '127 likes, 15 comments, 23 saves'
    },
    {
      platform: 'LinkedIn',
      type: 'Professional Insight',
      content: 'As tax season approaches, I\'m seeing many business owners unprepared for the new R&D capitalization rules. Here\'s what every business owner needs to know about Section 174 changes and how it affects your 2023 tax liability... [Read more in comments] #BusinessTax #Section174 #TaxPlanning',
      engagement: '89 likes, 21 comments, 34 reposts'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/training/modules/6">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Module
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Lesson 2: Social Media Marketing Mastery for Tax Preparers
                </h1>
                <p className="text-sm text-gray-500">Module 6 • Client Acquisition & Digital Marketing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                75 minutes
              </Badge>
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Interactive
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  Social Media Marketing for Tax Professionals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Social Media Marketing Matters</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span><strong>73%</strong> of consumers find businesses through social media</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span><strong>4.8 billion</strong> people use social media worldwide</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-600" />
                        <span><strong>90%</strong> trust peer recommendations over ads</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-purple-600" />
                        <span><strong>54%</strong> research businesses on social before hiring</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-orange-600" />
                        <span><strong>67%</strong> expect brands to respond within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Share2 className="h-5 w-5 text-green-600" />
                        <span><strong>83%</strong> more likely to hire after social engagement</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">Key Learning Objective</h4>
                      <p className="text-yellow-700">
                        By the end of this lesson, you'll have a complete social media strategy tailored for tax preparers, 
                        including platform-specific tactics, content calendars, and engagement techniques that convert followers into clients.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Strategies */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Platform-Specific Strategies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {socialPlatforms.map((platform, index) => (
                  <div key={platform.name} className="border rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-full ${platform.color}`}>
                        <platform.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{platform.name}</h3>
                        <p className="text-gray-600">{platform.bestFor}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSectionComplete(`platform-${index}`)}
                      >
                        {completedSections.has(`platform-${index}`) ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          'Mark Complete'
                        )}
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Content Types:</h4>
                        <ul className="space-y-1">
                          {platform.contentTypes.map((type, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {type}
                            </li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold mt-4 mb-2">Posting Frequency:</h4>
                        <p className="text-sm text-gray-600">{platform.postingFrequency}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Success Tips:</h4>
                        <ul className="space-y-2">
                          {platform.keyTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Content Calendar */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    Weekly Content Calendar Template
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setShowContentCalendar(!showContentCalendar)}
                  >
                    {showContentCalendar ? 'Hide' : 'Show'} Calendar
                  </Button>
                </div>
              </CardHeader>
              
              {showContentCalendar && (
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-bold mb-2">📅 Your Weekly Posting Strategy</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Consistency is key to social media success. Use this themed approach to never run out of content ideas.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    {contentCalendarTemplate.map((day, index) => (
                      <div key={day.day} className="flex items-center gap-4 p-4 bg-white border rounded-lg">
                        <div className="w-20 text-center">
                          <div className="font-bold text-gray-900">{day.day}</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-purple-700 mb-1">{day.theme}</div>
                          <div className="text-sm text-gray-600">{day.content}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSectionComplete(`calendar-${index}`)}
                        >
                          {completedSections.has(`calendar-${index}`) ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            'Plan Content'
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">💡 Pro Tips for Content Planning</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Batch create content on Sundays for the entire week</li>
                      <li>• Use scheduling tools like Buffer, Hootsuite, or Later</li>
                      <li>• Keep a running list of content ideas on your phone</li>
                      <li>• Repurpose content across platforms with platform-specific adaptations</li>
                      <li>• Track which content performs best and create more of it</li>
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Sample Posts */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Edit className="h-6 w-6 text-green-600" />
                  High-Converting Post Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {samplePosts.map((post, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{post.platform}</Badge>
                        <Badge variant="secondary">{post.type}</Badge>
                      </div>
                      <span className="text-sm text-gray-500">{post.engagement}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm leading-relaxed">{post.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Practice Exercise */}
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-green-600" />
                  Interactive Exercise: Create Your Content Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold mb-4">📝 Your 30-Day Social Media Challenge</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                      <div>
                        <p className="font-semibold">Choose Your Primary Platforms</p>
                        <p className="text-sm text-gray-600">Select 2-3 platforms where your ideal clients spend time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Define Your Content Pillars</p>
                        <p className="text-sm text-gray-600">Education (50%), Behind-the-scenes (30%), Promotion (20%)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Create Your First Week's Content</p>
                        <p className="text-sm text-gray-600">Use the calendar template to plan 7 days of posts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Set Up Your Scheduling Tool</p>
                        <p className="text-sm text-gray-600">Choose and configure a social media management platform</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Strategy Template
                    </Button>
                    <Button variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Exercise Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Link href="/training/modules/6/lessons/1">
                    <Button variant="outline">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous: Building Your Brand
                    </Button>
                  </Link>
                  
                  <div className="flex items-center gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Lesson
                    </Button>
                    
                    <Link href="/training/modules/6/lessons/3">
                      <Button>
                        Next: Content Creation & Video Marketing
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
            {/* Progress Tracker */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Lesson Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {Math.round((completedSections.size / 11) * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sections Complete</span>
                      <span>{completedSections.size}/11</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedSections.size / 11) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Resources */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Essential Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Scheduling Tools</h4>
                    <p className="text-xs text-gray-600">Buffer, Hootsuite, Later, Creator Studio</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Design Tools</h4>
                    <p className="text-xs text-gray-600">Canva, Adobe Express, Figma</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Analytics</h4>
                    <p className="text-xs text-gray-600">Platform insights, Google Analytics, Sprout Social</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Content Ideas</h4>
                    <p className="text-xs text-gray-600">AnswerThePublic, BuzzSumo, Google Trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-800">💡 Success Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Post consistently, even if content isn't perfect</li>
                  <li>• Engage with comments within 2-4 hours</li>
                  <li>• Use local hashtags to reach nearby clients</li>
                  <li>• Share client success stories (with permission)</li>
                  <li>• Address tax myths and misconceptions</li>
                  <li>• Show your personality—people hire people</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Copy({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  )
}
