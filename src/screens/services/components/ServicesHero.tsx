import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function ServicesHero() {
  const { page, loading, getSection, updateSectionContent } = usePageData('services');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const heroTitleSection = getSection('services-hero') || { id: 'services-hero', content: 'Our Services', type: 'heading' as const };
  const heroSubtitleSection = getSection('services-intro') || { id: 'services-intro', content: 'Comprehensive support for your educational journey to Canada', type: 'paragraph' as const };

  return (
    <Box
      sx={(theme) => ({
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
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

