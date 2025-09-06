
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TrainingHomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to training dashboard
    router.replace('/training/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your training dashboard...</p>
      </div>
    </div>
  )
}
