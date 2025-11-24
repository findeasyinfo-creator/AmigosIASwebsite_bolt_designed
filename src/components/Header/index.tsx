'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import { useTheme } from '@/app/ThemeProvider'

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
            </div>
            {aboutDropdownOpen && (
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
            title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
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
            <Link href="/" className={pathname === '/' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className={styles.mobileNavItem}>
              <div className={styles.mobileNavLinkGroup}>
                <Link 
                  href="/about" 
                  className={`${styles.mobileNavButton} ${pathname.startsWith('/about') ? styles.active : ''}`}
                  onClick={() => { setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                >
                  About Us
                </Link>
                <button 
                  type="button"
                  className={styles.mobileArrowToggle}
                  aria-label={mobileAboutOpen ? 'Hide About submenu' : 'Show About submenu'}
                  aria-expanded={mobileAboutOpen}
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                >
                  <span className={`${styles.mobileArrow} ${mobileAboutOpen ? styles.mobileArrowOpen : ''}`}>▼</span>
                </button>
              </div>
              {mobileAboutOpen && (
                <div className={styles.mobileSubmenu}>
                  <Link href="/about/faculty" className={`${styles.mobileSubmenuItem} ${pathname === '/about/faculty' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Faculty</Link>
                  <Link href="/about/results" className={`${styles.mobileSubmenuItem} ${pathname === '/about/results' ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>Results</Link>
                </div>
              )}
            </div>
            <Link href="/courses" className={pathname === '/courses' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>Courses</Link>
            <Link href="/current-affairs" className={pathname === '/current-affairs' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>Current Affairs</Link>
            <Link href="/resources" className={pathname === '/resources' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>Resources & Blog</Link>
            <Link href="/contact" className={pathname === '/contact' ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
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
