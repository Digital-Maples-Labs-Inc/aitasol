/**
 * Layout Component Styles
 */

import { StyleSheet, Platform } from 'react-native';

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...(Platform.OS === 'web' && {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }),
  },
  contentWrapper: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      minHeight: 0,
      overflow: 'auto',
    }),
  },
  content: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      paddingBottom: 40, // Add padding to prevent footer overlap
    }),
  },
});

