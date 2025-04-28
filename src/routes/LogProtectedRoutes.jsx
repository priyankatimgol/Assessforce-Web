import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DASHBOARD, SIGN_IN } from '../utils/enums/RoutesEnums';
import { useEffect, useState } from 'react';
import Apis from '../api/index';
import AppLoader from '../components/AppLoader';

const LogProtectedRoutes = ({ children, isAllowed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('name');

  useEffect(() => {
    const checkSession = async () => {
      try {
        await Apis.checkSession({});
        setIsAuthenticated(true);
      } catch (error) {
        const response = error?.response?.data;
        if (response && response?.code === 'eula') {
          setIsAuthenticated(true);
        } else if (response && response?.code === 'reset_password') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <AppLoader />;
  }

  if (isAuthenticated) {
    sessionStorage.setItem('resetPasswordLogin', 'true');
    return <Navigate to={DASHBOARD} replace state={{emailThroughLink: email, isAuthenticated}} />;
  }

  if (!isAuthenticated && !isAllowed()) {
    console.log('signin');
    //TODO - Fix issue with redirecting to signin immediately after token clear
    // return <Navigate to={SIGN_IN} replace />;
  }

  return children;
};

LogProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  isAllowed: PropTypes.func.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

export default LogProtectedRoutes;
