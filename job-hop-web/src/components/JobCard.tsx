import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export interface Job {
  id: string;
  companyName: string;
  title: string;
  description?: string;
  url?: string;
  resumeId?: string;
  cover_letter?: string;
  status: string;
}

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onAttachResume?: (jobId: string, resumeId: string) => Promise<void>;
  resumes?: { id: string; name: string }[];
  dragHandleProps?: React.HTMLAttributes<HTMLSpanElement>;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, dragHandleProps }) => (
  <Card
    sx={{
      borderRadius: 99,
      minWidth: 0,
      width: '100%',
      maxWidth: 220,
      height: 40,
      p: 0,
      mb: 1.2,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      boxShadow: 1,
      backgroundColor: "#334155",
      color: 'white',
      overflow: 'hidden',
      transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
      '&:hover': {
        transform: 'scale(1.04)',
        boxShadow: 6,
        '& .jobcard-company': {
          fontSize: 15,
        },
      },
    }}
    onClick={onEdit ? () => onEdit(job) : undefined}
  >
    <span
      style={{ cursor: 'grab', marginLeft: 12, marginRight: 10, display: 'flex', alignItems: 'center', flexShrink: 0 }}
      className="drag-handle"
      {...dragHandleProps}
      onClick={e => { e.stopPropagation(); }}
    >
      <DragIndicatorIcon fontSize="small" />
    </span>
    <CardContent
      sx={{
        p: 0,
        pr: 3,
        pl: 0,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      <Typography
        className="jobcard-company"
        variant="body2"
        sx={{
          fontSize: 13,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          minWidth: 0,
          textAlign: 'center',
        }}
        title={job.companyName}
      >
        {job.companyName}
      </Typography>
    </CardContent>
  </Card>
);

export default JobCard;
