'use client'

import { memo, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { SlotDebugProvider } from '@/contexts/SlotDebugContext'

// Dynamic imports with proper loading states
const LenisProvider = dynamic(() => import('@/hooks/useLenis'), {
  ssr: false,
})
const LightboxProvider = dynamic(() => import('@/components/ImageLightbox'), {
  ssr: false,
})

// UI components - can load lazily
const BackToTop = dynamic(() => import('@/components/BackToTop'), {
  ssr: false,
})
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
  ssr: false,
})

const ClientProviders = memo(function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SlotDebugProvider>
        <LenisProvider>
          <LightboxProvider>
            <ScrollProgress />
            {children}
            <BackToTop />
          </LightboxProvider>
        </LenisProvider>
      </SlotDebugProvider>
    </Suspense>
  )
})

export default ClientProviders
