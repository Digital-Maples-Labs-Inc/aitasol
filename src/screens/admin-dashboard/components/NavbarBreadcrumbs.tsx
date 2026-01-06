import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import HomeIcon from '@mui/icons-material/Home';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const [pathSegments, setPathSegments] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathSegments(window.location.pathname.split('/').filter(Boolean));
    }
  }, []);

  const getPageTitle = () => {
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment === 'dashboard') return 'Dashboard';
    if (lastSegment === 'pages') return 'Pages';
    if (lastSegment === 'blogs') return 'Blogs';
    if (lastSegment === 'theme') return 'Theme';
    if (lastSegment === 'settings') return 'Settings';
    return 'Dashboard';
  };

  const handleBreadcrumbClick = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link
        component="button"
        variant="body1"
        onClick={() => handleBreadcrumbClick('/')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'text.secondary',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
        Home
      </Link>
      <Link
        component="button"
        variant="body1"
        onClick={() => handleBreadcrumbClick('/admin/dashboard')}
        sx={{
          textDecoration: 'none',
          color: 'text.secondary',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Admin
      </Link>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {getPageTitle()}
      </Typography>
    </StyledBreadcrumbs>
  );
}

