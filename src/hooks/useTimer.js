import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetMfaSetup } from '../redux/slice/authSlice/Authentication';
import { clearMfa } from '../redux/slice/mfa/MfaSlice';
import { SIGN_IN } from '../utils/enums/RoutesEnums';

const useTimer = (duration, redirectPath) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!location.pathname.includes(redirectPath)) {
      return;
    }

    if (duration > 0) {
      setTimeLeft(duration);
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || duration === null) {
          return prev;
        }

        if (prev <= 1) {
          clearInterval(intervalId);
          dispatch(clearMfa());
          dispatch(resetMfaSetup());
          navigate(SIGN_IN);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [duration, navigate, dispatch, location.pathname, redirectPath]);

  return timeLeft;
};

export default useTimer;
