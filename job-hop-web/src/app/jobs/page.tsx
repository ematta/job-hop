'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, CardActions, Modal, TextField, Button, Grid, Tooltip, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import supabase from '../supabaseClient';

interface Job {
  id: string;
  company_name: string;
  title: string;
  description?: string;
  url?: string;
  resume_id?: string;
  cover_letter?: string;
  status: string
}

function getUserId() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('supabase.user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user?.id || user?.uuid || null;
  } catch {
    return null;
  }
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resumes, setResumes] = useState<{ id: string; name: string }[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ company_name: '', title: '', url: '', resume_id: '' });
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const userId = getUserId();

  useEffect(() => {
    if (!userId) return;
    setLoadingJobs(true);
    setLoadingResumes(true);
    setError('');
    // Fetch jobs
    supabase.from('job').select('*').eq('user_id', userId).then(({ data, error }) => {
      if (!error) setJobs(data || []);
      else setError('Failed to load jobs');
      setLoadingJobs(false);
    });
    // Fetch resumes (from storage)
    supabase.storage.from('resumes').list(`${userId}/`, { limit: 100 }).then(({ data, error }) => {
      if (!error) {
        setResumes((data || []).map(f => ({ id: f.name, name: f.name })));
      } else {
        setError('Failed to load resumes');
      }
      setLoadingResumes(false);
    });
  }, [userId, openModal]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setForm({ company_name: '', title: '', url: '', resume_id: '' });
    setOpenModal(true);
    setSelectedJob(null);
  };

  const handleOpenEdit = (job: Job) => {
    setModalMode('edit');
    setForm({
      company_name: job.company_name,
      title: job.title,
      url: job.url || '',
      resume_id: job.resume_id || '',
    });
    setOpenModal(true);
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedJob(null);
  };

  // Add or edit job
  const handleSubmit = async () => {
    if (!form.company_name || !form.title) {
      setError('Company name and job title are required');
      return;
    }
    setError('');
    setSuccess('');
    try {
      if (modalMode === 'add') {
        const { error } = await supabase.from('job').insert([
          {
            company_name: form.company_name,
            title: form.title,
            url: form.url,
            user_id: userId,
          },
        ]);
        if (error) throw error;
        setSuccess('Job added');
        handleCloseModal();
      } else if (modalMode === 'edit' && selectedJob) {
        const { error } = await supabase.from('job').update({
          company_name: form.company_name,
          title: form.title,
          url: form.url,
          resume_id: form.resume_id || null,
        }).eq('id', selectedJob.id);
        if (error) throw error;
        setSuccess('Job updated');
        handleCloseModal();
      }
    } catch (e) {
      setError(`Failed to save job: ${(e as Error).message}`);
    }
  };

  // Delete job
  const handleDelete = async (jobId: string) => {
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.from('job').delete().eq('id', jobId);
      if (error) throw error;
      setJobs(jobs.filter(j => j.id !== jobId));
      setSuccess('Job deleted');
    } catch (e) {
      setError(`Failed to delete job: ${(e as Error).message}`);
    }
  };

  const handleDeleteClick = (job: Job): void => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (jobToDelete) {
      await handleDelete(jobToDelete.id);
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  // Attach resume to job
  const handleAttachResume = async (jobId: string, resumeId: string) => {
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.from('job').update({ resume_id: resumeId }).eq('id', jobId);
      if (error) throw error;
      setJobs(jobs.map(j => j.id === jobId ? { ...j, resume_id: resumeId } : j));
      setSuccess('Resume attached');
    } catch (e) {
      setError(`Failed to attach resume: ${(e as Error).message}`);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')}>
        <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>
      </Snackbar>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Jobs List</Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleOpenAdd}
        aria-label="Add Job"
      >
        Add Job
      </Button>
      {(loadingJobs || loadingResumes) ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid key={job.id}>
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
                            onClick={() => handleAttachResume(job.id, resume.id)}
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
                    <IconButton onClick={() => handleOpenEdit(job)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteClick(job)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>{modalMode === 'add' ? 'Add Job' : 'Edit Job'}</Typography>
          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            value={form.company_name}
            onChange={e => setForm({ ...form, company_name: e.target.value })}
          />
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="URL"
            fullWidth
            margin="normal"
            value={form.url}
            onChange={e => setForm({ ...form, url: e.target.value })}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {modalMode === 'add' ? 'Add' : 'Save'}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the job {jobToDelete?.title} at {jobToDelete?.company_name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobsPage;
