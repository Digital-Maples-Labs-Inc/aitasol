/**
 * DMLabs Login Page (Expo Router)
 */

import { View, ActivityIndicator, Platform, Text } from 'react-native';
import { LoginScreen } from '@/screens/LoginScreen';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function DMLabs() {
  const { user, loading } = useAuth();

  // Debug log
  if (__DEV__) {
    console.log('DMLabs page rendering:', { user: !!user, loading, path: typeof window !== 'undefined' ? window.location.pathname : 'N/A' });
  }

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
      // Use setTimeout to avoid blocking render
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 100);
      return (
        <Layout showHeader={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 16, color: '#666' }}>Redirecting...</Text>
          </View>
        </Layout>
      );
    }
  }

  // Show login page if not logged in
  console.log('Rendering LoginScreen');
  return (
    <Layout showHeader={false}>
      <LoginScreen />
    </Layout>
  );
}

