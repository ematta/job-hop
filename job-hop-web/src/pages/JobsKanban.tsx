import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Snackbar, Checkbox, FormControlLabel } from '@mui/material';
import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { supabase } from '../supabaseClient';
import JobModal from '../components/JobModal';
import DeleteJobDialog from '../components/DeleteJobDialog';
import JobCard from '../components/JobCard';
import type { Job } from '../components/JobCard';
import FloatingAddButton from '../components/FloatingAddButton';

const KANBAN_COLUMNS = [
  { key: 'Open', label: 'Open' },
  { key: 'Applied', label: 'Applied' },
  { key: 'Interviewing', label: 'Interviewing' },
  { key: 'Closed', label: 'Closed' },
];

function getUserId() {
  const match = document.cookie.match(/(?:^|; )supabase_user=([^;]*)/);
  if (!match) return null;
  try {
    const user = JSON.parse(decodeURIComponent(match[1]));
    return user?.id || user?.uuid || null;
  } catch {
    return null;
  }
}

function DraggableJobCard({ job, children }: { job: Job; children: (handleProps: { dragHandleProps: React.HTMLAttributes<HTMLDivElement> }) => React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: job.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        width: '90%',
        marginBottom: 12,
      }}
    >
      {children({ dragHandleProps: { ...attributes, ...listeners } })}
    </div>
  );
}

