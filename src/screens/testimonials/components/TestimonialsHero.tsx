import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function TestimonialsHero() {
  const { page, loading, getSection, updateSectionContent } = usePageData('testimonials');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const heroTitleSection = getSection('testimonials-hero') || { id: 'testimonials-hero', content: 'Success Stories', type: 'heading' as const };
  const heroSubtitleSection = getSection('testimonials-intro') || { id: 'testimonials-intro', content: 'Hear from students who have achieved their dreams with AitaSol', type: 'paragraph' as const };

  return (
    <Box
      sx={{
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
      }}
    >
      <Container>
        <EditableTextMUI
          value={heroTitleSection.content}
          onSave={(value) => updateSectionContent(heroTitleSection.id, value)}
          variant="h1"
          sx={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            fontWeight: 600,
            textAlign: 'center',
            mb: 2,
            display: 'block',
          }}
        />
        <EditableTextMUI
          value={heroSubtitleSection.content}
          onSave={(value) => updateSectionContent(heroSubtitleSection.id, value)}
          variant="h5"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
            display: 'block',
          }}
        />
      </Container>
    </Box>
  );
}

