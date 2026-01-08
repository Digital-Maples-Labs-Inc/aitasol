import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppTheme from '@/mui-theme/AppTheme';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import PrivacyContent from './privacy/components/PrivacyContent';

export default function PrivacyScreen(props: { disableCustomTheme?: boolean }) {
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
          <PrivacyContent />
        </Box>
        <Footer />
      </Box>
    </AppTheme>
  );
}

