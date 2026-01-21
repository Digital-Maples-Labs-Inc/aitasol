import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import ServicesHero from './services/components/ServicesHero';
import ServicesOverview from './services/components/ServicesOverview';
import ServiceCards from './services/components/ServiceCards';

export default function ServicesScreen(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HeaderNavigation />
      <ServicesHero />
      <ServiceCards />
      <Footer />
    </AppTheme>
  );
}

