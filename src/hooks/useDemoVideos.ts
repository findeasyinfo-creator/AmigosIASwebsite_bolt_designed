import { useState, useEffect } from 'react';

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useDemoVideos() {
  const [demoVideos, setDemoVideos] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDemoVideos();
  }, []);

  const fetchDemoVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/demo-videos?isActive=true`);

      if (!response.ok) {
        throw new Error('Failed to fetch demo videos');
      }

      const data = await response.json();
      const sortedVideos = (data.data || []).sort((a: DemoVideo, b: DemoVideo) => a.order - b.order);
      setDemoVideos(sortedVideos);
    } catch (err: any) {
      console.error('Error fetching demo videos:', err);
      setError(err.message);

      // Fallback to hardcoded data on error
      setDemoVideos([
        {
          id: 'fallback-1',
          title: 'UPSC Prelims Strategy',
          description: 'Complete guide to prepare for UPSC Prelims examination with effective strategies and time management.',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
          videoId: 'jfKfPfyJRdk',
          order: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'fallback-2',
          title: 'Essay Writing Masterclass',
          description: 'Learn the art of writing high-scoring essays for UPSC Mains examination with examples and techniques.',
          thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
          videoId: 'LXb3EKWsInQ',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'fallback-3',
          title: 'Current Affairs Analysis',
          description: 'Daily current affairs updates with UPSC perspective and analysis for better understanding.',
          thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
          videoId: '9bZkp7q19f0',
          order: 2,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { demoVideos, loading, error, refetch: fetchDemoVideos };
}
