import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Close';
import { supabase } from '../supabaseClient';

interface ResumeListProps {
  userId: string | null;
}

const ResumeList: React.FC<ResumeListProps> = ({ userId }) => {
  const [resumes, setResumes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
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
  }, [userId]);

  const handleDelete = async (name: string) => {
    if (!userId) return;
    setLoading(true);
    await supabase.storage.from('resumes').remove([`${userId}/${name}`]);
    setResumes(resumes => resumes.filter(n => n !== name));
    setLoading(false);
  };

  if (!userId) return null;
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (resumes.length === 0) return <Typography>No resumes found.</Typography>;

  return (
    <List>
      {resumes.map(name => (
        <ListItem key={name} secondaryAction={
          <>
            <a href={`https://your-supabase-url/storage/v1/object/public/resumes/${userId}/${name}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
              Download
            </a>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(name)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        }>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ResumeList;
