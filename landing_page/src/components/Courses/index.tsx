import Image from 'next/image';
import styles from './Courses.module.css';

export default function Courses() {
  const courses = [
    {
      title: 'Prelims Foundation',
      subtitle: 'Build Your Base',
      icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png'
    },
    {
      title: 'Mains Integrated',
      subtitle: 'Master Answer Writing',
      icon: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png'
    },
    {
      title: 'Interview Guidance',
      subtitle: 'Personality Development',
      icon: 'https://cdn-icons-png.flaticon.com/512/2706/2706962.png'
    },
    {
      title: 'Current Affairs',
      subtitle: 'Daily News & Analysis',
      icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043994.png'
    }
  ];

  return (
    <section className={styles.coursesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Courses</h2>
        <p className={styles.sectionSubtitle}>Comprehensive UPSC Programs</p>
        
        <div className={styles.coursesContainer}>
          <div className={styles.coursesGrid}>
            {courses.map((course, index) => (
              <div key={index} className={styles.courseCard}>
                <div className={styles.courseIcon}>
                  <Image src={course.icon} alt={course.title} width={60} height={60} />
                </div>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseSubtitle}>{course.subtitle}</p>
                <button className={styles.courseBtn}>Explore Course</button>
              </div>
            ))}
          </div>
          
          <div className={styles.upscEmblem}>
            <Image 
              src="/assets/upsc-emblem-nobg.png" 
              alt="UPSC Journey" 
              width={280} 
              height={560}
              className={`${styles.emblemImage} ${styles.emblemBlack}`}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
