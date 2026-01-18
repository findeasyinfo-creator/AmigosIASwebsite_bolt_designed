'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Save scroll position before navigating away
    const saveScrollPosition = () => {
      const scrollPos = {
        x: window.scrollX,
        y: window.scrollY,
        path: pathname
      }
      sessionStorage.setItem(`scroll-${pathname}`, JSON.stringify(scrollPos))
    }

    // Restore scroll position for current page
    const restoreScrollPosition = () => {
      try {
        const savedScroll = sessionStorage.getItem(`scroll-${pathname}`)
        if (savedScroll) {
          const { x, y } = JSON.parse(savedScroll)
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            window.scrollTo({
              left: x,
              top: y,
              behavior: 'instant'
            })
          })
        }
      } catch (error) {
        console.error('Error restoring scroll position:', error)
      }
    }

    // Restore scroll position when component mounts
    restoreScrollPosition()

    // Save scroll position periodically while scrolling
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(saveScrollPosition, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Save scroll position before page unload or navigation
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      saveScrollPosition()
    }
  }, [pathname])

  return null
}
