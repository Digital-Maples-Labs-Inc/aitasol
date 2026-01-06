import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import AboutHero from './about/components/AboutHero';
import CompanyStory from './about/components/CompanyStory';
import TeamSection from './about/components/TeamSection';
import CredentialsSection from './about/components/CredentialsSection';

export default function AboutScreen(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HeaderNavigation />
      <AboutHero />
      <CompanyStory />
      <TeamSection />
      <CredentialsSection />
      <Footer />
    </AppTheme>
  );
}

