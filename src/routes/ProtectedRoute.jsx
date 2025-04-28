import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  DASHBOARD,
  LICENSE_AGGREMENT,
  NEW_PASSWORD_WITH_EXPIRATION,
  SIGN_IN,
} from '../utils/enums/RoutesEnums';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Apis from '../api/index';
import AppLoader from '../components/AppLoader';
import storage from '../utils/LocalStorageHelper';
import { setForceResetState } from '../redux/slice/authSlice/Authentication';
import useSessionStorage from '../components/useSessionStorage';
import { useSnackbar } from '../context/SnackbarContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasAccess, setHasAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [RedirectPath, setRedirectPath] = useState(null);
  const { user } = useSelector((state) => state?.authenticationSlice);
  const [sessionUserDetails, setSessionUserDetails] = useSessionStorage('user_details', {});
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true); // Start loading
        await Apis.checkSession({});
        setIsAuthenticated(true);

        if (user?.userData?.eula === 'Yes' && location?.pathname !== LICENSE_AGGREMENT) {
          setRedirectPath(LICENSE_AGGREMENT);
        }
        if (!user?.userData?.orgz_status && location?.pathname !== DASHBOARD) {
          setRedirectPath(DASHBOARD);
        }
      } catch (error) {
        const response = error?.response?.data;

        if (response && response?.code === 'eula') {
          setIsAuthenticated(true);
          if (location?.pathname !== LICENSE_AGGREMENT) {
            setRedirectPath(LICENSE_AGGREMENT);
          }
        } else if (response && response?.code === 'reset_password') {
          setIsAuthenticated(true);
          dispatch(setForceResetState());
          const pathname = NEW_PASSWORD_WITH_EXPIRATION.replace(':userId', user?.userData?.uid);
          if (location?.pathname !== pathname) {
            setRedirectPath(pathname);
          }
        } else {
          console.log('First else');
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false); // Stop loading after session check
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated && requiredRoles?.length > 0) {
      const access = requiredRoles.some((role) => user?.userData?.roles?.includes(role));
      setHasAccess(access);
    } else if (isAuthenticated === true) {
      setHasAccess(true); // No roles required, grant access
    } else if (isAuthenticated === false) {
      setHasAccess(false);
    }
  }, [isAuthenticated, requiredRoles, user]);

  const fetchUserDetails = async () => {
    const response = await Apis.getUserDetails();
    const resp = response?.data;

    if (resp) {
      setSessionUserDetails(resp?.data);
      //SessionStorageHelper.setUserDetails(resp?.data);
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(storage.getUser());
    if (
      ![LICENSE_AGGREMENT].includes(location.pathname) && // Added this condition because api is getting call on disagree button in eula page.
      (!sessionUserDetails?.uid || sessionUserDetails?.uid !== userDetails?.userData?.uid)
    ) {
      fetchUserDetails();
    }
  }, [sessionUserDetails]);

  // **Handle manual navigation to /eula**
  const fromEula = sessionStorage.getItem('from_eula');
  useEffect(() => {
    if (location.pathname === LICENSE_AGGREMENT && user?.userData?.eula === 'No' && fromEula !== 'true') {
      setRedirectPath(DASHBOARD);
      setTimeout(() => {
        showSnackbar({
          message: "You've already agreed to End User License Agreement",
          severity: 'success',
          persist: true,
        });
      }, 500);
    }
  }, [user, location.pathname]);

  //UseEffect to reset the session from_eula to false. Note adding extra useEffect because of Synchonous execution of code.
  useEffect(() => {
    sessionStorage.setItem('from_eula', 'false');
  }, []);

  if (loading || isAuthenticated === null || hasAccess === null) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={SIGN_IN} replace />;
  }

  if (RedirectPath) {
    return <Navigate to={RedirectPath} replace />;
  }

  if (!hasAccess) {
    return <Navigate to={DASHBOARD} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
