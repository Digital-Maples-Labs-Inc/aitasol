import React, { useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    Modal,
    Fade,
    Backdrop,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getPopupSettings, PopupSettings } from '@/services/settingsService';

export const PopupAdvert: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState<PopupSettings | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await getPopupSettings();
                if (data && data.isActive && data.imageUrl) {
                    setSettings(data);
                    // Small delay to ensure smooth entrance animation after page load
                    setTimeout(() => setOpen(true), 1000);
                }
            } catch (error) {
                console.error('Failed to load popup settings:', error);
            }
        };

        loadSettings();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleImageClick = () => {
        if (settings?.linkUrl) {
            window.open(settings.linkUrl, '_blank', 'noopener,noreferrer');
            handleClose();
        }
    };

    if (!settings) return null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' } // Darker backdrop for focus
                },
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999, // Very high z-index to stay on top
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'relative',
                        outline: 'none',
                        maxWidth: { xs: '90vw', md: '600px', lg: '800px' },
                        maxHeight: '90vh',
                        bgcolor: 'transparent',
                        p: 0,
                        cursor: settings.linkUrl ? 'pointer' : 'default',
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        sx={{
                            position: 'absolute',
                            top: -40,
                            right: -10,
                            color: 'white',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.8)',
                            },
                            [theme.breakpoints.up('md')]: {
                                top: -20,
                                right: -20,
                                bgcolor: 'white',
                                color: 'black',
                                '&:hover': {
                                    bgcolor: '#f5f5f5',
                                },
                            },
                        }}
                        size="large"
                        aria-label="close popup"
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Advert Image */}
                    <Box
                        component="img"
                        src={settings.imageUrl}
                        alt="Announcement"
                        onClick={handleImageClick}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            borderRadius: 2,
                            boxShadow: 24,
                            display: 'block',
                            transition: 'transform 0.2s',
                            '&:hover': settings.linkUrl ? {
                                transform: 'scale(1.01)',
                            } : {},
                        }}
                    />
                </Box>
            </Fade>
        </Modal>
    );
};
