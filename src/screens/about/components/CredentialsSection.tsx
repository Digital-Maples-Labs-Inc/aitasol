import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';

const defaultValues = [
  {
    icon: <ShieldRoundedIcon sx={{ fontSize: '2.5rem', color: '#4caf50' }} />,
    title: 'Ethical Practice',
    description: 'We operate within clearly defined professional boundaries. We do not guarantee admissions, visas, or funding outcomes, and we avoid misrepresentation at all stages.',
  },
  {
    icon: <FavoriteRoundedIcon sx={{ fontSize: '2.5rem', color: '#ff5c5c' }} />,
    title: 'Student-Centered',
    description: 'Our recommendations are based on student readiness, academic history, financial capacity, and long-term goals — not institutional pressure or commission incentives.',
  },
  {
    icon: <LightbulbRoundedIcon sx={{ fontSize: '2.5rem', color: '#ffc107' }} />,
    title: 'Transparency',
    description: 'We communicate risks, limitations, timelines, and alternatives openly, even when that means advising a student to delay or reconsider applying.',
  },
  {
    icon: <LightbulbRoundedIcon sx={{ fontSize: '2.5rem', color: '#29b6f6' }} />,
    title: 'Evidence-Informed',
    description: 'Our advising reflects current admission standards, institutional requirements, and employability trends rather than assumptions or outdated practices.',
  },
  {
    icon: <PeopleRoundedIcon sx={{ fontSize: '2.5rem', color: '#ab47bc' }} />,
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
    <Box
      sx={(theme) => ({
        backgroundColor: 'background.default',
        py: { xs: 4, sm: 6 },
      })}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <EditableTextMUI
            value={valuesTitleSection.content}
            onSave={(value) => updateSectionContent(valuesTitleSection.id, value)}
            variant="h2"
            sx={{ mb: 2, display: 'block', fontWeight: 700 }}
          />
          <EditableTextMUI
            value={valuesIntroSection.content}
            onSave={(value) => updateSectionContent(valuesIntroSection.id, value)}
            variant="h5"
            sx={{ color: 'text.secondary', display: 'block', fontWeight: 400 }}
          />
        </Box>

        {/* Scrollable Container */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            pb: 4,
            px: 2,
            mx: -2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            width: '100%',
            // If content fits (e.g. on very large screens), justify start or center. 
            // Usually start is safer for scrolling interactions.
            // Left align to ensure scrollable items aren't clipped
            justifyContent: 'flex-start'
          }}
        >
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
              <Box
                key={index}
                sx={{
                  minWidth: { xs: '280px', md: '30%' }, // Ensure 3 fit on desktop (30% * 3 = 90% + gaps)
                  maxWidth: { md: '360px' },
                  scrollSnapAlign: 'start', // 'start' aligns nicely with flex-start container
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    height: '100%',
                    backgroundColor: 'background.paper',
                    borderRadius: '24px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box sx={{ mb: 2, display: 'inline-flex', p: 1.5, borderRadius: '50%', bgcolor: 'action.hover' }}>
                    {valueItem.icon}
                  </Box>
                  <EditableTextMUI
                    value={valTitle.content}
                    onSave={(value) => updateSectionContent(valTitle.id, value)}
                    variant="h6"
                    sx={{ mb: 1, display: 'block', fontWeight: 700, fontSize: '1.1rem' }}
                  />
                  <EditableTextMUI
                    value={valDesc.content}
                    onSave={(value) => updateSectionContent(valDesc.id, value)}
                    variant="body2"
                    multiline
                    sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5, fontSize: '0.875rem' }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
