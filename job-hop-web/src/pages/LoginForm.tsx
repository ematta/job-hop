import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { supabase } from '../supabaseClient';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            onClick={() => navigate('/register')}
            disabled={loading}
            sx={{ fontWeight: 'bold', py: 1.5, borderRadius: 2 }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginForm;
