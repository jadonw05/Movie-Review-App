import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const MovieSelection = (props) => {
  const handleChange = (event) => {
    props.setSelectedMovie(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mb: 3 }}>
      <Typography sx={{ color: '#fff', mb: 1 }}>
        Select the movie
      </Typography>

      <TextField
        select
        id="movie-select"
        label="Movie"
        fullWidth
        value={props.selectedMovie}
        onChange={handleChange}
        error={Boolean(props.error)}
        helperText={props.error}
        sx={{
          input: { color: '#fff' },
          label: { color: '#ccc' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ccc' },
            '&:hover fieldset': { borderColor: '#fff' },
            '&.Mui-focused fieldset': { borderColor: '#e50914' },
          },
          '& .MuiSelect-select': {
            color: '#fff',
            backgroundColor: '#333',
          },
          '& .MuiPaper-root': {
            backgroundColor: '#222',
            color: '#fff',
          },
        }}
      >
        {props.movies.map((movie) => (
          <MenuItem key={movie} value={movie} sx={{ backgroundColor: '#222', color: '#fff' }}>
            {movie.name} ({movie.year})
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default MovieSelection;
