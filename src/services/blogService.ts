/**
 * Blog service
 * Handles CRUD operations for blog posts
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Blog } from '@/types';

/**
 * Get all published blogs
 */
export const getPublishedBlogs = async (limitCount: number = 10): Promise<Blog[]> => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(
      blogsRef,
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        authorName: data.authorName,
        status: data.status,
        publishedAt: data.publishedAt?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        featuredImage: data.featuredImage,
        tags: data.tags || [],
      };
    });
  } catch (error) {
    console.error('Error getting published blogs:', error);
    throw error;
  }
};

/**
 * Get blog by slug
 */
export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const data = querySnapshot.docs[0].data();
    return {
      id: querySnapshot.docs[0].id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      authorName: data.authorName,
      status: data.status,
      publishedAt: data.publishedAt?.toDate(),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      featuredImage: data.featuredImage,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error('Error getting blog:', error);
    throw error;
  }
};

/**
 * Get all blogs (admin/editor only)
 */
export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        authorName: data.authorName,
        status: data.status,
        publishedAt: data.publishedAt?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        featuredImage: data.featuredImage,
        tags: data.tags || [],
      };
    });
  } catch (error) {
    console.error('Error getting all blogs:', error);
    throw error;
  }
};

/**
 * Create or update blog
 */
export const saveBlog = async (blog: Partial<Blog> & { title: string; slug: string }): Promise<string> => {
  try {
    const blogData = {
      title: blog.title,
      slug: blog.slug,
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      author: blog.author || '',
      authorName: blog.authorName || '',
      status: blog.status || 'draft',
      featuredImage: blog.featuredImage || '',
      tags: blog.tags || [],
      updatedAt: serverTimestamp(),
      ...(blog.status === 'published' && !blog.publishedAt
        ? { publishedAt: serverTimestamp() }
        : blog.publishedAt
        ? { publishedAt: blog.publishedAt }
        : {}),
      ...(blog.id ? {} : { createdAt: serverTimestamp() }),
    };
    
    if (blog.id) {
      await updateDoc(doc(db, 'blogs', blog.id), blogData);
      return blog.id;
    } else {
      const newDocRef = doc(collection(db, 'blogs'));
      await setDoc(newDocRef, blogData);
      return newDocRef.id;
    }
  } catch (error) {
    console.error('Error saving blog:', error);
    throw error;
  }
};

/**
 * Delete blog
 */
export const deleteBlog = async (blogId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'blogs', blogId));
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

/**
 * Publish blog
 */
export const publishBlog = async (blogId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'blogs', blogId), {
      status: 'published',
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error publishing blog:', error);
    throw error;
  }
};

/**
 * Unpublish blog
 */
export const unpublishBlog = async (blogId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'blogs', blogId), {
      status: 'draft',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error unpublishing blog:', error);
    throw error;
  }
};

