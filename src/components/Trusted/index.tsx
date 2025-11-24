'use client'
import styles from './Trusted.module.css'

export default function Trusted() {
  // Representative images per program (replace with local assets later if desired)
  const features = [
    {
      title: 'Yearlong Classroom Program',
      subtitle: 'Structured syllabus coverage & guided learning',
      icon: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop&auto=format&dpr=2'
    },
    {
      title: 'Mentorship Program',
      subtitle: 'Personalised guidance, tracking & motivation',
      icon: 'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=800&h=600&fit=crop&auto=format&dpr=2'
    },
    {
      title: 'Interview Guidance Program',
      subtitle: 'Mock interviews & personality refinement',
      icon: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format&dpr=2'
    }
  ]

  const fallbackIcon = '/assets/upsc-emblem-nobg.png'

  return (
    <section className={styles.trustedSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Hyderabad's Most Trusted</h2>
        <p className={styles.sectionSubtitle}>Your AI-Powered UPSC Companion</p>

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
