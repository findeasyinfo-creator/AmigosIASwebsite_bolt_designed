'use client'
import { useRef } from 'react'
import Image from 'next/image'
import styles from './Testimonials.module.css'
import DottedLines from '@/components/DottedLines'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    rank: 'AIR 12 • 2023',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5,
    text: 'My answer writing improved drastically. The mocks and feedback were on point.',
    tilt: 'tilt1'
  },
  {
    name: 'Priya Sharma',
    rank: 'AIR 45 • 2023',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5,
    text: 'Clear strategy for Prelims + Mains. Mentors were available whenever needed.',
    tilt: 'tilt2'
  },
  {
    name: 'Ananya Reddy',
    rank: 'AIR 8 • 2023',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    stars: 5,
    text: 'Focused mentorship and smart scheduling helped me stay consistent.',
    tilt: 'tilt3'
  },
  {
    name: 'Karthik Reddy',
    rank: 'AIR 78 • 2023',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    stars: 4,
    text: 'Great current affairs coverage and timely revisions before the exam.',
    tilt: 'tilt2'
  },
]

const successStories = [
  {
    id: 1,
    name: 'Priya Sharma',
    rank: 'AIR 45',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    videoId: 'jfKfPfyJRdk',
    journey: '18 Months',
    attempt: '1st',
    story: 'From day one preparation to final success - a journey of dedication and smart work.'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    rank: 'AIR 12',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    videoId: 'LXb3EKWsInQ',
    journey: '24 Months',
    attempt: '2nd',
    story: 'Persistence and focused preparation led to top rank achievement.'
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    rank: 'AIR 8',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    videoId: '9bZkp7q19f0',
    journey: '20 Months',
    attempt: '1st',
    story: 'Strategic planning and consistent effort made the difference.'
  },
  {
    id: 4,
    name: 'Karthik Reddy',
    rank: 'AIR 78',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    journey: '16 Months',
    attempt: '1st',
    story: 'Great current affairs coverage and timely revisions made the difference.'
  },
]

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

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
