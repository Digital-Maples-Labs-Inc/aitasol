/**
 * Hook to require authentication
 * Redirects to login if user is not authenticated
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export const useRequireAuth = (requiredRole?: UserRole) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
        return;
      }

      if (requiredRole === 'admin' && user.role !== 'admin') {
        router.replace('/');
        return;
      }
    }
  }, [user, loading, requiredRole, router]);

  return { user, loading };
};

