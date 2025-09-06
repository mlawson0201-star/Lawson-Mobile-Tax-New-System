
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your existing clients and their tax information.
          </p>
        </div>
        <Link href="/clients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Active Clients</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">89</div>
            <p className="text-gray-600 text-sm">Currently active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
            <p className="text-gray-600 text-sm">New This Month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">234</div>
            <p className="text-gray-600 text-sm">Total Clients</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>
            Browse and manage your client database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Client management system coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">
              Full client database functionality will be available in the next update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
