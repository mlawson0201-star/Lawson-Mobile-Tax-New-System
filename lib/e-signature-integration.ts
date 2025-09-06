
// E-Signature Integration - Phase 2 Business Expansion
// Digital document signing workflow for Lawson Mobile Tax

export interface SignatureRequest {
  id: string
  documentId: string
  documentName: string
  documentUrl: string
  clientId: string
  clientName: string
  clientEmail: string
  preparerId: string
  preparerName: string
  status: 'draft' | 'sent' | 'viewed' | 'signed' | 'completed' | 'declined' | 'expired'
  createdAt: Date
  sentAt?: Date
  signedAt?: Date
  expiresAt: Date
  signatureFields: SignatureField[]
  auditTrail: SignatureAuditEvent[]
  notifications: SignatureNotification[]
  type: 'tax_return' | 'engagement_letter' | 'organizer' | 'bookkeeping_agreement' | 'amendment' | 'power_of_attorney'
  priority: 'normal' | 'urgent' | 'high'
  reminderSchedule: Date[]
}

export interface SignatureField {
  id: string
  type: 'signature' | 'initial' | 'date' | 'text' | 'checkbox'
  label: string
  required: boolean
  position: {
    page: number
    x: number
    y: number
    width: number
    height: number
  }
  signerRole: 'client' | 'preparer' | 'witness' | 'spouse'
  value?: string
  signedAt?: Date
  ipAddress?: string
  device?: string
}

export interface SignatureAuditEvent {
  id: string
  timestamp: Date
  event: 'created' | 'sent' | 'viewed' | 'signed' | 'declined' | 'expired' | 'reminder_sent'
  actor: string
  actorType: 'client' | 'preparer' | 'system'
  ipAddress: string
  userAgent: string
  location?: string
  details: string
}

export interface SignatureNotification {
  id: string
  type: 'email' | 'sms' | 'portal_notification'
  recipient: string
  subject: string
  message: string
  sentAt: Date
  deliveredAt?: Date
  clickedAt?: Date
  status: 'sent' | 'delivered' | 'clicked' | 'failed'
}

export interface SignatureTemplate {
  id: string
  name: string
  description: string
  documentType: string
  category: 'tax' | 'bookkeeping' | 'agreement' | 'compliance'
  templateUrl: string
  signatureFields: Omit<SignatureField, 'id' | 'value' | 'signedAt' | 'ipAddress' | 'device'>[]
  defaultSettings: {
    expirationDays: number
    reminderSchedule: number[] // Days after sending
    requireAllSignatures: boolean
    allowDecline: boolean
  }
  isActive: boolean
  createdBy: string
  lastModified: Date
}

export interface SignatureIntegration {
  provider: 'docusign' | 'hellosign' | 'pandadoc' | 'adobe_sign' | 'internal'
  apiKey?: string
  webhookUrl?: string
  isActive: boolean
  settings: {
    brandingEnabled: boolean
    customBranding?: {
      logo: string
      primaryColor: string
      secondaryColor: string
    }
    defaultReminders: boolean
    auditTrailEnabled: boolean
    ipGeolocationEnabled: boolean
  }
}

export class ESignatureIntegration {
  
