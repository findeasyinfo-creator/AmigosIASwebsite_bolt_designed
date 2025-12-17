'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './LatestCurrentAffairs.module.css'
import DottedLines from '@/components/DottedLines'

type CAItem = {
  id: number
  title: string
  date: string
  subject: string
  paper: string
  summary: string
  fullContent: string
  topics: string[]
  imageUrl: string
}

export default function LatestCurrentAffairs() {
  const [selectedItem, setSelectedItem] = useState<CAItem | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const panelRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  // Get 5 latest daily current affairs items
  const latestItems: CAItem[] = [
    {
      id: 1,
      title: 'India-US Relations: Strategic Partnership in 2025',
      date: '2025-11-01',
      subject: 'International Relations',
      paper: 'GS-II',
      summary: 'Comprehensive analysis of bilateral trade agreements and defense cooperation between India and the United States.',
      fullContent: 'Detailed coverage of evolving India-US strategic alignment: defence technology sharing (COMCASA / BECA outcomes), Indo-Pacific maritime cooperation, critical technologies, bilateral trade negotiations (agri, digital services), and impact on regional power balance. Includes timeline, key agreements, exam-oriented analytical points and potential mains answer frameworks.',
      topics: ['Diplomacy', 'Trade', 'Defense'],
      imageUrl: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 7,
      title: 'Supreme Court Ruling on Environmental Protection',
      date: '2025-11-04',
      subject: 'Environment',
      paper: 'GS-III',
      summary: 'Historic judgment strengthening safeguards and imposing stricter penalties for violations.',
      fullContent: 'Case background, legal principles invoked (Article 21, polluter pays), statutory frameworks (EPA 1986, Forest Conservation), implications for sustainable development doctrine, enforcement challenges and ethical dimensions (intergenerational equity).',
      topics: ['Judiciary', 'Environment', 'Policy'],
      imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 8,
      title: "IMF Revises India's Growth Projections Upward",
      date: '2025-11-05',
      subject: 'Economy',
      paper: 'GS-III',
      summary: 'Updated forecast citing strong domestic demand and infrastructure investments.',
      fullContent: 'Drivers of upward revision (consumption resilience, infra multiplier, export mix), risks (external shocks, crude volatility), policy stance (RBI balancing inflation & growth), and integration into mains macro answer frameworks.',
      topics: ['IMF', 'GDP', 'Infrastructure'],
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Climate Change and Agricultural Impact',
      date: '2025-10-28',
      subject: 'Environment',
      paper: 'GS-III',
      summary: 'Understanding the effects of changing weather patterns on Indian agriculture and food security.',
      fullContent: 'Assessment of changing monsoon variability, heat stress on staple crops (rice/wheat), soil moisture decline, adaptation strategies (micro-irrigation, climate resilient seeds), government schemes (PMKSY, NICRA), policy gaps and integrated mitigation approach relevant for UPSC GS-III answers.',
      topics: ['Climate', 'Agriculture', 'Food Security'],
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Digital India Initiative: Progress and Challenges',
      date: '2025-10-25',
      subject: 'Governance',
      paper: 'GS-II',
      summary: 'Evaluation of digital infrastructure development and its impact on public service delivery.',
      fullContent: 'Review of Digital India pillars: broadband highways, universal mobile access, e-Governance reforms, data empowerment & privacy concerns, interoperability challenges, digital divide (rural connectivity), emerging tech stack (India Stack, ONDC) with governance implications and probable ethics case studies.',
      topics: ['Technology', 'E-Governance', 'Digital India'],
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80',
    },
  ]

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedItem])

  return (
    <section className={styles.caSection} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Latest Daily Current Affairs and Blog</h2>
        
        <DottedLines />

        <div className={styles.caCarousel}>
          {latestItems.map((item) => (
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
            </div>
          ))}
        </div>

        <div className={styles.caActions}>
          <Link href="/current-affairs" className={styles.viewAllBtn}>
            View All Current Affairs
          </Link>
        </div>
      </div>

      {/* Fullscreen Modal Popup */}
      {selectedItem && (
        <div className={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className={styles.modalCloseX}
              aria-label="Close"
              ref={closeBtnRef}
            >
              ×
            </button>
            
            <div className={styles.modalHeader}>
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.title} 
                className={styles.modalImage}
              />
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <span className={styles.modalPaper}>{selectedItem.paper}</span>
                <span className={styles.modalDate}>{selectedItem.date}</span>
                <span className={styles.modalSubject}>{selectedItem.subject}</span>
              </div>
              
              <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
              <p className={styles.modalFullContent}>{selectedItem.fullContent}</p>
              
              <div className={styles.modalTopics}>
                <h3 className={styles.modalTopicsTitle}>🔑 Key Topics</h3>
                {selectedItem.topics && selectedItem.topics.length > 0 ? (
                  <div className={styles.modalTopicsContainer}>
                    {selectedItem.topics.map((topic, index) => (
                      <span key={index} className={styles.modalTopic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary, #666)', fontSize: '0.875rem' }}>
                    No key topics available
                  </p>
                )}
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
        </div>
      )}
    </section>
  )
}
