/**
 * Layout Component
 * Provides consistent layout structure for pages
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TouchableOpacity, Text } from 'react-native';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  // Debug: Log user state
  if (__DEV__) {
    console.log('Layout - User state:', { user: !!user, loading, userId: user?.id });
  }

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo('/')}>
            <Text style={styles.logo}>Aitasol</Text>
          </TouchableOpacity>
          <View style={styles.nav}>
            <TouchableOpacity onPress={() => navigateTo('/')}>
              <Text style={styles.navLink}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/blog')}>
              <Text style={styles.navLink}>Blog</Text>
            </TouchableOpacity>
            {!loading && user ? (
              <>
                <TouchableOpacity onPress={() => navigateTo('/admin/dashboard')}>
                  <Text style={styles.navLink}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                  <Text style={styles.navLink}>Sign Out</Text>
                </TouchableOpacity>
              </>
            ) : !loading ? (
              <TouchableOpacity onPress={() => navigateTo('/dmlabs')}>
                <Text style={styles.navLink}>Login</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  nav: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  navLink: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
});

