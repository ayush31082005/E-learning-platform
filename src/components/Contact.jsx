// src/components/Contact.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Grid, TextField, Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      mt: 4
    }}>
      <Grid container spacing={4} sx={{ maxWidth: 1450, px: { xs: 1, md: 0 } }}>
        {/* Left: Wide Map Section */}
        <Grid item xs={12} md={8.5}>
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: 1100,        // << Bigger: adjust as needed
              borderRadius: 6,
              p: { xs: 2, md: 6 },   // More padding for big look
              textAlign: "center"
            }}
          >
            <Typography
              variant="h3"
              color="primary"
              fontWeight={900}
              sx={{ mb: 3, fontSize: { xs: "2rem", md: "2.8rem" }, letterSpacing: 2 }}
            >
              Our Location
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
              <LocationOnIcon sx={{ mr: 2, fontSize: 36, color: "#1e40af" }} />
              <Typography sx={{ fontWeight: 600, fontSize: "1.18em", textAlign: "left" }}>
                EduCraft Office<br />
                301, EduCraft Tower, Andheri East,<br />
                Mumbai, Maharashtra 400069
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#1e40af", mr: 1 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#1e40af", mr: 1 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "#1e40af", mr: 1 }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Box sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 3, width: "100%", mx: "auto", maxWidth: 1050 }}>
              <iframe
                title="EduCraft Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609844837!2d72.74110259999999!3d19.0825222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63fd0e9b7df%3A0x685bbaa8c1e5550!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700852002291!5m2!1sen!2sin"
                width="100%"
                height="430"
                frameBorder="0"
                allowFullScreen=""
                loading="lazy"
                style={{ border: 0, display: "block" }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right: Contact Form */}
        <Grid item xs={12} md={3.5}>
          <Paper elevation={5} sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 6,
            textAlign: "left",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <Typography variant="h5" color="primary" fontWeight={800} mb={2}>
              Contact Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Your Name"
                value={form.name}
                onChange={handleChange}
                fullWidth required sx={{ mb: 2 }} autoFocus
              />
              <TextField
                name="email"
                label="Your Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                name="message"
                label="Your Message"
                value={form.message}
                onChange={handleChange}
                fullWidth required multiline rows={4} sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 1 }}>
                Send Message
              </Button>
            </form>
            {submitted && (
              <Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
                Thank you for contacting us! We will reply soon.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
