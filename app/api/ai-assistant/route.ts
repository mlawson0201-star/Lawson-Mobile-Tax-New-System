
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Prepare system prompt for tax assistant
    const systemPrompt = `You are Melika, an AI assistant specialized in tax preparation and business operations for Lawson Mobile Tax service bureau platform. You help tax professionals with:

1. Tax law questions and updates
2. Client management and CRM guidance
3. Document organization and workflow optimization
4. Tax planning strategies
5. Business process automation
6. Compliance and audit preparation

Current user context:
- Organization: ${session.user.organization?.name || 'Unknown'}
- Role: ${session.user.role}
- User: ${session.user.name || session.user.email}

Additional context: ${context || 'None provided'}

Please provide helpful, accurate, and professional assistance. If you're unsure about specific tax law details, recommend consulting with a tax attorney or CPA.`

    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: message
      }
    ]

    // Call the LLM API
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`)
    }

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.error(new Error('No response body'))
          return
        }

        const decoder = new TextDecoder()
        const encoder = new TextEncoder()

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            controller.enqueue(encoder.encode(chunk))
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (error) {
    console.error('AI assistant error:', error)
    return NextResponse.json(
      { error: 'AI assistant service temporarily unavailable' },
      { status: 500 }
    )
  }
}
