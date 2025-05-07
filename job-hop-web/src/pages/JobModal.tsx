import React from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface ResumeOption {
  id: string;
  name: string;
}

interface JobModalProps {
  open: boolean;
  mode: 'add' | 'edit';
  form: { companyName: string; title: string; url: string; resumeId: string };
  onChange: (field: string, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  resumes: ResumeOption[];
}

const JobModal: React.FC<JobModalProps> = ({ open, mode, form, onChange, onClose, onSubmit, resumes }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
      <Typography variant="h6" mb={2} color="text.primary">{mode === 'add' ? 'Add Job' : 'Edit Job'}</Typography>
      <TextField
        label="Company Name"
        fullWidth
        margin="normal"
        value={form.companyName}
        onChange={e => onChange('companyName', e.target.value)}
        InputLabelProps={{ color: 'secondary' }}
        InputProps={{}}
      />
      <TextField
        label="Job Title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={e => onChange('title', e.target.value)}
        InputLabelProps={{ color: 'secondary' }}
        InputProps={{}}
      />
      <TextField
        label="URL"
        fullWidth
        margin="normal"
        value={form.url}
        onChange={e => onChange('url', e.target.value)}
        InputLabelProps={{ color: 'secondary' }}
        InputProps={{}}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="resume-select-label" color="secondary">Resume</InputLabel>
        <Select
          labelId="resume-select-label"
          value={form.resumeId}
          label="Resume"
          onChange={e => onChange('resumeId', e.target.value)}
          color="secondary"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {resumes.map(resume => (
            <MenuItem key={resume.id} value={resume.id}>{resume.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {mode === 'add' ? 'Add' : 'Save'}
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default JobModal;
