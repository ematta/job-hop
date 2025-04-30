'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
  status: string;
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

const KANBAN_COLUMNS = [
  { key: 'Open', label: 'Open' },
  { key: 'Applied', label: 'Applied' },
  { key: 'Interviewing', label: 'Interviewing' },
  { key: 'Closed', label: 'Closed' },
];

// Draggable wrapper for JobCard
function DraggableJobCard({ job, children }: { job: Job; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: job.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        marginBottom: 12,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

// Droppable Kanban column
function DroppableColumn({ id, children, isEmpty }: { id: string; children: React.ReactNode; isEmpty: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        minWidth: 220,
        bgcolor: isOver ? '#334155' : '#18181b', // highlight drop area
        border: isOver ? '2px solid #38bdf8' : '2px solid transparent',
        borderRadius: 2,
        p: 2,
        minHeight: 500,
        transition: 'background 0.2s, border 0.2s',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 2,
        position: 'relative',
      }}
    >
      {isEmpty && (
        <Typography sx={{ color: '#64748b', width: '100%', textAlign: 'center', mt: 4, fontStyle: 'italic' }}>
          Empty
        </Typography>
      )}
      {children}
    </Box>
  );
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

  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel('public:job')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job', filter: `user_id=eq.${userId}` }, payload => {
        if (payload.eventType === 'UPDATE') {
          setJobs(prev => prev.map(j => j.id === payload.new.id ? { ...j, ...payload.new } : j));
        } else if (payload.eventType === 'INSERT') {
          setJobs(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'DELETE') {
          setJobs(prev => prev.filter(j => j.id !== payload.old.id));
        }
      })
      .subscribe();
    return () => { channel.unsubscribe(); };
  }, [userId]);

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

  // Drag and drop handlers
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const jobId = active.id;
    const targetCol = over.id;
    const job = jobs.find(j => j.id === jobId);
    if (!job || job.status === targetCol) return;
    // Update status in Supabase
    await supabase.from('job').update({ status: targetCol }).eq('id', jobId);
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: targetCol } : j));
  };

  // Group jobs by status
  const jobsByStatus: Record<string, Job[]> = {
    Open: [],
    Applied: [],
    Interviewing: [],
    Closed: [],
  };
  jobs.forEach(job => {
    const col = job.status || 'Open';
    if (jobsByStatus[col]) jobsByStatus[col].push(job);
  });

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
        <Box display="flex" gap={2} alignItems="flex-start" justifyContent="center" minHeight={400}>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {KANBAN_COLUMNS.map(col => (
              <DroppableColumn key={col.key} id={col.key} isEmpty={jobsByStatus[col.key].length === 0}>
                <Typography variant="h6" align="center" sx={{ mb: 2, color: '#f3f4f6', width: '100%' }}>{col.label}</Typography>
                <SortableContext items={jobsByStatus[col.key].map(j => j.id)} strategy={verticalListSortingStrategy}>
                  {jobsByStatus[col.key].map(job => (
                    <DraggableJobCard key={job.id} job={job}>
                      <Box sx={{ width: '50%', minWidth: 180, maxWidth: '50%', boxSizing: 'border-box', display: 'flex' }}>
                        <JobCard
                          job={job}
                          onEdit={handleOpenEdit}
                          resumes={resumes}
                          onDelete={handleDeleteClick}
                          onAttachResume={handleAttachResume}
                        />
                      </Box>
                    </DraggableJobCard>
                  ))}
                </SortableContext>
              </DroppableColumn>
            ))}
          </DndContext>
        </Box>
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
      <FloatingAddButton onClick={handleOpenAdd} aria-label="Add Job" />
    </Box>
  );
};

export default JobsPage;
