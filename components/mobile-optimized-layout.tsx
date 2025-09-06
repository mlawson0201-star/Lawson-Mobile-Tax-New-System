
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText,
  Calendar,
  DollarSign,
  User,
  Building2,
  Home,
  Users,
  Calculator,
  Shield,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react'

interface MobileOptimizedLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
  title?: string
  subtitle?: string
}

export function MobileOptimizedLayout({ 
  children, 
  showNavigation = true, 
  title = "Lawson Mobile Tax",
  subtitle = "Professional Tax Services At Your Fingertips" 
}: MobileOptimizedLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    return () => window.removeEventListener('resize', checkDeviceType)
  }, [])

  const navigationItems = [
    { name: 'Services', href: '/services', icon: FileText },
    { name: 'Client Portal', href: '/auth/client/signin', icon: User },
    { name: 'Tax Preparer', href: '/auth/preparer/signin', icon: Calculator },
    { name: 'Admin Portal', href: '/auth/admin/signin', icon: Shield },
    { name: 'Contact', href: '#contact', icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{title}</h1>
                <p className="text-xs sm:text-sm text-purple-600 hidden sm:block">{subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </a>
                )
              })}
              
              {/* PROMINENT BECOME A CLIENT CTA */}
              <a href="/auth/client/signin">
                <Button className="bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <User className="h-4 w-4 mr-2" />
                  BECOME A CLIENT
                </Button>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-purple-600" />
                      {title}
                    </SheetTitle>
                    <SheetDescription>
                      Navigate to your tax services
                    </SheetDescription>
                  </SheetHeader>
                  
                  {/* PROMINENT MOBILE BECOME A CLIENT CTA */}
                  <div className="mt-6">
                    <a href="/auth/client/signin">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white font-bold py-4 rounded-lg shadow-lg text-lg mb-6">
                        <User className="h-6 w-6 mr-3" />
                        BECOME A CLIENT NOW
                      </Button>
                    </a>
                  </div>

                  <div className="mt-4 space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </a>
                      )
                    })}
                  </div>

                  {/* Mobile Quick Contact */}
                  <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                    <div className="space-y-2">
                      <a href="tel:(855) 722-8700" className="flex items-center gap-2 text-sm text-purple-600">
                        <Phone className="h-4 w-4" />
                        (855) 722-8700
                      </a>
                      <a href="mailto:lmt@lawsonmobiletax.com" className="flex items-center gap-2 text-sm text-purple-600">
                        <Mail className="h-4 w-4" />
                        Get Support
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Device Type Indicator (Development/Debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <Badge variant="secondary" className="flex items-center gap-1">
            {deviceType === 'mobile' && <Smartphone className="h-3 w-3" />}
            {deviceType === 'tablet' && <Tablet className="h-3 w-3" />}
            {deviceType === 'desktop' && <Monitor className="h-3 w-3" />}
            {deviceType}
          </Badge>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile-Optimized Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-purple-400" />
                <h3 className="text-lg font-bold">{title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional tax preparation and financial planning services 
                designed for individuals and businesses.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Access</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/auth/client/signin" className="text-gray-400 hover:text-white transition-colors">Client Portal</a></li>
                <li><a href="/auth/preparer/signin" className="text-gray-400 hover:text-white transition-colors">Tax Preparer Portal</a></li>
                <li><a href="/auth/signup" className="text-gray-400 hover:text-white transition-colors">New Client Signup</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400">Individual Tax Returns</span></li>
                <li><span className="text-gray-400">Business Tax Planning</span></li>
                <li><span className="text-gray-400">Tax Resolution</span></li>
                <li><span className="text-gray-400">Bookkeeping Services</span></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <a href="tel:(855) 722-8700" className="text-gray-400 hover:text-white transition-colors">
                    (855) 722-8700
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <a href="mailto:lmt@lawsonmobiletax.com" className="text-gray-400 hover:text-white transition-colors">
                    lmt@lawsonmobiletax.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-400">Professional Tax Services</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © 2025 Lawson Mobile Tax. All rights reserved. Professional tax services you can trust.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                <span>CTEC Registered</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* Mobile-Optimized Card Component */
export function MobileOptimizedCard({ 
  title, 
  description, 
  children, 
  className = "",
  collapsible = false 
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  collapsible?: boolean
}) {
  const [isOpen, setIsOpen] = useState(!collapsible)

  if (collapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className={`${className} transition-all duration-200`}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
                  {description && (
                    <CardDescription className="text-sm mt-1">{description}</CardDescription>
                  )}
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {children}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

/* Mobile-Optimized Button Group */
export function MobileButtonGroup({ 
  buttons, 
  orientation = 'horizontal' 
}: {
  buttons: Array<{ label: string; onClick: () => void; variant?: any; icon?: any }>
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <div className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}`}>
      {buttons.map((button, index) => {
        const Icon = button.icon
        return (
          <Button
            key={index}
            variant={button.variant || 'default'}
            onClick={button.onClick}
            className={`${orientation === 'vertical' ? 'w-full justify-start' : 'flex-1 min-w-0'} text-sm`}
          >
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            <span className="truncate">{button.label}</span>
          </Button>
        )
      })}
    </div>
  )
}

/* Responsive Grid Component */
export function ResponsiveGrid({ 
  children, 
  columns = { mobile: 1, tablet: 2, desktop: 3 } 
}: {
  children: React.ReactNode
  columns?: { mobile: number, tablet: number, desktop: number }
}) {
  const gridClass = `grid gap-4 grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`
  
  return (
    <div className={gridClass}>
      {children}
    </div>
  )
}

export default MobileOptimizedLayout
