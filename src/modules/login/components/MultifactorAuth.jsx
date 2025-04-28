import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import CustomButton from '../../../components/CustomButton';
import CustomOutlinedInput from '../../../components/CustomOutlinedInput';
import '../styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginContainer from '../../../components/LoginContainer';
import QRCode from 'react-qr-code';
import { OLD_MFA, RECOVERY_CODES, SET_MFA, SIGN_IN } from '../../../utils/enums/RoutesEnums';
import { useDispatch, useSelector } from 'react-redux';
import { resetMfaSetup, resetStoredPasswordDetails } from '../../../redux/slice/authSlice/Authentication';
import {
  clearMfa,
  setMFASetup,
  setMfaMessageOnAttemptEnd,
  verifyMfaAction,
} from '../../../redux/slice/mfa/MfaSlice';
import useTimer from '../../../hooks/useTimer';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { cancelEventualRequest } from '../../../redux/slice/initialSlice/InitialSlice';
import clock from '../../../assets/images/clock.svg';
import minimizeIcon from '../../../assets/images/minimizeIcon.svg';
import ImageViewer from '../../../components/ImageViewer';
import expandIcon from '../../../assets/images/expandIcon.svg';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../../../context/SnackbarContext';
import BackArrowSVG from '../../../assets/customSVGIcons/BackArrowSVG';

const MultifactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { showSnackbar } = useSnackbar();
  const { mfaDetails, mfaStatus, mfaStatusLoader } = useSelector((state) => state?.mfaSlice);
  const { user } = useSelector((state) => state?.authenticationSlice);

  const [showSecretKey, setShowSecretKey] = useState(false);
  const [code, setCode] = useState('');
  const [verify, setVerify] = useState(false);
  const [openQRCode, setOpenQRCode] = useState(false);
  const [showError, setShowError] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const fromResetPassword = queryParams.get('from_rp');
  const linkthroughExpTime = queryParams.get('ext_fl');
  const userId = queryParams.get('id');

  const isResetPassword = location.pathname.includes('/reset-password');
  let timerDuration = null;
  const token = LocalStorageHelper.getToken();

  if (token) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeFromToken = jwtDecode(token);

    timerDuration = timeFromToken?.exp - currentTime;
  }
  const [timeLeftt, setTimeLeft] = useState(null);
  const isLinkthroughRoute = location.pathname.includes(SET_MFA);

  useEffect(() => {
    if(inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, []);

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

  const timeLeft = useTimer(fromResetPassword === '1' ? timeLeftt : timerDuration, SET_MFA);
  const secretKey = mfaDetails?.secretkey;

  useEffect(() => {
    dispatch(setMFASetup());

    return () => {
      LocalStorageHelper.clearTimer(SET_MFA);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem('linkthroughTimerTimestamp');
    };
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft === 1) {
      navigate(SIGN_IN);
      dispatch(cancelEventualRequest({ new_setup_expiredTime_log: 1, uid: user?.userData?.uid || userId}));
      dispatch(clearMfa());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey).then(() => {
      showSnackbar({ message: 'Code has been copied.', severity: 'success' });
    });
  };

  const handleVerifyMFA = useCallback(() => {
    setVerify(true);
    dispatch(verifyMfaAction({ authCode: code, secretkey: secretKey }))
      .unwrap()
      .then((mfaResponse) => {
        if (mfaResponse?.status === 'success') {
          if (mfaResponse && mfaResponse?.token) {
            LocalStorageHelper.removeToken();
            LocalStorageHelper.setToken(mfaResponse.token);
          }
        }
      });
  }, [dispatch, code, secretKey, navigate]);

  useEffect(() => {
    if (!mfaStatus) return;

    if (mfaStatus?.remaining_failed_attempts === 0) {
      dispatch(setMfaMessageOnAttemptEnd({ message: mfaStatus?.message }));
      dispatch(resetMfaSetup());
      dispatch(clearMfa());
      showSnackbar({ message: mfaStatus?.message, severity: 'error' });

      navigate(SIGN_IN);
    }

    if (mfaStatus.message === true) {
      navigate(
        fromResetPassword === '1'
          ? `${RECOVERY_CODES}?from_rp=1&ext_fl=${linkthroughExpTime}&id=${user?.userData?.uid || userId}`
          : RECOVERY_CODES
      );
    }
    else if (verify) {
      setShowError(true);
      showSnackbar({ message: mfaStatus?.message, severity: 'error' });
      setVerify(false);
    }

    return () => {
      dispatch(resetStoredPasswordDetails());
      setShowError(false);
      // dispatch(clearMfa());
    };
  }, [mfaStatus, code, secretKey, dispatch, navigate]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleVerifyMFA();
    }
  };

  const fetchQR = (size="190") => {
    return (
      <div className="qr-body">
        <QRCode
          fgColor="var(--black-color)"
          bgColor="var(--pure-color)"
          size= {size}
          value={`otpauth://totp/${mfaDetails?.encodedUsername}?secret=${secretKey}&issuer=${mfaDetails?.encodedIssuer}&algorithm=SHA1&digits=6&period=30`}
          className="qr-code"
        />
        <div
          className="flex-center pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpenQRCode(!openQRCode);
          }}
        >
          <>
            {!openQRCode ? (
              <img src={expandIcon} alt="expand-icon" className="expandIcon" />
            ) : (
              <img src={minimizeIcon} alt="minimize-icon" className="expandIcon" />
            )}
            <Typography sx={{ color: 'var(--text-secondary-color)'}} className="qr-expand" component="span">
              {openQRCode ? 'Minimize' : 'Expand'}
            </Typography>
          </>
        </div>
      </div>
    );
  };

  return (
    <LoginContainer>
      {/* <SnackbarAlert
        message={mfaStatus?.message !== false && mfaStatus?.message}
        open={verify && mfaStatus?.message !== false && mfaStatus?.remaining_failed_attempts > 0}
        handleClose={() => setVerify(false)}
        severity="error"
      /> */}
      {/* <SnackbarAlert
        message={'Secret key copied!'}
        open={isScOpen}
        handleClose={() => setIsScOpen(false)}
        severity="success"
      /> */}
      <ImageViewer
        open={openQRCode}
        isImage={false}
        component={fetchQR("340")}
        handleClose={() => setOpenQRCode(false)}
      />
      <Grid item xs={12} md={12} className="multifactor-auth">
        <div className="flex-between mb-05rem">
          {!isResetPassword && (
            <IconButton
              onClick={() => {
                dispatch(resetMfaSetup());
                dispatch(clearMfa());
                dispatch(cancelEventualRequest({ new_setup_cancel_log: 1, uid: user?.userData?.uid || userId }));
                navigate(SIGN_IN);
                localStorage.removeItem('linkthroughTimerTimestamp'); //Remove timer from localstorage
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
          )}
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

        <Typography variant="h4" component="h1" className="login-head-label">
          Set up Multi-Factor Authentication
        </Typography>
        <div className="scrollHeight">
          <ul className="multi-accordian pl-20">
            <li>{mfaDetails?.mfa_setup_instructions}</li>
            <li>Scan the QR code below using the authenticator app you downloaded on your phone.</li>
            <li>Enter the 6-digit code generated by the app.</li>
          </ul>

          <Box className="qrCode-box">{fetchQR()}</Box>

          <Typography variant="caption" className="qr-code-msg">
            <center className="mb-05rem">
              <div>
              If you are unable to scan the QR code, enter this code in the app:{' '}
              <span onClick={() => setShowSecretKey(!showSecretKey)}>
                <a style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--primary-color)' }}>
                  {showSecretKey ? 'Hide code' : 'Show code'}
                </a>
              </span>
              </div>
              {showSecretKey && (
                <Chip
                  label={secretKey}
                  variant="outlined"
                  sx={{
                    //fontFamily: 'inter-semibold',
                    border: 'none',
                    backgroundColor: '#E5F6FD',
                    maxWidth: '100%',
                    marginTop: '.6rem',
                    marginBottom: '.2rem',
                    padding: '0.875rem 0.375rem',
                    borderRadius: '6px',
                    height: 'auto',
                  }}
                  deleteIcon={
                    <Tooltip title="Copy">
                      <IconButton
                        onClick={handleCopy}
                        sx={{
                          padding: 0,
                          marginLeft: '0.375rem',
                        }}
                      >
                        <ContentCopyRoundedIcon fontSize="small" sx={{ color: '#0000008F' }} />
                      </IconButton>
                    </Tooltip>
                  }
                  onDelete={handleCopy}
                />
              )}
            </center>
          </Typography>

          <Grid size={{ xs: 12 }} className="code-grid">
            <Grid size={{ xs:12 }}>
              <CustomOutlinedInput
                inputRef={inputRef}
                placeholder="Enter the 6-digit code"
                size="small"
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value?.length <= 6) {
                    setCode(value);
                  }
                }}
                onKeyDown={handleEnter}
                inputProps={{
                  maxLength: 6,
                  inputMode: 'numeric',
                  style: {
                    padding: '0.75rem 0.875rem',
                    height: '1.5rem',
                  },
                }}
                isError={showError && mfaStatus?.status === 'error'}
                isErrorIcon={false}
                // allowPaste={false}
              />
            </Grid>
            <Grid mt={1} size={{ xs: 12 }}>
              <CustomButton onClick={handleVerifyMFA} disabled={code?.length !== 6} loader={mfaStatusLoader}>
                Verify
              </CustomButton>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </LoginContainer>
  );
};

MultifactorAuth.propTypes = {
  setShowForm: PropTypes.func,
};

export default React.memo(MultifactorAuth);
