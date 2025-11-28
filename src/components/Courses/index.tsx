'use client'
import Image from 'next/image';
import styles from './Courses.module.css';
import DottedLines from '@/components/DottedLines';

export default function Courses() {
  const courses = [
    {
      title: 'Prelims Foundation',
      subtitle: 'Build Your Base',
      icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png',
      link: '/courses/prelims'
    },
    {
      title: 'Mains Integrated',
      subtitle: 'Master Answer Writing',
      icon: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
      link: '/courses/mains'
    },
    {
      title: 'Interview Guidance',
      subtitle: 'Personality Development',
      icon: 'https://cdn-icons-png.flaticon.com/512/2706/2706962.png',
      link: '/courses/interview'
    },
    {
      title: 'Current Affairs',
      subtitle: 'Daily News & Analysis',
      icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043994.png',
      link: '/courses/current-affairs'
    }
  ];

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
        <p className={styles.sectionSubtitle}>Comprehensive UPSC Programs</p>
        
        <DottedLines />
        
        <div className={styles.coursesWrapper}>
          <div className={styles.coursesContainer}>
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
          {/* Mobile-only UPSC emblem below carousel (theme-specific) */}
          <div className={styles.upscEmblemMobile}>
            {/* Light theme emblem */}
            <Image
              src="/assets/Torch Light Theme.png"
              alt="UPSC Emblem Light"
              width={280}
              height={560}
              className={`${styles.emblemLight}`}
              priority
            />
            {/* Dark theme emblem */}
            <Image
              src="/assets/Torch Dark Theme.png"
              alt="UPSC Emblem Dark"
              width={280}
              height={560}
              className={`${styles.emblemDark}`}
              priority
            />
          </div>
          
          <div className={styles.upscEmblemCard}>
            {/* Light theme emblem */}
            <Image 
              src="/assets/Torch Light Theme.png" 
              alt="UPSC Journey Light" 
              width={280} 
              height={560}
              className={`${styles.emblemImage} ${styles.emblemLight}`}
              priority
            />
            {/* Dark theme emblem */}
            <Image 
              src="/assets/Torch Dark Theme.png" 
              alt="UPSC Journey Dark" 
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
