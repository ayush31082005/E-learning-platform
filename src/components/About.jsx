import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Paper, Avatar, Grid, Button, Card, CardContent, CardMedia, Tooltip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import UpdateIcon from '@mui/icons-material/Update';
import GroupsIcon from '@mui/icons-material/Groups';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// NOTE: To use this file install: framer-motion, react-slick, slick-carousel, @mui/material, @mui/icons-material
// npm i framer-motion react-slick slick-carousel @mui/material @mui/icons-material

const teamImages = [
  { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', name: 'Aditi', role: 'Python Mentor' },
  { url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', name: 'Rahul', role: 'React Lead' },
  { url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', name: 'Sara', role: 'UI Designer' },
  { url: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Nikhil', role: 'ML Coach' }
];

const testimonials = [
  { text: 'EduCraft helped me land my dream developer job!', user: 'Priya K, Mumbai' },
  { text: 'The project-based learning made concepts easy to master.', user: 'Adarsh S, Delhi' },
  { text: 'Great mentors, supportive community, and real career growth.', user: 'Rhea G, Pune' }
];

const partners = [
  { 
    name: 'ABC University', 
    logo: 'https://plus.unsplash.com/premium_photo-1668902224020-8c6062ff6ec1?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  { 
    name: 'Global Tech', 
    logo: 'https://plus.unsplash.com/premium_photo-1667354097023-4b8d9c3f7767?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  { 
    name: 'SkillForge', 
    logo: 'https://images.unsplash.com/photo-1728406970302-8be1af6bda4c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  }
];

const journey = [
  { year: '2020', label: 'Founded', desc: 'Started as 3 friends, 1 mission.', icon: <SchoolIcon /> },
  { year: '2021', label: 'First 1000 Students', desc: 'Built our first flagship course.', icon: <EmojiEventsIcon /> },
  { year: '2022', label: 'Global Partnerships', desc: 'Became international!', icon: <GroupsIcon /> },
  { year: '2024', label: 'Awarded Best Platform', desc: 'Recognized for ed-tech innovation.', icon: <StarIcon /> }
];

function CountUp({ end, duration = 1200 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const steps = Math.max(Math.floor(duration / 25), 1);
    const increment = (end) / steps;
    const timer = setInterval(() => {
      start += increment;
      setCount(prev => {
        const v = Math.min(Math.round(start), end);
        if (v >= end) clearInterval(timer);
        return v;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}</span>;
}

// small 3D tilt hook using mouse position
function useTilt(active = true) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !active) return;
    const el = ref.current;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 12; // tilt strength
      const tiltY = (x - 0.5) * -12;
      el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
      el.style.boxShadow = `${-tiltY}px ${tiltX}px 30px rgba(30,56,122,0.12)`;
    };
    const handleLeave = () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('touchmove', handleMove);
    el.addEventListener('touchend', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('touchmove', handleMove);
      el.removeEventListener('touchend', handleLeave);
    };
  }, [active]);
  return ref;
}

export default function AboutEnhanced() {
  const tiltRef = useTilt(true);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Box sx={{ width: '100%', pt: 6, pb: 12, px: { xs: 2, md: 8 }, bgcolor: '#f6fbff' }}>

      {/* HERO - big 3D card with motion background */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 6, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Paper
            ref={tiltRef}
            elevation={12}
            sx={{
              overflow: 'hidden', borderRadius: 4, p: { xs: 3, md: 5 },
              display: 'flex', gap: 3, alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(30,64,175,0.07), rgba(108,201,250,0.03))',
            }}
          >
            <Box sx={{ flex: '0 0 120px', display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 120, height: 120, bgcolor: '#1e40af', boxShadow: 6 }}>
                <SchoolIcon sx={{ fontSize: 56 }} />
              </Avatar>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={800} color="primary" sx={{ letterSpacing: 1 }}>
                EduCraft — Learn by Building
              </Typography>
              <Typography sx={{ mt: 1, color: '#334' }}>Project-led courses, expert mentors, and career-ready skills.</Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button size="large" sx={{ bgcolor: '#1e40af', color: '#fff', px: 3, py: 1.2, borderRadius: 3, fontWeight: 700 }}>Get Started</Button>
                <Button size="large" variant="outlined" sx={{ borderColor: '#1e40af', color: '#1e40af', px: 3, py: 1.2, borderRadius: 3 }}>Courses</Button>
              </Box>
            </Box>

            {/* floating decorative images for depth */}
            <Box sx={{ width: 140, display: { xs: 'none', md: 'block' }, position: 'relative' }}>
              <motion.img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=60"
                alt="decor"
                style={{ position: 'absolute', right: -10, top: -20, width: 110, borderRadius: 12, boxShadow: '0 10px 30px rgba(16,24,40,0.12)' }}
                initial={{ scale: 0.9, rotate: -6, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </Box>
          </Paper>
        </motion.div>
      </Box>

      {/* STATS with subtle motion */}
      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
        <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }} viewport={{ once: true }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, minWidth: 140 }}> 
            <Typography variant="h4" fontWeight={900} color="primary"><CountUp end={15000} />+</Typography>
            <Typography fontWeight={700}>Students</Typography>
          </Paper>
        </motion.div>
        <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }} viewport={{ once: true }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, minWidth: 140 }}> 
            <Typography variant="h4" fontWeight={900} color="primary"><CountUp end={135} />+</Typography>
            <Typography fontWeight={700}>Projects</Typography>
          </Paper>
        </motion.div>
        <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }} viewport={{ once: true }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, minWidth: 140 }}> 
            <Typography variant="h4" fontWeight={900} color="primary"><CountUp end={30} />+</Typography>
            <Typography fontWeight={700}>Mentors</Typography>
          </Paper>
        </motion.div>
        <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }} viewport={{ once: true }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, minWidth: 140 }}> 
            <Typography variant="h4" fontWeight={900} color="primary"><StarIcon sx={{ verticalAlign: 'middle', color: '#ffaa22' }} /> <CountUp end={48} /></Typography>
            <Typography fontWeight={700}>Avg Rating (4.8)</Typography>
          </Paper>
        </motion.div>
      </Box>

      {/* Platform features with small hover 3D cards */}
      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3, textAlign: 'center' }}>Platform Highlights</Typography>
      <Grid container spacing={3} justifyContent="center" mb={6}>
        {[
          { icon: <StarIcon />, title: 'Gamified Learning', desc: 'Earn badges and certificates.' },
          { icon: <GroupsIcon />, title: 'Expert Mentorship', desc: 'Guidance from industry leaders.' },
          { icon: <SchoolIcon />, title: 'Live Classes', desc: 'Interactive workshops and projects.' },
          { icon: <UpdateIcon />, title: 'Updated Content', desc: 'Always career-relevant.' }
        ].map((f, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div whileHover={{ scale: 1.03, y: -6 }} whileTap={{ scale: 0.99 }}>
              <Card elevation={6} sx={{ p: 2, borderRadius: 3, height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ fontSize: 34 }}>{f.icon}</Box>
                  <Typography fontWeight={800} sx={{ mt: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Team gallery - layered cards with tilt and entrance animation */}
      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3, textAlign: 'center' }}>Meet Our Team</Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamImages.map((person, idx) => (
          <Grid item xs={6} sm={4} md={3} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.12 }}>
              <Tooltip title={person.role} arrow>
                <Card elevation={8} sx={{ width: 180, borderRadius: 3, overflow: 'hidden', cursor: 'pointer', transformStyle: 'preserve-3d' }}>
                  <Box sx={{ position: 'relative', height: 170 }}>
                    <img src={person.url} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* subtle overlay */}
                    <Box sx={{ position: 'absolute', left: 8, bottom: 8, bgcolor: 'rgba(0,0,0,0.45)', color: '#fff', px: 1.2, py: 0.6, borderRadius: 1 }}>{person.role}</Box>
                  </Box>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography fontWeight={800} color="primary">{person.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{person.role}</Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Testimonials carousel with glass card */}
      <Box sx={{ mt: 6, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={800} color="primary" sx={{ mb: 2, textAlign: 'center' }}>What learners say</Typography>
        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <Box key={i} sx={{ px: 2 }}>
              <Paper sx={{ p: 4, borderRadius: 3, backdropFilter: 'blur(6px)', boxShadow: 8 }}>
                <Typography sx={{ fontSize: '1.05rem', mb: 1 }}>{t.text}</Typography>
                <Typography variant="caption" color="text.secondary">— {t.user}</Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Partners */}
      <Box sx={{ mt: 8, mb: 6, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={800} color="primary" sx={{ mb: 2 }}>Trusted By</Typography>
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
          {partners.map((p, i) => (
            <Box key={i} sx={{ textAlign: 'center' }}>
              <img src={p.logo} alt={p.name} width={64} style={{ borderRadius: 12, filter: 'grayscale(0.2)', boxShadow: '0 6px 18px rgba(16,24,40,0.06)' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>{p.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Journey timeline simplified */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3, textAlign: 'center' }}>Our Journey</Typography>
        <Grid container spacing={3} justifyContent="center">
          {journey.map((ev, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }} elevation={4}>
                  <Avatar sx={{ bgcolor: '#1e40af', mx: 'auto' }}>{ev.icon}</Avatar>
                  <Typography fontWeight={800} sx={{ mt: 1 }}>{ev.year}</Typography>
                  <Typography fontWeight={700} color="primary">{ev.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{ev.desc}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}
