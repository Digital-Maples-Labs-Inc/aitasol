/**
 * Page service
 * Handles CRUD operations for pages
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
  serverTimestamp,
  Timestamp,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import { Page, PageSection } from '@/types';

/**
 * Get page by slug
 */
export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  try {
    const pagesRef = collection(db, 'pages');
    const q = query(pagesRef, where('slug', '==', slug), where('published', '==', true));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const docData = querySnapshot.docs[0].data();
    return {
      id: querySnapshot.docs[0].id,
      slug: docData.slug,
      title: docData.title,
      sections: docData.sections || [],
      seoTitle: docData.seoTitle,
      seoDescription: docData.seoDescription,
      updatedAt: docData.updatedAt?.toDate() || new Date(),
      createdAt: docData.createdAt?.toDate() || new Date(),
      published: docData.published || false,
    };
  } catch (error) {
    console.error('Error getting page:', error);
    throw error;
  }
};

/**
 * Get all pages (admin/editor only)
 */
export const getAllPages = async (): Promise<Page[]> => {
  try {
    const pagesRef = collection(db, 'pages');
    const querySnapshot = await getDocs(pagesRef);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        sections: data.sections || [],
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        updatedAt: data.updatedAt?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        published: data.published || false,
      };
    });
  } catch (error) {
    console.error('Error getting all pages:', error);
    throw error;
  }
};

/**
 * Create or update page
 */
export const savePage = async (page: Partial<Page> & { slug: string; title: string }): Promise<string> => {
  try {
    const pageData = {
      slug: page.slug,
      title: page.title,
      sections: page.sections || [],
      seoTitle: page.seoTitle || '',
      seoDescription: page.seoDescription || '',
      published: page.published ?? false,
      updatedAt: serverTimestamp(),
      ...(page.id ? {} : { createdAt: serverTimestamp() }),
    };
    
    if (page.id) {
      // Update existing page
      await updateDoc(doc(db, 'pages', page.id), pageData);
      return page.id;
    } else {
      // Create new page
      const newDocRef = doc(collection(db, 'pages'));
      await setDoc(newDocRef, pageData);
      return newDocRef.id;
    }
  } catch (error) {
    console.error('Error saving page:', error);
    throw error;
  }
};

/**
 * Update page section
 */
export const updatePageSection = async (
  pageId: string,
  sectionId: string,
  section: Partial<PageSection>
): Promise<void> => {
  try {
    const pageRef = doc(db, 'pages', pageId);
    const pageDoc = await getDoc(pageRef);
    
    if (!pageDoc.exists()) {
      throw new Error('Page not found');
    }
    
    const pageData = pageDoc.data();
    const sections = pageData.sections || [];
    const sectionIndex = sections.findIndex((s: PageSection) => s.id === sectionId);
    
    if (sectionIndex === -1) {
      throw new Error('Section not found');
    }
    
    sections[sectionIndex] = { ...sections[sectionIndex], ...section };
    
    await updateDoc(pageRef, {
      sections,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating page section:', error);
    throw error;
  }
};

/**
 * Delete page
 */
export const deletePage = async (pageId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'pages', pageId));
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
};

/**
 * Subscribe to page by slug with real-time updates
 * Returns an unsubscribe function
 */
export const subscribeToPageBySlug = (
  slug: string,
  callback: (page: Page | null) => void
): Unsubscribe => {
  const pagesRef = collection(db, 'pages');
  const q = query(pagesRef, where('slug', '==', slug), where('published', '==', true));

  return onSnapshot(
    q,
    (querySnapshot) => {
      if (querySnapshot.empty) {
        callback(null);
        return;
      }

      const docData = querySnapshot.docs[0].data();
      const page: Page = {
        id: querySnapshot.docs[0].id,
        slug: docData.slug,
        title: docData.title,
        sections: docData.sections || [],
        seoTitle: docData.seoTitle,
        seoDescription: docData.seoDescription,
        updatedAt: docData.updatedAt?.toDate() || new Date(),
        createdAt: docData.createdAt?.toDate() || new Date(),
        published: docData.published || false,
      };
      callback(page);
    },
    (error) => {
      console.error('Error subscribing to page:', error);
      callback(null);
    }
  );
};

/**
 * Update page section content with real-time sync
 */
export const updatePageSectionContent = async (
  pageId: string,
  sectionId: string,
  content: string
): Promise<void> => {
  try {
    const pageRef = doc(db, 'pages', pageId);
    const pageDoc = await getDoc(pageRef);
    
    if (!pageDoc.exists()) {
      throw new Error('Page not found');
    }
    
    const pageData = pageDoc.data();
    const sections = pageData.sections || [];
    const sectionIndex = sections.findIndex((s: PageSection) => s.id === sectionId);
    
    if (sectionIndex === -1) {
      throw new Error('Section not found');
    }
    
    sections[sectionIndex] = { 
      ...sections[sectionIndex], 
      content,
      updatedAt: new Date().toISOString(),
    };
    
    await updateDoc(pageRef, {
      sections,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating page section content:', error);
    throw error;
  }
};

/**
 * Update page section image with real-time sync
 * Creates the section if it doesn't exist
 */
export const updatePageSectionImage = async (
  pageId: string,
  sectionId: string,
  imageUrl: string,
  imageAlt?: string
): Promise<void> => {
  try {
    const pageRef = doc(db, 'pages', pageId);
    const pageDoc = await getDoc(pageRef);
    
    if (!pageDoc.exists()) {
      throw new Error('Page not found');
    }
    
    const pageData = pageDoc.data();
    const sections = pageData.sections || [];
    const sectionIndex = sections.findIndex((s: PageSection) => s.id === sectionId);
    
    if (sectionIndex === -1) {
      // Section doesn't exist, create it
      const newSection: PageSection = {
        id: sectionId,
        type: 'image',
        content: imageUrl,
        editable: true,
        metadata: {
          imageUrl,
          imageAlt: imageAlt || 'Site logo',
        },
      };
      sections.push(newSection);
    } else {
      // Section exists, update it
      sections[sectionIndex] = { 
        ...sections[sectionIndex], 
        content: imageUrl,
        metadata: {
          ...sections[sectionIndex].metadata,
          imageUrl,
          imageAlt: imageAlt || sections[sectionIndex].metadata?.imageAlt || '',
        },
        updatedAt: new Date().toISOString(),
      };
    }
    
    await updateDoc(pageRef, {
      sections,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating page section image:', error);
    throw error;
  }
};

