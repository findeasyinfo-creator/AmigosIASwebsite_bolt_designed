import styles from './Trusted.module.css'

export default function Trusted() {
  const features = [
    {
      title: 'Daily Prelims AI Quizes',
      subtitle: 'Adaptive Practice & Analysis',
      icon: 'https://image.pollinations.ai/prompt/modern%20ai%20quiz%20learning%20technology%20digital%20brain%20neural%20network%20education%20holographic%20interface%20orange%20yellow%20warm%20theme?width=600&height=600&nologo=true'
    },
    {
      title: 'Mains Answer Writing',
      subtitle: 'AI-Driven Evaluation & Feedback',
      icon: 'https://image.pollinations.ai/prompt/ai%20powered%20writing%20evaluation%20digital%20pen%20holographic%20document%20analysis%20machine%20learning%20education%20orange%20yellow%20warm%20theme?width=600&height=600&nologo=true'
    },
    {
      title: '24/7 Support',
      subtitle: '24/7 News & Summaries',
      icon: 'https://image.pollinations.ai/prompt/24%207%20support%20chatbot%20ai%20assistant%20digital%20customer%20service%20holographic%20interface%20communication%20technology%20orange%20yellow%20warm%20theme?width=600&height=600&nologo=true'
    }
  ]

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
                    alt={feature.title}
                  />
                </div>
              </div>

              <h3 className={styles.trustTitle}>{feature.title}</h3>
              <p className={styles.trustSubtitle}>{feature.subtitle}</p>
            </div>
          ))}
        </div>

        <button className={styles.exploreBtn}>Explore Courses</button>
        <p className={styles.trustedCta}>Start your UPSC career here!</p>
      </div>
    </section>
  )
}
