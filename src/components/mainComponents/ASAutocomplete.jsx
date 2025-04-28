import { Autocomplete, TextField, Typography, FormHelperText, FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useContext, useId, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ASAutocomplete = ({
  id,
  width = 300,
  label,
  isRequired = false,
  options,
  isError = false,
  errorMessage = '',
  isErrorIcon = true,
  defaultValue,
  ...props
}) => {
  const uniqueId = useId();
  const inputId = id || `${label?.replaceAll(' ', '')}-${uniqueId}`;
  const { mode } = useContext(ThemeContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <FormControl variant="outlined" fullWidth style={{ marginBottom: '8px', width: width }}>
      {label && (
        <Typography className="input-label" component="label" htmlFor={inputId}>
          {label}
          {isRequired && <span>*</span>}
        </Typography>
      )}
      <Autocomplete
        id={inputId}
        aria-label={inputId}
        disablePortal
        options={options}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '.3rem',
            // borderColor: isError ? 'var(--danger-color)' : '',
            height: '51px',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // borderColor: isError ? 'var(--danger-color)' : '',
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: !isError && mode === 'dark' ? 'var(--pure-color)' : 'var(--primary-color-hover)',
          },
        }}
        onOpen={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(!isMenuOpen)}
        popupIcon={<ExpandMoreRoundedIcon />}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select"
            size="medium"
            InputProps={{
              ...params.InputProps,
              style: {
                borderRadius: '.3rem',
                fontFamily: 'inter-regular',
                height: '3rem',
                // border: isError ? '0.063rem solid var(--danger-color)' : '',
              },
            }}
            error={isError}
          />
        )}
        defaultValue={defaultValue}
        size="medium"
        {...props}
      />
      {isError && (
        <FormHelperText
          style={{ marginLeft: 0, color: 'var(--danger-color)', fontFamily: 'inter-regular' }}
          className="items-center"
        >
          {isErrorIcon && (
            <>
              <ErrorIcon fontSize="small" color="error" style={{ marginRight: '.2rem' }} />
            </>
          )}
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

ASAutocomplete.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  options: PropTypes.array,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  isErrorIcon: PropTypes.bool,
  defaultValue: PropTypes.any,
};

export default ASAutocomplete;
