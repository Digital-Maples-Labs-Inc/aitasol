/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { signIn, signOut, signUp, getCurrentUser } from '@/services/authService';
import { User, UserRole, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const userData = await signIn(email, password);
    setUser(userData);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleSignUp = async (email: string, password: string, role?: UserRole) => {
    const userData = await signUp(email, password, role);
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn: handleSignIn,
    signOut: handleSignOut,
    signUp: handleSignUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

