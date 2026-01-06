import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Content() {
  return (
    <Stack
      direction="column"
      sx={{
        flex: '1 1 50%',
        gap: 4,
        justifyContent: 'center',
        alignItems: { xs: 'center', md: 'flex-start' },
        px: { xs: 2, sm: 4 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          Welcome to{' '}
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
            })}
          >
            Aitasol
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary' }}>
          Education Consultancy Platform
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: '500px' }}>
          Manage your content, blogs, and website pages with ease. Sign in to access the admin dashboard.
        </Typography>
      </Box>
    </Stack>
  );
}

