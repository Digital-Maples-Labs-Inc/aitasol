import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

interface ServiceFeaturesProps {
  serviceSlug: string;
}

export default function ServiceFeatures({ serviceSlug }: ServiceFeaturesProps) {
  const { getSection, updateSectionContent } = usePageData(`service-detail-${serviceSlug}`);

  const defaultFeatures = [
    {
      title: 'Strategy',
      description: 'We build a personalized roadmap aligned with your long-term goals.',
      icon: <TipsAndUpdatesIcon fontSize="large" />,
      id: 'feature-1'
    },
    {
      title: 'Verification',
      description: 'Thorough review of all documents to ensure 100% compliance.',
      icon: <VerifiedUserIcon fontSize="large" />,
      id: 'feature-2'
    },
    {
      title: 'Support',
      description: 'Ongoing assistance from application to arrival and settlement.',
      icon: <SupportAgentIcon fontSize="large" />,
      id: 'feature-3'
    }
  ];

  // Map features to use dynamic content
  const features = defaultFeatures.map((feature, index) => {
    const titleSec = getSection(`feature-${index}-title`) || { id: `feature-${index}-title`, content: feature.title, type: 'text' as const };
    const descSec = getSection(`feature-${index}-desc`) || { id: `feature-${index}-desc`, content: feature.description, type: 'paragraph' as const };
    return { ...feature, title: titleSec.content, description: descSec.content, titleId: titleSec.id, descId: descSec.id };
  });

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" sx={{ display: 'block', textAlign: 'center', mb: 2, fontWeight: 700, letterSpacing: 1.5 }}>
          WHY CHOOSE US
        </Typography>
        <Typography variant="h2" sx={{ textAlign: 'center', fontFamily: 'serif', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          A comprehensive approach to your success
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ display: 'flex' }}>
              <Box sx={{
                flex: 1,
                bgcolor: 'background.paper',
                borderRadius: '24px',
                p: 4,
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)'
                }
              }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '16px',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  mb: 3
                }}>
                  {feature.icon}
                </Box>

                <EditableTextMUI
                  value={feature.title}
                  onSave={(value) => updateSectionContent(feature.titleId, value)}
                  variant="h5"
                  sx={{ fontFamily: 'serif', fontWeight: 600, mb: 2 }}
                />

                <EditableTextMUI
                  value={feature.description}
                  onSave={(value) => updateSectionContent(feature.descId, value)}
                  variant="body1"
                  multiline
                  sx={{ color: 'text.secondary', mb: 4, flex: 1, lineHeight: 1.6 }}
                />

                {/* Optional subtle link/button */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', opacity: 0.8, '&:hover': { opacity: 1, gap: 1.5 }, transition: 'all 0.2s' }}>
                  Learn more <ArrowForwardIcon fontSize="small" />
                </Box>

              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
