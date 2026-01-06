import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

// Default fallback logo (the original SVG as a data URL or placeholder)
// You can replace this with the actual logo image URL
const DEFAULT_LOGO_URL = '';

export default function SitemarkIcon() {
  const { page, loading, getSection, updateSectionImage } = usePageData('home');

  if (loading) {
    return (
      <Box sx={{ height: 120, width: 450, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  const logoSection = getSection('site-logo') || {
    id: 'site-logo',
    content: DEFAULT_LOGO_URL,
    type: 'image' as const,
    metadata: { imageUrl: DEFAULT_LOGO_URL || '', imageAlt: 'AITAHSOLUTIONS Educational Consultancy Logo' },
  };

  const logoUrl = logoSection.metadata?.imageUrl || logoSection.content || DEFAULT_LOGO_URL;

  return (
    <Box sx={{ height: 120, width: 'auto', mr: 2, display: 'flex', alignItems: 'center', py: 0 }}>
      {logoUrl ? (
        <EditableImageMUI
          src={logoUrl}
          alt={logoSection.metadata?.imageAlt || 'AITAHSOLUTIONS Educational Consultancy Logo'}
          onSave={(url) => updateSectionImage(logoSection.id, url, logoSection.metadata?.imageAlt)}
          sx={{
            height: 120,
            width: 'auto',
            maxWidth: 600,
            py: 0,
            '& img': {
              height: 120,
              width: 'auto',
              maxWidth: 600,
              objectFit: 'contain',
              padding: 0,
            },
          }}
          aspectRatio="auto"
        />
      ) : (
        <Box
          sx={{
            height: 120,
            width: 450,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
            fontSize: '0.875rem',
            py: 0,
          }}
        >
          Logo
        </Box>
      )}
    </Box>
  );
}
