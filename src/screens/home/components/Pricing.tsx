import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
  {
    title: 'Professional',
    subheader: 'Recommended',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
      'Dedicated team',
      'Best deals',
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
];

export default function Pricing() {
  const { page, loading, getSection, updateSectionContent } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const pricingTitleSection = getSection('pricing-title') || { id: 'pricing-title', content: 'Pricing', type: 'heading' as const };
  const pricingSubtitleSection = getSection('pricing-subtitle') || { id: 'pricing-subtitle', content: 'Quickly build an effective pricing table for your potential customers with this layout. It\'s built with default Material UI components with little customization.', type: 'paragraph' as const };

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
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
          value={pricingTitleSection.content}
          onSave={(value) => updateSectionContent(pricingTitleSection.id, value)}
          variant="h2"
          sx={{ mb: 2, display: 'block', color: 'text.primary', fontWeight: 700 }}
        />
        <EditableTextMUI
          value={pricingSubtitleSection.content}
          onSave={(value) => updateSectionContent(pricingSubtitleSection.id, value)}
          variant="h6"
          multiline
          sx={{ color: 'text.secondary', display: 'block', fontWeight: 400 }}
        />
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {tiers.map((tier) => (
          <Grid
            size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
            key={tier.title}
          >
            <Card
              sx={[
                {
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  borderRadius: '24px',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                },
                tier.title === 'Professional' &&
                ((theme) => ({
                  border: 'none',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', // Brand gradient
                  boxShadow: `0 8px 24px rgba(255, 107, 107, 0.4)`,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 12px 32px rgba(255, 107, 107, 0.5)`,
                  },
                  ...theme.applyStyles('dark', {
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', // Keep vibrant in dark mode? Or darker?
                    // Let's keep it vibrant as it's a highlight card
                    boxShadow: `0 8px 24px rgba(255, 107, 107, 0.2)`,
                  }),
                })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                    tier.title === 'Professional'
                      ? { color: 'white' }
                      : { color: 'text.primary' },
                  ]}
                >
                  <EditableTextMUI
                    value={getSection(`pricing-tier-${tier.title.toLowerCase()}-title`)?.content || tier.title}
                    onSave={(value) => updateSectionContent(`pricing-tier-${tier.title.toLowerCase()}-title`, value)}
                    variant="h5"
                    sx={{ color: 'inherit', fontWeight: 700 }}
                  />
                  {tier.title === 'Professional' && (
                    <Chip
                      icon={<AutoAwesomeIcon sx={{ color: 'primary.main', fill: 'currentColor' }} />}
                      label={tier.subheader}
                      sx={{
                        backgroundColor: 'white',
                        color: 'primary.main',
                        fontWeight: 700,
                        '& .MuiChip-icon': { color: 'primary.main' }
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'baseline',
                    },
                    tier.title === 'Professional'
                      ? { color: 'white' }
                      : { color: 'text.primary' },
                  ]}
                >
                  <EditableTextMUI
                    value={getSection(`pricing-tier-${tier.title.toLowerCase()}-price`)?.content || `$${tier.price}`}
                    onSave={(value) => updateSectionContent(`pricing-tier-${tier.title.toLowerCase()}-price`, value)}
                    variant="h2"
                    sx={{ color: 'inherit', fontWeight: 800 }}
                  />
                  <Typography component="h3" variant="h6" sx={{ color: tier.title === 'Professional' ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>
                    &nbsp; per month
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: tier.title === 'Professional' ? 'rgba(255,255,255,0.2)' : 'divider' }} />
                {tier.description.map((line, lineIndex) => {
                  const lineSection = getSection(`pricing-tier-${tier.title.toLowerCase()}-desc-${lineIndex}`) || {
                    id: `pricing-tier-${tier.title.toLowerCase()}-desc-${lineIndex}`,
                    content: line,
                    type: 'paragraph' as const
                  };
                  return (
                    <Box
                      key={lineIndex}
                      sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                    >
                      <CheckCircleRoundedIcon
                        sx={[
                          {
                            width: 20,
                          },
                          tier.title === 'Professional'
                            ? { color: 'white' }
                            : { color: 'primary.main' },
                        ]}
                      />
                      <EditableTextMUI
                        value={lineSection.content}
                        onSave={(value) => updateSectionContent(lineSection.id, value)}
                        variant="body2"
                        sx={[
                          tier.title === 'Professional'
                            ? { color: 'rgba(255,255,255,0.9)' }
                            : { color: 'text.secondary' },
                          { fontWeight: 500 }
                        ]}
                      />
                    </Box>
                  );
                })}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as 'outlined' | 'contained'}
                  // color={tier.buttonColor as 'primary' | 'secondary'} 
                  // Override colors for premium look
                  sx={{
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 700,
                    py: 1.5,
                    ...(tier.title === 'Professional'
                      ? {
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'grey.100' }
                      }
                      : {
                        // Standard button style
                      }
                    )
                  }}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
