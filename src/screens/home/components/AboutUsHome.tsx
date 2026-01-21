import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AboutUsHome() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('home');
  const [expanded, setExpanded] = React.useState<string | false>('about-who');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // --- Content Sections ---

  // Image Section
  const heroImageSection = getSection('about-hero-image') || {
    id: 'about-hero-image',
    content: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', // Office/Team image placeholder
    type: 'image' as const
  };

  // 1. Who We Are
  const whoWeAreTitleSection = getSection('about-who-title') || {
    id: 'about-who-title', content: 'Who We Are', type: 'heading' as const
  };
  const whoWeAreTextSection = getSection('about-who-text') || {
    id: 'about-who-text', content: 'AitahSolutions Educational Consultancy was founded in 2019 with a clear purpose: to provide ethical, realistic, and student-focused education guidance in an industry often driven by volume rather than outcomes.', type: 'paragraph' as const
  };
  const whoWeAreText2Section = getSection('about-who-text-2') || {
    id: 'about-who-text-2', content: 'We recognized that many students make costly education decisions based on incomplete information. AitaSol was created to replace guesswork with structured advising.', type: 'paragraph' as const
  };

  // 2. Our Mission
  const missionTitleSection = getSection('about-mission-title') || {
    id: 'about-mission-title', content: 'Mission Statement', type: 'heading' as const
  };
  const missionTextSection = getSection('about-mission-text') || {
    id: 'about-mission-text', content: 'Our mission is to support students in making academically sound, financially realistic, and career-aligned study decisions through transparent advising and evidence-based recommendations.', type: 'paragraph' as const
  };

  // 3. Our Philosophy
  const philosophyTitleSection = getSection('about-philosophy-title') || {
    id: 'about-philosophy-title', content: 'Our Philosophy', type: 'heading' as const
  };
  const philosophyTextSection = getSection('about-philosophy-text') || {
    id: 'about-philosophy-text', content: 'We believe that: Not every student should apply immediately. Not every program is the right fit. Not every opportunity leads to long-term success.', type: 'paragraph' as const
  };

  // 4. Our Approach (How We Work)
  const howWeWorkTitleSection = getSection('about-how-title') || {
    id: 'about-how-title', content: 'Our Approach', type: 'heading' as const
  };
  const howWeWorkTextSection = getSection('about-how-text') || {
    id: 'about-how-text', content: 'We guide students through: Evaluating academic goals, understanding requirements, navigating applications, and preparing for transition.', type: 'paragraph' as const
  };

  // 5. Our Commitment
  const commitmentTitleSection = getSection('about-commitment-title') || {
    id: 'about-commitment-title', content: 'Our Commitment', type: 'heading' as const
  };
  const commitmentTextSection = getSection('about-commitment-text') || {
    id: 'about-commitment-text', content: 'Transparency over promises. Guidance over guarantees. Long-term outcomes over short-term placements.', type: 'paragraph' as const
  };


  const sections = [
    { id: 'about-who', title: whoWeAreTitleSection, text: [whoWeAreTextSection, whoWeAreText2Section] },
    { id: 'about-mission', title: missionTitleSection, text: [missionTextSection] },
    { id: 'about-philosophy', title: philosophyTitleSection, text: [philosophyTextSection] }, // Text2 omitted for brevity in accordion
    { id: 'about-how', title: howWeWorkTitleSection, text: [howWeWorkTextSection] },
    { id: 'about-commitment', title: commitmentTitleSection, text: [commitmentTextSection] },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="flex-start">

          {/* Left Column: Accordion Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {sections.map((section) => (
                <Accordion
                  key={section.id}
                  expanded={expanded === section.id}
                  onChange={handleChange(section.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: 'transparent',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:before': { display: 'none' },
                    transition: 'all 0.3s ease',
                    mb: 0,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: expanded === section.id ? 'primary.main' : 'text.secondary',
                          transition: 'color 0.3s ease'
                        }}
                      />
                    }
                    aria-controls={`${section.id}-content`}
                    id={`${section.id}-header`}
                    sx={{
                      p: 2,
                      pl: expanded === section.id ? 2 : 2, // Keep padding consistent or adjust
                      transition: 'all 0.3s ease',
                      borderLeft: '4px solid',
                      borderColor: expanded === section.id ? 'primary.main' : 'transparent',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }
                    }}
                  >
                    <EditableTextMUI
                      value={section.title.content}
                      onSave={(value) => updateSectionContent(section.title.id, value)}
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: expanded === section.id ? 'text.primary' : 'text.secondary',
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        transition: 'color 0.3s ease',
                      }}
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2, pt: 0, pl: 3 }}>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                      {section.text.map((txtItem, idx) => (
                        <EditableTextMUI
                          key={idx}
                          value={txtItem.content}
                          onSave={(value) => updateSectionContent(txtItem.id, value)}
                          variant="body1"
                          multiline
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            fontSize: '1rem',
                            maxWidth: '95%'
                          }}
                        />
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}

              <Box sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  More About Us
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Right Column: Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: { xs: '300px', md: '600px' },
                width: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 3,
                position: 'sticky',
                top: 100,
              }}
            >
              <EditableImageMUI
                src={heroImageSection.content || ''}
                onSave={(url) => updateSectionImage(heroImageSection.id, url)}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)'
                      : 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
