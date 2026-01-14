import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';

const trailers = [
  { movieID: 969, title: '12 Angry Men', youtubeId: 'TEN-2uTi2c0' },
  { movieID: 1711, title: '2001: A Space Odyssey', youtubeId: 'oR_e9y-bka0' },
  { movieID: 2136, title: '3 Ninjas: High Noon at Mega Mountain', youtubeId: 'isr7ENiGkao' },
  { movieID: 10830, title: 'Alien', youtubeId: 'jQ5lPt9edzQ' },
  { movieID: 10920, title: 'Aliens', youtubeId: 'oSeQQlaCZgU' },
];

// Component for watching movie trailers and leaving reviews
export default function MyPage({ userID }) {
  const [selectedMovieID, setSelectedMovieID] = useState(trailers[0].movieID);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchReviews = () => {
    fetch('/api/trailers')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched trailer reviews:', data);
        setReviews(data);
      })
      .catch(console.error);
  };

  // Fetch existing reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit a new review to the backend if comment and rating are valid
  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) {
      alert('Please enter a comment and rating');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/trailers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieID: selectedMovieID, userID, comment, rating }),
      });
      const json = await res.json();
      if (res.ok) {
        fetchReviews();
        setComment('');
        setRating(0);
      } else {
        alert(json.error || 'Failed to submit comment');
      }
    } catch (err) {
      console.error(err);
      alert('Server error submitting comment');
    }
    setLoading(false);
  };

  const selectedTrailer = trailers.find((t) => t.movieID === selectedMovieID);
  const filteredReviews = reviews.filter((r) => r.movieID === selectedMovieID);

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      {/* Page title */}
      <Typography variant="h4" gutterBottom sx={{ color: '#E50914', fontWeight: 'bold' }}>
        Movie Trailers & Reviews
      </Typography>

      {/* Dropdown to select which trailer to watch and review */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="select-trailer-label" sx={{ color: 'gray' }}>
          Select Trailer
        </InputLabel>
        <Select
          labelId="select-trailer-label"
          value={selectedMovieID}
          label="Select Trailer"
          onChange={(e) => setSelectedMovieID(Number(e.target.value))}
          sx={{ color: 'white', backgroundColor: '#2c2c2c' }}
        >
          {trailers.map((t) => (
            <MenuItem key={t.movieID} value={t.movieID} sx={{ color: 'white', backgroundColor: '#2c2c2c' }}>
              {t.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Embedded YouTube trailer based on the selected movie */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${selectedTrailer.youtubeId}`}
          title={selectedTrailer.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>

      {/* Comment input and star rating */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#1f1f1f', color: 'white' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#E50914' }}>
          Leave a Comment & Rating
        </Typography>
        <TextField
          label="Comment"
          multiline
          rows={3}
          fullWidth
          variant="filled"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2, input: { color: 'white' }, textarea: { color: 'white' } }}
          InputProps={{ style: { backgroundColor: '#2c2c2c' } }}
          InputLabelProps={{ style: { color: 'gray' } }}
        />
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor: '#E50914', '&:hover': { backgroundColor: '#b20710' } }}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ color: '#E50914' }}>
        Recent Comments for "{selectedTrailer.title}"
      </Typography>
      {filteredReviews.length === 0 && (
        <Typography sx={{ color: 'gray' }}>No comments yet for this trailer.</Typography>
      )}

      {/* Display a list of reviews for the selected trailer */}
      <List>
        {filteredReviews.map((review, idx) => (
          <ListItem key={idx} alignItems="flex-start" divider sx={{ color: 'white' }}>
            <ListItemText
              primary={
                <>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                    {review.comment}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" sx={{ mb: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'gray', fontStyle: 'italic' }}>
                    – Anonymous
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}