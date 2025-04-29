import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface JobModalProps {
  open: boolean;
  mode: 'add' | 'edit';
  form: { company_name: string; title: string; url: string; resume_id: string };
  onChange: (field: string, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ open, mode, form, onChange, onClose, onSubmit }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: '#1f2937', boxShadow: 24, p: 4, borderRadius: 2 }}>
      <Typography variant="h6" mb={2} color="#f3f4f6">{mode === 'add' ? 'Add Job' : 'Edit Job'}</Typography>
      <TextField
        label="Company Name"
        fullWidth
        margin="normal"
        value={form.company_name}
        onChange={e => onChange('company_name', e.target.value)}
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
      />
      <TextField
        label="Job Title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={e => onChange('title', e.target.value)}
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
      />
      <TextField
        label="URL"
        fullWidth
        margin="normal"
        value={form.url}
        onChange={e => onChange('url', e.target.value)}
        InputLabelProps={{ style: { color: '#d1d5db' } }}
        InputProps={{ style: { color: '#f3f4f6' } }}
      />
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
