import { useState, useEffect } from 'react';

interface SiteSettings {
  id: string;
  brandDescription: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  privacyPolicyUrl: string | null;
  termsServiceUrl: string | null;
  marqueeText: string;
  marqueeActive: boolean;
  coursesSectionDesc: string | null;
  facultySectionDesc: string | null;
  testimonialsSectionDesc: string | null;
  demoSectionDesc: string | null;
  currentAffairsSectionDesc: string | null;
  studyMaterialsDesc: string | null;
  strategyArticlesDesc: string | null;
  facultyColumnsDesc: string | null;
  chairmanName: string | null;
  chairmanImage: string | null;
  chairmanMessage: string | null;
  chiefAdvisorName: string | null;
  chiefAdvisorImage: string | null;
  chiefAdvisorMessage: string | null;
  aboutPageFont: string;
  coursesQrCode: string | null;
  updatedAt: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/settings`);

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      setSettings(data.data);
    } catch (err: any) {
      console.error('Error fetching site settings:', err);
      setError(err.message);

      // Fallback to default settings on error
      setSettings({
        id: 'fallback',
        brandDescription: 'Your trusted partner in UPSC preparation. Excellence in education, dedication to your success.',
        address: '123 Main Street, City, State 110001',
        phone: '+91 123 456 7890',
        email: 'info@amigosias.com',
        facebookUrl: '#',
        twitterUrl: '#',
        youtubeUrl: '#',
        instagramUrl: '#',
        privacyPolicyUrl: '/privacy-policy',
        termsServiceUrl: '/terms-of-service',
        marqueeText: '',
        marqueeActive: false,
        coursesSectionDesc: null,
        facultySectionDesc: null,
        testimonialsSectionDesc: null,
        demoSectionDesc: null,
        currentAffairsSectionDesc: null,
        studyMaterialsDesc: null,
        strategyArticlesDesc: null,
        facultyColumnsDesc: null,
        chairmanName: null,
        chairmanImage: null,
        chairmanMessage: null,
        chiefAdvisorName: null,
        chiefAdvisorImage: null,
        chiefAdvisorMessage: null,
        aboutPageFont: 'inherit',
        coursesQrCode: null,
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, error, refetch: fetchSettings };
}
