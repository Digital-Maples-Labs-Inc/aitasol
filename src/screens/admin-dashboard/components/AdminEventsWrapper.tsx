import React from 'react';
import AdminDashboardScreen from '../../AdminDashboardScreen';
import AdminEventsScreen from '../../AdminEventsScreen';
import { Box, Stack } from '@mui/material';
import Header from './Header';
import SideMenu from './SideMenu';
import AppNavbar from './AppNavbar';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function AdminEventsWrapper() {
    useRequireAuth('admin');

    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
                <AppNavbar />
                <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
                    <Header />
                    <AdminEventsScreen />
                </Stack>
            </Box>
        </Box>
    );
}
