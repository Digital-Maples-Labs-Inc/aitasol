/**
 * Typography utilities
 * Provides helper functions for applying typography styles
 */

import { TextStyle } from 'react-native';
import { Typography, TypographyStyle } from '@/types/theme';

/**
 * Convert typography style to React Native TextStyle
 */
export const getTypographyStyle = (
  typography: Typography,
  style: keyof Omit<Typography, 'fontFamily'>
): TextStyle => {
  const typoStyle: TypographyStyle = typography[style];
  
  return {
    fontFamily: typography.fontFamily,
    fontSize: typoStyle.fontSize,
    lineHeight: typoStyle.fontSize * typoStyle.lineHeight,
    fontWeight: typoStyle.fontWeight || '400',
    fontStyle: typoStyle.fontStyle || 'normal',
  };
};

/**
 * Get font family string for web
 */
export const getFontFamily = (typography: Typography): string => {
  return typography.fontFamily;
};

