import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import ServiceHero from './service-detail/components/ServiceHero';
import ServiceContent from './service-detail/components/ServiceContent';
import ServiceFeatures from './service-detail/components/ServiceFeatures';
import ServiceCTA from './service-detail/components/ServiceCTA';

interface ServiceDetailScreenProps {
  disableCustomTheme?: boolean;
  serviceSlug?: string;
  route?: {
    params?: {
      slug?: string;
    };
  };
}

export default function ServiceDetailScreen(props: ServiceDetailScreenProps) {
  const { disableCustomTheme, serviceSlug, route } = props;
  
  // Get slug from route params (React Navigation) or props (Expo Router)
  // React Navigation passes route as a prop, Expo Router passes serviceSlug directly
  const slug = (route?.params?.slug || serviceSlug || '').toString();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HeaderNavigation />
      <ServiceHero serviceSlug={slug} />
      <ServiceContent serviceSlug={slug} />
      <ServiceFeatures serviceSlug={slug} />
      <ServiceCTA serviceSlug={slug} />
      <Footer />
    </AppTheme>
  );
}

