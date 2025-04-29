import React from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import LoginForm from './LoginForm';
import JobForm from './JobForm';

const PopupContent: React.FC = () => {
  const { session, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return session ? <JobForm /> : <LoginForm />;
};

const Popup: React.FC = () => (
  <AuthProvider>
    <PopupContent />
  </AuthProvider>
);

export default Popup;
