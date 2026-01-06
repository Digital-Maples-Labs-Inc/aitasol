import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Built to last',
    description:
      'Experience unmatched durability that goes above and beyond with lasting investment.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Great user experience',
    description:
      'Integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable support',
    description:
      'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Precision in every detail',
    description:
      'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
  },
];

export default function Highlights() {
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const highlightsTitleSection = getSection('highlights-title') || { id: 'highlights-title', content: 'Highlights', type: 'heading' as const };
  const highlightsSubtitleSection = getSection('highlights-subtitle') || { id: 'highlights-subtitle', content: 'Explore why our product stands out: adaptability, durability, user-friendly design, and innovation. Enjoy reliable customer support and precision in every detail.', type: 'paragraph' as const };

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <EditableTextMUI
            value={highlightsTitleSection.content}
            onSave={(value) => updateSectionContent(highlightsTitleSection.id, value)}
            variant="h4"
            sx={{ mb: 2, display: 'block', color: 'inherit' }}
          />
          <EditableTextMUI
            value={highlightsSubtitleSection.content}
            onSave={(value) => updateSectionContent(highlightsSubtitleSection.id, value)}
            variant="body1"
            multiline
            sx={{ color: 'grey.400', display: 'block' }}
          />
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => {
            const itemTitleSection = getSection(`highlight-${index}-title`) || { id: `highlight-${index}-title`, content: item.title, type: 'heading' as const };
            const itemDescSection = getSection(`highlight-${index}-desc`) || { id: `highlight-${index}-desc`, content: item.description, type: 'paragraph' as const };
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Stack
                  direction="column"
                  component={Card}
                  spacing={1}
                  useFlexGap
                  sx={{
                    color: 'inherit',
                    p: 3,
                    height: '100%',
                    borderColor: 'hsla(220, 25%, 25%, 0.3)',
                    backgroundColor: 'grey.800',
                  }}
                >
                  <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                  <div>
                    <EditableTextMUI
                      value={itemTitleSection.content}
                      onSave={(value) => updateSectionContent(itemTitleSection.id, value)}
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 'medium', display: 'block', color: 'inherit' }}
                    />
                    <EditableTextMUI
                      value={itemDescSection.content}
                      onSave={(value) => updateSectionContent(itemDescSection.id, value)}
                      variant="body2"
                      multiline
                      sx={{ color: 'grey.400', display: 'block' }}
                    />
                  </div>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
