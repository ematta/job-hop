"use client";
import { Box, Typography, Paper, Link } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function Home() {
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
            <Image src="/job_hop_logo.png" alt="Job Hop Logo" width={150} height={150} style={{ display: 'block', margin: '0 auto' }} />
          </Paper>
        </Box>
      </main>
      <footer>
        <Box bgcolor="#09090b" color="#d1d5db" py={2} textAlign="center" borderTop={1} borderColor="#27272a">
          <Typography variant="body2">&copy; {new Date().getFullYear()} Job Hop. All rights reserved.</Typography>
          <Typography variant="body2">
            <Link href="/privacy-policy" color="primary" underline="hover">Privacy Policy</Link> |{' '}
            <Link href="/terms-of-service" color="primary" underline="hover">Terms of Service</Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/contact" color="primary" underline="hover">Contact Us</Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/about" color="primary" underline="hover">About Us</Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/help" color="primary" underline="hover">Help Center</Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/feedback" color="primary" underline="hover">Feedback</Link>
          </Typography>
        </Box>
      </footer>
    </>
  );
}
