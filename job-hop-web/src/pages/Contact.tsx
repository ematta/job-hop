import React from 'react';
import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
        <Paper elevation={3} sx={{ bgcolor: theme.palette.background.paper, p: 6, borderRadius: 2, width: '100%', maxWidth: 500, mx: 'auto', my: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center" color={theme.palette.text.primary}>
            Contact Us
          </Typography>
          <Typography color={theme.palette.text.secondary} mb={2}>
            We'd love to hear from you! For any questions, feedback, or support, please email us at:
          </Typography>
          <Typography variant="h6" fontWeight="bold" mb={1} textAlign="center">
            <MuiLink href="mailto:help@job-hop.co" color="primary" underline="hover">
              help@job-hop.co
            </MuiLink>
          </Typography>
          <Typography color={theme.palette.text.secondary} mt={3} textAlign="center">
            We aim to respond to all inquiries within 1-2 business days.
          </Typography>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Contact;
