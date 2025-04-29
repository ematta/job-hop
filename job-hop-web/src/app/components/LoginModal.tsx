import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="login-modal" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <LoginForm />
      </Box>
    </Modal>
  );
}
