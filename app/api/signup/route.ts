
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils'
import { UserRole } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, companyName, phone, role = 'ADMIN' } = body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create organization for new partners
    const organizationData = {
      name: companyName || `${firstName} ${lastName} Tax Services`,
      slug: slugify(companyName || `${firstName}-${lastName}-tax`),
      email,
      phone: phone || null,
      type: 'PARTNER' as const
    }

    // Check if organization slug is unique
    const existingOrg = await prisma.organization.findUnique({
      where: { slug: organizationData.slug }
    })

    if (existingOrg) {
      organizationData.slug = `${organizationData.slug}-${Date.now()}`
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create organization and user in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create organization
      const organization = await tx.organization.create({
        data: organizationData
      })

      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          phone: phone || null,
          role: Object.values(UserRole).includes(role as UserRole) ? (role as UserRole) : UserRole.ADMIN,
          organizationId: organization.id
        },
        include: {
          organization: true
        }
      })

      return { user, organization }
    })

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        organizationId: result.user.organizationId
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
