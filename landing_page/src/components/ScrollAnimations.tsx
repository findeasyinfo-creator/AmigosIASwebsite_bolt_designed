'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    // Observe sections
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    // Observe cards
    const cards = document.querySelectorAll('.card, [class*="card"], [class*="course"]:not([class*="coursesSection"]), [class*="faculty"]')
    cards.forEach((card) => observer.observe(card))

    // Observe grids for stagger effect
    const grids = document.querySelectorAll('[class*="grid"], [class*="list"]')
    grids.forEach((grid) => observer.observe(grid))

    // Observe headings
    const headings = document.querySelectorAll('h1, h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    // Parallax scroll effect for background waves
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          const body = document.querySelector('body')
          
          if (body) {
            // Calculate parallax values based on scroll position
            const parallaxSpeed = 0.5
            const rotationSpeed = 0.02
            const scaleSpeed = 0.0001
            
            const yOffset = scrolled * parallaxSpeed
            const rotation = Math.sin(scrolled * rotationSpeed) * 2
            const scale = 1.05 + (scrolled * scaleSpeed)
            
            // Apply transform to body::after (background layer)
            body.style.setProperty('--scroll-y', `${yOffset}px`)
            body.style.setProperty('--scroll-rotation', `${rotation}deg`)
            body.style.setProperty('--scroll-scale', `${Math.min(scale, 1.15)}`)
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
