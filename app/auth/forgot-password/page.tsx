
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft, Mail, Send, Shield, CheckCircle } from 'lucide-react'
import { COMPANY_CONFIG } from '@/lib/constants'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset request
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    toast.success('Password reset instructions sent to your email!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="text-center space-y-4 pb-8 bg-gradient-to-br from-primary to-secondary text-white">
            <Link href="/auth/signin" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
            
            <div className="p-3 bg-white rounded-2xl mx-auto w-fit">
              <Image 
                src="/lmt-logo-64.png" 
                alt="LMT Logo" 
                width={64} 
                height={64}
                className="h-16 w-16 object-contain"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/lmt-logo-128.png'
                }}
              />
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-white">Password Recovery</CardTitle>
              <p className="text-blue-100 mt-2">{COMPANY_CONFIG.name}</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Forgot your password?
                  </h3>
                  <p className="text-gray-600">
                    No worries! Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending Instructions...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Reset Instructions
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-semibold text-primary">{email}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Security Notice:</p>
                      <p>
                        The reset link will expire in 1 hour for your security. 
                        If you don't see the email, check your spam folder.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link href="/auth/signin">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-12 font-semibold rounded-xl"
                  >
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="mt-8 text-center space-y-4">
              <div className="text-sm text-gray-500">
                Need immediate assistance?
              </div>
              <a 
                href={`tel:${COMPANY_CONFIG.contact.phone}`}
                className="inline-flex items-center justify-center rounded-md text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Call Support: {COMPANY_CONFIG.contact.phone}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
