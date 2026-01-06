/**
 * Hero Component Styles
 * Note: This component uses dynamic theme colors, so styles are created via function
 */

import { StyleSheet, Platform } from 'react-native';

export const createHeroStyles = (colors: any) => {
  const isWeb = Platform.OS === 'web';
  
  return StyleSheet.create({
    hero: {
      minHeight: isWeb ? 600 : 500,
      paddingHorizontal: isWeb ? 64 : 20,
      paddingTop: isWeb ? 28 : 20,
      paddingBottom: isWeb ? 80 : 40,
      backgroundColor: colors.backgroundTertiary || '#25283b',
      position: 'relative',
    },
    heroContent: {
      alignItems: 'center',
      maxWidth: isWeb ? 820 : '100%',
      alignSelf: 'center',
      marginTop: isWeb ? 90 : 40,
      width: '100%',
    },
    badge: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.backgroundSecondary || '#323552',
      marginBottom: 24,
    },
    badgeText: {
      fontSize: 13,
      color: colors.textPrimary || '#fff',
      fontWeight: '500',
    },
    headingContainer: {
      width: '100%',
      marginBottom: 20,
      alignItems: 'center',
    },
    headingRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: '100%',
    },
    heading: {
      fontSize: isWeb ? 56 : 36,
      lineHeight: isWeb ? 64 : 44,
      fontWeight: '700',
      color: colors.textPrimary || '#fff',
      textAlign: 'center',
      flex: 1,
      minWidth: 200,
    },
    avatarContainer: {
      marginLeft: 14,
      marginTop: isWeb ? 10 : 5,
      alignSelf: 'flex-start',
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: colors.primary || '#0099FF',
    },
    subtitle: {
      fontSize: isWeb ? 18 : 16,
      lineHeight: isWeb ? 28 : 24,
      color: colors.textSecondary || 'rgba(255,255,255,0.75)',
      textAlign: 'center',
      marginBottom: 28,
      paddingHorizontal: 20,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginBottom: 36,
      flexWrap: 'wrap',
    },
    ctaPrimary: {
      backgroundColor: colors.primary || '#0099FF',
      paddingHorizontal: 22,
      paddingVertical: 14,
      borderRadius: 999,
      minWidth: 180,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ctaPrimaryText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    ctaIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary || '#0099FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ctaIconText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
    },
    socialProof: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
    },
    avatars: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarSmall: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: colors.backgroundTertiary || '#25283b',
    },
    avatarOverlap: {
      marginLeft: -10,
    },
    rating: {
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 14,
      color: colors.textPrimary || 'rgba(255,255,255,0.9)',
      fontWeight: '600',
    },
    ratingValue: {
      fontSize: 14,
      color: colors.textSecondary || 'rgba(255,255,255,0.75)',
      fontWeight: '400',
    },
    testimonialText: {
      fontSize: 12,
      color: colors.textSecondary || 'rgba(255,255,255,0.75)',
      marginTop: 4,
      textAlign: 'center',
    },
    videoCard: {
      marginTop: isWeb ? 70 : 40,
      width: isWeb ? 900 : '100%',
      maxWidth: '100%',
      height: isWeb ? 420 : 250,
      borderRadius: 24,
      overflow: 'hidden',
      alignSelf: 'center',
      position: 'relative',
    },
    videoCardImage: {
      width: '100%',
      height: '100%',
    },
    videoOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    playButton: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: 'rgba(255,255,255,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIcon: {
      fontSize: 24,
      color: colors.backgroundTertiary || '#25283b',
      marginLeft: 4, // Slight offset for visual centering
    },
    speechBubble: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: '#fff',
      paddingHorizontal: 14,
      paddingVertical: 14,
      borderRadius: 12,
      maxWidth: 220,
      zIndex: 10,
    },
    speechBubbleText: {
      fontSize: 13,
      color: colors.backgroundTertiary || '#25283b',
      lineHeight: 18,
    },
    partners: {
      marginTop: isWeb ? 70 : 40,
      alignItems: 'center',
    },
    partnersLabel: {
      fontSize: 14,
      color: colors.textSecondary || 'rgba(255,255,255,0.7)',
      marginBottom: 14,
    },
    logos: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isWeb ? 48 : 24,
      flexWrap: 'wrap',
    },
    logoText: {
      fontSize: 14,
      color: colors.textSecondary || 'rgba(255,255,255,0.7)',
      fontWeight: '500',
    },
  });
};