  /**
   * Get signature document templates
   */
  static getSignatureTemplates(): SignatureTemplate[] {
    return [
      {
        id: 'tax_return_8879',
        name: 'Form 8879 - IRS e-file Signature Authorization',
        description: 'Required signature form for electronic filing of tax returns',
        documentType: 'IRS Form 8879',
        category: 'tax',
        templateUrl: '/templates/form_8879.pdf',
        signatureFields: [
          {
            type: 'signature',
            label: 'Taxpayer Signature',
            required: true,
            position: { page: 1, x: 150, y: 400, width: 200, height: 50 },
            signerRole: 'client'
          },
          {
            type: 'date',
            label: 'Date Signed',
            required: true,
            position: { page: 1, x: 400, y: 400, width: 100, height: 30 },
            signerRole: 'client'
          },
          {
            type: 'signature',
            label: 'Spouse Signature (if joint return)',
            required: false,
            position: { page: 1, x: 150, y: 480, width: 200, height: 50 },
            signerRole: 'spouse'
          },
          {
            type: 'signature',
            label: 'Tax Preparer Signature',
            required: true,
            position: { page: 1, x: 150, y: 600, width: 200, height: 50 },
            signerRole: 'preparer'
          }
        ],
        defaultSettings: {
          expirationDays: 30,
          reminderSchedule: [3, 7, 14],
          requireAllSignatures: true,
          allowDecline: false
        },
        isActive: true,
        createdBy: 'system',
        lastModified: new Date()
      },

      {
        id: 'engagement_letter',
        name: 'Tax Preparation Engagement Letter',
        description: 'Professional engagement agreement for tax preparation services',
        documentType: 'Engagement Letter',
        category: 'agreement',
        templateUrl: '/templates/engagement_letter.pdf',
        signatureFields: [
          {
            type: 'signature',
            label: 'Client Signature',
            required: true,
            position: { page: 3, x: 150, y: 300, width: 200, height: 50 },
            signerRole: 'client'
          },
          {
            type: 'date',
            label: 'Date',
            required: true,
            position: { page: 3, x: 400, y: 300, width: 100, height: 30 },
            signerRole: 'client'
          },
          {
            type: 'text',
            label: 'Printed Name',
            required: true,
            position: { page: 3, x: 150, y: 250, width: 200, height: 30 },
            signerRole: 'client'
          },
          {
            type: 'signature',
            label: 'Tax Professional Signature',
            required: true,
            position: { page: 3, x: 150, y: 400, width: 200, height: 50 },
            signerRole: 'preparer'
          }
        ],
        defaultSettings: {
          expirationDays: 14,
          reminderSchedule: [2, 5, 10],
          requireAllSignatures: true,
          allowDecline: true
        },
        isActive: true,
        createdBy: 'system',
        lastModified: new Date()
      },

      {
        id: 'bookkeeping_agreement',
        name: 'Bookkeeping Services Agreement',
        description: 'Service agreement for ongoing bookkeeping and accounting services',
        documentType: 'Service Agreement',
        category: 'bookkeeping',
        templateUrl: '/templates/bookkeeping_agreement.pdf',
        signatureFields: [
          {
            type: 'signature',
            label: 'Client Signature',
            required: true,
            position: { page: 4, x: 150, y: 200, width: 200, height: 50 },
            signerRole: 'client'
          },
          {
            type: 'date',
            label: 'Date',
            required: true,
            position: { page: 4, x: 400, y: 200, width: 100, height: 30 },
            signerRole: 'client'
          },
          {
            type: 'text',
            label: 'Company Name',
            required: true,
            position: { page: 4, x: 150, y: 150, width: 200, height: 30 },
            signerRole: 'client'
          },
          {
            type: 'checkbox',
            label: 'QuickBooks Online Setup Required',
            required: false,
            position: { page: 2, x: 50, y: 400, width: 20, height: 20 },
            signerRole: 'client'
          },
          {
            type: 'signature',
            label: 'Lawson Mobile Tax Representative',
            required: true,
            position: { page: 4, x: 150, y: 300, width: 200, height: 50 },
            signerRole: 'preparer'
          }
        ],
        defaultSettings: {
          expirationDays: 21,
          reminderSchedule: [3, 7, 14],
          requireAllSignatures: true,
          allowDecline: true
        },
        isActive: true,
        createdBy: 'system',
        lastModified: new Date()
      },

      {
        id: 'power_of_attorney',
        name: 'Form 2848 - Power of Attorney',
        description: 'IRS Power of Attorney form for tax representation',
        documentType: 'IRS Form 2848',
        category: 'tax',
        templateUrl: '/templates/form_2848.pdf',
        signatureFields: [
          {
            type: 'signature',
            label: 'Taxpayer Signature',
            required: true,
            position: { page: 1, x: 150, y: 500, width: 200, height: 50 },
            signerRole: 'client'
          },
          {
            type: 'date',
            label: 'Date',
            required: true,
            position: { page: 1, x: 400, y: 500, width: 100, height: 30 },
            signerRole: 'client'
          },
          {
            type: 'signature',
            label: 'Representative Signature',
            required: true,
            position: { page: 2, x: 150, y: 300, width: 200, height: 50 },
            signerRole: 'preparer'
          }
        ],
        defaultSettings: {
          expirationDays: 60,
          reminderSchedule: [7, 21, 45],
          requireAllSignatures: true,
          allowDecline: false
        },
        isActive: true,
        createdBy: 'system',
        lastModified: new Date()
      }
    ]
  }

