'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Phone, 
  Calculator, 
  Building2, 
  CheckCircle,
  ArrowRight,
  Crown,
  Star,
  DollarSign,
  Sparkles,
  GraduationCap,
  BookOpen,
  Award,
  Shield,
  TrendingUp,
  Target,
  Briefcase,
  FileText,
  Zap,
  Gift,
  Rocket,
  Mail
} from 'lucide-react'

export default function WelcomePage() {
  const [phoneNumber] = useState('(855) 722-8700')

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/welcome" className="flex items-center">
              <div className="relative w-16 h-16 mr-4">
                <Image 
                  src="/lmt-logo.png" 
                  alt="Lawson Mobile Tax Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lawson Mobile Tax</h1>
                <p className="text-sm text-gray-600">Professional Tax Services At Your Fingertips</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/services" className="text-gray-600 hover:text-green-600 font-medium">Services</Link>
              <Link href="/affiliate" className="text-purple-600 hover:text-purple-700 font-bold">
                Become an Affiliate
              </Link>
              <a href={`tel:${phoneNumber}`} className="text-gray-600 hover:text-green-600 font-medium flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {phoneNumber}
              </a>
              <Link href="/client/onboarding">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
                  BECOME A CLIENT
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <Badge className="bg-yellow-400 text-black font-bold text-lg px-6 py-2 mb-6">
              🏆 #1 RATED TAX SERVICE 2024
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              PROFESSIONAL TAX SERVICES
              <span className="block text-yellow-300 text-5xl md:text-7xl mt-4">
                That Actually SAVE You Money!
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-12 opacity-90 leading-relaxed">
              Join <strong className="text-yellow-300">Professional</strong> Taxpayers Who Save an Average of 
              <strong className="text-yellow-300 text-4xl block mt-2">$12,847 ANNUALLY</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/client/onboarding">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-3xl px-16 py-8 font-black rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  <Crown className="mr-4 h-10 w-10" />
                  START SAVING TODAY
                  <ArrowRight className="ml-4 h-10 w-10" />
                </Button>
              </Link>
              <a href={`tel:${phoneNumber}`}>
                <Button className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-green-600 text-2xl px-12 py-8 font-black rounded-full shadow-xl">
                  <Phone className="mr-3 h-8 w-8" />
                  CALL: {phoneNumber}
                </Button>
              </a>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-5xl font-black mb-2 text-yellow-300">Professional</div>
                <div className="text-white/90 font-semibold">Happy Clients</div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-5xl font-black mb-2 text-yellow-300">$89M+</div>
                <div className="text-white/90 font-semibold">Total Saved</div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-5xl font-black mb-2 text-yellow-300">99.2%</div>
                <div className="text-white/90 font-semibold">Success Rate</div>
              </div>
              <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-5xl font-black mb-2 text-yellow-300">8 Days</div>
                <div className="text-white/90 font-semibold">Avg Refund Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SERVICES SECTION */}
      <section className="py-32 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-green-600 text-white font-bold text-lg px-6 py-2 mb-6">
              💰 MAXIMIZE YOUR SAVINGS
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight">
              OUR ELITE
              <span className="block text-green-600">TAX SERVICES</span>
            </h2>
            <p className="text-3xl text-gray-600 mb-4">
              Professional tax services that have saved clients over <span className="text-green-600 font-bold">$89 million</span>
            </p>
            <p className="text-xl text-gray-500 max-w-4xl mx-auto">
              Each service includes intake consultation, expert preparation, maximum refund guarantee, and free audit protection
            </p>
          </div>

          {/* Featured Service - Tax Evaluation */}
          <div className="text-center mb-20">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-8 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-2 rounded-bl-3xl font-black text-lg">
                FEATURED SERVICE
              </div>
              <div className="relative z-10">
                <h2 className="text-5xl font-black text-white mb-4">
                  Get Your Personalized Tax Evaluation
                  <span className="block text-yellow-300">Only $19.99!</span>
                </h2>
                <p className="text-xl text-white mb-6 max-w-3xl mx-auto">
                  Discover hidden deductions, maximize your refund, and get personalized tax advice from certified professionals
                </p>
                
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <img 
                        src="/lmt-avatar.jpg" 
                        alt="LMT Tax Professional" 
                        className="w-full max-w-sm mx-auto rounded-lg shadow-xl"
                      />
                      <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-black text-sm">
                        EXPERT ANALYSIS
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 text-left">
                    <h3 className="text-3xl font-bold text-white mb-6">What You Get:</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-yellow-400" />
                        <span className="text-white text-lg">Personalized tax analysis report</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-yellow-400" />
                        <span className="text-white text-lg">Hidden deduction identification</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-yellow-400" />
                        <span className="text-white text-lg">Refund maximization strategy</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-yellow-400" />
                        <span className="text-white text-lg">Expert tax recommendations</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-yellow-400" />
                        <span className="text-white text-lg">Next steps action plan</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/tax-evaluation">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-2xl px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all">
                    <Target className="mr-3 h-8 w-8" />
                    GET MY TAX EVALUATION NOW - $19.99
                    <ArrowRight className="ml-3 h-8 w-8" />
                  </Button>
                </Link>
                
                <p className="text-yellow-200 mt-4 text-sm">
                  ⭐ Over 10,000 satisfied clients • Average savings of $3,247 per year
                </p>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-20">
            {/* Student Tax Returns */}
            <Card className="relative p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-0 bg-white shadow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-2xl font-bold">
                STUDENT SPECIAL
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-black mb-4 text-gray-900">Student Tax Returns</h3>
                
                <div className="mb-4">
                  <div className="text-4xl font-black text-blue-600 mb-2">$199</div>
                  <div className="text-sm text-gray-500">Student Price</div>
                </div>
                
                <div className="bg-blue-100 rounded-xl p-4 mb-6 border border-blue-200">
                  <div className="text-2xl font-black text-blue-700 mb-1">You Save: $1,500</div>
                  <div className="text-blue-600 font-semibold">8x Return on Investment</div>
                </div>

                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  Perfect for students with 1098-T forms, part-time jobs, and simple tax situations.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">Student Deductions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">Education Credits</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">Fast Turnaround</span>
                  </div>
                </div>
                
                <Link href="/client/onboarding">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                    <FileText className="mr-2 h-5 w-5" />
                    BECOME A CLIENT
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Standard Individual Tax Returns */}
            <Card className="relative p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-0 bg-white shadow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-2xl font-bold">
                MOST POPULAR
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Users className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-black mb-4 text-gray-900">Standard Tax Returns</h3>
                
                <div className="mb-4">
                  <div className="text-4xl font-black text-green-600 mb-2">$499</div>
                  <div className="text-sm text-gray-500">Starting Price</div>
                </div>
                
                <div className="bg-green-100 rounded-xl p-4 mb-6 border border-green-200">
                  <div className="text-2xl font-black text-green-700 mb-1">You Save: $3,247</div>
                  <div className="text-green-600 font-semibold">7x Return on Investment</div>
                </div>

                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  Complete personal tax preparation with maximum refund guarantee for individuals and families.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Maximum Refund Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Free Audit Protection</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Mobile Service Available</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Complete personal tax preparation with maximum refund guarantee. 
                  Expert analysis finds every deduction and credit you deserve.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Maximum Refund Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Free Audit Protection</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Mobile Service Available</span>
                  </div>
                </div>
                
                <Link href="/client/onboarding">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black py-6 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                    <FileText className="mr-3 h-6 w-6" />
                    BECOME A CLIENT
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Business Tax Services */}
            <Card className="relative p-10 hover:shadow-2xl transition-all transform hover:scale-105 border-0 bg-white shadow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-2 rounded-bl-2xl font-bold">
                HIGHEST ROI
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-center relative z-10">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform">
                  <Building2 className="h-14 w-14 text-white" />
                </div>
                
                <h3 className="text-4xl font-black mb-6 text-gray-900">Business Tax Services</h3>
                
                <div className="mb-6">
                  <div className="text-5xl font-black text-purple-600 mb-2">$1,499</div>
                  <div className="text-lg text-gray-500">Starting at</div>
                </div>
                
                <div className="bg-purple-100 rounded-2xl p-6 mb-8 border border-purple-200">
                  <div className="text-3xl font-black text-purple-700 mb-2">You Save: $15,750</div>
                  <div className="text-purple-600 font-semibold">11x Return on Investment</div>
                </div>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Complete business tax solutions for LLCs, S-Corps, partnerships, 
                  and corporations. Strategic tax planning maximizes deductions.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-purple-500 flex-shrink-0" />
                    <span className="font-semibold">Business Deduction Optimization</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-purple-500 flex-shrink-0" />
                    <span className="font-semibold">Quarterly Tax Planning</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-purple-500 flex-shrink-0" />
                    <span className="font-semibold">Entity Structure Optimization</span>
                  </div>
                </div>
                
                <Link href="/client/onboarding">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black py-6 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                    <FileText className="mr-3 h-6 w-6" />
                    BECOME A CLIENT
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Bookkeeping Services */}
            <Card className="relative p-10 hover:shadow-2xl transition-all transform hover:scale-105 border-0 bg-white shadow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-2xl font-bold">
                ONGOING VALUE
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-center relative z-10">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform">
                  <Calculator className="h-14 w-14 text-white" />
                </div>
                
                <h3 className="text-4xl font-black mb-6 text-gray-900">Monthly Bookkeeping</h3>
                
                <div className="mb-6">
                  <div className="text-6xl font-black text-blue-600 mb-2">$200</div>
                  <div className="text-lg text-gray-500">Per Month</div>
                </div>
                
                <div className="bg-blue-100 rounded-2xl p-6 mb-8 border border-blue-200">
                  <div className="text-3xl font-black text-blue-700 mb-2">You Save: $2,400/mo</div>
                  <div className="text-blue-600 font-semibold">12x Return on Investment</div>
                </div>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Professional monthly bookkeeping, financial management, and 
                  year-round tax planning to maximize your business success.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">Monthly Financial Reports</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">Year-Round Tax Planning</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">QuickBooks Setup & Training</span>
                  </div>
                </div>
                
                <Link href="/client/onboarding">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-6 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                    <FileText className="mr-3 h-6 w-6" />
                    BECOME A CLIENT
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Tax Debt Resolution */}
            <Card className="relative p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-0 bg-white shadow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-bl-2xl font-bold">
                URGENT HELP
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-black mb-4 text-gray-900">Tax Debt Resolution</h3>
                
                <div className="mb-4">
                  <div className="text-4xl font-black text-red-600 mb-2">$299</div>
                  <div className="text-sm text-gray-500">Consultation</div>
                </div>
                
                <div className="bg-red-100 rounded-xl p-4 mb-6 border border-red-200">
                  <div className="text-2xl font-black text-red-700 mb-1">Save Thousands</div>
                  <div className="text-red-600 font-semibold">Stop IRS Collections</div>
                </div>

                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  Expert help with IRS debt, payment plans, offers in compromise, and collection defense.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="font-semibold">IRS Debt Analysis</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="font-semibold">Payment Plan Setup</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="font-semibold">Offer in Compromise</span>
                  </div>
                </div>
                
                <Link href="/client/onboarding">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                    <FileText className="mr-2 h-5 w-5" />
                    GET HELP NOW
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Tax Planning Guide */}
            <Card className="relative p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-0 bg-white shadow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-2 rounded-bl-2xl font-bold">
                BEST VALUE
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-black mb-4 text-gray-900">Tax Planning Guide</h3>
                
                <div className="mb-4">
                  <div className="text-4xl font-black text-yellow-600 mb-2">$49.99</div>
                  <div className="text-sm text-gray-500">Digital Guide</div>
                </div>
                
                <div className="bg-yellow-100 rounded-xl p-4 mb-6 border border-yellow-200">
                  <div className="text-2xl font-black text-yellow-700 mb-1">Save $2,000+</div>
                  <div className="text-yellow-600 font-semibold">Annual Tax Savings</div>
                </div>

                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  Personalized tax planning strategies, deduction checklist, and year-round optimization tips.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span className="font-semibold">Custom Tax Strategy</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span className="font-semibold">Deduction Checklist</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span className="font-semibold">Year-Round Tips</span>
                  </div>
                </div>
                
                <Link href="/client/onboarding">
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-black py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                    <FileText className="mr-2 h-5 w-5" />
                    GET GUIDE NOW
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Strategic Upsells Section */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">Not Sure Which Service is Right for You?</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Tax Evaluation Upsell */}
              <Card className="p-8 bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300 hover:shadow-xl transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Start with a Tax Evaluation</h4>
                  <p className="text-lg text-gray-700 mb-6">
                    Discover exactly how much you could save before committing to full service. Perfect for first-time clients!
                  </p>
                  
                  <div className="bg-orange-500 text-white rounded-lg p-4 mb-6">
                    <p className="text-2xl font-bold">Only $19.99</p>
                    <p>Professional tax analysis & optimization!</p>
                  </div>
                  
                  <Link href="/tax-evaluation">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-lg">
                      Get My Tax Evaluation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Planning Guide Upsell */}
              <Card className="p-8 bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 hover:shadow-xl transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">DIY with Expert Guidance</h4>
                  <p className="text-lg text-gray-700 mb-6">
                    Get a personalized tax planning guide with strategies tailored to your specific situation.
                  </p>
                  
                  <div className="bg-yellow-500 text-white rounded-lg p-4 mb-6">
                    <p className="text-2xl font-bold">Only $49.99</p>
                    <p>Typically saves $2,000+ annually!</p>
                  </div>
                  
                  <Link href="/intake/planning-guide">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 text-lg">
                      Get My Planning Guide
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Success Stats */}
            <div className="text-center mt-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Join Over 10,000 Satisfied Clients</h4>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$2,847</div>
                  <div className="text-gray-700">Average Annual Savings</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10,000+</div>
                  <div className="text-gray-700">Happy Clients Served</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">98%</div>
                  <div className="text-gray-700">Client Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Services CTA */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-4xl font-black text-gray-900 mb-6">15+ Specialized Services Available</h3>
              <p className="text-xl text-gray-600 mb-8">Estate planning, payroll services, business formation, and more...</p>
              <Link href="/services">
                <Button className="bg-gradient-to-r from-green-600 via-purple-600 to-blue-600 hover:from-green-700 hover:via-purple-700 hover:to-blue-700 text-white text-2xl px-16 py-8 rounded-full font-black shadow-xl transform hover:scale-105 transition-all">
                  <Sparkles className="mr-4 h-8 w-8" />
                  VIEW ALL SERVICES & PRICING
                  <ArrowRight className="ml-4 h-8 w-8" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TAX PREPARER TRAINING PROGRAM */}
      <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-xl px-8 py-3 mb-8">
              🎓 PROFESSIONAL TRAINING PROGRAM
            </Badge>
            
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              BECOME A
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                TAX PREPARER
              </span>
              <span className="block text-5xl md:text-6xl mt-4">TODAY!</span>
            </h2>
            
            <p className="text-2xl md:text-3xl mb-12 opacity-90 max-w-4xl mx-auto">
              Transform your career with our comprehensive tax preparation training program. 
              <strong className="text-yellow-300">From zero knowledge to tax expert in 90 days!</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Training Program Details */}
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <GraduationCap className="h-12 w-12 text-yellow-300 mr-4" />
                  <h3 className="text-3xl font-bold">Complete Training Curriculum</h3>
                </div>
                
                <div className="space-y-4 text-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 1:</strong> Tax Law Fundamentals & IRS Regulations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 2:</strong> Individual Tax Return Preparation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 3:</strong> Business Tax Returns & Entity Types</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 4:</strong> Advanced Deductions & Credits</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 5:</strong> Tax Software Mastery (ProSeries, Drake, etc.)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 6:</strong> Client Communication & Business Skills</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 7:</strong> Ethics, PTIN Requirements & IRS Enrollment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Module 8:</strong> Practice Management & Marketing</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <Award className="h-12 w-12 text-purple-300 mr-4" />
                  <h3 className="text-3xl font-bold">Certification & Support</h3>
                </div>
                
                <div className="space-y-4 text-lg">
                  <div className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>Official Tax Preparer Certification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>IRS PTIN Registration Assistance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>1-Year Mentorship Program</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>Job Placement Assistance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>Access to Our Client Referral Network</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Pricing & CTA */}
            <div className="text-center">
              <Card className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border-2 border-yellow-300/50 p-12 shadow-2xl">
                <div className="mb-8">
                  <Badge className="bg-red-500 text-white font-bold text-lg px-6 py-2 mb-6">
                    🔥 LIMITED TIME OFFER
                  </Badge>
                  
                  <div className="mb-6">
                    <div className="text-2xl text-white/60 line-through mb-2">Regular Price: $899</div>
                    <div className="text-8xl font-black text-yellow-300 mb-4">$499</div>
                    <div className="text-2xl text-white/80">One-Time Payment</div>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="bg-white/20 rounded-2xl p-6">
                    <h4 className="text-2xl font-bold mb-4">What's Included:</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">8 Comprehensive Training Modules</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">Live Virtual Classes & Recordings</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">Practice Tax Returns & Software</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">IRS Exam Prep & PTIN Assistance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">1-Year Mentorship & Job Placement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-green-400 flex-shrink-0" />
                        <span className="font-semibold">Client Referral Network Access</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-500/20 rounded-2xl p-4 border border-red-400">
                    <p className="text-lg font-bold text-red-200">
                      ⚠️ Applications Subject to Background Check
                    </p>
                    <p className="text-sm text-red-300 mt-2">
                      Felony or misdemeanor convictions, tax non-compliance, or IRS issues may result in denial
                    </p>
                  </div>
                </div>

                <Link href="/preparer/application">
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-black py-8 text-2xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all mb-6">
                    <Rocket className="mr-4 h-8 w-8" />
                    START APPLICATION & PAYMENT
                    <ArrowRight className="ml-4 h-8 w-8" />
                  </Button>
                </Link>
                
                <p className="text-white/80 text-sm">
                  🛡️ 30-Day Money Back Guarantee | 📞 Support: {phoneNumber}
                </p>
              </Card>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">95%</div>
              <div className="text-white/90 font-semibold">Pass Rate</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-purple-300">$45K+</div>
              <div className="text-white/90 font-semibold">Avg First Year</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-pink-300">90 Days</div>
              <div className="text-white/90 font-semibold">To Certification</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-green-300">1,200+</div>
              <div className="text-white/90 font-semibold">Graduates</div>
            </div>
          </div>
        </div>
      </section>

      {/* BECOME A CLIENT CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            BECOME A CLIENT TODAY
          </h2>
          <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto opacity-90">
            Join elite clients who chose professional tax mastery. 
            <strong>Average client saves $12,847 annually.</strong>
          </p>
          
          <div className="mb-16">
            <Link href="/client/onboarding">
              <Button className="bg-white text-green-600 hover:bg-gray-100 text-3xl px-20 py-10 rounded-full font-black shadow-2xl">
                <Crown className="mr-4 h-10 w-10" />
                START SAVING NOW - BECOME A CLIENT
                <ArrowRight className="ml-4 h-10 w-10" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black mb-2">Elite</div>
              <div className="text-white/80 font-semibold">Elite Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">$12,847</div>
              <div className="text-white/80 font-semibold">Avg Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">99.2%</div>
              <div className="text-white/80 font-semibold">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">$89M+</div>
              <div className="text-white/80 font-semibold">Total Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* AFFILIATE OPPORTUNITY SECTION */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-yellow-400 text-black font-bold text-lg px-6 py-2 mb-6">
            💰 AFFILIATE OPPORTUNITY
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            EARN UP TO
            <span className="block text-yellow-300">40% COMMISSION</span>
          </h2>
          
          <p className="text-2xl md:text-3xl mb-12 opacity-90 max-w-4xl mx-auto">
            Partner with us and earn substantial commissions by referring clients to 
            <strong className="text-yellow-300"> America's #1 mobile tax service!</strong>
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">40%</div>
              <div className="text-white/90 font-semibold">Max Commission</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">$500</div>
              <div className="text-white/90 font-semibold">Avg Order Value</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">$0</div>
              <div className="text-white/90 font-semibold">Startup Cost</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-black mb-2 text-yellow-300">24/7</div>
              <div className="text-white/90 font-semibold">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/affiliate">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-2xl px-12 py-6 font-black rounded-full shadow-2xl transform hover:scale-105 transition-all">
                <DollarSign className="mr-3 h-8 w-8" />
                BECOME AN AFFILIATE
                <ArrowRight className="ml-3 h-8 w-8" />
              </Button>
            </Link>
            <a href="mailto:affiliates@lawsonmobiletax.com?subject=Affiliate Program Inquiry">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-xl px-10 py-6 font-bold rounded-full">
                <Mail className="mr-2 h-6 w-6" />
                Questions? Email Us
              </Button>
            </a>
          </div>
          
          <p className="text-white/80 mt-8 text-lg">
            💼 Perfect for CPAs, Financial Advisors, Business Coaches & Marketing Professionals
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Ready to Start Saving?</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href={`tel:${phoneNumber}`}>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-4 font-bold">
                <Phone className="mr-2 h-6 w-6" />
                Call: {phoneNumber}
              </Button>
            </a>
            <Link href="/client/onboarding">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 text-xl px-10 py-4 font-bold">
                <Crown className="mr-2 h-6 w-6" />
                Become a Client Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}