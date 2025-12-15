'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { useSlotDebug } from '@/contexts/SlotDebugContext'

interface ScrollingBackgroundSlotProps {
  // Slot identification
  slotId?: string
  // Image props from CMS
  src?: string
  alt?: string
  label?: string
  blurDataURL?: string
  // Style options
  opacity?: number
  blend?: 'multiply' | 'overlay' | 'soft-light' | 'normal'
  grayscale?: boolean
  sepia?: boolean
  // Scroll behavior
  scrollSpeed?: number // 0.5 = 절반 속도, 1 = 동일 속도, 2 = 두배 속도
  // Position
  zIndex?: number
}

/**
 * ScrollingBackgroundSlot - 스크롤에 따라 이미지가 흘러가는 배경
 *
 * 기존 BackgroundSlot과 달리:
 * - 세로로 긴 이미지를 넣으면 스크롤에 따라 위에서 아래로 감상
 * - 마치 긴 두루마리 그림을 스크롤하면서 보는 느낌
 * - 패럴랙스와 다르게, 이미지 자체가 페이지와 함께 스크롤
 *
 * Usage:
 * <ScrollingBackgroundSlot
 *   {...slot('home-background-001', 'SCROLLING BG')}
 *   scrollSpeed={0.7}
 *   opacity={0.05}
 * />
 */
const ScrollingBackgroundSlot = memo(function ScrollingBackgroundSlot({
  slotId,
  src,
  alt = 'Background',
  blurDataURL,
  opacity = 0.04,
  blend = 'normal',
  grayscale = true,
  sepia = false,
  scrollSpeed = 0.5,
  zIndex = 0,
}: ScrollingBackgroundSlotProps) {
  const { isDebugMode, hoveredSlotId, setHoveredSlotId } = useSlotDebug()
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageHeight, setImageHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // 이미지 로드 후 높이 측정
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setImageHeight(imageRef.current.naturalHeight)
    }
  }, [src])

  // 스크롤 이벤트 핸들링
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY)
      }
    }

    // 초기 값 설정
    handleScroll()

    // 스크롤 이벤트 리스너 (passive로 성능 최적화)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 페이지 전체 높이 대비 현재 스크롤 위치 비율
  const getScrollProgress = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 0
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    if (documentHeight <= 0) return 0
    return Math.min(1, Math.max(0, scrollY / documentHeight))
  }

  // 이미지 translateY 계산
  const getImageTranslateY = () => {
    const progress = getScrollProgress()
    // 이미지가 뷰포트보다 높을 때, 스크롤에 따라 이미지의 다른 부분을 보여줌
    // scrollSpeed로 속도 조절
    const maxTranslate = imageHeight > 0 ? -(imageHeight - (typeof window !== 'undefined' ? window.innerHeight : 1000)) : 0
    return maxTranslate * progress * scrollSpeed
  }

  // 이미지가 없으면 렌더링하지 않음
  if (!src) {
    if (isDebugMode && slotId) {
      return (
        <div
          className="pointer-events-none"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.1)',
              border: '2px dashed rgba(255, 100, 100, 0.5)',
            }}
            onMouseEnter={() => setHoveredSlotId(slotId)}
            onMouseLeave={() => setHoveredSlotId(null)}
          >
            <div
              className="bg-red-500 text-white px-3 py-1.5 font-mono text-sm rounded"
              style={{ fontSize: '0.75rem' }}
            >
              {slotId} (scrolling bg - empty)
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // 필터 빌드
  const filters: string[] = []
  if (grayscale) filters.push('grayscale(1)')
  if (sepia) filters.push('sepia(0.2)')
  // 필름 효과 추가
  filters.push('saturate(0.75)')
  filters.push('contrast(1.05)')

  return (
    <div
      ref={containerRef}
      className="scrolling-background pointer-events-none select-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        overflow: 'hidden',
      }}
      aria-hidden="true"
      data-slot-type="background"
    >
      {/* 스크롤링 배경 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => {
          if (imageRef.current) {
            setImageHeight(imageRef.current.naturalHeight)
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          minHeight: '120vh', // 최소 높이
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity,
          filter: filters.length > 0 ? filters.join(' ') : undefined,
          mixBlendMode: blend,
          transform: `translateY(${getImageTranslateY()}px)`,
          willChange: 'transform',
          transition: 'transform 0.1s linear', // 부드러운 스크롤
        }}
        loading="eager" // 배경은 즉시 로드
        decoding="async"
      />

      {/* 그레인 텍스처 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: 'overlay',
        }}
      />

      {/* 저품질 플레이스홀더 */}
      {blurDataURL && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: opacity * 0.3,
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      )}

      {/* 디버그 오버레이 */}
      {isDebugMode && slotId && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
          style={{
            backgroundColor: hoveredSlotId === slotId ? 'rgba(100, 200, 100, 0.15)' : 'rgba(100, 200, 100, 0.05)',
            border: '2px solid rgba(100, 200, 100, 0.3)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={() => setHoveredSlotId(slotId)}
          onMouseLeave={() => setHoveredSlotId(null)}
          onClick={() => {
            const studioUrl = `/studio/structure/slotImage`
            navigator.clipboard?.writeText(slotId).catch(() => {})
            window.open(studioUrl, '_blank')
          }}
        >
          <div
            className="bg-green-600 text-white px-4 py-2 font-mono rounded shadow-lg"
            style={{ fontSize: '0.875rem' }}
          >
            <div className="font-bold">{slotId}</div>
            <div className="text-xs opacity-80 mt-1">
              Scrolling Background | opacity: {opacity} | speed: {scrollSpeed}
            </div>
            <div className="text-xs mt-1">
              Scroll: {Math.round(getScrollProgress() * 100)}%
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

export default ScrollingBackgroundSlot
