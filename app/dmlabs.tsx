/**
 * DMLabs Login Page (Expo Router)
 */

import { View, ActivityIndicator, Platform } from 'react-native';
import { LoginScreen } from '@/screens/LoginScreen';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function DMLabs() {
  const { user, loading } = useAuth();

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

  // Redirect to dashboard if already logged in (using window.location for web)
  if (user) {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = '/admin/dashboard';
      return (
        <Layout showHeader={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        </Layout>
      );
    }
  }

  // Show login page if not logged in
  return (
    <Layout showHeader={false}>
      <LoginScreen />
    </Layout>
  );
}

