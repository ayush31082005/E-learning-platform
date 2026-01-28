import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Stack, Grid, Paper, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// SLIDE ARRAY - keep this as in your code!
const slides = [
  {
    title: "Welcome to EduCraft",
    desc: "Learn skills from industry-leading instructors and grow faster.",
    extra: "Upgrade your knowledge with high-quality courses, live classes, and certifications.",
    image: "https://images.pexels.com/photos/1181353/pexels-photo-1181353.jpeg",
  },
  {
    title: "Grow Your Career",
    desc: "Master the most in-demand technologies and tools.",
    extra: "From beginner to advanced – build a career-ready skillset with expert mentors.",
    image: "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg",
  },
  {
    title: "Start Your Learning Journey",
    desc: "Choose from multiple courses and boost your confidence.",
    extra: "Earn globally recognized certificates and unlock new opportunities.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const categories = [
  { label: "Programming", icon: <SchoolIcon /> },
  { label: "Design", icon: <SchoolIcon /> },
  { label: "Data Science", icon: <SchoolIcon /> },
  { label: "AI/ML", icon: <SchoolIcon /> },
  { label: "Cloud", icon: <SchoolIcon /> },
];

const features = [
  {
    title: "Live Classes",
    desc: "Interactive sessions for best learning experience.",
    icon: <SchoolIcon fontSize="large" sx={{ color: "#ff7043" }} />
  },
  {
    title: "Certificates",
    desc: "Earn globally recognized course certificates.",
    icon: <StarIcon fontSize="large" sx={{ color: "#ffd92c" }} />
  },
  {
    title: "Expert Mentors",
    desc: "Learn from top industry instructors and professionals.",
    icon: <PersonIcon fontSize="large" sx={{ color: "#42a5f5" }} />
  },
  {
    title: "Career Support",
    desc: "Internships, jobs, placement, resume workshops.",
    icon: <ArrowForwardIcon fontSize="large" sx={{ color: "#26b99a" }} />
  },
  {
    title: "Flexible Schedule",
    desc: "Learn anytime, anywhere—set your own pace.",
    icon: <AccessTimeIcon fontSize="large" sx={{ color: "#ffa726" }} />
  },
  {
    title: "Community Hub",
    desc: "Join study groups, forums, and events.",
    icon: <LanguageIcon fontSize="large" sx={{ color: "#29b6f6" }} />
  },
  {
    title: "Project Based",
    desc: "Work on real projects, build your portfolio.",
    icon: <CheckCircleIcon fontSize="large" sx={{ color: "#66bb6a" }} />
  },
  {
    title: "Student Support",
    desc: "Get help any time from our support team.",
    icon: <SupportAgentIcon fontSize="large" sx={{ color: "#ab47bc" }} />
  }
];

const testimonials = [
  { name: "Priya Jain", text: "EduCraft helped me switch to a tech career. Couldn’t be happier!", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Amit Verma", text: "Live classes and expert mentors made all the difference!", avatar: "https://i.pravatar.cc/150?img=7" },
];

const partners = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
];


export default function Home() {
  return (
    <Box sx={{ width: "100%", bgcolor: "#fafafd" }}>
      {/* Slider Section */}
      <Box sx={{ mb: { xs: 4, md: 7 } }}>
        <Slider {...sliderSettings}>
          {slides.map((item, index) => (
            <Box
              key={index}
              sx={{
                height: { xs: "360px", sm: "430px", md: "520px", lg: "620px" },
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%",
                  background: "rgba(0,0,0,0.6)", color: "white",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  px: { xs: 3, sm: 6, md: 10 },
                }}
              >
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                  <Typography variant="h3" fontWeight={700}>{item.title}</Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>{item.desc}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, opacity: 0.9, maxWidth: "600px" }}>{item.extra}</Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button variant="contained" sx={{
                      background: "linear-gradient(45deg, #ff9800, #ff5722)",
                      fontWeight: "bold", px: 3, py: 1, borderRadius: "30px",
                    }}>Explore Courses</Button>
                    <Button variant="outlined" sx={{
                      color: "white", borderColor: "white", px: 3, py: 1, borderRadius: "30px", fontWeight: "bold",
                    }}>Contact Us</Button>
                  </Stack>
                </motion.div>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Course Categories */}
      <Box sx={{ maxWidth: 1100, mx: "auto", px: 2, mb: { xs: 5, md: 9 } }}>
        <Typography variant="h4" fontWeight={700} color="primary" sx={{ textAlign: "center", mb: 2 }}>Popular Categories</Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map(cat => (
            <Grid item xs={6} sm={4} md={2} key={cat.label}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 4, textAlign: "center" }}>
                <Avatar sx={{ bgcolor: "#1e40af", mx: "auto", mb: 1 }}>{cat.icon}</Avatar>
                <Typography fontWeight={600}>{cat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, mb: { xs: 5, md: 9 } }}>
        <Typography variant="h4" fontWeight={700} color="primary" sx={{ textAlign: "center", mb: 3 }}>
          Why Choose EduCraft?
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {features.map(f => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={f.title}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                elevation={3}
                sx={{
                  minWidth: 280,
                  maxWidth: 320,
                  height: 200,
                  borderRadius: 4,
                  p: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                }}
              >
                {f.icon}
                <Typography fontWeight={700} sx={{ mt: 2, mb: 1, fontSize: "1.18em" }}>
                  {f.title}
                </Typography>
                <Typography sx={{ color: "#556", fontSize: "1em" }}>
                  {f.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>


      {/* Testimonials */}
      <Box sx={{ maxWidth: 700, mx: "auto", px: 2, mb: { xs: 5, md: 8 } }}>
        <Typography variant="h4" fontWeight={700} color="primary" sx={{ textAlign: "center", mb: 2 }}>
          What Our Learners Say
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems="center" justifyContent="center">
          {testimonials.map((t, i) => (
            <Paper key={i} elevation={3} sx={{ p: 3, borderRadius: 4, textAlign: "center", minWidth: 220 }}>
              <Avatar src={t.avatar} sx={{ width: 60, height: 60, mx: "auto", mb: 2 }} />
              <Typography fontStyle="italic">"{t.text}"</Typography>
              <Typography fontWeight={700} color="primary" sx={{ mt: 1 }}>{t.name}</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Partners or Company logos */}
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, mb: { xs: 5, md: 8 }, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 3 }}>
          Our Courses Help You Join:
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center">
          {partners.map((logo, idx) => (
            <Box key={idx} sx={{ py: 2 }}>
              <img src={logo} alt="partner" style={{ height: 40, maxWidth: 130 }} />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* CTA Banner */}
      <Box sx={{
        py: 7, px: 2, mb: 2, background: "linear-gradient(90deg, #337cbb 70%, #60c3ff 100%)",
        boxShadow: 3, textAlign: "center", color: "#fff"
      }}>
        <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
          Ready to start your journey?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.5, bgcolor: "#1e40af", borderRadius: 5, fontWeight: 700, color: "#fff", fontSize: "1.15em", mt: 1 }}
        >
          Sign Up Free
        </Button>
      </Box>
    </Box>
  );
}
