'use client'

import { memo, CSSProperties } from 'react'
import Image from 'next/image'
import { useSlotDebug } from '@/contexts/SlotDebugContext'

interface BackgroundSlotProps {
  slotId: string
  src?: string
  alt?: string
  blurDataURL?: string
  // Display options
  opacity?: number
  grayscale?: boolean
  sepia?: boolean
  blur?: number
  // Position & size
  objectFit?: 'cover' | 'contain' | 'fill'
  objectPosition?: string
  // Blend mode
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'
  // Custom styles
  className?: string
  style?: CSSProperties
}

/**
 * BackgroundSlot - Full page background image controlled via CMS
 *
 * Usage in page:
 * <BackgroundSlot
 *   slotId="home-background-001"
 *   src={slotImages['home-background-001']?.imageUrl}
 *   alt="Background"
 *   opacity={0.1}
 *   grayscale
 * />
 */
function BackgroundSlot({
  slotId,
  src,
  alt = 'Background',
  blurDataURL,
  opacity = 0.15,
  grayscale = false,
  sepia = false,
  blur = 0,
  objectFit = 'cover',
  objectPosition = 'center',
  blendMode = 'normal',
  className = '',
  style = {},
}: BackgroundSlotProps) {
  const { isDebugMode, setHoveredSlotId, hoveredSlotId } = useSlotDebug()
  const isHovered = hoveredSlotId === slotId

  // Build filter string
  const filters: string[] = []
  if (grayscale) filters.push('grayscale(100%)')
  if (sepia) filters.push('sepia(30%)')
  if (blur > 0) filters.push(`blur(${blur}px)`)

  const containerStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    pointerEvents: isDebugMode ? 'auto' : 'none',
    overflow: 'hidden',
    ...style,
  }

  const imageStyle: CSSProperties = {
    opacity,
    filter: filters.length > 0 ? filters.join(' ') : undefined,
    mixBlendMode: blendMode !== 'normal' ? blendMode : undefined,
    objectFit,
    objectPosition,
  }

  const handleMouseEnter = () => {
    if (isDebugMode) {
      setHoveredSlotId(slotId)
    }
  }

  const handleMouseLeave = () => {
    if (isDebugMode) {
      setHoveredSlotId(null)
    }
  }

  return (
    <div
      className={`background-slot ${className}`}
      style={containerStyle}
      data-slot-id={slotId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Debug Mode Overlay */}
      {isDebugMode && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 9999,
            background: isHovered
              ? 'rgba(0, 255, 0, 0.2)'
              : 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            border: isHovered ? '4px solid #00ff00' : '2px dashed rgba(255,255,255,0.3)',
          }}
        >
          <div
            style={{
              background: isHovered ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
              padding: '16px 24px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#00ff00',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}
            >
              BACKGROUND SLOT
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {slotId}
            </div>
            {isHovered && (
              <div
                style={{
                  marginTop: '12px',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <div>OPACITY: {opacity}</div>
                <div>GRAYSCALE: {grayscale ? 'YES' : 'NO'}</div>
                <div>BLEND: {blendMode}</div>
                {src && <div style={{ color: '#00ff00', marginTop: '4px' }}>IMAGE SET</div>}
                {!src && <div style={{ color: '#ff6b6b', marginTop: '4px' }}>NO IMAGE</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actual background image */}
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          style={imageStyle}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          priority={false}
          quality={75}
        />
      ) : (
        /* Placeholder when no image */
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.02) 100%)',
            ...imageStyle,
          }}
        />
      )}
    </div>
  )
}

export default memo(BackgroundSlot)

// Re-export helper from server-compatible location
export { getBackgroundSlotProps } from '@/lib/background-slot'
