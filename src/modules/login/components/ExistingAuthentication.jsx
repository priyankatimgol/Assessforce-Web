import { useCallback, useEffect, useRef, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginContainer from '../../../components/LoginContainer';
import CustomOutlinedInput from '../../../components/CustomOutlinedInput';
import CustomButton from '../../../components/CustomButton';
import ResetMultifactorAuthentication from './ResetMultifactorAuthentication';
import {
  DASHBOARD,
  NEW_PASSWORD_WITH_EXPIRATION,
  OLD_MFA,
  RECOVERY_CODES,
  RESET_PASSWORD,
  SET_MFA,
  SIGN_IN,
} from '../../../utils/enums/RoutesEnums';
import {
  verifyMfaAction,
  // setMFASetup,
  clearMfa,
  setMfaMessageOnAttemptEnd,
} from '../../../redux/slice/mfa/MfaSlice';
import { resetMfaSetup, resetStoredPasswordDetails } from '../../../redux/slice/authSlice/Authentication';
import useTimer from '../../../hooks/useTimer';
import { cancelEventualRequest } from '../../../redux/slice/initialSlice/InitialSlice';
import clock from '../../../assets/images/clock.svg';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../../../context/SnackbarContext';
import BackArrowSVG from '../../../assets/customSVGIcons/BackArrowSVG';

const ExistingAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const inputRef = useRef(null);

  const { mfaStatus, mfaDetails, mfaStatusLoader, resetMFALoader, resetMFACodes } = useSelector(
    (state) => state?.mfaSlice
  );
  const { user } = useSelector((state) => state?.authenticationSlice);

  const [selectedScreen, setSelectedScreen] = useState('old');
  const [code, setCode] = useState('');
  const [invalidCode, setInvalidCode] = useState(false);
  //const [open, setOpen] = useState(false);
  const [isVerifyClicked, setIsVerifyClicked] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const fromResetPassword = queryParams.get('from_rp');
  const linkthroughExpTime = queryParams.get('ext_fl');
  const linkThroughUserId = queryParams.get('id');

  let timerDuration = null;
  const token = LocalStorageHelper.getToken();

  if (token) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeFromToken = jwtDecode(token);

    timerDuration = timeFromToken?.exp - currentTime;
  }

  const [timeLeftt, setTimeLeft] = useState(null);
  const isLinkthroughRoute = location.pathname.includes(OLD_MFA || SET_MFA);

  useEffect(() => {
    let timerInterval;

    const initializeTimer = () => {
      const initialTime = linkthroughExpTime ? Number(linkthroughExpTime) : timerDuration;
      const storedTimestamp = localStorage.getItem('linkthroughTimerTimestamp');

      if (isLinkthroughRoute) {
        let remainingTime;

        if (storedTimestamp) {
          // Calculate elapsed time since the timer started
          const elapsedSeconds = Math.floor((Date.now() - Number(storedTimestamp)) / 1000);
          remainingTime = Math.max(0, initialTime - elapsedSeconds);

          if (remainingTime <= 0) {
            // Timer has expired
            localStorage.removeItem('linkthroughTimerTimestamp');
            remainingTime = 0;
          }
        } else {
          // Start a new timer and save timestamp
          remainingTime = initialTime;
          localStorage.setItem('linkthroughTimerTimestamp', Date.now().toString());
        }

        setTimeLeft(remainingTime);

        if (remainingTime > 0) {
          timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
              const newTime = prevTime - 1;
              if (newTime <= 0) {
                clearInterval(timerInterval);
                localStorage.removeItem('linkthroughTimerTimestamp');
                return 0;
              }
              return newTime;
            });
          }, 1000);
        }
      } else {
        // Not on the linkthrough route, reset timer
        localStorage.removeItem('linkthroughTimerTimestamp');
        setTimeLeft(null);
      }
    };

    initializeTimer();

    // Cleanup interval on unmount or route change
    return () => {
      clearInterval(timerInterval);
      if (!isLinkthroughRoute) {
        localStorage.removeItem('linkthroughTimerTimestamp');
      }
    };
  }, [isLinkthroughRoute, linkthroughExpTime, timerDuration]);

  const timeLeft = useTimer(fromResetPassword === '1' ? timeLeftt : timerDuration, OLD_MFA);

  useEffect(() => {
    return () => {
      LocalStorageHelper.clearTimer(OLD_MFA);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [selectedScreen]);

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem('linkthroughTimerTimestamp');
    };
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const handleVerifyExistingMFA = useCallback(() => {
    setIsVerifyClicked(true);
    dispatch(
      verifyMfaAction({
        authCode: code.split(' ').join(''),
      })
    )
      .unwrap()
      .then((mfaResponse) => {
        if (mfaResponse?.status === 'success') {
          if (mfaResponse?.csrf_token && mfaResponse?.logout_token) {
            const newPasswordExp = user?.userData?.is_password_expired;
            const remainingDaysLeft = user?.userData?.is_password_expired_not_now;
            // iscsrf token and logout token the => Normal flow
            LocalStorageHelper.removeToken();
            LocalStorageHelper.setCSRFToken(mfaResponse?.csrf_token);
            LocalStorageHelper.setLogoutToken(mfaResponse?.logout_token);
            setTimeout(() => {
              if (newPasswordExp || remainingDaysLeft !== 0) {
                const path = NEW_PASSWORD_WITH_EXPIRATION.replace(':userId', user?.userData?.uid);
                navigate(path);
              } else {
                navigate(DASHBOARD);
              }
            }, 100);
          } else if (mfaResponse && mfaResponse?.token) {
            LocalStorageHelper.removeToken();
            LocalStorageHelper.setToken(mfaResponse.token);
          }
        } else {
          setInvalidCode(true);
        }
      });
  }, [dispatch, code, navigate]);

  useEffect(() => {
    if (mfaStatus?.remaining_failed_attempts === 0 || resetMFACodes?.remaining_failed_attempts === 0) {
      dispatch(setMfaMessageOnAttemptEnd({ message: mfaStatus?.message || resetMFACodes?.message }));
      dispatch(resetMfaSetup());
      dispatch(clearMfa());
      localStorage.removeItem('linkthroughTimerTimestamp');

      navigate(SIGN_IN);

      if (mfaStatus?.message === true) {
        navigate(
          fromResetPassword === '1'
            ? `${RECOVERY_CODES}?from_rp=1&ext_fl=${linkthroughExpTime}`
            : RECOVERY_CODES
        );
      }

      return () => {
        dispatch(resetStoredPasswordDetails());
        // dispatch(clearMfa());
      };
    }
  }, [dispatch, mfaStatus, navigate, resetMFACodes]);

  const handleBackClick = (isReset) => {
    dispatch(resetMfaSetup());
    dispatch(clearMfa());
    dispatch(
      cancelEventualRequest(
        isReset ? { existing_completed_recovery_code_cancel_log: 1, uid: user?.userData?.uid || linkThroughUserId } : { existing_completed_cancel_log: 1, uid: user?.userData?.uid || linkThroughUserId }
      )
    );
    navigate(SIGN_IN);
  };

  useEffect(() => {
    if (timeLeft !== null && timeLeft === 1) {
      dispatch(
        cancelEventualRequest(
          selectedScreen === 'old'
            ? { existing_completed_expiredTime_log: 1, uid: user?.userData?.uid || linkThroughUserId }
            : { existing_completed_recovery_code_expiredTime_log: 1, uid: user?.userData?.uid || linkThroughUserId }
        )
      );
    }

    return () => {
      dispatch(resetStoredPasswordDetails());
    };
  }, [timeLeft, mfaDetails, navigate, dispatch]);

  useEffect(() => {
    if (mfaStatus?.status === 'success' || resetMFACodes?.status === 'success') {
      if (fromResetPassword === '1') {
        navigate(
          resetMFACodes?.status === 'success'
            ? `${SET_MFA}?from_rp=${fromResetPassword}&ext_fl=${linkthroughExpTime}`
            : `${RESET_PASSWORD}?from_rp=1`
        );
      } else {
        navigate(resetMFACodes?.status === 'success' ? SET_MFA : DASHBOARD);
      }
    }
  }, [fromResetPassword, mfaStatus?.status, navigate, resetMFACodes?.status, user]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleVerifyExistingMFA();
    }
  };

  const MainScreen = () => (
    <Grid size={{ xs: 12, md: 12 }} className="existing-auth">
      <div className="flex-between mb-05rem">
        <IconButton
          onClick={() => {
            handleBackClick(false);
            localStorage.removeItem('linkthroughTimerTimestamp');
          }}
          style={{
            //color: '#2695cb', // Set the icon color
            marginLeft: '-5px',
            padding: '5px'
          }}
        >
          <BackArrowSVG
            sx={{
              color: 'var(--primary-color)'
            }}
          />
        </IconButton>
        <Typography variant="body2" className="will-expire">
          This page will expire in{' '}
          <>
            <img src={clock} alt="clock-icon" />
          </>
          <span className="will-expire-time">
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, '0')}
            :{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </Typography>
      </div>

      <Typography variant="h4" component="h1" className="login-head-label mb-04rem">
        Multi-Factor Authentication
      </Typography>

      <Typography variant="body1" className="sub-title">
        Enter the 6-digit code generated by the app.
      </Typography>

      <Grid container>
        <Grid size={{ xs: 12 }}>
          <CustomOutlinedInput
            inputRef={inputRef}
            placeholder="Enter the 6-digit code"
            size="small"
            value={code.split(' ').join('')}
            onChange={(e) => setCode(e.target.value.split(' ').join('').replace(/\D/g, ''))}
            onKeyDown={handleEnter}
            inputProps={{
              maxLength: 6,
              inputMode: 'numeric',
              style: {
                padding: '0.75rem 0.875rem',
                height: '1.5rem',
              },
            }}
            // allowPaste={false}
            style={{ marginBottom: '-0.25rem' }}
            isError={invalidCode && mfaStatus?.status === 'error'}
            isErrorIcon={false}
          />

          <Typography
            variant="body2"
            className="use-recovery-code"
            onClick={() => {setSelectedScreen('reset'); setInvalidCode(false)}}
            sx={{
              fontFamily: 'inter-medium',
              marginBottom: '1.875rem',
              color: 'var(--primary-color)',
            }}
          >
            Use recovery code
          </Typography>
          <CustomButton
            onClick={handleVerifyExistingMFA}
            disabled={code?.length < 6}
            loader={mfaStatusLoader}
          >
            Verify
          </CustomButton>
        </Grid>
      </Grid>
    </Grid>
  );

  const screens = {
    old: MainScreen,
    reset: () => (
      <ResetMultifactorAuthentication
        {...{ setSelectedScreen, timeLeft, handleBackClick, resetMFALoader, setIsVerifyClicked, selectedScreen, resetMFACodes }}
      />
    ),
  };

  let isExistingValidationError = mfaStatus?.status === 'error' && mfaStatus?.message;
  let isRecoveryValidationError = resetMFACodes?.status === 'error' && resetMFACodes?.message;

  const messageToShow = selectedScreen === 'old' ? isExistingValidationError : isRecoveryValidationError;

  useEffect(() => {
    if (messageToShow && isVerifyClicked) {
      // setOpen(true);
      showSnackbar({ message: messageToShow, severity: 'error' });
      setIsVerifyClicked(false);
    }
  }, [messageToShow, isVerifyClicked]);

  useEffect(() => {
    setCode('');
  }, [selectedScreen]);

  return (
    <LoginContainer>
      {/* <SnackbarAlert
        message={messageToShow}
        open={open}
        handleClose={() => setOpen(false)}
        severity="error"
      /> */}
      {screens[selectedScreen]()}
    </LoginContainer>
  );
};

export default ExistingAuthentication;
