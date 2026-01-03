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
  ActivityIndicator,
  Platform,
} from 'react-native';
import { getPublishedBlogs } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';
import { Layout } from '@/components/Layout';
import { blogListScreenStyles } from '@/styles/screens/BlogListScreen.styles';

export const BlogListScreen: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

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
    navigateTo(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <Layout>
        <View style={blogListScreenStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={blogListScreenStyles.container}>
        <View style={blogListScreenStyles.content}>
          <Text style={blogListScreenStyles.title}>Blog</Text>
          <Text style={blogListScreenStyles.subtitle}>Latest articles and updates</Text>

          {blogs.length === 0 ? (
            <Text style={blogListScreenStyles.emptyText}>No blog posts available</Text>
          ) : (
            blogs.map((blog) => (
              <TouchableOpacity
                key={blog.id}
                style={blogListScreenStyles.blogCard}
                onPress={() => handleBlogPress(blog.slug)}
              >
                {blog.featuredImage && (
                  <View style={blogListScreenStyles.imagePlaceholder}>
                    <Text style={blogListScreenStyles.imageText}>📷</Text>
                  </View>
                )}
                <View style={blogListScreenStyles.blogContent}>
                  <Text style={blogListScreenStyles.blogTitle}>{blog.title}</Text>
                  {blog.excerpt && (
                    <Text style={blogListScreenStyles.blogExcerpt} numberOfLines={2}>
                      {blog.excerpt}
                    </Text>
                  )}
                  <View style={blogListScreenStyles.blogMeta}>
                    <Text style={blogListScreenStyles.blogDate}>
                      {blog.publishedAt
                        ? format(blog.publishedAt, 'MMMM d, yyyy')
                        : ''}
                    </Text>
                    {blog.authorName && (
                      <Text style={blogListScreenStyles.blogAuthor}>by {blog.authorName}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};


