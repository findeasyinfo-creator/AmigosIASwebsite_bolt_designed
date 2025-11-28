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
        } else {
          // Remove class when element is out of view (with delay to avoid jarring)
          setTimeout(() => {
            if (!entry.isIntersecting) {
              entry.target.classList.remove('in-view')
            }
          }, 200)
        }
      })
    }, observerOptions)

    // Get all sections
    const sections = document.querySelectorAll('section')
    
    // Make first section (hero) immediately visible on all pages
    if (sections.length > 0) {
      const heroSection = sections[0] as HTMLElement
      heroSection.classList.add('in-view', 'first-section')
      heroSection.style.opacity = '1'
      heroSection.style.transform = 'translateY(0)'
      
      // Make all content in hero section immediately visible
      const heroHeadings = heroSection.querySelectorAll('h1, h2, h3, p, div')
      heroHeadings.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.classList.add('in-view', 'first-section')
        htmlElement.style.opacity = '1'
        htmlElement.style.transform = 'translateY(0)'
      })
    }
    
    // Observe sections starting from the second one
    sections.forEach((section, index) => {
      if (index > 0) {
        observer.observe(section)
      }
    })

    // Get all cards/grid items
    const cards = document.querySelectorAll('.card, [class*="card"], [class*="course"]:not([class*="coursesSection"]), [class*="faculty"]')
    const gridItems = document.querySelectorAll('[class*="grid"] > *, [class*="Grid"] > *')
    
    // Combine cards and grid items
    const allItems = [...Array.from(cards), ...Array.from(gridItems)]
    
    allItems.forEach((item, index) => {
      const parentSection = item.closest('section')
      const sectionIndex = Array.from(sections).indexOf(parentSection as HTMLElement)
      
      // If item is in the first section (hero), make it immediately visible
      if (sectionIndex === 0) {
        item.classList.add('in-view', 'first-section')
        ;(item as HTMLElement).style.opacity = '1'
        ;(item as HTMLElement).style.transform = 'translateY(0)'
      } else {
        // For other sections, observe all items
        observer.observe(item)
      }
    })

    // Get all grids
    const grids = document.querySelectorAll('[class*="grid"], [class*="Grid"], [class*="list"]')
    grids.forEach((grid) => {
      const parentSection = grid.closest('section')
      const sectionIndex = Array.from(sections).indexOf(parentSection as HTMLElement)
      
      if (sectionIndex === 0) {
        grid.classList.add('in-view', 'first-section')
        ;(grid as HTMLElement).style.opacity = '1'
        ;(grid as HTMLElement).style.transform = 'translateY(0)'
      } else {
        observer.observe(grid)
      }
    })

    // Get all headings
    const headings = document.querySelectorAll('h1, h2, h3')
    headings.forEach((heading) => {
      const parentSection = heading.closest('section')
      const sectionIndex = Array.from(sections).indexOf(parentSection as HTMLElement)
      
      if (sectionIndex === 0) {
        heading.classList.add('in-view', 'first-section')
        ;(heading as HTMLElement).style.opacity = '1'
        ;(heading as HTMLElement).style.transform = 'translateY(0)'
      } else {
        observer.observe(heading)
      }
    })

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
