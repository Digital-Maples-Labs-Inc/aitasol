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

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderNavigation />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: '#ffffff',
            ...theme.applyStyles('dark', {
              backgroundColor: theme.palette.background.default,
            }),
          })}
        >
          <Container
            maxWidth="lg"
            sx={{ display: 'flex', flexDirection: 'column', pt: { xs: 14, sm: 20 }, pb: 8, gap: 4 }}
          >
            <MainContent />
            <Latest />
          </Container>
        </Box>
        <Footer />
      </Box>
    </AppTheme>
  );
}
