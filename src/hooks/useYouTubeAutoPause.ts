import { useEffect, useRef } from 'react'

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
    ytAPIReadyCallbacks?: (() => void)[]
  }
}

/**
 * Custom hook to auto-pause YouTube videos when they scroll out of view
 * @param videoId - Current YouTube video ID being played
 * @param iframeId - Unique ID for the iframe element
 * @param threshold - Intersection threshold (default: 0.3 = pause when less than 30% visible)
 */
export function useYouTubeAutoPause(
  videoId: string | null,
  iframeId: string,
  threshold: number = 0.3
) {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isYTReadyRef = useRef(false)

  // Load YouTube IFrame API once globally
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      isYTReadyRef.current = true
      return
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')
    if (!existingScript) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Setup callback queue
    if (!window.ytAPIReadyCallbacks) {
      window.ytAPIReadyCallbacks = []
    }

    const callback = () => {
      isYTReadyRef.current = true
    }

    window.ytAPIReadyCallbacks.push(callback)

    // Global API ready handler
    const originalCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (originalCallback) originalCallback()
      window.ytAPIReadyCallbacks?.forEach(cb => cb())
      window.ytAPIReadyCallbacks = []
    }

    return () => {
      const idx = window.ytAPIReadyCallbacks?.indexOf(callback)
      if (idx !== undefined && idx > -1) {
        window.ytAPIReadyCallbacks?.splice(idx, 1)
      }
    }
  }, [])

  // Initialize player when API is ready and videoId changes
  useEffect(() => {
    if (!videoId || typeof window === 'undefined') return

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return

      // Destroy previous player
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          // Ignore errors during destroy
        }
      }

      // Create new player
      try {
        playerRef.current = new window.YT.Player(iframeId, {
          events: {
            onReady: () => {
              // Player is ready
            }
          }
        })
      } catch (e) {
        console.error('Error initializing YouTube player:', e)
      }
    }

    if (isYTReadyRef.current) {
      setTimeout(initPlayer, 100)
    } else {
      const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          isYTReadyRef.current = true
          initPlayer()
          clearInterval(checkInterval)
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [videoId, iframeId])

  // Setup IntersectionObserver to auto-pause when out of view
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && playerRef.current && playerRef.current.pauseVideo) {
            try {
              playerRef.current.pauseVideo()
            } catch (e) {
              // Ignore errors
            }
          }
        })
      },
      {
        root: null,
        threshold,
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { containerRef, playerRef }
}
