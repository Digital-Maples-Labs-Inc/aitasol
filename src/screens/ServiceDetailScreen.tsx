import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import ServiceHero from './service-detail/components/ServiceHero';
import ServiceContent from './service-detail/components/ServiceContent';
import ServiceFeatures from './service-detail/components/ServiceFeatures';
import ServiceCTA from './service-detail/components/ServiceCTA';
import { servicesData } from '@/services/serviceData';

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
  const slug = (route?.params?.slug || serviceSlug || '').toString();

  // Get default data for this slug
  const defaultData = servicesData[slug];

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HeaderNavigation />
      <ServiceHero serviceSlug={slug} defaultData={defaultData} />
      <ServiceContent serviceSlug={slug} defaultData={defaultData} />
      <ServiceFeatures serviceSlug={slug} />
      <ServiceCTA serviceSlug={slug} />
      <Footer />
    </AppTheme>
  );
}
