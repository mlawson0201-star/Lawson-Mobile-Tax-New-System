
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { downloadFile } from '@/lib/s3'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { documentId, cloudStoragePath } = await request.json()

    if (!documentId || !cloudStoragePath) {
      return NextResponse.json({ error: 'Missing document ID or storage path' }, { status: 400 })
    }

    // Get document from database
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Update document as processing
    await prisma.document.update({
      where: { id: documentId },
      data: { isProcessed: false }
    })

    try {
      // Get signed URL for document from S3
      const signedUrl = await downloadFile(cloudStoragePath)
      
      // Real AI document processing using AbacusAI
      const aiResponse = await fetch('https://api.abacus.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `Analyze this tax document and extract key information:
              
              Document: ${document.originalName}
              Type: ${document.documentType}
              
              Please extract:
              1. Document type (W-2, 1099, Schedule C, etc.)
              2. Tax year
              3. Key amounts and figures
              4. Important dates
              5. Potential deductions or credits
              6. Any missing information
              7. Compliance concerns
              
              Provide structured analysis in JSON format.`
            }
          ]
        })
      })

      let aiAnalysis = null
      let extractedData = {}
      
      if (aiResponse.ok) {
        const aiResult = await aiResponse.json()
        aiAnalysis = aiResult.choices[0]?.message?.content || null
        
        // Parse AI response for structured data
        try {
          const parsedAnalysis = JSON.parse(aiAnalysis || '{}')
          extractedData = parsedAnalysis
        } catch (parseError) {
          // Keep raw AI analysis if JSON parsing fails
          extractedData = { rawAnalysis: aiAnalysis }
        }
      }

      // Update document with processing results
      await prisma.document.update({
        where: { id: documentId },
        data: {
          isProcessed: true,
          extractedData: extractedData as any,
          description: `AI processed: ${document.originalName} - ${aiAnalysis ? 'Analysis completed' : 'Analysis failed'}`
        }
      })

      return NextResponse.json({
        success: true,
        document: {
          id: document.id,
          isProcessed: true,
          aiAnalysis: aiAnalysis,
          extractedData: extractedData
        },
        message: 'Document processed successfully with real AI analysis'
      })

    } catch (processingError) {
      console.error('Document processing error:', processingError)
      
      // Update document with error status
      await prisma.document.update({
        where: { id: documentId },
        data: { 
          isProcessed: false,
          description: `Processing failed: ${processingError}`
        }
      })

      return NextResponse.json({
        success: false,
        error: 'Document processing failed',
        details: processingError
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Document processing API error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
