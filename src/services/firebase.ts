/**
 * Firebase configuration and initialization
 * Handles authentication, Firestore, and Storage setup
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration (only log in development)
if (__DEV__ && !firebaseConfig.apiKey) {
  console.error('⚠️ Firebase API key is missing!');
  console.error('Check your .env file and ensure EXPO_PUBLIC_FIREBASE_API_KEY is set.');
  console.error('Current env vars:', {
    apiKey: !!process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: !!process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: !!process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;

