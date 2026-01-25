import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
        content: 'Guiding students to achieve their academic dreams and unlock opportunities for global education and career success.',
        type: 'paragraph' as const
    };

    return (
        <Box
            sx={{
                py: { xs: 8, sm: 12, md: 16 },
                background: (theme) => `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
            }}
        >
            <Container maxWidth="lg">
                {/* Icon and Title */}
                <Box sx={{ textAlign: 'center' }}>
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
            </Container>
        </Box>
    );
}
