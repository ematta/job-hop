import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

interface ResumeUploadProps {
  uploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ uploading, onUpload, fileInputRef }) => {
  return (
    <Box mb={3}>
      <input
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onUpload}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => fileInputRef?.current?.click()}
        disabled={uploading}
        fullWidth
      >
        {uploading ? <CircularProgress size={24} /> : 'Upload Resume'}
      </Button>
    </Box>
  );
};

export default ResumeUpload;
