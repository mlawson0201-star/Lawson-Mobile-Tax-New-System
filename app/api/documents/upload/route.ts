
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadFile } from '@/lib/s3'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const clientId = formData.get('clientId') as string
    const documentType = formData.get('type') as string || 'OTHER'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer for S3 upload
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Upload to S3 and get cloud storage path
    const cloudStoragePath = await uploadFile(buffer, file.name)

    // Save document metadata to database (using actual schema fields)
    const document = await prisma.document.create({
      data: {
        filename: `${Date.now()}-${file.name}`,
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileUrl: cloudStoragePath, // S3 key stored as fileUrl
        documentType: documentType.toUpperCase() as any,
        category: 'TAX_DOCUMENT',
        description: `Uploaded document: ${file.name}`,
        clientId: clientId || null,
        organizationId: session.user.organizationId || 'default-org',
        isProcessed: false,
        extractedData: {}
      }
    })

    // Process document with AI (real OCR processing)
    try {
      const processResponse = await fetch('/api/documents/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: document.id,
          cloudStoragePath: cloudStoragePath
        })
      })
      
      if (processResponse.ok) {
        // Update document as being processed
        await prisma.document.update({
          where: { id: document.id },
          data: { isProcessed: true }
        })
      }
    } catch (processError) {
      console.error('Document processing error:', processError)
      // Continue - document is uploaded, processing can retry later
    }

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        originalName: document.originalName,
        documentType: document.documentType,
        fileSize: document.fileSize,
        isProcessed: document.isProcessed,
        uploadedAt: document.createdAt
      },
      message: 'Document uploaded successfully to cloud storage'
    })

  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json({ 
      error: 'Upload failed. Please check AWS S3 configuration.' 
    }, { status: 500 })
  }
}
