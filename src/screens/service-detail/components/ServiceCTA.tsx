import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

interface ServiceCTAProps {
  serviceSlug?: string;
}

export default function ServiceCTA({ serviceSlug }: ServiceCTAProps) {
  const { page, loading, getSection, updateSectionContent } = usePageData(serviceSlug || '');

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

  const ctaTitleSection = getSection('service-cta-title') || { id: 'service-cta-title', content: 'Ready to Get Started?', type: 'heading' as const };
  const ctaTextSection = getSection('service-cta-text') || { id: 'service-cta-text', content: 'Contact us today to learn more about how we can help you achieve your educational goals.', type: 'paragraph' as const };

  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <EditableTextMUI
          value={ctaTitleSection.content}
          onSave={(value) => updateSectionContent(ctaTitleSection.id, value)}
          variant="h4"
          sx={{ mb: 2, display: 'block', color: 'inherit' }}
        />
        <EditableTextMUI
          value={ctaTextSection.content}
          onSave={(value) => updateSectionContent(ctaTextSection.id, value)}
          variant="body1"
          multiline
          sx={{ mb: 4, opacity: 0.9, display: 'block', color: 'inherit' }}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigateTo('/contact')}
          >
            Contact Us
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigateTo('/services')}
          >
            View All Services
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

