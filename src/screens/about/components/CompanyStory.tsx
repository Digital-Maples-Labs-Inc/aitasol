import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

export default function CompanyStory() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('about');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const storyTitleSection = getSection('company-story-title') || { id: 'company-story-title', content: 'Our Story', type: 'heading' as const };
  const storyText1Section = getSection('company-story-text-1') || { id: 'company-story-text-1', content: "AitaSol was founded with a mission to provide clear guidance for global education decisions. We understand that choosing the right educational path is one of the most important decisions you'll make, and we're here to help you navigate this journey with confidence.", type: 'paragraph' as const };
  const storyText2Section = getSection('company-story-text-2') || { id: 'company-story-text-2', content: 'Our team of experienced education consultants has helped thousands of students achieve their dreams of studying abroad, particularly in Canada. We combine personalized guidance with comprehensive support to ensure your success.', type: 'paragraph' as const };
  const storyImageSection = getSection('company-story-image') || { id: 'company-story-image', content: '', type: 'image' as const, metadata: { imageUrl: '', imageAlt: 'Company story image' } };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: '#ffffff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container sx={{ py: { xs: 8, sm: 16 } }}>
        <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableTextMUI
            value={storyTitleSection.content}
            onSave={(value) => updateSectionContent(storyTitleSection.id, value)}
            variant="h3"
            sx={{ mb: 2, display: 'block' }}
          />
          <EditableTextMUI
            value={storyText1Section.content}
            onSave={(value) => updateSectionContent(storyText1Section.id, value)}
            variant="body1"
            multiline
            sx={{ color: 'text.secondary', mb: 2, display: 'block' }}
          />
          <EditableTextMUI
            value={storyText2Section.content}
            onSave={(value) => updateSectionContent(storyText2Section.id, value)}
            variant="body1"
            multiline
            sx={{ color: 'text.secondary', display: 'block' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableImageMUI
            src={storyImageSection.metadata?.imageUrl || storyImageSection.content || '/placeholder-company.jpg'}
            alt={storyImageSection.metadata?.imageAlt || 'Company story image'}
            onSave={(url) => updateSectionImage(storyImageSection.id, url, storyImageSection.metadata?.imageAlt)}
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
    </Box>
  );
}

