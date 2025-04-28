import DashboardLayoutContainer from '../../components/dashboardLayout/DashboardLayoutContainer';
import ASButton from '../../components/mainComponents/ASButton';
import { MANAGE_CUSTOMERS, MANAGE_ORGANIZATIONS } from '../../utils/enums/RoutesEnums';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';
import { useEffect } from 'react';
import storage from '../../utils/SessionStorageHelper';
import { useSelector } from 'react-redux';

const DASHBOARD_SNACKBAR_SHOWN = 'dashboardSnackbarShown';

const Dashboard = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const location = useLocation();
  const { user } = useSelector((state) => state?.authenticationSlice);
  const checkLoginUserEmail = location?.state?.emailThroughLink;
  const isAuthenticated = location?.state?.isAuthenticated;
  const loggedinUserDetails = storage.getUserDetails();
  const resetPasswordLogin = sessionStorage.getItem('resetPasswordLogin');
  const snackbarShown = sessionStorage.getItem(DASHBOARD_SNACKBAR_SHOWN);

  useEffect(() => {
    const anotherUserLoggedInMsg = user?.userData?.another_user_logged_in_msg;
    const updatedString = anotherUserLoggedInMsg
      ?.replace('[other_user]', loggedinUserDetails?.mail)
      ?.replace('[resetting_user]', checkLoginUserEmail);

    if (
      (resetPasswordLogin || isAuthenticated) &&
      anotherUserLoggedInMsg &&
      loggedinUserDetails?.mail &&
      checkLoginUserEmail &&
      checkLoginUserEmail !== loggedinUserDetails?.mail &&
      !snackbarShown
    ) {
      showSnackbar({ message: updatedString, severity: 'success' });
      sessionStorage.setItem(DASHBOARD_SNACKBAR_SHOWN, 'true');
    }

    sessionStorage.removeItem('resetPasswordLogin');
  }, [checkLoginUserEmail, isAuthenticated, loggedinUserDetails?.mail, showSnackbar, user?.userData?.another_user_logged_in_msg]);

  return (
    <DashboardLayoutContainer navigationItems={[]}>
      <div>
        {/* <ASButton onClick={() => navigate(MANAGE_USERS)} variant="text">
          Manage Users
        </ASButton>
        &nbsp;
        <ASButton onClick={() => navigate(MANAGE_ACCOUNTS)} variant="text">
          Manage Accounts
        </ASButton> */}
        &nbsp;
        <ASButton onClick={() => navigate(MANAGE_ORGANIZATIONS)} variant="text">
          Manage Organization
        </ASButton>
        &nbsp;
        <ASButton onClick={() => navigate(MANAGE_CUSTOMERS)} variant="text">
          Manage Customer
        </ASButton>
      </div>
    </DashboardLayoutContainer>
  );
};

export default Dashboard;
