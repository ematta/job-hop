'use client';
import { useEffect, useState, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Box, Button, Typography, Paper, Alert, CircularProgress, List, ListItem, ListItemText, Link } from '@mui/material';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getUserId() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('supabase.user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user?.id || user?.uuid || null;
  } catch {
    return null;
  }
}

export default function ResumesPage() {
  const [resumes, setResumes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = getUserId();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    supabase.storage.from('resumes').list(`${userId}/`, { limit: 100 })
      .then(({ data, error }) => {
        if (error) {
          setError('Failed to load resumes.');
          setResumes([]);
        } else {
          setResumes(data?.map(f => f.name) || []);
        }
        setLoading(false);
      });
  }, [userId, success]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setUploading(false);
      return;
    }
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      setUploading(false);
      return;
    }
    const filePath = `${userId}/${file.name}`;
    const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file, { upsert: true, contentType: 'application/pdf' });
    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
    } else {
      setSuccess('Resume uploaded successfully!');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    setUploading(false);
  };

  if (!userId) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f9fafb">
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>Resumes</Typography>
          <Typography color="text.secondary">You must be logged in to view your resumes.</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f9fafb">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">Your Resumes</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box mb={4} display="flex" flexDirection="column" alignItems="center">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            sx={{ mb: 1 }}
          >
            {uploading ? 'Uploading...' : 'Upload PDF Resume'}
          </Button>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={60}>
            <CircularProgress size={28} />
          </Box>
        ) : resumes.length === 0 ? (
          <Typography color="text.secondary" align="center">You haven&apos;t uploaded any resumes yet.</Typography>
        ) : (
          <List>
            {resumes.map((name) => (
              <ListItem key={name} secondaryAction={
                <Link
                  href={supabase.storage.from('resumes').getPublicUrl(`${userId}/${name}`).data.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                  variant="body2"
                >
                  View
                </Link>
              }>
                <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
