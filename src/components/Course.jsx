import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Box, Grid, Typography, Card, CardMedia, CardContent, Button, Chip, Avatar, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Rating,
  Badge, InputBase, MenuItem, Select, FormControl, InputLabel, Divider, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';

// Local uploaded 3D logo used as mentor avatar fallback (path from your uploaded file)
const localMentorAvatar = '/mnt/data/A_digital_vector_illustration_features_a_logo_for_.png';

// sample course data with extra fields
const initialCourses = [
  {
    id: 1,
    title: 'Python Programming',
    img: 'https://images.unsplash.com/photo-1690683789978-3cf73960d650?q=80&w=1509&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Learn Python with hands-on coding and real-world projects.',
    category: 'Programming',
    mentor: 'Aditi Sharma',
    level: 'Beginner',
    duration: '3 months',
    price: 1499,
    rating: 4.8,
    reviews: 230,
    tags: ['Bestseller', 'Project-Based'],
    syllabus: [
      'Python basics', 'OOP', 'File handling', 'Web scraping', 'Projects'
    ]
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    img: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Master user interface and experience design in Figma.',
    category: 'Design',
    mentor: 'Sara Khan',
    level: 'Intermediate',
    duration: '2 months',
    price: 1999,
    rating: 4.6,
    reviews: 120,
    tags: ['New'],
    syllabus: ['Design fundamentals','Figma','Prototyping','Portfolio']
  },
  {
    id: 3,
    title: 'Data Science Bootcamp',
    img: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Data analysis, machine learning & Python projects.',
    category: 'Data Science',
    mentor: 'Nikhil Verma',
    level: 'Advanced',
    duration: '4 months',
    price: 4999,
    rating: 4.7,
    reviews: 320,
    tags: ['Trending','Bestseller'],
    syllabus: ['Statistics','Pandas','ML models','Deployment']
  },
  {
    id: 4,
    title: 'Web Development Fullstack',
    img: 'https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Frontend & Backend skills with React, Node & MongoDB.',
    category: 'Web',
    mentor: 'Adarsh Gupta',
    level: 'Intermediate',
    duration: '5 months',
    price: 3999,
    rating: 4.9,
    reviews: 540,
    tags: ['Bestseller'],
    syllabus: ['HTML/CSS','React','Node','DB','Projects']
  },
  {
    id: 5,
    title: 'Cloud Computing',
    img: 'https://plus.unsplash.com/premium_photo-1733306493254-52b143296396?q=80&w=1093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'AWS, Azure, GCP, and serverless technologies.',
    category: 'Cloud',
    mentor: 'Maya Sen',
    level: 'Beginner',
    duration: '2 months',
    price: 2499,
    rating: 4.5,
    reviews: 90,
    tags: [],
    syllabus: ['Cloud Basics','AWS Core','Serverless','Projects']
  },
  {
    id: 6,
    title: 'Machine Learning Advanced',
    img: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Deep learning & AI with hands-on assignments.',
    category: 'AI/ML',
    mentor: 'Ritesh Jain',
    level: 'Advanced',
    duration: '4 months',
    price: 5999,
    rating: 4.6,
    reviews: 210,
    tags: ['Trending'],
    syllabus: ['Neural Nets','CNN/RNN','Optimization','Projects']
  }
];

