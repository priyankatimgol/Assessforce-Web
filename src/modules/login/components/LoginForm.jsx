import { useEffect, useState } from 'react';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import CustomOutlinedInput from '../../../components/CustomOutlinedInput';
import CustomButton from '../../../components/CustomButton';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  resetForgotPasswordState,
} from '../../../redux/slice/authSlice/Authentication';
import {
  DASHBOARD,
  FORGOT_PASSWORD,
  NEW_PASSWORD_WITH_EXPIRATION,
  OLD_MFA,
  SET_MFA,
  SIGN_IN,
} from '../../../utils/enums/RoutesEnums';
import userImage from '../../../assets/images/User.svg';
import { clearMfa, resetMfaMessageOnAttemptEnd, resetUserMfaStatus } from '../../../redux/slice/mfa/MfaSlice';
import { clearEventualRequest } from '../../../redux/slice/initialSlice/InitialSlice';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import { useSnackbar } from '../../../context/SnackbarContext';

const LoginForm = ({ showPassword, setShowPassword, isExistingValidationError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const { loginLoader, user, forgotPasswordDetails, forgotPasswordSuccess } = useSelector(
    (state) => state?.authenticationSlice
  );
  const { eventualRequestData } = useSelector((state) => state?.logoSlice);
  const { finalMfaMessage } = useSelector((state) => state?.mfaSlice);

  const [users, setUser] = useState({
    username: '',
    password: '',
  });
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //const [forgotPasswordSnackbarOpen, setForgotPasswordSnackbarOpen] = useState(false);

  const handleSignIn = () => {
    dispatch(clearEventualRequest());
    dispatch(resetMfaMessageOnAttemptEnd());
    dispatch(resetForgotPasswordState());
    dispatch(resetUserMfaStatus());

    let valid = true;

    if (!users.username.trim()) {
      setIsUserNameValid(true);
      valid = false;
    }

    if (!users.password.trim()) {
      setIsPasswordValid(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    const payload = {
      username: users?.username?.trim(),
      password: users.password,
    };

    //dispatch(loginUser({ payload, navigate }));
    dispatch(loginUser({ payload }))
      .unwrap()
      .then((userData) => {
        LocalStorageHelper.setUser(JSON.stringify(userData));
        // Now handle the navigation based on the result of the login action
        const data = userData.userData;
        if (data?.status === 'success') {
          if (data?.mfa_config?.mfa_settings === 'yes') {
            LocalStorageHelper.setToken(data.token);
            LocalStorageHelper.removeCSRFToken();
            if (data?.mfa_config?.new_setup) {
              navigate(SET_MFA);
            } else {
              navigate(OLD_MFA);
            }
          } else {
            const newPasswordExp = data?.is_password_expired;
            const remainingDaysLeft = data?.is_password_expired_not_now;

            LocalStorageHelper.setCSRFToken(data?.csrf_token);
            LocalStorageHelper.setLogoutToken(data?.logout_token);
            LocalStorageHelper.removeToken();
            if (newPasswordExp || remainingDaysLeft !== 0) {
              const path = NEW_PASSWORD_WITH_EXPIRATION.replace(':userId', data?.uid);
              navigate(path);
            } else {
              // if (data?.eula === 'Yes') {
              //   navigate(LICENSE_AGGREMENT);
              // } else if (data?.eula === 'No') {
              navigate(DASHBOARD);
              // }
            }
          }
        }
        else {
          if (data?.message?.warning) {
            showSnackbar({ message: data?.message?.warning, severity: 'error' }); // Use showSnackbar
          }
        }
      })
      .catch((error) => {
        // Handle any errors (optional)
      });
  };

  const handleInputChange = (field, value) => {
    setUser({ ...users, [field]: value });
    if (field === 'username' && isUserNameValid) {
      setIsUserNameValid(false);
    }
    if (field === 'password' && isPasswordValid) {
      setIsPasswordValid(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsUserNameValid(false);
      dispatch(clearMfa());
      dispatch(resetUserMfaStatus());
      // dispatch(clearEventualRequest());
      // dispatch(resetMfaMessageOnAttemptEnd());
    };
  }, [user, navigate]);

  useEffect(() => {
    if (user?.userData?.message) {
      const isUserNameValid = !!user.userData.message?.email;
      const isPasswordValid = !!user.userData.message?.password;
      const isWarningMessage = !!user.userData.message?.warning;

      setIsUserNameValid(isUserNameValid);
      setIsPasswordValid(isPasswordValid);
      // setSnackbarOpen(isWarningMessage);
      // if (isWarningMessage) {
      //   showSnackbar({ message: user?.userData?.message?.warning, severity: 'error' }); // Use showSnackbar
      // }
    }
    //  else {
    //   setSnackbarOpen(false);
    // }
  }, [user]);

  // useEffect(() => {
  //   if (finalMfaMessage !== '') {
  //     setMfaMessageVisible(true);
  //   } else {
  //     setMfaMessageVisible(false);
  //   }
  // }, [finalMfaMessage]);
  useEffect(() => {
    if (finalMfaMessage !== '') {
      showSnackbar({
        message: finalMfaMessage,
        severity: 'error',
      });
    }
  }, [finalMfaMessage]);

  // const handleCloseMfaMessage = () => {
  //   setMfaMessageVisible(false);
  // };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (forgotPasswordDetails !== null && forgotPasswordDetails?.message) {
      const severity =
        forgotPasswordDetails?.status === 200 || forgotPasswordDetails?.status === 'success'
          ? 'success'
          : 'error';
      showSnackbar({ message: forgotPasswordDetails?.message, severity });
      // setForgotPasswordSnackbarOpen(true);
      // if (forgotPasswordDetails?.status === 200 || forgotPasswordDetails?.status === 'success') {
      //   setForgotPasswordSeverity('success');
      // } else {
      //   setForgotPasswordSeverity('error');
      // }
    }

    return () => {
      //setForgotPasswordSnackbarOpen(false);
    };
  }, [forgotPasswordDetails]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      //setForgotPasswordSnackbarOpen(false);
      dispatch(resetForgotPasswordState());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, dispatch]);

  // useEffect(() => {
  //   console.log('clearing');
  //   dispatch(resetLoginErrors());
  // }, [dispatch]);

  useEffect(() => {
    if (eventualRequestData?.status === 'success' && eventualRequestData?.message !== '') {
      showSnackbar({
        message: eventualRequestData?.message,
        severity: 'error',
      });
    }
  }, [eventualRequestData, dispatch]);

  return (
    <div className="loginFormContainer">
      <Typography variant="h4" component="h1" className="login-head-label mb-2rem items-center">
        <>
          <img src={userImage} alt="login-user-icon" onClick={() => navigate(SIGN_IN)} />
        </>{' '}
        &nbsp; Sign In
      </Typography>

      {/* <SnackbarAlert
        open={mfaMessageVisible}
        message={finalMfaMessage}
        severity="error"
        handleClose={handleCloseMfaMessage}
      /> */}

      {/* <SnackbarAlert
        open={snackbarOpen}
        message={user?.userData?.message?.warning}
        severity="error"
        handleClose={handleSnackbarClose}
      /> */}

      {/* <SnackbarAlert
        open={forgotPasswordSnackbarOpen}
        message={forgotPasswordDetails?.message}
        severity={forgotPasswordSeverity}
        handleClose={() => setForgotPasswordSnackbarOpen(false)}
      /> */}

      {/* <SnackbarAlert
        open={eventualRequestData?.status === 'success' && eventualRequestData?.message !== ''}
        message={eventualRequestData?.message}
        severity="error"
        handleClose={() => dispatch(clearEventualRequest())}
        duration={null}
      /> */}

      {/* {eventualRequestData?.status === 'success' && eventualRequestData?.message !== '' && (
        <Alert severity="error" className="reset-pass-email-send" marginBottom=".6rem">
          {eventualRequestData?.message}
        </Alert>
      )} */}

      <CustomOutlinedInput
        label="Email"
        placeholder="Enter email"
        size="small"
        //className="input-field"
        value={users.username}
        onChange={(e) => handleInputChange('username', e.target.value)}
        onKeyDown={handleEnter}
        isError={isUserNameValid}
        errorMessage={
          isUserNameValid && users?.username?.trim() === ''
            ? 'Email is required.'
            : user?.userData?.message?.email
        }
        autoComplete="email"
      />
      {/* Need to add extra div here to adjust the spacing from top. If i added a space in CustomOutlinedInput as a generic then it will affect on other places as well. */}
      {/* Assed 12px because CustomOutlinedInput is taking 8px so just added 12 px to maintain the spacing 20px like figma */}
      <div style={{marginTop: '12px'}} />

      <CustomOutlinedInput
        label="Password"
        placeholder="Enter password"
        size="small"
        //className="input-field"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
            </IconButton>
          </InputAdornment>
        }
        value={users.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        onKeyDown={handleEnter}
        isError={isPasswordValid}
        errorMessage={isPasswordValid ? 'Password is required.' : user?.userData?.message?.password}
        autoComplete="current-password"
      />

      <div className="route-link-b" style={{ display: 'flex', justifyContent: 'end' }}>
        <span
          className="forgot-password"
          onClick={() => {
            //setForgotPasswordSnackbarOpen(false);
            dispatch(resetMfaMessageOnAttemptEnd());
            if (forgotPasswordSuccess) {
              dispatch(resetForgotPasswordState());
            }
            dispatch(clearEventualRequest());
            navigate(FORGOT_PASSWORD);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              //setForgotPasswordSnackbarOpen(false);
              dispatch(resetMfaMessageOnAttemptEnd());
              if (forgotPasswordSuccess) {
                dispatch(resetForgotPasswordState());
              }
              dispatch(clearEventualRequest());
              navigate(FORGOT_PASSWORD);
            }
          }}
          tabIndex={0}
        >
          Forgot password?
        </span>
      </div>

      <CustomButton onClick={handleSignIn} loader={loginLoader} disabled={isExistingValidationError}>
        Sign In
      </CustomButton>
    </div>
  );
};

LoginForm.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  isExistingValidationError: PropTypes.bool,
};

export default LoginForm;
