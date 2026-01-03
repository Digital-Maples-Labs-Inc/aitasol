/**
 * Theme Context
 * Provides global theme colors throughout the application
 * Colors can be managed from the admin portal
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeColors, Typography, defaultThemeColors, defaultTypography } from '@/types/theme';
import { getActiveTheme, getThemeById } from '@/services/themeService';

interface ThemeContextType {
  colors: ThemeColors;
  typography: Typography;
  theme: Theme | null;
  loading: boolean;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultThemeColors);
  const [typography, setTypography] = useState<Typography>(defaultTypography);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTheme = async () => {
    try {
      setLoading(true);
      const activeTheme = await getActiveTheme();
      
      if (activeTheme) {
        setTheme(activeTheme);
        setColors(activeTheme.colors);
        setTypography(activeTheme.typography || defaultTypography);
      } else {
        // Use default colors if no theme found
        setTheme(null);
        setColors(defaultThemeColors);
        setTypography(defaultTypography);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to default colors on error
      setColors(defaultThemeColors);
      setTypography(defaultTypography);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const refreshTheme = async () => {
    await loadTheme();
  };

  // Inject Google Fonts for web
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      // Check if font link already exists
      const existingLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (!existingLink) {
        const link1 = document.createElement('link');
        link1.rel = 'preconnect';
        link1.href = 'https://fonts.googleapis.com';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'preconnect';
        link2.href = 'https://fonts.gstatic.com';
        link2.crossOrigin = 'anonymous';
        document.head.appendChild(link2);

        const link3 = document.createElement('link');
        link3.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
        link3.rel = 'stylesheet';
        document.head.appendChild(link3);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ colors, typography, theme, loading, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

