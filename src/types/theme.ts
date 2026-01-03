/**
 * Theme color definitions
 * Based on the color palette provided
 */

export interface ThemeColors {
  // Primary colors
  primary: string;        // Main brand color (e.g., #0099FF)
  primaryLight: string;  // Light variant
  primaryDark: string;   // Dark variant
  
  // Background colors
  background: string;     // Main background (white/light)
  backgroundSecondary: string; // Secondary background (grey)
  backgroundTertiary: string;  // Tertiary background (darker grey)
  
  // Text colors
  textPrimary: string;      // Main text color (dark)
  textSecondary: string;   // Secondary text (grey)
  textTertiary: string;   // Tertiary text (light grey)
  
  // Accent colors
  accent1: string;        // Accent color 1 (e.g., teal/mint)
  accent2: string;       // Accent color 2 (e.g., pink/peach)
  accent3: string;       // Accent color 3 (e.g., orange/coral)
  
  // UI element colors
  border: string;        // Border color
  borderLight: string;   // Light border
  shadow: string;        // Shadow color
  
  // Status colors
  success: string;       // Success state
  warning: string;       // Warning state
  error: string;        // Error state
  info: string;         // Info state
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Default theme colors (based on current design)
export const defaultThemeColors: ThemeColors = {
  primary: '#0099FF',
  primaryLight: '#80CCFF',
  primaryDark: '#0066CC',
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#E5E7EB',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  accent1: '#88E5D0', // Light teal/mint
  accent2: '#F5A5A5', // Light pink/peach
  accent3: '#FFB366', // Orange/coral
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

