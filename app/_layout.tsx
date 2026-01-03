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
        {/* Expo Router automatically creates routes from files in app/ directory */}
        {/* Only define custom options for specific screens if needed */}
        <Stack.Screen 
          name="index" 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="dmlabs" 
          options={{ title: 'DMLabs', headerShown: false }} 
        />
      </Stack>
    </AuthProvider>
  );
}

