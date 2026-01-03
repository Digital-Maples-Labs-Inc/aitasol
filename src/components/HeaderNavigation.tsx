/**
 * Header Navigation Component
 * Enhanced navigation with animations inspired by Framer Motion patterns
 * Uses React Native Reanimated for smooth, performant animations
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface NavLinkProps {
  label: string;
  onPress: () => void;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps & { colors: any; styles: any }> = ({ 
  label, 
  onPress, 
  isActive = false,
  colors,
  styles: navStyles,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(1.05, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(1, { duration: 100 });
  };

  return (
    <Animated.View style={[navStyles.navLinkContainer, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Text style={[navStyles.navLink, isActive && navStyles.navLinkActive]}>
          {label}
        </Text>
        {isActive && <View style={[navStyles.activeIndicator, { backgroundColor: colors.primary }]} />}
      </TouchableOpacity>
    </Animated.View>
  );
};

interface HeaderNavigationProps {
  currentPath?: string;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentPath,
}) => {
  const { user, signOut, loading } = useAuth();
  const { colors } = useTheme();
  const logoScale = useSharedValue(1);

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
    };
  });

  const handleLogoPress = () => {
    // Logo animation on press - spring bounce effect
    logoScale.value = withSequence(
      withSpring(1.1, {
        damping: 8,
        stiffness: 300,
      }),
      withSpring(1, {
        damping: 8,
        stiffness: 300,
      })
    );
    navigateTo('/');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    if (!currentPath) return false;
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleLogoPress} activeOpacity={0.8}>
        <Animated.View style={logoAnimatedStyle}>
          <Text style={styles.logo}>AitahSolutions</Text>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.nav}>
        <NavLink
          label="Home"
          onPress={() => navigateTo('/')}
          isActive={isActive('/')}
          colors={colors}
          styles={styles}
        />
        <NavLink
          label="Blog"
          onPress={() => navigateTo('/blog')}
          isActive={isActive('/blog')}
          colors={colors}
          styles={styles}
        />

        {!loading && user ? (
          <>
            <NavLink
              label="Dashboard"
              onPress={() => navigateTo('/admin/dashboard')}
              isActive={isActive('/admin')}
              colors={colors}
              styles={styles}
            />
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.signOutButton}
              activeOpacity={0.7}
            >
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : !loading ? (
          <NavLink
            label="Login"
            onPress={() => navigateTo('/dmlabs')}
            isActive={isActive('/dmlabs')}
            colors={colors}
            styles={styles}
          />
        ) : null}
      </View>
    </View>
  );
};

// Styles will be created dynamically with theme colors
const createStyles = (colors: any) => createHeaderNavigationStyles(colors);
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    ...(Platform.OS === 'web' && {
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }),
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navLinkContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navLink: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  navLinkActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 12,
    right: 12,
    height: 2,
    borderRadius: 1,
  },
  signOutButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  signOutText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});

