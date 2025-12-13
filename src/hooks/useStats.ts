import { useState, useEffect } from 'react';

interface Stat {
  id: string;
  icon: 'trophy' | 'users' | 'graduation' | 'star';
  number: string;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/stats?isActive=true`);

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();

      // Sort by order
      const sortedStats = (data.data || []).sort((a: Stat, b: Stat) => a.order - b.order);
      setStats(sortedStats);
    } catch (err: any) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'Failed to load stats');

      // Fallback to hardcoded data if fetch fails
      setStats([
        {
          id: '1',
          icon: 'trophy',
          number: '200+',
          label: 'Selections',
          order: 0,
          isActive: true,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          icon: 'users',
          number: '4,000+',
          label: 'Students',
          order: 1,
          isActive: true,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '3',
          icon: 'graduation',
          number: '10+',
          label: 'years of coaching experience',
          order: 2,
          isActive: true,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '4',
          icon: 'star',
          number: 'No 1',
          label: 'for CSE preparation',
          order: 3,
          isActive: true,
          createdAt: '',
          updatedAt: '',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchStats };
}
