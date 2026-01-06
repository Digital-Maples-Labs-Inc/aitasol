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
  ActivityIndicator,
  Platform,
} from 'react-native';
import { getAllPages, deletePage } from '@/services/pageService';
import { Page } from '@/types';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { adminPagesScreenStyles } from '@/styles/screens/AdminPagesScreen.styles';

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

  const handleEditPage = (page: Page) => {
    // Navigate to the actual page for inline editing
    // Use the slug to construct the frontend URL
    const pagePath = page.slug === 'home' ? '/' : `/${page.slug}`;
    navigateTo(pagePath);
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
      <View style={adminPagesScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={adminPagesScreenStyles.container}>
      <View style={adminPagesScreenStyles.header}>
        <Text style={adminPagesScreenStyles.title}>Manage Pages</Text>
        <TouchableOpacity
          style={adminPagesScreenStyles.addButton}
          onPress={() => navigateTo('/admin/pages/new')}
        >
          <Text style={adminPagesScreenStyles.addButtonText}>+ New Page</Text>
        </TouchableOpacity>
      </View>

      <View style={adminPagesScreenStyles.content}>
        {pages.length === 0 ? (
          <Text style={adminPagesScreenStyles.emptyText}>No pages found</Text>
        ) : (
          pages.map((page) => (
            <View key={page.id} style={adminPagesScreenStyles.pageCard}>
              <View style={adminPagesScreenStyles.pageInfo}>
                <Text style={adminPagesScreenStyles.pageTitle}>{page.title}</Text>
                <Text style={adminPagesScreenStyles.pageSlug}>/{page.slug}</Text>
                <View style={adminPagesScreenStyles.pageMeta}>
                  <Text
                    style={[
                      adminPagesScreenStyles.statusBadge,
                      page.published ? adminPagesScreenStyles.published : adminPagesScreenStyles.draft,
                    ]}
                  >
                    {page.published ? 'Published' : 'Draft'}
                  </Text>
                </View>
              </View>
              <View style={adminPagesScreenStyles.pageActions}>
                <TouchableOpacity
                  style={adminPagesScreenStyles.editButton}
                  onPress={() => handleEditPage(page)}
                >
                  <Text style={adminPagesScreenStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={adminPagesScreenStyles.deleteButton}
                  onPress={() => handleDeletePage(page.id)}
                >
                  <Text style={adminPagesScreenStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};


