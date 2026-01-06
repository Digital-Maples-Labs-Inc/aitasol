import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

interface ServiceContentProps {
  serviceSlug?: string;
}

export default function ServiceContent({ serviceSlug }: ServiceContentProps) {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData(serviceSlug || '');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const contentTitleSection = getSection('service-content-title') || { id: 'service-content-title', content: 'What We Offer', type: 'heading' as const };
  const contentText1Section = getSection('service-content') || { id: 'service-content', content: 'Our comprehensive service includes personalized guidance tailored to your specific needs and goals. We work closely with you to ensure a smooth and successful experience.', type: 'paragraph' as const };
  const contentText2Section = getSection('service-content-2') || { id: 'service-content-2', content: 'With years of experience and a proven track record, we provide expert support at every step of your journey. Our team is committed to your success and will go above and beyond to help you achieve your educational and career objectives.', type: 'paragraph' as const };
  const serviceImageSection = getSection('service-image') || { id: 'service-image', content: '', type: 'image' as const, metadata: { imageUrl: '', imageAlt: 'Service image' } };

  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableTextMUI
            value={contentTitleSection.content}
            onSave={(value) => updateSectionContent(contentTitleSection.id, value)}
            variant="h4"
            sx={{ mb: 2, display: 'block' }}
          />
          <EditableTextMUI
            value={contentText1Section.content}
            onSave={(value) => updateSectionContent(contentText1Section.id, value)}
            variant="body1"
            multiline
            sx={{ color: 'text.secondary', mb: 2, display: 'block' }}
          />
          <EditableTextMUI
            value={contentText2Section.content}
            onSave={(value) => updateSectionContent(contentText2Section.id, value)}
            variant="body1"
            multiline
            sx={{ color: 'text.secondary', display: 'block' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableImageMUI
            src={serviceImageSection.metadata?.imageUrl || serviceImageSection.content || '/placeholder-service.jpg'}
            alt={serviceImageSection.metadata?.imageAlt || 'Service image'}
            onSave={(url) => updateSectionImage(serviceImageSection.id, url, serviceImageSection.metadata?.imageAlt)}
            sx={{
              height: '100%',
              minHeight: 300,
              borderRadius: 2,
              overflow: 'hidden',
            }}
            aspectRatio="16/9"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

