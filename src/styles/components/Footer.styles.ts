/**
 * Footer Component Styles
 * Note: This component uses dynamic theme colors, so styles are created via function
 */

import { StyleSheet, Platform } from 'react-native';

export const createFooterStyles = (colors: any) => {
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
};

