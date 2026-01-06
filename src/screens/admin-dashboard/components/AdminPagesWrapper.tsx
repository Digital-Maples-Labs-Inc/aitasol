import * as React from 'react';
import { AdminPagesScreen } from '@/screens/AdminPagesScreen';
import AdminLayout from './AdminLayout';
import Header from './Header';
import Box from '@mui/material/Box';

export default function AdminPagesWrapper() {
  return (
    <AdminLayout>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Header />
        <AdminPagesScreen />
      </Box>
    </AdminLayout>
  );
}