  /**
   * Create signature request
   */
  static createSignatureRequest(
    templateId: string,
    clientId: string,
    clientName: string,
    clientEmail: string,
    preparerId: string,
    preparerName: string,
    documentName?: string,
    priority: 'normal' | 'urgent' | 'high' = 'normal'
  ): SignatureRequest {
    
    const template = this.getSignatureTemplates().find(t => t.id === templateId)
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    const requestId = `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + template.defaultSettings.expirationDays)

    return {
      id: requestId,
      documentId: `doc_${requestId}`,
      documentName: documentName || template.name,
      documentUrl: template.templateUrl,
      clientId,
      clientName,
      clientEmail,
      preparerId,
      preparerName,
      status: 'draft',
      createdAt: new Date(),
      expiresAt,
      signatureFields: template.signatureFields.map((field, index) => ({
        id: `field_${requestId}_${index}`,
        ...field
      })),
      auditTrail: [{
        id: `audit_${Date.now()}`,
        timestamp: new Date(),
        event: 'created',
        actor: preparerName,
        actorType: 'preparer',
        ipAddress: '127.0.0.1', // Would be actual IP in production
        userAgent: 'Lawson Mobile Tax Platform',
        details: `Signature request created for ${template.name}`
      }],
      notifications: [],
      type: this.getDocumentTypeFromTemplate(templateId),
      priority,
      reminderSchedule: template.defaultSettings.reminderSchedule.map(days => {
        const reminderDate = new Date()
        reminderDate.setDate(reminderDate.getDate() + days)
        return reminderDate
      })
    }
  }

  /**
   * Send signature request to client
   */
  static sendSignatureRequest(
    request: SignatureRequest,
    customMessage?: string
  ): { success: boolean; message: string; trackingUrl: string } {
    
    // Update request status
    request.status = 'sent'
    request.sentAt = new Date()

    // Add audit trail
    request.auditTrail.push({
      id: `audit_${Date.now()}`,
      timestamp: new Date(),
      event: 'sent',
      actor: request.preparerName,
      actorType: 'preparer',
      ipAddress: '127.0.0.1',
      userAgent: 'Lawson Mobile Tax Platform',
      details: `Signature request sent to ${request.clientEmail}`
    })

    // Create notification
    const notification: SignatureNotification = {
      id: `notif_${Date.now()}`,
      type: 'email',
      recipient: request.clientEmail,
      subject: `Document Ready for Signature: ${request.documentName}`,
      message: customMessage || this.generateDefaultMessage(request),
      sentAt: new Date(),
      status: 'sent'
    }

    request.notifications.push(notification)

    const trackingUrl = `https://lawsonmobiletax.com/signature/${request.id}`

    return {
      success: true,
      message: `Signature request sent successfully to ${request.clientEmail}`,
      trackingUrl
    }
  }

  /**
   * Get signature request status
   */
  static getSignatureStatus(requestId: string): {
    status: string
    progress: number
    nextAction: string
    timeline: { event: string; timestamp: Date; actor: string }[]
  } {
    
    // This would fetch from database in production
    const mockRequest = this.createSignatureRequest(
      'tax_return_8879',
      'client_123',
      'John Smith',
      'john@example.com',
      'prep_456',
      'Jennifer Martinez'
    )

    const signedFields = mockRequest.signatureFields.filter(f => f.value).length
    const totalRequired = mockRequest.signatureFields.filter(f => f.required).length
    const progress = totalRequired > 0 ? (signedFields / totalRequired) * 100 : 0

    let nextAction = ''
    switch (mockRequest.status) {
      case 'draft':
        nextAction = 'Send to client for signature'
        break
      case 'sent':
        nextAction = 'Waiting for client to sign'
        break
      case 'viewed':
        nextAction = 'Client has viewed - follow up if needed'
        break
      case 'signed':
        nextAction = 'Review signatures and complete'
        break
      case 'completed':
        nextAction = 'Document fully executed'
        break
      case 'declined':
        nextAction = 'Client declined - follow up required'
        break
      case 'expired':
        nextAction = 'Resend expired signature request'
        break
    }

    const timeline = mockRequest.auditTrail.map(event => ({
      event: event.event,
      timestamp: event.timestamp,
      actor: event.actor
    }))

    return {
      status: mockRequest.status,
      progress,
      nextAction,
      timeline
    }
  }

