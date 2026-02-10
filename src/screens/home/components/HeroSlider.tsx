import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';
import '@/styles/components/EmblaCarousel.css';

// Default slide images - using SVG data URIs as reliable backgrounds
const createGradientSVG = (color1: string, color2: string) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#grad)"/>
    </svg>
  `)}`;
};

const defaultSlides = [
  {
    id: 'hero-slide-1',
    backgroundImage: createGradientSVG('#00296b', '#003f88'),
    title: 'Welcome to AITAHSOLUTIONS',
    subtitle: 'Your Bridge to Global Learning',
    description: 'Expert educational consultancy services to help you achieve your academic dreams in Canada and beyond.',
  },
  {
    id: 'hero-slide-2',
    backgroundImage: createGradientSVG('#0b192c', '#06101c'),
    title: 'Study in Canada',
    subtitle: 'World-Class Education Awaits',
    description: 'Navigate your path to Canadian universities with our comprehensive support and guidance.',
  },
  {
    id: 'hero-slide-3',
    backgroundImage: createGradientSVG('#00296b', '#111111'),
    title: 'Immigration & Study Permits',
    subtitle: 'Your Journey Starts Here',
    description: 'Professional assistance with visa applications and study permit processes.',
  },
];

import { useAuth } from '@/contexts/AuthContext';
import { useEditingMode } from '@/contexts/EditingModeContext';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useTheme } from '@mui/material/styles';
import { uploadImage } from '@/services/storageService';

export default function HeroSliderComponent() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('home');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const { user } = useAuth();
  const { isInlineMode } = useEditingMode();
  const [uploading, setUploading] = useState(false);
  const theme = useTheme();

  const isEditable = isInlineMode && (user?.role === 'admin' || user?.role === 'editor');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, slideId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Used static import instead of dynamic
      const mk_name = file.name || `slide_bg_${Date.now()}.jpg`;
      const uploadedUrl = await uploadImage(file, mk_name, 'hero-slides');

      await updateSectionImage(slideId, uploadedUrl, 'Hero Slide Background');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Get hero title and subtitle from Firestore
  const heroTitleSection = getSection('hero-title') || {
    id: 'hero-title',
    content: 'Welcome to AITAHSOLUTIONS',
    type: 'heading' as const
  };
  const heroSubtitleSection = getSection('hero-subtitle') || {
    id: 'hero-subtitle',
    content: 'Your Bridge to Global Learning',
    type: 'paragraph' as const
  };

  // Load slides from Firestore
  const loadSlidesFromFirestore = () => {
    const loadedSlides = [];
    for (let i = 1; i <= 5; i++) {
      const slideSection = getSection(`hero-slide-${i}`);
      const defaultSlide = defaultSlides[i - 1]; // Get the correct default for this slide index

      // Only include active slides
      if (slideSection && slideSection.metadata?.active !== false) {
        const rawImageUrl = slideSection.metadata?.imageUrl || slideSection.content || '';

        // Check if the stored image is an OLD Blue gradient (containing old hex codes)
        const isOldGradient = rawImageUrl && (
          rawImageUrl.includes('%230066CC') ||
          rawImageUrl.includes('%230099FF') ||
          rawImageUrl.includes('%23003366') ||
          rawImageUrl.includes('#0066CC') ||
          rawImageUrl.includes('#0099FF') ||
          rawImageUrl.includes('#003366')
        );

        const imageUrl = isOldGradient ? '' : rawImageUrl;
        const backgroundImage = imageUrl || (defaultSlide?.backgroundImage) || createGradientSVG('#00296b', '#00509d');

        // Use Firestore data if available, otherwise use the default for THIS specific slide index
        // Important: Only use default if Firestore data is empty/undefined
        const title = slideSection.metadata?.title?.trim() || defaultSlide?.title || '';
        const subtitle = slideSection.metadata?.subtitle?.trim() || defaultSlide?.subtitle || '';
        const description = slideSection.metadata?.description?.trim() || defaultSlide?.description || '';

        loadedSlides.push({
          id: `hero-slide-${i}`,
          backgroundImage,
          title,
          subtitle,
          description,
        });
      } else if (!slideSection) {
        // If section doesn't exist but we have a default for this index, include it
        if (defaultSlide && i <= 3) {
          loadedSlides.push({
            id: `hero-slide-${i}`,
            backgroundImage: defaultSlide.backgroundImage,
            title: defaultSlide.title,
            subtitle: defaultSlide.subtitle,
            description: defaultSlide.description,
          });
        }
      }
    }

    // If no slides found in Firestore, use defaults
    if (loadedSlides.length === 0) {
      return defaultSlides.filter((_, index) => index < 3); // First 3 defaults
    }

    return loadedSlides;
  };

  const slides = loadSlidesFromFirestore();

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Selected index for dots
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (loading) {
    return (
      <Box
        id="hero"
        sx={{
          width: '100%',
          height: { xs: '60vh', sm: '80vh', md: '90vh' },
          minHeight: { xs: '400px', sm: '600px', md: '700px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <Box
      id="hero"
      className="embla"
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: { xs: '70vh', sm: '92vh', md: '100vh' },
        minHeight: { xs: '460px', sm: '690px', md: '800px' },
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        backgroundColor: '#000', // Dark background to show spacing
        marginTop: 0, // No margin needed with sticky header
        '--slide-height': '100%',
        '--slide-spacing': '1rem', // Spacing between slides
        '--slide-size': '100%', // Full width on mobile
        [theme.breakpoints.up('md')]: {
          '--slide-spacing': '2rem', // Larger spacing on desktop
          '--slide-size': '85%', // 85% width on desktop to show adjacent slides
        },
      }}
    >
      <Box
        ref={emblaRef}
        className="embla__viewport"
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000', // Dark background behind slides
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center the carousel
        }}
      >
        <Box
          className="embla__container"
          sx={{
            height: '100%',
            alignItems: 'center', // Center slides vertically
          }}
        >
          {slides.map((slide, index) => {
            const isSelected = selectedIndex === index;
            const distance = Math.abs(index - selectedIndex);
            // Calculate opacity based on distance from center
            // Center (distance 0) = 1.0, adjacent (distance 1) = 0.4, further = 0.2
            const slideOpacity = distance === 0 ? 1 : distance === 1 ? 0.4 : 0.2;

            return (
              <Box
                key={slide.id}
                className="embla__slide"
                sx={{
                  height: '100%',
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundSize: 'cover', // Cover to fill the slide area
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  opacity: slideOpacity,
                  transition: 'opacity 0.5s ease-in-out',
                  borderRadius: 0, // No rounded corners
                  overflow: 'hidden',
                  // Soften edges to blend images
                  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                }}
              >
                {/* Edit Background Button */}
                {isEditable && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 20,
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`raised-button-file-${slide.id}`}
                      type="file"
                      onChange={(e) => handleImageUpload(e, slide.id)}
                    />
                    <label htmlFor={`raised-button-file-${slide.id}`}>
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <PhotoCamera />}
                        disabled={uploading}
                        sx={{ bgcolor: 'rgba(0,0,0,0.7)', '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' } }}
                      >
                        {uploading ? 'Uploading...' : 'Change Baground'}
                      </Button>
                    </label>
                  </Box>
                )}

                {/* No text overlay - images contain their own text */}
              </Box>
            );
          })}
        </Box>
      </Box>


      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '20px', md: '40px' },
          right: { xs: '20px', md: '40px' },
          display: 'flex',
          gap: 1,
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            sx={{
              width: selectedIndex === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: selectedIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
