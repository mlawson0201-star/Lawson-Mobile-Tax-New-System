
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, FileText, Calendar, User } from 'lucide-react'
import Link from 'next/link'

export default function NewTaxReturnPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/tax-returns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Tax Return</h1>
          <p className="text-gray-600 mt-2">
            Start a new tax preparation workflow.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tax Return Setup</CardTitle>
            <CardDescription>
              Initialize a new tax return for a client
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="client"
                  placeholder="Select or search for client..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxYear">Tax Year</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="taxYear"
                    placeholder="2023"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnType">Return Type</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="returnType"
                    placeholder="1040 - Individual"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="dueDate"
                  type="date"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button className="flex-1">
                Create Tax Return
              </Button>
              <Link href="/tax-returns" className="flex-1">
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
