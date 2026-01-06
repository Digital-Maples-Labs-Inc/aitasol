import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ContactForm from './ContactForm';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function ContactContent() {
  const theme = useTheme();
  const { page, loading, updateSectionContent, getSection } = usePageData('contact');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Get section content or use defaults
  const contactTitleSection = getSection('contact-title') || { id: 'contact-title', content: 'CONTACT US', type: 'heading' as const };
  const contactHeadingSection = getSection('contact-heading') || { id: 'contact-heading', content: "Let's talk about your problem.", type: 'heading' as const };
  const locationTitleSection = getSection('location-title') || { id: 'location-title', content: 'Our Location', type: 'heading' as const };
  const locationTextSection = getSection('location-text') || { id: 'location-text', content: '401 Broadway, 24th Floor, Orchard Cloud View, London', type: 'paragraph' as const };
  const emailTitleSection = getSection('email-title') || { id: 'email-title', content: 'How Can We Help?', type: 'heading' as const };
  const email1Section = getSection('email-1') || { id: 'email-1', content: 'info@aitasol.com', type: 'paragraph' as const };
  const email2Section = getSection('email-2') || { id: 'email-2', content: 'contact@aitasol.com', type: 'paragraph' as const };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
        minHeight: '100vh',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: -1,
          height: { xs: '50%', lg: '45%', xl: '50%' },
          width: '100%',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(233, 249, 255, 1)',
        },
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Contact Info */}
          <Grid size={{ xs: 12, lg: 7, xl: 8 }}>
            <Box>
              {/* Contact Title */}
              <Box sx={{ mb: { xs: 6, lg: 18 } }}>
                <EditableTextMUI
                  value={contactTitleSection.content}
                  onSave={(value) => updateSectionContent(contactTitleSection.id, value)}
                  variant="overline"
                  sx={{
                    display: 'block',
                    mb: 3,
                    fontSize: '1rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                />
                <EditableTextMUI
                  value={contactHeadingSection.content}
                  onSave={(value) => updateSectionContent(contactHeadingSection.id, value)}
                  variant="h2"
                  sx={{
                    maxWidth: '260px',
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    fontWeight: 600,
                    lineHeight: 1.14,
                  }}
                />
              </Box>

              {/* Contact Info Boxes */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: 4,
                  mb: { xs: 6, lg: 0 },
                }}
              >
                {/* Location */}
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '330px' },
                    maxWidth: '100%',
                  }}
                >
                  <Box
                    sx={{
                      mr: 3,
                      fontSize: '2rem',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 0.5,
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: '2rem' }} />
                  </Box>
                  <Box>
                    <EditableTextMUI
                      value={locationTitleSection.content}
                      onSave={(value) => updateSectionContent(locationTitleSection.id, value)}
                      variant="h6"
                      sx={{
                        mb: 2.25,
                        fontSize: '1.125rem',
                        fontWeight: 600,
                      }}
                    />
                    <EditableTextMUI
                      value={locationTextSection.content}
                      onSave={(value) => updateSectionContent(locationTextSection.id, value)}
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                      }}
                    />
                  </Box>
                </Box>

                {/* Email */}
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '330px' },
                    maxWidth: '100%',
                  }}
                >
                  <Box
                    sx={{
                      mr: 3,
                      fontSize: '2rem',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 0.5,
                    }}
                  >
                    <EmailIcon sx={{ fontSize: '2rem' }} />
                  </Box>
                  <Box>
                    <EditableTextMUI
                      value={emailTitleSection.content}
                      onSave={(value) => updateSectionContent(emailTitleSection.id, value)}
                      variant="h6"
                      sx={{
                        mb: 2.25,
                        fontSize: '1.125rem',
                        fontWeight: 600,
                      }}
                    />
                    <EditableTextMUI
                      value={email1Section.content}
                      onSave={(value) => updateSectionContent(email1Section.id, value)}
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    />
                    <EditableTextMUI
                      value={email2Section.content}
                      onSave={(value) => updateSectionContent(email2Section.id, value)}
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        mt: 1,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid size={{ xs: 12, lg: 5, xl: 4 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

