import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';
import CircularProgress from '@mui/material/CircularProgress';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

const steps = [
    {
        id: 'process-step-1',
        icon: <CalendarTodayRoundedIcon sx={{ fontSize: 32 }} />,
        defaultContent: 'Initial Consultation',
        defaultDescription: 'Schedule a free discovery call to discuss your academic goals and assess your eligibility.',
        color: '#FB7185' // Rose
    },
    {
        id: 'process-step-2',
        icon: <RecordVoiceOverRoundedIcon sx={{ fontSize: 32 }} />,
        defaultContent: "Strategic Planning",
        defaultDescription: 'We create a personalized roadmap, selecting the right institutions and programs for your future.',
        color: '#E879F9' // Purple-pink
    },
    {
        id: 'process-step-3',
        icon: <SchoolRoundedIcon sx={{ fontSize: 32 }} />,
        defaultContent: 'Application & Visa',
        defaultDescription: 'Our experts guide you through the application process and visa documentation with precision.',
        color: '#A78BFA' // Violet
    },
    {
        id: 'process-step-4',
        icon: <RocketLaunchRoundedIcon sx={{ fontSize: 32 }} />,
        defaultContent: 'Arrival & Support',
        defaultDescription: 'Success! We assist with pre-departure preparations and settlement to ensure a smooth transition.',
        color: '#60A5FA' // Blue
    }
];

export default function ProcessFlow() {
    const { page, loading, getSection, updateSectionContent } = usePageData('home');
    const theme = useTheme();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: 'background.default',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle Gradient Background Blob */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(163, 216, 42, 0.08) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: 2,
                            display: 'block',
                            mb: 2
                        }}
                    >
                        OUR PROCESS
                    </Typography>
                    <EditableTextMUI
                        value={getSection('process-title')?.content || 'How It Works'}
                        onSave={(v) => updateSectionContent('process-title', v)}
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            fontSize: { xs: '2rem', md: '3rem' }
                        }}
                    />
                </Box>

                <Grid container spacing={4}>
                    {/* Connector Line (Desktop) - adjusted to be behind cards */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            position: 'absolute',
                            top: { md: '200px' }, // approx center of card
                            left: '10%',
                            right: '10%',
                            height: '1px',
                            borderTop: '2px dashed',
                            borderColor: 'divider',
                            zIndex: 0,
                            opacity: 0.5
                        }}
                    />

                    {steps.map((step, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.id}>
                            <Box
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    bgcolor: 'background.paper',
                                    borderRadius: '24px',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    zIndex: 1, // Above line
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: (theme) => theme.shadows[4],
                                        borderColor: 'primary.main',
                                        '& .step-icon': {
                                            transform: 'scale(1.1) rotate(5deg)',
                                        }
                                    }
                                }}
                            >
                                {/* Step Number Badge */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        bgcolor: (theme) => alpha(step.color, 0.1),
                                        color: step.color,
                                        py: 0.5,
                                        px: 1.5,
                                        borderRadius: '100px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        letterSpacing: 0.5
                                    }}
                                >
                                    0{index + 1}
                                </Box>

                                {/* Icon */}
                                <Box
                                    className="step-icon"
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3,
                                        color: step.color,
                                        bgcolor: (theme) => alpha(step.color, 0.1),
                                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    }}
                                >
                                    {step.icon}
                                </Box>

                                <EditableTextMUI
                                    value={getSection(step.id)?.content || step.defaultContent}
                                    onSave={(v) => updateSectionContent(step.id, v)}
                                    variant="h6"
                                    sx={{
                                        fontFamily: 'Instrument Sans, sans-serif',
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 1,
                                        fontSize: '1.25rem'
                                    }}
                                />

                                <EditableTextMUI
                                    value={getSection(step.id + '-desc')?.content || step.defaultDescription}
                                    onSave={(v) => updateSectionContent(step.id + '-desc', v)}
                                    variant="body2"
                                    multiline
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
