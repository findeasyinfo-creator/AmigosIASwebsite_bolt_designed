'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

const heroImages = [
  '/assets/hero-banner.jpg',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
]

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextImage])

  return (
    <section className={`${styles.heroSection} hero-section`}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Text Content - 40% */}
          <div className={styles.textContent}>
            <h1 className={styles.heroTitle} style={{ color: '#ffffff !important' }}>
              Hyderabad Most Trusted IAS Academy
            </h1>
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText} style={{ color: '#ffffff' }}>Expert Faculty with Proven Results</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText} style={{ color: '#ffffff' }}>Comprehensive Study Materials & Mock Tests</span>
              </div>
            </div>
          </div>

          {/* Image Content - 60% */}
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              {/* Navigation Controls positioned on image sides */}
              <button 
                className={`${styles.navButton} ${styles.prevButton}`} 
                onClick={prevImage} 
                aria-label="Previous image"
              >
                ‹
              </button>
              
              <div className={styles.heroImageContainer}>
                <Image 
                  src={heroImages[currentImageIndex]} 
                  alt="Amigos IAS Academy" 
                  width={800} 
                  height={500} 
                  className={styles.heroImage}
                  priority
                />
              </div>
              
              <button 
                className={`${styles.navButton} ${styles.nextButton}`} 
                onClick={nextImage} 
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            
            {/* Image Indicators */}
            <div className={styles.imageIndicators}>
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
