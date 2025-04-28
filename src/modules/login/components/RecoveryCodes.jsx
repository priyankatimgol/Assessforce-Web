import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography, styled } from '@mui/material';
import CustomButton from '../../../components/CustomButton';
import '../styles.css';
import LoginContainer from '../../../components/LoginContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useTimer from '../../../hooks/useTimer';
import {
  DASHBOARD,
  LICENSE_AGGREMENT,
  NEW_PASSWORD_WITH_EXPIRATION,
  RECOVERY_CODES,
  RESET_PASSWORD,
  SIGN_IN,
} from '../../../utils/enums/RoutesEnums';
import {
  clearStoreRcoveryCode,
  fetchRecoveryCodes,
  storeRecoveryCodes,
} from '../../../redux/slice/recoveryCode/RecoveryCode';
//import SnackbarAlert from '../../../components/SnackbarAlert';
import { cancelEventualRequest } from '../../../redux/slice/initialSlice/InitialSlice';
import clock from '../../../assets/images/clock.svg';
import checkGreen from '../../../assets/images/check_filled_circle_ASF.svg';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import sessionStorage from '../../../utils/SessionStorageHelper';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../../../context/SnackbarContext';
import { useReactToPrint } from 'react-to-print';
import { RecoveryToPrint } from './RecoveryToPrint';
import { clearMfa, resetUserMfaStatus } from '../../../redux/slice/mfa/MfaSlice';

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: '#f5f5f5',
  boxShadow: 'none',
}));

