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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import Stack from '@mui/material/Stack';
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
  borderColor: alpha(theme.palette.secondary.main, 0.1),
  background: alpha(theme.palette.primary.main, 0.9), // Subtle Yellow
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
          {/* LEFT: Logo */}
          <Box
            onClick={() => navigateTo('/')}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              mr: 3,
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.25))', // Added shadow for visibility
            }}
          >
            <SitemarkIcon />
          </Box>

          {/* SPACER */}
          <Box sx={{ flexGrow: 1 }} />

          {/* RIGHT: Navigation Links (Desktop Only) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {['Home', 'About', 'Services', 'Testimonials', 'Blog', 'Contact'].map((item) => (
              <Button
                key={item}
                variant="text"
                onClick={() => navigateTo(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                sx={{
                  color: 'text.primary', // Dark text for contrast
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '&:hover': { color: 'white' }, // White on hover against yellow
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* RIGHT Actions (Editing Mode) */}
          {showEditingModeSwitcher && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              <SelectContent />
            </Box>
          )}

          {/* MOBILE: Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      {/* Mobile Drawer - Outside StyledToolbar */}
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
            onClick={() => navigateTo('/services/program-selection')}
            sx={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            &nbsp;&nbsp;→ Program Selection
          </MenuItem>
          <MenuItem
            onClick={() => navigateTo('/services/application-support')}
            sx={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            &nbsp;&nbsp;→ Application Support
          </MenuItem>
          <MenuItem
            onClick={() => navigateTo('/services/admissions-docs')}
            sx={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            &nbsp;&nbsp;→ Admissions Docs
          </MenuItem>
          <MenuItem
            onClick={() => navigateTo('/services/scholarships')}
            sx={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            &nbsp;&nbsp;→ Scholarships
          </MenuItem>
          <MenuItem
            onClick={() => navigateTo('/services/career-pathway')}
            sx={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            &nbsp;&nbsp;→ Career Counselling
          </MenuItem>
          <MenuItem
            onClick={() => navigateTo('/services/immigration-support')}
            sx={{ fontSize: '0.95rem', fontWeight: 500 }}
          >
            &nbsp;&nbsp;→ Immigration Support
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
    </AppBar>
  );
}
