'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'
import { heroSlides } from '@/data/heroSlides'

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1) // Start at 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)

  // Create infinite loop: [last, ...all slides, first]
  const extendedSlides = [heroSlides[heroSlides.length - 1], ...heroSlides, heroSlides[0]]

  const nextSlide = () => {
    if (!isTransitioning) return
    setCurrentIndex(prev => prev + 1)
  }

  const prevSlide = () => {
    if (!isTransitioning) return
    setCurrentIndex(prev => prev - 1)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [isTransitioning])

  // Handle infinite loop wrap-around
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === 0) {
        setIsTransitioning(false)
        setCurrentIndex(heroSlides.length)
      } else if (currentIndex === extendedSlides.length - 1) {
        setIsTransitioning(false)
        setCurrentIndex(1)
      }
    }

    const track = trackRef.current
    if (track) {
      track.addEventListener('transitionend', handleTransitionEnd)
      return () => track.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [currentIndex, extendedSlides.length])

  // Re-enable transition after snap
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <section className={`${styles.heroSection} hero-section`}>
      <div className={styles.heroContainer}>
        {/* Arrows overlay the whole hero on desktop; appear on hover */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
          onClick={prevSlide} 
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={nextSlide} 
          aria-label="Next slide"
        >
          ›
        </button>

        <div className={styles.slidesViewport}>
          <div
            ref={trackRef}
            className={styles.slidesTrack}
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none'
            }}
          >
            {extendedSlides.map((slide, idx) => (
              <div className={styles.slide} key={idx}>
                <div className={styles.heroContent}>
                  {/* Text Content - 40% */}
                  <div className={styles.textContent}>
                    <h1 className={styles.heroTitle}>
                      {slide.title}
                    </h1>
                    {!!slide.features?.length && (
                      <div className={styles.features}>
                        {slide.features.map((f, i) => (
                          <div className={styles.feature} key={i}>
                            <span className={styles.featureIcon}>✓</span>
                            <span className={styles.featureText}>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Content - 60% */}
                  <div className={styles.imageContent}>
                    <div className={styles.imageWrapper}>
                      <div className={styles.heroImageContainer}>
                        <Image 
                          src={slide.image}
                          alt={slide.title}
                          width={800}
                          height={500}
                          className={styles.heroImage}
                          priority={idx <= 2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className={styles.imageIndicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === (currentIndex - 1 + heroSlides.length) % heroSlides.length ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index + 1)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
