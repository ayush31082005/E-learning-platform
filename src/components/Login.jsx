import React, { useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  Paper,
  InputAdornment,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import Tilt from "react-parallax-tilt";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1920&q=80";

const LOGO =
  "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=200&q=80";

export default function Login3D() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found! Please Signup first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login Successful!");
      navigate("/"); // home page
    } 
    else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(6px)",
          bgColor: "rgba(0,0,0,0.35)",
        }}
      />

      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.35}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        style={{ width: "100%", maxWidth: 430, zIndex: 10 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Paper
            elevation={20}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              boxShadow: "0px 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <Avatar
              src={LOGO}
              sx={{
                width: 80,
                height: 80,
                border: "4px solid white",
                boxShadow: "0 0 20px #ffffff88",
                mx: "auto",
              }}
            />

            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: 900, color: "#fff", mt: 2 }}
            >
              Welcome Back
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon style={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "white" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "white" }} />
                        ) : (
                          <Visibility sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox defaultChecked sx={{ color: "#fff" }} />}
                label={<span style={{ color: "white" }}>Remember me</span>}
              />

              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.2,
                    borderRadius: 3,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                    boxShadow: "0 8px 25px #22d3ee55",
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </Box>

            <Typography sx={{ textAlign: "center", color: "#e2e8f0", mt: 3 }}>
              Don’t have an account?
              <Button
                component={Link}
                to="/signup"
                variant="text"
                sx={{ color: "#38bdf8", textTransform: 'none', fontWeight: 700 }}
              >
                Register
              </Button>
            </Typography>
          </Paper>
        </motion.div>
      </Tilt>
    </Box>
  );
}
