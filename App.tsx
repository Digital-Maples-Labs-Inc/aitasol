/**
 * Main App Entry Point
 * Sets up routing and authentication context
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { EditingModeProvider } from '@/contexts/EditingModeContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import RetellChatWidget from '@/components/RetellChatWidget';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import BlogListScreen from '@/screens/BlogListScreen';
import { BlogDetailScreen } from '@/screens/BlogDetailScreen';
import LoginScreen from '@/screens/LoginScreen';
import AboutScreen from '@/screens/AboutScreen';
import ServicesScreen from '@/screens/ServicesScreen';
import ServiceDetailScreen from '@/screens/ServiceDetailScreen';
import TestimonialsScreen from '@/screens/TestimonialsScreen';
import ContactScreen from '@/screens/ContactScreen';
import PrivacyScreen from '@/screens/PrivacyScreen';
import TermsScreen from '@/screens/TermsScreen';
import FAQScreen from '@/screens/FAQScreen';
import { AdminDashboardScreen } from '@/screens/AdminDashboardScreen';
import AdminPagesWrapper from '@/screens/admin-dashboard/components/AdminPagesWrapper';
import AdminBlogsWrapper from '@/screens/admin-dashboard/components/AdminBlogsWrapper';
import AdminThemeWrapper from '@/screens/admin-dashboard/components/AdminThemeWrapper';

const Stack = createNativeStackNavigator();

// Configure linking for web URLs
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Home: '/',
      About: '/about',
      Services: '/services',
      ServiceDetail: '/services/:slug',
      Testimonials: '/testimonials',
      Blog: '/blog',
      BlogDetail: '/blog/:slug',
      Contact: '/contact',
      Privacy: '/privacy',
      Terms: '/terms',
      FAQ: '/faq',
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
      <EditingModeProvider>
        <ThemeProvider>
          <GoogleAnalytics />
          {/* <RetellChatWidget /> */}
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
                name="About"
                component={AboutScreen}
              />
              <Stack.Screen
                name="Services"
                component={ServicesScreen}
              />
              <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetailScreen}
              />
              <Stack.Screen
                name="Testimonials"
                component={TestimonialsScreen}
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
                name="Contact"
                component={ContactScreen}
              />
              <Stack.Screen
                name="Privacy"
                component={PrivacyScreen}
              />
              <Stack.Screen
                name="Terms"
                component={TermsScreen}
              />
              <Stack.Screen
                name="FAQ"
                component={FAQScreen}
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
                component={AdminPagesWrapper}
              />
              <Stack.Screen
                name="AdminBlogs"
                component={AdminBlogsWrapper}
              />
              <Stack.Screen
                name="AdminTheme"
                component={AdminThemeWrapper}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </EditingModeProvider>
    </AuthProvider>
  );
}

