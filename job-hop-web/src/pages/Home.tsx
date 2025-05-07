import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Footer from '../components/Footer';
import JobsKanban from './JobsKanban';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Header />
      {isAuthenticated && <JobsKanban />}
      <Footer />
    </>
  );
};

export default Home;
