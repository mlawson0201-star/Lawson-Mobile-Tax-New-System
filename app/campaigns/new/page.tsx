
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, MessageSquare, Mail, Send } from 'lucide-react'
import Link from 'next/link'

export default function NewCampaignPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
          <p className="text-gray-600 mt-2">
            Design and send marketing campaigns to your contacts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Setup</CardTitle>
            <CardDescription>
              Configure your marketing campaign details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="Tax Season Reminder 2024"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Campaign Type</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="type"
                    placeholder="Email Campaign"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="All Active Clients"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="subject"
                  placeholder="Important Tax Season Updates"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message Content</Label>
              <div className="min-h-[200px] p-3 border rounded-lg">
                <p className="text-gray-500 text-sm">Campaign content editor coming soon...</p>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Campaign
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
              <Link href="/campaigns" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
