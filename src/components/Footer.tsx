import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import ColorModeIconDropdown from '@/mui-theme/ColorModeIconDropdown';
import SitemarkIcon from './SitemarkIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="/">
        Aitasol.
      </Link>
      &nbsp; 
      {new Date().getFullYear()}. All rights reserved. Developed by <Link color="text.secondary" href="https://digitalmaples.agency/">Digital Maples Labs</Link>.
    </Typography>
  );
}

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          gap: { xs: 4, sm: 6, md: 8 },
          alignItems: { xs: 'flex-start', sm: 'flex-start' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flex: { xs: '1 1 100%', sm: '1 1 40%', md: '1 1 35%' },
            maxWidth: { xs: '100%', sm: '40%', md: '35%' },
          }}
        >
          <Box>
            <SitemarkIcon />
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2, lineHeight: 1.7 }}>
              AitahSolutions Educational Consultancy provides ethical, informed, and student-centered guidance for individuals pursuing international education pathways. Since 2019, we have helped students make academically sound, financially realistic, and career-aligned study decisions through transparent advising and evidence-based recommendations.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: { sm: 4, md: 6 },
            flex: { sm: '0 0 auto' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: { sm: '140px', md: '160px' },
            }}
          >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Services
          </Typography>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/services');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Services Overview
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/services/study-in-canada');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Study in Canada
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/services/immigration-study-permits');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Immigration & Study Permits
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/services/admissions-support');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Admissions Support
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/services/career-counseling');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Career Counseling
          </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: { sm: '140px', md: '160px' },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/about');
            }}
            sx={{ cursor: 'pointer' }}
          >
            About AitaSol
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/testimonials');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Success Stories
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/blog');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Blog
          </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: { sm: '120px', md: '140px' },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Legal
            </Typography>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/terms');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Terms
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/privacy');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Privacy
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/contact');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Contact
          </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/privacy');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link
            color="text.secondary"
            variant="body2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/terms');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://x.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
          <ColorModeIconDropdown 
            size="small"
            color="inherit"
            sx={{ alignSelf: 'center' }}
          />
        </Stack>
      </Box>
    </Container>
  );
}
