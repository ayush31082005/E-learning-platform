// src/components/MyProfile.jsx
import React, { useState, useRef, useContext } from "react";
import {
  Box, Paper, Avatar, Typography, Grid, Button, TextField, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "./UserContext";

export default function MyProfile() {
  const { user, setUser } = useContext(UserContext);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [preview, setPreview] = useState(null);

  // FIX: Separate file refs
  const topFileRef = useRef(null);
  const editFileRef = useRef(null);

  const handleEdit = () => {
    setForm(user);
    setPreview(null);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setPreview(null);
    setForm(user);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setUser(prev => ({
      ...prev,
      ...form,
      avatar: preview || prev.avatar
    }));

    setEditing(false);
    setPreview(null);
  };

  return (
    <Box sx={{ width: "100%", py: 8, px: { xs: 2, md: 8 }, bgcolor: "#f8faff", minHeight: "100%" }}>
      <Paper elevation={6} sx={{
        maxWidth: 760, mx: "auto", p: { xs: 3, md: 5 }, borderRadius: 4, textAlign: "center",
        boxShadow: "0 8px 32px rgba(30,56,122,0.08)"
      }}>

        <Avatar
          src={preview || user.avatar}
          alt={user.name}
          sx={{ width: 110, height: 110, mx: "auto", mb: 2, boxShadow: 3 }}
        />

        <Typography variant="h5" fontWeight={700} color="primary">{user.name}</Typography>
        <Typography sx={{ color: "#555", mb: 1 }}>{user.email}</Typography>
        <Typography sx={{ color: "#336", mb: 2, fontSize: "1.05rem" }}>{user.bio}</Typography>

        <Grid container spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
          <Grid item xs={6} sm={3}>
            <Typography fontWeight={600} color="primary">{user.courses}</Typography>
            <Typography fontSize="0.95rem">Courses</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography fontWeight={600} color="primary">{user.certificates}</Typography>
            <Typography fontSize="0.95rem">Certificates</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography fontWeight={600} color="primary">{user.progress}%</Typography>
            <Typography fontSize="0.95rem">Progress</Typography>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit Profile
          </Button>

          {/* Hidden file input for top Change Photo */}
          {/* <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={topFileRef}
            onChange={handleFileChange}
          /> */}

          {/* <Button
            variant="outlined"
            startIcon={<CameraAltIcon />}
            onClick={() => topFileRef.current.click()}
          >
            Change Photo
          </Button> */}
        </Box>
      </Paper>

      {/* Form Animation */}
      <AnimatePresence>
        {editing && (
          <motion.div
            id="profile-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
          >
            <Paper elevation={4} sx={{ maxWidth: 900, mx: "auto", mt: 4, p: { xs: 2, md: 4 }, borderRadius: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>Edit Profile</Typography>
                <IconButton onClick={handleCancel}><CloseIcon /></IconButton>
              </Box>

              <form onSubmit={handleSave}>
                <Grid container spacing={2}>

                  {/* Text fields */}
                  <Grid item xs={12} md={6}>
                    <TextField name="name" label="Full Name" value={form.name} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} fullWidth required />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField name="phone" label="Phone Number" value={form.phone || ""} onChange={handleChange} fullWidth />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField name="city" label="City" value={form.city || ""} onChange={handleChange} fullWidth />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="bio" label="About Me" multiline rows={4} value={form.bio || ""} onChange={handleChange} fullWidth />
                  </Grid>

                  {/* Image Preview & Form Upload */}
                  <Grid item xs={12} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar src={preview || user.avatar} sx={{ width: 84, height: 84 }} />

                    {/* Hidden file input for edit section */}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={editFileRef}
                      onChange={handleFileChange}
                    />

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="contained" onClick={() => editFileRef.current.click()}>Choose Image</Button>
                      <Button variant="outlined" onClick={() => { setPreview(null); editFileRef.current.value = ""; }}>
                        Remove Preview
                      </Button>
                      <Button type="submit" variant="contained" color="success">Save Changes</Button>
                    </Box>
                  </Grid>

                </Grid>
              </form>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

    </Box>
  );
}
