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
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

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
            <TouchableOpacity onPress={() => navigateTo('/services')}>
              <Text style={footerStyles.link}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/contact')}>
              <Text style={footerStyles.link}>Contact</Text>
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
            <Text style={footerStyles.link}>Application Support</Text>
            <Text style={footerStyles.link}>Documentation Guidance</Text>
            <Text style={footerStyles.link}>Scholarship Information</Text>
            <Text style={footerStyles.link}>Career Counselling</Text>
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
            <Text style={footerStyles.link}>Contact Us</Text>
          </View>
        </View>
      </View>

      <View style={footerStyles.footerBottom}>
        <Text style={footerStyles.footerBottomText}>
          © {currentYear} AitahSolutions Educational Consultancy
        </Text>
        <Text style={footerStyles.footerBottomText}>
          Clear Guidance for Global Education Decisions
        </Text>
      </View>
    </View>
  );
};

const createFooterStyles = (colors: any) => {
  const isWeb = Platform.OS === 'web';
  
  return StyleSheet.create({
    footer: {
      backgroundColor: colors.backgroundTertiary || '#1f2233',
      paddingHorizontal: isWeb ? 100 : 20,
      paddingTop: isWeb ? 80 : 40,
      paddingBottom: 40,
    },
    footerGrid: {
      ...(isWeb ? {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      } : {
        flexDirection: 'column',
      }),
    },
    footerBrand: {
      ...(isWeb ? {
        width: '30%',
        minWidth: 300,
        maxWidth: 380,
        marginRight: 60,
      } : {
        width: '100%',
        marginBottom: 40,
      }),
    },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary || '#0099FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary || '#e6e7ee',
  },
  dot: {
    color: colors.primary || '#0099FF',
  },
  tagline: {
    marginTop: 18,
    lineHeight: 24,
    color: colors.textSecondary || '#cfd2e6',
    fontSize: 15,
  },
  socials: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 24,
  },
  socialIcon: {
    fontSize: 20,
    color: colors.primary || '#0099FF',
  },
  footerCol: {
    ...(isWeb ? {
      width: '18%',
      minWidth: 150,
      marginRight: 20,
    } : {
      width: '100%',
      marginBottom: 32,
    }),
  },
  colTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 18,
    color: colors.textPrimary || '#e6e7ee',
  },
  linkList: {
    gap: 14,
  },
  link: {
    fontSize: 15,
    color: colors.textSecondary || '#cfd2e6',
    marginBottom: 14,
  },
  footerBottom: {
    marginTop: 70,
    flexDirection: isWeb ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isWeb ? 'center' : 'flex-start',
    gap: isWeb ? 0 : 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border || 'rgba(255,255,255,0.1)',
  },
  footerBottomText: {
    fontSize: 14,
    color: colors.textTertiary || '#a9adc9',
  },
});

