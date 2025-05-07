import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from './Footer';

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <main>
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
          <Paper elevation={3} sx={{ bgcolor: theme.palette.background.paper, p: 8, borderRadius: 2, width: '100%', maxWidth: 400, mx: 'auto', my: 6 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" color={theme.palette.text.primary} mb={2}>
              Welcome to Job-Hop.co
            </Typography>
            <Typography color={theme.palette.text.secondary} textAlign="center" mb={3}>
              Your job search starts here!
            </Typography>
            <img src="/job_hop_logo.png" alt="Job Hop Logo" width={150} height={150} style={{ display: 'block', margin: '0 auto' }} />
          </Paper>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Home;
