'use client';
import styles from './Faculty.module.css';
import DottedLines from '@/components/DottedLines';
import { useState } from 'react';
import { useYouTubeAutoPause } from '@/hooks/useYouTubeAutoPause';
import { useFaculty } from '@/hooks/useFaculty';

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

export default function Faculty() {
  const { faculty: facultyMembers, loading } = useFaculty(3); // Fetch 3 faculty members for homepage
  const [sparkles, setSparkles] = useState<Array<{ id: number; card: number; x: number; y: number; dx: number; dy: number }>>([]);
  const [playingCard, setPlayingCard] = useState<number | null>(null);

  // Setup auto-pause for each faculty video
  const faculty0 = useYouTubeAutoPause(
    playingCard === 0 ? parseYouTubeId(facultyMembers[0]?.videoUrl || '') : null,
    'faculty-video-0'
  );
  const faculty1 = useYouTubeAutoPause(
    playingCard === 1 ? parseYouTubeId(facultyMembers[1]?.videoUrl || '') : null,
    'faculty-video-1'
  );
  const faculty2 = useYouTubeAutoPause(
    playingCard === 2 ? parseYouTubeId(facultyMembers[2]?.videoUrl || '') : null,
    'faculty-video-2'
  );

  const facultyRefs = [faculty0, faculty1, faculty2];

  // Show content even while loading (hook has fallback data)
  return (
    <section className={styles.facultySection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Listen to the eminent personalities</h2>
        <div className={styles.dividerGroup}>
          <DottedLines />
        </div>
        
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
                <div className={styles.videoWrapper} ref={facultyRefs[index].containerRef}>
                  {playingCard === index ? (
                    <iframe
                      id={`faculty-video-${index}`}
                      src={`https://www.youtube.com/embed/${parseYouTubeId(faculty.videoUrl)}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0`}
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
        
        <div className={styles.viewAllButton}>
          <a href="/resources#faculty-columns" className={styles.viewAllFacultyBtn}>
            View More
            <span className={styles.buttonArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

