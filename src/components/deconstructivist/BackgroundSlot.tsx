'use client'

import { memo } from 'react'
import { useSlotDebug } from '@/contexts/SlotDebugContext'

interface BackgroundSlotProps {
  // Slot identification (for debug mode)
  slotId?: string
  // Image props from CMS
  src?: string
  alt?: string
  label?: string
  blurDataURL?: string
  // Style options
  opacity?: number // 0.02 to 0.3 recommended
  blend?: 'multiply' | 'overlay' | 'soft-light' | 'normal'
  grayscale?: boolean
  sepia?: boolean
  blur?: number
  // Position
  position?: 'fixed' | 'absolute'
  zIndex?: number
}

/**
 * BackgroundSlot - Full-screen background image from CMS
 *
 * Features:
 * - z-index: 0 (behind all content)
 * - position: fixed (stays in place on scroll)
 * - Full viewport coverage with object-cover
 * - Low opacity (default 0.03) for subtle effect
 * - Falls back to transparent if no image
 * - Debug mode shows slot ID with ?debug=slots
 *
 * Usage:
 * <BackgroundSlot {...slot('home-background-001', 'BACKGROUND')} opacity={0.05} />
 */
const BackgroundSlot = memo(function BackgroundSlot({
  slotId,
  src,
  alt = 'Background',
  blurDataURL,
  opacity = 0.03,
  blend = 'normal',
  grayscale = true,
  sepia = false,
  blur = 0,
  position = 'fixed',
  zIndex = 0,
}: BackgroundSlotProps) {
  const { isDebugMode, hoveredSlot, setHoveredSlot } = useSlotDebug()

  // If no image, render nothing (transparent background)
  if (!src) {
    // In debug mode, still show placeholder for empty slot
    if (isDebugMode && slotId) {
      return (
        <div
          className="pointer-events-none"
          style={{
            position,
            inset: 0,
            zIndex,
          }}
        >
          {/* Debug overlay for empty slot */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.1)',
              border: '2px dashed rgba(255, 100, 100, 0.5)',
            }}
            onMouseEnter={() => setHoveredSlot(slotId)}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            <div
              className="bg-red-500 text-white px-3 py-1.5 font-mono text-sm rounded"
              style={{ fontSize: '0.75rem' }}
            >
              {slotId} (empty)
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // Build filter string
  const filters: string[] = []
  if (grayscale) filters.push('grayscale(1)')
  if (sepia) filters.push('sepia(0.3)')
  if (blur > 0) filters.push(`blur(${blur}px)`)

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position,
        inset: 0,
        zIndex,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity,
          filter: filters.length > 0 ? filters.join(' ') : undefined,
          mixBlendMode: blend,
        }}
        loading="lazy"
        decoding="async"
      />

      {/* Low quality placeholder for progressive loading */}
      {blurDataURL && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: opacity * 0.5,
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      )}

      {/* Debug overlay */}
      {isDebugMode && slotId && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
          style={{
            backgroundColor: hoveredSlot === slotId ? 'rgba(0, 150, 255, 0.15)' : 'rgba(0, 150, 255, 0.05)',
            border: '2px solid rgba(0, 150, 255, 0.3)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={() => setHoveredSlot(slotId)}
          onMouseLeave={() => setHoveredSlot(null)}
          onClick={() => {
            // Navigate to Sanity Studio - opens slotImage list
            const studioUrl = `/studio/structure/slotImage`
            // Copy slotId to clipboard for easy search
            navigator.clipboard?.writeText(slotId).catch(() => {})
            window.open(studioUrl, '_blank')
          }}
        >
          <div
            className="bg-blue-600 text-white px-4 py-2 font-mono rounded shadow-lg"
            style={{ fontSize: '0.875rem' }}
          >
            <div className="font-bold">{slotId}</div>
            <div className="text-xs opacity-80 mt-1">
              Background Slot | opacity: {opacity}
            </div>
            <div className="text-xs mt-2" style={{ color: '#4ADE80' }}>
              CLICK → Studio (ID copied)
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default BackgroundSlot
