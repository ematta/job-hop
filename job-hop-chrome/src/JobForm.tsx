import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthProvider';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

interface JobFormProps {
  prefillUrl?: string;
}

interface JobFormState {
  company_name: string;
  title: string;
  url: string;
  status: string;
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

  useEffect(() => {
    if (prefillUrl) setForm(f => ({ ...f, url: prefillUrl }));
  }, [prefillUrl]);

  console.log('JobForm component rendered');
  console.log('prefillUrl:', prefillUrl);

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
      <Typography variant="h6" mb={1} color="#f3f4f6">Submit Job</Typography>
      <TextField
        label="Company Name"
        value={form.company_name}
        onChange={e => handleChange('company_name', e.target.value)}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#18181b' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
        }}
      />
      <TextField
        label="Job Title"
        value={form.title}
        onChange={e => handleChange('title', e.target.value)}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#18181b' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
        }}
      />
      <TextField
        label="Job URL"
        value={form.url}
        onChange={e => handleChange('url', e.target.value)}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
        sx={{
          '& .MuiOutlinedInput-root': { bgcolor: '#18181b' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
        }}
      />
      <TextField
        label="Status"
        value={form.status}
        onChange={e => handleChange('status', e.target.value)}
        required
        fullWidth
        margin="normal"
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
        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Submit'}
      </Button>
      {msg && (
        <Alert severity={msgColor === 'red' ? 'error' : 'success'} sx={{ mt: 2 }}>
          {msg}
        </Alert>
      )}
      <Button
        type="button"
        onClick={handleLogout}
        color="error"
        variant="outlined"
        sx={{ mt: 2, fontWeight: 'bold' }}
        disabled={loading}
      >
        Logout
      </Button>
    </Box>
  );
};

export default JobForm;
