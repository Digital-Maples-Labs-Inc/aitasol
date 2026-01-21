import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
// Re-importing Icons
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import NorthEastIcon from '@mui/icons-material/NorthEast';

import { useNavigation } from '@react-navigation/native';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';
import { servicesData } from '@/services/serviceData';
import CircularProgress from '@mui/material/CircularProgress';

// Trimmed content for the card view
const services = [
  {
    title: 'Program & Institution Selection',
    description: 'Structured guidance to identify academic options aligning with your goals and background.',
    icon: <SchoolRoundedIcon sx={{ fontSize: 48 }} />,
    path: '/services/program-selection',
  },
  {
    title: 'Application Process Support',
    description: 'Navigate administrative requirements and timelines to ensure accurate, compliant submissions.',
    icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 48 }} />,
    path: '/services/application-support',
  },
  {
    title: 'Admissions Documentation',
    description: 'Expert support for preparing high-quality SOPs, CVs, and transcripts for your applications.',
    icon: <DescriptionRoundedIcon sx={{ fontSize: 48 }} />,
    path: '/services/admissions-docs',
  },
  {
    title: 'Scholarships & Funding',
    description: 'Advisory on scholarships and financial planning to help understand costs and funding.',
    icon: <MonetizationOnRoundedIcon sx={{ fontSize: 48 }} />,
    path: '/services/scholarships',
  },
  {
    title: 'Career Counselling',
    description: 'Align education choices with long-term employability, market trends, and personal capacity.',
    icon: <TrendingUpRoundedIcon sx={{ fontSize: 48 }} />,
    path: '/services/career-pathway',
  },
  {
    title: 'Immigration & Pre-Arrival',
    description: 'Referrals to licensed consultants and coordination for a smooth pre-arrival experience.',
    icon: <FlightTakeoffRoundedIcon sx={{ fontSize: 48 }} />,
    path: '/services/immigration-support',
  },
];

export default function ServiceCards() {
  const { page, loading, getSection, updateSectionContent } = usePageData('services');
  const navigation = useNavigation<any>();

  const navigateTo = (path: string) => {
    // Extract slug from path (e.g. /services/program-selection -> program-selection)
    const slug = path.split('/').pop();
    if (slug) {
      navigation.navigate('ServiceDetail', { slug });
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
      sx={{
        backgroundColor: 'background.default',
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
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

            const slug = service.path.split('/').pop() || '';
            const defaultImg = servicesData[slug]?.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800'; // Fallback

            const serviceImageSection = getSection(`service-card-${index}-image`) || {
              id: `service-card-${index}-image`,
              content: defaultImg,
              type: 'image' as const,
              metadata: { imageUrl: defaultImg, imageAlt: service.title }
            };

            return (
              <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ display: 'flex' }}>
                <Box
                  onClick={() => navigateTo(service.path)}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    bgcolor: '#232336', // Dark Slate Blue-ish (Reference match)
                    p: 3,
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px -5px rgba(0,0,0,0.4)',
                      borderColor: 'primary.main',
                      '& .floating-btn': {
                        transform: 'rotate(45deg) scale(1.1)',
                        bgcolor: 'primary.main',
                        color: 'white'
                      },
                      '& .card-image': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  {/* Image Area with Floating Button */}
                  <Box sx={{ position: 'relative', mb: 3, borderRadius: '16px', overflow: 'hidden' }}>
                    {/* Floating Action Button */}
                    <Box
                      className="floating-btn"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 48,
                        height: 48,
                        bgcolor: 'white',
                        color: 'black',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <NorthEastIcon fontSize="medium" />
                    </Box>

                    <Box className="card-image" sx={{ transition: 'transform 0.5s ease', width: '100%', aspectRatio: '16/9', position: 'relative' }}>
                      <EditableImageMUI
                        src={serviceImageSection.content || defaultImg}
                        onSave={(url) => updateSectionContent(serviceImageSection.id, url)} // Note: verify update signature for images
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Gradient Overlay for seamless blending */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '50%',
                          background: 'linear-gradient(to top, #232336 0%, transparent 100%)',
                          pointerEvents: 'none',
                          zIndex: 1
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Text Content */}
                  <Box sx={{ px: 1, pb: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <EditableTextMUI
                      value={serviceTitleSection.content}
                      onSave={(value) => updateSectionContent(serviceTitleSection.id, value)}
                      variant="h5"
                      sx={{
                        mb: 1.5,
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'serif',
                        fontSize: '1.5rem',
                        lineHeight: 1.2,
                        textAlign: 'left'
                      }}
                    />

                    <EditableTextMUI
                      value={serviceDescSection.content}
                      onSave={(value) => updateSectionContent(serviceDescSection.id, value)}
                      variant="body2"
                      multiline
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.6,
                        textAlign: 'left',
                        fontSize: '0.95rem'
                      }}
                    />
                  </Box>

                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
