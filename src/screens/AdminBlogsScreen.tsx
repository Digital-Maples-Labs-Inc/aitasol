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
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { getAllBlogs, deleteBlog, publishBlog, unpublishBlog } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export const AdminBlogsScreen: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Blogs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigateTo('/admin/blogs/new')}
        >
          <Text style={styles.addButtonText}>+ New Blog</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {blogs.length === 0 ? (
          <Text style={styles.emptyText}>No blogs found</Text>
        ) : (
          blogs.map((blog) => (
            <View key={blog.id} style={styles.blogCard}>
              <View style={styles.blogInfo}>
                <Text style={styles.blogTitle}>{blog.title}</Text>
                <Text style={styles.blogSlug}>/{blog.slug}</Text>
                <View style={styles.blogMeta}>
                  <Text
                    style={[
                      styles.statusBadge,
                      blog.status === 'published'
                        ? styles.published
                        : styles.draft,
                    ]}
                  >
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                  </Text>
                  {blog.publishedAt && (
                    <Text style={styles.blogDate}>
                      {format(blog.publishedAt, 'MMM d, yyyy')}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.blogActions}>
                <TouchableOpacity
                  style={styles.publishButton}
                  onPress={() => handleTogglePublish(blog)}
                >
                  <Text style={styles.publishButtonText}>
                    {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditBlog(blog.id)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteBlog(blog.id)}
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
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  blogInfo: {
    marginBottom: 12,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  blogSlug: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  blogMeta: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
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
  blogDate: {
    fontSize: 12,
    color: '#999',
  },
  blogActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  publishButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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

