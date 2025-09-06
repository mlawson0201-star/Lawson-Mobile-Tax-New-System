
import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string[] } }
) {
  try {
    const filename = params.filename.join('/')
    const filePath = join(process.cwd(), 'uploads', filename)
    
    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Read the file
    const fileBuffer = await readFile(filePath)
    
    // Determine content type based on file extension
    const ext = filename.split('.').pop()?.toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case 'pdf':
        contentType = 'application/pdf'
        break
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg'
        break
      case 'png':
        contentType = 'image/png'
        break
      case 'gif':
        contentType = 'image/gif'
        break
      case 'txt':
        contentType = 'text/plain'
        break
      case 'csv':
        contentType = 'text/csv'
        break
      case 'doc':
        contentType = 'application/msword'
        break
      case 'docx':
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        break
      case 'xls':
        contentType = 'application/vnd.ms-excel'
        break
      case 'xlsx':
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        break
    }

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000'
      }
    })

  } catch (error) {
    console.error('File serving error:', error)
    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    )
  }
}
