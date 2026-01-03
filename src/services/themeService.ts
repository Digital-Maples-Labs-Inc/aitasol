/**
 * Theme Service
 * Handles CRUD operations for theme colors in Firestore
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Theme, ThemeColors, Typography } from '@/types/theme';

/**
 * Get active theme
 */
export const getActiveTheme = async (): Promise<Theme | null> => {
  try {
    const themesRef = collection(db, 'themes');
    const q = query(themesRef, where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const docData = querySnapshot.docs[0].data();
    return {
      id: querySnapshot.docs[0].id,
      name: docData.name || 'Default Theme',
      colors: docData.colors as ThemeColors,
      typography: docData.typography as Typography,
      isActive: docData.isActive || false,
      updatedAt: docData.updatedAt?.toDate() || new Date(),
      createdAt: docData.createdAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error('Error getting active theme:', error);
    throw error;
  }
};

/**
 * Get theme by ID
 */
export const getThemeById = async (themeId: string): Promise<Theme | null> => {
  try {
    const themeRef = doc(db, 'themes', themeId);
    const themeDoc = await getDoc(themeRef);
    
    if (!themeDoc.exists()) {
      return null;
    }
    
    const docData = themeDoc.data();
    return {
      id: themeDoc.id,
      name: docData.name || 'Default Theme',
      colors: docData.colors as ThemeColors,
      typography: docData.typography as Typography,
      isActive: docData.isActive || false,
      updatedAt: docData.updatedAt?.toDate() || new Date(),
      createdAt: docData.createdAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error('Error getting theme:', error);
    throw error;
  }
};

/**
 * Get all themes
 */
export const getAllThemes = async (): Promise<Theme[]> => {
  try {
    const themesRef = collection(db, 'themes');
    const querySnapshot = await getDocs(themesRef);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Default Theme',
        colors: data.colors as ThemeColors,
        typography: data.typography as Typography,
        isActive: data.isActive || false,
        updatedAt: data.updatedAt?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error('Error getting all themes:', error);
    throw error;
  }
};

/**
 * Create or update theme
 */
export const saveTheme = async (
  theme: Partial<Theme> & { colors: ThemeColors; typography: Typography; name: string }
): Promise<string> => {
  try {
    const themeData = {
      name: theme.name,
      colors: theme.colors,
      typography: theme.typography,
      isActive: theme.isActive ?? false,
      updatedAt: serverTimestamp(),
      ...(theme.id ? {} : { createdAt: serverTimestamp() }),
    };
    
    if (theme.id) {
      // Update existing theme
      await updateDoc(doc(db, 'themes', theme.id), themeData);
      return theme.id;
    } else {
      // Create new theme
      const newDocRef = doc(collection(db, 'themes'));
      await setDoc(newDocRef, themeData);
      return newDocRef.id;
    }
  } catch (error) {
    console.error('Error saving theme:', error);
    throw error;
  }
};

/**
 * Set theme as active (deactivates others)
 */
export const setActiveTheme = async (themeId: string): Promise<void> => {
  try {
    // First, deactivate all themes
    const themesRef = collection(db, 'themes');
    const querySnapshot = await getDocs(themesRef);
    
    const deactivatePromises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { isActive: false })
    );
    
    await Promise.all(deactivatePromises);
    
    // Then activate the selected theme
    await updateDoc(doc(db, 'themes', themeId), {
      isActive: true,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error setting active theme:', error);
    throw error;
  }
};

/**
 * Delete theme
 */
export const deleteTheme = async (themeId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'themes', themeId), {
      isActive: false,
      updatedAt: serverTimestamp(),
    });
    // Note: We don't actually delete, just deactivate to preserve history
  } catch (error) {
    console.error('Error deleting theme:', error);
    throw error;
  }
};

