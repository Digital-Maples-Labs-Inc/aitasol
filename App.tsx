/**
 * Main App Entry Point
 * Sets up routing and authentication context
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { HomeScreen } from '@/screens/HomeScreen';
import { BlogListScreen } from '@/screens/BlogListScreen';
import { BlogDetailScreen } from '@/screens/BlogDetailScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { AdminDashboardScreen } from '@/screens/AdminDashboardScreen';
import { AdminPagesScreen } from '@/screens/AdminPagesScreen';
import { AdminBlogsScreen } from '@/screens/AdminBlogsScreen';
import { AdminThemeScreen } from '@/screens/AdminThemeScreen';

const Stack = createNativeStackNavigator();

// Configure linking for web URLs
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Home: '/',
      Blog: '/blog',
      BlogDetail: '/blog/:slug',
      DMLabs: '/dmlabs',
      AdminDashboard: '/admin/dashboard',
      AdminPages: '/admin/pages',
      AdminBlogs: '/admin/blogs',
      AdminTheme: '/admin/theme',
    },
  },
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer linking={Platform.OS === 'web' ? linking : undefined}>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false, // Hide React Navigation header, use our custom header
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              name="Blog"
              component={BlogListScreen}
            />
            <Stack.Screen
              name="BlogDetail"
              component={BlogDetailScreen}
            />
            <Stack.Screen
              name="DMLabs"
              component={LoginScreen}
            />
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboardScreen}
            />
            <Stack.Screen
              name="AdminPages"
              component={AdminPagesScreen}
            />
            <Stack.Screen
              name="AdminBlogs"
              component={AdminBlogsScreen}
            />
            <Stack.Screen
              name="AdminTheme"
              component={AdminThemeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

