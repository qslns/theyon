'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Navigation items in alphabetical order for readability
const NAV_ITEMS = [
  { href: '/about', label: 'About' },
  { href: '/archive', label: 'Archive' },
  { href: '/collections', label: 'Collections' },
  { href: '/contact', label: 'Contact' },
  { href: '/lab', label: 'Lab' },
] as const

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

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
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          height: '56px',
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            height: '56px',
          }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#0A0A0A',
              letterSpacing: '0.15em',
              transform: 'rotate(-1deg)',
              display: 'inline-block',
            }}>
              ASKEW
            </span>
          </div>
        </header>
        <div style={{ height: '56px' }} />
      </>
    )
  }

  return (
    <>
      {/* Experimental Navigation Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: scrolled ? 'rgba(250,250,250,0.95)' : '#FAFAFA',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.04)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
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
            height: '56px',
          }}
        >
          {/* Logo - Twisted */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              position: 'relative',
            }}
          >
            {/* Small number tag */}
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                color: '#8B7355',
                opacity: 0.5,
                transform: 'rotate(-90deg) translateX(-4px)',
                display: 'inline-block',
              }}
            >
              00
            </span>
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                fontWeight: 400,
                color: '#0A0A0A',
                letterSpacing: '0.15em',
                transform: 'rotate(-1deg)',
                display: 'inline-block',
                transition: 'transform 0.3s ease',
              }}
              className="nav-logo"
            >
              ASKEW
            </span>
            {/* Decorative slash */}
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                color: 'rgba(139,115,85,0.3)',
                marginLeft: '4px',
              }}
            >
              /
            </span>
          </Link>

          {/* Desktop Navigation - Deconstructivist Layout */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {/* Opening bracket */}
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '14px',
              color: 'rgba(139,115,85,0.25)',
              marginRight: '4px',
              transform: 'rotate(-8deg) translateY(-2px)',
              display: 'inline-block',
            }}>[</span>

            {NAV_ITEMS.map((item, idx) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href)

              // Asymmetric styling per item
              const styles = [
                { rotation: -2, size: '9px', spacing: '0.08em', weight: 400 },
                { rotation: 1.5, size: '8px', spacing: '0.15em', weight: 500 },
                { rotation: -1, size: '10px', spacing: '0.05em', weight: 300 },
                { rotation: 2, size: '8px', spacing: '0.12em', weight: 400 },
                { rotation: -1.5, size: '9px', spacing: '0.1em', weight: 500 },
              ][idx]

              return (
                <div key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: styles.size,
                      fontWeight: styles.weight,
                      color: isActive ? '#0A0A0A' : '#6A6A6A',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: styles.spacing,
                      position: 'relative',
                      padding: '6px 8px',
                      transform: `rotate(${styles.rotation}deg)`,
                      display: 'inline-block',
                      borderBottom: isActive ? '1.5px solid #8B7355' : 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                  {/* Decorative separator between items */}
                  {idx < NAV_ITEMS.length - 1 && (
                    <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '8px',
                      color: 'rgba(0,0,0,0.15)',
                      margin: '0 2px',
                      transform: `rotate(${idx % 2 === 0 ? 15 : -15}deg)`,
                      display: 'inline-block',
                    }}>/</span>
                  )}
                </div>
              )
            })}

            {/* Closing bracket */}
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '14px',
              color: 'rgba(139,115,85,0.25)',
              marginLeft: '4px',
              transform: 'rotate(8deg) translateY(-2px)',
              display: 'inline-block',
            }}>]</span>

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
      <div style={{ height: '56px' }} />

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '56px',
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
              const isActive = pathname === item.href || pathname.startsWith(item.href)

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

            {/* CMS Link - Mobile */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(0,0,0,0.1)',
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
            </div>

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
