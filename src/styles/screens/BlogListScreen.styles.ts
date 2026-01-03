/**
 * BlogListScreen Styles
 */

import { StyleSheet, Platform } from 'react-native';

export const blogListScreenStyles = StyleSheet.create({
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageText: {
    fontSize: 48,
  },
  blogContent: {
    flex: 1,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  blogExcerpt: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 12,
  },
  blogMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  blogDate: {
    fontSize: 14,
    color: '#999',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#999',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

