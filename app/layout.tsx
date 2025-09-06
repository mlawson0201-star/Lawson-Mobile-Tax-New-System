

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import MainNavigation from '@/components/main-navigation'
import { Toaster } from '@/components/ui/sonner'
import { MelikaAIGlobalWrapper } from '@/components/melika-ai-global-wrapper'
import PWAInstallPrompt from '@/components/pwa-install-prompt'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
  colorScheme: 'light',
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://lawsonmobiletax.com'),
  title: {
    default: 'LMT - Lawson Mobile Tax - Your Personal Tax Team That Actually Cares',
    template: '%s | LMT - Lawson Mobile Tax'
  },
  description: 'Advanced tax preparation and business services with AI-powered automation, real-time analytics, and mobile-first features. Experience the future of tax services with LMT.',
  keywords: [
    'tax preparation', 
    'mobile tax service', 
    'professional tax preparer', 
    'business tax', 
    'individual tax returns', 
    'lawson mobile tax',
    'AI tax assistant',
    'CRM tax system',
    'mobile receipt capture',
    'tax analytics'
  ],
  authors: [{ name: 'LMT - Lawson Mobile Tax' }],
  creator: 'LMT - Lawson Mobile Tax',
  publisher: 'LMT - Lawson Mobile Tax',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lawsonmobiletax.com',
    siteName: 'LMT - Lawson Mobile Tax',
    title: 'LMT - Lawson Mobile Tax - Your Personal Tax Team That Actually Cares',
    description: 'Advanced tax preparation and business services with AI-powered automation, real-time analytics, and mobile-first features.',
    images: [
      {
        url: '/lmt-logo-optimized.png',
        width: 1200,
        height: 630,
        alt: 'LMT - Lawson Mobile Tax Logo',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LawsonMobileTax',
    creator: '@LawsonMobileTax',
    title: 'LMT - Lawson Mobile Tax - Your Personal Tax Team That Actually Cares',
    description: 'Advanced tax preparation and business services with AI-powered automation, real-time analytics, and mobile-first features.',
    images: ['/lmt-logo-optimized.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/lmt-logo-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/lmt-logo-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/lmt-logo-128.png', sizes: '128x128', type: 'image/png' }
    ],
    apple: [
      { url: '/lmt-logo-128.png', sizes: '128x128', type: 'image/png' }
    ],
    shortcut: '/lmt-logo-64.png'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LMT Tax',
    startupImage: [
      {
        url: '/lmt-logo-optimized.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
      }
    ]
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'facebook-domain-verification': 'your-facebook-verification-code'
    }
  },
  category: 'finance',
  classification: 'business'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="LMT Tax" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LMT Tax" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#8B5CF6" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered with scope: ', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('SW registration failed: ', error);
                    });
                });
              }
            `,
          }}
        />
      </head>
      
      <body className="min-h-screen bg-background">
        <Providers>
          {/* Enhanced Navigation */}
          <MainNavigation />
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Global AI Assistant */}
          <MelikaAIGlobalWrapper />
          
          {/* PWA Install Prompt */}
          <PWAInstallPrompt />
          
          {/* Toast Notifications */}
          <Toaster 
            position="top-right" 
            expand={true}
            richColors
            closeButton
            toastOptions={{
              duration: 5000,
              style: {
                background: 'white',
                color: 'black',
                border: '1px solid #e5e7eb'
              }
            }}
          />
          

        </Providers>
      </body>
    </html>
  )
}
