import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import supabase from '../supabaseClient';


export default function LoginForm() {
  const router = useRouter();
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
      if (data.session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
        localStorage.setItem('supabase.user', JSON.stringify(data.user));
        router.replace('/');
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
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">Login</Typography>
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
            sx={{ fontWeight: 'bold', py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => router.push('/register')}
            disabled={loading}
            sx={{ fontWeight: 'bold', py: 1.5 }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
