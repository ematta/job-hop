import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

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

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onAttachResume?: (jobId: string, resumeId: string) => Promise<void>;
  resumes?: { id: string; name: string }[];
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit }) => (
  <Card
    sx={{
      borderRadius: 3,
      minWidth: 150,
      maxWidth: 150,
      minHeight: 50,
      maxHeight: 50,
      p: 1,
      mb: 0.5,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
      boxShadow: 1,
      bgcolor: 'background.paper',
      color: 'text.primary',
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
    <span style={{ cursor: 'grab', marginRight: 8, display: 'flex', alignItems: 'center' }} className="drag-handle">
      <DragIndicatorIcon fontSize="small" />
    </span>
    <CardContent sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
      <Typography
        className="jobcard-company"
        variant="body2"
        sx={{ fontSize: 10, fontWeight: 'bold', mb: -1, transition: 'font-size 0.2s', color: 'text.primary' }}
      >
        {job.company_name}
      </Typography>
    </CardContent>
  </Card>
);

export default JobCard;
