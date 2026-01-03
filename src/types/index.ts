/**
 * Core type definitions for the education consultancy platform
 */

export type UserRole = 'admin' | 'editor';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageSection {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'cta';
  content: string;
  editable: boolean;
  metadata?: {
    imageUrl?: string;
    imageAlt?: string;
    buttonText?: string;
    buttonLink?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  sections: PageSection[];
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: Date;
  createdAt: Date;
  published: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  authorName?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  featuredImage?: string;
  tags?: string[];
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document';
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, role?: UserRole) => Promise<void>;
}

// Re-export theme types
export * from './theme';

