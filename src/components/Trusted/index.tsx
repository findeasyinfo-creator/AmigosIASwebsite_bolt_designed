'use client'
import styles from './Trusted.module.css'
import DottedLines from '@/components/DottedLines'

export default function Trusted() {
  // Representative images per program (replace with local assets later if desired)
  const features = [
    {
      title: 'Daily Prelims AI Quizes',
      subtitle: 'Adaptive Practice & Analysis',
      icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop&auto=format'
    },
    {
      title: 'Mains Answer Writing',
      subtitle: 'AI-Driven Evaluation & Feedback',
      icon: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&auto=format'
    },
    {
      title: '24/7 Support',
      subtitle: '24/7 News & Summaries',
      icon: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&h=600&fit=crop&auto=format'
    }
  ]

  const fallbackIcon = '/assets/upsc-emblem-nobg.png'

  return (
    <section className={styles.trustedSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Choose Amigos</h2>
        <DottedLines />

        <div className={styles.trustedCards}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.trustCard}>
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
          ))}
        </div>

        <p className={styles.trustedCta}>Start your UPSC career here!</p>
      </div>
    </section>
  )
}
