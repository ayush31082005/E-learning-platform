import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
} from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email");

    setSent(true);

    setTimeout(() => {
      alert("Password reset link sent to: " + email);
    }, 600);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: "25px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 25px 55px rgba(0,0,0,0.45)",
          transition: "transform .5s, box-shadow .5s",
          "&:hover": {
            transform: "translateY(-10px) scale(1.03)",
            boxShadow: "0 35px 65px rgba(0,0,0,0.55)",
          },
        }}
      >
        {/* Icon Section */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <MailLockIcon
            sx={{
              fontSize: 70,
              color: "#1e40af",
              filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.3))",
              animation: "floatMail 3s ease-in-out infinite",
            }}
          />
        </Box>

        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: 1,
            mb: 1,
            textShadow: "0px 3px 10px rgba(0,0,0,0.4)",
          }}
        >
          Forgot Password?
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#e4e7ec",
            fontSize: "1.05rem",
            mb: 4,
          }}
        >
          Enter your registered email address to receive a password reset link.
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "#fff" },
              label: { color: "#dbeafe" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#93c5fd" },
                "&:hover fieldset": { borderColor: "#60a5fa" },
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 700,
              borderRadius: "10px",
              bgcolor: "#1e40af",
              boxShadow: "0 6px 18px rgba(30,64,175,0.55)",
              "&:hover": {
                bgcolor: "#1d4ed8",
                boxShadow: "0 8px 22px rgba(30,64,175,0.75)",
              },
            }}
          >
            Send Reset Link
          </Button>
        </form>

        {sent && (
          <Typography
            sx={{
              color: "#22c55e",
              textAlign: "center",
              mt: 3,
              fontWeight: 600,
              fontSize: "1.1rem",
              animation: "pulse 1.5s infinite",
            }}
          >
            ✔ Reset Link Sent Successfully!
          </Typography>
        )}
      </Card>

      {/* Extra Animation Keyframes */}
      <style>
        {`
        @keyframes floatMail {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}
      </style>
    </Box>
  );
}
