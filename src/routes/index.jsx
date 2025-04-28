import { createContext, lazy, Suspense, useContext, useEffect, useMemo, useState } from 'react';
import {
  //BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  matchPath,
} from 'react-router-dom';
import {
  DASHBOARD,
  FORGOT_PASSWORD,
  HOME,
  LICENSE_AGGREMENT,
  MANAGE_ACCOUNTS,
  MANAGE_ORGANIZATIONS,
  MANAGE_USERS,
  NEW_PASSWORD_WITH_EXPIRATION,
  OLD_MFA,
  RECOVERY_CODES,
  RESET_PASSWORD,
  routesForHelmet,
  SET_MFA,
  SIGN_IN,
  MANAGE_CUSTOMERS,
  MANAGE_CUSTOMERS_PROFILE,
} from '../utils/enums/RoutesEnums';
import ProtectedRoute from './ProtectedRoute';
import storage from '../utils/LocalStorageHelper';
//import { initializeAxios, setJwtToken } from '../api/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { checkEnv, resetForgotPasswordState } from '../redux/slice/authSlice/Authentication';
import AppLoader from '../components/AppLoader';
import ManageUsers from '../modules/manageUsers/ManageUsers';
import NewPasswordWithExpiration from '../modules/resetPassword/NewPasswordWithExpiration';
import { resetMfaMessageOnAttemptEnd } from '../redux/slice/mfa/MfaSlice';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { clearEventualRequest } from '../redux/slice/initialSlice/InitialSlice';
import ManageAccounts from '../modules/manageAccounts/ManageAccounts';
import ManageCustomers from '../modules/manageCustomers/ManageCustomers';
import ManageOrganizations from '../modules/manageOrg/ManageOrganizations';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Dashboard from '../modules/Dashboard/Dashboard';
import LogProtectedRoutes from './LogProtectedRoutes';
import { ThemeContext } from '../context/ThemeContext';
import ManageCustomersProfile from '../modules/manageCustomers/profile/ManageCustomersProfile';

const Login = lazy(() => import('../modules/login/Login'));
const ForgotPassword = lazy(() => import('../modules/forgotPassword/ForgotPassword'));
const MultifactorAuth = lazy(() => import('../modules/login/components/MultifactorAuth'));
const RecoveryCodes = lazy(() => import('../modules/login/components/RecoveryCodes'));
const LicenseAggrement = lazy(() => import('../modules/login/components/LicenseAggrement'));
const SetNewPassword = lazy(() => import('../modules/resetPassword/SetNewPassword'));
const ExistingAuthentication = lazy(() => import('../modules/login/components/ExistingAuthentication'));

const isAuthenticated = () => !!localStorage.getItem('token');
// const isAuthenticated = () => true;

function RootRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = storage.getToken();
  const csrfToken = storage.getCSRFToken();
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const {
    logoDetails: { website_favicon_image },
  } = useSelector((state) => state?.logoSlice);

  useEffect(() => {
    if (!token || !csrfToken) {
      dispatch(checkEnv());
    }
  }, [csrfToken, dispatch, token]);

  useEffect(() => {
    dispatch(resetForgotPasswordState());
    dispatch(clearEventualRequest());
    dispatch(resetMfaMessageOnAttemptEnd());
  }, [dispatch]);

  // useEffect(() => {
  //   if (user === null) {
  //     console.log('Callings');
  //     localStorage.clear();
  //     dispatch(clearMfa());
  //     dispatch(resetMfaSetup());
  //   }
  // }, [dispatch, user]);

  // useEffect(() => {
  //   if (user !== null) return;

  //   const tabId = sessionStorage.getItem('tabId') || `${Date.now()}-${Math.random()}`;
  //   sessionStorage.setItem('tabId', tabId);

  //   const checkIsAppOpen = () => {
  //     const currentAppId = localStorage.getItem('isAppOpen');
  //     if (currentAppId && currentAppId !== tabId) {
  //       localStorage.clear();
  //       dispatch(clearMfa());
  //       dispatch(resetMfaSetup());
  //       dispatch(clearEventualRequest());
  //       dispatch(resetMfaMessageOnAttemptEnd());
  //     } else {
  //       localStorage.setItem('isAppOpen', tabId);
  //     }
  //   };
  //   checkIsAppOpen();

  //   const handleStorageChange = (event) => {
  //     if (event.key === 'isAppOpen') {
  //       checkIsAppOpen();
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //     if (sessionStorage.getItem('tabId') === tabId) {
  //       sessionStorage.removeItem('tabId');
  //     }
  //   };
  // }, [dispatch]);

  useEffect(() => {
    const currentRoute = routesForHelmet?.find((route) => matchPath(route.path, location.pathname));

    const websiteName = currentEnv?.website_name || '';
    if (currentRoute) {
      document.title = `${currentRoute.name} | ${websiteName}`;
    } else {
      document.title = `Sign In | ${websiteName}`;
    }

    if (website_favicon_image) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = website_favicon_image;
    }
  }, [location, currentEnv, routesForHelmet, website_favicon_image]);

  useEffect(() => {
    const topStrip = document.querySelector('.top-strip');

    if (topStrip) {
      topStrip.style.backgroundColor = currentEnv?.environment_color || 'none';
    }
  }, []);

  const { mode } = useContext(ThemeContext);

  return (
    <Suspense fallback={<AppLoader />}>
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <SwitchTransition>
          <CSSTransition key={location.pathname} classNames="fade" timeout={300} unmountOnExit>
            <Routes location={location}>
              <Route
                path={HOME}
                element={
                  isAuthenticated() ? <Navigate to={DASHBOARD} replace /> : <Navigate to={SIGN_IN} replace />
                }
              />

              <Route
                path={SIGN_IN}
                element={
                  <LogProtectedRoutes isAllowed={() => true}>
                    <Login />
                  </LogProtectedRoutes>
                }
              />
              <Route
                path={FORGOT_PASSWORD}
                element={
                  <LogProtectedRoutes isAllowed={() => true}>
                    <ForgotPassword />
                  </LogProtectedRoutes>
                }
              />
              <Route
                path={RESET_PASSWORD}
                element={
                  <LogProtectedRoutes isAllowed={() => true}>
                    <SetNewPassword />
                  </LogProtectedRoutes>
                }
              />
              <Route
                path={SET_MFA}
                element={
                  <LogProtectedRoutes isAllowed={isAuthenticated}>
                    <MultifactorAuth />
                  </LogProtectedRoutes>
                }
              />
              <Route
                path={OLD_MFA}
                element={
                  <LogProtectedRoutes isAllowed={isAuthenticated}>
                    <ExistingAuthentication />
                  </LogProtectedRoutes>
                }
              />
              <Route
                path={RECOVERY_CODES}
                element={
                  <LogProtectedRoutes isAllowed={isAuthenticated}>
                    <RecoveryCodes />
                  </LogProtectedRoutes>
                }
              />
              <Route
                path={LICENSE_AGGREMENT}
                element={
                  <ProtectedRoute>
                    <LicenseAggrement />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path={SELECT_PROFILE}
                element={
                  <LogProtectedRoutes isAllowed={isAuthenticated}>
                    <ProfileSelection />
                  </LogProtectedRoutes>
                }
              /> */}
              <Route
                path={NEW_PASSWORD_WITH_EXPIRATION}
                element={
                  <ProtectedRoute>
                    <NewPasswordWithExpiration />
                  </ProtectedRoute>
                }
              />
              <Route
                path={MANAGE_USERS}
                element={
                  <ProtectedRoute>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path={MANAGE_ACCOUNTS}
                element={
                  <ProtectedRoute requiredRoles={['parent_admin']}>
                    <ManageAccounts />
                  </ProtectedRoute>
                }
              />
              <Route
                path={DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path={MANAGE_CUSTOMERS} element={<ManageCustomers />} />
              <Route path={MANAGE_CUSTOMERS_PROFILE} element={<ManageCustomersProfile />} />
              <Route
                path={MANAGE_ORGANIZATIONS}
                element={
                  <ProtectedRoute>
                    <ManageOrganizations />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to={SIGN_IN} replace />} />
            </Routes>
          </CSSTransition>
        </SwitchTransition>
      {/* </ThemeProvider> */}
    </Suspense>
  );
}

export default RootRoutes;
