import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from './Footer';

const TermsOfService: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
        <Paper elevation={3} sx={{ bgcolor: theme.palette.background.paper, p: 6, borderRadius: 2, width: '100%', maxWidth: 600, mx: 'auto', my: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center" color={theme.palette.text.primary}>
            Terms of Service
          </Typography>
          <Typography color={theme.palette.text.secondary} mb={2}>
            Last updated: May 7, 2025
          </Typography>
          <Typography color={theme.palette.text.secondary} mb={3}>
            These Terms of Service ("Terms") govern your use of the Job Hop website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1}>1. Use of Service</Typography>
          <Typography mb={2} color={theme.palette.text.secondary}>
            You agree to use Job Hop only for lawful purposes and in accordance with these Terms. You are responsible for your use of the service and for any content you provide.
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1}>2. Account Registration</Typography>
          <Typography mb={2} color={theme.palette.text.secondary}>
            You may be required to register for an account to access certain features. You are responsible for maintaining the confidentiality of your account information.
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1}>3. Intellectual Property</Typography>
          <Typography mb={2} color={theme.palette.text.secondary}>
            All content and materials on Job Hop are the property of their respective owners. You may not use, copy, or distribute any content without permission.
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1}>4. Disclaimer</Typography>
          <Typography mb={2} color={theme.palette.text.secondary}>
            Job Hop is provided on an "as is" and "as available" basis. We make no warranties regarding the accuracy or reliability of the service.
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1}>5. Changes to Terms</Typography>
          <Typography mb={2} color={theme.palette.text.secondary}>
            We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the new Terms.
          </Typography>
          <Typography color={theme.palette.text.secondary}>
            For questions, please contact us at support@job-hop.co.
          </Typography>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default TermsOfService;
