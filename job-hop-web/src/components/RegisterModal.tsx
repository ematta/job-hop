import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, Typography, CircularProgress, Snackbar, Alert, Paper } from '@mui/material';
import { supabase } from '../supabaseClient';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setSnackbarMessage('Please enter email and password.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;

      // Check if user is returned and if email confirmation is not required, or if user is already confirmed.
      // Supabase might automatically sign in the user or require email confirmation.
      // For this example, we assume successful signUp means we can redirect.
      // Adjust based on your Supabase project's email confirmation settings.
      if (data.user || data.session) {
        setSnackbarMessage('Registration successful! Redirecting...');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // Wait a bit for the user to see the success message before redirecting
        setTimeout(() => {
          onClose(); // Close the modal
          navigate('/');
        }, 2000);
      } else {
        // This case might occur if email confirmation is required and the user is not auto-signed-in.
        setSnackbarMessage('Registration successful! Please check your email to confirm your account.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (err: unknown) {
      const errorMessage = (err as Error).message || 'Registration failed.';
      setError(errorMessage); // For displaying error within the modal if needed
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleModalClose = () => {
    // Reset form state when modal is closed
    setEmail('');
    setPassword('');
    setError(null);
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="register-modal-title"
        aria-describedby="register-modal-description"
      >
        <Paper sx={style}>
          <Typography id="register-modal-title" variant="h5" component="h2" fontWeight="bold" mb={3} textAlign="center">
            Register
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="email"
              required
              aria-required="true"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              autoComplete="new-password"
              required
              aria-required="true"
              helperText="Password should be at least 6 characters."
            />
            <Box mt={3} display="flex" flexDirection="column" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                sx={{ fontWeight: 'bold', py: 1.5, borderRadius: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleModalClose}
                disabled={loading}
                sx={{ fontWeight: 'bold', py: 1.5, borderRadius: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterModal;
