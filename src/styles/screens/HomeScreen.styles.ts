/**
 * HomeScreen Styles
 */

import { StyleSheet, Platform } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: Platform.OS === 'web' ? 60 : 20, // Extra padding for footer
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 16,
    borderRadius: 8,
  },
  ctaContainer: {
    marginVertical: 32,
    alignItems: 'center',
  },
  ctaButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 150,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

