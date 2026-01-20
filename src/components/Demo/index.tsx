'use client';
import styles from './Demo.module.css';
import { useState } from 'react';
import { useYouTubeAutoPause } from '@/hooks/useYouTubeAutoPause';
import { useDemoVideos } from '@/hooks/useDemoVideos';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Demo() {
  const [playingCard, setPlayingCard] = useState<number | null>(null);
  const { demoVideos, loading } = useDemoVideos();
  const { settings } = useSiteSettings();

  // Setup auto-pause for each demo video - dynamically based on loaded videos
  const demo0 = useYouTubeAutoPause(
    playingCard === 0 && demoVideos[0] ? demoVideos[0].videoId : null,
    'demo-video-0'
  );
  const demo1 = useYouTubeAutoPause(
    playingCard === 1 && demoVideos[1] ? demoVideos[1].videoId : null,
    'demo-video-1'
  );
  const demo2 = useYouTubeAutoPause(
    playingCard === 2 && demoVideos[2] ? demoVideos[2].videoId : null,
    'demo-video-2'
  );

  const demoRefs = [demo0, demo1, demo2];

  return (
    <section className={styles.demoSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Test before you trust</h2>
        {settings?.demoSectionDesc && (
          <p className={styles.demoSubtitle}>{settings.demoSectionDesc}</p>
        )}
        
        <div className={styles.demoGrid}>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.demoCard}>
                <div className={styles.videoThumbnail} style={{ background: '#f0f0f0' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                </div>
                <div className={styles.demoContent}>
                  <h3 className={styles.demoTitle} style={{ background: '#f0f0f0', color: 'transparent', borderRadius: '4px' }}>Loading...</h3>
                  <p className={styles.demoDescription} style={{ background: '#f0f0f0', color: 'transparent', borderRadius: '4px' }}>Loading description...</p>
                </div>
              </div>
            ))
          ) : (
            demoVideos.map((video, index) => (
              <div key={video.id} className={styles.demoCard}>
                <div className={styles.videoThumbnail} ref={demoRefs[index]?.containerRef}>
                  {playingCard === index ? (
                    <iframe
                      id={`demo-video-${index}`}
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0`}
                      title={video.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                    />
                  ) : (
                    <>
                      <img src={video.thumbnail} alt={video.title} />
                      <div
                        className={styles.playButton}
                        onClick={() => setPlayingCard(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Play ${video.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setPlayingCard(index);
                          }
                        }}
                      >
                        ▶
                      </div>
                      <div className={styles.youtubeBadge}>
                        <svg width="20" height="14" viewBox="0 0 20 14">
                          <path fill="#FF0000" d="M19.6 2.2s-.2-1.4-.8-2C18.2 0 17.6 0 17.3 0 14.5 0 10 0 10 0s-4.5 0-7.3.2C2.4 0 1.8 0 1.2.2.6.8.4 2.2.4 2.2S0 3.9 0 5.6v1.6c0 1.7.2 3.4.2 3.4s.2 1.4.8 2c.6.2 1.4.2 1.8.2 1.3.1 7.2.2 7.2.2s4.5 0 7.3-.2c.3 0 .9 0 1.5-.2.6-.6.8-2 .8-2s.2-1.7.2-3.4V5.6c0-1.7-.2-3.4-.2-3.4z"/>
                          <path fill="#FFF" d="M8 10V4l5.2 3L8 10z"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.demoContent}>
                  <h3 className={styles.demoTitle}>{video.title}</h3>
                  <p className={styles.demoDescription}>{video.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.demoAction}>
          <a href="/resources" className={styles.exploreBtn}>Explore All Videos</a>
        </div>
      </div>
    </section>
  );
}

