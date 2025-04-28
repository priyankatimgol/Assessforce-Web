import api from '../api/apiServices';

//Logout
const logoutUser = (payload) => api.get(`/api/auth/logout`, { params: payload });

//Authentication
const fetchLogo = () => api.get(`/api/login-logo-images`, { params: { '_format': 'json' } });
const authentication = (payload) => api.post('/api/auth/signin', payload);
const checkEnv = () => api.get('/api/environment-config', { params: { '_format': 'json' } });
const checkMfaStatus = (payload) =>
  api.post(
    '/api/mfa/check-mfa-setup-completed',
    { uid: payload?.uid },
    {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    }
  );
const mfaSetup = () => api.get('/api/mfa');
const fetchRecoveryCodes = () => api.get('/api/mfa/recovery');
const storeRecoveryCodes = (payload) => api.post('/api/mfa/recovery/validate', payload);
const verifyMFA = (payload) => api.post('/api/mfa/verify-auth', payload);
const storeMFA = (payload) => api.post('/api/mfa/store-authcode-secretKey', payload); // After verifyMFA success call this api.
const fetchRecoveryCodeDetails = () => api.get('/api/mfa/recovery');
const fetchUserLicenseAggrement = () => api.get('/api/auth/eula');
const fetchGeneralSettings = () => api.get('/api/general-settings', { params: { '_format': 'json' } });
const verifyEula = (payload) => api.post('/api/auth/eula/agree', payload);
const resetMFA = (payload) => api.post('/api/mfa/verify-recovery', payload);
const forgotPasswod = (payload) => api.post('/api/auth/password/reset-request', payload);
const passwordPolicySettings = () => api.get('/api/auth/password/policies', { params: { '_format': 'json' } });
const storeNewPassword = (payload) => api.post('/api/auth/password/change', payload);
const expiredPassword = (payload) => api.post('/api/auth/expired-password', payload);
const checkSession = (payload) => api.post('/api/check-session', payload);
const getUserDetails = () => api.get('/api/users/current');
const checkUserMfaStatus = ({ uid, mail, timestamp, token }) =>
  api.post(
    '/api/user/status',
    { uid, mail, timestamp },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Cancelation apis
const cancelApiExecutions = (payload) => api.post('/api/mfa/cancel-expired-time', payload);

//Manage Users
const usersGridData = () => api.get('/api/users');
const getUserFormFields = () => api.get('/api/users/form-fields');
const fetchUserDetails = (uid) => api.get('/api/users/' + uid);
const createNewUser = (payload) => api.post('/api/users', payload);
const editUser = (payload) => api.put('/api/users/' + payload?.id, payload);
const fetchEditUserDetails = (uid) => api.get('/api/users/edit/' + uid);
const fetchSiteDetails = (uid) => api.get('/api/users/site/' + uid);

//Manage Account
const accountGridData = () => api.get('/api/accounts');
const viewAccountDetails = (id) => api.get(`/api/accounts/${id}`);
const createNewAccount = (payload) => api.post('/api/accounts', payload);
const editAccountDetails = (id) => api.get(`/api/accounts/edit/${id}`);
const getAccountFormFields = () => api.get('/api/accounts/form-fields');
const saveEditedAccountData = (id, payload) => api.put(`/api/accounts/${id}`, payload);

//Manage Organization
const getOrganizationDetails = (id) => api.get(`/api/organizations/${id}`);
const getOrganizationListing = () => api.get('/api/organizations');
const getOrganizationEditHistory = (id) => api.get(`/api/organizations/edit/history/${id}`);
const getOrganizationFormFields = () => api.get('/api/organizations/form-fields');
const editOrganization = (id) => api.get(`/api/organizations/edit/${id}`);
const createOrganization = (payload) => api.post('/api/organizations', payload);
const updateOrganization = (id, payload) => api.put(`/api/organizations/${id}`, payload);

//Manage Customers
const getCustomerListing = (queryString) => api.get(`/api/customers?${queryString}`);
const getCustomerDetails = (id) => api.get(`/api/customer/${id}`);
const getCustomerFormFields = () => api.get('/api/customers/form-fields');
const createNewCustomer = (payload) => api.post('/api/customers', payload);
const getEditCustomerData = (id) => api.get(`/api/customer/${id}`);
const updateCustomer = (id, payload) => api.put(`/api/customers/${id}`, payload);

//Import Customer
const importCustomerFormFields = () => api.get('/api/get-import-customer/form-fields');
const postImportCustomer = (payload) => api.post('/api/set-import-customer', payload);
const importCustomer = (payload) => api.post('/api/importcustomers', payload);

//Request Edit
const requestEdit = () => api.get(`/api/customer/request/edit/11922`);
// const requestEdit = (id) => api.get(`/api/customer/request/edit/${id}`);
const requestEditSubmitData = (payload) => api.post(`/api/customer/request/edit`, payload);

//Request Edits History
const getRequestEditsHistory = (payload) => api.get(`/api/customer/request/edit/history/${payload}`);

//Edit History
const customerEditHistory = (payload) => api.get(`/api/customer/edit/history/${payload}`);

//Fetch profile
const fetchProfileDetails = (id) => api.get(`/api/profile/${id}`);

const getChangeHOHData = () => api.get(`/api/modify-hm/form-fields/1910/775`);

//Activity History
const getActivityHistory = (payload) => api.get(`/api/household-action-log/${payload}`);

const fetchHouseholdCardData = (id) => api.get(`/api/composition/${id}`);

const getChangeHOHDetails = (payload) => api.post('/api/get/customers-hoh-details', payload);

const Api = {
  logoutUser,
  fetchLogo,
  authentication,
  checkMfaStatus,
  checkEnv,
  mfaSetup,
  fetchRecoveryCodes,
  storeRecoveryCodes,
  verifyMFA,
  storeMFA,
  fetchRecoveryCodeDetails,
  fetchUserLicenseAggrement,
  fetchGeneralSettings,
  verifyEula,
  resetMFA,
  forgotPasswod,
  cancelApiExecutions,
  passwordPolicySettings,
  storeNewPassword,
  expiredPassword,
  getUserFormFields,
  fetchUserDetails,
  editUser,
  createNewUser,
  usersGridData,
  accountGridData,
  createNewAccount,
  viewAccountDetails,
  editAccountDetails,
  getAccountFormFields,
  saveEditedAccountData,
  fetchSiteDetails,
  fetchEditUserDetails,
  getOrganizationDetails,
  getOrganizationListing,
  getOrganizationEditHistory,
  getOrganizationFormFields,
  editOrganization,
  createOrganization,
  updateOrganization,
  checkSession,
  getUserDetails,
  checkUserMfaStatus,
  getCustomerListing,
  getCustomerDetails,
  getCustomerFormFields,
  importCustomerFormFields,
  importCustomer,
  createNewCustomer,
  requestEdit,
  requestEditSubmitData,
  postImportCustomer,
  getEditCustomerData,
  updateCustomer,
  customerEditHistory,
  fetchProfileDetails,
  getRequestEditsHistory,

  getActivityHistory,
  getChangeHOHData,

  fetchHouseholdCardData,

  getChangeHOHDetails,
};

export default Api;
