'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Snackbar } from '@mui/material';
import supabase from '../supabaseClient';
import JobModal from '../components/JobModal';
import DeleteJobDialog from '../components/DeleteJobDialog';
import JobCard from '../components/JobCard';
import FloatingAddButton from '../components/FloatingAddButton';

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

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
      {(loadingJobs || loadingResumes) ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid key={job.id}>
              <JobCard
                job={job}
                onEdit={handleOpenEdit}
                resumes={resumes}
                onDelete={handleDeleteClick}
                onAttachResume={handleAttachResume}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <JobModal
        open={openModal}
        mode={modalMode}
        form={form}
        onChange={handleFormChange}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      <DeleteJobDialog
        open={deleteDialogOpen}
        jobTitle={jobToDelete?.title}
        companyName={jobToDelete?.company_name}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      {/* Floating Add Button */}
      <FloatingAddButton onClick={handleOpenAdd} aria-label="Add Job" />
    </Box>
  );
};

export default JobsPage;
