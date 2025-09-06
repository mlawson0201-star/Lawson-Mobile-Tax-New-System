
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, UserPlus, CheckCircle, AlertTriangle } from 'lucide-react'

export default function NewClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    clientType: 'INDIVIDUAL',
    status: 'PROSPECT'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/crm/clients')
        }, 2000)
      } else {
        setError(data.error || 'Failed to add client')
      }
    } catch (err) {
      console.error('Error adding client:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">Client Added Successfully!</h2>
            <p className="text-green-800 mb-4">
              {formData.firstName} {formData.lastName} has been added to your real client database.
            </p>
            <p className="text-sm text-green-700">Redirecting to client list...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <UserPlus className="h-8 w-8 text-purple-600" />
              Add New Real Client
            </h1>
            <p className="text-gray-600 mt-2">Add a client to your actual database - no mock data</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          
          {/* Real Data Alert */}
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <UserPlus className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>✅ REAL CLIENT CREATION:</strong> This form adds clients to your actual database. 
              All data will be permanently stored and appear in your real CRM system.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              
              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Error:</strong> {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.smith@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="clientType">Client Type</Label>
                    <select
                      id="clientType"
                      name="clientType"
                      value={formData.clientType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="INDIVIDUAL">Individual</option>
                      <option value="BUSINESS">Business</option>
                      <option value="NON_PROFIT">Non-Profit</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="PROSPECT">Prospect</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding Client...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Real Client
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
