import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '@/contexts/AuthContext';
import { SitemarkIcon } from './CustomIcons';

export default function AppNavbar() {
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleClose();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: '240px' },
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <SitemarkIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Admin Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {user?.email}
          </Typography>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </Avatar>
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <AccountCircleIcon sx={{ mr: 1, fontSize: 20 }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>
            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
            Sign Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

