import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface DeleteJobDialogProps {
  open: boolean;
  jobTitle?: string;
  companyName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteJobDialog: React.FC<DeleteJobDialogProps> = ({ open, jobTitle, companyName, onCancel, onConfirm }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Delete Job</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the job {jobTitle} at {companyName}? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">Delete</Button>
    </DialogActions>
  </Dialog>
);

export default DeleteJobDialog;
