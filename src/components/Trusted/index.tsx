'use client'
import styles from './Trusted.module.css'
import DottedLines from '@/components/DottedLines'

export default function Trusted() {
  const features = [
    {
      title: 'Daily Prelims AI Quizes',
      subtitle: 'Adaptive Practice & Analysis',
      icon: 'https://image.pollinations.ai/prompt/modern%20ai%20quiz%20learning%20technology%20digital%20brain%20neural%20network%20education%20holographic%20interface%20purple%20gold%20theme?width=600&height=600&nologo=true'
    },
    {
      title: 'Mains Answer Writing',
      subtitle: 'AI-Driven Evaluation & Feedback',
      icon: 'https://image.pollinations.ai/prompt/ai%20powered%20writing%20evaluation%20digital%20pen%20holographic%20document%20analysis%20machine%20learning%20education%20purple%20gold%20theme?width=600&height=600&nologo=true'
    },
    {
      title: '24/7 Support',
      subtitle: '24/7 News & Summaries',
      icon: 'https://image.pollinations.ai/prompt/24%207%20support%20chatbot%20ai%20assistant%20digital%20customer%20service%20holographic%20interface%20communication%20technology%20purple%20gold%20theme?width=600&height=600&nologo=true'
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
      </div>
    </section>
  )
}
