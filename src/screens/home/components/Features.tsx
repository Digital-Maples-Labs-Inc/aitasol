import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { EditableTextMUI } from '@/components/EditableTextMUI'; // Assuming this exists or using simple text
import { usePageData } from '@/hooks/usePageData'; // If needed for editability

const items = [
  {
    icon: <SchoolRoundedIcon />,
    title: 'Personalized Study Plans',
    description:
      'We tailor every lesson to your specific goals, ensuring you make the fastest progress possible.',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  },
  {
    icon: <AccessTimeRoundedIcon />,
    title: 'Flexible Scheduling',
    description:
      'Book lessons at times that work for you. Our global network of teachers means you can learn 24/7.',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Expert Guidance',
    description:
      'Our consultants and teachers are certified professionals with years of experience in international education.',
    gradient: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
  },
];

interface ChipProps {
  selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: (theme.vars || theme).palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

interface MobileLayoutProps {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
  selectedFeature: (typeof items)[0];
}

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}: MobileLayoutProps) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
            sx={{ borderRadius: '50px' }}
          />
        ))}
      </Box>
      <Card variant="outlined" sx={{ borderRadius: '24px', overflow: 'hidden' }}>
        <Box
          sx={{
            minHeight: 280,
            background: selectedFeature.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Large Icon Display */}
          {React.cloneElement(selectedFeature.icon as React.ReactElement, { sx: { fontSize: '6rem', color: 'white', opacity: 0.9 } })}
        </Box>
        <Box sx={{ px: 2, pb: 2, pt: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'bold' }}
            variant="h6"
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  // Using existing section keys or creating generic ones
  const featureTitle = getSection('features-title') || { id: 'features-title', content: 'Our Educational Approach', type: 'heading' as const };
  const featureDesc = getSection('features-desc') || { id: 'features-desc', content: 'We combine personalized attention with proven methodologies to ensure your success.', type: 'paragraph' as const };

  return (
    <Container id="features" sx={{ py: { xs: 4, sm: 6 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <EditableTextMUI
          value={featureTitle.content}
          onSave={(v) => updateSectionContent(featureTitle.id, v)}
          variant="h2"
          sx={{ color: 'text.primary', mb: 2, fontWeight: 700 }}
        />
        <EditableTextMUI
          value={featureDesc.content}
          onSave={(v) => updateSectionContent(featureDesc.id, v)}
          variant="h6"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 }, fontWeight: 400 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    borderRadius: '16px',
                    textAlign: 'left',
                    '&:hover': {
                      backgroundColor: (theme.vars || theme).palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: '1.5rem' } })}
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
                  </Box>

                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
              borderRadius: '24px',
              border: 'none', // Remove border for cleaner look if keeping shadow
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                m: 0,
                width: '100%',
                height: 500,
                background: selectedFeature.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Large Icon / Illustration Placeholder */}
              {React.cloneElement(selectedFeature.icon as React.ReactElement, { sx: { fontSize: '12rem', color: 'rgba(255,255,255,0.8)', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' } })}
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
