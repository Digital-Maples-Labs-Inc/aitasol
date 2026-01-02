/**
 * Blog Detail Screen
 * Displays individual blog post
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getBlogBySlug } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';
import RenderHTML from 'react-native-render-html';

export const BlogDetailScreen: React.FC = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadBlog();
    }
  }, [slug]);

  const loadBlog = async () => {
    if (!slug) return;

    try {
      const blogData = await getBlogBySlug(slug);
      setBlog(blogData);
    } catch (error) {
      console.error('Error loading blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Blog post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {blog.featuredImage && (
          <View style={styles.imageContainer}>
            <Text style={styles.imagePlaceholder}>📷 Featured Image</Text>
          </View>
        )}

        <Text style={styles.title}>{blog.title}</Text>

        <View style={styles.meta}>
          {blog.publishedAt && (
            <Text style={styles.date}>
              {format(blog.publishedAt, 'MMMM d, yyyy')}
            </Text>
          )}
          {blog.authorName && (
            <Text style={styles.author}>by {blog.authorName}</Text>
          )}
        </View>

        {blog.excerpt && (
          <Text style={styles.excerpt}>{blog.excerpt}</Text>
        )}

        <View style={styles.contentContainer}>
          <RenderHTML
            contentWidth={300}
            source={{ html: blog.content }}
            baseStyle={styles.htmlContent}
          />
        </View>
      </View>
    </ScrollView>
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

