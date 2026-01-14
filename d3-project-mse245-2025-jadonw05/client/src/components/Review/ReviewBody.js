import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ReviewBody = (props) => {
  const handleChange = (event) => {
    if (event.target.value.length <= 200) {
      props.setEnteredReview(event.target.value);
    }
  };

  return (
    <>
      <Typography sx={{ color: '#fff', mb: 1 }}>
        Enter your review
      </Typography>

      <TextField
        id="review-body"
        fullWidth
        multiline
        rows={5}
        value={props.enteredReview}
        onChange={handleChange}
        error={Boolean(props.error)}
        helperText={props.error}
        placeholder="Enter your review here (max 200 characters)"
        sx={{
          input: { color: '#fff' },
          textarea: { color: '#fff' },
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

export default ReviewBody;
