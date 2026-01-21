import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { ServiceData } from '@/services/serviceData';
import { usePageData } from '@/hooks/usePageData';

interface ServiceHeroProps {
  serviceSlug: string;
  defaultData?: ServiceData;
}

export default function ServiceHero({ serviceSlug, defaultData }: ServiceHeroProps) {
  const { getSection, updateSectionContent, updateSectionImage } = usePageData(`service-detail-${serviceSlug}`);

  const heroTitleSection = getSection('hero-title') || {
    id: 'hero-title',
    content: defaultData?.title || 'Service Title',
    type: 'heading' as const
  };

  const heroSubtitleSection = getSection('hero-subtitle') || {
    id: 'hero-subtitle',
    content: defaultData?.subtitle || 'Service Subtitle',
    type: 'paragraph' as const
  };

  const imageSectionId = `hero-image-${serviceSlug}`;

  return (
    <Box sx={{ pt: { xs: 20, md: 24 }, pb: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={4} sx={{ textAlign: 'center', mb: 8 }}>

          {/* Badge */}
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
              SERVICES
            </Typography>
          </Box>

          {/* Title */}
          <EditableTextMUI
            value={heroTitleSection.content}
            onSave={(value) => updateSectionContent(heroTitleSection.id, value)}
            variant="h1"
            sx={{
              fontFamily: 'serif',
              fontWeight: 500,
              fontSize: { xs: '2.5rem', md: '5rem' },
              lineHeight: 1.1,
              maxWidth: '900px',
              textTransform: 'none'
            }}
          />

          {/* Subtitle */}
          <EditableTextMUI
            value={heroSubtitleSection.content}
            onSave={(value) => updateSectionContent(heroSubtitleSection.id, value)}
            variant="h5"
            sx={{
              maxWidth: '700px',
              color: 'text.secondary',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          />
        </Stack>

        {/* Hero Image */}
        <Box sx={{
          width: '100%',
          aspectRatio: { xs: '4/3', md: '21/9' },
          borderRadius: { xs: '24px', md: '48px' },
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)', // Deep shadow
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.05)'
        }}>
          <EditableImageMUI
            src={defaultData?.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200'}
            onSave={(url) => updateSectionImage(imageSectionId, url)}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Gradient Overlay for Cinematic feel */}
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
