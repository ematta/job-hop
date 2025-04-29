import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthProvider';

const JobForm: React.FC = () => {
  const { refreshSession } = useAuth();
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [msgColor, setMsgColor] = useState<'red' | 'green'>('green');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.from('jobs').insert([{ company, title, url }]);
    setLoading(false);
    if (error) {
      setMsg('Error!');
      setMsgColor('red');
    } else {
      setMsg('Success!');
      setMsgColor('green');
      setCompany('');
      setTitle('');
      setUrl('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    refreshSession();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 600 }}>
      <h2>Submit Job</h2>
      <input
        id="company"
        placeholder="Company Name"
        value={company}
        onChange={e => setCompany(e.target.value)}
        required
      />
      <input
        id="title"
        placeholder="Job Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        id="url"
        placeholder="Job URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      {msg && <div style={{ color: msgColor }}>{msg}</div>}
      <button type="button" onClick={handleLogout} style={{ marginTop: 8 }}>Logout</button>
    </form>
  );
};

export default JobForm;
