'use client'
import { useEffect, useRef } from 'react'
import styles from './Marquee.module.css'

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let scrollAmount = 0
    // Consistent speed across all devices
    const scrollSpeed = 0.8
    
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
