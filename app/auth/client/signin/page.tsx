
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Building2, Mail, Lock, ArrowRight, Loader2, Users, ArrowLeft, FileText, Calendar, Upload } from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function ClientSignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
        toast.error('Invalid client credentials')
      } else {
        toast.success('Welcome to your Client Portal!')
        router.push('/client/dashboard')
      }
    } catch (error) {
      toast.error('Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Client Portal Info */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <Link href="/auth/signin" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Portal Selection
            </Link>
            
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-md">
                  <Image 
                    src="/lmt-logo-32.png" 
                    alt="LMT Logo" 
                    width={32} 
                    height={32}
                    className="h-8 w-8 object-contain"
                    priority
                    onError={(e) => {
                      e.currentTarget.src = '/lmt-logo-64.png'
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
                  <p className="text-purple-600 font-medium">{COMPANY_CONFIG.name}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Secure access to your tax information and documents</p>
          </div>

          {/* Client Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">What you can do:</h3>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">View Tax Returns</h4>
                <p className="text-sm text-gray-600">Access current and past tax returns</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Upload Documents</h4>
                <p className="text-sm text-gray-600">Securely submit tax documents</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Schedule Appointments</h4>
                <p className="text-sm text-gray-600">Book consultations with tax professionals</p>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Our Services</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>{COMPANY_CONFIG.pricing.essential.name}</span>
                <span>${COMPANY_CONFIG.pricing.essential.min} - ${COMPANY_CONFIG.pricing.essential.max}</span>
              </div>
              <div className="flex justify-between">
                <span>{COMPANY_CONFIG.pricing.professional.name}</span>
                <span>${COMPANY_CONFIG.pricing.professional.min} - ${COMPANY_CONFIG.pricing.professional.max}</span>
              </div>
              <div className="flex justify-between">
                <span>{COMPANY_CONFIG.pricing.business.name}</span>
                <span>${COMPANY_CONFIG.pricing.business.min} - ${COMPANY_CONFIG.pricing.business.max}</span>
              </div>
              <div className="flex justify-between">
                <span>{COMPANY_CONFIG.pricing.enterprise.name}</span>
                <span>${COMPANY_CONFIG.pricing.enterprise.min} - ${COMPANY_CONFIG.pricing.enterprise.max}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div>
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold">Client Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-purple-600 hover:bg-purple-700" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Access Client Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 space-y-3">
                <div className="text-center">
                  <Link 
                    href="/auth/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    New client?{' '}
                    <a 
                      href={`tel:${COMPANY_CONFIG.contact.phone}`}
                      className="font-medium text-purple-600 hover:text-purple-500"
                    >
                      Call {COMPANY_CONFIG.contact.phone}
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
