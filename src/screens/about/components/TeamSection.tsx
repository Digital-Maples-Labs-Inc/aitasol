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
                <Card>
                  <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      <EditableImageMUI
                        src={memberAvatarSection.metadata?.imageUrl || memberAvatarSection.content || member.avatar}
                        alt={memberAvatarSection.metadata?.imageAlt || member.name}
                        onSave={(url) => updateSectionImage(memberAvatarSection.id, url, memberNameSection.content)}
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                        aspectRatio="1/1"
                      />
                    </Box>
                    <EditableTextMUI
                      value={memberNameSection.content}
                      onSave={(value) => updateSectionContent(memberNameSection.id, value)}
                      variant="h6"
                      sx={{ mb: 1, display: 'block' }}
                    />
                    <EditableTextMUI
                      value={memberRoleSection.content}
                      onSave={(value) => updateSectionContent(memberRoleSection.id, value)}
                      variant="body2"
                      sx={{ color: 'text.secondary', display: 'block' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

