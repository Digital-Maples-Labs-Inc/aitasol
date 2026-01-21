import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { usePageData } from '@/hooks/usePageData';

const HOME_COMPONENTS = [
    { id: 'section-visibility-hero-slider', label: 'Hero Slider' },
    { id: 'section-visibility-home-intro', label: 'Introduction' },
    { id: 'section-visibility-what-we-do', label: 'What We Do' },
    { id: 'section-visibility-about-us-home', label: 'About Us' },
    { id: 'section-visibility-logo-collection', label: 'Logo Collection' },
    { id: 'section-visibility-features', label: 'Features' },
    { id: 'section-visibility-testimonials', label: 'Testimonials' },
    { id: 'section-visibility-highlights', label: 'Highlights' },
    { id: 'section-visibility-pricing', label: 'Pricing' },
    { id: 'section-visibility-faq', label: 'FAQ' },
];

export default function HomePageControls() {
    const { page, updateSection, loading } = usePageData('home');

    const handleToggle = (componentId: string, currentActive: boolean) => async () => {
        try {
            await updateSection(componentId, {
                id: componentId,
                type: 'button', // Using 'button' or any generic type as it's just for visibility metadata
                content: '',
                metadata: {
                    active: !currentActive,
                },
            });
        } catch (error) {
            console.error('Error toggling component visibility:', error);
            alert('Failed to update visibility');
        }
    };

    if (loading) {
        return <Skeleton variant="rectangular" height={200} />;
    }

    if (!page) {
        return <Typography>Home page data not found.</Typography>;
    }

    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Home Page Visibility
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {HOME_COMPONENTS.map(({ id, label }) => {
                    const section = page.sections.find((s) => s.id === id);
                    // Default to true if section doesn't exist or active is undefined
                    const isActive = section?.metadata?.active ?? true;

                    return (
                        <FormControlLabel
                            key={id}
                            control={
                                <Switch
                                    checked={isActive}
                                    onChange={handleToggle(id, isActive)}
                                    name={id}
                                />
                            }
                            label={label}
                        />
                    );
                })}
            </Box>
        </Paper>
    );
}
