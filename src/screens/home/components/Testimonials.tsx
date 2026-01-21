import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useColorScheme } from '@mui/material/styles';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'University Student',
    testimonial:
      "AitaSol helped me navigate the confusing application process for Canadian universities. Their guidance was realistic and grounded, saving me both time and money.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Master\'s Applicant',
    testimonial:
      "Honesty is rare in this industry. They told me exactly what I needed to work on rather than just promising a guaranteed admission. I respected that transparency.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'Parent',
    testimonial:
      "We were worried about funding and visa risks. The team laid out all the options clearly, helping us make a decision that our family could actually support financially.",
  },
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const { mode, systemMode } = useColorScheme();
  const { page, loading, getSection, updateSectionContent } = usePageData('home');


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const testimonialsTitleSection = getSection('testimonials-title') || { id: 'testimonials-title', content: 'What Our Students Say', type: 'heading' as const };
  const testimonialsSubtitleSection = getSection('testimonials-subtitle') || { id: 'testimonials-subtitle', content: 'Real feedback from students and families we have supported on their educational journey.', type: 'paragraph' as const };

  return (
    <Box
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
            label="Testimonials"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: 'primary.main',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              px: 1,
              mb: 2
            }}
          />
          <EditableTextMUI
            value={testimonialsTitleSection.content}
            onSave={(value) => updateSectionContent(testimonialsTitleSection.id, value)}
            variant="h2"
            sx={{
              mb: 2,
              display: 'block',
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          />
          <EditableTextMUI
            value={testimonialsSubtitleSection.content}
            onSave={(value) => updateSectionContent(testimonialsSubtitleSection.id, value)}
            variant="body1"
            multiline
            sx={{
              color: 'text.secondary',
              display: 'block',
              maxWidth: '600px',
              fontSize: '1.1rem'
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {userTestimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: '24px',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.main',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent>
                  <EditableTextMUI
                    value={getSection(`home-testimonial-${index}-text`)?.content || testimonial.testimonial}
                    onSave={(value) => updateSectionContent(`home-testimonial-${index}-text`, value)}
                    variant="body1"
                    multiline
                    sx={{
                      color: 'text.primary',
                      mb: 3,
                      display: 'block',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  />
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2
                  }}
                >
                  <CardHeader
                    avatar={testimonial.avatar}
                    title={
                      <Typography variant="subtitle1" fontWeight={700}>
                        {testimonial.name}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.occupation}
                      </Typography>
                    }
                    sx={{ p: 0 }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
