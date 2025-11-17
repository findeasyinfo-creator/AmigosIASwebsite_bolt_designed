'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import styles from './Testimonials.module.css'

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
  {
    name: 'Priya Sharma',
    rank: 'AIR 102 • 2023',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    stars: 5,
    text: 'The test series simulated the real exam perfectly—huge confidence boost.',
    tilt: 'tilt1'
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
  const [selectedStory, setSelectedStory] = useState(successStories[0])
  
  const handleTestimonialClick = (testimonial: { name: string }) => {
    // If a testimonial corresponds to a success story by name, update the main video/details
    const matched = successStories.find((s) => s.name === testimonial.name)
    if (matched) {
      setSelectedStory(matched)
    }
  }

  const scroll = (direction: number) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.querySelector(`.${styles.tCard}`)?.clientWidth || 300
      trackRef.current.scrollBy({ left: direction * (cardWidth + 18), behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Success Stories & Testimonials</h2>
        
        {/* Student Journey Section with Video Cards */}
        <div className={styles.videoSection}>
          <h3 className={styles.videoTitle}>Meet Our UPSC Success Stories</h3>
          
          {/* Main Display Area */}
          <div className={styles.mainDisplay}>
            <div className={styles.mainVideoContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedStory.videoId}`}
                title={`${selectedStory.name} UPSC Journey`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.mainVideoFrame}
              ></iframe>
            </div>
            <div className={styles.mainInfo}>
              <div className={styles.mainRankBadge}>
                <span className={styles.mainRankText}>{selectedStory.rank}</span>
                <span className={styles.mainRankYear}>{selectedStory.year}</span>
              </div>
              <h4 className={styles.mainName}>{selectedStory.name}</h4>
              <p className={styles.mainStory}>{selectedStory.story}</p>
              <div className={styles.mainStats}>
                <div className={styles.mainStat}>
                  <span className={styles.mainStatNumber}>{selectedStory.journey}</span>
                  <span className={styles.mainStatLabel}>Journey</span>
                </div>
                <div className={styles.mainStat}>
                  <span className={styles.mainStatNumber}>{selectedStory.rank}</span>
                  <span className={styles.mainStatLabel}>Final Rank</span>
                </div>
                <div className={styles.mainStat}>
                  <span className={styles.mainStatNumber}>{selectedStory.attempt}</span>
                  <span className={styles.mainStatLabel}>Attempt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <h3 className={styles.carouselTitle}>What Our Toppers Say</h3>
        <p className={styles.clickNote}>💡 Click on any card to watch their success story video</p>
        <div className={styles.tCarousel}>
          <div className={styles.tTrack} ref={trackRef}>
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className={`${styles.tCard} ${styles[testimonial.tilt]}`}
                onClick={() => handleTestimonialClick(testimonial)}
                tabIndex={0}
                role="button"
                aria-label={`View ${testimonial.name}'s story`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTestimonialClick(testimonial)
                  }
                }}
              >
                <div className={styles.tCardHeader}>
                  <Image src={testimonial.image} alt={testimonial.name} width={75} height={75} className={styles.tAvatar} />
                  <div className={styles.tCardInfo}>
                    <h4 className={styles.tName}>{testimonial.name}</h4>
                    <p className={styles.tRole}>{testimonial.rank}</p>
                  </div>
                </div>
                <div className={styles.tBody}>
                  <div className={styles.tStars} aria-label={`${testimonial.stars} out of 5`}>
                    {'★'.repeat(testimonial.stars)}{'☆'.repeat(5 - testimonial.stars)}
                  </div>
                  <p className={styles.tText}>{testimonial.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
