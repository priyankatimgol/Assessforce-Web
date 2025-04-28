import { Divider, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import '../login/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginContainer from '../../components/LoginContainer';
import CustomOutlinedInput from '../../components/CustomOutlinedInput';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  passwordPolicy,
  resetMfaSetup,
  resetStoredPasswordDetails,
  storeResetPassword,
} from '../../redux/slice/authSlice/Authentication';
import {
  DASHBOARD,
  FORGOT_PASSWORD,
  LICENSE_AGGREMENT,
  OLD_MFA,
  SET_MFA,
  SIGN_IN,
} from '../../utils/enums/RoutesEnums';
//import { setJwtToken } from '../../api/apiServices';
import LocalStorageHelper from '../../utils/LocalStorageHelper';
//import SnackbarAlert from '../../components/SnackbarAlert';
import SessionStorageHelper from '../../utils/SessionStorageHelper';
import checkGreen from '../../assets/images/checkGreen.png';
import validationError from '../../assets/images/validationError.png';
import validatePasswordHandler from '../../utils/ValidatePasswordHandler';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../../context/SnackbarContext';
import { clearMfa, setUserMfaStatus } from '../../redux/slice/mfa/MfaSlice';
import { cancelEventualRequest } from '../../redux/slice/initialSlice/InitialSlice';

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const hasNavigatedRef = useRef(false);
  let isMfaEnabled;
  let isMfaSetupComplete;
  let linkthroughExpTime;
  let userId;

  const { storeResetPassword: resetPasswordDetails, prLoader } =
    useSelector((state) => state?.authenticationSlice) || {};
  const { userMfaStatus } = useSelector((state) => {
    return state?.mfaSlice;
  });
  const { user } = useSelector((state) => state?.authenticationSlice);

  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const authToken = queryParams.get('JN');
  if (authToken) {
    const tokenDetails = jwtDecode(authToken);

    isMfaEnabled = tokenDetails?.QR; //
    isMfaSetupComplete = tokenDetails?.MC; //
    linkthroughExpTime = tokenDetails?.MFE; //
    userId = tokenDetails?.uid; //
    LocalStorageHelper.setToken(authToken);
  }
  const expiryTime = queryParams.get('time');
  const timeInSec = queryParams.get('TKNEX');
  const fromResetPassword = queryParams.get('from_rp');
  const routeType = queryParams.get('TY');
  const isEula = queryParams.get('eula');

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [changePassword, setChangePassword] = useState({
    new: '',
    old: '',
  });
  const [spaceMessage, setSpaceMessage] = useState('');

  const [passwordConfigurations, setPasswordConfigurations] = useState(null);
  //const [open, setOpen] = useState(false);
  const [checkValidation, setCheckValidation] = useState({
    isMatched: null,
    validationMessage: '',
  });
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isTokenSet, setIsTokenSet] = useState(false);
  const sessionData = SessionStorageHelper.getToken();
  const sessionMail = SessionStorageHelper?.getUserDetails();

  useEffect(() => {
    if (userId && name && expiryTime && authToken) {
      dispatch(setUserMfaStatus({ uid: userId, mail: name, timestamp: expiryTime, token: authToken }))
        .unwrap()
        .then((response) => {
          console.log('@#@#@#', response);

          if (isLinkExpired || response?.status === 'error') {
            showSnackbar({
              message: response?.message,
              severity: 'error',
              persist: true,
            });
          }
          if (response?.to_redirect === '1') {
            navigate(SIGN_IN);
            return;
          } else if (response?.to_redirect === '2') {
            navigate(FORGOT_PASSWORD);
            return;
          }
      
          // Handle MFA route navigation
          if (!hasNavigatedRef.current && response) {
            hasNavigatedRef.current = true; // Set the ref to avoid future navigations
            if (isMfaEnabled === 'yes') {
              const isStatusAndSetupComplete = isMfaSetupComplete === '1' && response?.mfa_status === '1';
              console.log('Redirect route', isStatusAndSetupComplete, response);
              const targetRoute = isStatusAndSetupComplete ? SET_MFA : OLD_MFA;
              const touteToCompare = `${targetRoute}?from_rp=1&nm=${name}&id=${userId}`;
      
              if (location.pathname !== touteToCompare) {
                navigate(`${targetRoute}?from_rp=1&ext_fl=${linkthroughExpTime}&id=${userId}`);
                dispatch(clearMfa());
              }
            }
          }
        });
    }
  }, [authToken, dispatch, expiryTime, name, userId, isLinkExpired]);

  useEffect(() => {
    setIsPageLoaded(false);
    // Store token in session storage
    fromResetPassword !== '1' && SessionStorageHelper.setToken(queryParams);

    // Calculate link expiration
    const currentTime = Math.floor(Date.now() / 1000);
    const parsedExpiry = parseInt(expiryTime, 10);
    const parsedDuration = parseInt(timeInSec, 10);
    const calculatedAnswer = parsedExpiry + parsedDuration;

    // Handle link expiration
    if (expiryTime && calculatedAnswer < currentTime) {
      setIsLinkExpired(true);
      setTimeout(() => {
        dispatch(resetMfaSetup());
        navigate(FORGOT_PASSWORD);
      }, 100);
      return;
    } else {
      setIsLinkExpired(false);
    }

    // Set token in local storage
    // LocalStorageHelper.setToken(authToken || sessionData?.sessionTkn);
    // setJwtToken(authToken || sessionData?.sessionTkn);

    // if (userMfaStatus?.to_redirect === '1') {
    //   navigate(SIGN_IN);
    //   return;
    // } else if (userMfaStatus?.to_redirect === '2') {
    //   navigate(FORGOT_PASSWORD);
    //   return;
    // }

    // // Handle MFA route navigation
    // if (!hasNavigatedRef.current && userMfaStatus) {
    //   hasNavigatedRef.current = true; // Set the ref to avoid future navigations
    //   if (isMfaEnabled === 'yes') {
    //     const isStatusAndSetupComplete = isMfaSetupComplete === '1' && userMfaStatus?.mfa_status === '1';
    //     console.log('Redirect route', isStatusAndSetupComplete, userMfaStatus);
    //     const targetRoute = isStatusAndSetupComplete ? SET_MFA : OLD_MFA;
    //     const touteToCompare = `${targetRoute}?from_rp=1&nm=${name}&id=${userId}`;

    //     if (location.pathname !== touteToCompare) {
    //       navigate(`${targetRoute}?from_rp=1&ext_fl=${linkthroughExpTime}&id=${userId}`);
    //       dispatch(clearMfa());
    //     }
    //   }
    // }

    return () => {
      setIsPageLoaded(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    authToken,
    expiryTime,
    timeInSec,
    isMfaEnabled,
    isMfaSetupComplete,
    userId,
    name,
    navigate,
    location.pathname,
    userMfaStatus,
  ]);

  useEffect(() => {
    if (userMfaStatus?.to_redirect !== '1') {
      dispatch(
        cancelEventualRequest({
          email_type: routeType,
          uid: user?.userData?.uid || userId,
        })
      );
    }

    async function fetchPasswordConfigurations() {
      const passwordConfigurations = await dispatch(passwordPolicy());
      if (passwordConfigurations) {
        setPasswordConfigurations(passwordConfigurations?.payload);
      }
    }

    fetchPasswordConfigurations();
  }, [dispatch]);

  useEffect(() => {
    if (LocalStorageHelper.getToken()) {
      setIsTokenSet(true);
    } else if (authToken) {
      LocalStorageHelper.setToken(authToken);
      setIsTokenSet(true);
    }
  }, [authToken]);

  const handleMatchPasswords = (newPassword, confirmPassword) => {
    const isMatched = newPassword === confirmPassword;
    const validationMessage = isMatched ? 'Passwords match.' : 'Passwords do not match';

    setCheckValidation({ isMatched, validationMessage });
  };

  const handleResetPassword = () => {
    if (
      (fromResetPassword === '1' ? false : !userId) ||
      !changePassword?.new ||
      changePassword?.new !== changePassword?.old
    )
      return;

    const payload = { uid: userId || sessionData?.id, password: changePassword?.new, email_type: routeType };
    dispatch(storeResetPassword(payload))
      .unwrap()
      .then((response) => {
        if (response?.status === 'success') {
          LocalStorageHelper.removeToken();
          LocalStorageHelper.setCSRFToken(response?.csrf_token);
          LocalStorageHelper.setLogoutToken(response?.logout_token);
          navigate(DASHBOARD);
          showSnackbar({
            message: response?.message,
            severity: 'success',
            persist: true,
          });
        } else {
          showSnackbar({
            message: response?.message,
            severity: 'error',
            persist: response?.status === 'error' ? true : false,
          });
          if (response?.status === 'error' && response?.is_forgot_password === true) {
            navigate(FORGOT_PASSWORD);
          }
        }
      });
  };

  useEffect(() => {
    if (resetPasswordDetails?.status === 'success' || resetPasswordDetails?.status === 'error') {
      // setOpen(true);

      if (resetPasswordDetails?.status === 'success') {
        if (isEula === 'Yes') {
          navigate(LICENSE_AGGREMENT);
        } else {
          navigate(DASHBOARD);
        }
        setTimeout(() => {
          dispatch(resetStoredPasswordDetails());
        }, 6000);
      }
    }
  }, [resetPasswordDetails?.status, navigate]);

  const handlePasswordChange = (value) => {
    setChangePassword((prev) => ({ ...prev, new: value }));
    const validationErrors = validatePasswordHandler({
      passwordConfigurations: passwordConfigurations,
      password: value,
    });

    if (value !== value.trim()) {
      setSpaceMessage(' The password has spaces at the beginning or end which are ignored.');
    } else {
      setSpaceMessage('');
    }
    setPasswordErrors(validationErrors);
    if (changePassword?.old !== '' && validationErrors.length === 0) {
      handleMatchPasswords(value, changePassword?.old);
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setChangePassword((prev) => ({ ...prev, old: value }));
    if (changePassword?.new !== '' && passwordErrors.length === 0) {
      handleMatchPasswords(changePassword?.new, value);
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleResetPassword();
    }
  };

  const isPasswordEmpty = changePassword?.new?.trim() === ''; //Ensure that password should be trimed before applying password validations (Configurable).

  // Conditionally render based on isLinkExpired and isTokenSet
  if (!userMfaStatus || userMfaStatus?.status === 'error') return;
  if (isLinkExpired) return;
  if (!isPageLoaded && isMfaEnabled !== 'no' && fromResetPassword !== '1') return; // To prevent screen fluctuation.
  if (!isTokenSet) return null;

  return (
    <LoginContainer>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          className="login-head-label"
          marginBottom="1.875rem"
        >
          Reset Password
        </Typography>

        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography className="input-label" component="label">
              {'Email'}
            </Typography>
            <Typography className="email-value-label">
              {name || sessionData?.name || sessionMail?.mail}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
            <Divider sx={{ backgroundColor: 'var(--fp-divider)' }} />
          </Grid>

          <Grid item xs={12} style={{ marginBottom: '1rem' }}>
            <CustomOutlinedInput
              type={showPassword.newPassword ? 'text' : 'password'}
              label="New Password"
              placeholder="Enter new password"
              size="small"
              isRequired
              value={changePassword?.new}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onKeyDown={handleEnter}
              onlyMessage
              autoComplete="new-password"
              errorMessage={
                <span className="custom-error">
                  Password must contain at least{' '}
                  <>
                    <span
                      className={passwordErrors?.includes('length') ? '' : !isPasswordEmpty && 'linethrough'}
                    >
                      {`${passwordConfigurations?.min_length ?? 0} characters,`}
                    </span>{' '}
                    <span
                      className={passwordErrors?.includes('numeric') ? '' : !isPasswordEmpty && 'linethrough'}
                    >
                      {`${passwordConfigurations?.numeric ?? 0} number,`}
                    </span>{' '}
                    <span
                      className={passwordErrors?.includes('special') ? '' : !isPasswordEmpty && 'linethrough'}
                    >
                      {`${passwordConfigurations?.special_characters ?? 0} symbol,`}
                    </span>{' '}
                    <span
                      className={
                        passwordErrors?.includes('uppercase') ? '' : !isPasswordEmpty && 'linethrough'
                      }
                    >
                      {`${passwordConfigurations?.uppercase ?? 0} uppercase`}
                    </span>
                    &nbsp;&{' '}
                    <span
                      className={
                        passwordErrors?.includes('lowercase') ? '' : !isPasswordEmpty && 'linethrough'
                      }
                    >
                      {`${passwordConfigurations?.lowercase ?? 0} lowercase character.`}
                    </span>
                  </>
                  {spaceMessage}
                </span>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword,
                      }))
                    }
                    edge="end"
                  >
                    {showPassword.newPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>

          <Grid item xs={12} style={{ marginBottom: '1rem' }}>
            <CustomOutlinedInput
              type={showPassword.confirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Re-enter new password"
              size="small"
              isRequired
              isError={false}
              errorMessage="This field is required"
              value={changePassword?.old}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              onKeyDown={handleEnter}
              autoComplete="new-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                    edge="end"
                  >
                    {showPassword.confirmPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <RemoveRedEyeOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Typography
              fontWeight="bold"
              className="rp-match"
              color={checkValidation?.isMatched ? '#2E7D32' : 'var(--danger-color)'}
            >
              {changePassword?.new !== '' && changePassword?.old !== '' && passwordErrors.length === 0 && (
                <>
                  {checkValidation?.isMatched ? (
                    <img src={checkGreen} alt="Matched" />
                  ) : (
                    <img src={validationError} alt="Not Matched" />
                  )}
                  &nbsp; {checkValidation?.validationMessage}
                </>
              )}
            </Typography>
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={12}>
            <CustomButton
              onClick={handleResetPassword}
              loader={prLoader}
              disabled={
                !checkValidation?.isMatched ||
                passwordErrors.length > 0 ||
                changePassword.new !== changePassword.old
              }
            >
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </LoginContainer>
  );
};

export default SetNewPassword;
