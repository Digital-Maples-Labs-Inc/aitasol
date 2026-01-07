import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
      <Box
        component="main"
        sx={(theme) => ({
          backgroundColor: theme.palette.mode === 'dark' 
            ? theme.palette.background.default 
            : '#ffffff',
          minHeight: '100vh',
        })}
      >
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: 'column', pt: { xs: 14, md: 18 }, pb: 8, gap: 4 }}
        >
          <MainContent />
          <Latest />
        </Container>
      </Box>
      <Footer />
    </AppTheme>
  );
}
