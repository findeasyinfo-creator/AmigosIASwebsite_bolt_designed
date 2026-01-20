import { useState, useEffect } from 'react';

interface SuccessStory {
  id: string;
  name: string;
  rank: string;
  year: string;
  image?: string;
  videoId: string;
  journey: string;
  attempt: string;
  story: string;
  order: number;
  isActive: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Fallback data in case API fails
const fallbackSuccessStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    rank: 'AIR 45',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    videoId: 'jfKfPfyJRdk',
    journey: '18 Months',
    attempt: '1st',
    story: 'From day one preparation to final success - a journey of dedication and smart work.',
    order: 0,
    isActive: true,
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    rank: 'AIR 12',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    videoId: 'LXb3EKWsInQ',
    journey: '24 Months',
    attempt: '2nd',
    story: 'Persistence and focused preparation led to top rank achievement.',
    order: 1,
    isActive: true,
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    rank: 'AIR 8',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    videoId: '9bZkp7q19f0',
    journey: '20 Months',
    attempt: '1st',
    story: 'Strategic planning and consistent effort made the difference.',
    order: 2,
    isActive: true,
  },
  {
    id: '4',
    name: 'Karthik Reddy',
    rank: 'AIR 78',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    videoId: 'dQw4w9WgXcQ',
    journey: '16 Months',
    attempt: '1st',
    story: 'Great current affairs coverage and timely revisions made the difference.',
    order: 3,
    isActive: true,
  },
];

export function useSuccessStories() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(fallbackSuccessStories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuccessStories() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/success-stories?isActive=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch success stories');
        }

        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          // Sort by order
          const sortedStories = data.data.sort((a: SuccessStory, b: SuccessStory) => a.order - b.order);
          setSuccessStories(sortedStories);
        }
      } catch (err) {
        console.error('Error fetching success stories:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    }

    fetchSuccessStories();
  }, []);

  return { successStories, loading, error };
}
