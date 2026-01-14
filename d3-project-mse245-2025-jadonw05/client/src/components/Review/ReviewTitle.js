import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ReviewTitle = (props) => {
  const handleChange = (event) => {
    props.setEnteredTitle(event.target.value);
  };

  return (
    <>
      <Typography sx={{ color: '#fff', mb: 1 }}>
        Enter a title for your review
      </Typography>

      <TextField
        id="review-title"
        fullWidth
        value={props.enteredTitle}
        onChange={handleChange}
        error={Boolean(props.error)}
        helperText={props.error}
        placeholder="e.g., My New Favourite Film of 2025!"
        sx={{
          input: { color: '#fff' },
          label: { color: '#ccc' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ccc' },
            '&:hover fieldset': { borderColor: '#fff' },
            '&.Mui-focused fieldset': { borderColor: '#e50914' },
            backgroundColor: '#222',
          },
        }}
      />
    </>
  );
};

export default ReviewTitle;
