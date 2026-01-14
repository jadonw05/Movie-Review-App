import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Review = () => {
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [confirmationMessage, setConfirmationMessage] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [userID] = React.useState('1');

  const handleMovieChange = (value) => {
    setSelectedMovie(value);
    setErrors((prev) => ({ ...prev, movie: '' }));
  };

  const handleTitleChange = (value) => {
    setEnteredTitle(value);
    setErrors((prev) => ({ ...prev, title: '' }));
  };

  const handleBodyChange = (value) => {
    setEnteredReview(value);
    setErrors((prev) => ({ ...prev, review: '' }));
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    setErrors((prev) => ({ ...prev, rating: '' }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    let hasErrors = false;

    if (!selectedMovie) {
      newErrors.movie = 'Select your movie';
      hasErrors = true;
    }
    if (!enteredTitle.trim()) {
      newErrors.title = 'Enter your review title';
      hasErrors = true;
    }
    if (!enteredReview.trim()) {
      newErrors.review = 'Enter your review';
      hasErrors = true;
    }
    if (!selectedRating) {
      newErrors.rating = 'Select the rating';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieID: selectedMovie.id,
          userID: userID,
          reviewTitle: enteredTitle,
          reviewContent: enteredReview,
          reviewScore: selectedRating
        })
      })
        .then(res => res.json())
        .then(data => {
          setConfirmationMessage(
            `Your review has been received\n` +
            `Movie: ${selectedMovie.name} (${selectedMovie.year})\n` +
            `Review Title: ${enteredTitle}\n` +
            `Review Body: ${enteredReview}\n` +
            `Rating: ${selectedRating}`
          );
        })
        .catch(err => {
          console.error('Error submitting review:', err);
          setConfirmationMessage('Error submitting review');
        });
    } else {
      setConfirmationMessage('');
    }
  };

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://hcdevilsadvocate.com/wp-content/uploads/2019/01/netflix-background-9.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 0
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: 500,
          backgroundColor: 'rgba(28, 28, 28, 0.95)',
          color: '#fff',
          padding: 4,
          borderRadius: 2,
          zIndex: 1
        }}
      >
        <Grid item>
          <Typography variant="h3" sx={{ color: '#e50914' }}>Review a Movie</Typography>
        </Grid>

        <Grid item sx={{ width: '100%' }}>
          <MovieSelection
            movies={movies}
            selectedMovie={selectedMovie}
            setSelectedMovie={handleMovieChange}
            error={errors.movie}
            darkMode={true}
          />
        </Grid>

        <Grid item sx={{ width: '100%' }}>
          <ReviewTitle
            enteredTitle={enteredTitle}
            setEnteredTitle={handleTitleChange}
            error={errors.title}
            darkMode={true}
          />
        </Grid>

        <Grid item sx={{ width: '100%' }}>
          <ReviewBody
            enteredReview={enteredReview}
            setEnteredReview={handleBodyChange}
            error={errors.review}
            darkMode={true}
          />
        </Grid>

        <Grid item sx={{ width: '100%' }}>
          <ReviewRating
            selectedRating={selectedRating}
            setSelectedRating={handleRatingChange}
            error={errors.rating}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            id="submit-button"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#e50914',
              '&:hover': {
                backgroundColor: '#b81d24'
              }
            }}
          >
            Submit
          </Button>
        </Grid>

        {confirmationMessage && (
          <Grid item sx={{ mt: 2, width: '100%' }}>
            <Typography sx={{ whiteSpace: 'pre-line', color: 'lightgreen' }} id="confirmation-message">
              {confirmationMessage}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Review;
