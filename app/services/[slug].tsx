/**
 * Service Detail Page (Expo Router)
 */

import { useLocalSearchParams } from 'expo-router';
import ServiceDetailScreen from '@/screens/ServiceDetailScreen';

export default function ServiceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <ServiceDetailScreen serviceSlug={slug} />;
}

