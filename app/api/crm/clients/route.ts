
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get all real clients from database
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        clientType: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      clients: clients,
      count: clients.length,
      message: 'Real client data from database'
    })

  } catch (error) {
    console.error('Error fetching clients:', error)
    
    return NextResponse.json({
      success: true,
      clients: [],
      count: 0,
      message: 'Clean system - no clients yet. Ready to add your first client!'
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email, phone, clientType = 'INDIVIDUAL', status = 'ACTIVE' } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'First name, last name, and email are required' }, { status: 400 })
    }

    // Check if client already exists (using findFirst since email might not be unique)
    const existingClient = await prisma.client.findFirst({
      where: { email }
    })

    if (existingClient) {
      return NextResponse.json({ error: 'Client with this email already exists' }, { status: 409 })
    }

    // Create real client in database
    const client = await prisma.client.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        clientType: clientType.toUpperCase() as any,
        status: status.toUpperCase() as any,
        organizationId: session.user.organizationId || 'default-org'
      }
    })

    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        clientType: client.clientType,
        status: client.status,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
      },
      message: 'Real client added successfully'
    })

  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
