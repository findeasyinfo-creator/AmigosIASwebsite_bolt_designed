'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import { useTheme } from '@/app/ThemeProvider'

// Feature flag: toggle About Us submenu visibility without deleting code
const SHOW_ABOUT_SUBMENU = false

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown only on outside click or Escape
  useEffect(() => {
    if (!SHOW_ABOUT_SUBMENU) return
    const handleClickOutside = (e: MouseEvent) => {
      if (!aboutDropdownOpen) return
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutDropdownOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAboutDropdownOpen(false)
    }
    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKey)
    }
  }, [aboutDropdownOpen])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/assets/Amigos IAS Finalised Logo wide.png" alt="Amigos IAS" width={340} height={68} className={styles.logoImage} />
        </div>
        
        <nav className={styles.nav}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
          <div className={styles.navItem} ref={aboutRef}>
            <div className={styles.navLinkGroup}>
              <Link href="/about" className={`${styles.navLink} ${pathname.startsWith('/about') ? styles.active : ''}`}>About Us</Link>
              {SHOW_ABOUT_SUBMENU && (
                <button
                  type="button"
                  className={styles.arrowButton}
                  aria-haspopup="true"
                  aria-expanded={aboutDropdownOpen}
                  aria-label={aboutDropdownOpen ? 'Hide About submenu' : 'Show About submenu'}
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                >
                  <span className={`${styles.arrow} ${aboutDropdownOpen ? styles.arrowOpen : ''}`}>▼</span>
                </button>
              )}
            </div>
            {SHOW_ABOUT_SUBMENU && aboutDropdownOpen && (
              <div className={styles.dropdown}>
                <Link
                  href="/about/faculty"
                  className={`${styles.dropdownItem} ${pathname === '/about/faculty' ? styles.active : ''}`}
                  onClick={() => setAboutDropdownOpen(false)}
                >Faculty</Link>
                <Link
                  href="/about/results"
                  className={`${styles.dropdownItem} ${pathname === '/about/results' ? styles.active : ''}`}
                  onClick={() => setAboutDropdownOpen(false)}
                >Results</Link>
              </div>
            )}
          </div>
          <Link href="/courses" className={pathname === '/courses' ? styles.active : ''}>Courses</Link>
          <Link href="/current-affairs" className={pathname === '/current-affairs' ? styles.active : ''}>Current Affairs</Link>
          <Link href="/resources" className={pathname === '/resources' ? styles.active : ''}>Resources & Blog</Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/contact" className={styles.ctaButton}>
            Contact Us
          </Link>
          <button 
            className={styles.themeToggleSwitch}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            <div className={styles.toggleTrack}>
              <div className={styles.moonIcon}>
                <span className={styles.moon}></span>
                <span className={styles.star1}></span>
                <span className={styles.star2}></span>
                <span className={styles.star3}></span>
              </div>
              <div className={styles.sunIcon}>
                <span className={styles.sunCore}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(0deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(45deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(90deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(135deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(180deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(225deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(270deg)'}}></span>
                <span className={styles.sunRay} style={{transform: 'rotate(315deg)'}}></span>
              </div>
              <div className={`${styles.toggleSlider} ${mounted && theme === 'light' ? styles.sliderLight : styles.sliderDark}`}></div>
            </div>
          </button>
        </div>

        <button 
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <Link href="/" className={pathname === '/' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </Link>
            <div className={styles.mobileNavItem}>
              <div className={styles.mobileNavLinkGroup}>
                <Link 
                  href="/about" 
                  className={`${styles.mobileNavButton} ${pathname.startsWith('/about') ? styles.active : ''}`}
                  onClick={() => { setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                >
                  <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  About Us
                </Link>
                {SHOW_ABOUT_SUBMENU && (
                  <button 
                    type="button"
                    className={styles.mobileArrowToggle}
                    aria-label={mobileAboutOpen ? 'Hide About submenu' : 'Show About submenu'}
                    aria-expanded={mobileAboutOpen}
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  >
                    <span className={`${styles.mobileArrow} ${mobileAboutOpen ? styles.mobileArrowOpen : ''}`}>▼</span>
                  </button>
                )}
              </div>
              {SHOW_ABOUT_SUBMENU && mobileAboutOpen && (
                <div className={styles.mobileSubmenu}>
                  <Link href="/about/faculty" className={`${styles.mobileSubmenuItem} ${pathname === '/about/faculty' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Faculty</Link>
                  <Link href="/about/results" className={`${styles.mobileSubmenuItem} ${pathname === '/about/results' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Results</Link>
                </div>
              )}
            </div>
            <Link href="/courses" className={pathname === '/courses' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Courses
            </Link>
            <Link href="/current-affairs" className={pathname === '/current-affairs' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Current Affairs
            </Link>
            <Link href="/resources" className={pathname === '/resources' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Resources & Blog
            </Link>
            <Link href="/contact" className={pathname === '/contact' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contact Us
            </Link>
            <div className={styles.mobileActions}>
              <button 
                className={styles.themeToggleSwitch}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              >
                <div className={styles.toggleTrack}>
                  <div className={styles.moonIcon}>
                    <span className={styles.moon}></span>
                    <span className={styles.star1}></span>
                    <span className={styles.star2}></span>
                    <span className={styles.star3}></span>
                  </div>
                  <div className={styles.sunIcon}>
                    <span className={styles.sunCore}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(0deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(45deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(90deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(135deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(180deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(225deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(270deg)'}}></span>
                    <span className={styles.sunRay} style={{transform: 'rotate(315deg)'}}></span>
                  </div>
                  <div className={`${styles.toggleSlider} ${mounted && theme === 'light' ? styles.sliderLight : styles.sliderDark}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
