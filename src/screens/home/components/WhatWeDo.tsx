import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

const defaultServices = [
  {
    icon: <SchoolRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />,
    title: 'Program and Institution Selection',
    desc: 'Structured selection services to identify academic options aligning with your background and goals.'
  },
  {
    icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />,
    title: 'Application Process Support',
    desc: 'Guidance on navigating administrative requirements, timelines, and forms to ensure accurate submissions.'
  },
  {
    icon: <DescriptionRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />,
    title: 'Admissions Documentation',
    desc: 'Assistance in preparing high-quality SOPs, CVs, and transcripts adhering to institutional expectations.'
  },
  {
    icon: <MonetizationOnRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />,
    title: 'Scholarships and Funding',
    desc: 'Information on scholarships and financial planning to help you understand costs and funding opportunities.'
  },
  {
    icon: <TrendingUpRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />,
    title: 'Career Counselling',
    desc: 'Strategic advice aligning your education choices with long-term employability and market trends.'
  },
  {
    icon: <FlightTakeoffRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />,
    title: 'Immigration & Pre-Arrival',
    desc: 'Connection to licensed consultants for visa advice and coordination for your smooth arrival.'
  },
];

export default function WhatWeDo() {
  const { page, loading, getSection, updateSectionContent } = usePageData('home');
  const theme = useTheme();

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

  const subtitleSection = getSection('what-we-do-subtitle') || {
    id: 'what-we-do-subtitle',
    content: 'Comprehensive support for your international education journey, from planning to arrival.',
    type: 'paragraph' as const
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default', // Adapts to theme (white in light, dark in dark)
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
            label="Our Services"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: 'primary.main',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              px: 1,
            }}
          />

          <EditableTextMUI
            value={titleSection.content}
            onSave={(value) => updateSectionContent(titleSection.id, value)}
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: '800px',
              textAlign: 'center',
            }}
          />

          <EditableTextMUI
            value={subtitleSection.content}
            onSave={(value) => updateSectionContent(subtitleSection.id, value)}
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: '600px',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              textAlign: 'center',
            }}
          />
        </Stack>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {defaultServices.map((service, index) => {
            const cardTitleSection = getSection(`what-we-do-card-${index}-title`) || {
              id: `what-we-do-card-${index}-title`,
              content: service.title,
              type: 'heading' as const
            };

            // Try to recover old content if it exists in the old ID format, or use default
            const oldServiceSection = getSection(`what-we-do-${index}`);
            const cardDescSection = getSection(`what-we-do-card-${index}-desc`) || {
              id: `what-we-do-card-${index}-desc`,
              content: oldServiceSection?.content || service.desc,
              type: 'paragraph' as const
            };

            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 4,
                    bgcolor: 'background.paper', // White in light, grey in dark
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 40px -10px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      // Gradient icon color from design
                      '& svg': {
                        fill: 'url(#icon-gradient-' + index + ')',
                        color: 'primary.main' // Fallback
                      }
                    }}
                  >
                    {/* SVG Gradient Definition for Icons */}
                    <svg width="0" height="0">
                      <linearGradient id={'icon-gradient-' + index} x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#FF8E53" offset="0%" />
                        <stop stopColor="#FE6B8B" offset="100%" />
                      </linearGradient>
                    </svg>
                    {service.icon}
                  </Box>

                  <EditableTextMUI
                    value={cardTitleSection.content}
                    onSave={(value) => updateSectionContent(cardTitleSection.id, value)}
                    variant="h5"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  />

                  <EditableTextMUI
                    value={cardDescSection.content}
                    onSave={(value) => updateSectionContent(cardDescSection.id, value)}
                    variant="body1"
                    multiline
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontSize: '1rem',
                    }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
