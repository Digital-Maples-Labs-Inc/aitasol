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
      // User authenticated but no Firestore document exists
      throw new Error('User account exists but user data is missing. Please contact an administrator.');
    }
    
    return userData;
  } catch (error: any) {
    console.error('Error signing in:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address format.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled. Please contact an administrator.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later.');
    } else if (error.message) {
      // Use the custom error message if available
      throw error;
    } else {
      throw new Error('An error occurred during sign in. Please try again.');
    }
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

