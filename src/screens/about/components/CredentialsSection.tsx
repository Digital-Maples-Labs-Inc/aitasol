import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';

const defaultValues = [
  {
    icon: <ShieldRoundedIcon fontSize="medium" />,
    title: 'Ethical Practice',
    description: 'We operate within clearly defined professional boundaries. We do not guarantee admissions, visas, or funding outcomes, and we avoid misrepresentation at all stages.',
  },
  {
    icon: <FavoriteRoundedIcon fontSize="medium" />,
    title: 'Student-Centered',
    description: 'Our recommendations are based on student readiness, academic history, financial capacity, and long-term goals — not institutional pressure or commission incentives.',
  },
  {
    icon: <LightbulbRoundedIcon fontSize="medium" />,
    title: 'Transparency',
    description: 'We communicate risks, limitations, timelines, and alternatives openly, even when that means advising a student to delay or reconsider applying.',
  },
  {
    icon: <LightbulbRoundedIcon fontSize="medium" />,
    title: 'Evidence-Informed',
    description: 'Our advising reflects current admission standards, institutional requirements, and employability trends rather than assumptions or outdated practices.',
  },
  {
    icon: <PeopleRoundedIcon fontSize="medium" />,
    title: 'Collaboration',
    description: 'We collaborate with accredited institutions, education platforms, and licensed immigration professionals while maintaining independence in academic advising.',
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

  const valuesTitleSection = getSection('credentials-title') || { id: 'credentials-title', content: 'Core Values', type: 'heading' as const };
  const valuesIntroSection = getSection('credentials-intro') || { id: 'credentials-intro', content: 'Our culture is built on these core principles.', type: 'paragraph' as const };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'transparent' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" sx={{ display: 'block', textAlign: 'center', mb: 2, fontWeight: 700, letterSpacing: 1.5 }}>
          OUR VALUES
        </Typography>
        <EditableTextMUI
          value={valuesTitleSection.content}
          onSave={(value) => updateSectionContent(valuesTitleSection.id, value)}
          variant="h2"
          sx={{ textAlign: 'center', fontFamily: 'serif', mb: 8, maxWidth: '800px', mx: 'auto' }}
        />

        <Grid container spacing={4}>
          {defaultValues.map((valueItem, index) => {
            const valTitle = getSection(`value-${index}-title`) || {
              id: `value-${index}-title`,
              content: valueItem.title,
              type: 'heading' as const
            };
            const valDesc = getSection(`value-${index}-desc`) || {
              id: `value-${index}-desc`,
              content: valueItem.description,
              type: 'paragraph' as const
            };

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
                <Box sx={{
                  flex: 1,
                  bgcolor: 'background.paper',
                  borderRadius: '24px',
                  p: 4,
                  border: '1px solid',
                  borderColor: 'divider',
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
                    width: 50,
                    height: 50,
                    borderRadius: '16px',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                    mb: 3
                  }}>
                    {valueItem.icon}
                  </Box>

                  <EditableTextMUI
                    value={valTitle.content}
                    onSave={(value) => updateSectionContent(valTitle.id, value)}
                    variant="h5"
                    sx={{ fontFamily: 'serif', fontWeight: 600, mb: 2 }}
                  />

                  <EditableTextMUI
                    value={valDesc.content}
                    onSave={(value) => updateSectionContent(valDesc.id, value)}
                    variant="body1"
                    multiline
                    sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                  />
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  );
}
