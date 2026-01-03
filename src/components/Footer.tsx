/**
 * Footer Component
 * Site footer with navigation links and branding
 * Inspired by the example footer design
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { createFooterStyles } from '@/styles/components/Footer.styles';

export const Footer: React.FC = () => {
  const { colors, typography } = useTheme();
  const { user } = useAuth();

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const currentYear = new Date().getFullYear();

  const footerStyles = createFooterStyles(colors);

  // Add web-specific styles for grid background pattern
  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleId = 'footer-grid-pattern-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .footer-grid-pattern {
            background-image:
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 60px 60px;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <View 
      style={footerStyles.footer}
      {...(Platform.OS === 'web' ? { className: 'footer-grid-pattern' } : {})}
    >
      <View style={footerStyles.footerGrid}>
        {/* Brand column */}
        <View style={footerStyles.footerBrand}>
          <View style={footerStyles.logo}>
            <View style={footerStyles.logoIcon}>
              <Text style={footerStyles.logoIconText}>A</Text>
            </View>
            <Text style={footerStyles.logoText}>
              AitahSolutions<span style={footerStyles.dot}>.</span>
            </Text>
          </View>

          <Text style={footerStyles.tagline}>
            Clear Guidance for Global Education Decisions{'\n'}
            Learn. Decide. Succeed.
          </Text>

          <View style={footerStyles.socials}>
            <Text style={footerStyles.socialIcon}>◎</Text>
            <Text style={footerStyles.socialIcon}>✕</Text>
            <Text style={footerStyles.socialIcon}>◉</Text>
            <Text style={footerStyles.socialIcon}>◌</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={footerStyles.footerCol}>
          <Text style={footerStyles.colTitle}>Menu</Text>
          <View style={footerStyles.linkList}>
            <TouchableOpacity onPress={() => navigateTo('/')}>
              <Text style={footerStyles.link}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/blog')}>
              <Text style={footerStyles.link}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/about')}>
              <Text style={footerStyles.link}>About</Text>
            </TouchableOpacity>
            {user && (
              <TouchableOpacity onPress={() => navigateTo('/admin/dashboard')}>
                <Text style={footerStyles.link}>Dashboard</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Services */}
        <View style={footerStyles.footerCol}>
          <Text style={footerStyles.colTitle}>Services</Text>
          <View style={footerStyles.linkList}>
            <Text style={footerStyles.link}>Program Matching</Text>
            <Text style={footerStyles.link}>Scholarship Information</Text>
            <Text style={footerStyles.link}>Pre-arrival Support</Text>
          </View>
        </View>

        {/* Extra links */}
        <View style={footerStyles.footerCol}>
          <Text style={footerStyles.colTitle}>Resources</Text>
          <View style={footerStyles.linkList}>
            <Text style={footerStyles.link}>FAQs</Text>
            <Text style={footerStyles.link}>Privacy Policy</Text>
            <Text style={footerStyles.link}>Terms and Conditions</Text>
          </View>
        </View>
      </View>

      <View style={footerStyles.footerBottom}>
        <Text style={footerStyles.footerBottomText}>
          © {currentYear} AitahSolutions Educational Consultancy
        </Text>
        <Text style={footerStyles.footerBottomText}>
          Designed by <a href='https://digitalmaples.agency'>Digital Maples Labs</a>
        </Text>
      </View>
    </View>
  );
};

