'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Static fallback data matching the CoursesPageContent format
const STATIC_COURSES = [
  {
    id: 1,
    title: 'UPSC Prep+ Foundation Course',
    category: 'foundation',
    duration: '12 Months',
    fees: '₹80,000',
    startDate: 'January 2026',
    icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png',
    description: 'Comprehensive foundation course covering entire UPSC syllabus with integrated current affairs',
    fullDescription: 'Our flagship Foundation Course is meticulously designed to build a strong conceptual foundation for UPSC aspirants. This comprehensive 12-month program covers the entire UPSC syllabus across all papers, with integrated current affairs analysis. The course includes daily classes by expert faculty, comprehensive study materials, regular assessments, and personalized mentoring sessions. We focus on building analytical skills, answer writing techniques, and examination strategies from the ground up.',
    features: ['Complete Syllabus Coverage', 'Daily Current Affairs', 'Test Series', 'Study Materials', 'Doubt Clearing Sessions', 'Personal Mentorship', 'Online Portal Access'],
    bankDetails: {
      accountName: 'Amigos IAS Academy',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Hyderabad Main Branch',
      upiId: 'amigosias@sbi',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
    },
  },
  {
    id: 2,
    title: 'Prelims Intensive Program',
    category: 'prelims',
    duration: '6 Months',
    fees: '₹45,000',
    startDate: 'December 2025',
    icon: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
    description: 'Focused preparation for UPSC Prelims with comprehensive test series and analysis',
    fullDescription: 'The Prelims Intensive Program is specifically crafted for aspirants targeting the UPSC Preliminary examination. This 6-month rigorous program focuses on building accuracy, speed, and strategic thinking required for clearing Prelims. The course includes subject-wise detailed coverage, 50+ full-length mock tests, daily practice questions, current affairs integration, and detailed performance analysis. Our expert faculty provides proven strategies for effective time management and intelligent guessing techniques.',
    features: ['Subject-wise Classes', '50+ Mock Tests', 'Performance Analysis', 'Revision Classes', 'Previous Year Papers', 'Strategy Sessions', 'Daily Practice Questions'],
    bankDetails: {
      accountName: 'Amigos IAS Academy',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Hyderabad Main Branch',
      upiId: 'amigosias@sbi',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
    },
  },
  {
    id: 3,
    title: 'Mains Answer Writing Program',
    category: 'mains',
    duration: '4 Months',
    fees: '₹35,000',
    startDate: 'February 2026',
    icon: 'https://cdn-icons-png.flaticon.com/512/2706/2706962.png',
    description: 'Master the art of answer writing with expert guidance and regular evaluation',
    fullDescription: 'Transform your preparation with our specialized Mains Answer Writing Program. This intensive 4-month course is designed to help you master the art of structured, analytical, and high-scoring answer writing. The program includes daily answer writing practice, expert evaluation with detailed feedback, exposure to diverse question patterns, model answer discussions, and personalized guidance on improving writing style. We focus on developing multi-dimensional thinking, contemporary relevance, and presentation skills.',
    features: ['Answer Writing Practice', 'Expert Evaluation', 'Model Answers', 'Weekly Tests', 'Personalized Feedback', 'Diagram & Flowchart Training', 'Time Management Skills'],
    bankDetails: {
      accountName: 'Amigos IAS Academy',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Hyderabad Main Branch',
      upiId: 'amigosias@sbi',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
    },
  },
  {
    id: 4,
    title: 'Interview Guidance Program',
    category: 'interview',
    duration: '2 Months',
    fees: '₹25,000',
    startDate: 'March 2026',
    icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043994.png',
    description: 'Comprehensive personality development and mock interview sessions',
    fullDescription: 'Our Interview Guidance Program prepares you for the final and most critical stage of UPSC examination. This comprehensive 2-month program includes multiple mock interviews with retired civil servants and subject experts, personality development workshops, current affairs discussions, communication skills enhancement, and body language training. We conduct panel discussions, situation-based assessments, and provide individual feedback sessions to build confidence and polish your personality for the UPSC interview board.',
    features: ['Mock Interviews', 'Panel Discussions', 'Current Affairs Focus', 'Communication Skills', 'Body Language Training', 'DAF Analysis', 'Confidence Building Workshops'],
    bankDetails: {
      accountName: 'Amigos IAS Academy',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Hyderabad Main Branch',
      upiId: 'amigosias@sbi',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
    },
  },
  {
    id: 5,
    title: 'Optional Subject: History',
    category: 'optional',
    duration: '8 Months',
    fees: '₹40,000',
    startDate: 'January 2026',
    icon: 'https://cdn-icons-png.flaticon.com/512/3079/3079508.png',
    description: 'In-depth coverage of History optional with answer writing practice',
    fullDescription: 'Our History Optional program offers comprehensive coverage of both ancient, medieval, and modern Indian history along with world history. This 8-month intensive course is taught by renowned historians with proven track records. The program includes detailed topic-wise classes, answer writing practice, regular tests, previous year question analysis, and continuous evaluation. We provide extensive study materials, maps, timeline charts, and thematic analysis to help you build a strong conceptual understanding and scoring ability.',
    features: ['Complete Syllabus', 'Answer Writing', 'Study Materials', 'Test Series', 'Previous Year Analysis', 'Map Practice', 'Timeline & Events', 'Thematic Approach'],
    bankDetails: {
      accountName: 'Amigos IAS Academy',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Hyderabad Main Branch',
      upiId: 'amigosias@sbi',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
    },
  },
  {
    id: 6,
    title: 'Weekend Batch - Working Professionals',
    category: 'weekend',
    duration: '12 Months',
    fees: '₹75,000',
    startDate: 'January 2026',
    icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png',
    description: 'Flexible weekend classes designed for working professionals',
    fullDescription: 'Specially designed for working professionals and college students, our Weekend Batch provides comprehensive UPSC preparation without compromising your current commitments. This 12-month program runs on Saturdays and Sundays with flexible timings. All sessions are recorded and made available online for revision. The course covers the complete UPSC syllabus, includes test series, current affairs classes, and doubt-clearing sessions. We provide condensed yet comprehensive coverage optimized for time-constrained aspirants.',
    features: ['Saturday & Sunday Classes', 'Online Recordings', 'Flexible Schedule', 'Complete Coverage', 'Test Series', 'Current Affairs Updates', 'Mobile App Access', 'Study Materials'],
    bankDetails: {
      accountName: 'Amigos IAS Academy',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Hyderabad Main Branch',
      upiId: 'amigosias@sbi',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
    },
  },
];

export function useDetailedCourses() {
  const [courses, setCourses] = useState(STATIC_COURSES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'api' | 'static'>('static');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');

        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          // Map API data to match the component's expected format
          const mappedCourses = data.data.map((course: any) => ({
            id: course.id,
            title: course.title,
            category: course.category,
            duration: course.duration,
            fees: course.fees,
            startDate: course.startDate,
            icon: course.icon,
            description: course.description,
            fullDescription: course.fullDescription,
            features: course.features || [],
            bankDetails: {
              accountName: course.bankAccountName || 'Amigos IAS Academy',
              accountNumber: course.bankAccountNumber || '1234567890',
              ifsc: course.bankIFSC || 'SBIN0001234',
              bankName: course.bankName || 'State Bank of India',
              branch: course.bankBranch || 'Hyderabad Main Branch',
              upiId: course.upiId || 'amigosias@sbi',
              qrCode: course.upiId
                ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${course.upiId}&pn=AmigosIAS`
                : 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amigosias@sbi&pn=AmigosIAS'
            }
          }));

          setCourses(mappedCourses);
          setSource('api');
          console.log('✅ Courses loaded from API');
        }
      } catch (err) {
        console.warn('⚠️ Failed to fetch courses from API, using static data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, loading, error, source };
}
