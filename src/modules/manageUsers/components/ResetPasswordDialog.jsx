import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Popover, Tooltip, IconButton } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ASButton from '../../../components/mainComponents/ASButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordAction,
  resetForgotPasswordState,
} from '../../../redux/slice/authSlice/Authentication';
import { useSnackbar } from '../../../context/SnackbarContext';
import { ThemeContext } from '../../../context/ThemeContext';

const ResetPasswordDialog = ({ data, status, anchorEl, handleCloseMenu }) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const { mode } = useContext(ThemeContext);

  const { forgotPasswordDetails } = useSelector((state) => state?.authenticationSlice);

  useEffect(() => {
    if (forgotPasswordDetails?.status === 200 || forgotPasswordDetails?.status === 'success') {
      dispatch(resetForgotPasswordState());
      handleCloseMenu();
    } else {
      if (forgotPasswordDetails?.status === 'error' || forgotPasswordDetails?.status === 'error') {
        dispatch(resetForgotPasswordState());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordDetails]);

  const handleForgotPassword = () => {
    const payload = {
      username: data,
      email_type: 'account_reactivation',
    };
    const actionResult = dispatch(forgotPasswordAction(payload));

    actionResult
      .unwrap()
      .then((result) => {
        showSnackbar({
          message: result?.message,
          severity: result?.status === 'error' ? 'error' : 'success',
        });
      })
      .catch((error) => {
        showSnackbar({
          message: error?.message || 'An error occurred, please try again',
          severity: 'error',
        });
      });
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleForgotPassword();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'reset-password-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        transform: { xs: 'translateX(0)', md: 'translateX(0)' },
        marginTop: '55px',
        minHeight: '200px',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 24px', width: '320px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{ padding: '0 0 1rem 0', fontFamily: 'inter-semibold' }}>Reset Password</Typography>
          <Tooltip title="Close">
            {/* Need to add margin in -ve to adjust figma stylings. */}
            <IconButton aria-haspopup="true" onClick={handleCloseMenu} sx={{marginTop: '-16px'}}>
              <ClearRoundedIcon style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            </IconButton>
          </Tooltip>
        </div>
        {status === 'Active' ? (
          <div
            style={{
              fontSize: '0.875rem',
              color: 'var(--heading-color)',
              fontFamily: 'inter-regular',
            }}
          >
            <Typography>An email with a link to reset password will be sent to the user.</Typography>
            <ASButton
              variant="outlined"
              onClick={handleForgotPassword}
              onKeyDown={handleEnter}
              style={{
                width: '100%',
                margin: '1rem 0',
                textTransform: 'capitalize',
                fontWeight: 500,
                fontSize: '0.875rem',
                fontFamily: 'inter-medium',
              }}
              sx={{
                ':hover': {
                  color:
                    mode === 'light'
                      ? 'var(--primary-color)'
                      : mode === 'dark'
                        ? 'var(--pure-color)'
                        : 'var(--black-color)',
                },
              }}
            >
              Send Email
            </ASButton>
          </div>
        ) : (
          <Typography
            style={{
              color: 'var(--danger-color)',
              fontSize: '0.875rem',
              lineHeight: '20px',
              marginBottom: '1rem',
            }}
          >
            Activate the user to reset the password.
          </Typography>
        )}
      </div>
    </Popover>
  );
};

ResetPasswordDialog.propTypes = {
  data: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  handleCloseMenu: PropTypes.func.isRequired,
  resetPassword: PropTypes.bool,
};

export default ResetPasswordDialog;
