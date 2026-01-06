import * as React from 'react';
import { AdminThemeScreen } from '@/screens/AdminThemeScreen';
import AdminLayout from './AdminLayout';
import Header from './Header';
import Box from '@mui/material/Box';

export default function AdminThemeWrapper() {
  return (
    <AdminLayout>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Header />
        <AdminThemeScreen />
      </Box>
    </AdminLayout>
  );
}

