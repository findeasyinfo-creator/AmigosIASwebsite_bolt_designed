'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Static fallback data
const STATIC_FACULTY = [
  {
    id: 1,
    name: 'Dr. Avinash Kumar',
    subject: 'Political Science & Polity',
    experience: '15+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/men/46.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 2,
    name: 'Prof. Priya Sharma',
    subject: 'History & Indian Culture',
    experience: '12+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 3,
    name: 'Dr. Karthik Reddy',
    subject: 'Geography & Environment',
    experience: '10+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

export function useFaculty(limit?: number) {
  const [faculty, setFaculty] = useState(STATIC_FACULTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'api' | 'static'>('static');

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const response = await fetch(`${API_URL}/faculty`);
        if (!response.ok) throw new Error('Failed to fetch faculty');

        const data = await response.json();
        if (data.success && data.data) {
          const facultyData = limit ? data.data.slice(0, limit) : data.data;

          if (facultyData.length > 0) {
            setFaculty(facultyData);
            setSource('api');
          }
        }
      } catch (err) {
        console.warn('Failed to fetch faculty from API, using static data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    fetchFaculty();
  }, [limit]);

  return { faculty, loading, error, source };
}
