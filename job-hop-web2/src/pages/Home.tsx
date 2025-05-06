import React from 'react';
import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <main>
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
          <Paper elevation={3} sx={{ bgcolor: theme.palette.background.paper, p: 8, borderRadius: 2, width: '100%', maxWidth: 400, mx: 'auto', my: 6 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" color={theme.palette.text.primary} mb={2}>
              Welcome to Job Hop
            </Typography>
            <Typography color={theme.palette.text.secondary} textAlign="center" mb={3}>
              Your job search starts here!
            </Typography>
            <img src="/job_hop_logo.png" alt="Job Hop Logo" width={150} height={150} style={{ display: 'block', margin: '0 auto' }} />
          </Paper>
        </Box>
      </main>
      <footer>
        <Box bgcolor="#09090b" color="#d1d5db" py={2} textAlign="center" borderTop={1} borderColor="#27272a">
          <Typography variant="body2">&copy; {new Date().getFullYear()} Job Hop. All rights reserved.</Typography>
          <Typography variant="body2">
            <MuiLink component={Link} to="/privacy-policy" color="primary" underline="hover">Privacy Policy</MuiLink> |{' '}
            <MuiLink component={Link} to="/terms-of-service" color="primary" underline="hover">Terms of Service</MuiLink>
          </Typography>
          <Typography variant="body2">
            <MuiLink component={Link} to="/contact" color="primary" underline="hover">Contact Us</MuiLink>
          </Typography>
          <Typography variant="body2">
            <MuiLink component={Link} to="/about" color="primary" underline="hover">About Us</MuiLink>
          </Typography>
          <Typography variant="body2">
            <MuiLink component={Link} to="/help" color="primary" underline="hover">Help Center</MuiLink>
          </Typography>
          <Typography variant="body2">
            <MuiLink component={Link} to="/feedback" color="primary" underline="hover">Feedback</MuiLink>
          </Typography>
        </Box>
      </footer>
    </>
  );
};

export default Home;
