// Base API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'CONTENT_EDITOR';
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// Hero Slide Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  ctaEnabled: boolean;
  imageUrl: string | null;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHeroSlideDto {
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaEnabled?: boolean;
  imageUrl?: string;
  features?: string[];
  isActive?: boolean;
  order?: number;
}

export interface UpdateHeroSlideDto {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaEnabled?: boolean;
  imageUrl?: string;
  features?: string[];
  isActive?: boolean;
  order?: number;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  fees: string;
  startDate?: string | null;
  icon?: string | null;
  description: string;
  fullDescription?: string | null;
  features: string[];
  isOnline: boolean;
  isOffline: boolean;
  isActive: boolean;
  order: number;
  displayOnHome: boolean;
  bankAccountName?: string | null;
  bankAccountNumber?: string | null;
  bankIFSC?: string | null;
  bankName?: string | null;
  bankBranch?: string | null;
  upiId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseDto {
  title: string;
  category: string;
  duration: string;
  fees: string;
  startDate?: string;
  icon?: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  isOnline?: boolean;
  isOffline?: boolean;
  isActive?: boolean;
  order?: number;
  displayOnHome?: boolean;
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankIFSC?: string;
  bankName?: string;
  bankBranch?: string;
  upiId?: string;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

// Faculty Types
export interface Faculty {
  id: string;
  name: string;
  designation: string;
  subject: string;
  experience: string;
  qualifications?: string | null;
  achievements?: string | null;
  photo?: string | null;
  videoThumbnail?: string | null;
  videoUrl?: string | null;
  fullBio?: string | null;
  isActive: boolean;
  order: number;
  displayOnHome: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFacultyDto {
  name: string;
  designation: string;
  subject: string;
  experience: string;
  qualifications?: string;
  achievements?: string;
  photo?: string;
  videoThumbnail?: string;
  videoUrl?: string;
  fullBio?: string;
  isActive?: boolean;
  order?: number;
  displayOnHome?: boolean;
}

export interface UpdateFacultyDto extends Partial<CreateFacultyDto> {}
