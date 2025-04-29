"use client";
import Image from "next/image";
import { Box, Typography, Paper, Link } from '@mui/material';

export default function Home() {
  // Placeholder for authentication state
  const isLoggedIn = false; // Change to true to simulate logged-in state

  return (
    <>
      {/* Fixed, always-visible top-right circle button */}
      <Link
        href={isLoggedIn ? "/profile" : "/login"}
        aria-label={isLoggedIn ? "Profile" : "Login"}
        underline="none"
        sx={{ position: 'fixed', top: 24, right: 24, zIndex: 50, WebkitTapHighlightColor: 'transparent' }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3,
            bgcolor: isLoggedIn ? 'purple.500' : 'grey.300',
            '&:hover': { bgcolor: isLoggedIn ? 'purple.700' : 'grey.400' },
            minWidth: 32,
            minHeight: 32,
            transition: 'background-color 0.2s',
          }}
        >
          {isLoggedIn ? (
            <Typography color="white" fontWeight="bold" fontSize={16}>P</Typography>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 20, height: 20, color: '#555', display: 'block' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
              />
            </svg>
          )}
        </Box>
      </Link>
      <main>
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#111827">
          <Paper elevation={3} sx={{ bgcolor: '#1f2937', p: 8, borderRadius: 2, width: '100%', maxWidth: 400, mx: 'auto', my: 6 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" color="#f3f4f6" mb={2}>
              Welcome to Job Hop
            </Typography>
            <Typography color="#d1d5db" textAlign="center" mb={3}>
              Your job search starts here!
            </Typography>
            <Box display="flex" justifyContent="center" mb={3}>
              <img src="/job_hop_logo.png" alt="Job Hop Logo" width={150} height={150} style={{ display: 'block', margin: '0 auto' }} />
            </Box>
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
