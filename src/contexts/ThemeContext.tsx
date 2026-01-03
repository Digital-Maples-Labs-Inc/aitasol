/**
 * Theme Context
 * Provides global theme colors throughout the application
 * Colors can be managed from the admin portal
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeColors, defaultThemeColors } from '@/types/theme';
import { getActiveTheme, getThemeById } from '@/services/themeService';

interface ThemeContextType {
  colors: ThemeColors;
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
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTheme = async () => {
    try {
      setLoading(true);
      const activeTheme = await getActiveTheme();
      
      if (activeTheme) {
        setTheme(activeTheme);
        setColors(activeTheme.colors);
      } else {
        // Use default colors if no theme found
        setTheme(null);
        setColors(defaultThemeColors);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to default colors on error
      setColors(defaultThemeColors);
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

  return (
    <ThemeContext.Provider value={{ colors, theme, loading, refreshTheme }}>
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

