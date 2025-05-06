import React, { useState } from 'react';
import LoginModal from './LoginModal';

const Login: React.FC = () => {
  const [open, setOpen] = useState(true);
  return <LoginModal open={open} onClose={() => setOpen(false)} />;
};

export default Login;
