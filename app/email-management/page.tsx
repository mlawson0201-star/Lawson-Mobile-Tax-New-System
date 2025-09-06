
'use client'

import { EmailManagementDashboard } from '@/components/email-management-dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Mail, 
  AlertTriangle, 
  ExternalLink,
  Settings,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function EmailManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Emergency Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <span>
                <strong>🚨 EMAIL EMERGENCY:</strong> Your business email lmt@lawsonmobiletax.com is not working. 
                DNS records are missing after Cloudflare migration.
              </span>
              <Link href="/email-diagnostic">
                <Button className="bg-red-600 hover:bg-red-700 ml-4">
                  🚨 Fix Now
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-red-200 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
            <Link href="/email-diagnostic">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-red-600 mx-auto mb-2" />
                <h3 className="font-bold text-red-900">Emergency Fix</h3>
                <p className="text-sm text-red-700">Diagnose & fix email</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-green-200 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <a href="https://godaddy.com" target="_blank" rel="noopener noreferrer" className="block">
                <ExternalLink className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h3 className="font-bold text-green-900">GoDaddy Fix</h3>
                <p className="text-sm text-green-700">5-minute solution</p>
              </a>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
            <Link href="/crm/clients">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-bold text-blue-900">CRM Email</h3>
                <p className="text-sm text-blue-700">Client communication</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="block">
                <Settings className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <h3 className="font-bold text-purple-900">Cloudflare</h3>
                <p className="text-sm text-purple-700">Advanced DNS</p>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <EmailManagementDashboard />

        {/* Support Information */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-900">Need Help? Call Support</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">🎯 GoDaddy Support (Easy Fix)</h4>
                <p className="text-blue-700 mb-1"><strong>Phone:</strong> 1-480-505-8877</p>
                <p className="text-blue-700 mb-2"><strong>Available:</strong> 24/7</p>
                <p className="text-sm text-blue-600">
                  Say: "My email stopped working when DNS moved to Cloudflare. 
                  Need to change nameservers back to GoDaddy defaults for lawsonmobiletax.com."
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">📧 Microsoft 365 Support</h4>
                <p className="text-blue-700 mb-1"><strong>Phone:</strong> 1-800-642-7676</p>
                <p className="text-blue-700 mb-2"><strong>Available:</strong> Business hours</p>
                <p className="text-sm text-blue-600">
                  Say: "My Microsoft 365 email isn't working after DNS changes. 
                  Need help with MX record configuration."
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">☁️ Cloudflare Support</h4>
                <p className="text-blue-700 mb-1"><strong>Community:</strong> Available 24/7</p>
                <p className="text-blue-700 mb-2"><strong>Pro Support:</strong> Paid plans only</p>
                <p className="text-sm text-blue-600">
                  Say: "Need help adding Microsoft 365 MX and TXT records 
                  for lawsonmobiletax.com domain."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
