
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Calendar,
  Calculator,
  Building2,
  FileText,
  Phone,
  Crown,
  Shield,
  Target,
  DollarSign,
  TrendingUp,
  GraduationCap
} from 'lucide-react'

export default function ClientOnboardingPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [phoneNumber] = useState('(855) 722-8700')

  const services = [
    {
      id: 'student',
      title: 'Student Tax Returns',
      subtitle: 'Special pricing for students with simple tax situations',
      price: 199,
      originalPrice: 399,
      savings: 200,
      features: [
        'Student tax return preparation',
        '1098-T education forms',
        'Education credit optimization',
        'Part-time job income handling',
        'Fast student refunds',
        'Student deduction maximization'
      ],
      clientTypes: ['College Students', 'Graduate Students', 'Trade School', 'Part-time Workers'],
      avgSavings: '$1,500',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-700',
      intakeForm: '/intake/student'
    },
    {
      id: 'individual',
      title: 'Standard Tax Returns',
      subtitle: 'Complete tax preparation for individuals and families',
      price: 499,
      originalPrice: 899,
      savings: 400,
      features: [
        'Complete tax return preparation',
        'Maximum deduction identification',
        'IRS audit protection included',
        'Electronic filing with fast refunds',
        'Year-round tax support',
        'Amendment services if needed'
      ],
      clientTypes: ['Individuals', 'Families', 'Homeowners', 'Investors'],
      avgSavings: '$3,247',
      icon: Users,
      color: 'from-green-500 to-green-700',
      intakeForm: '/intake/individual'
    },
    {
      id: 'business',
      title: 'Business Tax Services',
      subtitle: 'Complete business tax solutions for all entity types',
      price: 1499,
      originalPrice: 2999,
      savings: 1500,
      features: [
        'Business tax return preparation',
        'Quarterly tax planning sessions',
        'Business deduction maximization',
        'Multi-state filing capabilities',
        'IRS representation included',
        'Business structure optimization advice'
      ],
      clientTypes: ['LLCs', 'S-Corps', 'Partnerships', 'Sole Proprietors'],
      avgSavings: '$15,750',
      icon: Building2,
      color: 'from-purple-500 to-purple-700',
      intakeForm: '/intake/business'
    },
    {
      id: 'bookkeeping',
      title: 'Monthly Bookkeeping',
      subtitle: 'Professional bookkeeping and financial management',
      price: 199,
      originalPrice: 399,
      savings: 200,
      features: [
        'Monthly financial statements',
        'Bank account reconciliation',
        'Expense categorization',
        'QuickBooks setup and management',
        'Tax preparation discount',
        'Financial analysis reports'
      ],
      clientTypes: ['Small Businesses', 'Freelancers', 'Contractors', 'Startups'],
      avgSavings: '$2,400',
      icon: Calculator,
      color: 'from-cyan-500 to-cyan-700',
      intakeForm: '/intake/bookkeeping'
    },
    {
      id: 'debt-resolution',
      title: 'Tax Debt Resolution',
      subtitle: 'Expert help with IRS debt and collection defense',
      price: 299,
      originalPrice: 599,
      savings: 300,
      features: [
        'IRS debt analysis and review',
        'Payment plan negotiations',
        'Offer in compromise assistance',
        'Collection defense representation',
        'Penalty and interest reduction',
        'Tax lien and levy resolution'
      ],
      clientTypes: ['Individuals with Tax Debt', 'Businesses with IRS Issues', 'Non-Filers', 'Collection Cases'],
      avgSavings: '$5,000+',
      icon: Shield,
      color: 'from-red-500 to-red-700',
      intakeForm: '/intake/debt-resolution'
    },
    {
      id: 'planning-guide',
      title: 'Tax Planning Guide',
      subtitle: 'Personalized premium tax planning strategies',
      price: 49.99,
      originalPrice: 149,
      savings: 99.01,
      features: [
        'Custom tax planning strategy',
        'Comprehensive deduction checklist',
        'Year-round optimization tips',
        'Quarterly planning reminders',
        'Investment tax strategies',
        'Retirement planning guidance'
      ],
      clientTypes: ['High Earners', 'Investors', 'Business Owners', 'Retirees'],
      avgSavings: '$2,000+',
      icon: FileText,
      color: 'from-yellow-500 to-yellow-600',
      intakeForm: '/intake/planning-guide'
    },
    {
      id: 'tax-evaluation',
      title: 'Tax Evaluation',
      subtitle: 'Discover hidden deductions and maximize your refund',
      price: 19.99,
      originalPrice: 79,
      savings: 59.01,
      features: [
        'Personalized tax analysis report',
        'Hidden deduction identification',
        'Refund maximization strategy',
        'Expert tax recommendations',
        'Next steps action plan',
        '24-hour turnaround time'
      ],
      clientTypes: ['Anyone with Tax Questions', 'Previous DIY Filers', 'Unsatisfied with Current Preparer', 'First-Time Clients'],
      avgSavings: '$2,847',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      intakeForm: '/tax-evaluation'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
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

            <div className="flex items-center gap-4">
              <a href={`tel:${phoneNumber}`} className="text-gray-600 hover:text-green-600 font-medium flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {phoneNumber}
              </a>
              <Link href="/auth/client/signin">
                <Button variant="outline">
                  Existing Client Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/welcome" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="bg-green-600 text-white font-bold text-lg px-6 py-2 mb-6">
            🎯 CHOOSE YOUR SERVICE & BECOME A CLIENT
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            SELECT YOUR
            <span className="block text-green-600">TAX SERVICE</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your service, complete your information, and we'll automatically create your secure client account. 
            <strong className="text-green-600">Start saving money today!</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">27,500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">$89M+</div>
              <div className="text-gray-600">Total Saved</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">99.2%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => {
              const Icon = service.icon
              const isSelected = selectedService === service.id
              
              return (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                    isSelected 
                      ? 'ring-4 ring-green-500 shadow-2xl transform scale-105' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-center">{service.title}</CardTitle>
                    <p className="text-gray-600 text-center">{service.subtitle}</p>
                    
                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-black text-green-600">${service.price}</span>
                        <span className="text-lg text-gray-500 line-through">${service.originalPrice}</span>
                      </div>
                      <Badge className="bg-red-100 text-red-700">
                        Save ${service.savings}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Average Client Savings:</span>
                        <span className="font-bold text-green-600">{service.avgSavings}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Perfect for: {service.clientTypes.join(', ')}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <div className="animate-in slide-in-from-bottom duration-300">
                        <Link href={service.intakeForm}>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                            <Crown className="mr-2 h-5 w-5" />
                            Get Started - ${service.price}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Selection Prompt */}
          {!selectedService && (
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-2xl mx-auto">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Choose Your Service Above</h3>
                <p className="text-blue-700">
                  Click on any service to see more details and get started. 
                  Once you select a service, we'll guide you through a simple intake process.
                </p>
              </div>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose Us?</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold mb-2">IRS Audit Protection</h4>
                <p className="text-sm text-gray-600">Full representation included with every service</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold mb-2">5-Star Rated</h4>
                <p className="text-sm text-gray-600">Highest customer satisfaction in the industry</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Maximum Refunds</h4>
                <p className="text-sm text-gray-600">We find every deduction you deserve</p>
              </div>
              <div className="text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Year-Round Support</h4>
                <p className="text-sm text-gray-600">Always available when you need us</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Have questions? Our tax experts are here to help!
            </p>
            <a href={`tel:${phoneNumber}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-8 py-4">
                <Phone className="mr-2 h-5 w-5" />
                Call {phoneNumber}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
