/**
 * Admin Dashboard Screen
 * Main dashboard for content management
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export const AdminDashboardScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  useRequireAuth();

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, {user?.email}</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateTo('/admin/pages')}
        >
          <Text style={styles.cardIcon}>📄</Text>
          <Text style={styles.cardTitle}>Manage Pages</Text>
          <Text style={styles.cardDescription}>
            Edit home, about, services, and contact pages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateTo('/admin/blogs')}
        >
          <Text style={styles.cardIcon}>✍️</Text>
          <Text style={styles.cardTitle}>Manage Blogs</Text>
          <Text style={styles.cardDescription}>
            Create, edit, and publish blog posts
          </Text>
        </TouchableOpacity>

        {user?.role === 'admin' && (
          <>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigateTo('/admin/theme')}
            >
              <Text style={styles.cardIcon}>🎨</Text>
              <Text style={styles.cardTitle}>Theme & Colors</Text>
              <Text style={styles.cardDescription}>
                Customize global colors and styling
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigateTo('/admin/users')}
            >
              <Text style={styles.cardIcon}>👥</Text>
              <Text style={styles.cardTitle}>Manage Users</Text>
              <Text style={styles.cardDescription}>
                Add and manage editors and admins
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  signOutButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  signOutText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

