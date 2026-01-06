/**
 * Admin Pages Management Page (Expo Router)
 */

import { AdminPagesScreen } from '@/screens/AdminPagesScreen';
import AdminLayout from '@/screens/admin-dashboard/components/AdminLayout';
import Header from '@/screens/admin-dashboard/components/Header';
import Box from '@mui/material/Box';

export default function AdminPages() {
  return (
    <AdminLayout>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Header />
        <AdminPagesScreen />
      </Box>
    </AdminLayout>
  );
}

