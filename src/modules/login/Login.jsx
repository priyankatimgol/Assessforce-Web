import './styles.css';
import LoginForm from './components/LoginForm';
import LoginContainer from '../../components/LoginContainer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarAlert from '../../components/SnackbarAlert';
import { clearEventualRequest } from '../../redux/slice/initialSlice/InitialSlice';
import { useSnackbar } from '../../context/SnackbarContext';

const Login = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state?.authenticationSlice);
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage =
    'Too many failed login attempts from your IP address. Your IP address has been temporarily blocked.';
  const isExistingValidationError =
    user?.userData?.status === 'error' && user?.userData?.login_failed_status?.lock_ip_address;

  useEffect(() => {
    if (isExistingValidationError) {
      showSnackbar({
        message: errorMessage,
        severity: 'error',
      });
    }
  }, [isExistingValidationError]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(clearEventualRequest());
      localStorage.removeItem('linkthroughTimerTimestamp'); //Remove timer from localstorage.
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <LoginContainer>
      <LoginForm {...{ showPassword, setShowPassword, isExistingValidationError }} />
    </LoginContainer>
  );
};

export default Login;
