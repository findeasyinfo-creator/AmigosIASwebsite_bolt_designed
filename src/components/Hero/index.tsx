'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

const slides = [
  { type: 'image', src: '/assets/hero-banner.jpg', alt: 'Amigos IAS Academy' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop', alt: 'Learning Together' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop', alt: 'Achievement Excellence' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop', alt: 'Study Success' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop', alt: 'Teamwork & Growth' },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const goToSlide = (index: number) => setCurrentSlide(index)

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroPanel}>
        <button className={`${styles.heroNavBtn} ${styles.prev}`} onClick={prevSlide} aria-label="Previous">‹</button>
        <button className={`${styles.heroNavBtn} ${styles.next}`} onClick={nextSlide} aria-label="Next">›</button>

        <div className={styles.heroCarousel}>
          {slides.map((slide, index) => (
            <div key={index} className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ''} ${styles.imageSlide}`}>
              <div className={styles.heroImageCard}>
                <Image src={slide.src} alt={slide.alt} width={920} height={518} className={styles.heroImage} />
                <div className={styles.celebrationBadges}>🎉 ✨ 🏆</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.carouselIndicators}>
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`} 
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.heroCta}>
        <button className={styles.ctaButton}>Enroll Now - Free Consultation</button>
      </div>
    </section>
  )
}
