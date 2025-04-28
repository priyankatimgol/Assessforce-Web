import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DashboardLayoutContainer from '../../../components/dashboardLayout/DashboardLayoutContainer';
import UserProfile from './UserProfile';
import CommonTabs from '../../../components/mainComponents/CommonTabs';
import Grid from '@mui/material/Grid2';
import Household from './Household';
import { MANAGE_CUSTOMERS_PROFILE } from '../../../utils/enums/RoutesEnums';
const tabList = [
  { key: 'profile', label: 'Profile', component: <UserProfile /> },
  { key: 'household', label: 'Household', component: <Household /> },
  { key: 'insight', label: 'Insight', component: <h2>Insight Content</h2> },
  { key: 'appointment', label: 'Appointment', component: <h2>Appointment Content</h2> },
  { key: 'interaction', label: 'Interaction', component: <h2>Interaction Content</h2> },
  { key: 'email', label: 'Email', component: <h2>Email Content</h2> },
  { key: 'assessment', label: 'Assessment', component: <h2>Assessment Content</h2> },
  { key: 'plan', label: 'Plan', component: <h2>Plan Content</h2> },
  { key: 'timesheet', label: 'Timesheet', component: <h2>Timesheet Content</h2> },
  { key: 'outcome', label: 'Outcome', component: <h2>Outcome Content</h2> },
];

const extraTabs = [
  { key: 'self-administered', label: 'Self-administered', component: <h2>Self-Administered Content</h2> },
  { key: 'case', label: 'Case', component: <h2>Case Content</h2> },
];

const ManageCustomersProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { customerName: paramCustomerName, tabName } = useParams();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('');

  const customerName = paramCustomerName || 'Francisco Lindor';
  const activeTabIndex = tabList.findIndex((tab) => tab.key === tabName);
  const activeExtraTabIndex = extraTabs.findIndex((tab) => tab.key === tabName);

  const activeTab =
    activeTabIndex !== -1
      ? { index: activeTabIndex, key: tabList[activeTabIndex].key }
      : activeExtraTabIndex !== -1
        ? { index: activeExtraTabIndex, key: extraTabs[activeExtraTabIndex].key }
        : { index: 0, key: 'profile' };

  useEffect(() => {
    if (selectedTab) {
      const newPath = MANAGE_CUSTOMERS_PROFILE.replace(':customerName', customerName).replace(
        ':tabName',
        selectedTab
      );
      navigate(newPath, { state: state }, { replace: true });
    }
  }, [customerName, selectedTab, activeTab.key, navigate]);

  if (activeTabIndex === -1 && activeExtraTabIndex === -1) return null;

  const handleOnChange = (e, newIndex) => {
    const selectedTab = tabList[newIndex];
    if (selectedTab) {
      setSelectedTab(selectedTab.key);
      navigate(`/managecustomer/${customerName}/${selectedTab.key}`);
    }
  };

  const handleMenuClick = (tabKey) => {
    navigate(`/managecustomer/${customerName}/${tabKey}`);
    setMenuAnchor(null);
  };

  return (
    <DashboardLayoutContainer navigationItems={[]}>
      <Grid sx={{ display: 'flex', alignItems: 'center', maxWidth: 'auto', overflowX: 'auto' }}>
        <CommonTabs
          tabList={tabList}
          extraTabs={extraTabs}
          activeTab={activeTab}
          customerName={customerName}
          onChange={handleOnChange}
          onClick={handleMenuClick}
          menuAnchor={menuAnchor}
          setMenuAnchor={setMenuAnchor}
        />
      </Grid>

      <Grid sx={{ marginTop: 0 }}>
        {activeTabIndex !== -1 ? tabList[activeTabIndex].component : extraTabs[activeExtraTabIndex].component}
      </Grid>
    </DashboardLayoutContainer>
  );
};

export default ManageCustomersProfile;
