'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

// Clean navigation structure - no seasons, no sub-items
const NAV_ITEMS = [
  { href: '/collections', label: 'Collections', num: '01' },
  { href: '/lab', label: 'Lab', num: '02' },
  { href: '/archive', label: 'Archive', num: '03' },
  { href: '/about', label: 'About', num: '04' },
  { href: '/contact', label: 'Contact', num: '05' },
] as const

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isDebugMode = searchParams.get('debug') === 'slots'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // SSR guard
  if (!isMounted) {
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

  return (
    <>
      {/* Minimal Navigation Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: scrolled ? 'rgba(250,250,250,0.97)' : '#FAFAFA',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            height: '48px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                fontWeight: 400,
                color: '#0A0A0A',
                letterSpacing: '0.1em',
              }}
            >
              THE YON
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    fontWeight: 400,
                    color: isActive ? '#0A0A0A' : '#6A6A6A',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#0A0A0A'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#6A6A6A'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: '#0A0A0A',
                      }}
                    />
                  )}
                </Link>
              )
            })}

          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              style={{
                display: 'block',
                width: '20px',
                height: '1.5px',
                backgroundColor: '#0A0A0A',
                transition: 'all 0.3s ease',
                transform: isOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '20px',
                height: '1.5px',
                backgroundColor: '#0A0A0A',
                marginTop: isOpen ? '-1.5px' : '5px',
                transition: 'all 0.3s ease',
                transform: isOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: '48px' }} />

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '48px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            backgroundColor: '#FAFAFA',
            overflowY: 'auto',
          }}
        >
          <nav style={{ padding: '32px' }}>
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                color: pathname === '/' ? '#0A0A0A' : '#7A7A7A',
                textDecoration: 'none',
                padding: '16px 0',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: '#8B7355',
                opacity: 0.6,
              }}>00</span>
              Home
            </Link>

            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '28px',
                    color: isActive ? '#0A0A0A' : '#7A7A7A',
                    textDecoration: 'none',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    position: 'relative',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    color: '#8B7355',
                    opacity: 0.6,
                  }}>{item.num}</span>
                  {item.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      right: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '14px',
                      color: '#8B7355',
                    }}>→</span>
                  )}
                </Link>
              )
            })}

            {/* CMS & DEBUG Links - Mobile */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(0,0,0,0.1)',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <Link
                href="/studio"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#8B7355',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '10px 18px',
                  border: '1px solid rgba(139,115,85,0.4)',
                  borderRadius: '2px',
                }}
              >
                CMS Studio →
              </Link>
              <Link
                href={isDebugMode ? pathname : `${pathname}?debug=slots`}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: isDebugMode ? '#22C55E' : '#6A6A6A',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '10px 18px',
                  border: isDebugMode ? '1px solid #22C55E' : '1px solid rgba(106,106,106,0.4)',
                  borderRadius: '2px',
                  backgroundColor: isDebugMode ? 'rgba(34,197,94,0.1)' : 'transparent',
                }}
              >
                {isDebugMode ? '🟢 DEBUG ON' : 'DEBUG MODE'}
              </Link>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '9px',
              color: '#7A7A7A',
              marginTop: '10px',
            }}>
              Manage images and content
            </p>

            {/* Footer */}
            <div style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '9px',
                color: '#7A7A7A',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}>
                Experimental Fashion Portfolio
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '13px',
                color: '#4A4A4A',
                marginTop: '10px',
              }}>
                By Taehyun Lee
              </p>
            </div>
          </nav>
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx global>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-menu-btn {
          display: none !important;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
