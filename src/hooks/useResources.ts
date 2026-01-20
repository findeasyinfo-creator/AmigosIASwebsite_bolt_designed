'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export type ResourceCategory = 'STUDY_MATERIAL' | 'NCERT' | 'PYQ' | 'NOTES' | 'OTHER';

export interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  subject: string;
  description?: string;
  fileUrl?: string;
  fileSize?: string;
  pages?: string;
  year?: string;
  classLevel?: string;
  stage?: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseResourcesOptions {
  category?: ResourceCategory;
  subject?: string;
  year?: string;
  classLevel?: string;
  stage?: string;
  limit?: number;
}

export function useResources(options?: UseResourcesOptions) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('isActive', 'true');

        if (options?.category) {
          params.append('category', options.category);
        }
        if (options?.subject) {
          params.append('subject', options.subject);
        }
        if (options?.year) {
          params.append('year', options.year);
        }
        if (options?.classLevel) {
          params.append('classLevel', options.classLevel);
        }
        if (options?.stage) {
          params.append('stage', options.stage);
        }
        if (options?.limit) {
          params.append('limit', options.limit.toString());
        }

        const response = await fetch(`${API_URL}/resources?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch resources');

        const data = await response.json();
        if (data.success) {
          const items = data.data.items || data.data || [];
          // Sort by order
          const sortedResources = items.sort((a: Resource, b: Resource) => a.order - b.order);
          setResources(sortedResources);
        }
      } catch (err) {
        console.error('Failed to fetch resources:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, [options?.category, options?.subject, options?.year, options?.classLevel, options?.stage, options?.limit]);

  return { resources, loading, error };
}

export function useResourceFilterOptions() {
  const [options, setOptions] = useState<{
    categories: string[];
    subjects: string[];
    years: string[];
    classLevels: string[];
    stages: string[];
  }>({
    categories: [],
    subjects: [],
    years: [],
    classLevels: [],
    stages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch(`${API_URL}/resources/filter-options`);
        if (!response.ok) throw new Error('Failed to fetch filter options');

        const data = await response.json();
        if (data.success && data.data) {
          setOptions(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, []);

  return { options, loading };
}
