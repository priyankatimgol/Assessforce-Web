import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '../assets/images/check_filled_circle_ASF.svg';
import { useState, useEffect } from 'react';

const SnackbarAlert = ({ open, handleClose, message = '', severity = 'error', duration = 5000 }) => {
  const [currentSeverity, setCurrentSeverity] = useState(severity);
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    if (open) {
      setCurrentSeverity(severity);
      setCurrentMessage(message);
    }
  }, [open, severity, message]);

  const handleClosePopup = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleClose && handleClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration ? duration : null}
      onClose={handleClosePopup}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={currentSeverity}
        variant="outlined"
        icon={
          currentSeverity === 'success' ? (
            <img src={CheckCircleIcon} alt="Success" height={20} width={20} />
          ) : (
            <ErrorIcon />
          )
        }
        sx={{
          width: '100%',
          minWidth: {
            xs: 'auto',
            sm: '28.125rem',
          },
          border: `0.063rem solid ${currentSeverity === 'success' ? 'var(--success-color)' : 'var(--danger-color)'}`,
          backgroundColor:
            currentSeverity === 'success' ? 'var(--toast-success-bg)' : 'var(--toast-error-bg)',
          boxShadow: '0rem 0.25rem 0.625rem var(--shadow-color)',
          borderRadius: '.3rem',
          borderLeftWidth: '.4rem',
          alignItems: 'flex-start',
          color: currentSeverity === 'success' ? 'var(--toast-success-text)' : 'var(--toast-error-text)',
        }}
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleClosePopup}>
            <CloseIcon
              sx={{
                color:
                  currentSeverity === 'success' ? 'var(--toast-success-text)' : 'var(--toast-error-text)',
              }}
            />
          </IconButton>
        }
      >
        {currentMessage}
      </Alert>
    </Snackbar>
  );
};

SnackbarAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.string,
  duration: PropTypes.number,
};

export default SnackbarAlert;
