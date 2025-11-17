'use client';
import styles from './Faculty.module.css';
import { useState } from 'react';

export default function Faculty() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; card: number; x: number; y: number; dx: number; dy: number }>>([]);
  const [playingCard, setPlayingCard] = useState<number | null>(null);
  const facultyMembers = [
    {
      name: 'Dr. Avinash Kumar',
      subject: 'Political Science & Polity',
      experience: '15+ Years Experience',
      photo: 'https://randomuser.me/api/portraits/men/46.jpg',
      videoThumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      name: 'Prof. Priya Sharma',
      subject: 'History & Indian Culture',
      experience: '12+ Years Experience',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      videoThumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      name: 'Dr. Karthik Reddy',
      subject: 'Geography & Environment',
      experience: '10+ Years Experience',
      photo: 'https://randomuser.me/api/portraits/men/54.jpg',
      videoThumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=450&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  function parseYouTubeId(url: string): string | null {
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null;
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return v;
        const parts = u.pathname.split('/');
        const idx = parts.findIndex((p) => p === 'embed');
        if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
      }
      return null;
    } catch {
      return null;
    }
  }

  return (
    <section className={styles.facultySection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Faculty</h2>
        <p className={styles.sectionSubtitle}>Learn from India's Top UPSC Experts</p>
        
        <div className={styles.facultyGrid}>
          {facultyMembers.map((faculty, index) => (
            <div 
              key={index} 
              className={
                `${styles.facultyCard} ` +
                `${index === 0 ? styles.tiltLeft : index === 1 ? styles.tiltCenter : styles.tiltRight}`
              }
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const count = 14;
                const created: Array<{ id:number; card:number; x:number; y:number; dx:number; dy:number }> = [];
                const base = Math.random() * Math.PI * 2;
                for (let i = 0; i < count; i++) {
                  const angle = base + (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
                  const dist = 70 + Math.random() * 90;
                  created.push({
                    id: Date.now() + i + Math.floor(Math.random() * 1000),
                    card: index,
                    x,
                    y,
                    dx: Math.cos(angle) * dist,
                    dy: Math.sin(angle) * dist,
                  });
                }
                setSparkles((prev) => [...prev, ...created]);
                setTimeout(() => {
                  setSparkles((prev) => prev.filter((s) => !created.some((c) => c.id === s.id)));
                }, 800);
              }}
            >
              <div className={styles.videoRing}>
                <div className={styles.videoWrapper}>
                  {playingCard === index ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${parseYouTubeId(faculty.videoUrl)}?autoplay=1&modestbranding=1&rel=0`}
                      title={`${faculty.name} video`}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className={styles.videoIframe}
                    />
                  ) : (
                    <>
                      <img 
                        src={faculty.videoThumbnail} 
                        alt={`${faculty.name} video`} 
                        className={styles.videoThumbnail}
                      />
                      <button 
                        type="button"
                        className={styles.playButton}
                        aria-label={`Play ${faculty.name}'s video`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingCard(index);
                        }}
                      >
                        <span className={styles.playIcon}>▶</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.facultyInfo}>
                <div className={styles.facultyProfile}>
                  <img 
                    src={faculty.photo} 
                    alt={faculty.name} 
                    className={styles.facultyPhoto} 
                  />
                  <div className={styles.facultyDetails}>
                    <h3 className={styles.facultyName}>{faculty.name}</h3>
                    <p className={styles.facultySubject}>{faculty.subject}</p>
                    <p className={styles.facultyExperience}>{faculty.experience}</p>
                  </div>
                </div>
              </div>

              <div className={styles.sparkleLayer} aria-hidden="true">
                {sparkles.filter(s => s.card === index).map(s => (
                  <span
                    key={s.id}
                    className={styles.sparkle}
                    style={{ left: s.x, top: s.y, ['--dx' as any]: `${s.dx}px`, ['--dy' as any]: `${s.dy}px` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

