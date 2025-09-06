
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Award,
  Download,
  Share2,
  Calendar,
  CheckCircle,
  Star,
  Trophy,
  Shield,
  ExternalLink,
  Printer,
  Mail,
  Copy,
  Globe,
  Database,
  AlertTriangle
} from 'lucide-react'

interface Certificate {
  id: string
  type: 'MODULE' | 'PROGRAM' | 'SPECIALIZATION'
  title: string
  description: string
  moduleNumber?: number
  issueDate: string
  expiryDate?: string
  certificateNumber: string
  verificationCode: string
  score: number
  issuedBy: string
  completionTime?: number
  skillsAssessed?: string[]
}

export default function CertificatesPage() {
  const { data: session } = useSession()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRealCertificates()
  }, [])

  const loadRealCertificates = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/training/certificates')
      const data = await response.json()
      
      if (data.success) {
        setCertificates(data.certificates || [])
      } else {
        setCertificates([])
      }
    } catch (err) {
      console.error('Error loading certificates:', err)
      setError('Failed to load certificates')
      setCertificates([])
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCertificate = async (certificateId: string) => {
    try {
      const response = await fetch(`/api/training/certificates/${certificateId}/download`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `certificate-${certificateId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert('Download failed. Please try again.')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download error. Please try again.')
    }
  }

  const getCertificateTypeIcon = (type: string) => {
    switch (type) {
      case 'MODULE': return <Award className="h-5 w-5" />
      case 'PROGRAM': return <Trophy className="h-5 w-5" />
      case 'SPECIALIZATION': return <Shield className="h-5 w-5" />
      default: return <CheckCircle className="h-5 w-5" />
    }
  }

  const getCertificateTypeColor = (type: string) => {
    switch (type) {
      case 'MODULE': return 'bg-blue-100 text-blue-800'
      case 'PROGRAM': return 'bg-purple-100 text-purple-800'
      case 'SPECIALIZATION': return 'bg-gold-100 text-gold-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreBadge = (score: number) => {
    if (score >= 95) return 'bg-emerald-100 text-emerald-800'
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 85) return 'bg-yellow-100 text-yellow-800'
    if (score >= 80) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading real certificates from database...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-600" />
              Real Training Certificates
            </h1>
            <p className="text-gray-600 mt-2">Connected to live certification database - No mock certificates</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Database className="h-4 w-4 mr-2" />
              Refresh Real Data
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => window.location.href = '/training'}>
              <Award className="h-4 w-4 mr-2" />
              Earn Certificates
            </Button>
          </div>
        </div>

        {/* Real Data Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Database className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>✅ REAL CERTIFICATION SYSTEM:</strong> This system tracks actual staff training progress and issues real certificates.
            No more mock certificates - complete training modules to earn legitimate credentials!
          </AlertDescription>
        </Alert>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{certificates.length}</h3>
              <p className="text-blue-700">Real Certificates</p>
              <p className="text-xs text-blue-600 mt-1">From Database</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">
                {certificates.filter(cert => cert.type === 'MODULE').length}
              </h3>
              <p className="text-green-700">Module Certificates</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-900">
                {certificates.filter(cert => cert.type === 'SPECIALIZATION').length}
              </h3>
              <p className="text-purple-700">Specializations</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-yellow-900">
                {certificates.length > 0 ? Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length) : 0}%
              </h3>
              <p className="text-yellow-700">Average Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Display */}
        {certificates.length === 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No certificates yet - Clean system!</h3>
              <p className="text-blue-800 mb-6">
                Perfect! Your certification system is clean and ready for real achievements. 
                Complete training modules to earn your first legitimate certificate.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/training'}>
                <Award className="h-4 w-4 mr-2" />
                Start Training Program
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        {getCertificateTypeIcon(certificate.type)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {certificate.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {certificate.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                          </span>
                          <span>Certificate #{certificate.certificateNumber}</span>
                          <span>Verification: {certificate.verificationCode}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCertificateTypeColor(certificate.type)}>
                            {certificate.type}
                          </Badge>
                          <Badge className={getScoreBadge(certificate.score)}>
                            {certificate.score}% Score
                          </Badge>
                        </div>
                        {certificate.completionTime && (
                          <div className="text-sm text-gray-600">
                            Completed in {certificate.completionTime} hours
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCertificate(certificate.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.share({
                            title: certificate.title,
                            text: `I earned a certificate: ${certificate.title}`,
                            url: window.location.href
                          })}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Real Certificate:</span>
                      <span>Issued by {certificate.issuedBy}, Verification Code: {certificate.verificationCode}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
