/**
 * HeaderNavigation Component Styles
 * Note: This component uses dynamic theme colors, so styles are created via function
 */

import { StyleSheet, Platform } from 'react-native';

export const createHeaderNavigationStyles = (colors: any) => StyleSheet.create({
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