function DroppableColumn({ id, children, isEmpty, count }: { id: string; children: React.ReactNode; isEmpty: boolean; count: number }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        minWidth: 220,
        maxWidth: 320,
        bgcolor: isOver ? '#334155' : '#18181b',
        border: isOver ? '2px solid #38bdf8' : '2px solid transparent',
        borderRadius: 4,
        p: 2,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        transition: 'background 0.2s, border 0.2s',
        background: '#334155',
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2, color: '#f3f4f6', width: '100%' }}>{id} ({count})</Typography>
      <Box sx={{
        flex: 1,
        width: '100%',
        overflowY: 'auto',
        pr: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {isEmpty && (
          <Typography sx={{ color: '#64748b', width: '100%', textAlign: 'center', mt: 4, fontStyle: 'italic' }}>
            Empty
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}

const JobsKanban: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resumes, setResumes] = useState<{ id: string; name: string }[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ companyName: '', title: '', url: '', resumeId: '' });
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [showGhostedJobs, setShowGhostedJobs] = useState(false);

  const userId = getUserId();

  useEffect(() => {
    if (!userId) return;
    setLoadingJobs(true);
    setLoadingResumes(true);
    setError('');
    supabase.from('job').select('*').eq('userId', userId).then(({ data, error }) => {
      if (!error) setJobs(data || []);
      else setError('Failed to load jobs');
      setLoadingJobs(false);
    });
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
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job', filter: `userId=eq.${userId}` }, payload => {
        if (payload.eventType === 'UPDATE') {
          setJobs(prev => prev.map(j => j.id === payload.new.id ? { ...j, ...payload.new } : j));
        } else if (payload.eventType === 'INSERT') {
          setJobs(prev => [...prev, payload.new as Job]);
        } else if (payload.eventType === 'DELETE') {
          setJobs(prev => prev.filter(j => j.id !== payload.old.id));
        }
      })
      .subscribe();
    return () => { channel.unsubscribe(); };
  }, [userId]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setForm({ companyName: '', title: '', url: '', resumeId: '' });
    setOpenModal(true);
    setSelectedJob(null);
  };

  const handleOpenEdit = (job: Job) => {
    setModalMode('edit');
    setForm({
      companyName: job.companyName,
      title: job.title,
      url: job.url || '',
      resumeId: job.resumeId || '',
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

  const handleSubmit = async () => {
    if (!form.companyName || !form.title) {
      setError('Company name and job title are required');
      return;
    }
    setError('');
    setSuccess('');
    try {
      if (modalMode === 'add') {
        const { error } = await supabase.from('job').insert([
          {
            companyName: form.companyName,
            title: form.title,
            url: form.url,
            userId,
            resumeId: form.resumeId || null,
            createdAt: new Date().toISOString(),
          },
        ]);
        if (error) throw error;
        setSuccess('Job added');
        handleCloseModal();
      } else if (modalMode === 'edit' && selectedJob) {
        const { error } = await supabase.from('job').update({
          companyName: form.companyName,
          title: form.title,
          url: form.url,
          resumeId: form.resumeId || null,
          updatedAt: new Date().toISOString(),
        }).eq('id', selectedJob.id);
        if (error) throw error;
        setSuccess('Job updated');
        handleCloseModal();
      }
    } catch (e) {
      setError(`Failed to save job: ${(e as Error).message}`);
    }
  };

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

  const handleAttachResume = async (jobId: string, resumeId: string) => {
    setError('');
    setSuccess('');
    try {
      const { error } = await supabase.from('job').update({ resumeId: resumeId }).eq('id', jobId);
      if (error) throw error;
      setJobs(jobs.map(j => j.id === jobId ? { ...j, resumeId: resumeId } : j));
      setSuccess('Resume attached');
    } catch (e) {
      setError(`Failed to attach resume: ${(e as Error).message}`);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event) return;
    const { active, over } = event;
    if (!over) return;
    const jobId = active.id;
    const targetCol = over.id;
    const job = jobs.find(j => j.id === jobId);
    if (!job || job.status === targetCol) return;
    setError("");
    setSuccess("");
    try {
      const { error } = await supabase.from('job').update({ status: targetCol, updatedAt: new Date().toISOString() }).eq('id', jobId);
      if (error) throw error;
      setJobs(jobs.map(j => j.id === jobId ? { ...j, status: String(targetCol) } : j));
      setSuccess('Job status updated');
    } catch (e) {
      setError(`Failed to update job status: ${(e as Error).message}`);
    }
  };

  const jobsByStatus: Record<string, Job[]> = {
    Open: [],
    Applied: [],
    Interviewing: [],
    Closed: [],
  };

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  jobs.forEach(job => {
    const col = job.status || 'Open';
    const dateString = job.updatedAt || job.createdAt;
    let isGhosted = false;
    if (!dateString) {
      isGhosted = true;
    } else {
      const relevantDate = new Date(dateString);
      isGhosted = relevantDate < twoWeeksAgo;
    }

    if (!showGhostedJobs && isGhosted && col !== 'Closed') {
      return;
    }

    if (col === 'Closed') {
      let shouldShowClosedJob = false;
      if (job.createdAt) {
        const createdDate = new Date(job.createdAt);
        if (createdDate >= twoWeeksAgo) {
          shouldShowClosedJob = true;
        }
      }
      if (shouldShowClosedJob) {
        if (jobsByStatus[col]) {
          jobsByStatus[col].push(job);
        }
      }
    } else {
      if (jobsByStatus[col]) {
        jobsByStatus[col].push(job);
      }
    }
  });

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
        </Snackbar>
        <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')}>
          <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>
        </Snackbar>
        <FormControlLabel
          control={<Checkbox checked={showGhostedJobs} onChange={(e) => setShowGhostedJobs(e.target.checked)} />}
          label="Show Ghosted Jobs"
          sx={{ mb: 2, color: 'white' }}
        />
        {(loadingJobs || loadingResumes) ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" gap={2} alignItems="flex-start" justifyContent="center" minHeight={400}>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              {KANBAN_COLUMNS.map(col => (
                <DroppableColumn
                  key={col.key}
                  id={col.key}
                  isEmpty={jobsByStatus[col.key].length === 0}
                  count={jobsByStatus[col.key].length}
                >
                  {jobsByStatus[col.key].map(job => (
                    <DraggableJobCard key={job.id} job={job}>
                      {({ dragHandleProps }) => (
                        <Box sx={{ boxSizing: 'border-box', width: '100%' }}>
                          <JobCard
                            job={job}
                            onEdit={handleOpenEdit}
                            resumes={resumes}
                            onDelete={handleDeleteClick}
                            onAttachResume={handleAttachResume}
                            dragHandleProps={dragHandleProps}
                            showGhosted={showGhostedJobs}
                          />
                        </Box>
                      )}
                    </DraggableJobCard>
                  ))}
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
          resumes={resumes}
        />
        <DeleteJobDialog
          open={deleteDialogOpen}
          jobTitle={jobToDelete?.title}
          companyName={jobToDelete?.companyName}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
        <FloatingAddButton onClick={handleOpenAdd} aria-label="Add Job" />
      </Box>
    </>
  );
};

export default JobsKanban;
