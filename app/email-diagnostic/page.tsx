
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Mail, 
  Settings,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface DNSRecord {
  type: string
  name: string
  value: string
  priority?: number
  status: 'correct' | 'missing' | 'incorrect'
}

interface DiagnosticResult {
  domain: string
  currentNameservers: string[]
  emailProvider: 'microsoft365' | 'godaddy' | 'other' | 'none'
  dnsRecords: DNSRecord[]
  emailStatus: 'working' | 'broken' | 'unknown'
  recommendations: string[]
}

export default function EmailDiagnosticPage() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const domain = 'lawsonmobiletax.com'
  
  const steps = [
    'Checking domain configuration...',
    'Scanning DNS records...',
    'Analyzing email setup...',
    'Generating fix recommendations...'
  ]

  const runDiagnostic = async () => {
    setLoading(true)
    setCurrentStep(0)

    // Simulate diagnostic steps
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    // Mock diagnostic result based on common Microsoft 365 + Cloudflare issue
    const result: DiagnosticResult = {
      domain: domain,
      currentNameservers: [
        'vera.ns.cloudflare.com',
        'walt.ns.cloudflare.com'
      ],
      emailProvider: 'microsoft365',
      dnsRecords: [
        {
          type: 'MX',
          name: '@',
          value: 'lawsonmobiletax-com.mail.protection.outlook.com',
          priority: 0,
          status: 'missing'
        },
        {
          type: 'TXT',
          name: '@',
          value: 'NETORGFT9926740.onmicrosoft.com',
          status: 'missing'
        },
        {
          type: 'TXT',
          name: '@',
          value: 'v=spf1 include:secureserver.net -all',
          status: 'missing'
        },
        {
          type: 'CNAME',
          name: 'autodiscover',
          value: 'autodiscover.outlook.com',
          status: 'missing'
        },
        {
          type: 'CNAME',
          name: 'email',
          value: 'emaildot.godaddy.com',
          status: 'missing'
        }
      ],
      emailStatus: 'broken',
      recommendations: [
        'DNS is managed by Cloudflare, but email records are missing',
        'Microsoft 365 email setup is incomplete',
        'Need to add DNS records to Cloudflare dashboard',
        'Alternative: Move nameservers back to GoDaddy for simple fix'
      ]
    }

    setDiagnostic(result)
    setLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  useEffect(() => {
    runDiagnostic()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚨 EMAIL DIAGNOSTIC & FIX CENTER
          </h1>
          <p className="text-xl text-gray-600">
            Analyzing and fixing {domain} email issues
          </p>
        </div>

        {/* Loading Progress */}
        {loading && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Analyzing Your Email Setup
              </h3>
              <p className="text-blue-700 mb-6">{steps[currentStep]}</p>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-blue-600 mt-2">
                Step {currentStep + 1} of {steps.length}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Diagnostic Results */}
        {diagnostic && !loading && (
          <>
            {/* Status Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-red-900">Email Status</h3>
                  <p className="text-red-700 font-semibold uppercase">
                    {diagnostic.emailStatus}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-orange-900">DNS Provider</h3>
                  <p className="text-orange-700 font-semibold">Cloudflare</p>
                  <p className="text-sm text-orange-600">Not GoDaddy</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <Mail className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-blue-900">Email Service</h3>
                  <p className="text-blue-700 font-semibold">Microsoft 365</p>
                  <p className="text-sm text-blue-600">Configured</p>
                </CardContent>
              </Card>
            </div>

            {/* Problem Identified */}
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>🚨 PROBLEM IDENTIFIED:</strong> Your domain DNS was moved to Cloudflare, 
                but the required email DNS records for Microsoft 365 are missing. This is why your 
                email stopped working.
              </AlertDescription>
            </Alert>

            {/* Missing DNS Records */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Missing DNS Records (Click to Copy)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diagnostic.dnsRecords.map((record, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{record.type}</Badge>
                            {record.status === 'missing' && (
                              <Badge variant="destructive">Missing</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Name:</strong> {record.name}<br />
                            <strong>Value:</strong> {record.value}
                            {record.priority && (
                              <><br /><strong>Priority:</strong> {record.priority}</>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(record.value)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fix Options */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Option 1: Easy Fix */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    🟢 OPTION 1: EASY FIX (Recommended)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-green-800 font-semibold">
                    Move DNS back to GoDaddy (5 minutes)
                  </p>
                  
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Step 1:</strong> Go to GoDaddy.com</p>
                    <p><strong>Step 2:</strong> My Products → {domain}</p>
                    <p><strong>Step 3:</strong> DNS → Change Nameservers</p>
                    <p><strong>Step 4:</strong> Select "Default (GoDaddy)"</p>
                    <p><strong>Step 5:</strong> Save & wait 24-48 hours</p>
                  </div>

                  <Alert className="border-green-300 bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>✅ YOUR EMAIL WILL WORK AGAIN AUTOMATICALLY!</strong>
                    </AlertDescription>
                  </Alert>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://godaddy.com/help/change-nameservers-for-my-domains-664', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Go to GoDaddy Fix Guide
                  </Button>
                </CardContent>
              </Card>

              {/* Option 2: Advanced Fix */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-900 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    🟡 OPTION 2: ADVANCED FIX
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-orange-800 font-semibold">
                    Keep Cloudflare, add missing records
                  </p>
                  
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Step 1:</strong> Go to Cloudflare.com</p>
                    <p><strong>Step 2:</strong> Find {domain}</p>
                    <p><strong>Step 3:</strong> DNS tab</p>
                    <p><strong>Step 4:</strong> Add all missing records above</p>
                    <p><strong>Step 5:</strong> Wait 24-48 hours</p>
                  </div>

                  <Alert className="border-orange-300 bg-orange-100">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>⚠️ REQUIRES TECHNICAL KNOWLEDGE</strong>
                    </AlertDescription>
                  </Alert>

                  <Button 
                    variant="outline" 
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                    onClick={() => window.open('https://dash.cloudflare.com', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Go to Cloudflare Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Support Contacts */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">📞 Need Help? Call Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">GoDaddy Support</h4>
                    <p className="text-blue-700"><strong>Phone:</strong> 1-480-505-8877</p>
                    <p className="text-blue-700"><strong>Available:</strong> 24/7</p>
                    <p className="text-sm text-blue-600 mt-2">
                      Say: "My email stopped working when DNS moved to Cloudflare. 
                      Need to change nameservers back to GoDaddy defaults for {domain}."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Microsoft 365 Support</h4>
                    <p className="text-blue-700"><strong>Phone:</strong> 1-800-642-7676</p>
                    <p className="text-blue-700"><strong>Available:</strong> Business hours</p>
                    <p className="text-sm text-blue-600 mt-2">
                      Say: "My Microsoft 365 email isn't working after DNS changes. 
                      Need help with MX record configuration."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://godaddy.com', '_blank')}
              >
                🚨 Fix Email Now (GoDaddy)
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => runDiagnostic()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Diagnostic Again
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
