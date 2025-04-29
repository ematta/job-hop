"use client";
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@mui/material';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname === '/login') return;
    const sessionStr = localStorage.getItem('supabase.auth.token');
    if (!sessionStr) {
      router.replace('/login');
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      const now = Math.floor(Date.now() / 1000);
      if (session.expires_at && session.expires_at < now) {
        // Try to refresh session if refresh_token is available
        if (session.refresh_token) {
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          }).then(({ data, error }) => {
            if (error || !data.session) {
              localStorage.removeItem('supabase.auth.token');
              localStorage.removeItem('supabase.user');
              router.replace('/login');
            } else {
              localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
              localStorage.setItem('supabase.user', JSON.stringify(data.user));
            }
          });
        } else {
          localStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('supabase.user');
          router.replace('/login');
        }
        return;
      }
      // Restore session to Supabase
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    } catch {
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.user');
      router.replace('/login');
    }
  }, [pathname, router]);

  return <>{children}</>;
}

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.user');
    setLoading(false);
    router.replace('/login');
  };
  return (
    <Button
      onClick={handleLogout}
      color="error"
      variant="contained"
      disabled={loading}
      sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
