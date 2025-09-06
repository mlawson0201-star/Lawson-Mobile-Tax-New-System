
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CRMPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the functional CRM dashboard
    router.push('/crm/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading CRM Dashboard...</h2>
            <p className="text-gray-600">Redirecting to your command center...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
