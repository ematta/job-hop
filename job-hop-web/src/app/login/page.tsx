'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Store tokens and user info in localStorage
    if (data.session) {
      localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
      localStorage.setItem('supabase.user', JSON.stringify(data.user));
    }
    router.push('/');
  };

  // Stubs for Google and Apple OAuth
  const handleOAuth = (provider: 'google' | 'apple') => {
    alert(`${provider} login is not implemented yet.`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Sign in to Job Hop</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
            onClick={() => handleOAuth('google')}
          >
            <span>Continue with Google</span>
          </button>
          <button
            type="button"
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
            onClick={() => handleOAuth('apple')}
          >
            <span>Continue with Apple</span>
          </button>
        </div>
      </form>
    </div>
  );
}