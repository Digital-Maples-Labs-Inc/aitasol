import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function SuccessStories() {
  const { page, loading, getSection, updateSectionContent } = usePageData('testimonials');

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  const successTitleSection = getSection('success-title') || { id: 'success-title', content: 'Ready to Write Your Success Story?', type: 'heading' as const };
  const successTextSection = getSection('success-text') || { id: 'success-text', content: 'Join hundreds of successful students who have achieved their educational dreams with AitaSol. Let us help you start your journey today.', type: 'paragraph' as const };

  return (
    <Box sx={{ bgcolor: 'background.secondary', py: { xs: 8, sm: 16 } }}>
      <Container>
        <Box sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto' }}>
          <EditableTextMUI
            value={successTitleSection.content}
            onSave={(value) => updateSectionContent(successTitleSection.id, value)}
            variant="h4"
            sx={{ mb: 2, display: 'block' }}
          />
          <EditableTextMUI
            value={successTextSection.content}
            onSave={(value) => updateSectionContent(successTextSection.id, value)}
            variant="body1"
            multiline
            sx={{ color: 'text.secondary', mb: 4, display: 'block' }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigateTo('/contact')}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigateTo('/services')}
            >
              View Services
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

