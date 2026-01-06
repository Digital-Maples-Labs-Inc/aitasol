import * as React from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student, University of Toronto',
    avatar: '/static/images/avatar/1.jpg',
    rating: 5,
    testimonial: 'AitaSol made my dream of studying in Canada a reality. Their guidance was invaluable throughout the entire process.',
  },
  {
    name: 'Michael Chen',
    role: 'Graduate, McGill University',
    avatar: '/static/images/avatar/2.jpg',
    rating: 5,
    testimonial: 'The team at AitaSol provided exceptional support with my study permit application. Highly recommended!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Student, University of British Columbia',
    avatar: '/static/images/avatar/3.jpg',
    rating: 5,
    testimonial: 'Professional, knowledgeable, and always available. AitaSol exceeded my expectations in every way.',
  },
  {
    name: 'David Kim',
    role: 'Graduate, University of Alberta',
    avatar: '/static/images/avatar/4.jpg',
    rating: 5,
    testimonial: 'Thanks to AitaSol, I successfully navigated the admissions process and now I\'m pursuing my master\'s degree.',
  },
  {
    name: 'Lisa Wang',
    role: 'Student, University of Waterloo',
    avatar: '/static/images/avatar/5.jpg',
    rating: 5,
    testimonial: 'The career counseling services helped me choose the right program for my future goals. Excellent service!',
  },
  {
    name: 'James Anderson',
    role: 'Graduate, Queen\'s University',
    avatar: '/static/images/avatar/6.jpg',
    rating: 5,
    testimonial: 'AitaSol\'s expertise in immigration and study permits saved me time and stress. Highly recommended!',
  },
];

export default function TestimonialsGrid() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('testimonials');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => {
          const testimonialTextSection = getSection(`testimonial-${index}-text`) || { 
            id: `testimonial-${index}-text`, 
            content: testimonial.testimonial, 
            type: 'paragraph' as const 
          };
          const testimonialNameSection = getSection(`testimonial-${index}-name`) || { 
            id: `testimonial-${index}-name`, 
            content: testimonial.name, 
            type: 'heading' as const 
          };
          const testimonialRoleSection = getSection(`testimonial-${index}-role`) || { 
            id: `testimonial-${index}-role`, 
            content: testimonial.role, 
            type: 'paragraph' as const 
          };
          const testimonialAvatarSection = getSection(`testimonial-${index}-avatar`) || { 
            id: `testimonial-${index}-avatar`, 
            content: testimonial.avatar, 
            type: 'image' as const,
            metadata: { imageUrl: testimonial.avatar, imageAlt: testimonial.name }
          };
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                    ))}
                  </Box>
                  <EditableTextMUI
                    value={testimonialTextSection.content}
                    onSave={(value) => updateSectionContent(testimonialTextSection.id, value)}
                    variant="body1"
                    multiline
                    sx={{ color: 'text.secondary', mb: 2, display: 'block' }}
                  />
                </CardContent>
                <CardHeader
                  avatar={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EditableImageMUI
                        src={testimonialAvatarSection.metadata?.imageUrl || testimonialAvatarSection.content || testimonial.avatar}
                        alt={testimonialAvatarSection.metadata?.imageAlt || testimonial.name}
                        onSave={(url) => updateSectionImage(testimonialAvatarSection.id, url, testimonialNameSection.content)}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                        aspectRatio="1/1"
                      />
                    </Box>
                  }
                  title={
                    <EditableTextMUI
                      value={testimonialNameSection.content}
                      onSave={(value) => updateSectionContent(testimonialNameSection.id, value)}
                      variant="body2"
                      sx={{ fontWeight: 500 }}
                    />
                  }
                  subheader={
                    <EditableTextMUI
                      value={testimonialRoleSection.content}
                      onSave={(value) => updateSectionContent(testimonialRoleSection.id, value)}
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    />
                  }
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

