import {} from 'react';
import { FormHelperText } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errorMessage }) => {
  return (
    <FormHelperText
      style={{
        marginLeft: '0',
        color: 'var(--danger-color)',
        fontFamily: 'inter-regular',
        alignItems: 'flex-start',
        fontSize: '0.75rem',
      }}
      className="items-center"
    >
      <ErrorIcon
        fontSize="small"
        color="var(--danger-color)"
        style={{ marginRight: '.2rem', color: 'var(--danger-color)' }}
      />
      {errorMessage}
    </FormHelperText>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
