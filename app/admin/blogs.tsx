/**
 * Admin Blogs Management Page (Expo Router)
 */

import { AdminBlogsScreen } from '@/screens/AdminBlogsScreen';
import AdminLayout from '@/screens/admin-dashboard/components/AdminLayout';
import Header from '@/screens/admin-dashboard/components/Header';
import Box from '@mui/material/Box';

export default function AdminBlogs() {
  return (
    <AdminLayout>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Header />
        <AdminBlogsScreen />
      </Box>
    </AdminLayout>
  );
}