  /**
   * Generate default email message for signature request
   */
  private static generateDefaultMessage(request: SignatureRequest): string {
    return `
Dear ${request.clientName},

Your tax professional at Lawson Mobile Tax has prepared a document that requires your electronic signature:

Document: ${request.documentName}
Prepared by: ${request.preparerName}

Please click the link below to review and sign your document. The process takes just a few minutes and is completely secure.

The document will expire on ${request.expiresAt.toLocaleDateString()} if not signed.

If you have any questions about this document or the signing process, please don't hesitate to contact us at (855) 722-8700.

Best regards,
The Lawson Mobile Tax Team

This is an automated message from our secure document system. Your privacy and security are our top priorities.
    `
  }

  /**
   * Get document type from template ID
   */
  private static getDocumentTypeFromTemplate(templateId: string): SignatureRequest['type'] {
    if (templateId.includes('8879') || templateId.includes('2848')) return 'tax_return'
    if (templateId.includes('engagement')) return 'engagement_letter'
    if (templateId.includes('bookkeeping')) return 'bookkeeping_agreement'
    if (templateId.includes('organizer')) return 'organizer'
    if (templateId.includes('amendment')) return 'amendment'
    if (templateId.includes('power_of_attorney')) return 'power_of_attorney'
    return 'tax_return'
  }

  /**
   * Schedule automated reminders
   */
  static scheduleReminders(request: SignatureRequest): void {
    request.reminderSchedule.forEach(reminderDate => {
      // In production, this would integrate with a job scheduler
      console.log(`Reminder scheduled for ${reminderDate.toISOString()} for request ${request.id}`)
    })
  }

  /**
   * Generate signature analytics
   */
  static generateSignatureAnalytics(requests: SignatureRequest[]): {
    totalRequests: number
    completionRate: number
    averageSigningTime: number
    statusDistribution: { [status: string]: number }
    documentTypeDistribution: { [type: string]: number }
    monthlyTrends: { month: string; completed: number; sent: number }[]
  } {
    
    const totalRequests = requests.length
    const completedRequests = requests.filter(r => r.status === 'completed').length
    const completionRate = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0

    // Calculate average signing time (for completed requests)
    const signingTimes = requests
      .filter(r => r.status === 'completed' && r.sentAt && r.signedAt)
      .map(r => {
        const sent = r.sentAt!.getTime()
        const signed = r.signedAt!.getTime()
        return (signed - sent) / (1000 * 60 * 60) // Convert to hours
      })
    
    const averageSigningTime = signingTimes.length > 0 ? 
      signingTimes.reduce((sum, time) => sum + time, 0) / signingTimes.length : 0

    // Status distribution
    const statusDistribution = requests.reduce((dist, request) => {
      dist[request.status] = (dist[request.status] || 0) + 1
      return dist
    }, {} as { [status: string]: number })

    // Document type distribution
    const documentTypeDistribution = requests.reduce((dist, request) => {
      dist[request.type] = (dist[request.type] || 0) + 1
      return dist
    }, {} as { [type: string]: number })

    // Mock monthly trends (would be calculated from actual data)
    const monthlyTrends = [
      { month: 'Jan 2025', completed: 45, sent: 52 },
      { month: 'Feb 2025', completed: 38, sent: 41 },
      { month: 'Mar 2025', completed: 67, sent: 73 },
      { month: 'Apr 2025', completed: 89, sent: 95 }
    ]

    return {
      totalRequests,
      completionRate,
      averageSigningTime,
      statusDistribution,
      documentTypeDistribution,
      monthlyTrends
    }
  }

  /**
   * Validate signature completion
   */
  static validateSignatureCompletion(request: SignatureRequest): {
    isComplete: boolean
    missingSignatures: string[]
    errors: string[]
  } {
    
    const requiredFields = request.signatureFields.filter(f => f.required)
    const missingSignatures: string[] = []
    const errors: string[] = []

    requiredFields.forEach(field => {
      if (!field.value || field.value.trim() === '') {
        missingSignatures.push(field.label)
      }
      
      // Validate field types
      if (field.type === 'date' && field.value) {
        const dateValue = new Date(field.value)
        if (isNaN(dateValue.getTime())) {
          errors.push(`Invalid date format in field: ${field.label}`)
        }
      }
    })

    const isComplete = missingSignatures.length === 0 && errors.length === 0

    return {
      isComplete,
      missingSignatures,
      errors
    }
  }
}

export default ESignatureIntegration
