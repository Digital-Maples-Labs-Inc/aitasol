import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { ServiceData } from '@/services/serviceData';
import { usePageData } from '@/hooks/usePageData';

interface ServiceContentProps {
  serviceSlug: string;
  defaultData?: ServiceData;
}

export default function ServiceContent({ serviceSlug, defaultData }: ServiceContentProps) {
  const { getSection, updateSectionContent, updateSectionImage } = usePageData(`service-detail-${serviceSlug}`);

  const contentTitleSection = getSection('content-title') || {
    id: 'content-title',
    content: defaultData?.contentTitle || 'Service Overview',
    type: 'heading' as const
  };

  const contentText1Section = getSection('content-text-1') || {
    id: 'content-text-1',
    content: defaultData?.content1 || 'Detailed description of the service goes here.',
    type: 'paragraph' as const
  };

  const contentText2Section = getSection('content-text-2') || {
    id: 'content-text-2',
    content: defaultData?.content2 || 'More details about the process and expected outcomes.',
    type: 'paragraph' as const
  };

  const sideImageSection = getSection('side-action-image') || {
    id: 'side-action-image',
    content: defaultData?.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800',
    type: 'image' as const
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>

          {/* Left Column: Sticky Action Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: { md: 'sticky' }, top: 120 }}>
              <Box sx={{
                p: 3,
                borderRadius: '32px',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
              }}>
                <Box sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  mb: 3,
                  position: 'relative'
                }}>
                  <EditableImageMUI
                    src={sideImageSection.content}
                    onSave={(url) => updateSectionImage(sideImageSection.id, url)}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 700, mb: 1 }}>
                  Ready to start?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Book a consultation with our experts to begin your journey.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<NorthEastIcon />}
                  sx={{
                    borderRadius: '50px',
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  Book Consultation
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Main Content */}
          <Grid size={{ xs: 12, md: 8 }} sx={{ pl: { md: 6 } }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5, mb: 2, display: 'block' }}>
              OVERVIEW
            </Typography>

            <EditableTextMUI
              value={contentTitleSection.content}
              onSave={(value) => updateSectionContent(contentTitleSection.id, value)}
              variant="h2"
              sx={{
                fontFamily: 'serif',
                fontWeight: 500,
                mb: 4,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            />

            <EditableTextMUI
              value={contentText1Section.content}
              onSave={(value) => updateSectionContent(contentText1Section.id, value)}
              variant="body1"
              multiline
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8
              }}
            />

            <EditableTextMUI
              value={contentText2Section.content}
              onSave={(value) => updateSectionContent(contentText2Section.id, value)}
              variant="body1"
              multiline
              sx={{
                color: 'text.secondary',
                mb: 6,
                fontSize: '1.1rem',
                lineHeight: 1.8
              }}
            />

            {/* "What You'll Learn" / Benefits List */}
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" sx={{ fontFamily: 'serif', mb: 4 }}>
                Key Benefits
              </Typography>
              <Stack spacing={2}>
                {[
                  'Comprehensive analysis of your options',
                  'Personalized roadmap for success',
                  'Expert guidance on documentation',
                  ' Ongoing support until arrival'
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <CheckCircleIcon color="primary" sx={{ mt: 0.5 }} />
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
