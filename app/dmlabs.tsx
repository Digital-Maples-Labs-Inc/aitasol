/**
 * DMLabs Login Page (Expo Router)
 */

import { View, ActivityIndicator, Platform, Text, StyleSheet } from 'react-native';
import { LoginScreen } from '@/screens/LoginScreen';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function DMLabs() {
  const { user, loading } = useAuth();

  // Debug log
  console.log('🔵 DMLabs page rendering:', { 
    user: !!user, 
    loading, 
    path: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
    href: typeof window !== 'undefined' ? window.location.href : 'N/A'
  });

  // Show loading while checking auth
  if (loading) {
    console.log('⏳ DMLabs: Loading auth state');
    return (
      <Layout showHeader={false}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Layout>
    );
  }

  // Redirect to dashboard if already logged in
  if (user) {
    console.log('✅ DMLabs: User logged in, redirecting to dashboard');
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 100);
      return (
        <Layout showHeader={false}>
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Redirecting to dashboard...</Text>
          </View>
        </Layout>
      );
    }
  }

  // Show login page if not logged in
  console.log('🔐 DMLabs: Rendering LoginScreen');
  return (
    <Layout showHeader={false}>
      <LoginScreen />
    </Layout>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
});

