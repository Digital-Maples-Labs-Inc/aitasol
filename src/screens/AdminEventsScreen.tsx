/**
 * Admin Events Screen
 * Manage events (add, edit, delete)
 */

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CircularProgress,
    Container,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Upload as UploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '@/contexts/AuthContext';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { getEvents, createEvent, updateEvent, deleteEvent, Event } from '@/services/eventsService';
import { uploadImage, compressImage } from '@/services/storageService';

const AdminEventsScreen: React.FC = () => {
    const { user } = useAuth();
    useRequireAuth('admin');

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'General',
        description: '',
        date: new Date(),
        location: '',
        linkUrl: '',
        imageUrl: '',
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error loading events:', error);
            alert('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (event?: Event) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                category: event.category || 'General',
                description: event.description,
                date: event.date,
                location: event.location || '',
                linkUrl: event.linkUrl || '',
                imageUrl: event.imageUrl || '',
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: '',
                category: 'General',
                description: '',
                date: new Date(),
                location: '',
                linkUrl: '',
                imageUrl: '',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingEvent(null);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!user) {
            alert('You must be logged in to upload images.');
            return;
        }

        try {
            setUploading(true);
            const compressedBlob = await compressImage(file, 800, 600, 0.8);
            const fileExtension = file.name.split('.').pop() || 'jpg';
            const fileName = `event-${Date.now()}.${fileExtension}`;

            const downloadURL = await uploadImage(compressedBlob, fileName, 'events');
            setFormData({ ...formData, imageUrl: downloadURL });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.date || !formData.description) {
            alert('Please fill in required fields (Title, Date, Description)');
            return;
        }

        try {
            setLoading(true);

            const eventData = {
                title: formData.title,
                category: formData.category,
                date: formData.date,
                description: formData.description,
                location: formData.location,
                linkUrl: formData.linkUrl,
                imageUrl: formData.imageUrl,
            };

            if (editingEvent && editingEvent.id) {
                await updateEvent(editingEvent.id, eventData);
                alert('Event updated successfully');
            } else {
                await createEvent(eventData);
                alert('Event created successfully');
            }

            handleCloseDialog();
            loadEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                setLoading(true);
                await deleteEvent(id);
                loadEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading && !events.length && !openDialog) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Manage Events
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Add Event
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {events.map((event) => (
                    <Box key={event.id} sx={{ height: '100%' }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {event.imageUrl && (
                                <Box
                                    component="img"
                                    sx={{ height: 140, objectFit: 'cover' }}
                                    src={event.imageUrl}
                                    alt={event.title}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {event.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {event.date.toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}>
                                    {event.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleOpenDialog(event)} startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                                <Button size="small" color="error" onClick={() => event.id && handleDelete(event.id)} startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box component="form" noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={formData.category}
                                label="Category"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <MenuItem value="Workshop">Workshop</MenuItem>
                                <MenuItem value="Youth">Youth</MenuItem>
                                <MenuItem value="Community">Community</MenuItem>
                                <MenuItem value="General">General</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            fullWidth
                            label="Event Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Box sx={{ flex: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Event Date"
                                        value={formData.date}
                                        onChange={(newValue) => setFormData({ ...formData, date: newValue || new Date() })}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <TextField
                                fullWidth
                                label="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Link URL (Optional)"
                            placeholder="https://zoom.us/..."
                            value={formData.linkUrl}
                            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                        />

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Event Image
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {formData.imageUrl && (
                                    <Box
                                        component="img"
                                        src={formData.imageUrl}
                                        sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1 }}
                                    />
                                )}
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                                    disabled={uploading}
                                >
                                    {uploading ? 'Uploading...' : 'Upload Image'}
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={loading || uploading}>
                        {loading ? 'Saving...' : 'Save Event'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminEventsScreen;
