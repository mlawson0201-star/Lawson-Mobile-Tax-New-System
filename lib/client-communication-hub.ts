
// Client Communication Hub - Phase 2 Business Expansion
// Real-time messaging and communication system for Lawson Mobile Tax

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: 'client' | 'preparer' | 'admin' | 'system'
  recipientId: string
  recipientName: string
  recipientRole: 'client' | 'preparer' | 'admin' | 'system'
  content: string
  messageType: 'text' | 'file' | 'image' | 'system_notification' | 'status_update' | 'reminder'
  status: 'sent' | 'delivered' | 'read' | 'failed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  createdAt: Date
  readAt?: Date
  attachments: MessageAttachment[]
  metadata: {
    clientId?: string
    taxReturnId?: string
    documentId?: string
    taskId?: string
    category?: string
    tags?: string[]
  }
  isEncrypted: boolean
  retentionPeriod: number // days
}

export interface MessageAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  thumbnailUrl?: string
  uploadedAt: Date
  isSecure: boolean
}

export interface Conversation {
  id: string
  participants: ConversationParticipant[]
  subject: string
  category: 'tax_return' | 'bookkeeping' | 'general_inquiry' | 'urgent_matter' | 'document_request' | 'appointment' | 'billing'
  status: 'active' | 'archived' | 'closed' | 'on_hold'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  createdAt: Date
  lastActivityAt: Date
  messageCount: number
  unreadCount: { [userId: string]: number }
  tags: string[]
  assignedTo?: string // Tax preparer ID
  clientId: string
  isInternal: boolean // Internal staff communication
  autoCloseDate?: Date
  slaStatus: 'on_time' | 'approaching_deadline' | 'overdue'
  responseTime: {
    first: number // minutes
    average: number // minutes
    target: number // minutes
  }
}

export interface ConversationParticipant {
  userId: string
  name: string
  role: 'client' | 'preparer' | 'admin' | 'observer'
  email: string
  joinedAt: Date
  lastSeenAt?: Date
  notificationSettings: {
    email: boolean
    sms: boolean
    push: boolean
    inApp: boolean
  }
}

export interface CommunicationTemplate {
  id: string
  name: string
  subject: string
  content: string
  category: 'welcome' | 'document_request' | 'status_update' | 'reminder' | 'completion' | 'follow_up' | 'seasonal'
  variables: TemplateVariable[]
  isActive: boolean
  usage: 'email' | 'sms' | 'in_app' | 'all'
  triggers: TemplateTrigger[]
  personalization: PersonalizationRule[]
  createdBy: string
  lastModified: Date
  version: number
}

export interface TemplateVariable {
  key: string
  label: string
  type: 'text' | 'date' | 'number' | 'currency' | 'list'
  defaultValue?: string
  required: boolean
  description: string
}

export interface TemplateTrigger {
  event: 'client_signup' | 'document_uploaded' | 'return_completed' | 'payment_received' | 'deadline_approaching' | 'manual'
  conditions: { [key: string]: any }
  delay: number // minutes
  isActive: boolean
}

export interface PersonalizationRule {
  condition: string
  contentVariation: string
  priority: number
}

export interface NotificationPreferences {
  userId: string
  email: {
    enabled: boolean
    frequency: 'immediate' | 'daily_digest' | 'weekly_digest'
    types: NotificationType[]
  }
  sms: {
    enabled: boolean
    types: NotificationType[]
  }
  push: {
    enabled: boolean
    types: NotificationType[]
  }
  inApp: {
    enabled: boolean
    types: NotificationType[]
  }
  quietHours: {
    enabled: boolean
    start: string // HH:mm format
    end: string // HH:mm format
    timezone: string
  }
}

export type NotificationType = 
  | 'new_message'
  | 'document_uploaded'
  | 'document_signed'
  | 'return_completed'
  | 'payment_due'
  | 'deadline_reminder'
  | 'appointment_scheduled'
  | 'status_update'
  | 'urgent_matter'
  | 'system_maintenance'

