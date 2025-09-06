
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
import { Building2, Mail, Lock, ArrowRight, Loader2, Settings, ArrowLeft, Shield, Database, Users, BarChart3, Cog } from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function AdminSignInPage() {
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
        toast.error('Invalid administrator credentials')
      } else {
        toast.success('Welcome to Administrator Portal!')
        router.push('/admin/dashboard')
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
        {/* Left Side - Admin Portal Info */}
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
                  <h1 className="text-2xl font-bold text-gray-900">Administrator Portal</h1>
                  <p className="text-purple-600 font-medium">{COMPANY_CONFIG.name}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">System administration and business management console</p>
          </div>

          {/* Admin Features */}
          <div className="grid gap-4">
            <h3 className="font-semibold text-gray-900 mb-3">Administrative Tools:</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Security Management</h4>
                  <p className="text-sm text-gray-600">User access & permissions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">System Configuration</h4>
                  <p className="text-sm text-gray-600">Platform settings</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">User Management</h4>
                  <p className="text-sm text-gray-600">Staff & client accounts</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Business Analytics</h4>
                  <p className="text-sm text-gray-600">Revenue & performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">System Overview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Database: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">API: Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Security: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Backup: Current</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800 mb-1">Security Notice</h4>
                <p className="text-sm text-red-700">
                  Administrator access is logged and monitored. Ensure you're using secure credentials and connecting from authorized networks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div>
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold">Administrator Sign In</CardTitle>
              <CardDescription>
                Secure access to system administration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Administrator Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@lawsonmobiletax.com"
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
                      placeholder="Enter your secure password"
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
                      Access Administrator Portal
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
                    Account recovery
                  </Link>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <p>System issues?</p>
                  <a 
                    href={`mailto:${COMPANY_CONFIG.contact.email}?subject=Admin Portal Support`}
                    className="font-medium text-purple-600 hover:text-purple-500"
                  >
                    Contact System Administrator
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Demo Access</h4>
            <p className="text-sm text-yellow-700 mb-2">Use these credentials to test admin functions:</p>
            <div className="text-sm text-yellow-700 font-mono">
              <div>Email: admin@lawsonmobiletax.com</div>
              <div>Password: LawsonAdmin2024!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
