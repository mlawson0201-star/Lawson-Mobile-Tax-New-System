
// Phase 3: Security & Compliance Center Component
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  Lock,
  FileText,
  Clock,
  User,
  Settings,
  Search,
  Download,
  RefreshCw,
  Zap,
  Target,
  Award,
  Globe,
  Database,
  Key,
  Fingerprint,
  Monitor,
  Bell
} from 'lucide-react'

interface SecurityAlert {
  id: string
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  timestamp: string
  status: 'active' | 'investigating' | 'resolved' | 'false_positive'
}

interface AuditLog {
  id: string
  timestamp: string
  userName: string
  action: string
  resource: string
  details: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  status: 'success' | 'failed' | 'blocked'
}

interface ComplianceReport {
  id: string
  type: string
  status: 'compliant' | 'non_compliant' | 'under_review'
  complianceScore: number
  lastAudit: string
  nextAudit: string
}

export default function SecurityCompliance() {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([])
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [isRunningCheck, setIsRunningCheck] = useState(false)

  useEffect(() => {
    fetchSecurityData()
  }, [selectedSeverity])

  const fetchSecurityData = async () => {
    try {
      // Fetch security alerts
      const alertsResponse = await fetch(`/api/phase3/security-compliance?type=security-alerts${selectedSeverity !== 'all' ? `&severity=${selectedSeverity}` : ''}`)
      const alertsData = await alertsResponse.json()
      setSecurityAlerts(alertsData.alerts)

      // Fetch audit logs
      const logsResponse = await fetch('/api/phase3/security-compliance?type=audit-logs')
      const logsData = await logsResponse.json()
      setAuditLogs(logsData.auditLogs)

      // Fetch compliance reports
      const complianceResponse = await fetch('/api/phase3/security-compliance?type=compliance')
      const complianceData = await complianceResponse.json()
      setComplianceReports(complianceData.reports)
    } catch (error) {
      console.error('Failed to fetch security data:', error)
    }
  }

  const runComplianceCheck = async () => {
    setIsRunningCheck(true)
    
    try {
      const response = await fetch('/api/phase3/security-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'run-compliance-check',
          complianceType: 'SOC2'
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('Compliance check completed successfully!')
        fetchSecurityData()
      }
    } catch (error) {
      toast.error('Compliance check failed')
    } finally {
      setIsRunningCheck(false)
    }
  }

  const resolveAlert = async (alertId: string) => {
    try {
      const response = await fetch('/api/phase3/security-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resolve-alert',
          alertId
        })
      })
      
      const result = await response.json()
      if (result.success) {
        toast.success('Security alert resolved')
        fetchSecurityData()
      }
    } catch (error) {
      toast.error('Failed to resolve alert')
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'investigating': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'false_positive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'medium': return <Eye className="h-4 w-4 text-yellow-500" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-orange-600 text-white">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Security & Compliance
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enterprise-grade security monitoring and compliance management. 
          Maintain the highest standards of data protection and regulatory compliance.
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">96.8%</div>
            <div className="text-sm text-gray-600">Security Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">98.5%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{securityAlerts.filter(a => a.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">2.3h</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Security Interface */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="features">Security Features</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          {/* Alert Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <select 
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">All Severity Levels</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Filter Alerts
              </Button>
            </div>

            <Button onClick={fetchSecurityData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Security Alerts */}
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {alert.severity === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {alert.severity === 'high' && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                      {alert.severity === 'medium' && <Eye className="h-5 w-5 text-yellow-500" />}
                      {alert.severity === 'low' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Investigate
                      </Button>
                      {alert.status !== 'resolved' && (
                        <Button 
                          size="sm" 
                          onClick={() => resolveAlert(alert.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Actions */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Compliance Status</h3>
            <Button
              onClick={runComplianceCheck}
              disabled={isRunningCheck}
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              {isRunningCheck ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Running Check...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Run Compliance Check
                </div>
              )}
            </Button>
          </div>

          {/* Compliance Reports */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.type}</CardTitle>
                    <Badge className={
                      report.status === 'compliant' ? 'bg-green-100 text-green-800' :
                      report.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {report.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Compliance Score:</span>
                      <span className="font-bold text-lg">{report.complianceScore.toFixed(1)}%</span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div>Last Audit: {new Date(report.lastAudit).toLocaleDateString()}</div>
                      <div>Next Audit: {new Date(report.nextAudit).toLocaleDateString()}</div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Compliance Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                Security Certifications
              </CardTitle>
              <CardDescription>
                Industry certifications and compliance standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'SOC 2 Type II Certified',
                  'IRS e-file Provider',
                  'GDPR Compliant',
                  'State Tax Board Approved',
                  'Better Business Bureau A+ Rating',
                  'ISO 27001 Compliant'
                ].map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Comprehensive logging of all system activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      {getRiskLevelIcon(log.riskLevel)}
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-gray-600">
                          {log.userName} • {log.resource}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={
                        log.status === 'success' ? 'bg-green-100 text-green-800' :
                        log.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {log.status.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Audit Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                category: 'Authentication',
                icon: <Key className="h-6 w-6 text-blue-500" />,
                items: ['Multi-factor Authentication', 'Single Sign-On', 'Biometric Authentication', 'Session Management']
              },
              {
                category: 'Data Protection',
                icon: <Lock className="h-6 w-6 text-green-500" />,
                items: ['End-to-End Encryption', 'Data Loss Prevention', 'Secure Backups', 'Data Anonymization']
              },
              {
                category: 'Access Control',
                icon: <Fingerprint className="h-6 w-6 text-purple-500" />,
                items: ['Role-Based Access', 'Zero Trust Architecture', 'IP Whitelisting', 'Time-Based Restrictions']
              },
              {
                category: 'Monitoring',
                icon: <Monitor className="h-6 w-6 text-orange-500" />,
                items: ['Real-time Threat Detection', 'Behavioral Analytics', 'Incident Response', 'Vulnerability Scanning']
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
