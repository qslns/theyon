'use client'

import { CSSProperties, memo } from 'react'

/**
 * DecoElements - 페이지를 풍성하게 채우는 장식 요소들
 *
 * ASKEW의 "Twisted yet Harmonious" 철학에 맞는 장식 요소들:
 * - 타이포그래피: 워터마크, 숫자, 라벨
 * - 선: 수평선, 수직선, 대각선
 * - 점: 장식용 점, 십자가
 * - 브래킷, 따옴표 등
 */

// ============================================
// 워터마크 타이포그래피
// ============================================

interface WatermarkProps {
  text: string
  position?: 'left' | 'right' | 'center'
  rotation?: number
  opacity?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  accent?: boolean
  className?: string
  style?: CSSProperties
}

export const Watermark = memo(function Watermark({
  text,
  position = 'left',
  rotation = 0,
  opacity = 0.025,
  size = 'lg',
  accent = false,
  className = '',
  style = {},
}: WatermarkProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { fontSize: 'clamp(3rem, 8vw, 8rem)' },
    md: { fontSize: 'clamp(5rem, 12vw, 12rem)' },
    lg: { fontSize: 'clamp(6rem, 15vw, 18rem)' },
    xl: { fontSize: 'clamp(8rem, 20vw, 24rem)' },
  }

  const positionStyles: Record<string, CSSProperties> = {
    left: { left: '-5%', textAlign: 'left' },
    right: { right: '-5%', textAlign: 'right' },
    center: { left: '50%', transform: `translateX(-50%) rotate(${rotation}deg)` },
  }

  return (
    <div
      className={`${accent ? 'watermark-accent' : 'watermark'} ${className}`}
      style={{
        position: 'absolute',
        fontFamily: 'var(--font-serif)',
        fontWeight: 200,
        lineHeight: 0.85,
        letterSpacing: '-0.05em',
        color: accent ? 'var(--yon-accent)' : 'var(--yon-grey)',
        opacity: accent ? 0.04 : opacity,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
        ...positionStyles[position],
        ...(position !== 'center' && rotation !== 0 ? { transform: `rotate(${rotation}deg)` } : {}),
        ...style,
      }}
    >
      {text}
    </div>
  )
})

// ============================================
// 섹션 넘버 (Margiela 스타일)
// ============================================

interface SectionNumberProps {
  number: string | number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  variant?: 'circle' | 'plain' | 'bracket'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: CSSProperties
}

export const SectionNumber = memo(function SectionNumber({
  number,
  position = 'top-left',
  variant = 'plain',
  size = 'md',
  className = '',
  style = {},
}: SectionNumberProps) {
  const positionStyles: Record<string, CSSProperties> = {
    'top-left': { top: '2rem', left: '2rem' },
    'top-right': { top: '2rem', right: '2rem' },
    'bottom-left': { bottom: '2rem', left: '2rem' },
    'bottom-right': { bottom: '2rem', right: '2rem' },
  }

  const sizeStyles: Record<string, CSSProperties> = {
    sm: { fontSize: '8px', letterSpacing: '0.3em' },
    md: { fontSize: '10px', letterSpacing: '0.25em' },
    lg: { fontSize: '12px', letterSpacing: '0.2em' },
  }

  const formattedNumber = typeof number === 'number'
    ? String(number).padStart(2, '0')
    : number

  if (variant === 'circle') {
    return (
      <div
        className={`badge-number ${className}`}
        style={{
          position: 'absolute',
          ...positionStyles[position],
          ...style,
        }}
      >
        {formattedNumber}
      </div>
    )
  }

  if (variant === 'bracket') {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-mono)',
          color: 'var(--yon-grey)',
          opacity: 0.4,
          ...positionStyles[position],
          ...sizeStyles[size],
          ...style,
        }}
      >
        [{formattedNumber}]
      </div>
    )
  }

  return (
    <div
      className={`text-number-tag ${className}`}
      style={{
        position: 'absolute',
        fontFamily: 'var(--font-mono)',
        color: 'var(--yon-grey)',
        opacity: 0.3,
        textTransform: 'uppercase',
        ...positionStyles[position],
        ...sizeStyles[size],
        ...style,
      }}
    >
      {formattedNumber}
    </div>
  )
})

