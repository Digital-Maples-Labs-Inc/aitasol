import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { EditableImageMUI } from '@/components/EditableImageMUI';
import { usePageData } from '@/hooks/usePageData';

const defaultTeamMembers = [
  {
    name: 'Team Member 1',
    role: 'Education Consultant',
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    name: 'Team Member 2',
    role: 'Immigration Specialist',
    avatar: '/static/images/avatar/2.jpg',
  },
  {
    name: 'Team Member 3',
    role: 'Career Counselor',
    avatar: '/static/images/avatar/3.jpg',
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

  const teamTitleSection = getSection('team-title') || { id: 'team-title', content: 'Our Team', type: 'heading' as const };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: '#ffffff',
        py: { xs: 8, sm: 16 },
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container>
        <EditableTextMUI
          value={teamTitleSection.content}
          onSave={(value) => updateSectionContent(teamTitleSection.id, value)}
          variant="h3"
          sx={{ textAlign: 'center', mb: 4, display: 'block' }}
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
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    <EditableImageMUI
                      src={memberAvatarSection.metadata?.imageUrl || memberAvatarSection.content || member.avatar}
                      alt={memberAvatarSection.metadata?.imageAlt || member.name}
                      onSave={(url) => updateSectionImage(memberAvatarSection.id, url, memberNameSection.content)}
                      sx={{
                        width: 200, // Larger size
                        height: 200,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)', // Soft shadow
                      }}
                      aspectRatio="1/1"
                    />
                  </Box>
                  <EditableTextMUI
                    value={memberNameSection.content}
                    onSave={(value) => updateSectionContent(memberNameSection.id, value)}
                    variant="h5"
                    sx={{ mb: 0.5, display: 'block', fontWeight: 700 }}
                  />
                  <EditableTextMUI
                    value={memberRoleSection.content}
                    onSave={(value) => updateSectionContent(memberRoleSection.id, value)}
                    variant="body1"
                    sx={{ color: 'primary.main', display: 'block', fontWeight: 500, mb: 1 }}
                  />
                  {/* Optional short bio or links could go here */}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

