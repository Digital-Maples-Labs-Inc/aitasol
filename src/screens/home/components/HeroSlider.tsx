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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    backgroundImage: createGradientSVG('#0066CC', '#004499'),
    title: 'Welcome to AITAHSOLUTIONS',
    subtitle: 'Your Bridge to Global Learning',
    description: 'Expert educational consultancy services to help you achieve your academic dreams in Canada and beyond.',
  },
  {
    id: 'hero-slide-2',
    backgroundImage: createGradientSVG('#0099FF', '#0066CC'),
    title: 'Study in Canada',
    subtitle: 'World-Class Education Awaits',
    description: 'Navigate your path to Canadian universities with our comprehensive support and guidance.',
  },
  {
    id: 'hero-slide-3',
    backgroundImage: createGradientSVG('#003366', '#001133'),
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
        const imageUrl = slideSection.metadata?.imageUrl || slideSection.content || '';
        // Use the image from Firestore, or fallback to default gradient for this specific slide
        const backgroundImage = imageUrl || (defaultSlide?.backgroundImage) || createGradientSVG('#0066CC', '#004499');

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
        height: { xs: '60vh', sm: '80vh', md: '90vh' },
        minHeight: { xs: '400px', sm: '600px', md: '700px' },
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        backgroundColor: '#000', // Dark background to show spacing
        marginTop: { xs: '80px', sm: '0' }, // Add top margin on mobile to avoid header overlap
        '--slide-height': '100%',
        '--slide-spacing': '10px', // Default mobile spacing
        '--slide-size': '100%', // Default mobile full width
        [theme.breakpoints.up('md')]: {
          '--slide-spacing': '50px', // Desktop spacing
          '--slide-size': '75%', // Desktop 75% width
        },
      }}
    >
      <Box
        ref={emblaRef}
        className="embla__viewport"
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000', // Dark background to show spacing
          display: 'flex',
          alignItems: 'center', // Center vertically
          justifyContent: { xs: 'center', md: 'flex-start' }, // Center on mobile
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
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  opacity: slideOpacity,
                  transition: 'opacity 0.5s ease-in-out',
                  borderRadius: '1.8rem',
                  overflow: 'hidden',
                  // Add gradient fade effect
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isSelected
                      ? 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.8) 100%)'
                      : 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.9) 100%)',
                    zIndex: 1,
                    transition: 'background 0.5s ease-in-out',
                    borderRadius: '1.8rem',
                  },
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

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
                    zIndex: 2,
                    transition: 'background-color 0.5s ease-in-out',
                  }}
                />
                <Container
                  sx={{
                    position: 'relative',
                    zIndex: 3,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: { xs: '150px', sm: '120px' }, // Add more top padding on mobile to avoid header
                  }}
                >
                  <Stack
                    spacing={{ xs: 2, md: 3 }}
                    sx={{
                      alignItems: 'center',
                      textAlign: 'center',
                      color: 'white',
                      maxWidth: { xs: '95%', sm: '80%', md: '70%' },
                      paddingTop: { xs: '20px', sm: '0' }, // Extra padding on mobile
                    }}
                  >
                    {index === 0 ? (
                      <>
                        <EditableTextMUI
                          value={heroTitleSection.content}
                          onSave={(value) => updateSectionContent(heroTitleSection.id, value)}
                          variant="h1"
                          sx={{
                            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '4.5rem' },
                            fontWeight: 700,
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            mb: { xs: 1, md: 2 },
                            lineHeight: { xs: 1.2, md: 1.3 },
                          }}
                        />
                        <EditableTextMUI
                          value={heroSubtitleSection.content}
                          onSave={(value) => updateSectionContent(heroSubtitleSection.id, value)}
                          variant="h4"
                          sx={{
                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.75rem' },
                            fontWeight: 400,
                            color: 'white',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            lineHeight: { xs: 1.3, md: 1.4 },
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '4.5rem' },
                            fontWeight: 700,
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            mb: { xs: 1, md: 2 },
                            lineHeight: { xs: 1.2, md: 1.3 },
                          }}
                        >
                          {slide.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.75rem' },
                            fontWeight: 400,
                            color: 'white',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            mb: { xs: 1, md: 2 },
                            lineHeight: { xs: 1.3, md: 1.4 },
                          }}
                        >
                          {slide.subtitle}
                        </Typography>
                      </>
                    )}
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        maxWidth: '600px',
                        lineHeight: { xs: 1.4, md: 1.6 },
                        px: { xs: 1, md: 0 },
                      }}
                    >
                      {slide.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        mt: { xs: 1, md: 2 },
                        px: { xs: 3, md: 4 },
                        py: { xs: 1, md: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                        fontWeight: 600,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                          opacity: 0.9,
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </Stack>
                </Container>
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
