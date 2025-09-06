
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function LogoTest() {
  const [loadErrors, setLoadErrors] = useState<string[]>([])
  const [loadSuccesses, setLoadSuccesses] = useState<string[]>([])

  const handleError = (logo: string) => {
    setLoadErrors(prev => [...prev, logo])
  }

  const handleSuccess = (logo: string) => {
    setLoadSuccesses(prev => [...prev, logo])
  }

  const logos = [
    { name: '32px Logo', src: '/lmt-logo-32.png', size: 32 },
    { name: '64px Logo', src: '/lmt-logo-64.png', size: 64 },
    { name: '128px Logo', src: '/lmt-logo-128.png', size: 128 },
    { name: 'Optimized Logo', src: '/lmt-logo-optimized.png', size: 64 },
    { name: 'Original Logo', src: '/lmt-logo.png', size: 64 }
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto m-8">
      <CardHeader>
        <CardTitle>Logo Loading Test - LMT Diagnostic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {logos.map((logo) => (
            <div key={logo.name} className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 mb-2 flex items-center justify-center h-24">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.size}
                  height={logo.size}
                  className="max-h-full max-w-full object-contain"
                  onError={() => handleError(logo.name)}
                  onLoad={() => handleSuccess(logo.name)}
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold">{logo.name}</p>
                <p className="text-gray-600">{logo.src}</p>
                <p className={`text-xs mt-1 ${
                  loadErrors.includes(logo.name) ? 'text-red-600' : 
                  loadSuccesses.includes(logo.name) ? 'text-green-600' : 
                  'text-yellow-600'
                }`}>
                  {loadErrors.includes(logo.name) ? '❌ Failed' : 
                   loadSuccesses.includes(logo.name) ? '✅ Loaded' : 
                   '⏳ Loading...'}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-600 mb-2">✅ Successfully Loaded:</h4>
            <ul className="text-sm text-gray-600">
              {loadSuccesses.length > 0 ? (
                loadSuccesses.map(logo => <li key={logo}>• {logo}</li>)
              ) : (
                <li className="text-gray-400">None yet...</li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-600 mb-2">❌ Failed to Load:</h4>
            <ul className="text-sm text-gray-600">
              {loadErrors.length > 0 ? (
                loadErrors.map(logo => <li key={logo}>• {logo}</li>)
              ) : (
                <li className="text-green-400">None! All logos working 🎉</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 How to Use This Test:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• All logos should show the LMT logo image</li>
            <li>• Check that all show "✅ Loaded" status</li>
            <li>• If any show "❌ Failed", there may be a file path issue</li>
            <li>• The optimized versions should load faster than the original</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
