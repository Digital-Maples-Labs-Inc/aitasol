/**
 * User service
 * Handles user data operations
 */

import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from '@/types';

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        email: data.email || '',
        role: (data.role === 'admin' || data.role === 'editor') ? data.role : 'editor',
        displayName: data.displayName,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
    
    console.log(`Loaded ${users.length} users from Firestore`);
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

