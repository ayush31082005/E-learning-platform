import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Button,
  Menu,
  MenuItem,
  Switch,
  Divider,
  Modal,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as ReTooltip, BarChart, Bar } from "recharts";

/*
  Full updated Admin Dashboard
  - Self contained responsive layout (no global Navbar/Footer required)
  - 3D animated cards, glass blur panels, charts (Recharts)
  - Sidebar (collapsible), mobile-friendly
  - Course table with add/edit modal
  - Payments & Students panels
  - Dark/light theme toggle saved to localStorage
  - Framer Motion micro-interactions for premium feel

  Install deps if not already:
  npm i @mui/material @emotion/react @emotion/styled @mui/icons-material framer-motion recharts
*/

const drawerWidth = 260;

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 17000 },
  { month: "Apr", revenue: 14000 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 25000 }
];

const initialCourses = [
  { id: 1, title: "Python Programming", price: 1499, students: 230, category: "Programming" },
  { id: 2, title: "UI/UX Design Masterclass", price: 1999, students: 120, category: "Design" },
  { id: 3, title: "Data Science Bootcamp", price: 4999, students: 320, category: "Data Science" }
];

export default function AdminDashboardUpdated() {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [active, setActive] = useState("overview");
  const [dark, setDark] = useState(() => localStorage.getItem("app_dark") === "1");

  // workspace data
  const [courses, setCourses] = useState(initialCourses);
  const [students] = useState([
    { id: 1, name: "Rohan Kumar", email: "rohan@example.com", course: "Python Programming" },
    { id: 2, name: "Aisha Verma", email: "aisha@example.com", course: "UI/UX Design Masterclass" }
  ]);
  const [payments] = useState([
    { id: 1, student: "Rohan Kumar", amount: 1499, course: "Python Programming", date: "2025-11-01" }
  ]);

  // modal & form
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", category: "" });

  useEffect(() => { localStorage.setItem("app_dark", dark ? "1" : "0"); }, [dark]);

  const handleAddCourse = () => {
    setEditing(null);
    setForm({ title: "", price: "", category: "" });
    setOpenCourseModal(true);
  };
  const handleEditCourse = (c) => { setEditing(c); setForm({ title: c.title, price: c.price, category: c.category }); setOpenCourseModal(true); };
  const handleSaveCourse = () => {
    if (editing) {
      setCourses(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setCourses(prev => [{ id: Date.now(), students: 0, ...form }, ...prev]);
    }
    setOpenCourseModal(false);
  };
  const handleDeleteCourse = (id) => setCourses(prev => prev.filter(p => p.id !== id));

  // small utility to produce elegant card styles
  const CardPanel = ({ children, sx }) => (
    <motion.div whileHover={{ translateY: -6 }} style={{ willChange: 'transform' }}>
      <Card sx={{ borderRadius: 2, boxShadow: dark ? '0 10px 30px rgba(0,0,0,0.6)' : '0 10px 30px rgba(14,30,80,0.08)', overflow: 'hidden', ...sx }}>
        {children}
      </Card>
    </motion.div>
  );

  const Overview = (
    <Box>
      <Grid container spacing={2}>
        {[{
          title: 'Total Courses', value: courses.length, colors: ['#7c3aed', '#60a5fa']
        },{
          title: 'Students', value: students.length, colors: ['#10b981','#34d399']
        },{
          title: 'Payments', value: payments.length, colors: ['#fb7185','#f97316']
        },{
          title: 'Platform Health', value: '92%', colors: ['#f59e0b','#ef4444']
        }].map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <CardPanel sx={{ p: 0 }}>
              <Box sx={{ p: 2, background: `linear-gradient(135deg, ${s.colors[0]}, ${s.colors[1]})` }}>
                <Typography sx={{ color: '#fff', fontWeight: 800 }}>{s.title}</Typography>
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 28, mt: 1 }}>{s.value}</Typography>
              </Box>
              <CardContent>
                <Typography variant="caption">Insight & recent changes</Typography>
              </CardContent>
            </CardPanel>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <CardPanel>
          <CardContent>
            <Typography sx={{ fontWeight: 800, mb: 2 }}>Revenue (last 6 months)</Typography>
            <Box sx={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ReTooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </CardPanel>
      </Box>
    </Box>
  );

  const Courses = (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontWeight: 800 }}>Courses</Typography>
        <Box>
          <Button variant="outlined" onClick={() => { /* export */ }} sx={{ mr: 1 }}>Export CSV</Button>
          <Button variant="contained" onClick={handleAddCourse}>Add Course</Button>
        </Box>
      </Box>

      <CardPanel>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>₹{c.price}</TableCell>
                  <TableCell>{c.students}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEditCourse(c)} sx={{ mr: 1 }}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDeleteCourse(c.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardPanel>
    </Box>
  );

  const Students = (
    <Box>
      <Typography sx={{ fontWeight: 800, mb: 2 }}>Students</Typography>
      <CardPanel>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Course</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(s => (
                <TableRow key={s.id}><TableCell>{s.name}</TableCell><TableCell>{s.email}</TableCell><TableCell>{s.course}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardPanel>
    </Box>
  );

  const Payments = (
    <Box>
      <Typography sx={{ fontWeight: 800, mb: 2 }}>Payments</Typography>
      <CardPanel>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map(p => (
                <TableRow key={p.id}><TableCell>{p.student}</TableCell><TableCell>{p.course}</TableCell><TableCell>₹{p.amount}</TableCell><TableCell>{p.date}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardPanel>
    </Box>
  );

  const Reports = (
    <Box>
      <Typography sx={{ fontWeight: 800, mb: 2 }}>Reports</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CardPanel>
            <CardContent>
              <Typography sx={{ fontWeight: 700 }}>Revenue Trend</Typography>
              <Box sx={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ReTooltip />
                    <Bar dataKey="revenue" fill="#8884d8" radius={[8,8,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </CardPanel>
        </Grid>

        <Grid item xs={12} md={4}>
          <CardPanel>
            <CardContent>
              <Typography sx={{ fontWeight: 700 }}>Top Courses</Typography>
              <Box sx={{ mt: 2 }}>
                {courses.slice(0,5).map(c => (
                  <Box key={c.id} sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderRadius: 1, background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', mb: 1 }}>
                    <Typography>{c.title}</Typography>
                    <Typography sx={{ fontWeight: 700 }}>₹{c.price}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </CardPanel>
        </Grid>
      </Grid>
    </Box>
  );

  // Sidebar items
  const items = [
    { key: 'overview', label: 'Overview', icon: <DashboardIcon /> },
    { key: 'courses', label: 'Courses', icon: <BookIcon /> },
    { key: 'students', label: 'Students', icon: <PeopleIcon /> },
    { key: 'payments', label: 'Payments', icon: <PaymentIcon /> },
    { key: 'reports', label: 'Reports', icon: <BarChartIcon /> }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: dark ? '#07122a' : '#f3f6fb', color: dark ? '#e6f0ff' : '#0f1724' }}>
      {/* AppBar inside Dashboard (not global) */}
      <AppBar position="fixed" elevation={2} sx={{ background: dark ? '#081122' : '#fff', color: dark ? '#fff' : '#111' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(s => !s)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>{active.charAt(0).toUpperCase() + active.slice(1)}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Theme</Typography>
            <Switch checked={dark} onChange={(e) => setDark(e.target.checked)} />

            <Button variant="outlined" startIcon={<SettingsIcon />}>Settings</Button>

            <Avatar sx={{ bgcolor: '#7c3aed', ml: 1 }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer variant="permanent" open sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, mt: 8, boxSizing: 'border-box', borderRight: '1px solid rgba(0,0,0,0.06)', background: dark ? '#041024' : '#fff' } }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: '#7C3AED' }}>A</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 800 }}>Admin User</Typography>
              <Typography variant="caption">admin@example.com</Typography>
            </Box>
          </Box>

          <List>
            {items.map(it => (
              <ListItemButton key={it.key} selected={active === it.key} onClick={() => setActive(it.key)} sx={{ borderRadius: 1, mb: 1 }}>
                <ListItemIcon sx={{ color: active === it.key ? '#7C3AED' : undefined }}>{it.icon}</ListItemIcon>
                <ListItemText primary={it.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" color="secondary" onClick={() => { setActive('payments'); }} startIcon={<PaymentIcon />}>Payments</Button>
            <Button variant="outlined" onClick={() => { localStorage.removeItem('app_dark'); window.location.reload(); }}>Reset</Button>
          </Box>

          <Box sx={{ position: 'absolute', bottom: 20, width: drawerWidth - 32 }}>
            <Button startIcon={<LogoutIcon />} fullWidth>Logout</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: openDrawer ? `${drawerWidth}px` : 0 }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {active === 'overview' && Overview}
          {active === 'courses' && Courses}
          {active === 'students' && Students}
          {active === 'payments' && Payments}
          {active === 'reports' && Reports}
        </motion.div>

        {/* Course Modal */}
        <Modal open={openCourseModal} onClose={() => setOpenCourseModal(false)}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: { xs: '90%', sm: 600 }, bgcolor: dark ? '#041022' : '#fff', p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 2 }}>{editing ? 'Edit Course' : 'Add Course'}</Typography>
            <TextField fullWidth label="Title" sx={{ mb: 2 }} value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
            <TextField fullWidth label="Price" sx={{ mb: 2 }} value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} />
            <TextField fullWidth label="Category" sx={{ mb: 2 }} value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} />
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button variant="contained" onClick={handleSaveCourse}>Save</Button>
              <Button onClick={() => setOpenCourseModal(false)}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
