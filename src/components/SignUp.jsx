import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useNavigate, Link } from "react-router-dom";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1920&q=80";

const PROFILE_AVATAR =
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=80&q=80";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!form.agree) {
      alert("Please agree to our Terms & Conditions");
      return;
    }

    // -------------------------------
    // ⭐ Save to LocalStorage
    // -------------------------------
    localStorage.setItem("Name", form.name);
    localStorage.setItem("Email", form.email);
    localStorage.setItem("Password", form.password);

    alert("Signup Successful!");

    // Redirect user to Login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        width: "100vw",
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 0,
        }}
      />

      <Tilt glareEnable={true} glareMaxOpacity={0.3} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.03}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Paper
            elevation={12}
            sx={{
              position: "relative",
              width: 400,
              borderRadius: 4,
              px: 4,
              py: 5,
              backdropFilter: "blur(18px)",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Avatar
              src={PROFILE_AVATAR}
              sx={{ width: 72, height: 72, mb: 2, border: "2px solid rgba(255,255,255,0.5)" }}
            />
            <Typography variant="h5" fontWeight={700} color="white" mb={1}>
              Create Account
            </Typography>
            <Typography variant="body2" color="white" mb={3}>
              Sign up to get started
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
            >
              <TextField
                variant="filled"
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                variant="filled"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                variant="filled"
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                variant="filled"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.agree}
                    onChange={handleChange}
                    name="agree"
                    sx={{ color: "white" }}
                  />
                }
                label={<Typography sx={{ color: "white" }}>I agree to the Terms & Conditions</Typography>}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    background: "linear-gradient(90deg,#4facfe,#00f2fe)",
                    color: "white",
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                >
                  REGISTER
                </Button>
              </motion.div>
            </Box>

            <Typography mt={2} variant="body2" sx={{ color: "white" }}>
              Already have an account?{" "}
              <Button
                component={Link}
                to="/login"
                variant="text"
                sx={{ color: "#ffb347", textTransform: "none", fontWeight: 600 }}
              >
                Login
              </Button>
            </Typography>
          </Paper>
        </motion.div>
      </Tilt>
    </Box>
  );
}
