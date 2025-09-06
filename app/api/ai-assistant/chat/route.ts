
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatRequest {
  message: string
  context?: 'crm' | 'tax-prep' | 'general'
  clientId?: string
  leadId?: string
  conversationHistory?: ChatMessage[]
}

// Mock AI responses - in production, integrate with OpenAI GPT-4 or similar
const generateAIResponse = async (request: ChatRequest, userContext: any) => {
  const { message, context, clientId, leadId, conversationHistory } = request
  
  // Analyze the message for intent
  const messageLower = message.toLowerCase()
  
  // Tax-related queries
  if (messageLower.includes('tax') || messageLower.includes('deduction') || messageLower.includes('irs')) {
    return {
      message: `Based on current tax law (2024), I can help you with that tax question. 

${messageLower.includes('deduction') ? 
  'For deductions, remember that business expenses must be ordinary and necessary. Common deductions include:\n• Home office expenses (if applicable)\n• Business equipment and software\n• Professional development and training\n• Travel expenses for business purposes\n\nWould you like me to analyze specific deductions for this client?' :
  'I can provide guidance on tax regulations, filing requirements, and compliance issues. What specific tax topic would you like to discuss?'}`,
      confidence: 90,
      sources: ['IRS Publication 535', '2024 Tax Code'],
      actionButtons: [
        { label: 'Calculate Deductions', action: 'calculate_deductions' },
        { label: 'Tax Law Updates', action: 'tax_updates' },
        { label: 'Compliance Check', action: 'compliance_check' }
      ]
    }
  }
  
  // CRM-related queries
  if (messageLower.includes('client') || messageLower.includes('lead') || messageLower.includes('crm')) {
    const clientInfo = clientId ? `I have access to client ${clientId}'s information and can provide personalized insights.` : ''
    const leadInfo = leadId ? `I can help analyze lead ${leadId} and suggest conversion strategies.` : ''
    
    return {
      message: `I can assist with CRM management and client relationship strategies. ${clientInfo} ${leadInfo}

Here are some ways I can help:
• Analyze client patterns and preferences
• Suggest follow-up strategies
• Recommend service offerings
• Track communication effectiveness

What specific CRM task would you like assistance with?`,
      confidence: 85,
      actionButtons: [
        { label: 'Analyze Client', action: 'analyze_client', data: { clientId } },
        { label: 'Lead Scoring', action: 'score_lead', data: { leadId } },
        { label: 'Follow-up Strategy', action: 'follow_up_strategy' }
      ]
    }
  }
  
  // Business process queries
  if (messageLower.includes('process') || messageLower.includes('workflow') || messageLower.includes('automation')) {
    return {
      message: `I can help optimize your tax service bureau processes and workflows. Here are areas where I can provide guidance:

• Client onboarding automation
• Document processing workflows  
• Quality control procedures
• Staff task assignment
• Seasonal capacity planning
• Technology integration

What specific process would you like to improve?`,
      confidence: 88,
      actionButtons: [
        { label: 'Workflow Analysis', action: 'analyze_workflow' },
        { label: 'Automation Ideas', action: 'suggest_automation' },
        { label: 'Efficiency Tips', action: 'efficiency_tips' }
      ]
    }
  }
  
  // General business advice
  if (messageLower.includes('business') || messageLower.includes('revenue') || messageLower.includes('growth')) {
    return {
      message: `I can provide business strategy insights for your tax service bureau:

• Revenue optimization strategies
• Service pricing analysis  
• Market expansion opportunities
• Client retention techniques
• Competitive positioning
• Seasonal business planning

Based on your current operations, here are some immediate opportunities:
1. **Upselling Add-on Services**: Consider offering audit protection and tax planning to existing clients
2. **Automation Implementation**: Reduce manual work with document processing automation
3. **Partner Network Growth**: Expand your white-label partner program

What aspect of business growth interests you most?`,
      confidence: 82,
      actionButtons: [
        { label: 'Revenue Analysis', action: 'revenue_analysis' },
        { label: 'Growth Strategy', action: 'growth_strategy' },
        { label: 'Market Research', action: 'market_research' }
      ]
    }
  }
  
  // Default response
  return {
    message: `I understand you're asking about "${message}". As your AI tax and business assistant, I can help with:

🔹 **Tax Questions**: Current regulations, deductions, compliance
🔹 **Client Management**: CRM strategies, relationship building
🔹 **Business Operations**: Process optimization, workflow automation
🔹 **Financial Analysis**: Revenue tracking, profitability insights
🔹 **Regulatory Updates**: Latest tax law changes and requirements

Could you provide more specific details about what you'd like assistance with?`,
    confidence: 70,
    actionButtons: [
      { label: 'Tax Help', action: 'tax_help' },
      { label: 'CRM Assistance', action: 'crm_help' },
      { label: 'Business Strategy', action: 'business_help' }
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organization: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body: ChatRequest = await request.json()
    const { message, context, clientId, leadId } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get additional context if clientId or leadId provided
    let clientData = null
    let leadData = null

    if (clientId) {
      clientData = await prisma.client.findFirst({
        where: { 
          id: clientId,
          organizationId: user.organizationId 
        },
        include: {
          taxReturns: true,
          documents: true
        }
      })
    }

    if (leadId) {
      leadData = await prisma.lead.findFirst({
        where: { 
          id: leadId,
          organizationId: user.organizationId 
        }
      })
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(body, {
      user,
      organization: user.organization,
      client: clientData,
      lead: leadData
    })

    // Log the conversation - commented out due to schema mismatch
    // await prisma.activity.create({
    //   data: {
    //     type: 'AI_INTERACTION',
    //     description: `AI Assistant conversation: ${message.substring(0, 100)}...`,
    //     userId: session.user.id,
    //     organizationId: user.organizationId,
    //     clientId: clientId || null,
    //     leadId: leadId || null,
    //     metadata: {
    //       context,
    //       userMessage: message,
    //       aiResponse: aiResponse.message,
    //       confidence: aiResponse.confidence
    //     }
    //   }
    // })

    return NextResponse.json(aiResponse)
  } catch (error) {
    console.error('Error processing AI chat:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Endpoint for getting AI suggestions based on context
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const context = searchParams.get('context')
    const clientId = searchParams.get('clientId')
    const leadId = searchParams.get('leadId')

    const suggestions = {
      crm: [
        "How can I improve my lead conversion rate?",
        "What's the best follow-up strategy for this client?",
        "How should I prioritize my leads today?",
        "What upselling opportunities exist for my clients?"
      ],
      'tax-prep': [
        "What deductions am I missing for this client?",
        "How has tax law changed for 2024?",
        "What's the best strategy for this business client?",
        "Are there any red flags in this tax return?"
      ],
      general: [
        "How can I grow my tax service business?",
        "What automation opportunities exist in my workflow?",
        "How do I optimize pricing for my services?",
        "What's the best way to handle seasonal capacity?"
      ]
    }

    return NextResponse.json({
      suggestions: suggestions[context as keyof typeof suggestions] || suggestions.general,
      quickActions: [
        { label: "Tax Law Update", action: "tax_update" },
        { label: "Client Analysis", action: "client_analysis" },
        { label: "Process Optimization", action: "process_optimization" },
        { label: "Revenue Report", action: "revenue_report" }
      ]
    })
  } catch (error) {
    console.error('Error getting AI suggestions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
