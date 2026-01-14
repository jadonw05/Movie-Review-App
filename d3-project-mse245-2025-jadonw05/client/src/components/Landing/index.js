import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url('https://hcdevilsadvocate.com/wp-content/uploads/2019/01/netflix-background-9.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1,
        }}
      />

      <Box sx={{ zIndex: 2, textAlign: 'center', p: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#e50914' }}>
          🎬 ReviewFlix
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Share your thoughts, see what others are saying, and enjoy trailers of all your favorite films!
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/Review"
          sx={{
            backgroundColor: '#e50914',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#b81d24',
            },
          }}
        >
          Start Reviewing
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
