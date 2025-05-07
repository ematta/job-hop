import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';

const Feedback: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !message) {
      setError('Please provide both your email and feedback message.');
      return;
    }
    // This will be posted to the backend later
    setSubmitted(true);
  };

  return (
    <>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
        <Paper elevation={3} sx={{ bgcolor: theme.palette.background.paper, p: 6, borderRadius: 2, width: '100%', maxWidth: 500, mx: 'auto', my: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center" color={theme.palette.text.primary}>
            Feedback
          </Typography>
          <Typography color={theme.palette.text.secondary} mb={3} textAlign="center">
            We value your feedback! Please let us know your thoughts or report any issues below.
          </Typography>
          {submitted ? (
            <Alert severity="success">Thank you for your feedback!</Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                fullWidth
                margin="normal"
                required
                multiline
                minRows={4}
              />
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Submit Feedback
              </Button>
            </form>
          )}
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Feedback;
