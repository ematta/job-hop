'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Store tokens and user info in localStorage
    if (data.session) {
      localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
      localStorage.setItem('supabase.user', JSON.stringify(data.user));
    }
    router.push('/');
  };

  // Stubs for Google and Apple OAuth
  const handleOAuth = (provider: 'google' | 'apple') => {
    alert(`${provider} login is not implemented yet.`);
  };

  return (
    <Box display="flex" minHeight="100vh" alignItems="center" justifyContent="center" bgcolor="#f9fafb">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center">
          Sign in to Job Hop
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleOAuth('google')}
            startIcon={null}
          >
            Continue with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleOAuth('apple')}
            startIcon={null}
          >
            Continue with Apple
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
