
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Settings, Building, Palette, Shield, Bell, Users, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your organization, branding, and system preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Organization Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Manage your organization information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="Demo Tax Services" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgEmail">Email</Label>
                  <Input id="orgEmail" defaultValue="admin@demotax.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgPhone">Phone</Label>
                  <Input id="orgPhone" defaultValue="(855) 722-8700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgWebsite">Website</Label>
                  <Input id="orgWebsite" placeholder="www.example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgAddress">Address</Label>
                <Input id="orgAddress" placeholder="123 Main St, City, State 12345" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding & Appearance
              </CardTitle>
              <CardDescription>
                Customize your organization's visual identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                    <Input id="primaryColor" defaultValue="#2563eb" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-500 rounded border"></div>
                    <Input id="secondaryColor" defaultValue="#64748b" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <Button>Update Branding</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure email and system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Notification settings coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Plan</span>
                <Badge>Professional</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Users</span>
                <span className="text-sm">3 / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <span className="text-sm">2.3 GB / 50 GB</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Invites</span>
                  <span className="text-sm">0</span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Team
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Payment</span>
                  <span className="text-sm">Dec 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Amount</span>
                  <span className="text-sm">$99/month</span>
                </div>
                <Button variant="outline" className="w-full">
                  View Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
