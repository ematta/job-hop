import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';

export interface Job {
  id: string;
  company_name: string;
  title: string;
  description?: string;
  url?: string;
  resume_id?: string;
  cover_letter?: string;
  status: string;
}

export interface Resume {
  id: string;
  name: string;
}

interface JobCardProps {
  job: Job;
  resumes: Resume[];
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onAttachResume: (jobId: string, resumeId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, resumes, onEdit, onDelete, onAttachResume }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{job.company_name}</Typography>
      <Typography variant="subtitle1">{job.title}</Typography>
      {job.url && (
        <Typography variant="body2" color="text.secondary">
          <a href={job.url} target="_blank" rel="noopener noreferrer">{job.url}</a>
        </Typography>
      )}
      <Box mt={2}>
        <Typography variant="body2" gutterBottom>Attach Resume:</Typography>
        <Box display="flex" gap={1}>
          {resumes.map(resume => (
            <Tooltip key={resume.id} title={resume.name} placement="top">
              <IconButton
                color={job.resume_id === resume.id ? 'primary' : 'default'}
                onClick={() => onAttachResume(job.id, resume.id)}
                aria-label={`Select resume ${resume.name}`}
              >
                <DescriptionIcon color={job.resume_id === resume.id ? 'primary' : 'disabled'} />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </CardContent>
    <CardActions>
      <Tooltip title="Edit">
        <IconButton onClick={() => onEdit(job)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => onDelete(job)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>
);

export default JobCard;
