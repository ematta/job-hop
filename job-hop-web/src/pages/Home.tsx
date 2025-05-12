import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Footer from '../components/Footer';
import JobsKanban from './JobsKanban';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal'; // Import LoginModal

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // State for LoginModal

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      if (!user) {
        setLoginModalOpen(true); // Open modal if not authenticated
      }
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
      if (!session?.user) {
        setLoginModalOpen(true);
      } else {
        setLoginModalOpen(false);
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setLoginModalOpen(false);
  };

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <JobsKanban />
      ) : (
        <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </>
  );
};

export default Home;
