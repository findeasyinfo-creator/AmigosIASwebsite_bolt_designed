import styles from './Demo.module.css';

export default function Demo() {
  const demoVideos = [
    {
      title: 'UPSC Prelims Strategy',
      description: 'Complete guide to prepare for UPSC Prelims examination with effective study techniques and time management tips',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop'
    },
    {
      title: 'Essay Writing Masterclass',
      description: 'Learn the art of writing high-scoring essays for UPSC Mains with structure, content, and presentation techniques',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop'
    },
    {
      title: 'Current Affairs Analysis',
      description: 'Daily current affairs updates with UPSC perspective and relevance to syllabus for both Prelims and Mains',
      thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop'
    }
  ];

  return (
    <section className={styles.demoSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Demo Content Section</h2>
        <p className={styles.sectionSubtitle}>Watch Our Free Demo Videos & Get Started</p>
        <div className={styles.demoGrid}>
          {demoVideos.map((video, index) => (
            <div key={index} className={styles.demoCard}>
              <div className={styles.videoThumbnail}>
                <img src={video.thumbnail} alt={video.title} />
                <div className={styles.playButton}>▶</div>
                <div className={styles.youtubeBadge}>
                  <svg width="20" height="14" viewBox="0 0 20 14">
                    <path fill="#FF0000" d="M19.6 2.2s-.2-1.4-.8-2C18.2 0 17.6 0 17.3 0 14.5 0 10 0 10 0s-4.5 0-7.3.2C2.4 0 1.8 0 1.2.2.6.8.4 2.2.4 2.2S0 3.9 0 5.6v1.6c0 1.7.2 3.4.2 3.4s.2 1.4.8 2c.6.2 1.4.2 1.8.2 1.3.1 7.2.2 7.2.2s4.5 0 7.3-.2c.3 0 .9 0 1.5-.2.6-.6.8-2 .8-2s.2-1.7.2-3.4V5.6c0-1.7-.2-3.4-.2-3.4z"/>
                    <path fill="#FFF" d="M8 10V4l5.2 3L8 10z"/>
                  </svg>
                </div>
              </div>
              <div className={styles.demoContent}>
                <h3 className={styles.demoTitle}>{video.title}</h3>
                <p className={styles.demoDescription}>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.demoAction}>
          <button className={styles.exploreBtn}>Explore All Videos</button>
        </div>
      </div>
    </section>
  );
}

