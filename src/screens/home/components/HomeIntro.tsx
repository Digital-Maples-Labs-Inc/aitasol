import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
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
    content: 'AitahSolutions Educational Consultancy supports students in making informed, ethical, and realistic decisions about studying abroad. Since 2019, we have guided students through program selection, applications, documentation, funding awareness, and pre-departure preparation with clarity and integrity.', 
    type: 'paragraph' as const 
  };
  const introText2Section = getSection('intro-text-2') || { 
    id: 'intro-text-2', 
    content: 'We understand that international education is a major financial and life decision. Our role is not to sell opportunities, but to help students evaluate them critically — based on academic readiness, financial sustainability, and long-term career alignment.', 
    type: 'paragraph' as const 
  };
  const introText3Section = getSection('intro-text-3') || { 
    id: 'intro-text-3', 
    content: 'We work with established education platforms and professional partners while remaining independent in our advice. Admissions decisions, visas, and funding outcomes are never guaranteed; informed decision-making is.', 
    type: 'paragraph' as const 
  };

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: '#ffffff',
        pt: { xs: 8, sm: 12 },
        pb: { xs: 8, sm: 12 },
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center' }}>
          <EditableTextMUI
            value={introTitleSection.content}
            onSave={(value) => updateSectionContent(introTitleSection.id, value)}
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              maxWidth: '900px',
              display: 'block',
            }}
          />
          
          <Stack spacing={3} sx={{ maxWidth: '800px' }}>
            <EditableTextMUI
              value={introTextSection.content}
              onSave={(value) => updateSectionContent(introTextSection.id, value)}
              variant="body1"
              multiline
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.8,
                color: 'text.secondary',
                display: 'block',
              }}
            />
            <EditableTextMUI
              value={introText2Section.content}
              onSave={(value) => updateSectionContent(introText2Section.id, value)}
              variant="body1"
              multiline
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.8,
                color: 'text.secondary',
                display: 'block',
              }}
            />
            <EditableTextMUI
              value={introText3Section.content}
              onSave={(value) => updateSectionContent(introText3Section.id, value)}
              variant="body1"
              multiline
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.8,
                color: 'text.secondary',
                display: 'block',
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip 
              label="📌 Ethical guidance. Transparent processes. Student-centered outcomes."
              sx={{ 
                fontSize: '0.95rem',
                py: 2.5,
                px: 1,
                height: 'auto',
              }}
            />
          </Stack>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigateTo('/contact')}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            👉 Book a Consultation
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

