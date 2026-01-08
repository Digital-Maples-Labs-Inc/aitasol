import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';

export default function AboutUsHome() {
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const whoWeAreTitleSection = getSection('about-who-title') || { 
    id: 'about-who-title', 
    content: 'Who We Are', 
    type: 'heading' as const 
  };
  const whoWeAreTextSection = getSection('about-who-text') || { 
    id: 'about-who-text', 
    content: 'AitahSolutions Educational Consultancy was founded in 2019 with a clear purpose: to provide ethical, realistic, and student-focused education guidance in an industry often driven by volume rather than outcomes.', 
    type: 'paragraph' as const 
  };
  const whoWeAreText2Section = getSection('about-who-text-2') || { 
    id: 'about-who-text-2', 
    content: 'We recognized that many students make costly education decisions based on incomplete information, unrealistic expectations, or pressure to apply quickly. AitaSol was created to slow that process down, replacing guesswork with structured advising and transparency.', 
    type: 'paragraph' as const 
  };

  const philosophyTitleSection = getSection('about-philosophy-title') || { 
    id: 'about-philosophy-title', 
    content: 'Our Philosophy', 
    type: 'heading' as const 
  };
  const philosophyTextSection = getSection('about-philosophy-text') || { 
    id: 'about-philosophy-text', 
    content: 'We believe that: Not every student should apply immediately. Not every program is the right fit. Not every opportunity leads to long-term success.', 
    type: 'paragraph' as const 
  };
  const philosophyText2Section = getSection('about-philosophy-text-2') || { 
    id: 'about-philosophy-text-2', 
    content: 'Our advisors focus on student readiness, not just eligibility. This means discussing risks, limitations, alternative pathways, and timing, even when those conversations are uncomfortable.', 
    type: 'paragraph' as const 
  };

  const howWeWorkTitleSection = getSection('about-how-title') || { 
    id: 'about-how-title', 
    content: 'How We Work', 
    type: 'heading' as const 
  };
  const howWeWorkTextSection = getSection('about-how-text') || { 
    id: 'about-how-text', 
    content: 'We guide students through: Evaluating academic and career goals. Understanding institutional and program requirements. Navigating application and documentation processes. Exploring scholarships and funding responsibly. Preparing for arrival and transition.', 
    type: 'paragraph' as const 
  };
  const howWeWorkText2Section = getSection('about-how-text-2') || { 
    id: 'about-how-text-2', 
    content: 'Where immigration advice is required, we refer students to licensed immigration professionals, maintaining clear professional boundaries.', 
    type: 'paragraph' as const 
  };

  const commitmentTitleSection = getSection('about-commitment-title') || { 
    id: 'about-commitment-title', 
    content: 'Our Commitment', 
    type: 'heading' as const 
  };
  const commitmentTextSection = getSection('about-commitment-text') || { 
    id: 'about-commitment-text', 
    content: 'Transparency over promises. Guidance over guarantees. Long-term outcomes over short-term placements.', 
    type: 'paragraph' as const 
  };
  const commitmentText2Section = getSection('about-commitment-text-2') || { 
    id: 'about-commitment-text-2', 
    content: 'We collaborate with recognized education platforms and partners to broaden access and streamline processes, while ensuring our advice remains independent and student-centered.', 
    type: 'paragraph' as const 
  };

  const missionTitleSection = getSection('about-mission-title') || { 
    id: 'about-mission-title', 
    content: 'Mission Statement', 
    type: 'heading' as const 
  };
  const missionTextSection = getSection('about-mission-text') || { 
    id: 'about-mission-text', 
    content: 'AitahSolutions Educational Consultancy exists to provide ethical, informed, and student-centered guidance for individuals pursuing international education pathways. Our mission is to support students in making academically sound, financially realistic, and career-aligned study decisions through transparent advising and evidence-based recommendations.', 
    type: 'paragraph' as const 
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
        <Stack spacing={6}>
          {/* Who We Are */}
          <Box>
            <EditableTextMUI
              value={whoWeAreTitleSection.content}
              onSave={(value) => updateSectionContent(whoWeAreTitleSection.id, value)}
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 700,
                mb: 3,
                display: 'block',
              }}
            />
            <Stack spacing={2}>
              <EditableTextMUI
                value={whoWeAreTextSection.content}
                onSave={(value) => updateSectionContent(whoWeAreTextSection.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
              <EditableTextMUI
                value={whoWeAreText2Section.content}
                onSave={(value) => updateSectionContent(whoWeAreText2Section.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
            </Stack>
          </Box>

          {/* Our Philosophy */}
          <Box>
            <EditableTextMUI
              value={philosophyTitleSection.content}
              onSave={(value) => updateSectionContent(philosophyTitleSection.id, value)}
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontWeight: 700,
                mb: 3,
                display: 'block',
              }}
            />
            <Stack spacing={2}>
              <EditableTextMUI
                value={philosophyTextSection.content}
                onSave={(value) => updateSectionContent(philosophyTextSection.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
              <EditableTextMUI
                value={philosophyText2Section.content}
                onSave={(value) => updateSectionContent(philosophyText2Section.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
            </Stack>
          </Box>

          {/* How We Work */}
          <Box>
            <EditableTextMUI
              value={howWeWorkTitleSection.content}
              onSave={(value) => updateSectionContent(howWeWorkTitleSection.id, value)}
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontWeight: 700,
                mb: 3,
                display: 'block',
              }}
            />
            <Stack spacing={2}>
              <EditableTextMUI
                value={howWeWorkTextSection.content}
                onSave={(value) => updateSectionContent(howWeWorkTextSection.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
              <EditableTextMUI
                value={howWeWorkText2Section.content}
                onSave={(value) => updateSectionContent(howWeWorkText2Section.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
            </Stack>
          </Box>

          {/* Our Commitment */}
          <Box>
            <EditableTextMUI
              value={commitmentTitleSection.content}
              onSave={(value) => updateSectionContent(commitmentTitleSection.id, value)}
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontWeight: 700,
                mb: 3,
                display: 'block',
              }}
            />
            <Stack spacing={2}>
              <EditableTextMUI
                value={commitmentTextSection.content}
                onSave={(value) => updateSectionContent(commitmentTextSection.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
              <EditableTextMUI
                value={commitmentText2Section.content}
                onSave={(value) => updateSectionContent(commitmentText2Section.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  display: 'block',
                }}
              />
            </Stack>
          </Box>

          {/* Mission Statement */}
          <Card
            variant="outlined"
            sx={{
              p: 4,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <CardContent>
              <EditableTextMUI
                value={missionTitleSection.content}
                onSave={(value) => updateSectionContent(missionTitleSection.id, value)}
                variant="h3"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 700,
                  mb: 3,
                  display: 'block',
                  color: 'inherit',
                }}
              />
              <EditableTextMUI
                value={missionTextSection.content}
                onSave={(value) => updateSectionContent(missionTextSection.id, value)}
                variant="body1"
                multiline
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  display: 'block',
                  color: 'inherit',
                }}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

