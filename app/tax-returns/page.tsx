
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText } from 'lucide-react'
import Link from 'next/link'

export default function TaxReturnsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Returns</h1>
          <p className="text-gray-600 mt-2">
            Manage tax preparation workflow and client returns.
          </p>
        </div>
        <Link href="/tax-returns/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Return
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-orange-600 mb-2">45</div>
            <p className="text-gray-600 text-sm">In Progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">234</div>
            <p className="text-gray-600 text-sm">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <p className="text-gray-600 text-sm">Under Review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <p className="text-gray-600 text-sm">Ready to File</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tax Returns</CardTitle>
          <CardDescription>
            Latest tax preparation activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Tax return management system coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">
              Full workflow management will be available in the next update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
