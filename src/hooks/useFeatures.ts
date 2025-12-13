import { useState, useEffect } from 'react';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/features?isActive=true`);

      if (!response.ok) {
        throw new Error('Failed to fetch features');
      }

      const data = await response.json();
      const sortedFeatures = (data.data || []).sort((a: Feature, b: Feature) => a.order - b.order);
      setFeatures(sortedFeatures);
    } catch (err: any) {
      console.error('Error fetching features:', err);
      setError(err.message);

      // Fallback to hardcoded data on error
      setFeatures([
        {
          id: 'fallback-1',
          title: 'Daily Prelims AI Quizes',
          subtitle: 'Adaptive Practice & Analysis',
          icon: 'https://image.pollinations.ai/prompt/modern%20ai%20quiz%20app%20icon%20with%20brain%20and%20neural%20network?width=200&height=200&nologo=true',
          order: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'fallback-2',
          title: 'Mains Answer Writing',
          subtitle: 'AI-Driven Evaluation & Feedback',
          icon: 'https://image.pollinations.ai/prompt/ai%20powered%20writing%20assistant%20icon%20with%20pen%20and%20stars?width=200&height=200&nologo=true',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'fallback-3',
          title: '24/7 Support',
          subtitle: '24/7 News & Summaries',
          icon: 'https://image.pollinations.ai/prompt/24%207%20support%20icon%20with%20clock%20and%20headset?width=200&height=200&nologo=true',
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

  return { features, loading, error, refetch: fetchFeatures };
}
