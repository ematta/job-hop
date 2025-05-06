import React from 'react';
import { List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';

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
    <List>
      {resumes.map((resume) => (
        <ListItem key={resume} secondaryAction={
          <Button variant="outlined" onClick={() => handleDownload(resume)}>
            Download
          </Button>
        }>
          <ListItemText primary={resume} />
        </ListItem>
      ))}
    </List>
  );
};

export default ResumeList;
