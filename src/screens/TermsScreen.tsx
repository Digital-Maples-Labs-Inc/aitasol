import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import TermsContent from './terms/components/TermsContent';

export default function TermsScreen(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <HeaderNavigation />
        <Box sx={{ flex: 1 }}>
          <TermsContent />
        </Box>
        <Footer />
      </Box>
    </AppTheme>
  );
}

