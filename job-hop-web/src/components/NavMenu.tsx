import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton, Tooltip, ListItemIcon } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import { supabase } from "../supabaseClient";
import ResumeModal from './ResumeModal';

const NavMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setAvatarUrl(user?.user_metadata?.avatar_url || null);
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate('/login');
  };

  const handleLogout = async () => {
    handleMenuClose();
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {isLoggedIn ? [
            <MenuItem onClick={handleLogout} key="logout">
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>,
            <MenuItem onClick={() => { setResumeModalOpen(true); handleMenuClose(); }} key="resumes">
              <ListItemIcon><DescriptionIcon fontSize="small" /></ListItemIcon>
              Resumes
            </MenuItem>,
          ] : (
          <MenuItem onClick={handleLogin}>
            <ListItemIcon><LoginIcon fontSize="small" /></ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
      <ResumeModal open={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </>
  );
};

export default NavMenu;
