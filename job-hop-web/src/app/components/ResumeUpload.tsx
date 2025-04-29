import { Box, Button } from '@mui/material';

interface ResumeUploadProps {
  uploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function ResumeUpload({ uploading, onUpload, fileInputRef }: ResumeUploadProps) {
  return (
    <Box mb={4} display="flex" flexDirection="column" alignItems="center">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={onUpload}
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
  );
}
