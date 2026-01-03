/**
 * BlogDetailScreen Styles
 */

import { StyleSheet, Platform } from 'react-native';

export const blogDetailScreenStyles = StyleSheet.create({
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
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  imagePlaceholder: {
    fontSize: 18,
    color: '#999',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  excerpt: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 24,
    lineHeight: 26,
  },
  contentContainer: {
    marginTop: 8,
  },
  htmlContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

