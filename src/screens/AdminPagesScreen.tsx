/**
 * Admin Pages Screen
 * List and manage all pages
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { getAllPages, deletePage } from '@/services/pageService';
import { Page } from '@/types';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export const AdminPagesScreen: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  useRequireAuth();

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const pagesData = await getAllPages();
      setPages(pagesData);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPage = (pageId: string) => {
    navigateTo(`/admin/pages/${pageId}`);
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      await deletePage(pageId);
      await loadPages();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Pages</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigateTo('/admin/pages/new')}
        >
          <Text style={styles.addButtonText}>+ New Page</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {pages.length === 0 ? (
          <Text style={styles.emptyText}>No pages found</Text>
        ) : (
          pages.map((page) => (
            <View key={page.id} style={styles.pageCard}>
              <View style={styles.pageInfo}>
                <Text style={styles.pageTitle}>{page.title}</Text>
                <Text style={styles.pageSlug}>/{page.slug}</Text>
                <View style={styles.pageMeta}>
                  <Text
                    style={[
                      styles.statusBadge,
                      page.published ? styles.published : styles.draft,
                    ]}
                  >
                    {page.published ? 'Published' : 'Draft'}
                  </Text>
                </View>
              </View>
              <View style={styles.pageActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditPage(page.id)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePage(page.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  pageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pageInfo: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pageSlug: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  pageMeta: {
    flexDirection: 'row',
  },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  published: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  draft: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  pageActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

