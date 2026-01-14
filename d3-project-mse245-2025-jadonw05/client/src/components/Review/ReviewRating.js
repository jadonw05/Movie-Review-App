import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';

const ReviewRating = (props) => {
  const handleChange = (event) => {
    props.setSelectedRating(event.target.value);
  };

  return (
    <>
      <Typography sx={{ color: '#fff', mb: 1 }}>
        Rate the movie
      </Typography>

      <FormControl component="fieldset" error={Boolean(props.error)}>
        <RadioGroup
          id="review-rating"
          row
          value={props.selectedRating}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <FormControlLabel
              key={num}
              value={String(num)}
              control={<Radio sx={{
                color: '#ccc',
                '&.Mui-checked': {
                  color: '#e50914',
                },
              }} />}
              label={<Typography sx={{ color: '#fff' }}>{num}</Typography>}
            />
          ))}
        </RadioGroup>
        {props.error && (
          <FormHelperText>{props.error}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default ReviewRating;
