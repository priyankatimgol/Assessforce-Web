import { Snackbar, Alert, IconButton } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
//import CheckCircleIcon from '../assets/images/check_filled_circle_ASF.svg';

const GlobalSnackbar = () => {
  const { snackbar, hideSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.severity === 'success' ? 5000 : null}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={snackbar.severity}
        variant="outlined"
        icon={snackbar.severity === 'success' ? <CheckCircleRoundedIcon /> : <ErrorIcon />}
        sx={{
          width: '100%',
          minWidth: {
            xs: 'auto',
            sm: '28.125rem',
          },
          lineHeight: '1.45rem',
          border: `0.063rem solid ${snackbar.severity === 'success' ? 'var(--success-color)' : 'var(--danger-color)'}`,
          backgroundColor:
            snackbar.severity === 'success' ? 'var(--toast-success-bg)' : 'var(--toast-error-bg)',
          boxShadow: '0rem 0.25rem 0.625rem var(--shadow-color)',
          borderRadius: '.3rem',
          borderLeftWidth: '.4rem',
          alignItems: 'flex-start',
          color: snackbar.severity === 'success' ? 'var(--toast-success-text)' : 'var(--toast-error-text)',
        }}
        action={
          <IconButton aria-label="close" color="inherit" onClick={hideSnackbar}
          sx={{ // Override the hover effect from toast
            '@media (hover: hover)': {
              '&:hover .MuiSvgIcon-root': {
                color: 'inherit !important',
              },
            },
          }}>
            <ClearRoundedIcon
              sx={{
                color:
                  snackbar.severity === 'success' ? 'var(--toast-success-text)' : 'var(--toast-error-text)',
              }}
            />
          </IconButton>
        }
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
