import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import ContactContent from './contact/components/ContactContent';

export default function ContactScreen(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <HeaderNavigation />
      <ContactContent />
      <Footer />
    </AppTheme>
  );
}
