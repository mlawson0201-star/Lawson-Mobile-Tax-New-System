
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardStats } from '@/components/dashboard-stats'
import { RecentActivity } from '@/components/recent-activity'
import { QuickActions } from '@/components/quick-actions'
import { PipelineOverview } from '@/components/pipeline-overview'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your tax service bureau today.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Pipeline overview */}
        <div className="lg:col-span-2 space-y-8">
          <PipelineOverview />
          <RecentActivity />
        </div>

        {/* Right column - Quick actions */}
        <div className="space-y-8">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
