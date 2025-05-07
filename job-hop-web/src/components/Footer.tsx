import React from 'react';
import { Paper, Box, Typography, Link as MuiLink, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <footer>
      <Paper elevation={3} square sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        borderTop: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius, // use theme borderRadius for rounded edges
        mt: 8,
        px: { xs: 2, sm: 4 },
        py: 3,
        textAlign: 'center',
        background: '#788BBA',
      }}>
        <Typography variant="body2" sx={{ mb: 0.5, borderRadius: theme.shape.borderRadius, color: theme.palette.text.primary }}>
          &copy; {new Date().getFullYear()} matta.dev All rights reserved.
        </Typography>
        <Box sx={{ color: "fff", display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 0.5, borderRadius: theme.shape.borderRadius }}>
          <MuiLink component={Link} to="/privacy-policy" color="primary" underline="hover">Privacy Policy</MuiLink>
          <span>|</span>
          <MuiLink component={Link} to="/terms-of-service" color="primary" underline="hover">Terms of Service</MuiLink>
          <span>|</span>
          <MuiLink component={Link} to="/contact" color="primary" underline="hover">Contact Us</MuiLink>
          <span>|</span>
          <MuiLink component={Link} to="/about" color="primary" underline="hover">About Us</MuiLink>
          <span>|</span>
          <MuiLink component={Link} to="/help" color="primary" underline="hover">Help Center</MuiLink>
          <span>|</span>
          <MuiLink component={Link} to="/feedback" color="primary" underline="hover">Feedback</MuiLink>
        </Box>
      </Paper>
    </footer>
  );
};

export default Footer;
