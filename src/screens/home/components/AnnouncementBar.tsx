import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

export default function AnnouncementBar() {
    const { loading, getSection, updateSectionContent } = usePageData('home');

    if (loading) return null;

    const announcementSection = getSection('announcement-bar-text') || {
        id: 'announcement-bar-text',
        content: 'Calls for admission for the academic year 2025-26 now online or visit our campus',
        type: 'paragraph' as const
    };

    return (
        <Box
            sx={{
                background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                color: 'white',
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'rgba(255,255,255,0.1)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        // Removed flexWrap to keep items on one line
                        whiteSpace: 'nowrap', // Prevent wrapping
                        overflow: 'hidden',   // Handle overflow gracefully if needed
                        width: '100%',        // Ensure it takes full width
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontSize: '0.875rem',
                            animation: 'pulse 2s infinite ease-in-out',
                            '@keyframes pulse': {
                                '0%': { transform: 'scale(1)', opacity: 1 },
                                '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                                '100%': { transform: 'scale(1)', opacity: 1 },
                            },
                        }}
                    >
                        <CampaignRoundedIcon />
                        ANNOUNCEMENTS
                    </Box>

                    <Box sx={{ height: '20px', width: '1px', bgcolor: 'rgba(255,255,255,0.2)', display: { xs: 'none', sm: 'block' } }} />

                    <EditableTextMUI
                        value={announcementSection.content}
                        onSave={(value) => updateSectionContent(announcementSection.id, value)}
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                            color: 'rgba(255,255,255,0.9)',
                            '& .MuiInputBase-input': { textAlign: 'center', color: 'white' }
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
}
