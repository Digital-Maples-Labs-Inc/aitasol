import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';

export default function HomeIntro() {
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const introTitleSection = getSection('intro-title') || {
    id: 'intro-title',
    content: 'Clear Guidance for Global Education Decisions',
    type: 'heading' as const
  };
  const introTextSection = getSection('intro-text') || {
    id: 'intro-text',
    content: 'AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, and pre-departure with integrity.',
    type: 'paragraph' as const
  };
  const introText2Section = getSection('intro-text-2') || {
    id: 'intro-text-2',
    content: 'We understand that international education is a major financial and life decision. Our role is not to sell opportunities, but to help students evaluate them critically — based on academic readiness, financial sustainability, and long-term career alignment.',
    type: 'paragraph' as const
  };

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center' }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
            label="Why Choose Aitasol"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: 'primary.main',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              px: 1,
            }}
          />

          <EditableTextMUI
            value={introTitleSection.content}
            onSave={(value) => updateSectionContent(introTitleSection.id, value)}
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              maxWidth: '900px',
              display: 'block',
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          />

          <Stack spacing={3} sx={{ maxWidth: '800px' }}>
            <EditableTextMUI
              value={introTextSection.content}
              onSave={(value) => updateSectionContent(introTextSection.id, value)}
              variant="body1"
              multiline
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.6,
                color: 'text.secondary',
                display: 'block',
                fontWeight: 400
              }}
            />
            <EditableTextMUI
              value={introText2Section.content}
              onSave={(value) => updateSectionContent(introText2Section.id, value)}
              variant="body1"
              multiline
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.6,
                color: 'text.secondary',
                display: 'block',
                fontWeight: 400
              }}
            />
          </Stack>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigateTo('/contact')}
            sx={{
              mt: 2,
              px: 6,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: '50px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 2
            }}
          >
            Book a Consultation
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
