export const HOME = '/';
export const SIGN_IN = '/signin';
export const FORGOT_PASSWORD = '/forgot-password';
export const SET_MFA = '/set-mfa';
export const RECOVERY_CODES = '/recovery-codes';
export const LICENSE_AGGREMENT = '/eula';
export const RESET_PASSWORD = '/reset-password';
export const NEW_PASSWORD = '/new-password';
export const SELECT_PROFILE = '/select-profile';
export const OLD_MFA = '/system-mfa';
export const MANAGE_USERS = '/manage-users';
export const NEW_PASSWORD_WITH_EXPIRATION = '/user/:userId/password';
export const MANAGE_ACCOUNTS = '/manage-accounts';
export const MANAGE_CUSTOMERS = '/manage-customers';
export const DASHBOARD = '/dashboard';
export const MANAGE_ORGANIZATIONS = '/manage-organizations';
export const MANAGE_CUSTOMERS_PROFILE = '/manage-customers/:firstParam/:secondParam';
export const routesForHelmet = [
  { path: HOME, name: 'Sign In' },
  { path: SIGN_IN, name: 'Sign In' },
  { path: FORGOT_PASSWORD, name: 'Forgot Password' },
  { path: SET_MFA, name: 'Multiple-Factor Authentication' },
  { path: RECOVERY_CODES, name: 'Your Recovery Codes' },
  { path: LICENSE_AGGREMENT, name: 'License Agreement' },
  { path: RESET_PASSWORD, name: 'Reset password' },
  { path: NEW_PASSWORD, name: 'Reset password' },
  { path: SELECT_PROFILE, name: 'Select Profile' },
  { path: OLD_MFA, name: 'Multiple-Factor Authentication' },
  { path: NEW_PASSWORD_WITH_EXPIRATION, name: 'Reset password' },
  { path: DASHBOARD, name: 'Dashboard' },
  { path: MANAGE_USERS, name: 'Manage Users' },
  { path: MANAGE_ACCOUNTS, name: 'Manage Accounts' },
  { path: MANAGE_ORGANIZATIONS, name: 'Manage Organizations' },
  { path: MANAGE_CUSTOMERS, name: 'Manage Customers' },
  { path: MANAGE_CUSTOMERS_PROFILE, name: 'Manage Customers profile' },
];
