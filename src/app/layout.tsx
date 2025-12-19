import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import { GoogleAnalytics } from '@/components/Analytics'
import YonNav from '@/components/YonNav'
import ClientProviders from '@/components/ClientProviders'
import '@/styles/globals.css'

// Typography System - ASKEW
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://askewstudio.vercel.app'),
  title: {
    default: 'ASKEW',
    template: '%s | ASKEW',
  },
  description: 'Twisted yet Harmonious. Structure woven in silence, beauty caught in light.',
  keywords: ['ASKEW', 'Taehyun Lee', 'fashion', 'wearable sculpture', 'experimental fashion'],
  authors: [{ name: 'Taehyun Lee' }],
  creator: 'Taehyun Lee',
  publisher: 'ASKEW',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: 'https://askewstudio.vercel.app',
    siteName: 'ASKEW',
    title: 'ASKEW',
    description: 'Twisted yet Harmonious. Structure woven in silence, beauty caught in light.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASKEW',
    description: 'Twisted yet Harmonious. Structure woven in silence, beauty caught in light.',
    creator: '@askew_studio',
  },
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
  category: 'fashion',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

// JSON-LD structured data - ASKEW
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://askewstudio.vercel.app/#website',
      url: 'https://askewstudio.vercel.app',
      name: 'ASKEW',
      description: 'Twisted yet Harmonious. Wearable sculpture by Taehyun Lee.',
      publisher: { '@id': 'https://askewstudio.vercel.app/#person' },
      inLanguage: ['en', 'ko'],
    },
    {
      '@type': 'Person',
      '@id': 'https://askewstudio.vercel.app/#person',
      name: 'Taehyun Lee',
      alternateName: '이태현',
      url: 'https://askewstudio.vercel.app',
      image: 'https://askewstudio.vercel.app/images/profile.jpg',
      jobTitle: 'Fashion Designer',
      worksFor: {
        '@type': 'Organization',
        name: 'ASKEW',
      },
      sameAs: [
        'https://instagram.com/askew_studio',
      ],
      knowsAbout: ['Fashion Design', 'Pattern Making', 'Wearable Sculpture', 'Experimental Fashion'],
    },
    {
      '@type': 'CollectionPage',
      '@id': 'https://askewstudio.vercel.app/#collections',
      url: 'https://askewstudio.vercel.app/collections',
      name: 'Collections',
      description: 'Experimental fashion collections - Wearable sculpture by ASKEW',
      isPartOf: { '@id': 'https://askewstudio.vercel.app/#website' },
    },
  ],
}

// Navigation fallback for Suspense
function NavFallback() {
  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#FAFAFA',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        height: '48px',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '48px',
        }}>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#0A0A0A',
            letterSpacing: '0.1em',
          }}>
            ASKEW
          </span>
        </div>
      </header>
      <div style={{ height: '48px' }} />
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ASKEW" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0A0A0A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} font-sans antialiased bg-yon-white text-yon-black safe-area-top safe-area-bottom`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <ClientProviders>
          <SkipToMain />
          <KeyboardNavigationIndicator />
          <Suspense fallback={<NavFallback />}>
            <YonNav />
          </Suspense>
          <main id="main-content">
            {children}
          </main>
        </ClientProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
