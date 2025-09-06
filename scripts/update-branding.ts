
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

async function updateBranding() {
  console.log('🏢 Updating branding to Lawson Mobile Tax...')

  try {
    // Update master organization to Lawson Mobile Tax
    const masterOrg = await prisma.organization.upsert({
      where: { slug: 'lawson-mobile-tax' },
      update: {
        name: 'Lawson Mobile Tax',
        email: 'support@lawsonmobiletax.com',
        phone: '(555) TAX-HELP',
        address: '123 Tax Professional Way',
        city: 'Business City',
        state: 'CA',
        zipCode: '90210',
        primaryColor: '#6a0dad',
        secondaryColor: '#4c1d95',
        customDomain: 'lawsonmobiletax.com'
      },
      create: {
        name: 'Lawson Mobile Tax',
        slug: 'lawson-mobile-tax',
        type: 'MASTER',
        email: 'support@lawsonmobiletax.com',
        phone: '(555) TAX-HELP',
        address: '123 Tax Professional Way',
        city: 'Business City',
        state: 'CA',
        zipCode: '90210',
        primaryColor: '#6a0dad',
        secondaryColor: '#4c1d95',
        customDomain: 'lawsonmobiletax.com'
      }
    })

    console.log('✅ Updated master organization:', masterOrg.name)

    // Create/update admin user
    const hashedPassword = await bcrypt.hash('LawsonAdmin2024!', 12)
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@lawsonmobiletax.com' },
      update: {
        password: hashedPassword,
        firstName: 'Lawson',
        lastName: 'Administrator',
        name: 'Lawson Administrator',
        role: 'SUPER_ADMIN',
        organizationId: masterOrg.id
      },
      create: {
        email: 'admin@lawsonmobiletax.com',
        password: hashedPassword,
        firstName: 'Lawson',
        lastName: 'Administrator',
        name: 'Lawson Administrator',
        role: 'SUPER_ADMIN',
        organizationId: masterOrg.id
      }
    })

    console.log('✅ Updated admin user:', adminUser.email)

    // Create preparer user
    const preparerUser = await prisma.user.upsert({
      where: { email: 'preparer@lawsonmobiletax.com' },
      update: {
        password: await bcrypt.hash('PreparerAccess2024!', 12),
        firstName: 'Tax',
        lastName: 'Preparer',
        name: 'Tax Preparer',
        role: 'STAFF',
        organizationId: masterOrg.id
      },
      create: {
        email: 'preparer@lawsonmobiletax.com',
        password: await bcrypt.hash('PreparerAccess2024!', 12),
        firstName: 'Tax',
        lastName: 'Preparer',
        name: 'Tax Preparer',
        role: 'STAFF',
        organizationId: masterOrg.id
      }
    })

    console.log('✅ Created preparer user:', preparerUser.email)

    // Create sample client user
    const clientUser = await prisma.user.upsert({
      where: { email: 'client@example.com' },
      update: {
        password: await bcrypt.hash('ClientPortal2024!', 12),
        firstName: 'Sample',
        lastName: 'Client',
        name: 'Sample Client',
        role: 'CLIENT',
        organizationId: masterOrg.id
      },
      create: {
        email: 'client@example.com',
        password: await bcrypt.hash('ClientPortal2024!', 12),
        firstName: 'Sample',
        lastName: 'Client',
        name: 'Sample Client',
        role: 'CLIENT',
        organizationId: masterOrg.id
      }
    })

    console.log('✅ Created client user:', clientUser.email)

    console.log(`
🎉 Branding Update Complete!

🏢 Organization: Lawson Mobile Tax
🌐 Domain: lawsonmobiletax.com
🎨 Primary Color: #6a0dad

🔐 Updated Login Credentials:
- Admin: admin@lawsonmobiletax.com / LawsonAdmin2024!
- Preparer: preparer@lawsonmobiletax.com / PreparerAccess2024!
- Client: client@example.com / ClientPortal2024!

📊 Database Stats:
- Organizations: ${await prisma.organization.count()}
- Users: ${await prisma.user.count()}
- Leads: ${await prisma.lead.count()}
- Clients: ${await prisma.client.count()}
    `)

  } catch (error) {
    console.error('❌ Branding update failed:', error)
  }
}

updateBranding()
  .finally(async () => {
    await prisma.$disconnect()
  })
