import * as React from 'react';
import { AdminBlogsScreen } from '@/screens/AdminBlogsScreen';
import AdminLayout from './AdminLayout';
import Header from './Header';
import Box from '@mui/material/Box';

export default function AdminBlogsWrapper() {
  return (
    <AdminLayout>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Header />
        <AdminBlogsScreen />
      </Box>
    </AdminLayout>
  );
}

