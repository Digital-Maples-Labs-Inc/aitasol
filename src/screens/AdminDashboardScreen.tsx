/**
 * Admin Dashboard Screen
 * Main dashboard for content management
 */

import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './admin-dashboard/components/AppNavbar';
import Header from './admin-dashboard/components/Header';
import MainGrid from './admin-dashboard/components/MainGrid';
import SideMenu from './admin-dashboard/components/SideMenu';
import AppTheme from '@/mui-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/mui-theme/customizations';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export function AdminDashboardScreen(props: { disableCustomTheme?: boolean }) {
  useRequireAuth();

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            minHeight: '100vh',
          })}
        >
          <AppNavbar />
          <Box
            sx={{
              pt: { xs: '64px', sm: '64px' }, // Account for fixed AppBar height
              minHeight: '100vh',
            }}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                pt: 3,
              }}
            >
              <Header />
              <MainGrid />
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}

export default AdminDashboardScreen;

