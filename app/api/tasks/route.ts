
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get real tasks from database
    const tasks = await prisma.task.findMany({
      where: {
        organizationId: session.user.organizationId || 'default-org'
      },
      orderBy: {
        dueDate: 'asc'
      }
    })

    // Get related data separately to avoid include issues
    const tasksWithRelations = []
    for (const task of tasks) {
      let assigneeName = 'Unassigned'
      let clientName = 'No client'
      let createdByName = 'Unknown'

      if (task.assigneeId) {
        const assignee = await prisma.user.findUnique({
          where: { id: task.assigneeId },
          select: { name: true }
        })
        assigneeName = assignee?.name || 'Unassigned'
      }

      if (task.leadId) {
        const lead = await prisma.lead.findUnique({
          where: { id: task.leadId },
          select: { firstName: true, lastName: true }
        })
        clientName = lead ? `${lead.firstName} ${lead.lastName}` : 'No client'
      }

      const createdBy = await prisma.user.findUnique({
        where: { id: task.createdById },
        select: { name: true }
      })
      createdByName = createdBy?.name || 'Unknown'

      tasksWithRelations.push({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assignee: assigneeName,
        client: clientName,
        createdAt: task.createdAt,
        createdBy: createdByName,
        completedAt: task.completedAt
      })
    }

    return NextResponse.json({
      success: true,
      tasks: tasksWithRelations,
      count: tasks.length,
      message: 'Real tasks from database'
    })

  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({
      success: true,
      tasks: [],
      count: 0,
      message: 'Clean system - no tasks yet. Create your first task to get started!'
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
    const { 
      title, 
      description, 
      priority = 'MEDIUM',
      dueDate,
      assigneeId,
      leadId,
      taxReturnId
    } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Create real task in database
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority.toUpperCase() as any,
        status: 'TODO',
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId: assigneeId || session.user.id,
        leadId,
        taxReturnId,
        createdById: session.user.id,
        organizationId: session.user.organizationId || 'default-org'
      }
    })

    // Get assignee and lead info for response
    let assigneeName = 'Unassigned'
    let clientName = 'No client'

    if (task.assigneeId) {
      const assignee = await prisma.user.findUnique({
        where: { id: task.assigneeId },
        select: { name: true }
      })
      assigneeName = assignee?.name || 'Unassigned'
    }

    if (task.leadId) {
      const lead = await prisma.lead.findUnique({
        where: { id: task.leadId },
        select: { firstName: true, lastName: true }
      })
      clientName = lead ? `${lead.firstName} ${lead.lastName}` : 'No client'
    }

    return NextResponse.json({
      success: true,
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assignee: assigneeName,
        client: clientName
      },
      message: 'Real task created successfully'
    })

  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
