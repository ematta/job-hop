"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Menu, MenuItem, IconButton, Tooltip, ListItemIcon } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { createBrowserClient } from '@supabase/ssr';

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('supabase.auth.token');
    const userStr = localStorage.getItem('supabase.user');
    setIsLoggedIn(!!token);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAvatarUrl(user?.user_metadata?.avatar_url || null);
      } catch {
        setAvatarUrl(null);
      }
    } else {
      setAvatarUrl(null);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    router.push('/login');
  };

  const handleLogout = async () => {
    handleMenuClose();
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.user');
    router.replace('/login');
  };

  const handleNav = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  return (
    <>
      <Tooltip title={isLoggedIn ? "Account" : "Login"}>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ position: 'fixed', top: 24, right: 24, zIndex: 1200 }}
          size="large"
        >
          <Avatar src={avatarUrl || undefined} sx={{ bgcolor: isLoggedIn ? 'primary.main' : 'grey.400' }}>
            {!avatarUrl && <PersonIcon />}
          </Avatar>
        </IconButton>
      </Tooltip>
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {isLoggedIn ? (
            <>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
              <MenuItem onClick={() => handleNav('/resumes')}>
                <ListItemIcon><DescriptionIcon fontSize="small" /></ListItemIcon>
                Resumes
              </MenuItem>
              <MenuItem onClick={() => handleNav('/jobs')}>
                <ListItemIcon><WorkIcon fontSize="small" /></ListItemIcon>
                Jobs
              </MenuItem>
              <MenuItem onClick={() => handleNav('/profile')}>
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                Profile
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLogin}>
              <ListItemIcon><LoginIcon fontSize="small" /></ListItemIcon>
              Login
            </MenuItem>
          )}
        </Menu>
      )}
    </>
  );
}
