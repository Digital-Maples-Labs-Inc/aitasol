/**
 * Layout Component
 * Provides consistent layout structure for pages
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.logo}>Aitasol</Text>
          </TouchableOpacity>
          <View style={styles.nav}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.navLink}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/blog')}>
              <Text style={styles.navLink}>Blog</Text>
            </TouchableOpacity>
            {user ? (
              <>
                <TouchableOpacity onPress={() => router.push('/admin/dashboard')}>
                  <Text style={styles.navLink}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                  <Text style={styles.navLink}>Sign Out</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.navLink}>Login</Text>
              </TouchableOpacity>
            )}
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