// small tilt hook
function useTilt(active = true) {
  const ref = React.useRef(null);
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
    const handleLeave = () => { el.style.transform = ''; el.style.boxShadow = ''; };
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

// Per card component
function CourseCard({ course, idx, handleExplore, openMentor, setSelected, setOpenBuy, handleLike, handleWishlist, liked, wishlist }) {
  const tiltRef = useTilt(true);
  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.04 }}>
      <Card ref={tiltRef} elevation={6} sx={{ p: 0, borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', transformStyle: 'preserve-3d' }}>
        {/* Ribbon tags */}
        {course.tags && course.tags.length > 0 && (
          <Box sx={{ position: 'absolute', zIndex: 9, mt: 1, ml: 1 }}>
            {course.tags.slice(0, 2).map((t, i) => (
              <Chip key={i} label={t} size="small" icon={t === 'Bestseller' ? <WhatshotIcon /> : null} sx={{ mr: 1, bgcolor: t === 'Bestseller' ? '#ffcc00' : '#1e40af', color: t === 'Bestseller' ? '#000' : '#fff', fontWeight: 700 }} />
            ))}
          </Box>
        )}

        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" image={course.img} alt={course.title} sx={{ height: 140, objectFit: 'cover' }} />
          <Box sx={{ position: 'absolute', right: 8, top: 8, display: 'flex', gap: 1 }}>
            <Tooltip title={liked && liked[course.id] ? 'Remove like' : 'Like'}>
              <IconButton onClick={() => handleLike(course.id)} size="small" sx={{ bgcolor: '#fff' }}>
                {liked && liked[course.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title={wishlist && wishlist[course.id] ? 'Remove from wishlist' : 'Add to wishlist'}>
              <IconButton onClick={() => handleWishlist(course.id)} size="small" sx={{ bgcolor: wishlist && wishlist[course.id] ? '#ffecec' : '#fff' }}>
                <Badge badgeContent={wishlist && wishlist[course.id] ? '♥' : 0} color="error">
                  <FavoriteBorderIcon sx={{ transform: wishlist && wishlist[course.id] ? 'scale(1.05)' : '' }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="h6" fontWeight={800} color="primary">{course.title}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{course.duration}</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Chip label={course.level} size="small" />
          </Stack>

          <Typography variant="body2" sx={{ color: '#334', mb: 1 }}>{course.description}</Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Rating value={Math.round(course.rating)} readOnly size="small" precision={0.5} />
            <Typography variant="caption">{course.rating} • {course.reviews} reviews</Typography>
          </Stack>

        </CardContent>

        <Box sx={{ px: 2, pb: 2, width: '100%' }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', flexWrap: 'nowrap' }}>
            <Tooltip title="Syllabus">
              <IconButton onClick={() => { setSelected(course); setOpenBuy(true); }} sx={{ border: '1px solid #e8eefc', bgcolor: '#fff', color: '#1e40af', height: 40, width: 40 }}>
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
            <Button variant="contained" sx={{ flex: 1, minWidth: 0, bgcolor: '#1e40af', height: 44, borderRadius: 2, whiteSpace: 'nowrap' }} onClick={() => handleExplore(course)}>
              Buy ₹{course.price}
            </Button>
            <Tooltip title="Mentor">
              <IconButton onClick={() => openMentor(course)} sx={{ borderRadius: 1.5, border: '2px solid #1e40af', color: '#1e40af', height: 44, width: 44, bgcolor: '#fff', ml: 1, '&:hover': { borderColor: '#153a8a', background: '#eef5ff' } }} aria-label={`Mentor for ${course.title}`}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Card>
    </motion.div>
  );
}

export default function CourseEnhanced() {
  const [courses] = useState(initialCourses);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [liked, setLiked] = useState(() => ({}));
  const [wishlist, setWishlist] = useState(() => ({}));
  const [openBuy, setOpenBuy] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [mentorData, setMentorData] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 4;

  const categories = useMemo(() => ['All', ...new Set(courses.map(c => c.category))], [courses]);

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || c.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [courses, query, category]);

  const paginated = filtered.slice(0, page * perPage);

  const handleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  const handleWishlist = (id) => setWishlist(prev => ({ ...prev, [id]: !prev[id] }));

  const handleExplore = (course) => {
    setSelected(course);
    setOpenBuy(true);
  };
  const closeBuy = () => { setOpenBuy(false); setSelected(null); };

  const openMentor = (course) => { setMentorData({ name: course.mentor, course: course.title, avatar: localMentorAvatar }); setMentorOpen(true); };
  const closeMentor = () => { setMentorOpen(false); setMentorData(null); };

  const loadMore = () => setPage(p => p + 1);

  // per-card tilt refs are created inside CourseCard via useTilt()

  return (
    <Box sx={{ width: '100%', py: 6, px: { xs: 2, md: 6 }, bgcolor: '#f3f7ff' }}>

      <Typography variant="h4" fontWeight={800} color="primary" textAlign="center" sx={{ mb: 3 }}>All Courses</Typography>

      {/* Search & Filters */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fff', px: 1.5, borderRadius: 2, boxShadow: 2 }}>
          <SearchIcon sx={{ color: '#1e40af', mr: 1 }} />
          <InputBase placeholder="Search courses..." value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} sx={{ width: 280 }} />
        </Box>
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={e => { setCategory(e.target.value); setPage(1); }}>
            {categories.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <Button onClick={() => { setQuery(''); setCategory('All'); setPage(1); }}>Reset</Button>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3} justifyContent="center">

                

        {paginated.map((course, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <CourseCard
              course={course}
              idx={idx}
              handleExplore={handleExplore}
              openMentor={openMentor}
              setSelected={setSelected}
              setOpenBuy={setOpenBuy}
              handleLike={handleLike}
              handleWishlist={handleWishlist}
              liked={liked}
              wishlist={wishlist}
            />
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {paginated.length < filtered.length ? (
          <Button onClick={loadMore} variant="contained">Load more</Button>
        ) : (
          <Typography variant="caption" color="text.secondary">No more courses</Typography>
        )}
      </Box>

      {/* Purchase / Explore Dialog (also used for Syllabus) */}
      <Dialog open={openBuy} onClose={closeBuy} fullWidth maxWidth="sm">
        <DialogTitle>{selected ? selected.title : 'Course'}</DialogTitle>
              <DialogContent>
          {selected && (
            <>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Avatar src={selected.img} variant="rounded" sx={{ width: 76, height: 76, border: '3px solid #1e40af', boxShadow: '0 6px 18px #1e40af22' }} />
                <Box>
                  <Typography fontWeight={800}>{selected.title}</Typography>
                  <Typography variant="body2">Mentor: {selected.mentor}</Typography>
                  <Typography variant="body2">Duration: {selected.duration} • Level: {selected.level}</Typography>
                </Box>
              </Stack>

              <Typography fontWeight={700} sx={{ mt: 1 }}>Syllabus</Typography>
              <Box sx={{ mt: 1 }}>
                {selected.syllabus.map((s, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip label={i + 1} size="small" />
                    <Typography>{s}</Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

            <form
  onSubmit={(e) => {
    e.preventDefault();

    // redirect to payment page with course id or data
    window.location.href = `/payment?courseId=${selected.id}&title=${encodeURIComponent(selected.title)}&price=${selected.price}`;
  }}
>

                <TextField label="Your name" required fullWidth sx={{ mb: 2 }} />
                <TextField label="Email" required type="email" fullWidth sx={{ mb: 2 }} />
                <Button type="submit" variant="contained" fullWidth>Request Enrollment</Button>
              </form>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeBuy}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Mentor Dialog */}
      <Dialog open={mentorOpen} onClose={closeMentor}>
        <DialogTitle>Mentor Profile</DialogTitle>
        <DialogContent>
          {mentorData && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={mentorData.avatar} sx={{ width: 84, height: 84, border: '3px solid #1e40af', boxShadow: '0 8px 20px #1e40af22' }} />
              <Box>
                <Typography fontWeight={800}>{mentorData.name}</Typography>
                <Typography variant="body2">Course: {mentorData.course}</Typography>
                <Typography variant="body2">Experience: 6+ years</Typography>
                <Typography variant="body2">Specializes in hands-on mentoring & career guidance.</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeMentor}>Close</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
