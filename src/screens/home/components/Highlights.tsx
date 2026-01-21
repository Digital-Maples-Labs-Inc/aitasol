import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePageData } from '@/hooks/usePageData';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import CircularProgress from '@mui/material/CircularProgress';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { useTheme } from '@mui/material/styles';

// --- CountUp Animation Hook ---
const useCountUp = (endValue: string, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [displayValue, setDisplayValue] = useState(endValue);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasAnimatedRef = useRef(false);

  // Extract number and suffix/prefix
  const numberMatch = endValue.match(/(\d+(\.\d+)?)/);
  const targetNumber = numberMatch ? parseFloat(numberMatch[0]) : 0;

  useEffect(() => {
    // If no number found, just return original string
    if (!numberMatch) {
      setDisplayValue(endValue);
      return;
    }

    // Reset if value changes dramatically or on mount
    const suffix = endValue.replace(numberMatch[0], '');

    // Intersection Observer to start animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${endValue.replace(/\W/g, '')}`);
    if (element) observer.observe(element);

    const startAnimation = () => {
      const step = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentCount = targetNumber * easeProgress;

        // Format logic: if target has decimals, preserve them
        const hasDecimals = targetNumber % 1 !== 0;
        const formattedCount = hasDecimals
          ? currentCount.toFixed(1)
          : Math.floor(currentCount).toString();

        setCount(parseFloat(formattedCount));
        setDisplayValue(endValue.replace(numberMatch[0], formattedCount));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    };

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, [endValue, duration]);

  return { displayValue, id: `counter-${endValue.replace(/\W/g, '')}` };
};

// --- Single Animated Stat Component ---
const AnimatedStat = ({ value, variant = 'h2', sx = {} }: { value: string, variant?: any, sx?: any }) => {
  const { displayValue, id } = useCountUp(value);
  return (
    <Typography id={id} variant={variant} sx={sx}>
      {displayValue}
    </Typography>
  );
};

export default function Highlights() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('home');
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // --- Data Fetching & Defaults ---

  // Top Left: Teacher Card
  const teacherImgSection = getSection('highlight-teacher-img') || {
    id: 'highlight-teacher-img',
    content: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2669&auto=format&fit=crop',
    type: 'image' as const
  };
  const teacherStatSection = getSection('highlight-teacher-stat') || { id: 'highlight-teacher-stat', content: '8+', type: 'heading' as const };
  const teacherTextSection = getSection('highlight-teacher-text') || { id: 'highlight-teacher-text', content: 'Years of professional English teaching.', type: 'paragraph' as const };

  // Top Right Grid Items
  // 1. IELTS
  const stat1Value = getSection('highlight-stat1-value') || { id: 'highlight-stat1-value', content: '7.0+', type: 'heading' as const };
  const stat1Text = getSection('highlight-stat1-text') || { id: 'highlight-stat1-text', content: 'Students average grade on speaking IELTS/TOEFL.', type: 'paragraph' as const };

  // 2. Rating
  const stat2Value = getSection('highlight-stat2-value') || { id: 'highlight-stat2-value', content: '4.9/5', type: 'heading' as const };
  const stat2Text = getSection('highlight-stat2-text') || { id: 'highlight-stat2-text', content: 'Rating based on Google Reviews from my students.', type: 'paragraph' as const };

  // 3. Fluency
  const stat3Value = getSection('highlight-stat3-value') || { id: 'highlight-stat3-value', content: '90%', type: 'heading' as const };
  const stat3Text = getSection('highlight-stat3-text') || { id: 'highlight-stat3-text', content: 'Learners report feeling more fluent after 10 lessons.', type: 'paragraph' as const };

  // 4. Lessons
  const stat4Value = getSection('highlight-stat4-value') || { id: 'highlight-stat4-value', content: '4K+', type: 'heading' as const };
  const stat4Text = getSection('highlight-stat4-text') || { id: 'highlight-stat4-text', content: 'Professional, interactive, and tailored to every student lessons delivered.', type: 'paragraph' as const };

  // Bottom Left: Map Card
  const mapImgSection = getSection('highlight-map-img') || {
    id: 'highlight-map-img',
    content: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Blank_map_of_the_world_&#40;Robinson_projection&#41;_&#40;162E_shift&#41;.svg/2560px-Blank_map_of_the_world_&#40;Robinson_projection&#41;_&#40;162E_shift&#41;.svg.png',
    type: 'image' as const
  };
  const mapStatSection = getSection('highlight-map-stat') || { id: 'highlight-map-stat', content: '500+', type: 'heading' as const };
  const mapTextSection = getSection('highlight-map-text') || { id: 'highlight-map-text', content: 'Learners worldwide trust my lessons to build English confidence.', type: 'paragraph' as const };

  // Bottom Right: Students Card
  const studentsImgSection = getSection('highlight-students-img') || {
    id: 'highlight-students-img',
    content: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop',
    type: 'image' as const
  };
  const studentsStatSection = getSection('highlight-students-stat') || { id: 'highlight-students-stat', content: '98%', type: 'heading' as const };
  const studentsTextSection = getSection('highlight-students-text') || { id: 'highlight-students-text', content: 'Students continue after their first lesson.', type: 'paragraph' as const };

  // Styles
  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    bgcolor: 'background.paper', // Uses theme 'paper' (dark grey)
    borderRadius: '24px', // Exactly matching the roundness of the reference Bento grid
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      borderColor: 'primary.main',
    },
  };

  const statCardStyle = {
    ...cardStyle,
    p: 2, // Reduced padding
    justifyContent: 'space-between',
    minHeight: '160px', // Reduced height
    gap: 1, // Add gap for structure
  };

  const imageCardOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    p: 3,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
    color: 'white',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    opacity: 0.8,
    color: 'primary.main', // Neon green
  };

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>

          {/* Top Row */}

          {/* Top Left: Teacher Image Card (Tall) */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ ...cardStyle, height: '100%', minHeight: { xs: '300px', lg: 'auto' } }}>
              <EditableImageMUI
                src={teacherImgSection.content || ''}
                onSave={(url) => updateSectionImage(teacherImgSection.id, url)}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
              <Box sx={imageCardOverlayStyle}>
                <Box sx={{ mb: 1 }}>
                  <EditableAnimatedText
                    value={teacherStatSection.content}
                    onSave={(val) => updateSectionContent(teacherStatSection.id, val)}
                    variant="h2"
                    sx={{ fontWeight: 700, mr: 1, color: 'white' }}
                  />
                </Box>
                <EditableTextMUI
                  value={teacherTextSection.content}
                  onSave={(v) => updateSectionContent(teacherTextSection.id, v)}
                  variant="h6"
                  sx={{ color: 'grey.300', fontWeight: 400, fontSize: '1.25rem', lineHeight: 1.4 }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Top Right: 2x2 Grid */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={3} sx={{ height: '100%' }}>
              {[
                { val: stat1Value, txt: stat1Text, icon: <AssignmentRoundedIcon sx={iconStyle} /> },
                { val: stat2Value, txt: stat2Text, icon: <ChatBubbleRoundedIcon sx={iconStyle} /> },
                { val: stat3Value, txt: stat3Text, icon: <BarChartRoundedIcon sx={iconStyle} /> },
                { val: stat4Value, txt: stat4Text, icon: <SchoolRoundedIcon sx={iconStyle} /> },
              ].map((item, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <Box sx={statCardStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <EditableAnimatedText
                        value={item.val.content}
                        onSave={(v) => updateSectionContent(item.val.id, v)}
                        variant="h3"
                        sx={{ fontWeight: 700 }}
                      />
                      {item.icon}
                    </Box>
                    <Box>

                      <EditableTextMUI
                        value={item.txt.content}
                        onSave={(v) => updateSectionContent(item.txt.id, v)}
                        variant="h6"
                        sx={{ color: 'text.secondary', mt: 1, fontWeight: 400, fontSize: '1.15rem', lineHeight: 1.3 }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Bottom Row */}

          {/* Bottom Left: Map Card */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ ...cardStyle, position: 'relative', minHeight: '300px', p: 0 }}>
              {/* Background Image (Map) */}
              <Box sx={{ height: '100%', width: '100%', position: 'absolute', zIndex: 0, opacity: 0.5 }}>
                <EditableImageMUI
                  src={mapImgSection.content || ''}
                  onSave={(url) => updateSectionImage(mapImgSection.id, url)}
                  sx={{ height: '100%', width: '100%', objectFit: 'contain', p: 4 }}
                />
              </Box>

              {/* Content Overlay */}
              <Box sx={{ position: 'relative', zIndex: 1, p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <EditableAnimatedText
                  value={mapStatSection.content}
                  onSave={(v) => updateSectionContent(mapStatSection.id, v)}
                  variant="h2"
                  sx={{ fontWeight: 700 }}
                />
                <EditableTextMUI
                  value={mapTextSection.content}
                  onSave={(v) => updateSectionContent(mapTextSection.id, v)}
                  variant="h6"
                  sx={{ color: 'text.secondary', maxWidth: '400px', fontWeight: 400, fontSize: '1.25rem', lineHeight: 1.4 }}
                />

                {/* Avatars placeholder */}
                <Box sx={{ display: 'flex', mt: 2 }}>
                  {[1, 2, 3, 4].map((n) => (
                    <Box
                      key={n}
                      component="img"
                      src={`https://i.pravatar.cc/150?img=${n + 10}`}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'background.paper',
                        ml: n > 1 ? '-12px' : 0,
                        zIndex: 5 - n, // Stacking order
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Bottom Right: Students Image Card */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ ...cardStyle, minHeight: '300px' }}>
              <EditableImageMUI
                src={studentsImgSection.content || ''}
                onSave={(url) => updateSectionImage(studentsImgSection.id, url)}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
              <Box sx={imageCardOverlayStyle}>
                <EditableAnimatedText
                  value={studentsStatSection.content}
                  onSave={(v) => updateSectionContent(studentsStatSection.id, v)}
                  variant="h2"
                  sx={{ fontWeight: 700, color: 'white' }}
                />
                <EditableTextMUI
                  value={studentsTextSection.content}
                  onSave={(v) => updateSectionContent(studentsTextSection.id, v)}
                  variant="h6"
                  sx={{ color: 'grey.300', fontWeight: 400, fontSize: '1.25rem', lineHeight: 1.4 }}
                />
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box >
  );
}

// Wrapper to combine Animation and Editing. 
// It renders the AnimatedStat, but when clicked (if editable), it triggers an invisible EditableTextMUI or similar?
// Actually we can just reuse EditableTextMUI but pass a "component" that handles animation?
// No, EditableTextMUI strictly renders Typography.
// Let's Build a small composition here.
const EditableAnimatedText = ({ value, onSave, variant, sx }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  // If editing, show the EditableTextMUI (which has the input field).
  // If not editing, show the AnimatedStat (with a click handler to triggers edit mode in a real impl, 
  // but EditableTextMUI handles its own state).

  // Strategy: Render EditableTextMUI. It shows static text. 
  // We want animation.
  // We will just Use EditableTextMUI and accept static text for now to save complexity, 
  // BUT modify the EditableTextMUI component to allow a custom renderer?
  // No, I can't modify it easily right now.

  // Workaround: 
  // Use `AnimatedStat` and place an `EditableTextMUI` over it with opacity 0?
  // Yes!

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* Visible Animated Text */}
      <AnimatedStat value={value} variant={variant} sx={sx} />

      {/* Invisible Editable Layer on top to capture clicks */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, zIndex: 10 }}>
        <EditableTextMUI
          value={value}
          onSave={onSave}
          variant={variant}
          sx={{ height: '100%', width: '100%' }}
        />
      </Box>
    </Box>
  );
};
