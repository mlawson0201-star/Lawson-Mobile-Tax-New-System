
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Search, 
  Play,
  FileText,
  Calculator,
  Lightbulb,
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Award,
  Video,
  Headphones,
  Download,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2
} from 'lucide-react'
import { ClientProfile } from '@/lib/client-personalization'

interface TaxEducationHubProps {
  clientProfile: ClientProfile
}

export function TaxEducationHub({ clientProfile }: TaxEducationHubProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('recommended')

  const educationContent = [
    {
      id: 1,
      title: 'Home Office Deduction Masterclass',
      description: 'Learn how to maximize your home office deduction with our comprehensive guide.',
      type: 'article',
      category: 'deductions',
      readTime: '8 min',
      difficulty: 'Beginner',
      personalizedFor: clientProfile.hasHomeOffice,
      views: 15420,
      likes: 892,
      content: `# Home Office Deduction: Complete Guide

The home office deduction is one of the most valuable tax benefits for self-employed individuals and remote workers. Here's everything you need to know:

## What Qualifies?
- Exclusive use: The space must be used only for business
- Regular use: You must use it consistently for work
- Principal place of business: It's your main work location

## Calculation Methods
1. **Simplified Method**: $5 per square foot (max 300 sq ft = $1,500)
2. **Actual Expense Method**: Percentage of total home expenses

## Maximizing Your Deduction
Based on your profile, you could save approximately $1,200 annually with proper documentation.`,
      thumbnail: '/education/home-office.jpg'
    },
    {
      id: 2,
      title: 'Business Mileage Tracking System',
      description: 'Never miss a deductible mile again with our proven tracking system.',
      type: 'video',
      category: 'business',
      readTime: '12 min',
      difficulty: 'Intermediate',
      personalizedFor: clientProfile.businessMileage > 0,
      views: 23156,
      likes: 1247,
      content: 'Video content about mileage tracking best practices and apps.',
      thumbnail: '/education/mileage-tracking.jpg'
    },
    {
      id: 3,
      title: 'Tax-Advantaged Retirement Strategies',
      description: 'Reduce your current taxes while building wealth for the future.',
      type: 'guide',
      category: 'planning',
      readTime: '15 min',
      difficulty: 'Advanced',
      personalizedFor: clientProfile.hasRetirementContributions,
      views: 18934,
      likes: 1534,
      content: 'Comprehensive guide on retirement tax strategies.',
      thumbnail: '/education/retirement-planning.jpg'
    },
    {
      id: 4,
      title: 'Quarterly Tax Planning Checklist',
      description: 'Stay ahead with our quarterly tax planning system.',
      type: 'checklist',
      category: 'planning',
      readTime: '5 min',
      difficulty: 'Beginner',
      personalizedFor: true,
      views: 31205,
      likes: 2156,
      content: `# Quarterly Tax Planning Checklist

## Q1 (January - March)
- [ ] Review previous year tax return
- [ ] Set up quarterly payment schedule
- [ ] Organize business receipts system
- [ ] Plan retirement contributions

## Q2 (April - June)  
- [ ] Make Q1 estimated tax payment
- [ ] Review mid-year income projections
- [ ] Assess business deduction opportunities
- [ ] Update tax planning strategy

## Q3 (July - September)
- [ ] Make Q2 estimated tax payment
- [ ] Mid-year financial review
- [ ] Plan year-end tax strategies
- [ ] Review business entity structure

## Q4 (October - December)
- [ ] Make Q3 estimated tax payment
- [ ] Year-end tax planning meeting
- [ ] Maximize business deductions
- [ ] Plan for following year`,
      thumbnail: '/education/quarterly-planning.jpg'
    },
    {
      id: 5,
      title: 'Business Expense Categories Guide',
      description: 'Complete list of deductible business expenses with examples.',
      type: 'reference',
      category: 'business',
      readTime: '20 min',
      difficulty: 'Intermediate',
      personalizedFor: clientProfile.businessIncome > 0,
      views: 27892,
      likes: 1876,
      content: 'Comprehensive business expense reference guide.',
      thumbnail: '/education/business-expenses.jpg'
    },
    {
      id: 6,
      title: 'Tax Law Changes 2024-2025',
      description: 'Important updates that affect your tax situation this year.',
      type: 'update',
      category: 'news',
      readTime: '10 min',
      difficulty: 'Intermediate',
      personalizedFor: true,
      views: 45231,
      likes: 3421,
      content: 'Latest tax law changes and their implications.',
      thumbnail: '/education/tax-changes.jpg'
    }
  ]

  const personalizedRecommendations = educationContent
    .filter(content => content.personalizedFor)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)

  const categories = [
    { id: 'recommended', name: 'For You', icon: Target, count: personalizedRecommendations.length },
    { id: 'deductions', name: 'Deductions', icon: Calculator, count: educationContent.filter(c => c.category === 'deductions').length },
    { id: 'business', name: 'Business', icon: TrendingUp, count: educationContent.filter(c => c.category === 'business').length },
    { id: 'planning', name: 'Planning', icon: Lightbulb, count: educationContent.filter(c => c.category === 'planning').length },
    { id: 'news', name: 'Updates', icon: FileText, count: educationContent.filter(c => c.category === 'news').length }
  ]

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-red-600" />
      case 'article': return <FileText className="h-5 w-5 text-blue-600" />
      case 'guide': return <BookOpen className="h-5 w-5 text-green-600" />
      case 'checklist': return <CheckCircle className="h-5 w-5 text-purple-600" />
      case 'reference': return <Target className="h-5 w-5 text-orange-600" />
      case 'update': return <TrendingUp className="h-5 w-5 text-pink-600" />
      default: return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'Advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredContent = () => {
    let content = educationContent
    
    if (selectedCategory === 'recommended') {
      content = personalizedRecommendations
    } else if (selectedCategory !== 'all') {
      content = content.filter(c => c.category === selectedCategory)
    }

    if (searchTerm) {
      content = content.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return content
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookOpen className="h-8 w-8" />
            Tax Education Center
          </CardTitle>
          <CardDescription className="text-green-100 text-lg">
            Personalized tax education designed just for {clientProfile.firstName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Award className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
              <div className="font-bold">50+ Resources</div>
              <div className="text-green-100 text-sm">Tailored Content</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="font-bold">Expert Created</div>
              <div className="text-green-100 text-sm">CPA Reviewed</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
              <Clock className="h-6 w-6 mx-auto mb-2 text-purple-300" />
              <div className="font-bold">Updated Daily</div>
              <div className="text-green-100 text-sm">Current Tax Law</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <Button 
          onClick={() => window.open('/tax-evaluation', '_blank')}
          className="bg-purple-600 hover:bg-purple-700 h-16 flex-col gap-1"
        >
          <Target className="h-5 w-5" />
          Get Tax Analysis
        </Button>
        <Button 
          onClick={() => window.open('mailto:support@lawsonmobiletax.com?subject=Tax Question from ' + clientProfile.firstName, '_blank')}
          variant="outline" 
          className="h-16 flex-col gap-1"
        >
          <MessageCircle className="h-5 w-5" />
          Ask Expert
        </Button>
        <Button 
          onClick={() => setSelectedCategory('recommended')}
          variant="outline" 
          className="h-16 flex-col gap-1"
        >
          <Lightbulb className="h-5 w-5" />
          Personal Tips
        </Button>
        <Button 
          onClick={() => window.open('/client/onboarding', '_blank')}
          variant="outline" 
          className="h-16 flex-col gap-1"
        >
          <Calculator className="h-5 w-5" />
          Tax Tools
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search tax topics, guides, and resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`h-6 w-6 mx-auto mb-2 ${
                  selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <div className="font-semibold text-sm">{category.name}</div>
                <div className="text-xs text-gray-600">{category.count} items</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Featured Content */}
      {selectedCategory === 'recommended' && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Star className="h-5 w-5 text-yellow-500" />
              Recommended for {clientProfile.firstName}
            </CardTitle>
            <CardDescription className="text-purple-600">
              Based on your tax profile and current situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-purple-700 mb-4">
              <strong>Your Profile:</strong> {clientProfile.occupation} • Filing Status: {clientProfile.filingStatus} • 
              {clientProfile.hasHomeOffice && ' Home Office'} • 
              {clientProfile.businessIncome > 0 && ' Business Income'} • 
              {clientProfile.hasRetirementContributions && ' Retirement Planning'}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent().map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getContentIcon(content.type)}
                  <Badge variant="outline" className="text-xs">
                    {content.type.toUpperCase()}
                  </Badge>
                </div>
                {content.personalizedFor && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Star className="h-3 w-3 mr-1" />
                    For You
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-lg leading-tight">{content.title}</CardTitle>
              <CardDescription className="text-sm">{content.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {content.readTime}
                  </div>
                  <Badge className={`text-xs ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {content.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {content.likes.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {content.type === 'video' ? (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Watch
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Read
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tax Tips Widget */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Daily Tax Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <h4 className="font-semibold text-gray-900 mb-2">Maximize Your Vehicle Deduction</h4>
            <p className="text-gray-700 text-sm mb-3">
              Based on your business profile, tracking your vehicle miles could save you approximately $1,500 annually. 
              Use a mileage tracking app and log every business trip!
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                Learn More
              </Button>
              <Button size="sm" variant="outline">
                Track Miles Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Common tax questions from clients like you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                question: "How much can I deduct for my home office?",
                answer: "Based on your situation, you can potentially deduct $1,200-$2,400 annually using either the simplified method ($5 per sq ft) or actual expense method."
              },
              {
                question: "When should I make quarterly tax payments?",
                answer: "Make quarterly payments by Jan 15, Apr 15, Jun 15, and Sep 15. Based on your income, you should pay approximately $1,200 per quarter."
              },
              {
                question: "What business expenses can I deduct?",
                answer: "Office supplies, professional development, business meals (50%), travel expenses, and equipment. Keep detailed records and receipts."
              }
            ].map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-700 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={() => window.open('mailto:support@lawsonmobiletax.com?subject=Tax Question from ' + clientProfile.firstName, '_blank')}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask Your Tax Professional
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
