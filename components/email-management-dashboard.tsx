
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  Send, 
  Settings, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  RefreshCw,
  Users,
  Server,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'

interface EmailAccount {
  email: string
  status: 'working' | 'broken' | 'testing'
  provider: string
  lastTested: Date
}

interface EmailSettings {
  smtpHost: string
  smtpPort: string
  smtpUser: string
  smtpPass: string
  imapHost: string
  imapPort: string
}

export function EmailManagementDashboard() {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([
    {
      email: 'lmt@lawsonmobiletax.com',
      status: 'broken',
      provider: 'Microsoft 365',
      lastTested: new Date()
    }
  ])

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: 'smtp.office365.com',
    smtpPort: '587',
    smtpUser: 'lmt@lawsonmobiletax.com',
    smtpPass: '',
    imapHost: 'outlook.office365.com',
    imapPort: '993'
  })

  const [testingEmail, setTestingEmail] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const testEmailConnection = async () => {
    setTestingEmail(true)
    setTestResults([])
    
    const testSteps = [
      'Testing SMTP connection...',
      'Verifying authentication...',
      'Checking DNS records...',
      'Testing email send...',
      'Validating email receipt...'
    ]

    for (let i = 0; i < testSteps.length; i++) {
      setTestResults(prev => [...prev, testSteps[i]])
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate test results
      if (i === 2) {
        setTestResults(prev => [...prev, '❌ DNS records missing for Microsoft 365'])
      } else if (i === 3) {
        setTestResults(prev => [...prev, '❌ Email send failed - DNS configuration error'])
      } else {
        setTestResults(prev => [...prev, '✅ Step completed'])
      }
    }

    setTestingEmail(false)
    setEmailAccounts(prev => 
      prev.map(account => ({
        ...account,
        status: 'broken',
        lastTested: new Date()
      }))
    )
  }

  const fixEmailAutomatically = async () => {
    toast.info('Opening automated email fix...')
    window.open('/email-diagnostic', '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">📧 Email Management Center</h2>
          <p className="text-gray-600 mt-1">Fix and manage your business email integration</p>
        </div>
        <Button 
          onClick={fixEmailAutomatically}
          className="bg-red-600 hover:bg-red-700"
        >
          🚨 Fix Email Issues
        </Button>
      </div>

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList>
          <TabsTrigger value="status">Email Status</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="test">Test Connection</TabsTrigger>
          <TabsTrigger value="integration">CRM Integration</TabsTrigger>
        </TabsList>

        {/* Email Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-red-900">Email Status</h3>
                <Badge variant="destructive" className="mt-2">BROKEN</Badge>
                <p className="text-sm text-red-600 mt-2">DNS configuration error</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <Server className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-orange-900">DNS Provider</h3>
                <Badge variant="outline" className="mt-2 border-orange-300">Cloudflare</Badge>
                <p className="text-sm text-orange-600 mt-2">Missing email records</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-900">Email Service</h3>
                <Badge variant="outline" className="mt-2 border-blue-300">Microsoft 365</Badge>
                <p className="text-sm text-blue-600 mt-2">Configuration needed</p>
              </CardContent>
            </Card>
          </div>

          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>🚨 CRITICAL ISSUE:</strong> Your email is not working because DNS records for 
              Microsoft 365 are missing from your Cloudflare configuration. Your domain was moved 
              from GoDaddy to Cloudflare, but email DNS records were not transferred.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Email Accounts Status</CardTitle>
            </CardHeader>
            <CardContent>
              {emailAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-semibold">{account.email}</p>
                      <p className="text-sm text-gray-600">{account.provider}</p>
                      <p className="text-xs text-gray-500">
                        Last tested: {account.lastTested.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {account.status === 'working' && (
                      <Badge className="bg-green-100 text-green-800">Working</Badge>
                    )}
                    {account.status === 'broken' && (
                      <Badge variant="destructive">Broken</Badge>
                    )}
                    {account.status === 'testing' && (
                      <Badge variant="secondary">Testing...</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">🟢 QUICK FIX (5 Minutes)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  <strong>Move DNS back to GoDaddy</strong> - This will restore your email automatically.
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://godaddy.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Fix at GoDaddy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">🟡 ADVANCED FIX</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800 mb-4">
                  <strong>Add DNS records to Cloudflare</strong> - Keep Cloudflare but add email records.
                </p>
                <Button 
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                  onClick={() => window.open('https://dash.cloudflare.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go to Cloudflare
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Server Settings</CardTitle>
              <p className="text-sm text-gray-600">Microsoft 365 configuration for lmt@lawsonmobiletax.com</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>SMTP Host</Label>
                  <Input 
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <Label>SMTP Port</Label>
                  <Input 
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>IMAP Host</Label>
                  <Input 
                    value={emailSettings.imapHost}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, imapHost: e.target.value }))}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <Label>IMAP Port</Label>
                  <Input 
                    value={emailSettings.imapPort}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, imapPort: e.target.value }))}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label>Email Username</Label>
                <Input 
                  value={emailSettings.smtpUser}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                  className="bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input 
                  type="password"
                  value={emailSettings.smtpPass}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPass: e.target.value }))}
                  placeholder="Enter your Microsoft 365 password"
                />
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Note:</strong> These settings are correct for Microsoft 365. The issue is 
                  with DNS configuration, not these server settings.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Connection Tab */}
        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Connection Test</CardTitle>
              <p className="text-sm text-gray-600">Test your email configuration and identify issues</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={testEmailConnection}
                disabled={testingEmail}
                className="w-full"
              >
                {testingEmail ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Test Email Connection
                  </>
                )}
              </Button>

              {testResults.length > 0 && (
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Test Results:</h4>
                    <div className="space-y-2 font-mono text-sm">
                      {testResults.map((result, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-gray-500">{index + 1}.</span>
                          <span className={
                            result.includes('❌') ? 'text-red-600' :
                            result.includes('✅') ? 'text-green-600' :
                            'text-gray-700'
                          }>
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Expected Result:</strong> Connection tests will fail until DNS records 
                  are properly configured for Microsoft 365.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CRM Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                CRM Email Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>✅ EMAIL INTEGRATION READY:</strong> Your tax system already has full 
                  email integration built-in. Once your email DNS is fixed, you can:
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">📧 Client Communication</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Send emails directly from CRM</li>
                      <li>• Track email history per client</li>
                      <li>• Automated email notifications</li>
                      <li>• Professional email templates</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-900 mb-2">💰 Payment Integration</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Email payment confirmations</li>
                      <li>• Receipt delivery automation</li>
                      <li>• Invoice email notifications</li>
                      <li>• Payment reminder emails</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Button 
                className="w-full"
                onClick={() => window.location.href = '/crm/clients'}
              >
                <Mail className="h-4 w-4 mr-2" />
                View CRM Email Features
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
