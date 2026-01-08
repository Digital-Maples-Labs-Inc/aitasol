import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function TermsContent() {
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
                Terms of Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1" paragraph>
                Welcome to AitaSol Educational Consultancy. These Terms of Service ("Terms") govern your access to and use of our website, services, and educational consultancy offerings. By accessing or using our services, you agree to be bound by these Terms.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                By accessing or using AitaSol's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not use our services.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                2. Services Description
              </Typography>
              <Typography variant="body1" paragraph>
                AitaSol Educational Consultancy provides the following services:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Educational counseling and guidance for studying in Canada
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Assistance with university and college applications
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Study permit and immigration application support
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Career counseling and professional development guidance
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Document preparation and review services
                  </Typography>
                </li>
              </Box>
              <Typography variant="body1" paragraph>
                We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                3. Eligibility
              </Typography>
              <Typography variant="body1" paragraph>
                You must be at least 18 years old or have parental or guardian consent to use our services. By using our services, you represent and warrant that:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    You are of legal age to form a binding contract
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    You have the authority to enter into these Terms
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    All information you provide is accurate, current, and complete
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    You will maintain the accuracy of such information
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                4. User Responsibilities
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Provide accurate, truthful, and complete information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Maintain the confidentiality of any account credentials
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Use our services only for lawful purposes
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Not engage in any fraudulent, deceptive, or harmful activities
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Comply with all applicable laws and regulations
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Not interfere with or disrupt our services or servers
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                5. Fees and Payment
              </Typography>
              <Typography variant="body1" paragraph>
                Some of our services may require payment of fees. You agree to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Pay all fees as specified in your service agreement
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Provide accurate payment information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Authorize us to charge your payment method for applicable fees
                  </Typography>
                </li>
              </Box>
              <Typography variant="body1" paragraph>
                All fees are non-refundable unless otherwise stated in writing or required by law. We reserve the right to change our fees at any time, but will provide notice of such changes.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                6. No Guarantee of Results
              </Typography>
              <Typography variant="body1" paragraph>
                While we strive to provide high-quality services and guidance, we cannot guarantee:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Admission to any specific educational institution
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Approval of visa or study permit applications
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Specific outcomes or results from our services
                  </Typography>
                </li>
              </Box>
              <Typography variant="body1" paragraph>
                Educational institutions and immigration authorities make independent decisions. We provide guidance and support, but final decisions rest with these authorities.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                7. Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                All content on our website, including text, graphics, logos, images, and software, is the property of AitaSol or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our written permission.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                8. Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                To the maximum extent permitted by law, AitaSol shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or opportunities, arising from your use of our services.
              </Typography>
              <Typography variant="body1" paragraph>
                Our total liability for any claims arising from these Terms or our services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                9. Indemnification
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to indemnify, defend, and hold harmless AitaSol, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" component="span">
                    Your use of our services
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Your violation of these Terms
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Your violation of any rights of another party
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" component="span">
                    Any inaccurate or false information you provide
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                10. Termination
              </Typography>
              <Typography variant="body1" paragraph>
                We may terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms or for any other reason we deem necessary. Upon termination, your right to use our services will cease immediately.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                11. Governing Law and Dispute Resolution
              </Typography>
              <Typography variant="body1" paragraph>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be resolved through good faith negotiation, and if necessary, through binding arbitration or in the courts of [Your Jurisdiction].
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                12. Changes to Terms
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the modified Terms.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                13. Severability
              </Typography>
              <Typography variant="body1" paragraph>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2 }}>
                14. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms of Service, please contact us:
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>AitaSol Educational Consultancy</strong>
                </Typography>
                <Typography variant="body1" paragraph>
                  Email: legal@aitasol.com
                </Typography>
                <Typography variant="body1" paragraph>
                  Phone: [Your Phone Number]
                </Typography>
                <Typography variant="body1" paragraph>
                  Address: [Your Business Address]
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 4 }}>
                By using AitaSol's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

