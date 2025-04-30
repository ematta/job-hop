import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthProvider';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

const LoginForm: React.FC = () => {
  const { refreshSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else refreshSession();
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 360,
        bgcolor: '#1f2937',
        color: '#f3f4f6',
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        mx: 'auto',
        mt: 6,
      }}
    >
      <Typography variant="h6" mb={1} color="#f3f4f6">Login</Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="email"
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#18181b' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="current-password"
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#18181b' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2, fontWeight: 'bold' }}
      >
        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
