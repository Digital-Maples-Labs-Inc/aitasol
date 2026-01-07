import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkIcon from '@mui/icons-material/Work';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const services = [
  {
    title: 'Study in Canada',
    description: 'Comprehensive guidance on Canadian education system, institutions, and programs.',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    path: '/services/study-in-canada',
  },
  {
    title: 'Immigration & Study Permits',
    description: 'Expert assistance with study permit applications and immigration processes.',
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    path: '/services/immigration-study-permits',
  },
  {
    title: 'Admissions Support',
    description: 'Personalized help with university applications and document preparation.',
    icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
    path: '/services/admissions-support',
  },
  {
    title: 'Career Counseling',
    description: 'Professional guidance on career paths and job market opportunities in Canada.',
    icon: <WorkIcon sx={{ fontSize: 40 }} />,
    path: '/services/career-counseling',
  },
];

export default function ServiceCards() {
  const { page, loading, getSection, updateSectionContent } = usePageData('services');

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: '#ffffff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container sx={{ pb: { xs: 8, sm: 16 } }}>
        <Grid container spacing={4}>
        {services.map((service, index) => {
          const serviceTitleSection = getSection(`service-card-${index}-title`) || { 
            id: `service-card-${index}-title`, 
            content: service.title, 
            type: 'heading' as const 
          };
          const serviceDescSection = getSection(`service-card-${index}-desc`) || { 
            id: `service-card-${index}-desc`, 
            content: service.description, 
            type: 'paragraph' as const 
          };
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {service.icon}
                  </Box>
                  <EditableTextMUI
                    value={serviceTitleSection.content}
                    onSave={(value) => updateSectionContent(serviceTitleSection.id, value)}
                    variant="h6"
                    sx={{ mb: 1, display: 'block' }}
                  />
                  <EditableTextMUI
                    value={serviceDescSection.content}
                    onSave={(value) => updateSectionContent(serviceDescSection.id, value)}
                    variant="body2"
                    multiline
                    sx={{ color: 'text.secondary', display: 'block' }}
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigateTo(service.path)}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      </Container>
    </Box>
  );
}

