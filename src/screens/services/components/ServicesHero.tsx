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
        pt: { xs: 16, sm: 24 },
        pb: { xs: 0, sm: 2 },
        backgroundColor: 'background.default',
      })}
    >
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 4 }}>
          <EditableTextMUI
            value={heroTitleSection.content}
            onSave={(value) => updateSectionContent(heroTitleSection.id, value)}
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'text.primary',
              display: 'block',
              fontFamily: 'serif', // Trying to mimic the reference vibe
            }}
          />
        </Box>

        <EditableTextMUI
          value={heroSubtitleSection.content}
          onSave={(value) => updateSectionContent(heroSubtitleSection.id, value)}
          variant="h6"
          sx={{
            textAlign: 'left',
            color: 'text.secondary',
            maxWidth: '800px',
            display: 'block',
            fontWeight: 400,
            fontFamily: 'sans-serif'
          }}
        />
      </Container>
    </Box>
  );
}

