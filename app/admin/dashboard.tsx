/**
 * Admin Dashboard Page (Expo Router)
 */

import { AdminDashboardScreen } from '@/screens/AdminDashboardScreen';
import { Layout } from '@/components/Layout';

export default function AdminDashboard() {
  return (
    <Layout>
      <AdminDashboardScreen />
    </Layout>
  );
}

