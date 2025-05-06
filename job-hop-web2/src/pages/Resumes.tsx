import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { supabase } from '../supabaseClient';
import ResumeUpload from './ResumeUpload';
import ResumeList from './ResumeList';

function getUserId() {
  const userStr = localStorage.getItem('supabase.user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user?.id || user?.uuid || null;
  } catch {
    return null;
  }
}

function getFileFromStorage(filePath: string) {
  return supabase.storage.from('resumes').download(filePath)
    .then(({ data, error }) => {
      if (error) {
        throw new Error('Failed to download file: ' + error.message);
      }
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filePath.split('/').pop() || 'resume.pdf';
      return link;
    });
}

const Resumes: React.FC = () => {
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
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>Resumes</Typography>
          <Typography>You must be logged in to view your resumes.</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">Your Resumes</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <ResumeUpload uploading={uploading} onUpload={handleUpload} fileInputRef={fileInputRef} />
        <ResumeList resumes={resumes} userId={userId} loading={loading} getFileFromStorage={getFileFromStorage} />
      </Paper>
    </Box>
  );
};

export default Resumes;
