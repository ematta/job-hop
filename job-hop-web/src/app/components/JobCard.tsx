import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onAttachResume: (jobId: string, resumeId: string) => Promise<void>;
  resumes: { id: string; name: string }[];
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit }) => (
  <Card
    sx={{ borderRadius: 3, minWidth: 180, maxWidth: 240, p: 1, cursor: onEdit ? 'pointer' : 'default' }}
    onClick={onEdit ? () => onEdit(job) : undefined}
  >
    <CardContent sx={{ p: 1 }}>
      <Typography variant="body2" sx={{ fontSize: 10, fontWeight: 600, mb: 0.5 }}>
        {job.company_name}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 8, color: 'text.secondary' }}>
        {job.title}
      </Typography>
    </CardContent>
  </Card>
);

export default JobCard;
