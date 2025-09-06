

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  Home,
  FileText,
  Users,
  GraduationCap,
  BarChart3,
  Phone,
  User,
  LogIn,
  Target,
  DollarSign,
  Calendar,
  Settings,
  Shield,
  Building2,
  Bot,
  Zap,
  CreditCard,
  Smartphone,
  Rocket,
  Crown,
  Sparkles,
  Globe,
  Puzzle
} from 'lucide-react'

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  const handleMobileLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-xl border-b-2 border-purple-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Mobile Optimized */}
          <Link href="/welcome" className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative">
              <img 
                src="/lmt-avatar.jpg" 
                alt="LMT - Lawson Mobile Tax" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-500 shadow-lg"
                style={{ minWidth: '40px', minHeight: '40px' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = "/lmt-logo-64.png";
                  target.className = "w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-purple-500 shadow-lg";
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Lawson Mobile Tax</h1>
              <p className="text-xs sm:text-sm text-purple-600 hidden md:block">Professional Tax Services</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-base font-bold text-gray-900">LMT</h1>
            </div>
          </Link>

          {/* Desktop Navigation - Simplified Working Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Services */}
            <Link href="/services">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                <FileText className="h-4 w-4 mr-2" />
                Services
              </Button>
            </Link>

            {/* Phase 1 Features */}
            <Link href="/phase1-features">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 relative">
                <Rocket className="h-4 w-4 mr-2" />
                Phase 1 Features
                <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-1 py-0">
                  LIVE
                </Badge>
              </Button>
            </Link>

            {/* Phase 2 Features */}
            <Link href="/phase2-features">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 relative">
                <Sparkles className="h-4 w-4 mr-2" />
                Phase 2 Features
                <Badge className="ml-2 bg-gradient-to-r from-green-600 to-purple-600 text-white text-xs px-1 py-0">
                  NEW
                </Badge>
              </Button>
            </Link>

            {/* Client Portal */}
            <Link href="/auth/client/signin">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                <User className="h-4 w-4 mr-2" />
                Client Portal
              </Button>
            </Link>

            {/* Training */}
            <Link href="/training">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                <GraduationCap className="h-4 w-4 mr-2" />
                Training
              </Button>
            </Link>

            {/* Affiliate Program - NEW */}
            <Link href="/affiliate">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-bold relative">
                <DollarSign className="h-4 w-4 mr-2" />
                Become an Affiliate
                <Badge className="ml-2 bg-gradient-to-r from-green-600 to-yellow-500 text-white text-xs px-1 py-0">
                  EARN 40%
                </Badge>
              </Button>
            </Link>

            {/* Business Tools */}
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                <Building2 className="h-4 w-4 mr-2" />
                Business Tools
              </Button>
            </Link>

            {/* Contact */}
            <Link href="tel:(855) 722-8700">
              <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold">
                <Phone className="h-4 w-4 mr-2" />
                (855) 722-8700
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              aria-expanded={isOpen}
              aria-label="Main menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-1.5 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 translate-y-1.5' : 'translate-y-3'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Completely Rebuilt */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            
            {/* Home */}
            <Link
              href="/welcome"
              className="group flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
              onClick={handleMobileLinkClick}
            >
              <Home className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600" />
              Home
            </Link>

            {/* Services */}
            <Link
              href="/services"
              className="group flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
              onClick={handleMobileLinkClick}
            >
              <FileText className="h-5 w-5 mr-3 text-gray-500 group-hover:text-purple-600" />
              All Services
            </Link>

            {/* Tax Evaluation - Highlighted */}
            <Link
              href="/tax-evaluation"
              className="group flex items-center px-4 py-3 text-base font-medium bg-yellow-50 text-yellow-800 hover:bg-yellow-100 rounded-lg transition-all duration-200 border border-yellow-200"
              onClick={handleMobileLinkClick}
            >
              <Target className="h-5 w-5 mr-3 text-yellow-600" />
              Tax Evaluation - $19.99
              <Badge className="ml-auto bg-yellow-200 text-yellow-800 text-xs">Popular</Badge>
            </Link>

            {/* Phase 1 Features */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Platform Features</div>
              <Link
                href="/phase1-features"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
                onClick={handleMobileLinkClick}
              >
                <Rocket className="h-4 w-4 mr-3 text-gray-500 group-hover:text-purple-600" />
                Phase 1 Features
                <Badge className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">NEW</Badge>
              </Link>
              <Link
                href="/phase2-features"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
                onClick={handleMobileLinkClick}
              >
                <Sparkles className="h-4 w-4 mr-3 text-gray-500 group-hover:text-purple-600" />
                Phase 2 Features
                <Badge className="ml-auto bg-gradient-to-r from-green-600 to-purple-600 text-white text-xs">LIVE</Badge>
              </Link>
            </div>

            {/* Client Area */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Client Area</div>
              <Link
                href="/client/onboarding"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
                onClick={handleMobileLinkClick}
              >
                <Users className="h-4 w-4 mr-3 text-gray-500 group-hover:text-purple-600" />
                Become a Client
              </Link>
              <Link
                href="/dashboard"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
                onClick={handleMobileLinkClick}
              >
                <Building2 className="h-4 w-4 mr-3 text-gray-500 group-hover:text-purple-600" />
                Business Dashboard
              </Link>
              <Link
                href="/training"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200"
                onClick={handleMobileLinkClick}
              >
                <GraduationCap className="h-4 w-4 mr-3 text-gray-500 group-hover:text-purple-600" />
                Training Center
              </Link>
              <Link
                href="/affiliate"
                className="group flex items-center px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-all duration-200 font-bold"
                onClick={handleMobileLinkClick}
              >
                <DollarSign className="h-4 w-4 mr-3 text-purple-600 group-hover:text-purple-700" />
                Become an Affiliate
                <Badge className="ml-auto bg-gradient-to-r from-green-600 to-yellow-500 text-white text-xs">EARN 40%</Badge>
              </Link>
            </div>

            {/* Contact Button - Mobile Optimized */}
            <div className="px-4 pt-4 border-t border-gray-200">
              <a href="tel:(855) 722-8700" className="block">
                <div className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Phone className="h-5 w-5 mr-3" />
                  Call (855) 722-8700
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
