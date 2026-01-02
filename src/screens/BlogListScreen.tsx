/**
 * Blog List Screen
 * Displays all published blog posts
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getPublishedBlogs } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';

export const BlogListScreen: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const blogData = await getPublishedBlogs(20);
      setBlogs(blogData);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogPress = (slug: string) => {
    router.push(`/blog/${slug}`);
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
      <View style={styles.content}>
        <Text style={styles.title}>Blog</Text>
        <Text style={styles.subtitle}>Latest articles and updates</Text>

        {blogs.length === 0 ? (
          <Text style={styles.emptyText}>No blog posts available</Text>
        ) : (
          blogs.map((blog) => (
            <TouchableOpacity
              key={blog.id}
              style={styles.blogCard}
              onPress={() => handleBlogPress(blog.slug)}
            >
              {blog.featuredImage && (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>📷</Text>
                </View>
              )}
              <View style={styles.blogContent}>
                <Text style={styles.blogTitle}>{blog.title}</Text>
                {blog.excerpt && (
                  <Text style={styles.blogExcerpt} numberOfLines={2}>
                    {blog.excerpt}
                  </Text>
                )}
                <View style={styles.blogMeta}>
                  <Text style={styles.blogDate}>
                    {blog.publishedAt
                      ? format(blog.publishedAt, 'MMMM d, yyyy')
                      : ''}
                  </Text>
                  {blog.authorName && (
                    <Text style={styles.blogAuthor}>by {blog.authorName}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 48,
  },
  blogContent: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  blogExcerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogDate: {
    fontSize: 12,
    color: '#999',
  },
  blogAuthor: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

