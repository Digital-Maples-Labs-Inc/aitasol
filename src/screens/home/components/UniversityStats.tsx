import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function UniversityStats() {
    const { loading, getSection, updateSectionContent } = usePageData('home');

    if (loading) return null;

    const titleSection = getSection('university-stats-title') || {
        id: 'university-stats-title',
        content: 'FUN FACTS ABOUT UNIVERSITY',
        type: 'heading' as const
    };

    const subtitleSection = getSection('university-stats-subtitle') || {
        id: 'university-stats-subtitle',
        content: 'Education, empowering them to become well-rounded leaders who make a positive impact on the world.',
        type: 'paragraph' as const
    };

    const stats = [
        {
            id: 'stat-nationalities',
            label: 'Student Nationalities',
            defaultValue: '100+'
        },
        {
            id: 'stat-international',
            label: 'International Students',
            defaultValue: '25%'
        },
        {
            id: 'stat-majors',
            label: 'Different Majors',
            defaultValue: '20'
        }
    ];

    return (
        <Box
            sx={{
                py: { xs: 8, sm: 12, md: 16 },
                background: (theme) => `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
            }}
        >
            <Container maxWidth="lg">
                {/* Icon and Title */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <SchoolIcon
                        sx={{
                            fontSize: 60,
                            color: 'secondary.main',
                            mb: 2
                        }}
                    />

                    <EditableTextMUI
                        value={titleSection.content}
                        onSave={(value) => updateSectionContent(titleSection.id, value)}
                        variant="overline"
                        sx={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            color: 'text.secondary',
                            mb: 2,
                            display: 'block'
                        }}
                    />

                    <EditableTextMUI
                        value={subtitleSection.content}
                        onSave={(value) => updateSectionContent(subtitleSection.id, value)}
                        variant="h4"
                        sx={{
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            maxWidth: '900px',
                            mx: 'auto',
                            lineHeight: 1.3,
                            '& strong': {
                                color: 'secondary.main',
                            }
                        }}
                    />
                </Box>

                {/* Statistics */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                >
                    {stats.map((stat) => {
                        const statSection = getSection(stat.id) || {
                            id: stat.id,
                            content: stat.defaultValue,
                            type: 'paragraph' as const
                        };

                        return (
                            <Box
                                key={stat.id}
                                sx={{
                                    textAlign: 'center',
                                    p: 4,
                                    borderRadius: 2,
                                    minWidth: { xs: '100%', sm: '200px' },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`,
                                    }
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'text.secondary',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        mb: 2,
                                        display: 'block'
                                    }}
                                >
                                    {stat.label}
                                </Typography>

                                <EditableTextMUI
                                    value={statSection.content}
                                    onSave={(value) => updateSectionContent(statSection.id, value)}
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                                        fontWeight: 700,
                                        color: 'secondary.main',
                                        lineHeight: 1,
                                        WebkitTextStroke: '2px transparent',
                                        WebkitTextFillColor: 'transparent',
                                        WebkitTextStrokeColor: 'secondary.main',
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Stack>
            </Container>
        </Box>
    );
}
