import React, { useEffect, useRef, useState } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ResumeUpload from './ResumeUpload';
import ResumeList from './ResumeList';
import { supabase } from '../supabaseClient';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    if (open) fetchUser();
  }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file || !userId) {
      setUploading(false);
      return;
    }
    const filePath = `${userId}/${file.name}`;
    await supabase.storage.from('resumes').upload(filePath, file, { upsert: true, contentType: 'application/pdf' });
    setUploading(false);
  };

  if (!userId) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="resume-modal">
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 6, p: 3, minWidth: 340, maxWidth: 400, mx: 'auto', my: 8, outline: 'none', position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}><CloseIcon /></IconButton>
        <Typography variant="h6" mb={2}>Your Resumes</Typography>
        <ResumeUpload uploading={uploading} onUpload={handleUpload} fileInputRef={fileInputRef} />
        <ResumeList userId={userId} />
      </Box>
    </Modal>
  );
};

export default ResumeModal;
