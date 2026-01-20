import { useState, useEffect } from 'react';

type CAType = 'daily' | 'weekly' | 'monthly';

export interface CurrentAffair {
  id: number | string;
  type: CAType;
  title: string;
  date: string;
  subject: string;
  paper: string;
  summary: string;
  fullContent: string;
  topics: string[];
  imageUrl?: string;
  issue?: string;
}

interface UseCurrentAffairsOptions {
  type?: CAType;
  subject?: string;
  paper?: string;
  limit?: number;
}

export function useCurrentAffairs(options?: UseCurrentAffairsOptions) {
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentAffairs();
  }, [options?.type, options?.subject, options?.paper]);

  const fetchCurrentAffairs = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

      // Build query parameters
      const params = new URLSearchParams();
      params.append('isActive', 'true');

      if (options?.type) {
        params.append('type', options.type.toUpperCase());
      }
      if (options?.subject) {
        params.append('subject', options.subject);
      }
      if (options?.paper) {
        params.append('paper', options.paper);
      }
      if (options?.limit) {
        params.append('limit', options.limit.toString());
      }

      const response = await fetch(`${API_BASE_URL}/current-affairs?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch current affairs');
      }

      const data = await response.json();
      const items = data.data.items || data.data || [];

      // Convert backend format to frontend format
      const formatted = items.map((item: any) => ({
        ...item,
        id: item.id || item.id,
        type: item.type.toLowerCase() as CAType,
      }));

      setCurrentAffairs(formatted);
    } catch (err: any) {
      console.error('Error fetching current affairs:', err);
      setError(err.message);

      // Fallback to hardcoded data
      setCurrentAffairs(getFallbackData(options));
    } finally {
      setLoading(false);
    }
  };

  return { currentAffairs, loading, error, refetch: fetchCurrentAffairs };
}

// Fallback data for when API fails
function getFallbackData(options?: UseCurrentAffairsOptions): CurrentAffair[] {
  const allData: CurrentAffair[] = [
    {
      id: 1,
      type: 'daily',
      title: 'India-US Relations: Strategic Partnership in 2025',
      date: '2025-11-01',
      subject: 'International Relations',
      paper: 'GS-II',
      summary: 'Comprehensive analysis of bilateral trade agreements and defense cooperation between India and the United States.',
      fullContent: 'Detailed coverage of evolving India-US strategic alignment: defence technology sharing (COMCASA / BECA outcomes), Indo-Pacific maritime cooperation, critical technologies, bilateral trade negotiations (agri, digital services), and impact on regional power balance. Includes timeline, key agreements, exam-oriented analytical points and potential mains answer frameworks.',
      topics: ['Diplomacy', 'Trade', 'Defense'],
      imageUrl: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 2,
      type: 'daily',
      title: 'Climate Change and Agricultural Impact',
      date: '2025-10-28',
      subject: 'Environment',
      paper: 'GS-III',
      summary: 'Understanding the effects of changing weather patterns on Indian agriculture and food security.',
      fullContent: 'Assessment of changing monsoon variability, heat stress on staple crops (rice/wheat), soil moisture decline, adaptation strategies (micro-irrigation, climate resilient seeds), government schemes (PMKSY, NICRA), policy gaps and integrated mitigation approach relevant for UPSC GS-III answers.',
      topics: ['Climate', 'Agriculture', 'Food Security'],
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 3,
      type: 'daily',
      title: 'Digital India Initiative: Progress and Challenges',
      date: '2025-10-25',
      subject: 'Governance',
      paper: 'GS-II',
      summary: 'Evaluation of digital infrastructure development and its impact on public service delivery.',
      fullContent: 'Review of Digital India pillars: broadband highways, universal mobile access, e-Governance reforms, data empowerment & privacy concerns, interoperability challenges, digital divide (rural connectivity), emerging tech stack (India Stack, ONDC) with governance implications and probable ethics case studies.',
      topics: ['Technology', 'E-Governance', 'Digital India'],
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 7,
      type: 'daily',
      title: 'Supreme Court Ruling on Environmental Protection',
      date: '2025-11-04',
      subject: 'Environment',
      paper: 'GS-III',
      summary: 'Historic judgment strengthening safeguards and imposing stricter penalties for violations.',
      fullContent: 'Case background, legal principles invoked (Article 21, polluter pays), statutory frameworks (EPA 1986, Forest Conservation), implications for sustainable development doctrine, enforcement challenges and ethical dimensions (intergenerational equity).',
      topics: ['Judiciary', 'Environment', 'Policy'],
      imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop&q=80',
    },
    {
      id: 8,
      type: 'daily',
      title: "IMF Revises India's Growth Projections Upward",
      date: '2025-11-05',
      subject: 'Economy',
      paper: 'GS-III',
      summary: 'Updated forecast citing strong domestic demand and infrastructure investments.',
      fullContent: 'Drivers of upward revision (consumption resilience, infra multiplier, export mix), risks (external shocks, crude volatility), policy stance (RBI balancing inflation & growth), and integration into mains macro answer frameworks.',
      topics: ['IMF', 'GDP', 'Infrastructure'],
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop&q=80',
    },
  ];

  // Apply filters
  let filtered = allData;

  if (options?.type) {
    filtered = filtered.filter(item => item.type === options.type);
  }
  if (options?.subject) {
    filtered = filtered.filter(item => item.subject === options.subject);
  }
  if (options?.paper) {
    filtered = filtered.filter(item => item.paper === options.paper);
  }
  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}
