
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only super admins can view all partners
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, organizationId: true }
    })

    if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const subscriptionPlan = searchParams.get('subscriptionPlan')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const where: any = {
      type: { in: ['PARTNER', 'BRANCH'] }
    }

    if (status && status !== 'all') {
      where.isActive = status === 'ACTIVE'
    }

    if (subscriptionPlan && subscriptionPlan !== 'all') {
      where.subscriptionPlan = subscriptionPlan
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { customDomain: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [partners, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        include: {
          _count: {
            select: {
              users: true,
              clients: true,
              taxReturns: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      }),
      prisma.organization.count({ where })
    ])

    // Calculate additional stats for each partner
    const partnersWithStats = await Promise.all(
      partners.map(async (partner: any) => {
        // Calculate monthly revenue (simplified - would need more complex logic in production)
        const monthlyRevenue = await prisma.taxReturn.aggregate({
          where: {
            organizationId: partner.id,
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          },
          _sum: { taxOwed: true, refundAmount: true }
        })

        const revenue = (monthlyRevenue._sum.taxOwed || 0) + (monthlyRevenue._sum.refundAmount || 0)

        return {
          ...partner,
          stats: {
            totalClients: partner._count.clients,
            monthlyRevenue: revenue,
            totalUsers: partner._count.users,
            taxReturnsProcessed: partner._count.taxReturns
          },
          status: partner.isActive ? 'ACTIVE' : 'INACTIVE',
          commissionRate: 15, // This should come from partner settings
          joinDate: partner.createdAt.toISOString(),
          lastActive: partner.updatedAt.toISOString(),
          branding: {
            logo: null, // Would be stored in settings or separate table
            primaryColor: partner.primaryColor,
            secondaryColor: partner.secondaryColor
          },
          address: {
            street: partner.address || '',
            city: partner.city || '',
            state: partner.state || '',
            zipCode: partner.zipCode || ''
          }
        }
      })
    )

    return NextResponse.json({
      partners: partnersWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only super admins can create partners
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      email,
      phone,
      subscriptionPlan = 'basic',
      customDomain,
      primaryColor = '#2563eb',
      secondaryColor = '#64748b',
      commissionRate = 15,
      address
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Generate unique slug
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // Check for duplicate slug or domain
    const existingOrg = await prisma.organization.findFirst({
      where: {
        OR: [
          { slug },
          { email },
          ...(customDomain ? [{ customDomain }] : [])
        ]
      }
    })

    if (existingOrg) {
      return NextResponse.json({ 
        error: 'Organization with this name, email, or domain already exists' 
      }, { status: 400 })
    }

    const partner = await prisma.organization.create({
      data: {
        name,
        slug,
        type: 'PARTNER',
        email,
        phone,
        address: address?.street,
        city: address?.city,
        state: address?.state,
        zipCode: address?.zipCode,
        customDomain,
        primaryColor,
        secondaryColor,
        subscriptionPlan,
        settings: {
          commissionRate,
          autoBackup: true,
          emailNotifications: true
        }
      }
    })

    // Create initial admin user for the partner
    const hashedPassword = 'temp123' // In production, generate a secure password and email it
    
    const adminUser = await prisma.user.create({
      data: {
        email,
        name: `${name} Admin`,
        password: hashedPassword, // Should be hashed with bcrypt
        role: 'ADMIN',
        organizationId: partner.id,
        permissions: ['manage_users', 'manage_clients', 'manage_settings']
      }
    })

    return NextResponse.json({
      ...partner,
      initialAdmin: {
        email: adminUser.email,
        tempPassword: 'temp123' // In production, this should be sent via secure email
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
