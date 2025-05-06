import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm.tsx';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="login-modal" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 6, p: 2 }}>
        <LoginForm />
      </Box>
    </Modal>
  );
};

export default LoginModal;
