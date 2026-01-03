/**
 * Home Screen
 * Public home page with editable content from Firestore
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { getPageBySlug, updatePageSection } from '@/services/pageService';
import { EditableText } from '@/components/EditableText';
import { EditableImage } from '@/components/EditableImage';
import { Page, PageSection } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';

export const HomeScreen: React.FC = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    try {
      const pageData = await getPageBySlug('home');
      setPage(pageData);
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionUpdate = async (sectionId: string, content: string) => {
    if (!page) return;

    try {
      await updatePageSection(page.id, sectionId, { content });
      await loadPage(); // Reload to get updated data
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const handleImageUpdate = async (sectionId: string, imageUrl: string) => {
    if (!page) return;

    try {
      await updatePageSection(page.id, sectionId, {
        metadata: { imageUrl },
      });
      await loadPage();
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const renderSection = (section: PageSection) => {
    switch (section.type) {
      case 'heading':
        return (
          <EditableText
            key={section.id}
            value={section.content}
            onSave={(newValue) => handleSectionUpdate(section.id, newValue)}
            type="heading"
            style={styles.heading}
            editable={section.editable}
          />
        );

      case 'paragraph':
        return (
          <EditableText
            key={section.id}
            value={section.content}
            onSave={(newValue) => handleSectionUpdate(section.id, newValue)}
            type="paragraph"
            style={styles.paragraph}
            editable={section.editable}
          />
        );

      case 'image':
        return (
          <EditableImage
            key={section.id}
            src={section.metadata?.imageUrl || ''}
            alt={section.metadata?.imageAlt || ''}
            onSave={(newUrl) => handleImageUpdate(section.id, newUrl)}
            style={styles.image}
            editable={section.editable}
          />
        );

      case 'cta':
        // Show login button if not logged in, otherwise show editable CTA
        if (!authLoading && !user) {
          return (
            <View key={section.id} style={styles.ctaContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  // Use window.location for web, works reliably
                  if (Platform.OS === 'web' && typeof window !== 'undefined') {
                    window.location.href = '/dmlabs';
                  }
                }}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          );
        }
        return (
          <View key={section.id} style={styles.ctaContainer}>
            <EditableText
              value={section.metadata?.ctaText || 'Get Started'}
              onSave={(newValue) =>
                handleSectionUpdate(section.id, newValue)
              }
              type="button"
              style={styles.ctaButton}
              editable={section.editable}
            />
          </View>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </Layout>
    );
  }

  if (!page) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.errorText}>Page not found</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {page.sections.map((section) => renderSection(section))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
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

