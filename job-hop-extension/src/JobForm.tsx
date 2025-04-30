import React, { useState, useEffect, use } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthProvider';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

interface JobFormProps {
  prefillUrl?: string;
  userId?: string;
}

interface JobFormState {
  company_name: string;
  title: string;
  url: string;
  status: string;
  userId?: string; // Added user_id as an optional field
}

const JobForm: React.FC<JobFormProps> = ({ prefillUrl }) => {
  const { refreshSession } = useAuth();
  const [form, setForm] = useState<JobFormState>({
    company_name: '',
    title: '',
    url: prefillUrl || '',
    status: 'Open', // default status
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [msgColor, setMsgColor] = useState<'red' | 'green'>('green');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Set userId from localStorage on mount
    const userStr = localStorage.getItem('supabase.user');
    let userId;
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        userId = user?.id || user?.uuid || null;
        setUserId(userId);
        setForm(f => ({ ...f, userId: user?.id || user?.uuid || '' }));
      } catch {
        console.error('Error parsing user data from localStorage:', userStr);
        setUserId(null);
      }
    }
    if (prefillUrl && userId) setForm(f => ({ ...f, url: prefillUrl }));
  }, [prefillUrl, userId]);


  const handleChange = (field: keyof JobFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.from('job').insert([{ ...form }]);
    setLoading(false);
    if (error) {
      setMsg('Error!');
      setMsgColor('red');
    } else {
      setMsg('Success!');
      setMsgColor('green');
      setForm({ company_name: '', title: '', url: '', status: 'Open' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    refreshSession();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.2, // reduced gap
        width: 340, // slightly narrower
        bgcolor: '#f8fafc',
        color: '#1e293b',
        p: 2, // reduced padding
        borderRadius: 3,
        boxShadow: 4,
        mx: 'auto',
        mt: 2, // reduced margin top
        minHeight: 340, // reduced min height
      }}
    >
      <Typography variant="h6" mb={0.5} color="#1e293b" fontWeight={700} letterSpacing={1} textAlign="center">
        Job-Hop
      </Typography>
      {/* User ID field is visually hidden but present in the DOM for form submission */}
      <TextField
        label="User ID"
        value={form.userId}
        required
        fullWidth
        margin="dense" // less margin
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
        sx={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        disabled
      />
      <TextField
        label="Company Name"
        value={form.company_name}
        onChange={e => handleChange('company_name', e.target.value)}
        required
        fullWidth
        margin="dense"
        InputLabelProps={{ style: { color: '#64748b' } }}
        InputProps={{ style: { color: '#1e293b', background: '#f1f5f9', borderRadius: 2 } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius: 2 },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
        }}
      />
      <TextField
        label="Job Title"
        value={form.title}
        onChange={e => handleChange('title', e.target.value)}
        required
        fullWidth
        margin="dense"
        InputLabelProps={{ style: { color: '#64748b' } }}
        InputProps={{ style: { color: '#1e293b', background: '#f1f5f9', borderRadius: 2 } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius: 2 },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
        }}
      />
      <TextField
        label="Job URL"
        value={form.url}
        onChange={e => handleChange('url', e.target.value)}
        required
        fullWidth
        margin="dense"
        InputLabelProps={{ style: { color: '#64748b' } }}
        InputProps={{ style: { color: '#1e293b', background: '#f1f5f9', borderRadius: 2 } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius: 2 },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
        }}
      />
      <TextField
        label="Status"
        value={form.status}
        onChange={e => handleChange('status', e.target.value)}
        required
        fullWidth
        margin="dense"
        InputLabelProps={{ style: { color: '#64748b' } }}
        InputProps={{ style: { color: '#1e293b', background: '#f1f5f9', borderRadius: 2 } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius: 2 },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{
          mt: 1.2, // less margin top
          fontWeight: 'bold',
          borderRadius: 2,
          boxShadow: 2,
          textTransform: 'none',
          fontSize: 16,
          py: 0.8, // less vertical padding
        }}
      >
        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Submit'}
      </Button>
      {msg && (
        <Alert severity={msgColor === 'red' ? 'error' : 'success'} sx={{ mt: 1.2, borderRadius: 2 }}>
          {msg}
        </Alert>
      )}
      <Button
        type="button"
        onClick={handleLogout}
        color="error"
        variant="outlined"
        sx={{
          mt: 1.2,
          fontWeight: 'bold',
          borderRadius: 2,
          textTransform: 'none',
          fontSize: 15,
          py: 0.7, // less vertical padding
          borderColor: '#ef4444',
          color: '#ef4444',
          '&:hover': { borderColor: '#b91c1c', color: '#b91c1c' },
        }}
        disabled={loading}
      >
        Logout
      </Button>
    </Box>
  );
};

export default JobForm;
