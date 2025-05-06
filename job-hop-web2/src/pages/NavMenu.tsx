import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton, Tooltip, ListItemIcon } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { supabase } from "../supabaseClient";

const NavMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
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

  const handleNav = (path: string) => {
    handleMenuClose();
    navigate(path);
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
    </>
  );
};

export default NavMenu;
