'use client'
import styles from './Trusted.module.css'
import DottedLines from '@/components/DottedLines'
import { useFeatures } from '@/hooks/useFeatures'

export default function Trusted() {
  const { features, loading } = useFeatures()
  const fallbackIcon = '/assets/upsc-emblem-nobg.png'

  return (
    <section className={styles.trustedSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Choose Amigos</h2>
        <DottedLines />

        <div className={styles.trustedCards}>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className={styles.trustCard}>
                <div className={styles.thumbWrap}>
                  <div className={styles.thumb} style={{ background: '#f0f0f0' }}>
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                  </div>
                </div>
                <h3 className={styles.trustTitle} style={{ background: '#f0f0f0', color: 'transparent', borderRadius: '4px' }}>Loading...</h3>
                <p className={styles.trustSubtitle} style={{ background: '#f0f0f0', color: 'transparent', borderRadius: '4px' }}>Loading subtitle...</p>
              </div>
            ))
          ) : (
            features.map((feature) => (
              <div key={feature.id} className={styles.trustCard}>
                <div className={styles.thumbWrap}>
                  <div className={styles.thumb}>
                    <img
                      src={feature.icon}
                      alt={`${feature.title} illustration`}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackIcon }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className={styles.trustTitle}>{feature.title}</h3>
                <p className={styles.trustSubtitle}>{feature.subtitle}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
