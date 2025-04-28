import { Divider, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import '../login/styles.css';
import { useNavigate } from 'react-router-dom';
import LoginContainer from '../../components/LoginContainer';
import CustomOutlinedInput from '../../components/CustomOutlinedInput';
import { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  passwordPolicy,
  //resetStoredPasswordDetails,
  storeResetPassword,
  updateExpiredPassword,
  resetExpiredPasswordDetails,
} from '../../redux/slice/authSlice/Authentication';
import { DASHBOARD } from '../../utils/enums/RoutesEnums';
import LocalStorageHelper from '../../utils/LocalStorageHelper';
//import SnackbarAlert from '../../components/SnackbarAlert';
import checkGreen from '../../assets/images/checkGreen.png';
import validationError from '../../assets/images/validationError.png';
import validatePasswordHandler from '../../utils/ValidatePasswordHandler';
import storage from '../../utils/SessionStorageHelper';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useSnackbar } from '../../context/SnackbarContext';
import CustomAlert from '../../components/CustomAlert';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LockClockRoundedIcon from '@mui/icons-material/LockClockRounded';
import CheckGreenIcon from '../../assets/customSVGIcons/CheckGreenIcon';
import PassNotMatch from '../../assets/customSVGIcons/PassNotMatch';

const NewPasswordWithExpiration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const {
    //storeResetPassword: resetPasswordDetails,
    updateExpiredPassword: resetPasswordDetails,
    prLoader,
    user,
    passwordPolicySettingData,
    forceReset,
  } = useSelector((state) => state?.authenticationSlice) || {};
  const {
    uid,
    is_password_expired_msg,
    is_password_expired,
    is_password_expired_not_now,
    password_policies,
    password_forced_msg,
  } = user?.userData || {};

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
  //const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isNotNowButton, setIsNotNowButton] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const fromResetPassword = queryParams.get('from_rp');
  const isMfaDisabled = queryParams.get('dis');
  const userId = storage.getToken();
  const finalName = storage?.getToken();
  const mail = storage.getUserDetails();

  useEffect(() => {
    async function fetchPasswordConfigurations() {
      const passwordConfigurations = await dispatch(passwordPolicy());
      if (passwordConfigurations) {
        setPasswordConfigurations(passwordConfigurations?.payload);
      } else {
        if (password_policies && is_password_expired) {
          setPasswordConfigurations(password_policies);
        } else {
          setPasswordConfigurations(passwordConfigurations?.payload);
        }
      }
    }
    fetchPasswordConfigurations();
  }, [dispatch, is_password_expired, password_policies]);

  useEffect(() => {
    if (passwordPolicySettingData) {
      setPasswordConfigurations(passwordPolicySettingData);
    }
  }, [passwordPolicySettingData]);

  /*
  useEffect(() => {
    const isMfaEnabled = getMFASettings?.mfa_settings === 'yes';
    const isMfaSetupComplete = getMFASettings?.new_setup;

    if (is_password_expired) {
      return;
    } else {
      if (isMfaEnabled) {
        const targetRoute = isMfaSetupComplete ? SET_MFA : OLD_MFA;
        navigate(`${targetRoute}?from_rp=1&ext_fl=${linkthroughExpTime}`);
      }
    }
  }, [getMFASettings?.mfa_settings, getMFASettings?.new_setup, navigate, is_password_expired]);
  */

  const handleMatchPasswords = (newPassword, confirmPassword) => {
    const isMatched = newPassword === confirmPassword;
    const validationMessage = isMatched ? 'Passwords match.' : 'Passwords do not match';

    setCheckValidation({ isMatched, validationMessage });
  };

  const handleUpdatePassword = () => {
    if (
      (fromResetPassword !== '1' ? false : isMfaDisabled === 'no' ? false : !uid) ||
      !changePassword?.new ||
      changePassword?.new !== changePassword?.old
    )
      return;

    const payload = {
      uid: uid || Number(userId?.id),
      password: changePassword?.new,
      isPasswordReset: 1,
      // email_type:
      //   is_password_expired_msg && (is_password_expired_msg !== '' || is_password_expired_msg !== undefined)
      //     ? 'password_reset'
      //     : routeType,
    };
    dispatch(isMfaDisabled ? storeResetPassword(payload) : updateExpiredPassword(payload))
      .unwrap()
      .then((mfaResponse) => {
        if (mfaResponse?.status === 'success') {
          LocalStorageHelper.setCSRFToken(mfaResponse?.csrf_token);
          LocalStorageHelper.setLogoutToken(mfaResponse?.logout_token);
          navigate(DASHBOARD);
        }
        showSnackbar({
          message: mfaResponse?.message,
          severity: mfaResponse?.status === 'success' ? 'success' : 'error',
          persist: mfaResponse?.status === 'success' ? true : false,
        });
      });
  };

  useEffect(() => {
    if (resetPasswordDetails?.status === 'success' || resetPasswordDetails?.status === 'error') {
      // setOpen(true);

      if (resetPasswordDetails?.status === 'success') {
        navigate(DASHBOARD);
        /*
        if (isEula === 'Yes') {
          navigate(LICENSE_AGGREMENT);
        } else {
          navigate(DASHBOARD);
        }
        */
        setTimeout(() => {
          dispatch(resetExpiredPasswordDetails());
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

    setPasswordErrors(validationErrors);
    if (value !== value.trim()) {
      setSpaceMessage(' The password has spaces at the beginning or end which are ignored.');
    } else {
      setSpaceMessage('');
    }
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

  useEffect(() => {
    const isNotNow =
      !forceReset &&
      ((is_password_expired_not_now && is_password_expired_not_now !== 0) ||
        (fromResetPassword && fromResetPassword !== '1'));
    setIsNotNowButton(isNotNow);
  }, [fromResetPassword, is_password_expired_not_now, forceReset, user]);

  // useEffect(() => {
  //   if (isLinkExpired) {
  //     showSnackbar({
  //       message: 'Your reset password link is expired.',
  //       severity: 'error',
  //     });
  //   }
  // }, [isLinkExpired, showSnackbar]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleUpdatePassword();
    }
  };

  const isPasswordEmpty = changePassword?.new?.trim() === ''; //Ensure that password should be trimed befoe applying password validations (Configurable).

  //if (!LocalStorageHelper.getToken()) return null;

  return (
    <LoginContainer>
      {/* <SnackbarAlert
        open={open}
        message={resetPasswordDetails?.message}
        severity={resetPasswordDetails?.status === 'success' ? 'success' : 'error'}
        handleClose={() => setOpen(false)}
      /> */}
      {/* <SnackbarAlert
        open={isLinkExpired}
        message={'Your reset password link is expired.'}
        severity={'warning'}
        handleClose={() => setIsLinkExpired(false)}
      /> */}
      <Grid item xs={12} className="multifactor-auth">
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          className="login-head-label"
          marginBottom=".6rem"
        >
          Reset Password
        </Typography>
        {forceReset || (fromResetPassword && fromResetPassword !== '1') ? (
          <CustomAlert
            severity="warning"
            message={
              fromResetPassword && fromResetPassword !== '1'
                ? ''
                : (password_forced_msg ?? 'Your password has expired. Please reset your password now.')
            }
            customIcon={
              isNotNowButton ? (
                <LockClockRoundedIcon fontSize="small" htmlColor='var(--duplicate-text)' sx={{marginRight: '-6px'}} /> // Adding margin right in negative because mui icon is taking default margin right as 12px and in figma it is 6px.
              ) : (
                <WarningRoundedIcon fontSize="small" htmlColor='var(--duplicate-text)' sx={{marginRight: '-6px'}} /> // Adding margin right in negative because mui icon is taking default margin right as 12px and in figma it is 6px.
              )
            }
          />
        ) : (
          is_password_expired_msg &&
          is_password_expired_msg !== '' &&
          is_password_expired_msg !== undefined && (
            <CustomAlert
              severity="warning"
              message={is_password_expired_msg}
              customIcon={
                isNotNowButton ? (
                  <LockClockRoundedIcon fontSize="small" htmlColor='var(--duplicate-text)' sx={{marginRight: '-6px'}} /> // Adding margin right in negative because mui icon is taking default margin right as 12px and in figma it is 6px.
                ) : (
                  <WarningRoundedIcon fontSize="small" htmlColor='var(--duplicate-text)' sx={{marginRight: '-6px'}} /> // Adding margin right in negative because mui icon is taking default margin right as 12px and in figma it is 6px.
                )
              }
            />
          )
        )}

        <div className="scrollHeightRecovery">
          <Grid container xs={12}>
            <Grid item xs={12} sx={{ mt: 3.75 }}>
              <Typography className="input-label" component="label">
                {'Email'}
              </Typography>
              <Typography className="email-value-label">{mail?.mail || finalName?.name}</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
              <Divider sx={{backgroundColor: 'var(--fp-divider)'}} />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: '1rem' }}>
              <CustomOutlinedInput
                type={showPassword.newPassword ? 'text' : 'password'}
                label="New Password"
                placeholder="Enter new password"
                size="small"
                isRequired
                isError={false}
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
                        className={
                          passwordErrors?.includes('length') ? '' : !isPasswordEmpty && 'linethrough'
                        }
                      >
                        {`${passwordConfigurations?.min_length ?? 0} characters,`}
                      </span>{' '}
                      <span
                        className={
                          passwordErrors?.includes('numeric') ? '' : !isPasswordEmpty && 'linethrough'
                        }
                      >
                        {`${passwordConfigurations?.numeric ?? 0} number,`}
                      </span>{' '}
                      <span
                        className={
                          passwordErrors?.includes('special') ? '' : !isPasswordEmpty && 'linethrough'
                        }
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
                isErrorIcon={false}
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
                      {showPassword.newPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <RemoveRedEyeOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>

            <Grid item xs={12}>
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
                      <CheckGreenIcon sx={{fontSize: '1rem'}} />
                    ) : (
                      <PassNotMatch sx={{fontSize: '1rem'}} />
                    )}
                    &nbsp; {checkValidation?.validationMessage}
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>

          <Grid container xs={12} justifyContent="center" className="mt-05rem">
            {isNotNowButton && (
              <Grid container item xs={12} spacing={2} justifyContent="center">
                <Grid item xs={6}>
                  <CustomButton onClick={() => navigate(DASHBOARD)} type="outlined">
                    Not Now
                  </CustomButton>
                </Grid>
                <Grid item xs={6}>
                  <CustomButton
                    onClick={handleUpdatePassword}
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
            )}
            {!isNotNowButton && (
              <Grid item xs={12}>
                <CustomButton
                  onClick={handleUpdatePassword}
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
            )}
          </Grid>
        </div>
      </Grid>
    </LoginContainer>
  );
};

export default NewPasswordWithExpiration;