// ============================================
// 장식용 선
// ============================================

interface DecoLineProps {
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  length?: string
  thickness?: number
  color?: string
  gradient?: boolean
  position?: 'relative' | 'absolute'
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotation?: number
  className?: string
  style?: CSSProperties
}

export const DecoLine = memo(function DecoLine({
  direction = 'horizontal',
  length = '60px',
  thickness = 1,
  color = 'var(--yon-accent)',
  gradient = true,
  position = 'relative',
  top,
  left,
  right,
  bottom,
  rotation = 0,
  className = '',
  style = {},
}: DecoLineProps) {
  const isHorizontal = direction === 'horizontal'
  const isVertical = direction === 'vertical'

  return (
    <div
      className={className}
      style={{
        position,
        ...(top && { top }),
        ...(left && { left }),
        ...(right && { right }),
        ...(bottom && { bottom }),
        width: isHorizontal || direction === 'diagonal' ? length : `${thickness}px`,
        height: isVertical || direction === 'diagonal' ? length : `${thickness}px`,
        background: gradient
          ? `linear-gradient(${isVertical ? '180deg' : '90deg'}, ${color}, transparent)`
          : color,
        transform: rotation !== 0 || direction === 'diagonal'
          ? `rotate(${direction === 'diagonal' ? -45 : rotation}deg)`
          : undefined,
        transformOrigin: 'left center',
        ...style,
      }}
    />
  )
})

// ============================================
// 장식용 점 그룹
// ============================================

interface DotsPatternProps {
  count?: number
  size?: number
  gap?: number
  direction?: 'horizontal' | 'vertical'
  color?: string
  opacity?: number
  className?: string
  style?: CSSProperties
}

export const DotsPattern = memo(function DotsPattern({
  count = 3,
  size = 4,
  gap = 8,
  direction = 'horizontal',
  color = 'var(--yon-accent)',
  opacity = 0.5,
  className = '',
  style = {},
}: DotsPatternProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: `${gap}px`,
        ...style,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: color,
            opacity,
          }}
        />
      ))}
    </div>
  )
})

// ============================================
// 십자가 마커
// ============================================

interface CrossMarkerProps {
  size?: number
  thickness?: number
  color?: string
  opacity?: number
  rotation?: number
  className?: string
  style?: CSSProperties
}

