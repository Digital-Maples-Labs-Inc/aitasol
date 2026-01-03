/**
 * Blog Detail Screen
 * Displays individual blog post
 */

import React, { useEffect, useState } from 'react';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
import {
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
import { getBlogBySlug } from '@/services/blogService';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
import { Blog } from '@/types';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
import { format } from 'date-fns';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
import RenderHTML from 'react-native-render-html';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';
import { Layout } from '@/components/Layout';
import { blogDetailScreenStyles } from '@/styles/screens/BlogDetailScreen.styles';

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
      <Layout>
        <View style={blogDetailScreenStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <View style={blogDetailScreenStyles.container}>
          <Text style={blogDetailScreenStyles.errorText}>Blog post not found</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={blogDetailScreenStyles.container}>
        <View style={blogDetailScreenStyles.content}>
          {blog.featuredImage && (
            <View style={blogDetailScreenStyles.imageContainer}>
              <Text style={blogDetailScreenStyles.imagePlaceholder}>📷 Featured Image</Text>
            </View>
          )}

          <Text style={blogDetailScreenStyles.title}>{blog.title}</Text>

          <View style={blogDetailScreenStyles.meta}>
            {blog.publishedAt && (
              <Text style={blogDetailScreenStyles.date}>
                {format(blog.publishedAt, 'MMMM d, yyyy')}
              </Text>
            )}
            {blog.authorName && (
              <Text style={blogDetailScreenStyles.author}>by {blog.authorName}</Text>
            )}
          </View>

          {blog.excerpt && (
            <Text style={blogDetailScreenStyles.excerpt}>{blog.excerpt}</Text>
          )}

          <View style={blogDetailScreenStyles.contentContainer}>
            <RenderHTML
              contentWidth={300}
              source={{ html: blog.content }}
              baseStyle={blogDetailScreenStyles.htmlContent}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};