const RecoveryCodes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { recoveryCodes, storeRcoveryCodeDetails } = useSelector((state) => state?.recoveryCode);
  const { user, currentEnv } = useSelector((state) => state?.authenticationSlice);
  const websiteName = currentEnv?.website_name || '';
  const [checked, setChecked] = useState(false);
  //const [isCopied, setIsCopied] = useState(false);
  const [isCodeSaved, setIsCodeSaved] = useState({
    copied: false,
    printed: false,
  });

  const componentRef = React.useRef(null);
  const queryParams = new URLSearchParams(location.search);
  const fromResetPassword = queryParams.get('from_rp');
  const linkthroughExpTime = queryParams.get('ext_fl');
  const linkThroughUserId = queryParams.get('id');

  let timerDuration = null;
  const token = LocalStorageHelper.getToken();
  const userId = user?.userData?.uid;

  if (token) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeFromToken = jwtDecode(token);

    timerDuration = timeFromToken?.exp - currentTime;
  }

  const [timeLeftt, setTimeLeft] = useState(null);
  const isLinkthroughRoute = location.pathname.includes(RECOVERY_CODES);

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
          remainingTime = linkthroughExpTime ? Number(linkthroughExpTime) : Math.max(0, initialTime - elapsedSeconds);

          if (remainingTime <= 0) {
            // Timer has expired
            localStorage.removeItem('linkthroughTimerTimestamp');
            remainingTime = 0;
          }
        } else {
          // Start a new timer and save timestamp
          remainingTime = linkthroughExpTime ? Number(linkthroughExpTime) : initialTime;
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
  }, [isLinkthroughRoute]);

  const timeLeft = useTimer(fromResetPassword === '1' ? timeLeftt : timerDuration, RECOVERY_CODES);

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem('linkthroughTimerTimestamp');
    };
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const handleCopy = () => {
    const codesToCopy = recoveryCodes?.recoveryCodes.join('\n') || '';

    if (codesToCopy) {
      const formattedDataToCopy = `Recovery Codes:\n\n${codesToCopy}`;

      navigator.clipboard
        .writeText(formattedDataToCopy)
        .then(() => {
          showSnackbar({ message: 'Recovery codes have been copied.', severity: 'success' });
          setIsCodeSaved((prevState) => ({ ...prevState, copied: true }));
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          //setIsCopied(false);
        });
    } else {
      //setIsCopied(false);
    }
  };
  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handlePrint = useReactToPrint({
    documentTitle: `Your recovery codes _ ${websiteName}`,
  });
  useEffect(() => {
    dispatch(fetchRecoveryCodes());

    return () => {
      LocalStorageHelper.clearTimer(RECOVERY_CODES);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeLeft !== null && timeLeft === 1) {
      dispatch(cancelEventualRequest({ new_setup_recovery_code_expiredTime_log: 1, uid: userId || linkThroughUserId }));
      dispatch(clearStoreRcoveryCode());
      dispatch(clearMfa());
      navigate(SIGN_IN);
      dispatch(resetUserMfaStatus());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // const handleStoreRecoveryCodes = () => {
  //   const newPasswordExp = user?.userData?.is_password_expired;
  //   const payload = {
  //     recoveryCodes: recoveryCodes?.recoveryCodes,
  //   };
  //   const finalName = sessionStorage.getToken();

  //   dispatch(storeRecoveryCodes(payload));

  //   if (fromResetPassword === '1') {
  //     navigate(`${RESET_PASSWORD}?from_rp=1&nm=${finalName?.name}`);
  //   } else {
  //     if (newPasswordExp) {
  //       const path = NEW_PASSWORD_WITH_EXPIRATION.replace(':userId', user?.userData?.uid);
  //       navigate(path);
  //     } else {
  //       if (storeRcoveryCodeDetails === 'Yes') {
  //         navigate(LICENSE_AGGREMENT);
  //       } else {
  //         navigate(MANAGE_USERS);
  //       }
  //     }
  //   }
  // };

  const handleStoreRecoveryCodes = () => {
    const payload = {
      recoveryCodes: recoveryCodes?.recoveryCodes,
    };

    dispatch(storeRecoveryCodes(payload));
  };

  useEffect(() => {
    if (storeRcoveryCodeDetails) {
      if (fromResetPassword === '1') {
        navigate(`${RESET_PASSWORD}?from_rp=1&nm=${sessionStorage.getToken()?.name}`);
      } else {
        const newPasswordExp = user?.userData?.is_password_expired;
        if (newPasswordExp) {
          const path = NEW_PASSWORD_WITH_EXPIRATION.replace(':userId', user?.userData?.uid);
          navigate(path);
        } else {
          if (storeRcoveryCodeDetails?.eula === 'Yes') {
            navigate(LICENSE_AGGREMENT);
          } else {
            navigate(DASHBOARD);
          }
        }
      }
    }

    return () => {
      dispatch(clearStoreRcoveryCode());
    };
  }, [
    storeRcoveryCodeDetails,
    fromResetPassword,
    user?.userData?.is_password_expired,
    user?.userData?.uid,
    navigate,
    dispatch,
  ]);

  return (
    <LoginContainer>
      {/* <SnackbarAlert
        open={isCopied}
        message="Recovery codes has been copied."
        handleClose={() => setIsCopied(false)}
        severity="success"
      /> */}

      <Box>
        <Typography variant="body2" className="will-expire ta-end-right mb-05rem">
          This page will expire in{' '}
          <>
            <img className="clockTop" src={clock} alt="clock-icon" />
          </>
          <span className="will-expire-time">
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, '0')}
            :{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </Typography>

        <Typography variant="h4" className="login-head-label mb-06rem">
          Your Recovery Codes
        </Typography>

        <Box className="check-icon-div">
          <>
            <img className="successGreen" src={checkGreen} alt="check-green-icon" />
          </>
          {/* <CheckIcon className="check-icon" /> */}
          <Typography
            variant="body2"
            //className="check-label"
            sx={{ fontFamily: 'inter-medium' }} // Adjust color and font weight
          >
            Success! You have set up your device for multi-factor authentication.
          </Typography>
        </Box>

        <div className="scrollHeightRecovery">
          <div
            dangerouslySetInnerHTML={{
              __html: recoveryCodes?.recovery_code_instruction,
            }}
            className="recovery-details"
          />

          <Grid container spacing={1} sx={{ my: 2 }}>
            {Array.isArray(recoveryCodes?.recoveryCodes) ? (
              recoveryCodes?.recoveryCodes?.map((code, index) => (
                <Grid item xs={6} sm={2.4} md={6} lg={2.4} key={index}>
                  <StyledPaper className="recovery-codes">{code}</StyledPaper>
                </Grid>
              ))
            ) : (
              <Grid item sx={12} style={{width: '100%'}}>
                <StyledPaper className="no-recovery-codes">{recoveryCodes?.recoveryCodes}</StyledPaper>
              </Grid>
            )}
          </Grid>

          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '14px' }}>
            <Grid item xs={6}>
              <CustomButton type="outlined" onClick={handleCopy} className="mb-06rem">
                Copy
                <ContentCopyRoundedIcon sx={{ marginLeft: '8px', fontSize: '1.5rem' }} />
              </CustomButton>
            </Grid>
            <Grid item xs={6}>
              <CustomButton
                type="contained"
                onClick={() => handlePrint(reactToPrintContent)}
                className="mb-06rem printBtn"
              >
                Print
                <LocalPrintshopOutlinedIcon sx={{ marginLeft: '8px', fontSize: '1.5rem' }} />
              </CustomButton>
            </Grid>
            <div className="print-container">
              <RecoveryToPrint ref={componentRef} recoveryCodes={recoveryCodes} />
            </div>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                sx={{
                  color: checked ? 'var(--primary-color) !important' : 'var(--checkbox-border) !important',
                  '&.Mui-checked': {
                    color: 'var(--primary-color)',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem',
                    width: '1.25rem',
                    height: '1.25rem',
                  },
                }}
                tabIndex={0}
              />
            }
            label="I have saved my recovery codes"
            sx={{
              marginTop: '0px',
              marginBottom: '1rem',
              '& .MuiFormControlLabel-label': {
                color: 'var(--black-color) !important',
                fontSize: '0.75rem',
                fontFamily: 'inter-regular',
              },
            }}
          />

          <CustomButton disabled={!checked} onClick={handleStoreRecoveryCodes}>
            Proceed
          </CustomButton>
        </div>
      </Box>
    </LoginContainer>
  );
};

export default RecoveryCodes;
