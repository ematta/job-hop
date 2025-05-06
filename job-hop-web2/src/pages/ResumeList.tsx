import { List, ListItem, ListItemText, Link, Box, CircularProgress, Typography } from '@mui/material';

interface ResumeListProps {
  resumes: string[];
  userId: string;
  loading: boolean;
  getFileFromStorage: (filePath: string) => Promise<HTMLAnchorElement>;
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes, userId, loading, getFileFromStorage }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={60}>
        <CircularProgress size={28} />
      </Box>
    );
  }
  if (resumes.length === 0) {
    return <Typography color="text.secondary" align="center">You haven&apos;t uploaded any resumes yet.</Typography>;
  }
  return (
    <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
      {resumes.map((name) => (
        <ListItem key={name} secondaryAction={
          <Link
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="primary"
            variant="body2"
            onClick={async (e) => {
              e.preventDefault();
              const link = await getFileFromStorage(`${userId}/${name}`);
              link.click();
              URL.revokeObjectURL(link.href);
            }}
          >
            Download
          </Link>
        }>
          <ListItemText primary={name} primaryTypographyProps={{ noWrap: true, color: 'text.primary' }} />
        </ListItem>
      ))}
    </List>
  );
};

export default ResumeList;
