'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ============================================
// ASKEW NAVIGATION - Deconstructivist Design
// "Twisted yet Harmonious"
// ============================================

// Collections sub-items for dropdown
const COLLECTION_ITEMS = [
  { href: '/collections/deconstruction', label: 'Deconstruction', index: '01' },
  { href: '/collections/fragments', label: 'Fragments', index: '02' },
  { href: '/collections/void', label: 'Void', index: '03' },
  { href: '/collections/origin', label: 'Origin', index: '04' },
] as const

// Navigation items with optional sub-items
const NAV_ITEMS = [
  { href: '/about', label: 'About', hasDropdown: false },
  { href: '/archive', label: 'Archive', hasDropdown: false },
  { href: '/collections', label: 'Collections', hasDropdown: true, subItems: COLLECTION_ITEMS },
  { href: '/contact', label: 'Contact', hasDropdown: false },
  { href: '/lab', label: 'Lab', hasDropdown: false },
] as const

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Dropdown hover handlers with delay
  const handleDropdownEnter = (href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(href)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

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
          backgroundColor: scrolled ? 'rgba(250,250,250,0.97)' : '#FAFAFA',
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
            className="nav-logo-link"
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
              className="nav-logo"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                fontWeight: 400,
                color: '#0A0A0A',
                letterSpacing: '0.15em',
                transform: 'rotate(-1deg)',
                display: 'inline-block',
                transition: 'transform 0.3s ease, color 0.3s ease',
              }}
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
              const isDropdownOpen = activeDropdown === item.href

              // Asymmetric styling per item
              const styles = [
                { rotation: -2, size: '9px', spacing: '0.08em', weight: 400 },
                { rotation: 1.5, size: '8px', spacing: '0.15em', weight: 500 },
                { rotation: -1, size: '10px', spacing: '0.05em', weight: 300 },
                { rotation: 2, size: '8px', spacing: '0.12em', weight: 400 },
                { rotation: -1.5, size: '9px', spacing: '0.1em', weight: 500 },
              ][idx]

              return (
                <div
                  key={item.href}
                  style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
                  onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.href)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className="nav-item"
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
                      borderBottom: isActive ? '1.5px solid #8B7355' : '1.5px solid transparent',
                      transition: 'color 0.2s ease, border-color 0.2s ease',
                    }}
                  >
                    {item.label}
                    {/* Dropdown indicator */}
                    {item.hasDropdown && (
                      <span style={{
                        marginLeft: '4px',
                        fontSize: '6px',
                        opacity: 0.5,
                        transition: 'transform 0.2s ease',
                        display: 'inline-block',
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}>
                        ▼
                      </span>
                    )}
                  </Link>

                  {/* Dropdown Menu - Asymmetric Style */}
                  {item.hasDropdown && item.subItems && isDropdownOpen && (
                    <div
                      className="nav-dropdown"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-20px',
                        marginTop: '8px',
                        background: '#FAFAFA',
                        border: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                        padding: '12px 0',
                        minWidth: '180px',
                        zIndex: 100,
                        // Asymmetric shape
                        clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 3% 98%)',
                      }}
                    >
                      {item.subItems.map((subItem, subIdx) => {
                        const isSubActive = pathname === subItem.href
                        // Varied rotations for asymmetric feel
                        const subRotation = [-1.5, 0.5, -0.8, 1.2][subIdx]

                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="nav-dropdown-item"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '8px 18px',
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '9px',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: isSubActive ? '#0A0A0A' : '#7A7A7A',
                              textDecoration: 'none',
                              transform: `rotate(${subRotation}deg)`,
                              transition: 'color 0.2s ease, padding-left 0.2s ease',
                              borderLeft: isSubActive ? '2px solid #8B7355' : '2px solid transparent',
                            }}
                          >
                            {/* Index number */}
                            <span style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '7px',
                              color: '#8B7355',
                              opacity: 0.5,
                            }}>
                              {subItem.index}
                            </span>
                            {subItem.label}
                          </Link>
                        )
                      })}

                      {/* View All link */}
                      <div style={{
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        marginTop: '8px',
                        paddingTop: '8px',
                      }}>
                        <Link
                          href="/collections"
                          className="nav-dropdown-item"
                          style={{
                            display: 'block',
                            padding: '6px 18px',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '8px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#8B7355',
                            textDecoration: 'none',
                            transform: 'rotate(0.5deg)',
                          }}
                        >
                          View All →
                        </Link>
                      </div>
                    </div>
                  )}

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

            {NAV_ITEMS.map((item, idx) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href)
              const isExpanded = mobileExpanded === item.href

              return (
                <div key={item.href}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => !item.hasDropdown && setIsOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontFamily: 'Georgia, serif',
                        fontSize: '28px',
                        color: isActive ? '#0A0A0A' : '#7A7A7A',
                        textDecoration: 'none',
                        flex: 1,
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '10px',
                        color: '#8B7355',
                        opacity: 0.6,
                      }}>{String(idx + 1).padStart(2, '0')}</span>
                      {item.label}
                    </Link>

                    {/* Expand button for items with dropdown */}
                    {item.hasDropdown && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.href)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '14px',
                          color: '#8B7355',
                          transition: 'transform 0.2s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        ▼
                      </button>
                    )}

                    {!item.hasDropdown && isActive && (
                      <span style={{
                        fontSize: '14px',
                        color: '#8B7355',
                      }}>→</span>
                    )}
                  </div>

                  {/* Mobile Submenu */}
                  {item.hasDropdown && item.subItems && isExpanded && (
                    <div style={{
                      paddingLeft: '32px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      background: 'rgba(0,0,0,0.01)',
                    }}>
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href

                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontFamily: 'Georgia, serif',
                              fontSize: '18px',
                              color: isSubActive ? '#0A0A0A' : '#9A9A9A',
                              textDecoration: 'none',
                              padding: '12px 0',
                              borderLeft: isSubActive ? '2px solid #8B7355' : '2px solid transparent',
                              paddingLeft: '12px',
                            }}
                          >
                            <span style={{
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '9px',
                              color: '#8B7355',
                              opacity: 0.6,
                            }}>{subItem.index}</span>
                            {subItem.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
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

      {/* Responsive Styles + Hover Effects */}
      <style jsx global>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-menu-btn {
          display: none !important;
        }

        /* Logo hover effect */
        .nav-logo-link:hover .nav-logo {
          transform: rotate(-2deg) scale(1.02);
          color: #8B7355;
        }

        /* Nav item hover effects */
        .nav-item:hover {
          color: #0A0A0A !important;
          border-bottom-color: rgba(139, 115, 85, 0.3) !important;
        }

        /* Dropdown item hover */
        .nav-dropdown-item:hover {
          color: #0A0A0A !important;
          padding-left: 22px !important;
          border-left-color: rgba(139, 115, 85, 0.5) !important;
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
