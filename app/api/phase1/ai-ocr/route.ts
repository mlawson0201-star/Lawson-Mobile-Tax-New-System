

import { NextRequest, NextResponse } from 'next/server'
import Tesseract from 'tesseract.js'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Enhanced AI OCR processing endpoint with REAL OCR functionality
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const language = formData.get('language') as string || 'eng'
    const documentType = formData.get('documentType') as string || 'auto'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Save the uploaded file temporarily
    const uploadsDir = join(process.cwd(), 'temp')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tempPath = join(uploadsDir, `temp-${Date.now()}-${file.name}`)
    await writeFile(tempPath, buffer)

    try {
      // Perform REAL OCR using Tesseract.js
      const { data: { text, confidence } } = await Tesseract.recognize(tempPath, language, {
        logger: m => console.log(m)
      })

      // Process extracted text based on document type
      const processedData = processOCRText(text, documentType, file.name)

      return NextResponse.json({
        success: true,
        rawText: text,
        confidence: confidence,
        extractedData: processedData,
        documentType: detectDocumentType(text, file.name),
        processingTime: Date.now(),
        language: language
      })

    } finally {
      // Clean up temporary file
      try {
        const fs = require('fs')
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath)
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError)
      }
    }

  } catch (error) {
    console.error('OCR processing error:', error)
    return NextResponse.json(
      { success: false, error: 'OCR processing failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

function detectDocumentType(text: string, fileName: string): string {
  const normalizedText = text.toLowerCase()
  const normalizedFileName = fileName.toLowerCase()
  
  if (normalizedText.includes('form w-2') || normalizedText.includes('wage and tax statement') || normalizedFileName.includes('w2')) {
    return 'W-2'
  }
  if (normalizedText.includes('form 1099') || normalizedFileName.includes('1099')) {
    return '1099'
  }
  if (normalizedText.includes('receipt') || normalizedText.includes('purchase') || normalizedFileName.includes('receipt')) {
    return 'Receipt'
  }
  if (normalizedText.includes('bank statement') || normalizedText.includes('account statement')) {
    return 'Bank Statement'
  }
  if (normalizedText.includes('invoice') || normalizedFileName.includes('invoice')) {
    return 'Invoice'
  }
  
  return 'General Document'
}

function processOCRText(text: string, documentType: string, fileName: string): any {
  const detectedType = detectDocumentType(text, fileName)
  let extractedData: any = {
    rawText: text,
    detectedType: detectedType
  }

  // Extract specific data based on document type
  if (detectedType === 'W-2' || documentType === 'w2') {
    extractedData = {
      ...extractedData,
      documentType: 'W-2',
      employeeName: extractField(text, /employee.*name[:\s]([^\n\r]+)/i),
      employerName: extractField(text, /employer.*name[:\s]([^\n\r]+)/i),
      wages: extractCurrency(text, /wages.*tips.*compensation[:\s]*([0-9,$.]+)/i),
      federalTaxWithheld: extractCurrency(text, /federal.*income.*tax.*withheld[:\s]*([0-9,$.]+)/i),
      socialSecurityWages: extractCurrency(text, /social.*security.*wages[:\s]*([0-9,$.]+)/i),
      medicareWages: extractCurrency(text, /medicare.*wages[:\s]*([0-9,$.]+)/i),
      ein: extractField(text, /employer.*identification.*number[:\s]*([0-9-]+)/i)
    }
  } else if (detectedType === '1099') {
    extractedData = {
      ...extractedData,
      documentType: '1099',
      payerName: extractField(text, /payer.*name[:\s]([^\n\r]+)/i),
      recipientName: extractField(text, /recipient.*name[:\s]([^\n\r]+)/i),
      income: extractCurrency(text, /income[:\s]*([0-9,$.]+)/i),
      taxWithheld: extractCurrency(text, /tax.*withheld[:\s]*([0-9,$.]+)/i)
    }
  } else if (detectedType === 'Receipt') {
    extractedData = {
      ...extractedData,
      documentType: 'Receipt',
      vendor: extractField(text, /^([^\n\r]{1,50})/), // Usually first line
      total: extractCurrency(text, /total[:\s]*([0-9,$.]+)/i),
      date: extractDate(text),
      items: extractReceiptItems(text)
    }
  }

  return extractedData
}

function extractField(text: string, regex: RegExp): string {
  const match = text.match(regex)
  return match ? match[1].trim() : ''
}

function extractCurrency(text: string, regex: RegExp): number {
  const match = text.match(regex)
  if (match) {
    const cleanAmount = match[1].replace(/[,$]/g, '')
    return parseFloat(cleanAmount) || 0
  }
  return 0
}

function extractDate(text: string): string {
  const dateRegex = /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})|(\d{2,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2})/
  const match = text.match(dateRegex)
  return match ? match[0] : ''
}

function extractReceiptItems(text: string): string[] {
  const lines = text.split('\n')
  const items = []
  
  for (const line of lines) {
    if (line.match(/.*\$\d+\.\d{2}/)) { // Lines with prices
      items.push(line.trim())
    }
  }
  
  return items.slice(0, 10) // Limit to first 10 items
}
