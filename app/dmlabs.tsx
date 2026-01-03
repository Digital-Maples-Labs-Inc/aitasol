/**
 * DMLabs Login Page (Expo Router)
 */

import { LoginScreen } from '@/screens/LoginScreen';
import { Layout } from '@/components/Layout';

export default function DMLabs() {
  return (
    <Layout showHeader={false}>
      <LoginScreen />
    </Layout>
  );
}

