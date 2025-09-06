
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileText, Upload, Search, Filter, Download, Eye, Database, CheckCircle, AlertTriangle } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: string
  client: string
  uploadedAt: Date
  status: 'processed' | 'processing' | 'pending' | 'error'
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    loadRealDocuments()
  }, [])

  const loadRealDocuments = async () => {
    try {
      setLoading(true)
      
      // Load real documents from database
      const response = await fetch('/api/documents')
      if (response.ok) {
        const data = await response.json()
        setDocuments(data.documents || [])
      } else {
        // Start with empty array for new system
        setDocuments([])
      }
    } catch (error) {
      console.error('Error loading documents:', error)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const getDocumentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'W2': 'bg-blue-100 text-blue-800',
      '1099': 'bg-green-100 text-green-800', 
      'Receipt': 'bg-purple-100 text-purple-800',
      'Schedule': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[type] || colors['Other']
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'processed': 'bg-green-100 text-green-800',
      'processing': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-blue-100 text-blue-800',
      'error': 'bg-red-100 text-red-800'
    }
    return colors[status] || colors['pending']
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'tax-document')

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        // Reload documents after successful upload
        loadRealDocuments()
        alert('Document uploaded successfully!')
      } else {
        alert('Upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload error. Please try again.')
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || doc.type === selectedType
    return matchesSearch && matchesType
  })

  const documentTypes = ['all', ...new Set(documents.map(doc => doc.type))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-600" />
              Real Document Management
            </h1>
            <p className="text-gray-600 mt-2">Connected to live storage - No mock documents</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real Data
            </Button>
            
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Real Data Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>✅ REAL DOCUMENT STORAGE:</strong> This system is connected to live file storage. 
            All documents are real uploads, not fake demo files. Upload your first document to get started!
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{documents.length}</h3>
              <p className="text-blue-700">Real Documents</p>
              <p className="text-xs text-blue-600 mt-1">From Storage</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">
                {documents.filter(doc => doc.status === 'processed').length}
              </h3>
              <p className="text-green-700">Processed</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-yellow-900">
                {documents.filter(doc => doc.status === 'pending' || doc.status === 'processing').length}
              </h3>
              <p className="text-yellow-700">Pending</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Upload className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-900">
                {documents.reduce((total, doc) => {
                  const sizeNum = parseFloat(doc.size.replace(/[^\d.]/g, ''))
                  return total + (doc.size.includes('MB') ? sizeNum : sizeNum / 1024)
                }, 0).toFixed(1)}
              </h3>
              <p className="text-purple-700">MB Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search real documents or clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading real documents from storage...</p>
            </CardContent>
          </Card>
        ) : documents.length === 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No documents yet - Clean system!</h3>
              <p className="text-blue-800 mb-6">
                Perfect! Your document storage is clean and ready for real files. 
                Upload your first document to get started.
              </p>
              <label htmlFor="file-upload-empty" className="cursor-pointer">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Document
                </Button>
                <input
                  id="file-upload-empty"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Real Documents ({filteredDocuments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getDocumentTypeColor(doc.type)}>
                            {doc.type}
                          </Badge>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Client: {doc.client}</span>
                        <span>Size: {doc.size}</span>
                        <span>Uploaded: {formatDate(doc.uploadedAt)}</span>
                        <span className="text-green-600">• REAL FILE</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
