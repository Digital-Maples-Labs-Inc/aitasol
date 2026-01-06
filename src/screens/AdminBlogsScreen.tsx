/**
 * Admin Blogs Screen
 * List and manage all blog posts
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
import { getAllBlogs, deleteBlog, publishBlog, unpublishBlog } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { adminBlogsScreenStyles } from '@/styles/screens/AdminBlogsScreen.styles';

export const AdminBlogsScreen: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  useRequireAuth();

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    // Get status filter from URL query parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const statusFilter = urlParams.get('status');
      
      if (statusFilter === 'published') {
        setFilteredBlogs(blogs.filter(blog => blog.status === 'published'));
      } else if (statusFilter === 'draft') {
        setFilteredBlogs(blogs.filter(blog => blog.status !== 'published'));
      } else {
        setFilteredBlogs(blogs);
      }
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs]);

  const loadBlogs = async () => {
    try {
      const blogsData = await getAllBlogs();
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blogId: string) => {
    navigateTo(`/admin/blogs/${blogId}`);
  };

  const handleDeleteBlog = async (blogId: string) => {
    try {
      await deleteBlog(blogId);
      await loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      if (blog.status === 'published') {
        await unpublishBlog(blog.id);
      } else {
        await publishBlog(blog.id);
      }
      await loadBlogs();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  if (loading) {
    return (
      <View style={adminBlogsScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={adminBlogsScreenStyles.container}>
      <View style={adminBlogsScreenStyles.header}>
        <Text style={adminBlogsScreenStyles.title}>Manage Blogs</Text>
        <TouchableOpacity
          style={adminBlogsScreenStyles.addButton}
          onPress={() => navigateTo('/admin/blogs/new')}
        >
          <Text style={adminBlogsScreenStyles.addButtonText}>+ New Blog</Text>
        </TouchableOpacity>
      </View>

      <View style={adminBlogsScreenStyles.content}>
        {filteredBlogs.length === 0 ? (
          <Text style={adminBlogsScreenStyles.emptyText}>No blogs found</Text>
        ) : (
          filteredBlogs.map((blog) => (
            <View key={blog.id} style={adminBlogsScreenStyles.blogCard}>
              <View style={adminBlogsScreenStyles.blogInfo}>
                <Text style={adminBlogsScreenStyles.blogTitle}>{blog.title}</Text>
                <Text style={adminBlogsScreenStyles.blogSlug}>/{blog.slug}</Text>
                <View style={adminBlogsScreenStyles.blogMeta}>
                  <Text
                    style={[
                      adminBlogsScreenStyles.statusBadge,
                      blog.status === 'published'
                        ? adminBlogsScreenStyles.published
                        : adminBlogsScreenStyles.draft,
                    ]}
                  >
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                  </Text>
                  {blog.publishedAt && (
                    <Text style={adminBlogsScreenStyles.blogDate}>
                      {format(blog.publishedAt, 'MMM d, yyyy')}
                    </Text>
                  )}
                </View>
              </View>
              <View style={adminBlogsScreenStyles.blogActions}>
                <TouchableOpacity
                  style={adminBlogsScreenStyles.publishButton}
                  onPress={() => handleTogglePublish(blog)}
                >
                  <Text style={adminBlogsScreenStyles.publishButtonText}>
                    {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={adminBlogsScreenStyles.editButton}
                  onPress={() => handleEditBlog(blog.id)}
                >
                  <Text style={adminBlogsScreenStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={adminBlogsScreenStyles.deleteButton}
                  onPress={() => handleDeleteBlog(blog.id)}
                >
                  <Text style={adminBlogsScreenStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};


