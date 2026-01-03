/**
 * Root Layout for Expo Router
 * This file is used if you're using Expo Router file-based routing
 * Alternative to App.tsx navigation setup
 */

import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}

