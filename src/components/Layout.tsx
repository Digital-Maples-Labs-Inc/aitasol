/**
 * Layout Component
 * Provides consistent layout structure for pages
 * Uses enhanced HeaderNavigation component with animations
 */

import React, { ReactNode } from 'react';
import { View, Platform } from 'react-native';
import HeaderNavigation from './HeaderNavigation';
import Footer from './Footer';
import { layoutStyles } from '@/styles/components/Layout.styles';

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
    <View style={layoutStyles.container}>
      {showHeader && <HeaderNavigation currentPath={currentPath} />}
      <View style={layoutStyles.contentWrapper}>
        <View style={layoutStyles.content}>
          {children}
          {showFooter && <Footer />}
        </View>
      </View>
    </View>
  );
};

