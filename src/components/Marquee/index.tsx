'use client'
import { useEffect, useRef } from 'react'
import styles from './Marquee.module.css'

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let scrollAmount = 0
    // Adjust speed based on device - slower for mobile
    const getScrollSpeed = () => {
      const width = window.innerWidth
      if (width <= 768) return 0.4 // Slower on mobile
      if (width <= 850) return 0.6 // Medium on mobile desktop view
      return 0.8 // Normal on desktop
    }
    
    let scrollSpeed = getScrollSpeed()
    
    // Update speed on resize
    const handleResize = () => {
      scrollSpeed = getScrollSpeed()
    }
    window.addEventListener('resize', handleResize)
    
    const scroll = () => {
      scrollAmount -= scrollSpeed
      if (marquee.firstElementChild) {
        const firstChild = marquee.firstElementChild as HTMLElement
        if (Math.abs(scrollAmount) >= firstChild.offsetWidth / 2) {
          scrollAmount = 0
        }
      }
      if (marquee) {
        marquee.style.transform = `translateX(${scrollAmount}px)`
      }
      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeWrapper}>
        <div ref={marqueeRef} className={styles.marqueeContent}>
          <span>
            🎓 Formulating Offers | Free Demo Classes Invitation This Week 📚 | 
            🎓 Join India's Premier IAS Academy 📚 | 
            🎓 Expert Faculty | Proven Excellence 📚 | 
            🎓 Limited Seats Available - Enroll Today! 📚
          </span>
          <span>
            🎓 Formulating Offers | Free Demo Classes Invitation This Week 📚 | 
            🎓 Join India's Premier IAS Academy 📚 | 
            🎓 Expert Faculty | Proven Excellence 📚 | 
            🎓 Limited Seats Available - Enroll Today! 📚
          </span>
        </div>
      </div>
    </div>
  )
}