export interface CommunicationAnalytics {
  conversationId?: string
  clientId?: string
  preparerId?: string
  period: { start: Date; end: Date }
  metrics: {
    totalMessages: number
    totalConversations: number
    averageResponseTime: number
    clientSatisfactionScore?: number
    resolutionRate: number
    activeConversations: number
    peakHours: { hour: number; messageCount: number }[]
  }
  trends: {
    messagesOverTime: { date: string; count: number }[]
    responseTimesTrend: { date: string; avgMinutes: number }[]
    satisfactionTrend: { date: string; score: number }[]
  }
  topCategories: { category: string; count: number; percentage: number }[]
}

export class ClientCommunicationHub {

  /**
   * Get communication templates
   */
  static getCommunicationTemplates(): CommunicationTemplate[] {
    return [
      {
        id: 'welcome_new_client',
        name: 'Welcome New Client',
        subject: 'Welcome to Lawson Mobile Tax - Let\'s Get Started!',
        content: `
Dear {{clientName}},

Welcome to the Lawson Mobile Tax family! We're excited to work with you and ensure your tax situation is optimized for maximum savings.

Your assigned tax professional is {{preparerName}}, who specializes in {{preparerSpecialties}}. They have {{preparerExperience}} years of experience and will be your dedicated point of contact.

Next Steps:
1. Complete your client organizer (link below)
2. Upload your tax documents using our secure portal
3. Schedule your consultation call

Your secure client portal: {{portalUrl}}
Direct contact: {{preparerPhone}} or {{preparerEmail}}

We're here to make your tax experience as smooth and beneficial as possible. Don't hesitate to reach out with any questions!

Best regards,
The Lawson Mobile Tax Team
        `,
        category: 'welcome',
        variables: [
          { key: 'clientName', label: 'Client Name', type: 'text', required: true, description: 'Client\'s full name' },
          { key: 'preparerName', label: 'Preparer Name', type: 'text', required: true, description: 'Assigned tax preparer name' },
          { key: 'preparerSpecialties', label: 'Preparer Specialties', type: 'text', required: true, description: 'Tax preparer areas of expertise' },
          { key: 'preparerExperience', label: 'Preparer Experience', type: 'number', required: true, description: 'Years of experience' },
          { key: 'portalUrl', label: 'Portal URL', type: 'text', required: true, description: 'Client portal access link' },
          { key: 'preparerPhone', label: 'Preparer Phone', type: 'text', required: true, description: 'Direct phone number' },
          { key: 'preparerEmail', label: 'Preparer Email', type: 'text', required: true, description: 'Direct email address' }
        ],
        isActive: true,
        usage: 'email',
        triggers: [
          {
            event: 'client_signup',
            conditions: { isNewClient: true },
            delay: 5, // 5 minutes after signup
            isActive: true
          }
        ],
        personalization: [],
        createdBy: 'system',
        lastModified: new Date(),
        version: 1
      },

      {
        id: 'document_request',
        name: 'Tax Document Request',
        subject: 'Action Required: Upload Your {{documentType}} Documents',
        content: `
Hi {{clientName}},

To complete your {{taxYear}} tax return, we need you to upload your {{documentType}} documents.

Required Documents:
{{#each requiredDocs}}
• {{this}}
{{/each}}

Why we need these:
{{documentReason}}

Potential tax impact:
{{taxImpact}}

Upload deadline: {{deadline}}
Upload here: {{uploadUrl}}

Questions? Reply to this message or call {{preparerPhone}}.

Your tax professional,
{{preparerName}}
        `,
        category: 'document_request',
        variables: [
          { key: 'clientName', label: 'Client Name', type: 'text', required: true, description: 'Client name' },
          { key: 'documentType', label: 'Document Type', type: 'text', required: true, description: 'Type of documents needed' },
          { key: 'taxYear', label: 'Tax Year', type: 'number', required: true, description: 'Tax year being prepared' },
          { key: 'requiredDocs', label: 'Required Documents', type: 'list', required: true, description: 'List of specific documents needed' },
          { key: 'documentReason', label: 'Document Reason', type: 'text', required: true, description: 'Why documents are needed' },
          { key: 'taxImpact', label: 'Tax Impact', type: 'text', required: true, description: 'Potential tax savings or implications' },
          { key: 'deadline', label: 'Upload Deadline', type: 'date', required: true, description: 'When documents are due' },
          { key: 'uploadUrl', label: 'Upload URL', type: 'text', required: true, description: 'Secure upload link' },
          { key: 'preparerName', label: 'Preparer Name', type: 'text', required: true, description: 'Tax preparer name' },
          { key: 'preparerPhone', label: 'Preparer Phone', type: 'text', required: true, description: 'Preparer phone number' }
        ],
        isActive: true,
        usage: 'email',
        triggers: [
          {
            event: 'manual',
            conditions: {},
            delay: 0,
            isActive: true
          }
        ],
        personalization: [
          {
            condition: 'clientType === "business"',
            contentVariation: 'business_document_request',
            priority: 1
          }
        ],
        createdBy: 'system',
        lastModified: new Date(),
        version: 2
      },

      {
        id: 'return_completed',
        name: 'Tax Return Completed',
        subject: 'Great News! Your {{taxYear}} Tax Return is Complete',
        content: `
Dear {{clientName}},

Excellent news! Your {{taxYear}} tax return has been completed and is ready for your review and signature.

Key Results:
• Refund Amount: {{refundAmount}}
• Tax Savings Achieved: {{taxSavings}}
• Effective Tax Rate: {{effectiveTaxRate}}%
• Total Deductions: {{totalDeductions}}

What's Next:
1. Review your return: {{reviewUrl}}
2. E-sign Form 8879: {{signatureUrl}}
3. We'll file electronically within 24 hours of signature

Highlights of Your Return:
{{returnHighlights}}

Tax Planning Recommendations:
{{taxRecommendations}}

Questions about your return? Let's schedule a review call: {{schedulingUrl}}

Congratulations on another successful tax season!

{{preparerName}}, {{preparerCredentials}}
{{preparerPhone}} | {{preparerEmail}}
        `,
        category: 'completion',
        variables: [
          { key: 'clientName', label: 'Client Name', type: 'text', required: true, description: 'Client name' },
          { key: 'taxYear', label: 'Tax Year', type: 'number', required: true, description: 'Tax year' },
          { key: 'refundAmount', label: 'Refund Amount', type: 'currency', required: true, description: 'Total refund amount' },
          { key: 'taxSavings', label: 'Tax Savings', type: 'currency', required: true, description: 'Amount saved through optimization' },
          { key: 'effectiveTaxRate', label: 'Effective Tax Rate', type: 'number', required: true, description: 'Client\'s effective tax rate percentage' },
          { key: 'totalDeductions', label: 'Total Deductions', type: 'currency', required: true, description: 'Total deductions claimed' },
          { key: 'reviewUrl', label: 'Review URL', type: 'text', required: true, description: 'Link to review return' },
          { key: 'signatureUrl', label: 'Signature URL', type: 'text', required: true, description: 'E-signature link' },
          { key: 'returnHighlights', label: 'Return Highlights', type: 'text', required: true, description: 'Key points about the return' },
          { key: 'taxRecommendations', label: 'Tax Recommendations', type: 'text', required: true, description: 'Future tax planning suggestions' }
        ],
        isActive: true,
        usage: 'email',
        triggers: [
          {
            event: 'return_completed',
            conditions: { status: 'ready_for_signature' },
            delay: 15, // 15 minutes after completion
            isActive: true
          }
        ],
        personalization: [
          {
            condition: 'refundAmount > 5000',
            contentVariation: 'large_refund_celebration',
            priority: 1
          }
        ],
        createdBy: 'system',
        lastModified: new Date(),
        version: 1
      },

      {
        id: 'quarterly_reminder',
        name: 'Quarterly Tax Planning Reminder',
        subject: 'Q{{quarter}} Tax Planning - Let\'s Optimize Your Strategy',
        content: `
Hi {{clientName}},

As we enter Q{{quarter}} of {{year}}, it's time for your quarterly tax planning review to ensure you're on track for maximum tax savings.

Current Year Progress:
• Estimated Annual Income: {{projectedIncome}}
• Tax Withholdings to Date: {{withholdingsToDate}}
• Quarterly Payment Status: {{quarterlyStatus}}

Q{{quarter}} Opportunities:
{{quarterlyOpportunities}}

Recommended Actions:
{{recommendedActions}}

Let's schedule your Q{{quarter}} planning call: {{schedulingUrl}}

This is included in your {{serviceLevel}} service package at no additional cost.

Your proactive tax team,
{{preparerName}}
        `,
        category: 'seasonal',
        variables: [
          { key: 'clientName', label: 'Client Name', type: 'text', required: true, description: 'Client name' },
          { key: 'quarter', label: 'Quarter', type: 'number', required: true, description: 'Current quarter (1-4)' },
          { key: 'year', label: 'Year', type: 'number', required: true, description: 'Current tax year' },
          { key: 'projectedIncome', label: 'Projected Income', type: 'currency', required: true, description: 'Estimated annual income' },
          { key: 'withholdingsToDate', label: 'Withholdings to Date', type: 'currency', required: true, description: 'Tax withholdings so far' },
          { key: 'quarterlyStatus', label: 'Quarterly Status', type: 'text', required: true, description: 'Status of quarterly payments' },
          { key: 'quarterlyOpportunities', label: 'Quarterly Opportunities', type: 'text', required: true, description: 'Specific opportunities for the quarter' },
          { key: 'recommendedActions', label: 'Recommended Actions', type: 'text', required: true, description: 'Action items for the client' },
          { key: 'serviceLevel', label: 'Service Level', type: 'text', required: true, description: 'Client\'s service package level' }
        ],
        isActive: true,
        usage: 'email',
        triggers: [
          {
            event: 'manual', // Triggered quarterly by schedule
            conditions: { hasOngoingService: true },
            delay: 0,
            isActive: true
          }
        ],
        personalization: [],
        createdBy: 'system',
        lastModified: new Date(),
        version: 1
      }
    ]
  }

