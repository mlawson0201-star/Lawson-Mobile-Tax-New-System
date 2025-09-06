
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

async function cleanSeed() {
  console.log('🧹 Running clean seed process...')

  try {
    // Check if super admin exists
    const superAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
      include: { organization: true }
    })

    if (superAdmin) {
      console.log('✅ Super admin already exists:', superAdmin.email)
      console.log('✅ Organization:', superAdmin.organization.name)
    } else {
      console.log('❌ No super admin found, will create one...')

      // Create master organization
      const masterOrg = await prisma.organization.create({
        data: {
          name: 'Lawson Mobile Tax',
          slug: 'formality-tax-master',
          type: 'MASTER',
          email: 'admin@formalitytax.com',
          phone: '(555) 123-4567',
          primaryColor: '#6a0dad',
          secondaryColor: '#64748b'
        }
      })

      // Create super admin
      const hashedPassword = await bcrypt.hash('admin123', 12)
      const newAdmin = await prisma.user.create({
        data: {
          email: 'admin@formalitytax.com',
          password: hashedPassword,
          firstName: 'System',
          lastName: 'Admin',
          name: 'System Admin',
          role: 'SUPER_ADMIN',
          organizationId: masterOrg.id
        }
      })

      console.log('✅ Created super admin:', newAdmin.email)
    }

    // Get current stats
    const stats = {
      organizations: await prisma.organization.count(),
      users: await prisma.user.count(),
      leads: await prisma.lead.count(),
      clients: await prisma.client.count(),
      taxReturns: await prisma.taxReturn.count(),
      tasks: await prisma.task.count(),
      appointments: await prisma.appointment.count()
    }

    console.log('📊 Current database stats:')
    Object.entries(stats).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`)
    })

    console.log(`
🔐 Login Credentials Available:
- Super Admin: admin@formalitytax.com / admin123
- Demo Admin: john@doe.com / johndoe123  
- Staff User: staff@demotax.com / staff123

✅ Database is ready for use!
    `)

  } catch (error) {
    console.error('❌ Clean seed failed:', error)
  }
}

cleanSeed()
  .finally(async () => {
    await prisma.$disconnect()
  })
