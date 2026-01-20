import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  rank: string;
  image?: string;
  stars: number;
  text: string;
  tilt: string;
  order: number;
  isActive: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Fallback data in case API fails
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rank: 'AIR 12 • 2023',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5,
    text: 'My answer writing improved drastically. The mocks and feedback were on point.',
    tilt: 'tilt1',
    order: 0,
    isActive: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rank: 'AIR 45 • 2023',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 4,
    text: 'Clear strategy for Prelims + Mains. Mentors were available whenever needed.',
    tilt: 'tilt2',
    order: 1,
    isActive: true,
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    rank: 'AIR 8 • 2023',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    stars: 3,
    text: 'Focused mentorship and smart scheduling helped me stay consistent.',
    tilt: 'tilt3',
    order: 2,
    isActive: true,
  },
  {
    id: '4',
    name: 'Karthik Reddy',
    rank: 'AIR 78 • 2023',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    stars: 2,
    text: 'Great current affairs coverage and timely revisions before the exam.',
    tilt: 'tilt2',
    order: 3,
    isActive: true,
  },
];

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/testimonials?isActive=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          // Sort by order
          const sortedTestimonials = data.data.sort((a: Testimonial, b: Testimonial) => a.order - b.order);
          setTestimonials(sortedTestimonials);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