  /**
   * Create new conversation
   */
  static createConversation(
    clientId: string,
    subject: string,
    category: Conversation['category'],
    assignedPreparerId?: string,
    priority: Conversation['priority'] = 'normal'
  ): Conversation {
    
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      id: conversationId,
      participants: [], // Would be populated with actual participants
      subject,
      category,
      status: 'active',
      priority,
      createdAt: new Date(),
      lastActivityAt: new Date(),
      messageCount: 0,
      unreadCount: {},
      tags: [],
      assignedTo: assignedPreparerId,
      clientId,
      isInternal: false,
      slaStatus: 'on_time',
      responseTime: {
        first: 0,
        average: 0,
        target: category === 'urgent_matter' ? 15 : 120 // minutes
      }
    }
  }

  /**
   * Send message in conversation
   */
  static sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    senderRole: Message['senderRole'],
    recipientId: string,
    recipientName: string,
    recipientRole: Message['recipientRole'],
    content: string,
    messageType: Message['messageType'] = 'text',
    priority: Message['priority'] = 'normal',
    attachments: MessageAttachment[] = [],
    metadata: Message['metadata'] = {}
  ): Message {
    
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      id: messageId,
      conversationId,
      senderId,
      senderName,
      senderRole,
      recipientId,
      recipientName,
      recipientRole,
      content,
      messageType,
      status: 'sent',
      priority,
      createdAt: new Date(),
      attachments,
      metadata,
      isEncrypted: true,
      retentionPeriod: 2555 // 7 years for tax records
    }
  }

  /**
   * Generate personalized message from template
   */
  static generateMessageFromTemplate(
    templateId: string,
    variables: { [key: string]: any },
    clientProfile?: any
  ): { subject: string; content: string } {
    
    const template = this.getCommunicationTemplates().find(t => t.id === templateId)
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    let subject = template.subject
    let content = template.content

    // Replace variables
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      subject = subject.replace(regex, String(value))
      content = content.replace(regex, String(value))
    })

    // Apply personalization rules
    if (clientProfile && template.personalization.length > 0) {
      template.personalization.forEach(rule => {
        // Simple condition evaluation (in production, use a proper expression evaluator)
        if (this.evaluateCondition(rule.condition, clientProfile, variables)) {
          // Apply content variation (simplified)
          content = this.applyContentVariation(content, rule.contentVariation)
        }
      })
    }

    return { subject, content }
  }

  /**
   * Get conversation analytics
   */
  static getConversationAnalytics(
    filters: {
      clientId?: string
      preparerId?: string
      dateRange?: { start: Date; end: Date }
      category?: string
    } = {}
  ): CommunicationAnalytics {
    
    // Mock analytics data - would be calculated from real conversation data
    const period = filters.dateRange || {
      start: new Date(2025, 0, 1), // Jan 1, 2025
      end: new Date() // Now
    }

    return {
      ...filters,
      period,
      metrics: {
        totalMessages: 2847,
        totalConversations: 342,
        averageResponseTime: 45.2, // minutes
        clientSatisfactionScore: 4.7,
        resolutionRate: 94.2,
        activeConversations: 28,
        peakHours: [
          { hour: 9, messageCount: 145 },
          { hour: 10, messageCount: 189 },
          { hour: 11, messageCount: 167 },
          { hour: 14, messageCount: 156 },
          { hour: 15, messageCount: 142 }
        ]
      },
      trends: {
        messagesOverTime: [
          { date: '2025-01-01', count: 45 },
          { date: '2025-01-02', count: 67 },
          { date: '2025-01-03', count: 52 }
          // ... more data points
        ],
        responseTimesTrend: [
          { date: '2025-01-01', avgMinutes: 42.3 },
          { date: '2025-01-02', avgMinutes: 38.7 },
          { date: '2025-01-03', avgMinutes: 51.2 }
        ],
        satisfactionTrend: [
          { date: '2025-01-01', score: 4.6 },
          { date: '2025-01-02', score: 4.8 },
          { date: '2025-01-03', score: 4.5 }
        ]
      },
      topCategories: [
        { category: 'tax_return', count: 156, percentage: 45.6 },
        { category: 'document_request', count: 89, percentage: 26.0 },
        { category: 'general_inquiry', count: 67, percentage: 19.6 },
        { category: 'urgent_matter', count: 23, percentage: 6.7 },
        { category: 'billing', count: 7, percentage: 2.0 }
      ]
    }
  }

  /**
   * Send automated notification
   */
  static sendAutomatedNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    actionUrl?: string,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ): boolean {
    
    // Check user preferences
    const preferences = this.getUserNotificationPreferences(userId)
    
    // Determine delivery methods based on preferences and priority
    const deliveryMethods: ('email' | 'sms' | 'push' | 'inApp')[] = []
    
    if (preferences.email.enabled && preferences.email.types.includes(type)) {
      deliveryMethods.push('email')
    }
    
    if (preferences.sms.enabled && preferences.sms.types.includes(type)) {
      deliveryMethods.push('sms')
    }
    
    if (preferences.push.enabled && preferences.push.types.includes(type)) {
      deliveryMethods.push('push')
    }
    
    if (preferences.inApp.enabled && preferences.inApp.types.includes(type)) {
      deliveryMethods.push('inApp')
    }

    // For urgent notifications, override preferences
    if (priority === 'urgent') {
      deliveryMethods.push('email', 'sms', 'push')
    }

    // Check quiet hours
    if (preferences.quietHours.enabled && this.isQuietHours(preferences.quietHours)) {
      // Only send urgent notifications during quiet hours
      if (priority !== 'urgent') {
        return false
      }
    }

    // Send notifications via selected methods
    deliveryMethods.forEach(method => {
      this.sendNotificationViaMethod(method, userId, title, message, actionUrl)
    })

    return true
  }

  /**
   * Get user notification preferences
   */
  private static getUserNotificationPreferences(userId: string): NotificationPreferences {
    // Mock preferences - would be fetched from database
    return {
      userId,
      email: {
        enabled: true,
        frequency: 'immediate',
        types: ['new_message', 'document_uploaded', 'deadline_reminder', 'return_completed']
      },
      sms: {
        enabled: true,
        types: ['urgent_matter', 'deadline_reminder']
      },
      push: {
        enabled: true,
        types: ['new_message', 'status_update']
      },
      inApp: {
        enabled: true,
        types: ['new_message', 'document_uploaded', 'status_update', 'deadline_reminder']
      },
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '07:00',
        timezone: 'America/Los_Angeles'
      }
    }
  }

  /**
   * Check if current time is within quiet hours
   */
  private static isQuietHours(quietHours: NotificationPreferences['quietHours']): boolean {
    // Simplified check - would use proper timezone handling in production
    const now = new Date()
    const currentHour = now.getHours()
    const startHour = parseInt(quietHours.start.split(':')[0])
    const endHour = parseInt(quietHours.end.split(':')[0])
    
    if (startHour <= endHour) {
      return currentHour >= startHour && currentHour < endHour
    } else {
      // Quiet hours span midnight
      return currentHour >= startHour || currentHour < endHour
    }
  }

  /**
   * Send notification via specific method
   */
  private static sendNotificationViaMethod(
    method: 'email' | 'sms' | 'push' | 'inApp',
    userId: string,
    title: string,
    message: string,
    actionUrl?: string
  ): void {
    
    console.log(`Sending ${method} notification to user ${userId}: ${title}`)
    
    // Integration points for actual notification services
    switch (method) {
      case 'email':
        // Integrate with email service (SendGrid, AWS SES, etc.)
        break
      case 'sms':
        // Integrate with SMS service (Twilio, AWS SNS, etc.)
        break
      case 'push':
        // Integrate with push notification service (Firebase, OneSignal, etc.)
        break
      case 'inApp':
        // Store in database for in-app notification display
        break
    }
  }

  /**
   * Evaluate personalization condition (simplified)
   */
  private static evaluateCondition(
    condition: string,
    clientProfile: any,
    variables: any
  ): boolean {
    // Simplified condition evaluation - in production, use a proper expression evaluator
    if (condition.includes('refundAmount > 5000')) {
      return (variables.refundAmount || 0) > 5000
    }
    if (condition.includes('clientType === "business"')) {
      return clientProfile.type === 'business'
    }
    return false
  }

  /**
   * Apply content variation (simplified)
   */
  private static applyContentVariation(content: string, variation: string): string {
    // Simplified variation application - in production, use proper template system
    if (variation === 'large_refund_celebration') {
      return content.replace(
        'Excellent news!',
        'Fantastic news! 🎉 You\'ve achieved an exceptional refund!'
      )
    }
    return content
  }

  /**
   * Get message delivery status
   */
  static getMessageDeliveryStatus(messageId: string): {
    status: Message['status']
    deliveryTime?: Date
    readTime?: Date
    deliveryAttempts: number
    lastError?: string
  } {
    
    // Mock delivery status - would be tracked in real system
    return {
      status: 'read',
      deliveryTime: new Date(Date.now() - 300000), // 5 minutes ago
      readTime: new Date(Date.now() - 120000), // 2 minutes ago
      deliveryAttempts: 1,
      lastError: undefined
    }
  }
}

export default ClientCommunicationHub
