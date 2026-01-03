/**
 * Typography Components
 * Pre-styled text components using theme typography
 */

import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypographyStyle } from '@/utils/typography';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'quotes' | 'subtext' | 'span';
  children: ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  style,
  ...props
}) => {
  const { typography, colors } = useTheme();
  const typographyStyle = getTypographyStyle(typography, variant);

  return (
    <Text
      style={[
        typographyStyle,
        { color: colors.textPrimary },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Convenience components
export const H1: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="h1" {...props}>{children}</Typography>
);

export const H2: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="h2" {...props}>{children}</Typography>
);

export const H3: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="h3" {...props}>{children}</Typography>
);

export const H4: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="h4" {...props}>{children}</Typography>
);

export const Body: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="body" {...props}>{children}</Typography>
);

export const Quote: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="quotes" {...props}>{children}</Typography>
);

export const Subtext: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="subtext" {...props}>{children}</Typography>
);

export const Span: React.FC<TextProps & { children: ReactNode }> = ({ children, ...props }) => (
  <Typography variant="span" {...props}>{children}</Typography>
);