export const CrossMarker = memo(function CrossMarker({
  size = 12,
  thickness = 1,
  color = 'var(--yon-grey)',
  opacity = 0.4,
  rotation = 0,
  className = '',
  style = {},
}: CrossMarkerProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
        ...style,
      }}
    >
      {/* 가로 선 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: `${thickness}px`,
          background: color,
          opacity,
          transform: 'translateY(-50%)',
        }}
      />
      {/* 세로 선 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: `${thickness}px`,
          height: '100%',
          background: color,
          opacity,
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  )
})

// ============================================
// 브래킷/따옴표 장식
// ============================================

interface BracketDecoProps {
  type?: 'square' | 'angle' | 'quote'
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
  style?: CSSProperties
}

export const BracketDeco = memo(function BracketDeco({
  type = 'square',
  children,
  size = 'md',
  color = 'var(--yon-grey)',
  className = '',
  style = {},
}: BracketDecoProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { fontSize: '1.5em' },
    md: { fontSize: '2em' },
    lg: { fontSize: '3em' },
  }

  const brackets: Record<string, [string, string]> = {
    square: ['[', ']'],
    angle: ['〈', '〉'],
    quote: ['"', '"'],
  }

  const [open, close] = brackets[type]

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3em',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          color,
          opacity: 0.3,
          ...sizeStyles[size],
        }}
      >
        {open}
      </span>
      {children}
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          color,
          opacity: 0.3,
          ...sizeStyles[size],
        }}
      >
        {close}
      </span>
    </span>
  )
})

// ============================================
// 컬렉션/시즌 태그
// ============================================

interface SeasonTagProps {
  season: string
  year?: string | number
  variant?: 'outline' | 'filled' | 'minimal'
  className?: string
  style?: CSSProperties
}

export const SeasonTag = memo(function SeasonTag({
  season,
  year,
  variant = 'outline',
  className = '',
  style = {},
}: SeasonTagProps) {
  const variantStyles: Record<string, CSSProperties> = {
    outline: {
      padding: '4px 8px',
      border: '1px solid var(--yon-platinum)',
      background: 'var(--yon-white)',
    },
    filled: {
      padding: '3px 6px',
      background: 'var(--yon-black)',
      color: 'var(--yon-white)',
    },
    minimal: {
      padding: 0,
      background: 'transparent',
    },
  }

  return (
    <span
      className={`tag-season ${className}`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: variant === 'filled' ? 'var(--yon-white)' : 'var(--yon-grey)',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
    >
      {season}{year ? ` ${year}` : ''}
    </span>
  )
})

// ============================================
// 수직 텍스트 (회전된)
// ============================================

interface VerticalTextProps {
  text: string
  direction?: 'up' | 'down'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  opacity?: number
  className?: string
  style?: CSSProperties
}

export const VerticalText = memo(function VerticalText({
  text,
  direction = 'up',
  size = 'sm',
  color = 'var(--yon-grey)',
  opacity = 0.5,
  className = '',
  style = {},
}: VerticalTextProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { fontSize: '9px', letterSpacing: '0.15em' },
    md: { fontSize: '11px', letterSpacing: '0.12em' },
    lg: { fontSize: '13px', letterSpacing: '0.1em' },
  }

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        color,
        opacity,
        whiteSpace: 'nowrap',
        transform: direction === 'up' ? 'rotate(-90deg)' : 'rotate(90deg)',
        transformOrigin: direction === 'up' ? 'left center' : 'right center',
        ...sizeStyles[size],
        ...style,
      }}
    >
      {text}
    </span>
  )
})

// ============================================
// 그리드 패턴 오버레이
// ============================================

interface GridPatternProps {
  cellSize?: number
  lineWidth?: number
  color?: string
  opacity?: number
  className?: string
  style?: CSSProperties
}

export const GridPattern = memo(function GridPattern({
  cellSize = 50,
  lineWidth = 1,
  color = 'var(--yon-platinum)',
  opacity = 0.3,
  className = '',
  style = {},
}: GridPatternProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${color} ${lineWidth}px, transparent ${lineWidth}px),
          linear-gradient(90deg, ${color} ${lineWidth}px, transparent ${lineWidth}px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
        ...style,
      }}
    />
  )
})

// ============================================
// 노이즈 텍스처 오버레이
// ============================================

interface NoiseOverlayProps {
  opacity?: number
  blendMode?: 'overlay' | 'multiply' | 'soft-light'
  className?: string
  style?: CSSProperties
}

export const NoiseOverlay = memo(function NoiseOverlay({
  opacity = 0.03,
  blendMode = 'overlay',
  className = '',
  style = {},
}: NoiseOverlayProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
        mixBlendMode: blendMode,
        ...style,
      }}
    />
  )
})

// ============================================
// 장식용 구분선
// ============================================

interface DecoDividerProps {
  variant?: 'minimal' | 'asymmetric' | 'numbered'
  number?: string | number
  width?: string
  className?: string
  style?: CSSProperties
}

export const DecoDivider = memo(function DecoDivider({
  variant = 'minimal',
  number,
  width = '100%',
  className = '',
  style = {},
}: DecoDividerProps) {
  if (variant === 'numbered' && number) {
    return (
      <div
        className={`divider-numbered ${className}`}
        data-section={typeof number === 'number' ? String(number).padStart(2, '0') : number}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          width,
          ...style,
        }}
      />
    )
  }

  return (
    <div
      className={variant === 'asymmetric' ? 'divider-asymmetric' : 'divider-minimal'}
      style={{
        width,
        height: '1px',
        ...style,
      }}
    />
  )
})
