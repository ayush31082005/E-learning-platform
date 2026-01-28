// src/components/Career.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CodeIcon from '@mui/icons-material/Code';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const careers = [
  {
    title: "Frontend Developer",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    icon: <CodeIcon sx={{ color: "#fff", bgcolor: "#1e40af", borderRadius: "50%", p: 0.7, fontSize: 26, mr: 1 }} />,
    description: "Create beautiful, user-friendly web applications using React, HTML, CSS, and JavaScript.",
  },
  {
    title: "Data Analyst",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    icon: <EmojiObjectsIcon sx={{ color: "#fff", bgcolor: "#1e40af", borderRadius: "50%", p: 0.7, fontSize: 26, mr: 1 }} />,
    description: "Gather, analyze, and visualize data to help organizations make data-driven decisions.",
  },
  {
    title: "Cloud Engineer",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    icon: <WorkOutlineIcon sx={{ color: "#fff", bgcolor: "#1e40af", borderRadius: "50%", p: 0.7, fontSize: 26, mr: 1 }} />,
    description: "Design and deploy scalable systems on AWS, Azure, Google Cloud, and more.",
  },
  {
    title: "Student Support Specialist",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    icon: <SupportAgentIcon sx={{ color: "#fff", bgcolor: "#1e40af", borderRadius: "50%", p: 0.7, fontSize: 26, mr: 1 }} />,
    description: "Support students, resolve issues, and help them achieve their learning goals.",
  },
];

export default function Career() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", resume: null, experienceType: "", experienceDetails: "" });

  const handleApplyClick = (role) => {
    setSelectedRole(role);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedRole(null);
    setForm({ name: "", email: "", mobile: "", resume: null, experienceType: "", experienceDetails: "" });
  };
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you ${form.name}, you applied for "${selectedRole.title}"!`);
    handleClose();
  };

  return (
    <Box sx={{ width: "100%", py: 6, px: { xs: 2, md: 8 }, bgcolor: "#eef3fd" }}>
      
      <Typography variant="h3" fontWeight={800} color="primary" textAlign="center" sx={{ mb: 3 }}>
        Career Opportunities
      </Typography>

      <Typography sx={{ textAlign: "center", color: "#335", fontSize: "1.07em", mb: 5 }}>
        Discover exciting career paths after your EduCraft learning journey. Apply for internships, jobs, and community roles.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {careers.map((role, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 3,
                boxShadow: "0 7px 24px #1e387230",
                transition: "transform .22s, box-shadow .18s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 36px #1e387266"
                },
                height: 330,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxWidth: 250,
                mx: "auto"
              }}
            >
              <CardMedia
                image={role.img}
                title={role.title}
                sx={{ height: 110, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />

              <CardContent sx={{ p: 2, flex: 1 }}>
                <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
                  {role.icon}
                  <Typography variant="h6" fontWeight={700} color="primary" sx={{ fontSize: "1.07em" }}>
                    {role.title}
                  </Typography>
                </Stack>
                <Typography sx={{ color: "#334", fontSize: "0.98em", mb: 1 }}>
                  {role.description}
                </Typography>
              </CardContent>

              <Box sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    fontSize: "0.98em",
                    mt: 1,
                    bgcolor: "#1e40af",
                    "&:hover": { bgcolor: "#304ba6", color: "#ffce00" }
                  }}
                  onClick={() => handleApplyClick(role)}
                >
                  Apply Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ------------------ BIG MODERN POPUP FORM ------------------ */}
       {/* ===================== APPLY FORM POPUP ===================== */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: "1.7rem", fontWeight: 800, color: "#1e40af", textAlign: "center" }}>
          Apply for {selectedRole?.title}
        </DialogTitle>

        <DialogContent sx={{ px: 4, py: 2 }}>
          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <TextField
              label="Full Name"
              fullWidth
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            {/* EMAIL */}
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            {/* MOBILE */}
            <TextField
              label="Mobile Number"
              fullWidth
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            {/* RESUME UPLOAD */}
            <Button variant="outlined" component="label" fullWidth sx={{ mb: 3, py: 1.5 }}>
              Upload Resume (PDF/DOC)
                <input type="file" name="resume" hidden onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setForm(prev => ({ ...prev, resume: file }));
                }} required />
            </Button>

            {/* FRESHER / EXPERIENCE RADIO */}
            <FormLabel sx={{ fontWeight: 700 }}>Are you a Fresher or Experienced?</FormLabel>

            <RadioGroup
              row
              name="experienceType"
              value={form.experienceType}
              onChange={handleChange}
              sx={{ mb: 3 }}
            >
              <FormControlLabel value="fresher" control={<Radio />} label="Fresher" />
              <FormControlLabel value="experienced" control={<Radio />} label="Experienced" />
            </RadioGroup>

            {/* SHOW ONLY IF EXPERIENCED */}
            {form.experienceType === "experienced" && (
              <TextField
                multiline
                rows={3}
                fullWidth
                label="Experience Details"
                name="experienceDetails"
                value={form.experienceDetails}
                onChange={handleChange}
                sx={{ mb: 3 }}
                required
              />
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.4, bgcolor: "#1e40af" }}>
             Submit Application
            </Button>
          </form>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        </Dialog>
      </Box>
  );
}
