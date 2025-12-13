'use client'
import { useRef } from 'react'
import Image from 'next/image'
import styles from './Testimonials.module.css'
import DottedLines from '@/components/DottedLines'
import { useTestimonials } from '@/hooks/useTestimonials'
import { useSuccessStories } from '@/hooks/useSuccessStories'

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { testimonials, loading: testimonialsLoading } = useTestimonials()
  const { successStories, loading: storiesLoading } = useSuccessStories()

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Success Stories Section */}
        <div className={styles.successStoriesSection}>
          <h2 className={styles.sectionTitle}>Success Stories</h2>
          
          <DottedLines />

          {/* Combined Success Story Cards (Video + Text) */}
          <div className={styles.successStoriesGrid}>
            {successStories.map((story, index) => (
              <div key={story.id} className={styles.successStoryCard}>
                {/* Video Thumbnail/Player */}
                <div className={styles.storyVideoContainer}>
                  <iframe
                    src={`https://www.youtube.com/embed/${story.videoId}?rel=0&modestbranding=1`}
                    title={`${story.name} UPSC Journey`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={styles.storyVideoFrame}
                    loading="lazy"
                  ></iframe>
                </div>
                
                {/* Story Details */}
                <div className={styles.storyDetails}>
                  <div className={styles.storyHeader}>
                    <h3 className={styles.storyName}>{story.name}</h3>
                    <div className={styles.storyRankBadge}>
                      <span className={styles.storyRankText}>{story.rank}</span>
                      <span className={styles.storyYear}>{story.year}</span>
                    </div>
                  </div>
                  <p className={styles.storyText}>{story.story}</p>
                  <div className={styles.storyStats}>
                    <div className={styles.storyStat}>
                      <span className={styles.storyStatLabel}>Journey</span>
                      <span className={styles.storyStatValue}>{story.journey}</span>
                    </div>
                    <div className={styles.storyStat}>
                      <span className={styles.storyStatLabel}>Attempt</span>
                      <span className={styles.storyStatValue}>{story.attempt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Testimonials Section */}
        <div className={styles.studentTestimonialsSection}>
          <h2 className={styles.sectionTitle} style={{ marginTop: '4rem' }}>Student Testimonials</h2>
          
          <DottedLines />

          {/* Testimonials Carousel */}
          <div className={styles.carouselBlock}>
            <div className={styles.tCarousel}>
              <div className={styles.tTrack} ref={trackRef}>
                {testimonials.map((testimonial, index) => (
                  <article
                    key={index}
                    className={`${styles.tCard} ${styles[testimonial.tilt]}`}
                    data-stars={testimonial.stars}
                    tabIndex={0}
                    role="article"
                    aria-label={`${testimonial.name}'s testimonial`}
                  >
                    {/* Letter format: Description first */}
                    <div className={styles.tBody}>
                      <p className={styles.tText}>{testimonial.text}</p>
                    </div>
                    {/* Name at the bottom */}
                    <div className={styles.tCardFooter}>
                      <div className={styles.tCardInfo}>
                        <h4 className={styles.tName}>{testimonial.name}</h4>
                        <p className={styles.tRole}>{testimonial.rank}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
