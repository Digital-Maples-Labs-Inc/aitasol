import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

const defaultTeamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Education Consultant',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Immigration Specialist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Student Success Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
];

export default function TeamSection() {
  const { page, loading, getSection, updateSectionContent, updateSectionImage } = usePageData('about');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const teamTitleSection = getSection('team-title') || { id: 'team-title', content: 'Our Experts', type: 'heading' as const };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, pb: { xs: 10, md: 16 }, bgcolor: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration: Dot Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(#888 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="overline" color="primary" sx={{ display: 'block', textAlign: 'center', mb: 2, fontWeight: 700, letterSpacing: 1.5 }}>
          GLOBAL REACH
        </Typography>
        <EditableTextMUI
          value={teamTitleSection.content}
          onSave={(value) => updateSectionContent(teamTitleSection.id, value)}
          variant="h2"
          sx={{ textAlign: 'center', mb: 8, display: 'block', fontFamily: 'serif' }}
        />

        <Grid container spacing={4}>
          {defaultTeamMembers.map((member, index) => {
            const memberNameSection = getSection(`team-member-${index}-name`) || {
              id: `team-member-${index}-name`,
              content: member.name,
              type: 'heading' as const
            };
            const memberRoleSection = getSection(`team-member-${index}-role`) || {
              id: `team-member-${index}-role`,
              content: member.role,
              type: 'paragraph' as const
            };
            const memberAvatarSection = getSection(`team-member-${index}-avatar`) || {
              id: `team-member-${index}-avatar`,
              content: member.avatar,
              type: 'image' as const,
              metadata: { imageUrl: member.avatar, imageAlt: member.name }
            };

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '32px',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }
                }}>
                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      mx: 'auto',
                      mb: 3,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '4px solid',
                      borderColor: 'background.default',
                      boxShadow: 3
                    }}
                  >
                    <EditableImageMUI
                      src={memberAvatarSection.metadata?.imageUrl || memberAvatarSection.content || member.avatar}
                      onSave={(url) => updateSectionImage(memberAvatarSection.id, url)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <EditableTextMUI
                    value={memberNameSection.content}
                    onSave={(value) => updateSectionContent(memberNameSection.id, value)}
                    variant="h5"
                    sx={{ fontFamily: 'serif', mb: 1, fontWeight: 600, display: 'block' }}
                  />
                  <EditableTextMUI
                    value={memberRoleSection.content}
                    onSave={(value) => updateSectionContent(memberRoleSection.id, value)}
                    variant="body2"
                    sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem', fontWeight: 700, display: 'block' }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

