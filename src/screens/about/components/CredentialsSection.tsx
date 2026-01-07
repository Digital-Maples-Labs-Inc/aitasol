import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const defaultCredentials = [
  {
    title: 'Licensed Consultants',
    description: 'All our consultants are licensed and certified to provide immigration and education advice.',
  },
  {
    title: 'Years of Experience',
    description: 'Over 5 years of combined experience helping students achieve their educational goals.',
  },
  {
    title: 'Success Rate',
    description: '95% success rate in student visa applications and admissions.',
  },
  {
    title: 'Partnerships',
    description: 'Established partnerships with leading Canadian educational institutions.',
  },
];

export default function CredentialsSection() {
  const { page, loading, getSection, updateSectionContent } = usePageData('about');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const credentialsTitleSection = getSection('credentials-title') || { id: 'credentials-title', content: 'Our Credentials', type: 'heading' as const };

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
        <EditableTextMUI
        value={credentialsTitleSection.content}
        onSave={(value) => updateSectionContent(credentialsTitleSection.id, value)}
        variant="h3"
        sx={{ textAlign: 'center', mb: 4, display: 'block' }}
      />
      <Grid container spacing={3}>
        {defaultCredentials.map((credential, index) => {
          const credentialTitleSection = getSection(`credential-${index}-title`) || { 
            id: `credential-${index}-title`, 
            content: credential.title, 
            type: 'heading' as const 
          };
          const credentialDescSection = getSection(`credential-${index}-desc`) || { 
            id: `credential-${index}-desc`, 
            content: credential.description, 
            type: 'paragraph' as const 
          };
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <EditableTextMUI
                    value={credentialTitleSection.content}
                    onSave={(value) => updateSectionContent(credentialTitleSection.id, value)}
                    variant="h6"
                    sx={{ mb: 1, display: 'block' }}
                  />
                  <EditableTextMUI
                    value={credentialDescSection.content}
                    onSave={(value) => updateSectionContent(credentialDescSection.id, value)}
                    variant="body2"
                    multiline
                    sx={{ color: 'text.secondary', display: 'block' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      </Container>
    </Box>
  );
}

