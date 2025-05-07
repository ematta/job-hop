import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 4 }}>
      <Toolbar sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/job_hop_logo.png"
            alt="Job Hop Logo"
            width={64}
            height={64}
            style={{ borderRadius: '50%', objectFit: 'cover', marginRight: 16, background: '#fff' }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold" textAlign="left" color={theme.palette.text.primary} mb={0.5}>
              Welcome to Job-Hop.co
            </Typography>
            <Typography color={theme.palette.text.secondary} textAlign="left">
              Your job search starts here!
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
