/**
 * DMLabs Login Page (Expo Router)
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LoginScreen } from '@/screens/LoginScreen';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function DMLabs() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin/dashboard');
    }
  }, [user, loading, router]);

  // Don't render anything while checking auth or redirecting
  if (loading || user) {
    return null;
  }

  return (
    <Layout showHeader={false}>
      <LoginScreen />
    </Layout>
  );
}

