'use client'

import { CSSProperties, ReactNode, memo } from 'react'

// ============================================
// ASKEW STICKER/LABEL TYPOGRAPHY
// "Twisted yet Harmonious" - Label Aesthetics
// Inspired by Maison Margiela's tag system
// ============================================

type StickerVariant = 'label' | 'tag' | 'stamp' | 'tape' | 'pin' | 'price' | 'archive'

interface StickerTextProps {
  children: ReactNode
  variant?: StickerVariant
  rotation?: number // -10 to 10 degrees
  color?: 'cream' | 'white' | 'accent' | 'dark' | 'transparent'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  style?: CSSProperties
  // Optional decorations
  hole?: boolean // Punch hole for tags
  torn?: boolean // Torn edge effect
  shadow?: boolean // Subtle shadow
  as?: 'span' | 'div' | 'p'
}

// Frozen variant base styles
const VARIANT_STYLES = Object.freeze<Record<StickerVariant, CSSProperties>>({
  label: {
    fontFamily: 'var(--font-mono), monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '6px 12px',
    borderRadius: '2px',
    display: 'inline-block',
  },
  tag: {
    fontFamily: 'var(--font-mono), monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    padding: '4px 16px 4px 10px',
    borderRadius: '0 2px 2px 0',
    display: 'inline-block',
    position: 'relative',
  },
  stamp: {
    fontFamily: 'var(--font-mono), monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    padding: '8px 16px',
    border: '2px solid currentColor',
    borderRadius: '0',
    display: 'inline-block',
  },
  tape: {
    fontFamily: 'var(--font-mono), monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '6px 20px',
    display: 'inline-block',
    position: 'relative',
  },
  pin: {
    fontFamily: 'var(--font-serif), Georgia, serif',
    fontStyle: 'italic',
    padding: '4px 8px',
    display: 'inline-block',
    position: 'relative',
  },
  price: {
    fontFamily: 'var(--font-mono), monospace',
    letterSpacing: '0.05em',
    padding: '4px 10px',
    borderRadius: '2px',
    display: 'inline-block',
    textDecoration: 'line-through',
    textDecorationColor: '#C41E3A',
    textDecorationThickness: '1.5px',
  },
  archive: {
    fontFamily: 'var(--font-mono), monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    padding: '6px 14px',
    display: 'inline-block',
    borderTop: '1px solid currentColor',
    borderBottom: '1px solid currentColor',
  },
})

// Frozen color styles
const COLOR_STYLES = Object.freeze<Record<string, { bg: string; text: string; border?: string }>>({
  cream: {
    bg: '#F5F0E8',
    text: '#1A1A1A',
    border: '#D4C5B5',
  },
  white: {
    bg: '#FAFAFA',
    text: '#1A1A1A',
    border: '#E0E0E0',
  },
  accent: {
    bg: 'rgba(139, 115, 85, 0.15)',
    text: '#8B7355',
    border: '#8B7355',
  },
  dark: {
    bg: '#1A1A1A',
    text: '#FAFAFA',
    border: '#0A0A0A',
  },
  transparent: {
    bg: 'transparent',
    text: '#4A4A4A',
    border: '#D4C5B5',
  },
})

// Frozen size styles
const SIZE_STYLES = Object.freeze<Record<string, CSSProperties>>({
  xs: { fontSize: '0.5rem' },
  sm: { fontSize: '0.6rem' },
  md: { fontSize: '0.7rem' },
  lg: { fontSize: '0.85rem' },
})

