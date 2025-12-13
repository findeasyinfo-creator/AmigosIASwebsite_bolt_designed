'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Static fallback data
const STATIC_COURSES = [
  {
    id: 1,
    title: 'Prelims Foundation',
    subtitle: 'Build Your Base',
    icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050318.png',
    link: '/courses/prelims'
  },
  {
    id: 2,
    title: 'Mains Integrated',
    subtitle: 'Master Answer Writing',
    icon: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
    link: '/courses/mains'
  },
  {
    id: 3,
    title: 'Interview Guidance',
    subtitle: 'Personality Development',
    icon: 'https://cdn-icons-png.flaticon.com/512/2706/2706962.png',
    link: '/courses/interview'
  },
  {
    id: 4,
    title: 'Current Affairs',
    subtitle: 'Daily News & Analysis',
    icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043994.png',
    link: '/courses/current-affairs'
  }
];

export function useCourses() {
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
        if (data.success && data.data) {
          // Map API data to component format
          const mappedCourses = data.data.slice(0, 4).map((course: any, index: number) => ({
            id: course.id || index + 1,
            title: course.title,
            subtitle: course.description?.substring(0, 50) || '',
            icon: course.icon || STATIC_COURSES[index]?.icon || '',
            link: `/courses/${course.category || 'details'}`
          }));

          if (mappedCourses.length > 0) {
            setCourses(mappedCourses);
            setSource('api');
          }
        }
      } catch (err) {
        console.warn('Failed to fetch courses from API, using static data:', err);
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
