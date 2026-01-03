/**
 * Main App Entry Point
 * Sets up routing and authentication context
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screens/HomeScreen';
import { BlogListScreen } from '@/screens/BlogListScreen';
import { BlogDetailScreen } from '@/screens/BlogDetailScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { AdminDashboardScreen } from '@/screens/AdminDashboardScreen';
import { AdminPagesScreen } from '@/screens/AdminPagesScreen';
import { AdminBlogsScreen } from '@/screens/AdminBlogsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Blog"
            component={BlogListScreen}
            options={{ title: 'Blog' }}
          />
          <Stack.Screen
            name="BlogDetail"
            component={BlogDetailScreen}
            options={{ title: 'Blog Post' }}
          />
          <Stack.Screen
            name="DMLabs"
            component={LoginScreen}
            options={{ title: 'DMLabs', headerShown: false }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ title: 'Admin Dashboard' }}
          />
          <Stack.Screen
            name="AdminPages"
            component={AdminPagesScreen}
            options={{ title: 'Manage Pages' }}
          />
          <Stack.Screen
            name="AdminBlogs"
            component={AdminBlogsScreen}
            options={{ title: 'Manage Blogs' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

