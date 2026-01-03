/**
 * DMLabs Login Page (Expo Router)
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
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

  // Show loading while checking auth
  if (loading) {
    return (
      <Layout showHeader={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </Layout>
    );
  }

  // Redirect if logged in (handled by useEffect)
  if (user) {
    return null;
  }

  // Show login page if not logged in
  return (
    <Layout showHeader={false}>
      <LoginScreen />
    </Layout>
  );
}

