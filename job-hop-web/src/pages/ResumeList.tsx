import React from 'react';
import { List, ListItem, ListItemText, CircularProgress, Button, Box, Paper } from '@mui/material';

interface ResumeListProps {
  resumes: string[];
  userId: string;
  loading: boolean;
  getFileFromStorage: (filePath: string) => Promise<HTMLAnchorElement>;
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes, userId, loading, getFileFromStorage }) => {
  const handleDownload = async (fileName: string) => {
    const filePath = `${userId}/${fileName}`;
    try {
      const link = await getFileFromStorage(filePath);
      link.click();
    } catch {
      alert('Failed to download file.');
    }
  };

  if (loading) return <CircularProgress />;

  if (!resumes.length) return <div>No resumes found.</div>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, minWidth: 400, maxWidth: 440, borderRadius: 3 }}>
        <List>
          {resumes.map((resume) => (
            <ListItem key={resume} secondaryAction={
              <Button variant="outlined" sx={{ fontWeight: 700 }} onClick={() => handleDownload(resume)}>
                Download
              </Button>
            }>
              <ListItemText primary={resume} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ResumeList;
