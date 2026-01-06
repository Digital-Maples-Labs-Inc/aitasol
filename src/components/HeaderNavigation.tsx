import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ColorModeIconDropdown from '@/mui-theme/ColorModeIconDropdown';
import { useAuth } from '@/contexts/AuthContext';
import SelectContent from '@/screens/admin-dashboard/components/SelectContent';
import SitemarkIcon from './SitemarkIcon';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '2px 12px',
}));

export default function HeaderNavigation() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = React.useState<null | HTMLElement>(null);
  const servicesMenuOpen = Boolean(servicesAnchorEl);
  
  // Check if user is logged in and has editor/admin role
  const showEditingModeSwitcher = user && (user.role === 'admin' || user.role === 'editor');

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleServicesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null);
  };

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
      handleServicesMenuClose();
      setOpen(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* Left Menu Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flex: 1, justifyContent: 'flex-end', pr: 4 }}>
            <Button 
              variant="text" 
              color="info" 
              size="medium"
              onClick={() => navigateTo('/')}
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Home
            </Button>
            <Button 
              variant="text" 
              color="info" 
              size="medium"
              onClick={() => navigateTo('/about')}
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              About
            </Button>
            <Button
              variant="text"
              color="info"
              size="medium"
              onClick={handleServicesMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Services
            </Button>
            <Menu
              anchorEl={servicesAnchorEl}
              open={servicesMenuOpen}
              onClose={handleServicesMenuClose}
              MenuListProps={{
                'aria-labelledby': 'services-button',
              }}
            >
              <MenuItem onClick={() => navigateTo('/services')}>Services Overview</MenuItem>
              <Divider />
              <MenuItem onClick={() => navigateTo('/services/study-in-canada')}>
                Study in Canada
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/services/immigration-study-permits')}>
                Immigration & Study Permits
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/services/admissions-support')}>
                Admissions Support
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/services/career-counseling')}>
                Career Counseling
              </MenuItem>
            </Menu>
          </Box>

          {/* Center Logo */}
          <Box 
            onClick={() => navigateTo('/')} 
            sx={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SitemarkIcon />
          </Box>

          {/* Right Menu Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flex: 1, justifyContent: 'flex-start', pl: 4 }}>
            <Button 
              variant="text" 
              color="info" 
              size="medium"
              onClick={() => navigateTo('/testimonials')}
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Testimonials
            </Button>
            <Button 
              variant="text" 
              color="info" 
              size="medium"
              onClick={() => navigateTo('/blog')}
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Blog
            </Button>
            <Button 
              variant="text" 
              color="info" 
              size="medium"
              onClick={() => navigateTo('/contact')}
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Contact
            </Button>
          </Box>

          {/* Right Side Actions (Editing Mode & Theme Toggle) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
              ml: 2,
            }}
          >
            {showEditingModeSwitcher && (
              <Box sx={{ mr: 1 }}>
                <SelectContent />
              </Box>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem 
                  onClick={() => navigateTo('/')}
                  sx={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  Home
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/about')}
                  sx={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  About AitaSol
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/services')}
                  sx={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  Services Overview
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/services/study-in-canada')}
                  sx={{ fontSize: '0.95rem', fontWeight: 500 }}
                >
                  &nbsp;&nbsp;→ Study in Canada
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/services/immigration-study-permits')}
                  sx={{ fontSize: '0.95rem', fontWeight: 500 }}
                >
                  &nbsp;&nbsp;→ Immigration & Study Permits
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/services/admissions-support')}
                  sx={{ fontSize: '0.95rem', fontWeight: 500 }}
                >
                  &nbsp;&nbsp;→ Admissions Support
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/services/career-counseling')}
                  sx={{ fontSize: '0.95rem', fontWeight: 500 }}
                >
                  &nbsp;&nbsp;→ Career Counseling
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/testimonials')}
                  sx={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  Success Stories / Testimonials
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/blog')}
                  sx={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  Blog
                </MenuItem>
                <MenuItem 
                  onClick={() => navigateTo('/contact')}
                  sx={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  Contact Us
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
