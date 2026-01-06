import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const heroTitleSection = getSection('hero-title') || { id: 'hero-title', content: 'Our latest products', type: 'heading' as const };
  const heroSubtitleSection = getSection('hero-subtitle') || { id: 'hero-subtitle', content: 'Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your experience with top-tier features and services.', type: 'paragraph' as const };
  const heroImageSection = getSection('hero-image') || { id: 'hero-image', content: '', type: 'image' as const, metadata: { imageUrl: process.env.TEMPLATE_IMAGE_URL || 'https://mui.com/static/screenshots/material-ui/getting-started/templates/dashboard.jpg', imageAlt: 'Hero image' } };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',

        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <EditableTextMUI
            value={heroTitleSection.content}
            onSave={(value) => updateSectionContent(heroTitleSection.id, value)}
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              justifyContent: 'center',
            }}
          />
          <EditableTextMUI
            value={heroSubtitleSection.content}
            onSave={(value) => updateSectionContent(heroSubtitleSection.id, value)}
            variant="body1"
            multiline
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              display: 'block',
            }}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content' }}
            >
              Start now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <EditableImageMUI
          src={heroImageSection.metadata?.imageUrl || heroImageSection.content || process.env.TEMPLATE_IMAGE_URL || 'https://mui.com/static/screenshots/material-ui/getting-started/templates/dashboard.jpg'}
          alt={heroImageSection.metadata?.imageAlt || 'Hero image'}
          onSave={(url) => updateSectionImage(heroImageSection.id, url, heroImageSection.metadata?.imageAlt)}
          sx={{
            alignSelf: 'center',
            width: '100%',
            height: { xs: 400, sm: 700 },
            marginTop: { xs: 8, sm: 10 },
            borderRadius: 2,
            outline: '6px solid',
            outlineColor: 'hsla(220, 25%, 80%, 0.2)',
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
          }}
          aspectRatio="auto"
        />
      </Container>
    </Box>
  );
}
