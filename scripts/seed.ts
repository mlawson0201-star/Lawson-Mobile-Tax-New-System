
import { PrismaClient, LeadStatus, Priority, ClientType, TaxReturnType, TaxReturnStatus, TaskStatus, AppointmentType, AppointmentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create master organization (Lawson Mobile Tax)
  const masterOrg = await prisma.organization.upsert({
    where: { slug: 'formality-tax' },
    update: {},
    create: {
      name: 'Lawson Mobile Tax',
      slug: 'formality-tax',
      type: 'MASTER',
      email: 'admin@formalitytax.com',
      phone: '(555) 123-4567',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b'
    }
  })

  // Create demo partner organization
  const partnerOrg = await prisma.organization.upsert({
    where: { slug: 'demo-tax-services' },
    update: {},
    create: {
      name: 'Demo Tax Services',
      slug: 'demo-tax-services',
      type: 'PARTNER',
      email: 'admin@demotax.com',
      phone: '(555) 987-6543',
      primaryColor: '#7c3aed',
      secondaryColor: '#64748b'
    }
  })

  // Create admin user for master organization
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@formalitytax.com' },
    update: {},
    create: {
      email: 'admin@formalitytax.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Admin',
      name: 'System Admin',
      role: 'SUPER_ADMIN',
      organizationId: masterOrg.id
    }
  })

  // Create demo user for partner organization
  const demoUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: await bcrypt.hash('johndoe123', 12),
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      role: 'ADMIN',
      organizationId: partnerOrg.id
    }
  })

  // Create staff users
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@demotax.com' },
    update: {},
    create: {
      email: 'staff@demotax.com',
      password: await bcrypt.hash('staff123', 12),
      firstName: 'Jane',
      lastName: 'Smith',
      name: 'Jane Smith',
      role: 'STAFF',
      organizationId: partnerOrg.id
    }
  })

  console.log('👥 Created organizations and users')

  // Create sample leads
  const sampleLeads = [
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 111-2233',
      company: 'Johnson Consulting',
      source: 'Website',
      status: LeadStatus.NEW,
      priority: Priority.MEDIUM,
      stage: 'initial_contact',
      expectedValue: 1500,
      probability: 25,
      organizationId: partnerOrg.id,
      createdById: demoUser.id,
      assigneeId: staffUser.id
    },
    {
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike.wilson@email.com',
      phone: '(555) 444-5566',
      company: 'Wilson Industries',
      source: 'Referral',
      status: LeadStatus.QUALIFIED,
      priority: Priority.HIGH,
      stage: 'proposal_sent',
      expectedValue: 3000,
      probability: 75,
      organizationId: partnerOrg.id,
      createdById: demoUser.id,
      assigneeId: demoUser.id
    },
    {
      firstName: 'Lisa',
      lastName: 'Brown',
      email: 'lisa.brown@email.com',
      phone: '(555) 777-8899',
      source: 'Social Media',
      status: LeadStatus.CONTACTED,
      priority: Priority.MEDIUM,
      stage: 'qualified',
      expectedValue: 800,
      probability: 50,
      organizationId: partnerOrg.id,
      createdById: staffUser.id,
      assigneeId: staffUser.id
    },
    {
      firstName: 'Robert',
      lastName: 'Davis',
      email: 'robert.davis@email.com',
      phone: '(555) 222-3344',
      company: 'Davis Corp',
      source: 'Cold Call',
      status: LeadStatus.WON,
      priority: Priority.HIGH,
      stage: 'won',
      expectedValue: 2500,
      probability: 100,
      organizationId: partnerOrg.id,
      createdById: demoUser.id,
      assigneeId: demoUser.id,
      convertedAt: new Date()
    }
  ]

  for (const leadData of sampleLeads) {
    await prisma.lead.create({
      data: leadData
    })
  }

  console.log('🎯 Created sample leads')

  // Create clients (including one converted from lead)
  const wonLead = await prisma.lead.findFirst({
    where: { status: 'WON', organizationId: partnerOrg.id }
  })

  const sampleClients = [
    {
      firstName: 'Robert',
      lastName: 'Davis',
      email: 'robert.davis@email.com',
      phone: '(555) 222-3344',
      company: 'Davis Corp',
      businessType: 'Corporation',
      clientType: ClientType.BUSINESS,
      address: '123 Business Ave',
      city: 'Business City',
      state: 'CA',
      zipCode: '90210',
      organizationId: partnerOrg.id,
      leadId: wonLead?.id
    },
    {
      firstName: 'Emily',
      lastName: 'Parker',
      email: 'emily.parker@email.com',
      phone: '(555) 888-9999',
      dateOfBirth: new Date('1985-06-15'),
      address: '456 Residential St',
      city: 'Home City',
      state: 'CA',
      zipCode: '90211',
      clientType: ClientType.INDIVIDUAL,
      organizationId: partnerOrg.id
    },
    {
      firstName: 'James',
      lastName: 'Miller',
      email: 'james.miller@email.com',
      phone: '(555) 333-4444',
      company: 'Miller & Associates',
      businessType: 'Partnership',
      clientType: ClientType.BUSINESS,
      organizationId: partnerOrg.id
    }
  ]

  for (const clientData of sampleClients) {
    await prisma.client.create({
      data: clientData
    })
  }

  console.log('👤 Created sample clients')

  // Create sample tax returns
  const clients = await prisma.client.findMany({
    where: { organizationId: partnerOrg.id }
  })

  for (const client of clients.slice(0, 2)) {
    await prisma.taxReturn.create({
      data: {
        taxYear: 2023,
        returnType: client.clientType === ClientType.BUSINESS ? TaxReturnType.BUSINESS_1120 : TaxReturnType.INDIVIDUAL_1040,
        status: Math.random() > 0.5 ? TaxReturnStatus.IN_PROGRESS : TaxReturnStatus.FILED,
        clientId: client.id,
        preparerId: staffUser.id,
        organizationId: partnerOrg.id,
        totalIncome: Math.floor(Math.random() * 100000) + 50000,
        totalDeductions: Math.floor(Math.random() * 20000) + 5000,
        dueDateAt: new Date('2024-04-15'),
        startedAt: new Date()
      }
    })
  }

  console.log('📄 Created sample tax returns')

  // Create sample tasks
  const taxReturns = await prisma.taxReturn.findMany({
    where: { organizationId: partnerOrg.id }
  })

  const leads = await prisma.lead.findMany({
    where: { organizationId: partnerOrg.id }
  })

  const sampleTasks = [
    {
      title: 'Review W-2 documents',
      description: 'Check all W-2 forms for accuracy',
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
      assigneeId: staffUser.id,
      createdById: demoUser.id,
      taxReturnId: taxReturns[0]?.id,
      organizationId: partnerOrg.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    {
      title: 'Follow up with lead',
      description: 'Call Sarah Johnson regarding tax preparation services',
      status: TaskStatus.TODO,
      priority: Priority.MEDIUM,
      assigneeId: staffUser.id,
      createdById: demoUser.id,
      leadId: leads[0]?.id,
      organizationId: partnerOrg.id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    }
  ]

  for (const taskData of sampleTasks) {
    await prisma.task.create({
      data: taskData
    })
  }

  console.log('✅ Created sample tasks')

  // Create sample appointments
  const sampleAppointments = [
    {
      title: 'Tax Consultation',
      description: 'Initial tax planning discussion',
      type: AppointmentType.CONSULTATION,
      status: AppointmentStatus.SCHEDULED,
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour later
      clientId: clients[0]?.id,
      staffId: demoUser.id,
      organizationId: partnerOrg.id,
      location: 'Main Office'
    },
    {
      title: 'Document Review',
      description: 'Review tax documents before filing',
      type: AppointmentType.DOCUMENT_REVIEW,
      status: AppointmentStatus.CONFIRMED,
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
      clientId: clients[1]?.id,
      staffId: staffUser.id,
      organizationId: partnerOrg.id,
      location: 'Virtual Meeting'
    }
  ]

  for (const appointmentData of sampleAppointments) {
    await prisma.appointment.create({
      data: appointmentData
    })
  }

  console.log('📅 Created sample appointments')

  console.log('✅ Database seed completed successfully!')
  console.log(`
📊 Summary:
- Organizations: 2 (1 master, 1 partner)
- Users: 3 (1 super admin, 1 admin, 1 staff)
- Leads: ${sampleLeads.length}
- Clients: ${sampleClients.length}
- Tax Returns: ${clients.length}
- Tasks: ${sampleTasks.length}
- Appointments: ${sampleAppointments.length}

🔐 Login Credentials:
- Super Admin: admin@formalitytax.com / admin123
- Partner Admin: john@doe.com / johndoe123
- Staff User: staff@demotax.com / staff123
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
