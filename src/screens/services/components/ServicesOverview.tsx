import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function ServicesOverview() {
  const { page, loading, getSection, updateSectionContent } = usePageData('services');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const overviewTitleSection = getSection('services-overview-title') || { id: 'services-overview-title', content: 'Comprehensive Education Consultancy Services', type: 'heading' as const };
  const overviewText1Section = getSection('services-overview-text-1') || { id: 'services-overview-text-1', content: 'At AitaSol, we offer a full range of services designed to support you at every step of your journey to studying in Canada. From initial consultations to post-arrival support, our team is dedicated to your success.', type: 'paragraph' as const };
  const overviewText2Section = getSection('services-overview-text-2') || { id: 'services-overview-text-2', content: "Whether you're looking to pursue undergraduate studies, graduate programs, or professional certifications, we have the expertise and resources to guide you through the entire process.", type: 'paragraph' as const };

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
        <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
        <EditableTextMUI
          value={overviewTitleSection.content}
          onSave={(value) => updateSectionContent(overviewTitleSection.id, value)}
          variant="h4"
          sx={{ mb: 2, display: 'block' }}
        />
        <EditableTextMUI
          value={overviewText1Section.content}
          onSave={(value) => updateSectionContent(overviewText1Section.id, value)}
          variant="body1"
          multiline
          sx={{ color: 'text.secondary', mb: 4, display: 'block' }}
        />
        <EditableTextMUI
          value={overviewText2Section.content}
          onSave={(value) => updateSectionContent(overviewText2Section.id, value)}
          variant="body1"
          multiline
          sx={{ color: 'text.secondary',           display: 'block' }}
        />
        </Box>
      </Container>
    </Box>
  );
}

