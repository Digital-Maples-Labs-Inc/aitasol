import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Grid, Chip } from '@mui/material';
import { getEvents, Event } from '@/services/eventsService';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HomeEventsSection() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                const now = new Date();
                // Filter upcoming events and sort by date
                const upcomingEvents = data
                    .filter(event => event.date >= now) // Optional: only show future events? Or just all sorted. User said "pulling only 3 events". Usually implied upcoming.
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 3);

                // If no upcoming, maybe show latest past? Or just show nothing if empty.
                // Let's stick to upcoming or just sorted by date if all are past.
                // If filtered list is empty, falling back to just latest 3 by date descending might be better if we want to show *something*.
                // But for "Events", upcoming is usually the goal.
                // If < 3 upcoming, maybe show all upcoming.

                if (upcomingEvents.length === 0 && data.length > 0) {
                    // Fallback: show latest 3 added/modified or just latest dates (even if past)
                    // Just showing nothing is safer if "Events" implies things to attend.
                    setEvents([]);
                } else {
                    setEvents(upcomingEvents);
                }

            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (!loading && events.length === 0) {
        return null; // Don't show section if no events
    }

    const handleEventClick = (linkUrl?: string) => {
        if (linkUrl) {
            window.open(linkUrl, '_blank');
        }
    };

    return (
        <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="events-section">
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Typography variant="h3" component="h2" fontWeight="bold">
                        Upcoming Events
                    </Typography>
                    <Button
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        component="a"
                        href="/events"
                    >
                        View All Events
                    </Button>
                </Box>

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
                                        label={event.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography variant="h6" component="h3" fontWeight="bold" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        height: '3.6em' // approximate for 2 lines
                                    }}>
                                        {event.title}
                                    </Typography>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    flexGrow: 1
                                }}>
                                    {event.description}
                                </Typography>

                                {event.location && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mt: 1 }}>
                                        <LocationOnIcon fontSize="small" />
                                        <Typography variant="caption">{event.location}</Typography>
                                    </Box>
                                )}
                                {event.linkUrl && (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="small"
                                        onClick={() => handleEventClick(event.linkUrl)}
                                        sx={{ mt: 2 }}
                                    >
                                        Register / Join
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
