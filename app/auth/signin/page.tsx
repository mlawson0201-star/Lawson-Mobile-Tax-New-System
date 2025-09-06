
'use client'

import React, { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Users, 
  FileText, 
  Settings, 
  Star,
  Award,
  Phone,
  Shield,
  CheckCircle,
  Smartphone,
  Calculator,
  Clock,
  Zap,
  BadgeCheck,
  HeartHandshake,
  Eye,
  EyeOff,
  TrendingUp,
  Sparkles,
  Globe,
  Timer,
  ThumbsUp,
  Crown,
  Gem,
  Trophy,
  Rocket,
  Bot,
  Camera,
  Mic
} from 'lucide-react'
import { COMPANY_CONFIG, PORTALS } from '@/lib/constants'
import { MobileOptimizedLayout } from '@/components/mobile-optimized-layout'

const ParallaxElement = ({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  )
}

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentStats, setCurrentStats] = useState(0)

  const router = useRouter()

  const stats = [
    { value: "Elite", label: "Happy Clients", icon: Users },
    { value: "$89M+", label: "Refunds Secured", icon: TrendingUp },
    { value: "99.2%", label: "Satisfaction Rate", icon: Star },
    { value: "24hrs", label: "Avg Processing", icon: Clock }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        toast.error('🔐 Credentials don\'t match our secure records. Double-check and try again!')
      } else {
        toast.success('🎉 Welcome back to your premium tax workspace!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('⚡ Technical hiccup on our end. Try again or call our VIP support line!')
    } finally {
      setIsLoading(false)
    }
  }

  const portalOptions = [
    {
      id: 'client',
      href: '/auth/client/signin',
      title: 'I\'m a Premium Client',
      subtitle: 'Access your VIP tax workspace',
      description: 'Your secure command center for document upload, real-time refund tracking, direct communication with your dedicated CPA, and access to all your tax records.',
      icon: Crown,
      color: 'emerald',
      features: [
        'AI Document Recognition', 
        'Real-time Refund Tracking', 
        'Dedicated CPA Support',
        '24/7 Secure Access',
        'Mobile App Premium',
        'Priority Processing'
      ],
      highlight: 'Most Popular Choice',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
      borderGradient: 'from-emerald-400 to-teal-500',
      iconGradient: 'from-emerald-500 to-green-600',
      clients: '22,000+'
    },
    {
      id: 'preparer',
      href: '/auth/preparer/signin',
      title: 'I\'m a Tax Professional',
      subtitle: 'Your advanced workspace awaits',
      description: 'Complete professional ecosystem with AI-powered preparation tools, intelligent client management, automated workflows, and advanced analytics dashboard.',
      icon: Bot,
      color: 'blue',
      features: [
        'AI-Powered Tax Engine',
        'Advanced Client Portal', 
        'Automated Workflows',
        'Real-time Collaboration',
        'Advanced Analytics',
        'API Integrations'
      ],
      highlight: 'Pro Features Included',
      bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
      borderGradient: 'from-blue-400 to-purple-500',
      iconGradient: 'from-blue-500 to-indigo-600',
      clients: '450+'
    },
    {
      id: 'admin',
      href: '/auth/admin/signin',
      title: 'I\'m a System Administrator',
      subtitle: 'Master control center',
      description: 'Ultimate platform control with advanced user management, system configuration, comprehensive analytics, security monitoring, and enterprise-grade tools.',
      icon: Shield,
      color: 'purple',
      features: [
        'Enterprise Security',
        'Advanced User Management',
        'System Configuration',
        'Analytics Dashboard',
        'API Management',
        'Compliance Tools'
      ],
      highlight: 'Full System Access',
      bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
      borderGradient: 'from-purple-400 to-pink-500',
      iconGradient: 'from-purple-500 to-pink-600',
      clients: '50+'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <MobileOptimizedLayout showNavigation={false}>
      <div className="min-h-screen hero-gradient relative overflow-hidden">
        {/* Mouse Cursor Glow Effect */}
        <div 
          className="fixed w-96 h-96 rounded-full pointer-events-none z-10 opacity-20"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            transition: 'all 0.1s ease'
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl floating"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/10 rounded-full blur-lg floating" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-400/10 rounded-full blur-lg floating" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-20">
          
          {/* Ultra-Premium Header */}
          <div className="text-center mb-16">
            <ParallaxElement speed={0.3}>
              <Link href="/welcome" className="inline-flex items-center gap-6 mb-8 group hover-lift">
                <div className="p-4 bg-white rounded-3xl shadow-2xl group-hover:shadow-2xl transition-all pulse-ring">
                  <Image 
                    src="/lmt-logo-128.png" 
                    alt="LMT - Lawson Mobile Tax Logo" 
                    width={80} 
                    height={80}
                    className="h-20 w-20 object-contain"
                    priority
                    onError={(e) => {
                      e.currentTarget.src = '/lmt-logo-optimized.png'
                    }}
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-5xl font-bold text-white text-glow">{COMPANY_CONFIG.name}</h1>
                  <p className="text-white/90 font-semibold text-xl">{COMPANY_CONFIG.tagline}</p>
                </div>
              </Link>
            </ParallaxElement>
            
            <ParallaxElement speed={0.2}>
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-bold text-white text-glow">
                  Welcome to Your Premium Tax Portal
                </h2>
                <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                  Step into your secure workspace where AI meets human expertise. 
                  Join <strong className="text-yellow-300">elite</strong> clients who trust us 
                  with their financial success.
                </p>
              </div>
            </ParallaxElement>

            {/* Enhanced Trust Indicators */}
            <ParallaxElement speed={0.1}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="morphism text-white px-6 py-3 rounded-full hover-lift">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-green-400" />
                    <span className="font-bold">IRS Authorized e-file Provider</span>
                  </div>
                </div>
                <div className="morphism text-white px-6 py-3 rounded-full hover-lift">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <span className="font-bold">Military-Grade Security</span>
                  </div>
                </div>
                <div className="morphism text-white px-6 py-3 rounded-full hover-lift">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <span className="font-bold">$3,247 Average Increase</span>
                  </div>
                </div>
                <div className="morphism text-white px-6 py-3 rounded-full hover-lift">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-pink-400" />
                    <span className="font-bold">99.2% Satisfaction Rate</span>
                  </div>
                </div>
              </div>
            </ParallaxElement>

            {/* Live Stats Ticker */}
            <ParallaxElement speed={0.05}>
              <div className="mt-8">
                <div className="ultra-premium-card bg-white/10 backdrop-blur-xl border-white/20 p-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 ultra-button rounded-full flex items-center justify-center pulse-ring">
                      {React.createElement(stats[currentStats].icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white text-glow">{stats[currentStats].value}</div>
                      <div className="text-white/80 font-semibold">{stats[currentStats].label}</div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </ParallaxElement>
          </div>

          <div className="grid xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
            
            {/* Ultra-Premium Portal Selection */}
            <div className="xl:col-span-3 space-y-8">
              <div className="grid gap-8">
                {portalOptions.map((portal, index) => (
                  <ParallaxElement key={portal.id} speed={0.1 + index * 0.05}>
                    <Link href={portal.href} className="group block">
                      <div className={`ultra-premium-card bg-gradient-to-br ${portal.bgGradient} border-2 border-transparent hover:border-opacity-100 group-hover:shadow-2xl relative overflow-hidden`}
                           style={{borderImage: `linear-gradient(135deg, ${portal.borderGradient}) 1`}}>
                        
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] animate-pulse"></div>
                        </div>
                        
                        <div className="relative z-10 p-8">
                          <div className="flex flex-col lg:flex-row items-start gap-8">
                            {/* Enhanced Icon & Badge */}
                            <div className="relative flex-shrink-0">
                              <div className={`w-28 h-28 bg-gradient-to-br ${portal.iconGradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform pulse-ring`}>
                                <portal.icon className="h-16 w-16 text-white" />
                              </div>
                              <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-bold shadow-xl rounded-xl border-0">
                                {portal.highlight}
                              </Badge>
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            
                            {/* Enhanced Content */}
                            <div className="flex-1 space-y-6">
                              <div className="space-y-3">
                                <div>
                                  <h3 className="text-4xl font-bold premium-gradient-text">{portal.title}</h3>
                                  <p className="text-lg font-semibold text-gray-600 mt-1">{portal.subtitle}</p>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                  {portal.description}
                                </p>
                              </div>
                              
                              {/* Enhanced Features Grid */}
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {portal.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200/50 hover:bg-white/90 transition-all">
                                    <div className={`w-2 h-2 bg-gradient-to-r ${portal.borderGradient} rounded-full`}></div>
                                    <span className="text-sm font-semibold text-gray-700">{feature}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Enhanced CTA Section */}
                              <div className="flex items-center justify-between pt-4">
                                <div className="space-y-1">
                                  <div className="text-sm text-gray-600 font-semibold">
                                    🎯 Trusted by <strong>{portal.clients}</strong> users
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">4.9/5 rating</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 text-xl font-bold premium-gradient-text">
                                  <span>Access Portal</span>
                                  <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ParallaxElement>
                ))}
              </div>

              {/* Enhanced Professional Team Showcase */}
              <ParallaxElement speed={0.2}>
                <div className="ultra-premium-card bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200 particles">
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl pulse-ring">
                        <Users className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-4xl font-bold premium-gradient-text mb-4">Meet Your Elite Tax Team</h3>
                      <p className="text-gray-600 text-xl leading-relaxed">
                        Certified professionals with 147+ years combined experience and advanced AI tools
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                      {COMPANY_CONFIG.team.leadProfessionals.slice(0, 2).map((prof, index) => (
                        <div key={index} className="ultra-premium-card bg-white/80 backdrop-blur-sm border border-white/50 p-6 hover-lift">
                          <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl pulse-ring">
                              {prof.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="space-y-2">
                              <p className="font-bold text-gray-900 text-xl">{prof.name}</p>
                              <p className="text-lg text-primary font-bold">{prof.title}</p>
                              <p className="text-sm text-gray-600">{prof.experience} years • {prof.specialties[0]}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-sm text-gray-500 ml-2 font-semibold">5.0 rating</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center space-y-6">
                      <p className="text-2xl font-bold premium-gradient-text">
                        + {COMPANY_CONFIG.team.totalProfessionals - 2} more certified professionals
                      </p>
                      <p className="text-gray-600 text-lg">
                        Combined {COMPANY_CONFIG.team.combinedExperience} years of expertise • All CPA/EA certified • AI-enhanced workflows
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                        {[
                          { metric: "99.2%", label: "Client Satisfaction", color: "from-green-500 to-emerald-600" },
                          { metric: "$89M+", label: "Refunds Secured", color: "from-blue-500 to-cyan-600" },
                          { metric: "27K+", label: "Happy Clients", color: "from-purple-500 to-pink-600" },
                          { metric: "24hr", label: "Avg Processing", color: "from-orange-500 to-red-600" }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-xl`}>
                              <Trophy className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold premium-gradient-text">{stat.metric}</div>
                            <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxElement>
            </div>

            {/* Ultra-Premium Quick Sign In */}
            <div className="space-y-8">
              <ParallaxElement speed={0.4}>
                {/* Premium Login Form */}
                <div className="ultra-premium-card bg-white/90 backdrop-blur-xl border border-white/30 neon-glow">
                  <div className="p-8">
                    <div className="text-center mb-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl pulse-ring">
                        <Lock className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold premium-gradient-text mb-3">VIP Access</h3>
                      <p className="text-gray-600 text-lg">
                        Welcome back to your premium workspace
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-gray-700 font-bold">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-primary focus:ring-primary rounded-2xl neon-glow"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="password" className="text-gray-700 font-bold">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your secure password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-14 pr-14 h-16 text-lg border-2 border-gray-200 focus:border-primary focus:ring-primary rounded-2xl neon-glow"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                          </button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full h-16 ultra-button text-xl font-bold rounded-2xl neon-glow" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin mr-3" />
                            Accessing your premium workspace...
                          </>
                        ) : (
                          <>
                            <Crown className="mr-3 h-6 w-6" />
                            Enter VIP Portal
                            <Sparkles className="ml-3 h-6 w-6" />
                          </>
                        )}
                      </Button>
                    </form>
                    
                    <div className="mt-10 text-center space-y-6">
                      <p className="text-sm text-gray-600 font-semibold">
                        Need assistance with your account?
                      </p>
                      <a href={`tel:${COMPANY_CONFIG.contact.phone}`}>
                        <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-14 text-lg font-bold rounded-2xl">
                          <Phone className="mr-3 h-5 w-5" />
                          VIP Support: {COMPANY_CONFIG.contact.phone}
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500">
                        Available {COMPANY_CONFIG.contact.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </ParallaxElement>

              <ParallaxElement speed={0.3}>
                {/* Ultra-Premium Support Card */}
                <div className="ultra-premium-card bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white border-0 neon-glow">
                  <div className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center pulse-ring">
                      <HeartHandshake className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-2xl text-glow">VIP Concierge Support</h4>
                    <p className="text-white/90 leading-relaxed text-lg">
                      Our dedicated support team provides white-glove assistance with any questions, 
                      technical issues, or account access needs.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                        <span className="text-white/80 font-semibold">VIP Hotline:</span>
                        <span className="font-bold text-white text-lg">{COMPANY_CONFIG.contact.phone}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                        <span className="text-white/80 font-semibold">Email Support:</span>
                        <span className="font-bold text-white">{COMPANY_CONFIG.contact.email}</span>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                        <div className="text-white/80 text-sm font-semibold">Premium Hours</div>
                        <div className="font-bold text-white">{COMPANY_CONFIG.contact.hours}</div>
                      </div>
                    </div>

                    <a href="tel:(855) 722-8700">
                      <Button variant="secondary" className="w-full bg-white text-primary hover:bg-gray-100 h-14 text-lg font-bold rounded-2xl">
                        <Zap className="mr-2 h-5 w-5" />
                        Get Instant Help: (855) 722-8700
                      </Button>
                    </a>
                  </div>
                </div>
              </ParallaxElement>

              <ParallaxElement speed={0.1}>
                {/* Enhanced Security & Trust Badges */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="ultra-premium-card text-center p-6 hover-glow hover-lift">
                    <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                    <p className="text-lg font-bold text-gray-900 mb-2">Military-Grade</p>
                    <p className="text-sm text-gray-600 font-semibold">Security</p>
                    <div className="flex justify-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-emerald-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="ultra-premium-card text-center p-6 hover-glow hover-lift">
                    <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-bold text-gray-900 mb-2">IRS Certified</p>
                    <p className="text-sm text-gray-600 font-semibold">Professionals</p>
                    <div className="flex justify-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </ParallaxElement>
            </div>
          </div>

          {/* Ultra-Premium Bottom CTA */}
          <ParallaxElement speed={0.5}>
            <div className="text-center mt-24">
              <div className="ultra-premium-card max-w-5xl mx-auto bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-emerald-300 neon-glow particles">
                <div className="relative z-10 p-12 text-center space-y-8">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl pulse-ring">
                      <Rocket className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold premium-gradient-text">
                    First Time? Start with Your FREE Maximum Refund Estimate! 🚀
                  </h3>
                  <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Discover exactly how much you could save with professional tax preparation. 
                    Our AI-powered calculator reveals the difference between DIY and professional service.
                  </p>
                  
                  <div className="grid md:grid-cols-4 gap-6 text-lg">
                    {[
                      { icon: TrendingUp, text: "Average $3,247 increase", color: "text-green-700" },
                      { icon: Timer, text: "60-second estimate", color: "text-blue-700" },
                      { icon: Shield, text: "No personal info required", color: "text-purple-700" },
                      { icon: Gem, text: "Zero obligation", color: "text-pink-700" }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                        <span className={`font-bold ${item.color}`}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/welcome">
                    <Button className="ultra-button text-2xl px-16 py-8 rounded-3xl font-bold neon-glow hover-lift">
                      <Calculator className="mr-4 h-8 w-8" />
                      Calculate My Maximum Refund
                      <Zap className="ml-4 h-8 w-8" />
                    </Button>
                  </Link>
                  
                  <p className="text-lg text-gray-500 mt-6">
                    🏆 <strong>Trusted by elite taxpayers</strong> • ⭐ <strong>4.9/5 stars</strong> • 🛡️ <strong>IRS authorized</strong>
                  </p>
                </div>
              </div>
            </div>
          </ParallaxElement>
        </div>
      </div>
    </MobileOptimizedLayout>
  )
}
