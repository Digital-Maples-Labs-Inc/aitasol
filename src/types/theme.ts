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

export interface TypographyStyle {
  fontSize: number;      // in pixels
  lineHeight: number;    // multiplier (e.g., 1.2)
  fontWeight?: string | number;
  fontStyle?: 'normal' | 'italic';
}

export interface Typography {
  fontFamily: string;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  body: TypographyStyle;
  quotes: TypographyStyle;
  subtext: TypographyStyle;
  span: TypographyStyle;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  typography: Typography;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Default theme colors (based on current design)
// Default theme colors (based on current design)
export const defaultThemeColors: ThemeColors = {
  primary: '#fdc500', // Gold Main
  primaryLight: '#ffd500', // Bright Yellow
  primaryDark: '#cc9e00',
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#00296b', // Darkest Blue
  textPrimary: '#0b192c',
  textSecondary: '#4B5563',
  textTertiary: '#9CA3AF',
  accent1: '#00509d', // Main Blue
  accent2: '#00296b', // Dark Blue
  accent3: '#e6b200', // Darker Yellow Accent
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  shadow: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#00509d',
};

// Default typography (Inter font with specified styles)
export const defaultTypography: Typography = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: 60,
    lineHeight: 1.2,
    fontWeight: '700',
  },
  h2: {
    fontSize: 36,
    lineHeight: 1.2,
    fontWeight: '700',
  },
  h3: {
    fontSize: 22,
    lineHeight: 1.2,
    fontWeight: '600',
  },
  h4: {
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: '600',
  },
  body: {
    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: '400',
  },
  quotes: {
    fontSize: 16,
    lineHeight: 1.2,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  subtext: {
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: '400',
  },
  span: {
    fontSize: 14,
    lineHeight: 1.2,
    fontWeight: '400',
  },
};

