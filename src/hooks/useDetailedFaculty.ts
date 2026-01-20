'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Static fallback data matching the FacultyPageContent format
const STATIC_FACULTY = [
  {
    id: 1,
    name: 'Dr. Avinash Kumar',
    subject: 'Political Science & Polity',
    experience: '15+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/men/46.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    qualification: 'Ph.D. in Political Science, JNU',
    achievements: ['Author of 3 bestselling books', 'Guest lecturer at IAS Training Academy', '500+ successful students'],
    specialization: ['Constitutional Law', 'Indian Governance', 'Public Administration'],
    quote: "Understanding the Constitution is key to understanding India's democratic fabric.",
  },
  {
    id: 2,
    name: 'Prof. Priya Sharma',
    subject: 'History & Indian Culture',
    experience: '12+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    qualification: 'M.A. History, Delhi University',
    achievements: ['Research scholar in Medieval Indian History', 'Published 15+ research papers', 'Expert in Art & Culture'],
    specialization: ['Ancient Indian History', 'Medieval Period', 'Art & Architecture'],
    quote: "History is not just dates and events, it's the story of human civilization.",
  },
  {
    id: 3,
    name: 'Dr. Karthik Reddy',
    subject: 'Geography & Environment',
    experience: '10+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    qualification: 'Ph.D. in Environmental Geography',
    achievements: ['Climate change research expert', 'UN Environment consultant', 'Award-winning educator'],
    specialization: ['Physical Geography', 'Environmental Studies', 'Disaster Management'],
    quote: "Geography shapes civilizations, and understanding it shapes perspectives.",
  },
  {
    id: 4,
    name: 'Dr. Rajesh Verma',
    subject: 'Economics & Current Affairs',
    experience: '14+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    qualification: 'Ph.D. in Economics, LSE London',
    achievements: ['Former RBI economist', 'Economic policy advisor', 'Published economist'],
    specialization: ['Macroeconomics', 'Indian Economy', 'Financial Markets'],
    quote: "Economics is not just numbers, it's about understanding human behavior.",
  },
  {
    id: 5,
    name: 'Ms. Anjali Singh',
    subject: 'Ethics & Essay Writing',
    experience: '11+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    qualification: 'M.A. Philosophy, BHU',
    achievements: ['Ethics & Philosophy expert', 'Essay writing specialist', 'Mentor to 300+ toppers'],
    specialization: ['Applied Ethics', 'Essay Writing', 'Answer Writing'],
    quote: "Ethics is not about rules, it's about making the right choices.",
  },
  {
    id: 6,
    name: 'Dr. Amit Sharma',
    subject: 'Science & Technology',
    experience: '13+ Years Experience',
    photo: 'https://randomuser.me/api/portraits/men/28.jpg',
    videoThumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    qualification: 'Ph.D. in Biotechnology, IIT Delhi',
    achievements: ['Former ISRO scientist', 'Technology policy researcher', 'Innovation expert'],
    specialization: ['Space Technology', 'Biotechnology', 'Digital India'],
    quote: "Science and technology are the engines of progress in modern India.",
  }
];

export function useDetailedFaculty() {
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
        if (data.success && data.data && data.data.length > 0) {
          // Map API data to match the component's expected format
          const mappedFaculty = data.data.map((member: any, index: number) => {
            // Parse achievements and specialization from fullBio or achievements field
            const achievementsArray = member.achievements
              ? member.achievements.split('•').map((a: string) => a.trim()).filter(Boolean)
              : STATIC_FACULTY[index]?.achievements || [];

            const specializationArray = member.fullBio && member.fullBio.includes('Specialization:')
              ? member.fullBio.split('Specialization:')[1]?.split(',').map((s: string) => s.trim()).filter(Boolean)
              : STATIC_FACULTY[index]?.specialization || [];

            const quote = member.fullBio && member.fullBio.includes('Specialization:')
              ? member.fullBio.split('Specialization:')[0]?.trim()
              : member.fullBio || STATIC_FACULTY[index]?.quote || '';

            return {
              id: member.id || index + 1,
              name: member.name,
              subject: member.subject,
              experience: member.experience,
              photo: member.photo,
              videoThumbnail: member.videoThumbnail,
              videoUrl: member.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              qualification: member.qualifications || '',
              achievements: achievementsArray,
              specialization: specializationArray,
              quote: quote
            };
          });

          setFaculty(mappedFaculty);
          setSource('api');
          console.log('✅ Faculty loaded from API');
        }
      } catch (err) {
        console.warn('⚠️ Failed to fetch faculty from API, using static data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    fetchFaculty();
  }, []);

  return { faculty, loading, error, source };
}
