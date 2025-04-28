import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const SectionHeaders = ({ id = '', title, isError = false, errorMessage, ...props }) => {
  return (
    <Grid item xs={12}>
      <Typography
        htmlFor={id}
        component="label"
        variant="subtitle1"
        sx={{
          color: 'var(--primary-color)',
          alignItems: 'center',
          fontSize: '1.125rem',
          fontFamily: 'inter-semibold',
        }}
        {...props}
      >
        {title}
      </Typography>
      {isError && <ErrorMessage errorMessage={errorMessage} />}
    </Grid>
  );
};

SectionHeaders.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default SectionHeaders;
