import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const contactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 40 }} />,
    title: 'Email',
    content: 'info@aitasol.com',
    secondary: 'support@aitasol.com',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40 }} />,
    title: 'Phone',
    content: '+1 (555) 123-4567',
    secondary: '+1 (555) 123-4568',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
    title: 'Address',
    content: '123 Education Street',
    secondary: 'Toronto, ON M5H 2N2, Canada',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
    title: 'Office Hours',
    content: 'Monday - Friday: 9:00 AM - 6:00 PM',
    secondary: 'Saturday: 10:00 AM - 4:00 PM',
  },
];

export default function ContactInfo() {
  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={4}>
        {contactInfo.map((info, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {info.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {info.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {info.content}
                </Typography>
                {info.secondary && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {info.secondary}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

