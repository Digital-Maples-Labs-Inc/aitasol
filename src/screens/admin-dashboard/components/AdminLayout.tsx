import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './AppNavbar';
import SideMenu from './SideMenu';
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

interface AdminLayoutProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

export default function AdminLayout({ children, disableCustomTheme }: AdminLayoutProps) {
  useRequireAuth();

  return (
    <AppTheme disableCustomTheme={disableCustomTheme} themeComponents={xThemeComponents}>
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
              {children}
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}

