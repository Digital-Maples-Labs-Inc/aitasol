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
      overflow: 'auto',
      flex: 1,
    }),
  },
  content: {
    flexGrow: 1,
    ...(Platform.OS === 'web' && {
      minHeight: '100%',
    }),
  },
});

