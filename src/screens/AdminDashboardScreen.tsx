/**
 * Admin Dashboard Screen
 * Main dashboard for content management
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { Layout } from '@/components/Layout';
import { adminDashboardScreenStyles } from '@/styles/screens/AdminDashboardScreen.styles';

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
    <Layout>
      <ScrollView style={adminDashboardScreenStyles.container}>
        <View style={adminDashboardScreenStyles.header}>
          <Text style={adminDashboardScreenStyles.title}>Admin Dashboard</Text>
          <Text style={adminDashboardScreenStyles.subtitle}>Welcome, {user?.email}</Text>
          <TouchableOpacity style={adminDashboardScreenStyles.signOutButton} onPress={handleSignOut}>
            <Text style={adminDashboardScreenStyles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={adminDashboardScreenStyles.content}>
          <TouchableOpacity
            style={adminDashboardScreenStyles.card}
            onPress={() => navigateTo('/admin/pages')}
          >
            <Text style={adminDashboardScreenStyles.cardIcon}>📄</Text>
            <Text style={adminDashboardScreenStyles.cardTitle}>Manage Pages</Text>
            <Text style={adminDashboardScreenStyles.cardDescription}>
              Edit home, about, services, and contact pages
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={adminDashboardScreenStyles.card}
            onPress={() => navigateTo('/admin/blogs')}
          >
            <Text style={adminDashboardScreenStyles.cardIcon}>✍️</Text>
            <Text style={adminDashboardScreenStyles.cardTitle}>Manage Blogs</Text>
            <Text style={adminDashboardScreenStyles.cardDescription}>
              Create, edit, and publish blog posts
            </Text>
          </TouchableOpacity>

          {user?.role === 'admin' && (
            <>
              <TouchableOpacity
                style={adminDashboardScreenStyles.card}
                onPress={() => navigateTo('/admin/theme')}
              >
                <Text style={adminDashboardScreenStyles.cardIcon}>🎨</Text>
                <Text style={adminDashboardScreenStyles.cardTitle}>Theme & Colors</Text>
                <Text style={adminDashboardScreenStyles.cardDescription}>
                  Customize global colors and styling
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={adminDashboardScreenStyles.card}
                onPress={() => navigateTo('/admin/users')}
              >
                <Text style={adminDashboardScreenStyles.cardIcon}>👥</Text>
                <Text style={adminDashboardScreenStyles.cardTitle}>Manage Users</Text>
                <Text style={adminDashboardScreenStyles.cardDescription}>
                  Add and manage editors and admins
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

