'use client';
import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';

export default function LoginPage() {
  const [open, setOpen] = useState(true);
  return (
    <LoginModal open={open} onClose={() => setOpen(false)} />
  );
}
