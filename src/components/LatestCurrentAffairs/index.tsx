'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './LatestCurrentAffairs.module.css'
import DottedLines from '@/components/DottedLines'
import { useCurrentAffairs } from '@/hooks/useCurrentAffairs'
import { useSiteSettings } from '@/hooks/useSiteSettings'

type CAItem = {
  id: number | string
  title: string
  date: string
  subject: string
  paper: string
  summary: string
  fullContent: string
  topics: string[]
  imageUrl?: string
}

export default function LatestCurrentAffairs() {
  const [selectedItem, setSelectedItem] = useState<CAItem | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const panelRefs = useRef<{ [key: string | number]: HTMLDivElement | null }>({})

  // Fetch 5 latest daily current affairs from API
  const { currentAffairs, loading } = useCurrentAffairs({
    type: 'daily',
    limit: 5,
  })
  const { settings } = useSiteSettings()

  const latestItems = currentAffairs.map(item => ({
    ...item,
    imageUrl: item.imageUrl || getSubjectImage(item.subject)
  }))

  // Fallback images by subject
  const getSubjectImage = (subject: string): string => {
    const imageMap: Record<string, string> = {
      'International Relations': 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=800&h=450&fit=crop&q=80',
      'Environment': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&q=80',
      'Governance': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80',
      'Economy': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop&q=80',
      'Polity': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=450&fit=crop&q=80',
      'Judiciary': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80',
    }
    return imageMap[subject] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop&q=80'
  }

  // Open item: set hash, scroll to popup panel, focus close
  const openItem = (item: CAItem) => {
    setSelectedItem(item)
    try {
      window.location.hash = `ca-${item.id}`
    } catch {}
    setTimeout(() => {
      // Scroll to the expanded panel instead of the section
      const panel = panelRefs.current[item.id]
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      closeBtnRef.current?.focus()
    }, 100)
  }

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Inline panel: no body scroll lock needed

  return (
    <section className={styles.caSection} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Latest Daily Current Affairs and Blog</h2>
        {settings?.currentAffairsSectionDesc && (
          <p className={styles.sectionSubtitle}>{settings.currentAffairsSectionDesc}</p>
        )}
        
        <DottedLines />

        <div className={styles.caCarousel}>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <div key={`skeleton-${index}`} className={styles.caCard}>
                <div className={styles.caImage} style={{ background: '#e0e0e0' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                </div>
                <div className={styles.caContent}>
                  <div className={styles.caMeta}>
                    <span style={{ background: '#e0e0e0', borderRadius: '4px', width: '60px', height: '20px', display: 'inline-block' }}></span>
                    <span style={{ background: '#e0e0e0', borderRadius: '4px', width: '80px', height: '20px', display: 'inline-block' }}></span>
                  </div>
                  <div style={{ background: '#e0e0e0', borderRadius: '4px', width: '100%', height: '24px', marginBottom: '8px' }}></div>
                  <div style={{ background: '#e0e0e0', borderRadius: '4px', width: '100%', height: '40px' }}></div>
                </div>
              </div>
            ))
          ) : (
            latestItems.map((item) => (
            <div key={item.id} className={styles.caCard}>
              <div className={styles.caImage}>
                <img src={item.imageUrl} alt={item.title} loading="lazy" />
              </div>
              <div className={styles.caContent}>
                <div className={styles.caMeta}>
                  <span className={styles.caPaper}>{item.paper}</span>
                  <span className={styles.caDate}>{item.date}</span>
                </div>
                <h3 className={styles.caTitle}>{item.title}</h3>
                <p className={styles.caSummary}>{item.summary}</p>
                <div className={styles.caFooter}>
                  <span className={styles.caSubject}>{item.subject}</span>
                  <button 
                    onClick={() => openItem(item)} 
                    className={styles.caReadMore}
                  >
                    Read More →
                  </button>
                </div>
              </div>
              {selectedItem?.id === item.id && (
                <div 
                  className={styles.inlinePanel}
                  ref={(el) => { panelRefs.current[item.id] = el }}
                >
                  <div className={styles.inlineHeader}>
                    <div className={styles.inlineThumb}>
                      <img src={item.imageUrl} alt={item.title} />
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className={styles.inlineClose}
                      aria-label="Close"
                      ref={closeBtnRef}
                    >
                      ×
                    </button>
                  </div>
                  <div className={styles.inlineBody}>
                    <div className={styles.modalMeta}>
                      <span className={styles.modalPaper}>{item.paper}</span>
                      <span className={styles.modalDate}>{item.date}</span>
                      <span className={styles.modalSubject}>{item.subject}</span>
                    </div>
                    <h2 className={styles.modalTitle}>{item.title}</h2>
                    <p className={styles.modalFullContent}>{item.fullContent}</p>
                    <div className={styles.modalTopics}>
                      <h3 className={styles.modalTopicsTitle}>Key Topics</h3>
                      <div className={styles.modalTopicsContainer}>
                        {item.topics.map((topic, index) => (
                          <span key={index} className={styles.modalTopic}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.modalActions}>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className={styles.modalCloseBtn}
                      >
                        Close
                      </button>
                      <Link href="/current-affairs" className={styles.modalViewAllBtn}>
                        View All Current Affairs
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            ))
          )}
        </div>

        <div className={styles.caActions}>
          <Link href="/current-affairs" className={styles.viewAllBtn}>
            View All Current Affairs
          </Link>
        </div>
      </div>

    </section>
  )
}
