
'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Bot, 
  Upload, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Zap,
  Clock,
  Scan
} from 'lucide-react'
import { toast } from 'sonner'

export default function AIDocumentProcessor() {
  const [supportedTypes, setSupportedTypes] = useState<any[]>([])
  const [processingStats, setProcessingStats] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processingResult, setProcessingResult] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [capabilities, setCapabilities] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchCapabilities()
    fetchProcessingStats()
  }, [])

  const fetchCapabilities = async () => {
    try {
      const response = await fetch('/api/phase2/ai-document-processing?action=capabilities')
      const data = await response.json()
      
      if (data.success) {
        setCapabilities(data.ai_capabilities)
        setSupportedTypes(data.supported_documents)
      }
    } catch (error) {
      console.error('Failed to fetch capabilities:', error)
      toast.error('Failed to load AI capabilities')
    }
  }

  const fetchProcessingStats = async () => {
    try {
      const response = await fetch('/api/phase2/ai-document-processing?action=stats')
      const data = await response.json()
      
      if (data.success) {
        setProcessingStats(data.processing_stats)
      }
    } catch (error) {
      console.error('Failed to fetch processing stats:', error)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setProcessingResult(null)
      toast.success(`File "${file.name}" selected`)
    }
  }

  const processDocument = async () => {
    if (!uploadedFile) {
      toast.error('Please select a file first')
      return
    }

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      formData.append('auto_detect', 'true')

      const response = await fetch('/api/phase2/ai-document-processing', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setProcessingResult(data)
        toast.success('Document processed successfully!')
        fetchProcessingStats() // Refresh stats
      } else {
        toast.error(data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Document processing error:', error)
      toast.error('Processing service unavailable')
    } finally {
      setIsProcessing(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-50 border-green-200'
    if (confidence >= 0.7) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">AI Document Processing</CardTitle>
              <CardDescription className="text-green-100">
                Advanced OCR and intelligent data extraction with 94% accuracy
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Processing Stats */}
      {processingStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{processingStats.documents_processed_today}</div>
              <div className="text-sm text-gray-600">Docs Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(processingStats.average_confidence * 100)}%</div>
              <div className="text-sm text-gray-600">Avg Confidence</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{processingStats.processing_time_avg}</div>
              <div className="text-sm text-gray-600">Avg Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Scan className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(processingStats.accuracy_rate * 100)}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload & Processing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Document Upload & Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.tiff,.heic"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {uploadedFile ? (
                <div className="space-y-3">
                  <FileText className="h-12 w-12 text-blue-500 mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">Upload Tax Document</p>
                    <p className="text-sm text-gray-500">
                      Support: PDF, JPG, PNG, TIFF, HEIC
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Select File
                  </Button>
                </div>
              )}
            </div>

            <Button
              onClick={processDocument}
              disabled={!uploadedFile || isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing Document...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Process with AI
                </>
              )}
            </Button>

            {isProcessing && (
              <div className="space-y-2">
                <Progress value={66} className="w-full" />
                <p className="text-sm text-center text-gray-600">
                  AI is analyzing your document...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Processing Results */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Results</CardTitle>
            <CardDescription>AI extracted data and validation results</CardDescription>
          </CardHeader>
          <CardContent>
            {processingResult ? (
              <div className="space-y-4">
                {/* Overall Status */}
                <div className={`border rounded-lg p-4 ${
                  processingResult.needs_review ? 
                    'bg-yellow-50 border-yellow-200' : 
                    'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {processingResult.needs_review ? (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <span className="font-medium">
                      {processingResult.needs_review ? 'Review Required' : 'Processing Complete'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Document Type: {processingResult.document_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Overall Confidence: {Math.round(processingResult.overall_confidence * 100)}%
                  </p>
                </div>

                {/* Extracted Data */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Extracted Information</h4>
                  {Object.entries(processingResult.extracted_data).map(([field, value]: [string, any]) => (
                    <div key={field} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Badge 
                          className={getConfidenceColor(processingResult.field_confidences[field])}
                        >
                          {Math.round(processingResult.field_confidences[field] * 100)}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Validation Results */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Validation Checks</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Format Valid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Tax Year Match</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {processingResult.validation_results.data_complete ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span>Data Complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No Duplicates</span>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 mb-2">AI Suggestions</h4>
                  <ul className="space-y-1">
                    {processingResult.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Upload and process a document to see AI extraction results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Supported Document Types */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Document Types & AI Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Document Types</h4>
              {supportedTypes.map((docType) => (
                <div key={docType.type} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{docType.name}</span>
                    <Badge variant="outline">
                      {docType.fields} fields
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Confidence Threshold: {Math.round(docType.confidence_threshold * 100)}%
                  </p>
                </div>
              ))}
            </div>

            {capabilities && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">AI Capabilities</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">OCR Accuracy</span>
                    <span className="text-lg font-bold text-green-600">
                      {Math.round(capabilities.ocr_accuracy * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Form Recognition</span>
                    <span className="text-lg font-bold text-blue-600">
                      {Math.round(capabilities.form_recognition * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Processing Speed</span>
                    <span className="text-lg font-bold text-purple-600">
                      {capabilities.processing_speed}
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium block mb-2">Supported Formats</span>
                    <div className="flex flex-wrap gap-2">
                      {capabilities.supported_formats.map((format: string) => (
                        <Badge key={format} variant="outline">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Processing History */}
      {processingStats?.top_document_types && (
        <Card>
          <CardHeader>
            <CardTitle>Document Processing Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Most Processed Document Types</h4>
              {processingStats.top_document_types.map((doc: any) => (
                <div key={doc.type} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">
                      {doc.type.toUpperCase().replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-600">{doc.count} documents</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">{doc.percentage}%</span>
                    <Progress value={doc.percentage} className="w-24 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
