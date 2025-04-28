import { Box, IconButton, Typography } from '@mui/material';
import '../login/styles.css';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import CustomOutlinedInput from '../../components/CustomOutlinedInput';
import LoginContainer from '../../components/LoginContainer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction, forgotPasswordSuccess } from '../../redux/slice/authSlice/Authentication';
import { useEffect, useState } from 'react';
import useLoginValidation from '../../hooks/useLoginValidation';
import { SIGN_IN } from '../../utils/enums/RoutesEnums';
import backArrow from '../../assets/images/backArrow.svg';
import BackArrowSVG from '../../assets/customSVGIcons/BackArrowSVG';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, validateEmail } = useLoginValidation();
  const { forgotPasswordDetails, fpLoader } = useSelector((state) => state?.authenticationSlice);

  const [userName, setUserName] = useState('');
  const [isErrorInCurrentRef, setIsErrorInCurrentRef] = useState(false);

  const handleForgotPassword = () => {
    setIsErrorInCurrentRef(true);
    const isEmailValid = validateEmail(userName);

    if (!isEmailValid) return;

    const payload = {
      username: userName,
    };

    dispatch(forgotPasswordAction(payload));

    return () => setIsErrorInCurrentRef(false);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleForgotPassword();
    }
  };

  useEffect(() => {
    if (forgotPasswordDetails?.status === 200 || forgotPasswordDetails?.status === 'success') {
      dispatch(forgotPasswordSuccess());
      navigate(SIGN_IN);
    } else {
      if (forgotPasswordDetails?.status === 'error' || forgotPasswordDetails?.status === 'error') {
        dispatch(forgotPasswordSuccess());
        navigate(SIGN_IN);
      }
    }
  }, [forgotPasswordDetails, navigate, dispatch]);

  return (
    <LoginContainer>
      <Box>
        <IconButton
          onClick={() => navigate(SIGN_IN)}
          style={{
            //color: '#2695cb', // Set the icon color
            marginLeft: '-5px',
            marginBottom: '1.5rem',
            padding: '5px'
          }}
        >
          <BackArrowSVG
            sx={{
              color:'var(--primary-color)'
            }}
          />
        </IconButton>
        <Typography variant="h5" component="h1" className="login-head-label mb-04rem">
          Forgot Password
        </Typography>
        <Typography variant="body1" className="sub-title">
          Enter the email address for your account. We&apos;ll send you a link to reset your password.
        </Typography>
        <CustomOutlinedInput
          size="small"
          label="Email"
          placeholder="Enter email"
          value={userName}
          onChange={(e) => setUserName(e.target.value?.trim())}
          onKeyDown={handleEnter}
          isError={isErrorInCurrentRef && (errors.email !== '')}
          errorMessage={
            (isErrorInCurrentRef && errors.email) ||
            (isErrorInCurrentRef &&
              forgotPasswordDetails?.status === 'error' &&
              forgotPasswordDetails?.message)
          }
          autoComplete="email"
        />
        <div style={{ marginTop: '1rem' }}>
          <CustomButton onClick={handleForgotPassword} loader={fpLoader}>Send Email</CustomButton>
        </div>
      </Box>
    </LoginContainer>
  );
};

export default ForgotPassword;
