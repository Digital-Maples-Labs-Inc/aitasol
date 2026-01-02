/**
 * Root Layout for Expo Router
 * This file is used if you're using Expo Router file-based routing
 * Alternative to App.tsx navigation setup
 */

import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#1a1a1a',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="blog" options={{ title: 'Blog' }} />
        <Stack.Screen name="blog/[slug]" options={{ title: 'Blog Post' }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="admin/dashboard" options={{ title: 'Admin Dashboard' }} />
        <Stack.Screen name="admin/pages" options={{ title: 'Manage Pages' }} />
        <Stack.Screen name="admin/blogs" options={{ title: 'Manage Blogs' }} />
      </Stack>
    </AuthProvider>
  );
}

