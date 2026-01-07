import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import MainContent from './blog/components/MainContent';
import Latest from './blog/components/Latest';
import Footer from '@/components/Footer';

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <HeaderNavigation />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', pt: { xs: 14, md: 18 }, pb: 8, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </AppTheme>
  );
}
