import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Grid, Chip } from '@mui/material';
import HeaderNavigation from '@/components/HeaderNavigation';
import Footer from '@/components/Footer';
import { getEvents, Event } from '@/services/eventsService';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventsScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                // Sort events by date, upcoming first
                const sortedEvents = data.sort((a, b) => a.date.getTime() - b.date.getTime());
                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (linkUrl?: string) => {
        if (linkUrl) {
            window.open(linkUrl, '_blank');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderNavigation />

            <Box sx={{ flexGrow: 1, py: 8, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
                        Upcoming Events
                    </Typography>

                    {loading ? (
                        <Typography textAlign="center">Loading events...</Typography>
                    ) : events.length === 0 ? (
                        <Typography textAlign="center" variant="h6" color="text.secondary">
                            No upcoming events at the moment. Please check back later!
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
                            {events.map((event) => (
                                <Card
                                    key={event.id}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4
                                        }
                                    }}
                                >
                                    {event.imageUrl && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={event.imageUrl}
                                            alt={event.title}
                                        />
                                    )}
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box>
                                            <Chip
                                                icon={<CalendarTodayIcon sx={{ fontSize: '1rem !important' }} />}
                                                label={event.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                                {event.title}
                                            </Typography>
                                        </Box>

                                        <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                                            {event.description}
                                        </Typography>

                                        {event.location && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 1 }}>
                                                <LocationOnIcon fontSize="small" />
                                                <Typography variant="body2">{event.location}</Typography>
                                            </Box>
                                        )}

                                        {event.linkUrl && (
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => handleEventClick(event.linkUrl)}
                                                sx={{ mt: 'auto' }}
                                            >
                                                Register / Join
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

export default EventsScreen;
