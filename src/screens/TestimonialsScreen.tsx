import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import TestimonialsHero from './testimonials/components/TestimonialsHero';
import TestimonialsGrid from './testimonials/components/TestimonialsGrid';
import SuccessStories from './testimonials/components/SuccessStories';

export default function TestimonialsScreen(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HeaderNavigation />
      <TestimonialsHero />
      <TestimonialsGrid />
      <SuccessStories />
      <Footer />
    </AppTheme>
  );
}

