
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

config()

const prisma = new PrismaClient()

async function checkData() {
  console.log('📊 Checking existing data...')

  const organizations = await prisma.organization.findMany()
  const users = await prisma.user.findMany()
  const leads = await prisma.lead.findMany()
  const clients = await prisma.client.findMany()
  const taxReturns = await prisma.taxReturn.findMany()

  console.log(`Organizations: ${organizations.length}`)
  console.log(`Users: ${users.length}`)
  console.log(`Leads: ${leads.length}`)
  console.log(`Clients: ${clients.length}`)
  console.log(`Tax Returns: ${taxReturns.length}`)

  if (organizations.length > 0) {
    console.log('\nOrganizations:')
    organizations.forEach(org => console.log(`- ${org.name} (${org.slug})`))
  }

  if (users.length > 0) {
    console.log('\nUsers:')
    users.forEach(user => console.log(`- ${user.email} (${user.role})`))
  }
}

checkData()
  .finally(async () => {
    await prisma.$disconnect()
  })
