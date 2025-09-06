
// Phase 2: AI Document Processing Component
'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  FileText, 
  Upload, 
  Scan, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Zap,
  Brain,
  Shield,
  Clock,
  Target,
  Sparkles,
  FileImage,
  Camera,
  Database
} from 'lucide-react'

export default function AIDocumentProcessing() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedDocument, setProcessedDocument] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'auto-detect')

      const response = await fetch('/api/phase2/ai-document-processing', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      if (result.success) {
        setProcessedDocument(result.processingResult)
        toast.success('Document processed successfully!')
      } else {
        toast.error('Document processing failed')
      }
    } catch (error) {
      clearInterval(progressInterval)
      toast.error('Upload failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const supportedDocuments = [
    { type: 'W-2 Forms', accuracy: '97%', icon: <FileText className="h-5 w-5" /> },
    { type: '1099 Forms', accuracy: '95%', icon: <FileText className="h-5 w-5" /> },
    { type: 'Receipts', accuracy: '94%', icon: <FileImage className="h-5 w-5" /> },
    { type: 'Bank Statements', accuracy: '96%', icon: <Database className="h-5 w-5" /> },
    { type: 'Investment Records', accuracy: '93%', icon: <FileText className="h-5 w-5" /> },
    { type: 'Business Records', accuracy: '92%', icon: <FileText className="h-5 w-5" /> }
  ]

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Advanced OCR',
      description: '94% accuracy with handwritten text recognition',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Real-Time Processing',
      description: 'Process documents in under 3 seconds',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Smart Validation',
      description: 'AI-powered error detection and verification',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Intelligent Extraction',
      description: 'Automatically identifies key tax data points',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white">
            <Scan className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI Document Processing
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform document processing with 94% OCR accuracy. 
          Extract, validate, and organize tax data in seconds, not hours.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
        <CardContent className="p-8 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.jpeg,.png,.tiff,.heic"
            className="hidden"
          />
          
          {!isProcessing ? (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Upload Document for AI Processing</h3>
                <p className="text-gray-600 mb-4">
                  Drag & drop or click to upload PDF, JPG, PNG, TIFF, or HEIC files
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Processing Document...</h3>
                <p className="text-gray-600 mb-4">AI is analyzing and extracting data</p>
                <Progress value={uploadProgress} className="w-64 mx-auto" />
                <p className="text-sm text-gray-500 mt-2">{uploadProgress.toFixed(0)}% complete</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Result */}
      {processedDocument && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-green-800">Document Processed Successfully</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Extraction Results</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    Confidence: <Badge className="bg-green-100 text-green-800">{(processedDocument.confidence * 100).toFixed(1)}%</Badge>
                  </li>
                  <li className="flex items-center gap-2">
                    <Scan className="h-4 w-4 text-purple-500" />
                    OCR Accuracy: <Badge className="bg-blue-100 text-blue-800">{(processedDocument.ocrAccuracy * 100).toFixed(1)}%</Badge>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    Processing Time: <Badge className="bg-orange-100 text-orange-800">{processedDocument.processingTime}s</Badge>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">AI Suggestions</h4>
                <ul className="space-y-1 text-sm">
                  {processedDocument.suggestions?.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="bg-green-600">
                <Eye className="h-4 w-4 mr-2" />
                Review Data
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supported Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Supported Document Types
          </CardTitle>
          <CardDescription>
            Our AI can process and extract data from all major tax-related documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-blue-500">
                    {doc.icon}
                  </div>
                  <span className="font-medium">{doc.type}</span>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {doc.accuracy}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Transform Your Document Workflow</h3>
          <p className="opacity-90">See the dramatic impact of AI-powered document processing</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">89%</div>
            <p className="opacity-90">Time Savings</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">94%</div>
            <p className="opacity-90">Accuracy Rate</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">68%</div>
            <p className="opacity-90">Error Reduction</p>
          </div>
        </div>
      </div>
    </div>
  )
}
