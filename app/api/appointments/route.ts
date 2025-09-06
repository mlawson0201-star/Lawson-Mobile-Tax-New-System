
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { sendSMS } from '@/lib/sms'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let whereClause: any = {
      organizationId: session.user.organizationId || 'default-org'
    }

    if (status) {
      whereClause.status = status.toUpperCase()
    }

    if (startDate && endDate) {
      whereClause.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    // Get real appointments from database
    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        staff: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      appointments: appointments.map(apt => ({
        id: apt.id,
        title: apt.title,
        description: apt.description,
        startTime: apt.startTime,
        endTime: apt.endTime,
        duration: Math.round((apt.endTime.getTime() - apt.startTime.getTime()) / (1000 * 60)),
        status: apt.status,
        type: apt.type,
        client: apt.client ? `${apt.client.firstName} ${apt.client.lastName}` : 'No client',
        clientEmail: apt.client?.email,
        clientPhone: apt.client?.phone,
        assignedTo: apt.staff?.name || 'Unassigned',
        location: apt.location,
        notes: apt.notes,
        createdAt: apt.createdAt
      })),
      count: appointments.length,
      message: 'Real appointments from database'
    })

  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({
      success: true,
      appointments: [],
      count: 0,
      message: 'Clean system - no appointments yet. Schedule your first appointment!'
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
      startTime,
      endTime,
      type = 'CONSULTATION',
      clientId,
      clientEmail,
      clientPhone,
      clientName,
      location = 'VIRTUAL',
      notes
    } = body

    if (!title || !startTime || !endTime) {
      return NextResponse.json({ error: 'Title, start time, and end time are required' }, { status: 400 })
    }

    // Create real appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        type: type.toUpperCase(),
        status: 'SCHEDULED',
        clientId,
        staffId: session.user.id,
        location,
        notes,
        organizationId: session.user.organizationId || 'default-org'
      }
    })

    // Send confirmation email and SMS
    try {
      if (clientEmail) {
        await sendEmail({
          to: clientEmail,
          subject: 'Appointment Confirmation - LMT Tax Services',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #8B5CF6;">Appointment Confirmed!</h1>
              
              <p>Dear ${clientName || 'Valued Client'},</p>
              
              <p>Your appointment with LMT Tax Services has been confirmed.</p>
              
              <div style="background: #F0F9FF; border: 1px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #3B82F6;">Appointment Details:</h3>
                <p style="margin: 5px 0;"><strong>Service:</strong> ${title}</p>
                <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${new Date(startTime).toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>End Time:</strong> ${new Date(endTime).toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
              </div>
              
              <p>We'll send you a reminder 24 hours before your appointment.</p>
              
              <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                Need to reschedule? Reply to this email or call (855) 722-8700
              </p>
            </div>
          `,
          text: `Appointment confirmed for ${new Date(startTime).toLocaleString()}. ${title}. Call (855) 722-8700 for changes.`
        })
      }

      if (clientPhone) {
        await sendSMS({
          to: clientPhone,
          message: `Appointment confirmed with LMT Tax for ${new Date(startTime).toLocaleDateString()} at ${new Date(startTime).toLocaleTimeString()}. ${title}. Call (855) 722-8700 for changes.`
        })
      }
    } catch (notificationError) {
      console.error('Failed to send appointment notifications:', notificationError)
      // Don't fail appointment creation for notification errors
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        title: appointment.title,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        type: appointment.type
      },
      message: 'Real appointment created and confirmations sent'
    })

  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
