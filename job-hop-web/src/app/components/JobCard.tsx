import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import type { Job } from './types';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onAttachResume: (jobId: string, resumeId: string) => Promise<void>;
  resumes: { id: string; name: string }[];
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit }) => (
  <Card
    sx={{
      borderRadius: 3,
      minWidth: 180,
      maxWidth: 240,
      p: 1,
      cursor: 'pointer',
      transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
      boxShadow: 1,
      bgcolor: '#1f2937',
      color: '#f3f4f6',
      '&:hover': {
        transform: 'scale(1.07)',
        boxShadow: 6,
        '& .jobcard-company': {
          fontSize: 14,
        },
        '& .jobcard-title': {
          fontSize: 12,
        },
      },
    }}
    onClick={onEdit ? () => onEdit(job) : undefined}
  >
    <CardContent sx={{ p: 1 }}>
      <Typography
        className="jobcard-company"
        variant="body2"
        sx={{ fontSize: 10, fontWeight: 600, mb: 0.5, transition: 'font-size 0.2s', color: '#f3f4f6' }}
      >
        {job.company_name}
      </Typography>
      <Typography
        className="jobcard-title"
        variant="body2"
        sx={{ fontSize: 8, color: '#d1d5db', transition: 'font-size 0.2s' }}
      >
        {job.title}
      </Typography>
    </CardContent>
  </Card>
);

export default JobCard;
