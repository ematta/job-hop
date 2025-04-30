import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import LoginForm from './LoginForm';
import JobForm from './JobForm';

const PopupContent: React.FC = () => {
  const { session, loading } = useAuth();
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Only run in Chrome extension context
    if (window.chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0]?.url;
        setCurrentUrl(url);
      });
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  return session ? <JobForm prefillUrl={currentUrl} /> : <LoginForm />;
};

const Popup: React.FC = () => (
  <AuthProvider>
    <PopupContent />
  </AuthProvider>
);

export default Popup;
