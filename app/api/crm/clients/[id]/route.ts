

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const client = await prisma.client.findFirst({
      where: {
        id: params.id,
        organizationId: user.organizationId
      },
      include: {
        lead: {
          select: { id: true, source: true }
        },
        taxReturns: {
          select: { id: true, taxYear: true, status: true, totalIncome: true, refundAmount: true }
        },
        parentClient: {
          select: { id: true, firstName: true, lastName: true, company: true }
        },
        subAccounts: {
          select: { 
            id: true, 
            firstName: true, 
            lastName: true, 
            email: true,
            phone: true,
            accountType: true,
            customFields: true,
            status: true,
            _count: {
              select: {
                taxReturns: true,
                documents: true
              }
            }
          }
        },
        documents: {
          select: { id: true, filename: true, documentType: true, createdAt: true }
        },
        appointments: {
          select: { 
            id: true, 
            title: true, 
            startTime: true, 
            endTime: true, 
            status: true 
          },
          orderBy: { startTime: 'desc' },
          take: 10
        },
        notes: {
          select: { 
            id: true, 
            content: true, 
            type: true, 
            createdAt: true,
            author: { select: { name: true } }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            taxReturns: true,
            documents: true,
            appointments: true,
            subAccounts: true
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Calculate total value from tax returns
    const totalValue = await prisma.taxReturn.aggregate({
      where: { clientId: client.id },
      _sum: { refundAmount: true }
    })

    return NextResponse.json({
      ...client,
      totalValue: totalValue._sum.refundAmount || 0,
      taxReturnsCount: client._count.taxReturns,
      documentsCount: client._count.documents,
      appointmentsCount: client._count.appointments,
      subAccountsCount: client._count.subAccounts
    })
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      clientType,
      status,
      accountType,
      parentClientId,
      address,
      businessInfo,
      customFields,
      relationship
    } = body

    // Check if client exists and belongs to the organization
    const existingClient = await prisma.client.findFirst({
      where: {
        id: params.id,
        organizationId: user.organizationId
      }
    })

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Validate parent client if changing to sub-account
    if (accountType === 'SUB' && parentClientId) {
      const parentClient = await prisma.client.findFirst({
        where: {
          id: parentClientId,
          organizationId: user.organizationId,
          accountType: 'MAIN'
        }
      })

      if (!parentClient) {
        return NextResponse.json({ error: 'Invalid parent client' }, { status: 400 })
      }
    }

    // Prepare custom fields
    const finalCustomFields = { ...customFields }
    if (relationship) {
      finalCustomFields.relationship = relationship
    }

    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        clientType,
        status,
        accountType,
        parentClientId: accountType === 'SUB' ? parentClientId : null,
        address: address?.street ? `${address.street}, ${address.city}, ${address.state} ${address.zipCode}` : null,
        city: address?.city,
        state: address?.state,
        zipCode: address?.zipCode,
        businessType: businessInfo?.businessType,
        ein: businessInfo?.ein,
        customFields: finalCustomFields,
        updatedAt: new Date()
      },
      include: {
        parentClient: {
          select: { id: true, firstName: true, lastName: true, company: true }
        },
        subAccounts: {
          select: { 
            id: true, 
            firstName: true, 
            lastName: true, 
            email: true,
            accountType: true,
            customFields: true
          }
        }
      }
    })

    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if client exists and belongs to the organization
    const existingClient = await prisma.client.findFirst({
      where: {
        id: params.id,
        organizationId: user.organizationId
      },
      include: {
        subAccounts: true
      }
    })

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Check if client has sub-accounts that need to be handled
    if (existingClient.subAccounts.length > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete client with active sub-accounts. Please delete or reassign sub-accounts first.' 
      }, { status: 400 })
    }

    // Archive instead of delete to preserve data integrity
    await prisma.client.update({
      where: { id: params.id },
      data: {
        status: 'ARCHIVED',
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ message: 'Client archived successfully' })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

