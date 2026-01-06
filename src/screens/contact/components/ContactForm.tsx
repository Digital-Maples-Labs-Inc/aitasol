import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { EditableTextMUI } from '@/components/EditableTextMUI';
import { usePageData } from '@/hooks/usePageData';

const StyledCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.background.paper 
    : '#ffffff',
  padding: theme.spacing(4),
  boxShadow: theme.palette.mode === 'dark' 
    ? 'none' 
    : '0px 10px 40px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7.5),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(7.5),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1'}`,
    borderRadius: 0,
    paddingBottom: theme.spacing(1.5),
    '&:hover': {
      borderBottomColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.2)' 
        : theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderBottomColor: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: 0,
    '&::placeholder': {
      color: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.5)' 
        : 'rgba(0, 0, 0, 0.4)',
      opacity: 0.6,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.6)' 
      : 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiInput-underline': {
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },
  },
}));

const StyledTextArea = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1'}`,
    borderRadius: 0,
    paddingBottom: theme.spacing(1.5),
    '&:hover': {
      borderBottomColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.2)' 
        : theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderBottomColor: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
  '& .MuiInputBase-input': {
    padding: 0,
    resize: 'none',
    '&::placeholder': {
      color: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.5)' 
        : 'rgba(0, 0, 0, 0.4)',
      opacity: 0.6,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.6)' 
      : 'rgba(0, 0, 0, 0.6)',
  },
}));

export default function ContactForm() {
  const { page, getSection, updateSectionContent } = usePageData('contact');
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  // Get form title section or use default
  const formTitleSection = getSection('form-title') || { id: 'form-title', content: 'Send us a Message', type: 'heading' as const };

  const handleChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <StyledCard>
      <EditableTextMUI
        value={formTitleSection.content}
        onSave={(value) => updateSectionContent(formTitleSection.id, value)}
        variant="h3"
        sx={{
          mb: 4,
          fontSize: { xs: '1.5rem', md: '1.75rem' },
          fontWeight: 600,
          lineHeight: 1.42,
        }}
      />
      <Box component="form" onSubmit={handleSubmit}>
        {/* Full Name */}
        <Box sx={{ mb: 2.75 }}>
          <Typography
            component="label"
            htmlFor="fullName"
            sx={{
              display: 'block',
              mb: 2,
              fontSize: '0.875rem',
              color: 'text.secondary',
            }}
          >
            Full Name*
          </Typography>
          <StyledTextField
            fullWidth
            id="fullName"
            name="fullName"
            placeholder="Adam Gelius"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            required
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>

        {/* Email */}
        <Box sx={{ mb: 2.75 }}>
          <Typography
            component="label"
            htmlFor="email"
            sx={{
              display: 'block',
              mb: 2,
              fontSize: '0.875rem',
              color: 'text.secondary',
            }}
          >
            Email*
          </Typography>
          <StyledTextField
            fullWidth
            id="email"
            name="email"
            type="email"
            placeholder="example@yourmail.com"
            value={formData.email}
            onChange={handleChange('email')}
            required
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>

        {/* Phone */}
        <Box sx={{ mb: 2.75 }}>
          <Typography
            component="label"
            htmlFor="phone"
            sx={{
              display: 'block',
              mb: 2,
              fontSize: '0.875rem',
              color: 'text.secondary',
            }}
          >
            Phone*
          </Typography>
          <StyledTextField
            fullWidth
            id="phone"
            name="phone"
            type="tel"
            placeholder="+885 1254 5211 552"
            value={formData.phone}
            onChange={handleChange('phone')}
            required
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>

        {/* Message */}
        <Box sx={{ mb: 3.75 }}>
          <Typography
            component="label"
            htmlFor="message"
            sx={{
              display: 'block',
              mb: 2,
              fontSize: '0.875rem',
              color: 'text.secondary',
            }}
          >
            Message*
          </Typography>
          <StyledTextArea
            fullWidth
            id="message"
            name="message"
            multiline
            rows={1}
            placeholder="type your message here"
            value={formData.message}
            onChange={handleChange('message')}
            required
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>

        {/* Submit Button */}
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 1,
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </StyledCard>
  );
}
