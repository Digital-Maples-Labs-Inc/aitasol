import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function PrivacyContent() {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        backgroundColor: '#ffffff',
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
        ...theme.applyStyles('dark', {
          backgroundColor: '#09090b',
        }),
      })}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Stack spacing={4}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1" paragraph>
                At AitaSol Educational Consultancy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                1. Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                We collect information that you provide directly to us, including:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Personal identification information (name, email address, phone number, date of birth)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Educational background and academic records
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Immigration and visa-related documents
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Financial information for payment processing
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Communication preferences and correspondence
                  </Typography>
                </li>
              </Box>
              <Typography variant="body1" paragraph>
                We also automatically collect certain information when you visit our website, such as your IP address, browser type, device information, and usage patterns through cookies and similar tracking technologies.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                2. How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use the information we collect to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Provide, maintain, and improve our educational consultancy services
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Process applications for study programs, visas, and immigration services
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Communicate with you about your inquiries, applications, and our services
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Send you newsletters, updates, and promotional materials (with your consent)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Analyze website usage and improve user experience
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Comply with legal obligations and protect our rights
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                3. Information Sharing and Disclosure
              </Typography>
              <Typography variant="body1" paragraph>
                We do not sell your personal information. We may share your information only in the following circumstances:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    <strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our business, such as payment processors, email service providers, and cloud storage providers.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    <strong>Educational Institutions:</strong> With your explicit consent, we may share your information with educational institutions to facilitate your application process.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    <strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government regulation, or to protect our rights and the safety of our users.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                4. Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments.
              </Typography>
              <Typography variant="body1" paragraph>
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                5. Your Rights and Choices
              </Typography>
              <Typography variant="body1" paragraph>
                You have the right to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Access and receive a copy of your personal information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Request correction of inaccurate or incomplete information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Request deletion of your personal information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Object to or restrict the processing of your information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Withdraw consent at any time where processing is based on consent
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Opt-out of marketing communications
                  </Typography>
                </li>
              </Box>
              <Typography variant="body1" paragraph>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                6. Cookies and Tracking Technologies
              </Typography>
              <Typography variant="body1" paragraph>
                We use cookies and similar tracking technologies to collect and store information about your preferences and browsing behavior. You can control cookies through your browser settings, though disabling cookies may affect the functionality of our website.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                7. International Data Transfers
              </Typography>
              <Typography variant="body1" paragraph>
                As an educational consultancy facilitating international education, your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                8. Children's Privacy
              </Typography>
              <Typography variant="body1" paragraph>
                Our services are intended for individuals who are at least 18 years old or have parental consent. We do not knowingly collect personal information from children under 18 without parental consent. If we become aware that we have collected information from a child without consent, we will take steps to delete that information.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                9. Changes to This Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                10. Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>AitaSol Educational Consultancy</strong>
                </Typography>
                <Typography variant="body1" paragraph>
                  Email: privacy@aitasol.com
                </Typography>
                <Typography variant="body1" paragraph>
                  Phone: [Your Phone Number]
                </Typography>
                <Typography variant="body1" paragraph>
                  Address: [Your Business Address]
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

