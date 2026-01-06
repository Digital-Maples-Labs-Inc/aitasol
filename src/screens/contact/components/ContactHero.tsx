import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ContactHero() {
  return (
    <Box
      sx={{
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
      }}
    >
      <Container>
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            fontWeight: 600,
            textAlign: 'center',
            mb: 2,
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Get in touch with our team to start your educational journey
        </Typography>
      </Container>
    </Box>
  );
}

