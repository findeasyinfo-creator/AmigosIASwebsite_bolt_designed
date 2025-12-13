import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  AuthUser,
  HeroSlide,
  CreateHeroSlideDto,
  UpdateHeroSlideDto,
  Course,
  CreateCourseDto,
  UpdateCourseDto,
  Faculty,
  CreateFacultyDto,
  UpdateFacultyDto,
} from '@/types/api.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Token management
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

const clearToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Base fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      // Extract error message from API response
      const errorMessage = data.message || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

// API Methods
export const api = {
  // Authentication
  auth: {
    login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
      const response = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Store token after successful login
      if (response.success && response.data.token) {
        setToken(response.data.token);
      }

      return response;
    },

    logout: async (): Promise<void> => {
      clearToken();
      // Optionally call backend logout endpoint if it exists
      try {
        await apiFetch('/auth/logout', {
          method: 'POST',
        });
      } catch (error) {
        // Ignore errors on logout
      }
    },

    getMe: async (): Promise<ApiResponse<AuthUser>> => {
      return apiFetch<AuthUser>('/auth/me', {
        method: 'GET',
      });
    },
  },

  // Hero Slides
  heroSlides: {
    getAll: async (): Promise<ApiResponse<HeroSlide[]>> => {
      return apiFetch<HeroSlide[]>('/hero-slides', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<HeroSlide>> => {
      return apiFetch<HeroSlide>(`/hero-slides/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: CreateHeroSlideDto): Promise<ApiResponse<HeroSlide>> => {
      return apiFetch<HeroSlide>('/hero-slides', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: UpdateHeroSlideDto): Promise<ApiResponse<HeroSlide>> => {
      return apiFetch<HeroSlide>(`/hero-slides/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/hero-slides/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Courses
  courses: {
    getAll: async (): Promise<ApiResponse<Course[]>> => {
      return apiFetch<Course[]>('/courses', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<Course>> => {
      return apiFetch<Course>(`/courses/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: CreateCourseDto): Promise<ApiResponse<Course>> => {
      return apiFetch<Course>('/courses', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: UpdateCourseDto): Promise<ApiResponse<Course>> => {
      return apiFetch<Course>(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/courses/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Faculty
  faculty: {
    getAll: async (): Promise<ApiResponse<Faculty[]>> => {
      return apiFetch<Faculty[]>('/faculty', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<Faculty>> => {
      return apiFetch<Faculty>(`/faculty/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: CreateFacultyDto): Promise<ApiResponse<Faculty>> => {
      return apiFetch<Faculty>('/faculty', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: UpdateFacultyDto): Promise<ApiResponse<Faculty>> => {
      return apiFetch<Faculty>(`/faculty/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/faculty/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Stats
  stats: {
    getAll: async (): Promise<ApiResponse<any[]>> => {
      return apiFetch<any[]>('/stats', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/stats/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/stats', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/stats/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/stats/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Success Stories
  successStories: {
    getAll: async (): Promise<ApiResponse<any[]>> => {
      return apiFetch<any[]>('/success-stories', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/success-stories/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/success-stories', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/success-stories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/success-stories/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Testimonials
  testimonials: {
    getAll: async (): Promise<ApiResponse<any[]>> => {
      return apiFetch<any[]>('/testimonials', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/testimonials/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/testimonials', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/testimonials/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Features
  features: {
    getAll: async (): Promise<ApiResponse<any[]>> => {
      return apiFetch<any[]>('/features', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/features/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/features', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/features/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/features/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Demo Videos
  demoVideos: {
    getAll: async (): Promise<ApiResponse<any[]>> => {
      return apiFetch<any[]>('/demo-videos', {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/demo-videos/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/demo-videos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/demo-videos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/demo-videos/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Site Settings (Singleton)
  settings: {
    get: async (): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/settings', {
        method: 'GET',
      });
    },

    update: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  },

  // Current Affairs
  currentAffairs: {
    getAll: async (params?: any): Promise<ApiResponse<any>> => {
      const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
      return apiFetch<any>(`/current-affairs${queryParams}`, {
        method: 'GET',
      });
    },

    getById: async (id: string): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/current-affairs/${id}`, {
        method: 'GET',
      });
    },

    create: async (data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>('/current-affairs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse<any>> => {
      return apiFetch<any>(`/current-affairs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
      return apiFetch<void>(`/current-affairs/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

// Export token management functions for use in other parts of the app
export { getToken, setToken, clearToken };
