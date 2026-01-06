import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useColorScheme } from '@mui/material/styles';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

const darkModeLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const lightModeLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const NUM_LOGOS = 6;

export default function LogoCollection() {
  const { mode, systemMode } = useColorScheme();
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('home');

  // Determine which default logos to use based on theme
  let defaultLogos;
  if (mode === 'system') {
    if (systemMode === 'light') {
      defaultLogos = lightModeLogos;
    } else {
      defaultLogos = darkModeLogos;
    }
  } else if (mode === 'light') {
    defaultLogos = lightModeLogos;
  } else {
    defaultLogos = darkModeLogos;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  const logoTitleSection = getSection('logo-title') || { id: 'logo-title', content: 'Trusted by the best companies', type: 'paragraph' as const };

  // Get logo sections from Firestore, fallback to defaults
  const getLogoUrl = (index: number): string => {
    const logoSection = getSection(`logo-${index}`);
    if (logoSection?.metadata?.imageUrl) {
      return logoSection.metadata.imageUrl;
    }
    if (logoSection?.content) {
      return logoSection.content;
    }
    return defaultLogos[index] || '';
  };

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <EditableTextMUI
        value={logoTitleSection.content}
        onSave={(value) => updateSectionContent(logoTitleSection.id, value)}
        variant="subtitle2"
        sx={{ color: 'text.secondary', display: 'block', textAlign: 'center' }}
      />
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
        {Array.from({ length: NUM_LOGOS }).map((_, index) => {
          const logoSection = getSection(`logo-${index}`) || {
            id: `logo-${index}`,
            content: defaultLogos[index] || '',
            type: 'image' as const,
            metadata: { imageUrl: defaultLogos[index] || '', imageAlt: `Company logo ${index + 1}` },
          };
          const logoUrl = getLogoUrl(index);

          return (
            <Grid key={index} sx={{ margin: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EditableImageMUI
                src={logoUrl}
                alt={logoSection.metadata?.imageAlt || `Company logo ${index + 1}`}
                onSave={(url) => updateSectionImage(logoSection.id, url, logoSection.metadata?.imageAlt)}
                sx={{
                  width: '100px',
                  height: '80px',
                  '& img': {
                    width: '100px',
                    height: '80px',
                    objectFit: 'contain',
                    opacity: 0.7,
                  },
                }}
                aspectRatio="auto"
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
