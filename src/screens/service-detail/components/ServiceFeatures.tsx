import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

interface ServiceFeaturesProps {
  serviceSlug?: string;
}

export default function ServiceFeatures({ serviceSlug }: ServiceFeaturesProps) {
  const { page, loading, getSection, updateSectionContent } = usePageData(serviceSlug || '');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const featuresTitleSection = getSection('service-features-title') || { id: 'service-features-title', content: "What's Included", type: 'heading' as const };
  
  // Get features from sections or use defaults
  const defaultFeatures = [
    'Personalized consultation',
    'Expert guidance and support',
    'Comprehensive documentation',
    'Timely updates and communication',
    'Post-service support',
  ];
  
  const features = defaultFeatures.map((feature, index) => {
    const section = getSection(`service-feature-${index}`);
    return section?.content || feature;
  });

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: '#ffffff',
        py: { xs: 8, sm: 16 },
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container>
        <EditableTextMUI
          value={featuresTitleSection.content}
          onSave={(value) => updateSectionContent(featuresTitleSection.id, value)}
          variant="h4"
          sx={{ textAlign: 'center', mb: 4, display: 'block' }}
        />
        <Grid container spacing={2}>
          {features.map((feature, index) => {
            const featureSection = getSection(`service-feature-${index}`) || { 
              id: `service-feature-${index}`, 
              content: feature, 
              type: 'paragraph' as const 
            };
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon color="primary" />
                    <EditableTextMUI
                      value={featureSection.content}
                      onSave={(value) => updateSectionContent(featureSection.id, value)}
                      variant="body1"
                      sx={{ flex: 1 }}
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

