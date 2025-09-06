
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
import { Building2, Mail, Lock, ArrowRight, Loader2, FileText, ArrowLeft, Calculator, Users, BarChart3, Calendar } from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function PreparerSignInPage() {
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
        toast.error('Invalid preparer credentials')
      } else {
        toast.success('Welcome to your Tax Preparer Portal!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Preparer Portal Info */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <Link href="/auth/signin" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Portal Selection
            </Link>
            
            <div className="flex items-center justify-center lg:justify-start mb-4">
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
                  <h1 className="text-2xl font-bold text-gray-900">Tax Preparer Portal</h1>
                  <p className="text-purple-600 font-medium">{COMPANY_CONFIG.name}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Professional workspace for tax preparation and client management</p>
          </div>

          {/* Preparer Features */}
          <div className="grid gap-4">
            <h3 className="font-semibold text-gray-900 mb-3">Professional Tools:</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Tax Preparation</h4>
                  <p className="text-sm text-gray-600">Complete return processing</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Client Management</h4>
                  <p className="text-sm text-gray-600">Complete CRM system</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Analytics & Reports</h4>
                  <p className="text-sm text-gray-600">Performance insights</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Scheduling</h4>
                  <p className="text-sm text-gray-600">Appointment management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Professional Features</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                Advanced tax calculation engine
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                AI-powered optimization suggestions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                Secure document management
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                Client communication tools
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div>
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold">Preparer Sign In</CardTitle>
              <CardDescription>
                Access your professional workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Professional Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="preparer@lawsonmobiletax.com"
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
                      Access Preparer Portal
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
                <div className="text-center text-sm text-gray-600">
                  <p>Need technical support?</p>
                  <a 
                    href={`mailto:${COMPANY_CONFIG.contact.email}`}
                    className="font-medium text-purple-600 hover:text-purple-500"
                  >
                    Contact IT Support
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Demo Access</h4>
            <p className="text-sm text-yellow-700 mb-2">Use these credentials to test the system:</p>
            <div className="text-sm text-yellow-700 font-mono">
              <div>Email: preparer@lawsonmobiletax.com</div>
              <div>Password: PreparerAccess2024!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