function StickerText({
  children,
  variant = 'label',
  rotation = 0,
  color = 'cream',
  size = 'sm',
  className = '',
  style = {},
  hole = false,
  torn = false,
  shadow = true,
  as: Component = 'span',
}: StickerTextProps) {
  const colorConfig = COLOR_STYLES[color]

  // Combined styles
  const combinedStyle: CSSProperties = {
    ...VARIANT_STYLES[variant],
    ...SIZE_STYLES[size],
    backgroundColor: colorConfig.bg,
    color: colorConfig.text,
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    boxShadow: shadow ? '0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' : undefined,
    // Tape specific background
    ...(variant === 'tape' && {
      background: `linear-gradient(90deg,
        rgba(255, 245, 200, 0.9) 0%,
        rgba(255, 250, 220, 0.85) 50%,
        rgba(255, 245, 200, 0.9) 100%)`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }),
    // Stamp specific - double border effect
    ...(variant === 'stamp' && {
      boxShadow: shadow
        ? `inset 0 0 0 2px ${colorConfig.bg}, 0 2px 4px rgba(0,0,0,0.1)`
        : `inset 0 0 0 2px ${colorConfig.bg}`,
      opacity: 0.85,
    }),
    // Torn edge clip path
    ...(torn && {
      clipPath: 'polygon(2% 0%, 98% 2%, 100% 98%, 3% 100%)',
    }),
    ...style,
  }

  return (
    <Component className={`sticker-text ${className}`} style={combinedStyle}>
      {/* Punch hole for tags */}
      {hole && variant === 'tag' && (
        <span
          style={{
            position: 'absolute',
            left: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#FAFAFA',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
      )}

      {/* Pin decoration */}
      {variant === 'pin' && (
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#C41E3A',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        />
      )}

      {children}
    </Component>
  )
}

// Memoized export
export default memo(StickerText)

// ============================================
// Pre-configured exports for common use cases
// ============================================

// Collection label - "COLLECTION 001"
export const CollectionLabel = memo(function CollectionLabel({
  number,
  rotation = -2,
}: {
  number: string | number
  rotation?: number
}) {
  return (
    <StickerText variant="label" color="cream" rotation={rotation} size="sm">
      COLLECTION {String(number).padStart(3, '0')}
    </StickerText>
  )
})

// Season tag - "2025 S/S"
export const SeasonLabel = memo(function SeasonLabel({
  season,
  year = '2025',
  rotation = 1,
}: {
  season: 'S/S' | 'A/W' | 'F/W' | 'Resort' | 'Pre-Fall'
  year?: string
  rotation?: number
}) {
  return (
    <StickerText variant="tag" color="white" rotation={rotation} size="xs" hole>
      {year} {season}
    </StickerText>
  )
})

// Archive stamp - "ARCHIVED"
export const ArchiveStamp = memo(function ArchiveStamp({
  text = 'ARCHIVED',
  rotation = -3,
}: {
  text?: string
  rotation?: number
}) {
  return (
    <StickerText variant="stamp" color="accent" rotation={rotation} size="sm">
      {text}
    </StickerText>
  )
})

// Process note tape - handwritten feel
export const TapeNote = memo(function TapeNote({
  children,
  rotation = 2,
}: {
  children: ReactNode
  rotation?: number
}) {
  return (
    <StickerText variant="tape" rotation={rotation} size="sm">
      {children}
    </StickerText>
  )
})

// Margiela-style number tag - "01/04"
export const MargielaTag = memo(function MargielaTag({
  current,
  total,
  rotation = -1,
}: {
  current: number
  total: number
  rotation?: number
}) {
  return (
    <StickerText variant="archive" color="transparent" rotation={rotation} size="xs">
      {String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}
    </StickerText>
  )
})

// Status label - "IN PROGRESS" / "COMPLETE"
export const StatusLabel = memo(function StatusLabel({
  status,
  rotation = 0,
}: {
  status: 'in_progress' | 'complete' | 'testing' | 'paused' | 'rejected'
  rotation?: number
}) {
  const statusConfig = {
    in_progress: { text: 'IN PROGRESS', color: 'accent' as const },
    complete: { text: 'COMPLETE', color: 'dark' as const },
    testing: { text: 'TESTING', color: 'cream' as const },
    paused: { text: 'PAUSED', color: 'transparent' as const },
    rejected: { text: 'REJECTED', color: 'accent' as const },
  }

  const config = statusConfig[status]

  return (
    <StickerText variant="label" color={config.color} rotation={rotation} size="xs">
      {config.text}
    </StickerText>
  )
})

// Pinned note - handwritten style
export const PinnedNote = memo(function PinnedNote({
  children,
  rotation = 3,
}: {
  children: ReactNode
  rotation?: number
}) {
  return (
    <StickerText variant="pin" color="white" rotation={rotation} size="md" shadow>
      {children}
    </StickerText>
  )
})
