import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
        <Paper elevation={3} sx={{ bgcolor: theme.palette.background.paper, p: 6, borderRadius: 2, width: '100%', maxWidth: 500, mx: 'auto', my: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center" color={theme.palette.text.primary}>
            About Us
          </Typography>
          <Typography color={theme.palette.text.secondary} textAlign="center">
            This About Us page is coming soon.
          </Typography>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default About;
