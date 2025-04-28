import {} from 'react';
import PropTypes from 'prop-types';
import { Grid, InputAdornment, TextField, Typography } from '@mui/material';

const CombinedTextFields = ({
  label = 'Office',
  mainInputValue = '',
  extInputValue = '01234',
  mainInputProps = {},
  extInputProps = {},
  containerStyle = {},
}) => {
  return (
    <Grid container>
      <Typography className="input-label" component="label">
        {label}
      </Typography>
      <Grid
        container
        spacing={0}
        style={{ border: '0.063rem solid gray', borderRadius: '0.25rem', ...containerStyle }}
      >
        {/* Main Input Field */}
        <Grid item xs={12} sm={7}>
          <TextField
            label={label}
            variant="outlined"
            fullWidth
            value={mainInputValue}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              sx: {
                '& fieldset': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 'none',
                },
                '&:focus-within fieldset': {
                  borderColor: 'gray', // Keeps the border color gray on focus
                },
                '&:focus': {
                  outline: 'none', // Prevents focus outline
                },
              },
              ...mainInputProps.InputProps,
            }}
            style={{ outline: 'none', ...mainInputProps.style }}
            {...mainInputProps}
          />
        </Grid>

        {/* Extension Input Field */}
        <Grid item xs={12} sm={5}>
          <TextField
            variant="outlined"
            fullWidth
            value={extInputValue}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              startAdornment: <InputAdornment position="start">Ext.</InputAdornment>,
              sx: {
                '& fieldset': {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeft: 'none',
                },
                '&:focus-within fieldset': {
                  borderColor: 'gray', // Keeps the border color gray on focus
                },
                '&:focus': {
                  outline: 'none', // Prevents focus outline
                },
              },
              ...extInputProps.InputProps,
            }}
            {...extInputProps}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

CombinedTextFields.propTypes = {
  label: PropTypes.string,
  mainInputValue: PropTypes.string,
  extInputValue: PropTypes.string,
  mainInputProps: PropTypes.object,
  extInputProps: PropTypes.object,
  containerStyle: PropTypes.object,
};

export default CombinedTextFields;
