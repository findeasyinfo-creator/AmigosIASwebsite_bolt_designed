'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import { useTheme } from '@/app/ThemeProvider'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setScrolled(true) // Show header initially

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <header className={`${styles.header} ${scrolled ? styles.visible : styles.hidden}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/assets/amigos-logo.png" alt="Amigos IAS" width={340} height={68} className={styles.logoImage} />
        </div>
        
        <nav className={styles.nav}>
          <a href="#home" className={styles.active}>Home</a>
          <a href="#about">About Us</a>
          <a href="#courses">Courses</a>
          <a href="#current-affairs">Current Affairs</a>
          <a href="#resources">Resources & Blog</a>
          <a href="#results">Results</a>
          <a href="#admissions">Admissions</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className={styles.headerActions}>
          <button 
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {mounted ? (theme === 'dark' ? '☀️' : '🌙') : '🌙'}
          </button>
          <button className={styles.btnJoin}>Join Now</button>
          <button className={styles.btnEnquire}>Enquire Now</button>
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
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#courses">Courses</a>
            <a href="#current-affairs">Current Affairs</a>
            <a href="#resources">Resources & Blog</a>
            <a href="#results">Results</a>
            <a href="#admissions">Admissions</a>
            <a href="#contact">Contact Us</a>
            <div className={styles.mobileActions}>
              <button 
                className={styles.themeToggleMobile}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {mounted ? (theme === 'dark' ? '☀️ Light Theme' : '🌙 Dark Theme') : '🌙 Dark Theme'}
              </button>
              <button className={styles.btnJoin}>Join Now</button>
              <button className={styles.btnEnquire}>Enquire</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
