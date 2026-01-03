/**
 * Layout Component
 * Provides consistent layout structure for pages
 * Uses enhanced HeaderNavigation component with animations
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderNavigation } from './HeaderNavigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true,
  showFooter = true,
}) => {
  // Get current path for active link highlighting
  const currentPath =
    Platform.OS === 'web' && typeof window !== 'undefined'
      ? window.location.pathname
      : undefined;

  return (
    <View style={styles.container}>
      {showHeader && <HeaderNavigation currentPath={currentPath} />}
      <View style={styles.contentWrapper}>
        <View style={styles.content}>{children}</View>
      </View>
      {showFooter && <Footer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...(Platform.OS === 'web' && {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }),
  },
  contentWrapper: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      minHeight: 0,
      overflow: 'auto',
    }),
  },
  content: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      paddingBottom: 40, // Add padding to prevent footer overlap
    }),
  },
});

