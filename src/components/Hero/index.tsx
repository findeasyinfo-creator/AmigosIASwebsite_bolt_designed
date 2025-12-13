'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'
import { api } from '@/services/api'
import { HeroSlide } from '@/types/api.types'

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(1) // Start at 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)

  // Fetch slides from API
  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await api.heroSlides.getAll()
      const activeSlides = response.data
        .filter((slide: HeroSlide) => slide.isActive)
        .sort((a: HeroSlide, b: HeroSlide) => a.order - b.order)
      setSlides(activeSlides)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to load slides')
      console.error('Error fetching hero slides:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create infinite loop: [last, ...all slides, first]
  const extendedSlides = slides.length > 0
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : []

  const nextSlide = () => {
    if (!isTransitioning) return
    setCurrentIndex(prev => prev + 1)
  }

  const prevSlide = () => {
    if (!isTransitioning) return
    setCurrentIndex(prev => prev - 1)
  }

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [isTransitioning, slides.length])

  // Handle infinite loop wrap-around
  useEffect(() => {
    if (slides.length === 0) return

    const handleTransitionEnd = () => {
      if (currentIndex === 0) {
        setIsTransitioning(false)
        setCurrentIndex(slides.length)
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
  }, [currentIndex, extendedSlides.length, slides.length])

  // Re-enable transition after snap
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Loading state
  if (loading) {
    return (
      <section className={`${styles.heroSection} hero-section`}>
        <div className={styles.heroContainer}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading slides...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className={`${styles.heroSection} hero-section`}>
        <div className={styles.heroContainer}>
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={fetchSlides} className={styles.retryButton}>
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Empty state
  if (slides.length === 0) {
    return (
      <section className={`${styles.heroSection} hero-section`}>
        <div className={styles.heroContainer}>
          <div className={styles.empty}>
            <p>No slides available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

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
                    {slide.subtitle && (
                      <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                    )}
                    {slide.description && (
                      <div className={styles.heroDescription}>
                        {slide.description.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}
                    {slide.ctaLabel && slide.ctaHref && (
                      <Link href={slide.ctaHref} className={styles.ctaButton}>
                        {slide.ctaLabel}
                      </Link>
                    )}
                  </div>

                  {/* Image Content - 60% */}
                  <div className={styles.imageContent}>
                    <div className={styles.imageWrapper}>
                      <div className={styles.heroImageContainer}>
                        <Image
                          src={slide.imageUrl || '/assets/hero-banner.jpg'}
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
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === (currentIndex - 1 + slides.length) % slides.length ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index + 1)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
