'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'
import { heroSlides } from '@/data/heroSlides'

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index)
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  // Reset transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <section className={`${styles.heroSection} hero-section`}>
      {/* Navigation Arrows - Positioned at screen edges */}
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

      <div className={styles.heroContainer}>
        {/* Carousel Content */}
        <div className={styles.carouselWrapper}>
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentIndex ? styles.activeSlide : ''}`}
            >
              <div className={styles.slideContent}>
                {/* Text Section - 50% */}
                <div className={styles.textSection}>
                  <h1 className={styles.heroTitle}>{slide.title}</h1>
                  <div className={styles.features}>
                    {slide.features.map((feature, idx) => (
                      <div key={idx} className={styles.feature}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Section - 50% */}
                <div className={styles.imageSection}>
                  <div className={styles.imageCard}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={700}
                      height={500}
                      className={styles.heroImage}
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators - Below hero section */}
        <div className={styles.indicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
