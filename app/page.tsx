
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  if (session?.user?.role) {
    // Redirect based on user role
    switch (session.user.role) {
      case 'CLIENT':
        redirect('/client/dashboard')
      case 'SUPER_ADMIN':
      case 'ADMIN':
        redirect('/admin/dashboard')
      case 'STAFF':
      default:
        redirect('/dashboard')
    }
  }
  
  // Show welcoming landing page for unauthenticated users
  redirect('/welcome')
}
