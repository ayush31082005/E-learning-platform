// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Link, IconButton, Grid, Divider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        mt: 'auto',
        boxShadow: "0 8px 32px 0 rgba(18,18,55,0.22), 0 1.5px 0 0 rgba(255,255,255,0.13) inset",
        background: "black",         // <-- Updated for solid black
       
        position: 'relative',
      }}
    >
      {/* Dim overlay removed for black background! */}
      <Grid container spacing={4} alignItems="flex-start" sx={{ position: "relative", zIndex: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        {/* Brand & tagline */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SchoolIcon sx={{
              fontSize: 40,
              color: "#fff",
              filter: "drop-shadow(0 2px 8px #183871c0)"
            }} />
            <Typography variant="h5" fontWeight="bold" sx={{
              ml: 1,
              color: "#fff",
              letterSpacing: "2px",
              textShadow: "0 2px 12px #2226bb60"
            }}>
              EduCraft
            </Typography>
          </Box>
          <Typography sx={{ color: "#c9d1e6", lineHeight: 1.6 }}>
            Your gateway to interactive and creative online learning.
          </Typography>
        </Grid>
        {/* Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: "#fff" }}>
            Useful Links
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, maxWidth: '100%' }}>
            <Link href="/" sx={{ color: "#fff", textDecoration: "none", fontWeight: 500, px: 2, py: 0.5, borderRadius: 2, background: "#181818", transition: ".25s", "&:hover": { color: "#ffce00", background: "#333", transform: "scale(1.07)" }}}>
              Home
            </Link>
            <Link href="/about" sx={{ color: "#fff", textDecoration: "none", fontWeight: 500, px: 2, py: 0.5, borderRadius: 2, background: "#181818", transition: ".25s", "&:hover": { color: "#ffce00", background: "#333", transform: "scale(1.07)" }}}>
              About
            </Link>
            <Link href="/course" sx={{ color: "#fff", textDecoration: "none", fontWeight: 500, px: 2, py: 0.5, borderRadius: 2, background: "#181818", transition: ".25s", "&:hover": { color: "#ffce00", background: "#333", transform: "scale(1.07)" }}}>
              Courses
            </Link>
            <Link href="/career" sx={{ color: "#fff", textDecoration: "none", fontWeight: 500, px: 2, py: 0.5, borderRadius: 2, background: "#181818", transition: ".25s", "&:hover": { color: "#ffce00", background: "#333", transform: "scale(1.07)" }}}>
              Career
            </Link>
            <Link href="/contact" sx={{ color: "#fff", textDecoration: "none", fontWeight: 500, px: 2, py: 0.5, borderRadius: 2, background: "#181818", transition: ".25s", "&:hover": { color: "#ffce00", background: "#333", transform: "scale(1.07)" }}}>
              Contact
            </Link>
          </Box>
        </Grid>
        {/* Contact Social Animated */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: "#fff" }}>
            Connect
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "#c9d1e6" }}>
            <EmailIcon sx={{ fontSize: 20 }} /> info@educraft.com
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            {[
              { icon: <FacebookIcon />, href: "https://facebook.com", color: "#1877f2" },
              { icon: <TwitterIcon />, href: "https://twitter.com", color: "#1da1f2" },
              { icon: <LinkedInIcon />, href: "https://linkedin.com", color: "#0a66c2" },
              { icon: <InstagramIcon />, href: "https://instagram.com", color: "#e1306c" }
            ].map(({ icon, href, color }, i) => (
              <IconButton
                key={i}
                href={href}
                target="_blank"
                sx={{
                  color: "#fff",
                  bgcolor: "#212121",
                  boxShadow: "0 2px 10px #0004",
                  mx: 0.5,
                  border: "1.5px solid #fff2",
                  backdropFilter: "blur(6px)",
                  transition: ".3s cubic-bezier(.56,0,.57,1.19)",
                  "&:hover": {
                    bgcolor: color,
                    transform: "scale(1.13)",
                    boxShadow: `0 2.5px 16px ${color}90`,
                  }
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4, bgcolor: "#333", borderColor: "transparent", borderWidth: 0, opacity: 0.7 }} />
      <Typography variant="body2" sx={{
        textAlign: "center",
        color: "#d1deff",
        opacity: 0.85,
        mb: -2,
        fontWeight: 500,
        fontSize: "1rem",
        textShadow: "0 1px 4px #13131360"
      }}>
        &copy; {new Date().getFullYear()} EduCraft — All rights reserved.
      </Typography>
    </Box>
  );
}
