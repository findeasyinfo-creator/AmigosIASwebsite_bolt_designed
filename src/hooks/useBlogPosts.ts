'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export type BlogCategory = 'STRATEGY' | 'FACULTY_COLUMN' | 'NEWS_ANALYSIS' | 'EXAM_TIPS' | 'STUDY_GUIDE';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  author: string;
  authorImage?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  readTime?: string;
  publishedAt?: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseBlogPostsOptions {
  category?: BlogCategory;
  limit?: number;
  featured?: boolean;
}

export function useBlogPosts(options?: UseBlogPostsOptions) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('isActive', 'true');

        if (options?.category) {
          params.append('category', options.category);
        }
        if (options?.limit) {
          params.append('limit', options.limit.toString());
        }
        if (options?.featured !== undefined) {
          params.append('isFeatured', options.featured.toString());
        }

        const response = await fetch(`${API_URL}/blog-posts?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch blog posts');

        const data = await response.json();
        if (data.success) {
          const items = data.data.items || data.data || [];
          // Sort by order, then by publishedAt
          const sortedPosts = items.sort((a: BlogPost, b: BlogPost) => {
            if (a.order !== b.order) return a.order - b.order;
            if (a.publishedAt && b.publishedAt) {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            }
            return 0;
          });
          setPosts(sortedPosts);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [options?.category, options?.limit, options?.featured]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/blog-posts/slug/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch blog post');

        const data = await response.json();
        if (data.success && data.data) {
          setPost(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
