/**
 * Statistics Component Styles
 * Note: This component uses dynamic theme colors, so styles are created via function
 */

import { StyleSheet, Platform } from 'react-native';

export const createStatisticsStyles = (colors: any) => {
  const isWeb = Platform.OS === 'web';
  
  return StyleSheet.create({
    container: {
      paddingHorizontal: isWeb ? 80 : 20,
      paddingVertical: isWeb ? 120 : 60,
      backgroundColor: colors.backgroundTertiary || '#26293c',
      position: 'relative',
    },
    header: {
      alignItems: 'center',
      maxWidth: isWeb ? 720 : '100%',
      alignSelf: 'center',
      marginBottom: isWeb ? 70 : 40,
      width: '100%',
    },
    badge: {
      backgroundColor: colors.backgroundSecondary || '#343856',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      marginBottom: 18,
    },
    badgeText: {
      fontSize: 13,
      color: colors.textPrimary || '#fff',
      fontWeight: '500',
    },
    heading: {
      fontSize: isWeb ? 42 : 32,
      lineHeight: isWeb ? 52 : 40,
      fontWeight: '700',
      color: colors.textPrimary || '#fff',
      textAlign: 'center',
      marginBottom: 14,
    },
    description: {
      fontSize: isWeb ? 16 : 14,
      lineHeight: isWeb ? 24 : 20,
      color: colors.textSecondary || 'rgba(255,255,255,0.75)',
      textAlign: 'center',
    },
    grid: {
      ...(isWeb ? {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 24,
      } : {
        flexDirection: 'column',
        gap: 24,
      }),
    },
    gridItem: {
      ...(isWeb ? {
        width: '30%',
        minWidth: 250,
        maxWidth: 350,
      } : {
        width: '100%',
      }),
    },
    // Card base styles
    statCard: {
      backgroundColor: colors.backgroundSecondary || '#2f334d',
      borderRadius: 20,
      padding: 22,
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      minHeight: isWeb ? 220 : 180,
    },
    imageCard: {
      backgroundColor: colors.backgroundSecondary || '#2f334d',
      borderRadius: 20,
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      minHeight: isWeb ? 220 : 180,
    },
    imageCardImage: {
      width: '100%',
      height: '100%',
    },
    // Overlay styles
    overlayText: {
      position: 'absolute',
      left: 22,
      bottom: 22,
    },
    overlayBottomRight: {
      left: 'auto',
      right: 22,
    },
    overlayBottom: {
      position: 'absolute',
      left: 22,
      bottom: 22,
      right: 22,
    },
    overlayValue: {
      fontSize: isWeb ? 36 : 28,
      fontWeight: '700',
      color: colors.textPrimary || '#fff',
      marginBottom: 6,
    },
    overlayDescription: {
      fontSize: 14,
      color: colors.textSecondary || 'rgba(255,255,255,0.85)',
      lineHeight: 20,
    },
    // Stat card styles
    statIcon: {
      position: 'absolute',
      top: 18,
      right: 18,
      fontSize: 20,
      opacity: 0.8,
    },
    statValue: {
      fontSize: isWeb ? 40 : 32,
      fontWeight: '700',
      color: colors.textPrimary || '#fff',
      marginBottom: 10,
    },
    statDescription: {
      fontSize: 14,
      color: colors.textSecondary || 'rgba(255,255,255,0.8)',
      lineHeight: 21,
    },
    dashedLine: {
      marginTop: 14,
      width: 60,
      borderBottomWidth: 2,
      borderBottomColor: colors.border || '#6a6f96',
      borderStyle: 'dashed',
    },
    // Avatars
    avatars: {
      flexDirection: 'row',
      marginTop: 12,
    },
    avatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 2,
      borderColor: colors.backgroundSecondary || '#2f334d',
    },
    avatarOverlap: {
      marginLeft: -10,
    },
    // CTA
    cta: {
      marginTop: isWeb ? 80 : 50,
      alignItems: 'center',
    },
    ctaButton: {
      backgroundColor: colors.primary || '#0099FF',
      paddingHorizontal: 26,
      paddingVertical: 14,
      borderRadius: 999,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    ctaButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#fff',
    },
    ctaArrow: {
      fontSize: 15,
      fontWeight: '600',
      color: '#fff',
    },
  });
};

