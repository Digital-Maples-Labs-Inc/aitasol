import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

export default function AboutHero() {
  const { page, loading, getSection, updateSectionContent } = usePageData('about');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const heroTitleSection = getSection('about-hero') || { id: 'about-hero', content: 'Empowering Your Global Academic Journey', type: 'heading' as const };
  const heroSubtitleSection = getSection('about-intro') || { id: 'about-intro', content: 'We bridge the gap between ambition and achievement with ethical, student-centered guidance.', type: 'paragraph' as const };

  return (
    <Box sx={{ pt: { xs: 16, md: 24 }, pb: 6, bgcolor: 'transparent' }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={3} sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '100px',
            px: 2,
            py: 0.5,
            bgcolor: 'background.paper',
            display: 'inline-flex'
          }}>
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, color: 'text.secondary', lineHeight: 1 }}>
              ABOUT US
            </Typography>
          </Box>

          <EditableTextMUI
            value={heroTitleSection.content}
            onSave={(value) => updateSectionContent(heroTitleSection.id, value)}
            variant="h1"
            sx={{
              fontFamily: 'serif',
              fontWeight: 500,
              fontSize: { xs: '2.5rem', md: '4.5rem' }, // Slightly smaller than service hero for multi-line potential
              lineHeight: 1.1,
              maxWidth: '1000px',
              textTransform: 'none'
            }}
          />

          <EditableTextMUI
            value={heroSubtitleSection.content}
            onSave={(value) => updateSectionContent(heroSubtitleSection.id, value)}
            variant="h5"
            sx={{
              maxWidth: '800px',
              color: 'text.secondary',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          />
        </Stack>

        <Box sx={{
          width: '100%',
          aspectRatio: { xs: '4/3', md: '21/9' },
          borderRadius: { xs: '24px', md: '48px' },
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.05)'
        }}>
          <EditableImageMUI
            src={'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80'}
            onSave={(url) => console.log('Update hero image')}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              pointerEvents: 'none'
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

