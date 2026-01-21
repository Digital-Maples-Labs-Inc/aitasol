import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

export default function CompanyStory() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('about');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 1. Mission Statement (Image Left)
  const s1Title = getSection('mission-title') || { id: 'mission-title', content: 'Mission Statement', type: 'heading' as const };
  const s1Desc = getSection('mission-desc') || { id: 'mission-desc', content: 'AitahSolutions Educational Consultancy exists to provide ethical, informed, and student-centered guidance for individuals pursuing international education pathways. Our mission is to support students in making academically sound, financially realistic, and career-aligned study decisions through transparent advising and evidence-based recommendations.', type: 'paragraph' as const };
  const s1Image = getSection('mission-image') || { id: 'mission-image', content: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2942&ixlib=rb-4.0.3', type: 'image' as const, metadata: { imageAlt: 'Mission' } };

  // 2. Who We Are (Image Right)
  const s2Title = getSection('who-we-are-title') || { id: 'who-we-are-title', content: 'Who We Are', type: 'heading' as const };
  const s2Desc = getSection('who-we-are-desc') || { id: 'who-we-are-desc', content: 'AitahSolutions Educational Consultancy was founded in 2019 with a clear purpose: to provide ethical, realistic, and student-focused education guidance in an industry often driven by volume rather than outcomes.\n\nWe recognized that many students make costly education decisions based on incomplete information, unrealistic expectations, or pressure to apply quickly. AitaSol was created to slow that process down, replacing guesswork with structured advising and transparency.', type: 'paragraph' as const };
  const s2Image = getSection('who-we-are-image') || { id: 'who-we-are-image', content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', type: 'image' as const, metadata: { imageAlt: 'Who We Are' } };

  // 3. Our Philosophy (Image Left)
  const s3Title = getSection('philosophy-title') || { id: 'philosophy-title', content: 'Our Philosophy', type: 'heading' as const };
  const s3Desc = getSection('philosophy-desc') || { id: 'philosophy-desc', content: 'We believe that:\n• Not every student should apply immediately\n• Not every program is the right fit\n• Not every opportunity leads to long-term success\n\nOur advisors focus on student readiness, not just eligibility. This means discussing risks, limitations, alternative pathways, and timing, even when those conversations are uncomfortable.', type: 'paragraph' as const };
  const s3Image = getSection('philosophy-image') || { id: 'philosophy-image', content: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', type: 'image' as const, metadata: { imageAlt: 'Philosophy' } };

  // 4. How We Work (Image Right)
  const s4Title = getSection('how-we-work-title') || { id: 'how-we-work-title', content: 'How We Work', type: 'heading' as const };
  const s4Desc = getSection('how-we-work-desc') || { id: 'how-we-work-desc', content: 'We guide students through:\n• Evaluating academic and career goals\n• Understanding institutional and program requirements\n• Navigating application and documentation processes\n• Exploring scholarships and funding responsibly\n• Preparing for arrival and transition\n\nWhere immigration advice is required, we refer students to licensed immigration professionals, maintaining clear professional boundaries.', type: 'paragraph' as const };
  const s4Image = getSection('how-we-work-image') || { id: 'how-we-work-image', content: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', type: 'image' as const, metadata: { imageAlt: 'How We Work' } };

  // 5. Our Commitment (Image Left)
  const s5Title = getSection('commitment-title') || { id: 'commitment-title', content: 'Our Commitment', type: 'heading' as const };
  const s5Desc = getSection('commitment-desc') || { id: 'commitment-desc', content: '• Transparency over promises\n• Guidance over guarantees\n• Long-term outcomes over short-term placements\n\nWe collaborate with recognized education platforms and partners to broaden access and streamline processes, while ensuring our advice remains independent and student-centered.', type: 'paragraph' as const };
  const s5Image = getSection('commitment-image') || { id: 'commitment-image', content: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3', type: 'image' as const, metadata: { imageAlt: 'Commitment' } };


  const sections = [
    { title: s1Title, desc: s1Desc, image: s1Image, align: 'left' },
    { title: s2Title, desc: s2Desc, image: s2Image, align: 'right' },
    { title: s3Title, desc: s3Desc, image: s3Image, align: 'left' },
    { title: s4Title, desc: s4Desc, image: s4Image, align: 'right' },
    { title: s5Title, desc: s5Desc, image: s5Image, align: 'left' },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'transparent' }}>
      <Container maxWidth="lg">
        {sections.map((section, index) => (
          <Grid
            key={index}
            container
            spacing={{ xs: 6, md: 10 }}
            alignItems="center"
            direction={section.align === 'right' ? { xs: 'column-reverse', md: 'row-reverse' } : { xs: 'column-reverse', md: 'row' }}
            sx={{ mb: { xs: 10, md: 16 }, '&:last-child': { mb: 0 } }}
          >
            {/* Image Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                border: '1px solid',
                borderColor: 'divider',
                aspectRatio: '4/3' // Standardize vertical/horizontal feel
              }}>
                <EditableImageMUI
                  src={(section.image.metadata as any)?.imageUrl || section.image.content}
                  onSave={(url) => updateSectionImage(section.image.id, url, (section.image.metadata as any)?.imageAlt)}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            {/* Text Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Add a subtle badge for the first section only? Or generic "OUR VALUES" if it fits. 
                   Let's keep it clean. */}
              {index === 0 && (
                <Box sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '100px',
                  px: 2,
                  py: 0.5,
                  bgcolor: 'background.paper',
                  display: 'inline-flex',
                  mb: 3
                }}>
                  <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, color: 'text.secondary', lineHeight: 1 }}>
                    OUR STORY
                  </Typography>
                </Box>
              )}

              <EditableTextMUI
                value={section.title.content}
                onSave={(value) => updateSectionContent(section.title.id, value)}
                variant="h2"
                sx={{
                  fontFamily: 'serif',
                  fontWeight: 500,
                  mb: 3,
                  display: 'block',
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              />
              <EditableTextMUI
                value={section.desc.content}
                onSave={(value) => updateSectionContent(section.desc.id, value)}
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  display: 'block',
                  whiteSpace: 'pre-wrap'
                }}
                multiline
              />
            </Grid>
          </Grid>
        ))}
      </Container>
    </Box>
  );
}
