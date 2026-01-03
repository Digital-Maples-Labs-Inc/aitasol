/**
 * Layout Component
 * Provides consistent layout structure for pages
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TouchableOpacity, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.logo}>Aitasol</Text>
          </TouchableOpacity>
          <View style={styles.nav}>
            <Link href="/" asChild>
              <TouchableOpacity>
                <Text style={styles.navLink}>Home</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/blog" asChild>
              <TouchableOpacity>
                <Text style={styles.navLink}>Blog</Text>
              </TouchableOpacity>
            </Link>
            {!loading && user ? (
              <>
                <Link href="/admin/dashboard" asChild>
                  <TouchableOpacity>
                    <Text style={styles.navLink}>Dashboard</Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity onPress={handleSignOut}>
                  <Text style={styles.navLink}>Sign Out</Text>
                </TouchableOpacity>
              </>
            ) : !loading ? (
              <Link href="/dmlabs" asChild>
                <TouchableOpacity>
                  <Text style={styles.navLink}>Login</Text>
                </TouchableOpacity>
              </Link>
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

