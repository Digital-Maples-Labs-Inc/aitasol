import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import ColorModeIconDropdown from '@/mui-theme/ColorModeIconDropdown';

interface FooterLinkProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ label, onClick, href }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (onClick) {
    return (
      <Link
        component="button"
        onClick={handleClick}
        sx={{
          color: 'text.secondary',
          fontSize: '0.875rem',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      sx={{
        color: 'text.secondary',
        fontSize: '0.875rem',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      {label}
    </Link>
  );
};

export default function Footer() {
  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        px: { xs: 3, sm: 6 },
        py: { xs: 2.5, sm: 5 },
        backgroundColor: '#ffffff',
        borderTop: '1px solid',
        borderColor: 'divider',
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container maxWidth="lg">
        {/* Top nav */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: 'wrap',
            mb: 2,
            gap: 2,
          }}
        >
          <FooterLink label="Home" onClick={() => navigateTo('/')} />
          <FooterLink label="About" onClick={() => navigateTo('/about')} />
          <FooterLink label="Services" onClick={() => navigateTo('/services')} />
          <FooterLink label="Testimonials" onClick={() => navigateTo('/testimonials')} />
          <FooterLink label="Blog" onClick={() => navigateTo('/blog')} />
          <FooterLink label="Contact" onClick={() => navigateTo('/contact')} />
          <FooterLink label="FAQ" onClick={() => navigateTo('/faq')} />
          <FooterLink label="Privacy" onClick={() => navigateTo('/privacy')} />
        </Stack>

        {/* Divider */}
        <Divider sx={{ mb: 2, borderColor: 'divider' }} />

        {/* Bottom row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            © {new Date().getFullYear()} Aitasol. All rights reserved. Developed by{' '}
            <Link
              href="https://digitalmaples.agency/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Digital Maples Labs
            </Link>
            .
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <FooterLink label="Terms" onClick={() => navigateTo('/terms')} />
            <FooterLink label="Privacy" onClick={() => navigateTo('/privacy')} />
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ ml: 1 }}
            >
              <IconButton
                color="inherit"
                size="small"
                href="https://github.com/mui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: 'text.secondary' }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                href="https://x.com/MaterialUI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                sx={{ color: 'text.secondary' }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                href="https://www.linkedin.com/company/mui/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: 'text.secondary' }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <ColorModeIconDropdown
                size="small"
                color="inherit"
                sx={{ color: 'text.secondary' }}
              />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
