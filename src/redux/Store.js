import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logoSlice from './slice/initialSlice/InitialSlice';
import authenticationSlice from './slice/authSlice/Authentication';
import mfaSlice from './slice/mfa/MfaSlice';
import RecoveryCode from './slice/recoveryCode/RecoveryCode';
import eulaSlice from './slice/eula/EulaSlice';
import ManageUsersSlice from './slice/manageUsers/ManageUsersSlice';
import ManageAccountsSlice from './slice/manageAccounts/ManageAccountsSlice';
import ManageCustomersSlice from './slice/manageCustomers/ManageCustomersSlice';
import manageOrganizations from './slice/manageOrganization/ManageOrganizationSlice';
import { thunk } from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    storage.removeItem('persist:root');
    state = undefined;
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
    }, 1000);
  }
  return combineReducers({
    logoSlice,
    authenticationSlice,
    mfaSlice,
    recoveryCode: RecoveryCode,
    eulaSlice,
    manageUsers: ManageUsersSlice,
    manageAccounts: ManageAccountsSlice,
    manageOrganizations: manageOrganizations,
    manageCustomers: ManageCustomersSlice,
  })(state, action);
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['logoSlice', 'authenticationSlice', 'mfaSlice', 'eulaSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;