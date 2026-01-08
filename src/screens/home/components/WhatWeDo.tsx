import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';

const services = [
  'Match students with suitable programs and institutions',
  'Support accurate and compliant application processes',
  'Guide admissions documentation preparation',
  'Provide scholarship and funding information',
  'Offer career counselling and pathway planning',
  'Coordinate pre-arrival and settlement support',
];

export default function WhatWeDo() {
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const titleSection = getSection('what-we-do-title') || { 
    id: 'what-we-do-title', 
    content: 'What We Do', 
    type: 'heading' as const 
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
        <Stack spacing={4} alignItems="center">
          <EditableTextMUI
            value={titleSection.content}
            onSave={(value) => updateSectionContent(titleSection.id, value)}
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              display: 'block',
            }}
          />
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {services.map((service, index) => {
              const serviceSection = getSection(`what-we-do-${index}`) || { 
                id: `what-we-do-${index}`, 
                content: service, 
                type: 'paragraph' as const 
              };
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      p: 2,
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <CheckCircleIcon 
                          color="primary" 
                          sx={{ mt: 0.5, flexShrink: 0 }}
                        />
                        <EditableTextMUI
                          value={serviceSection.content}
                          onSave={(value) => updateSectionContent(serviceSection.id, value)}
                          variant="body1"
                          sx={{ 
                            color: 'text.primary',
                            display: 'block',
                          }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

