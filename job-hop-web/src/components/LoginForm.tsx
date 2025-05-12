import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { supabase } from '../supabaseClient';
import RegisterModal from './RegisterModal'; // Import RegisterModal

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false); // State for RegisterModal

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        // Save user to cookie for session persistence
        document.cookie = `supabase_user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=604800; samesite=strict`;
        if (onLoginSuccess) { // Call onLoginSuccess if it exists
          onLoginSuccess();
        }
        navigate('/');
      } else {
        setError('Login failed.');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, bgcolor: 'background.paper', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center" color="text.primary">Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            autoComplete="current-password"
          />
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{ fontWeight: 'bold', py: 1.5, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleOpenRegisterModal} // Open RegisterModal
              disabled={loading}
              sx={{ fontWeight: 'bold', py: 1.5, borderRadius: 2 }}
            >
              Register
            </Button>
          </Box>
        </form>
      </Paper>
      <RegisterModal open={registerModalOpen} onClose={handleCloseRegisterModal} /> {/* Add RegisterModal */}
    </>
  );
};

export default LoginForm;
