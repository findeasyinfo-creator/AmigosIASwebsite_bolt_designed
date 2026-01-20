'use client'
import Image from 'next/image';
import styles from './Courses.module.css';
import DottedLines from '@/components/DottedLines';
import { useCourses } from '@/hooks/useCourses';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Courses() {
  const { courses, loading } = useCourses();
  const { settings } = useSiteSettings();

  const handleCourseClick = (courseTitle: string, link: string) => {
    console.log(`Selected course: ${courseTitle}`);
    // Navigate to course page or contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Future: Add navigation to course detail page
    // window.location.href = link;
  };

  return (
    <section className={styles.coursesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Courses</h2>
        <p className={styles.sectionSubtitle}>{settings?.coursesSectionDesc || 'Comprehensive UPSC Programs'}</p>
        
        <DottedLines />
        
        <div className={styles.coursesWrapper}>
          <div className={styles.coursesContainer}>
            {/* Mobile unified emblem inside container */}
            <div className={styles.upscEmblemMobile}>
              <Image
                src="/assets/Torch-LBSNAA-Programs.png"
                alt="LBSNAA Programs"
                width={260}
                height={520}
                className={`${styles.emblemLight}`}
                priority
              />
              <Image
                src="/assets/Torch-LBSNAA-Programs-Dark.png"
                alt="LBSNAA Programs Dark"
                width={260}
                height={520}
                className={`${styles.emblemDark}`}
                priority
              />
            </div>
            <div className={styles.coursesGrid}>
              {courses.map((course, index) => (
                <div 
                  key={index} 
                  className={styles.courseCard}
                  onClick={() => handleCourseClick(course.title, course.link)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCourseClick(course.title, course.link);
                    }
                  }}
                >
                  <div className={styles.courseIcon}>
                    <span
                      className={styles.iconMask}
                      role="img"
                      aria-label={course.title}
                      style={{ WebkitMaskImage: `url(${course.icon})`, maskImage: `url(${course.icon})` }}
                    />
                  </div>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseSubtitle}>{course.subtitle}</p>
                  <a 
                    href="/courses"
                    className={styles.exploreCourseBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Explore Courses
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.upscEmblemCard}>
            {/* Light theme emblem */}
            <Image 
              src="/assets/Torch-LBSNAA-Programs.png" 
              alt="LBSNAA Programs" 
              width={280} 
              height={560}
              className={`${styles.emblemImage} ${styles.emblemLight}`}
              priority
            />
            {/* Dark theme emblem */}
            <Image 
              src="/assets/Torch-LBSNAA-Programs-Dark.png" 
              alt="LBSNAA Programs Dark" 
              width={280} 
              height={560}
              className={`${styles.emblemImage} ${styles.emblemDark}`}
              priority
            />
          </div>
        </div>
        
        <div className={styles.bottomButtonArea}>
          <a href="/courses" className={styles.exploreAllCoursesBtn}>
            Explore All Courses
            <span className={styles.buttonArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
