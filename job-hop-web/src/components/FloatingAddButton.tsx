import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface FloatingAddButtonProps {
  onClick: () => void;
  'aria-label'?: string;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick, 'aria-label': ariaLabel = 'Add' }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    aria-label={ariaLabel}
    sx={{
      position: 'fixed',
      bottom: 32,
      right: 32,
      zIndex: 1000,
      borderRadius: '50%',
      width: 64,
      height: 64,
      minWidth: 0,
      minHeight: 0,
      boxShadow: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 0,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      '&:hover': {
        bgcolor: 'primary.dark',
      },
    }}
  >
    <AddIcon sx={{ fontSize: 36 }} />
  </Button>
);

export default FloatingAddButton;
