import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Divider
} from '@mui/material';

const Search = () => {
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, actor, director }),
      });
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <Box p={4} sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#E50914', fontWeight: 'bold' }}>
        Search for Movies
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: 'gray' }}>
        To see all films just click the "Find Movies" button while all the textboxes are empty.
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="search-title"
            fullWidth
            variant="filled"
            label="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#2c2c2c', color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'gray' },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="search-actor"
            fullWidth
            variant="filled"
            label="Actor Full Name"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#2c2c2c', color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'gray' },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="search-director"
            fullWidth
            variant="filled"
            label="Director Full Name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            InputProps={{
              style: { backgroundColor: '#2c2c2c', color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'gray' },
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          backgroundColor: '#E50914',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#b20710',
          },
        }}
      >
        Find Movies
      </Button>

      <Box mt={4}>
        {results.length > 0 ? (
          results.map((movie, idx) => (
            <Paper
              key={idx}
              sx={{
                backgroundColor: '#1e1e1e',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                color: 'white',
              }}
              elevation={3}
            >
              <Typography variant="h6" sx={{ color: '#E50914' }}>
                {movie.title}
              </Typography>
              <Typography><strong>Directors:</strong> {movie.directors}</Typography>
              <Typography><strong>Average Rating:</strong> {movie.avgRating}</Typography>
              <Typography><strong>Reviews:</strong></Typography>
              <Divider sx={{ backgroundColor: 'gray', my: 1 }} />
              {movie.reviews.length > 0 ? (
                movie.reviews.map((r, i) => (
                  <Typography key={i} sx={{ ml: 2 }}>– {r}</Typography>
                ))
              ) : (
                <Typography sx={{ ml: 2 }}>No reviews available.</Typography>
              )}
            </Paper>
          ))
        ) : (
          <Typography sx={{ color: 'gray' }}>No results yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Search;
