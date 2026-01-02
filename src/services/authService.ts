/**
 * Authentication service
 * Handles user authentication and role management
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User, UserRole } from '@/types';

/**
 * Get user document from Firestore
 */
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        uid: userDoc.id,
        email: data.email,
        role: data.role as UserRole,
        displayName: data.displayName,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserData(userCredential.user.uid);
    
    if (!userData) {
      throw new Error('User data not found');
    }
    
    return userData;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign up new user (admin only operation)
 */
export const signUp = async (
  email: string,
  password: string,
  role: UserRole = 'editor'
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    const userData = {
      email,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    
    return {
      uid: userCredential.user.uid,
      email,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current authenticated user with role data
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      return null;
    }
    
    return await getUserData(firebaseUser.uid);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

