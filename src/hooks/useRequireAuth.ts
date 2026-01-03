/**
 * Hook to require authentication
 * Redirects to login if user is not authenticated
 */

import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export const useRequireAuth = (requiredRole?: UserRole) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.location.href = '/dmlabs';
        }
        return;
      }

      if (requiredRole === 'admin' && user.role !== 'admin') {
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return;
      }
    }
  }, [user, loading, requiredRole]);

  return { user, loading };
};

