import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { UserContext } from './UserContext';

import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Tooltip, Badge,
  Avatar, InputBase, Box, Divider, Drawer, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';

const SIDEBAR_LINKS = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "About", path: "/about", icon: <InfoSharpIcon /> },
  { name: "Course", path: "/course", icon: <BarChartIcon /> },
  { name: "Career", path: "/career", icon: <DashboardIcon /> },
  { name: "Contact", path: "/contact", icon: <GroupIcon /> },
  { name: "My Profile", path: "/myProfile", icon: <GroupIcon /> },
  { name: "SignUp", path: "/signup", icon: <LockOpenIcon /> },
  { name: "Login", path: "/login", icon: <LoginIcon /> },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Course", path: "/course" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
];

export default function ElearningHeader() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [profileMenu, setProfileMenu] = React.useState(null);
  const location = useLocation();

  const isTabletOrMobile = useMediaQuery('(max-width:1255px)');

  const handleSidebarOpen = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  const handleProfileOpen = (e) => setProfileMenu(e.currentTarget);
  const handleProfileClose = () => setProfileMenu(null);



  const { user } = useContext(UserContext);

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#1e40af',
          boxShadow: 'none',
          width: '100%',
          zIndex: 1400
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 1, sm: 3, md: 6 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Menu + Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              edge="start"
              onClick={handleSidebarOpen}
              size="large"
              sx={{ color: '#fff' }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <SchoolIcon sx={{ color: '#fff' }} />
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>EduCraft</span>
            </Link>
          </Box>

          {/* Center Nav Links */}
          {!isTabletOrMobile && (
            <Box
              sx={{
                flex: 1,
                mx: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              {NAV_LINKS.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    margin: '0 10px',
                    fontSize: '1rem',
                    padding: '4px 10px',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          )}

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isTabletOrMobile && (
              <Box sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                bgcolor: '#fff',
                borderRadius: 2,
                px: 2,
                py: 0.7,
                width: 250
              }}>
                <SearchIcon sx={{ color: '#555', mr: 1 }} />
                <InputBase placeholder="Search" sx={{ fontSize: '0.95rem', width: '100%' }} />
              </Box>
            )}

            {/* Notification Icon */}
            <Link to="/notification" style={{ color: "inherit" }}>
              <IconButton size="large" sx={{ color: '#fff' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Link>

            {/* Profile Icon */}
           <Tooltip title="Profile">
  <IconButton onClick={handleProfileOpen} size="large" sx={{ p: 0 }}>
    <Avatar alt={user?.name || "User"} src={user?.avatar} />
  </IconButton>
</Tooltip>

            {/* Profile Menu */}
            <Menu anchorEl={profileMenu} open={Boolean(profileMenu)} onClose={handleProfileClose}>
              <MenuItem component={Link} to="/myProfile" onClick={handleProfileClose}>
                My Profile
              </MenuItem>
              <MenuItem component={Link} to="/course" onClick={handleProfileClose}>
                My Courses
              </MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleProfileClose}>
                SignUp
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleProfileClose}>
                Login
              </MenuItem>
              <Divider />
              <MenuItem sx={{ color: '#ef4444' }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: 2000 }}
        PaperProps={{
          sx: {
            width: 240,
            bgcolor: "#263544",
            color: "#fff",
            height: "100vh"
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 2 }}>
          <SchoolIcon sx={{ color: '#fff', fontSize: 30 }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>EduCraft</span>
          <IconButton sx={{ color: "#fff", marginLeft: "auto" }} onClick={handleSidebarClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ bgcolor: '#39495d' }} />

        {/* Sidebar Links */}
        <nav>
          {SIDEBAR_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                color: "#fff",
                textDecoration: "none",
                background: location.pathname === link.path ? "#222f3e" : "none",
                fontWeight: location.pathname === link.path ? "bold" : "normal",
              }}
              onClick={handleSidebarClose}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </Drawer>

      {/* Page Spacing: toolbar height */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
    </>
  );
}
