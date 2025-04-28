import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
const initialState = {
  user: null,
  loginLoader: false,
  currentEnv: null,
  forgotPasswordDetails: null,
  fpLoader: null,
  passwordResetDetails: null,
  prLoader: false,
  forgotPasswordSuccess: false,
  forceReset: false,
  forgotPasswordSnackbar: {
    open: false,
    message: '',
    severity: 'success',
  },
};

export const checkMfaSetupComplete = createAsyncThunk('authentication/mfa-setup', async ({ uid, token }) => {
  const response = await Apis.checkMfaStatus({ uid, token });
  const mfaDetails = response?.data;

  return mfaDetails;
});

export const loginUser = createAsyncThunk('authentication/user', async ({ payload }) => {
  const response = await Apis.authentication(payload);
  const userData = response?.data;

  return { userData };
});

export const forgotPasswordAction = createAsyncThunk('authentication/forgot-password', async (payload) => {
  const response = await Apis.forgotPasswod(payload);
  const message = response?.data;

  return message;
});

export const checkEnv = createAsyncThunk('authentication/env', async () => {
  const response = await Apis.checkEnv();
  const envDetails = response?.data;

  return envDetails;
});

export const passwordPolicy = createAsyncThunk('authentication/password-policy-settings', async () => {
  const response = await Apis.passwordPolicySettings();
  const passwordPolicySettings = response?.data;

  return passwordPolicySettings;
});

export const storeResetPassword = createAsyncThunk('authentication/store-reset-password', async (payload) => {
  const response = await Apis.storeNewPassword(payload);
  const responseData = response?.data;

  return responseData;
});

export const updateExpiredPassword = createAsyncThunk('authentication/expired-password', async (payload) => {
  const response = await Apis.expiredPassword(payload);
  const responseData = response?.data;

  return responseData;
});

export const handleLogoutUser = createAsyncThunk('authentication/logoutUser', async (payload) => {
  const response = await Apis.logoutUser(payload);
  const responseData = response?.data;
  return responseData;
});

const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state) => {
      LocalStorageHelper.removeToken('token');
      LocalStorageHelper.removeUser('user');
      state.user = null;
    },
    resetMfaSetup: (state) => {
      state.isMfaSetup = null;
      state.user = null;
      state.loginLoader = false;
      LocalStorageHelper.removeToken('token');
      LocalStorageHelper.removeUser('user');
      state.isMfaSetup = null;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordSuccess = true;
    },
    resetForgotPasswordState: (state) => {
      state.forgotPasswordDetails = null;
      state.forgotPasswordSuccess = false;
      if (state.user?.userData?.message) {
        state.user.userData.message = null; // or delete state.user.userData.message;
      }
    },
    setForceResetState: (state) => {
      state.forceReset = true;
    },
    resetStoredPasswordDetails: (state) => {
      state.storeResetPassword = null;
    },
    resetExpiredPasswordDetails: (state) => {
      state.updateExpiredPassword = null;
    },
    resetLogin: (state) => {
      state.user = null;
      state.loginLoader = false;
    },
    hideForgotPasswordSnackbar: (state) => {
      state.forgotPasswordSnackbar = {
        open: false,
        message: '',
        severity: 'success',
      };
    },
    handleChangeEulaStatus: (state) => {
      if (state.user.userData) {
        state.user.userData.eula = 'No';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoader = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loginLoader = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.user = null;
      state.loginLoader = false;
    });

    builder.addCase(checkEnv.fulfilled, (state, action) => {
      state.currentEnv = action.payload;
    });
    builder.addCase(checkEnv.rejected, (state) => {
      state.currentEnv = null;
    });
    builder.addCase(checkEnv.pending, (state) => {
      state.currentEnv = null;
    });

    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.forgotPasswordDetails = action.payload;
      state.fpLoader = false;
      state.forgotPasswordSnackbar = {
        open: true,
        message: action?.payload?.message,
        severity: action?.payload?.status === 'error' ? 'error' : 'success',
      };
    });
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.forgotPasswordDetails = null;
      state.fpLoader = false;
      state.forgotPasswordSnackbar = {
        open: true,
        message: action?.payload?.message,
        severity: 'error',
      };
    });
    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.forgotPasswordDetails = null;
      state.fpLoader = true;
    });

    builder.addCase(storeResetPassword.fulfilled, (state, action) => {
      state.storeResetPassword = action.payload;
      state.prLoader = false;
      const userData = {
        uid: action.payload?.uid,
        email: action.payload?.email,
        roles: action.payload?.roles,
      };

      state.user = { userData };
    });
    builder.addCase(storeResetPassword.rejected, (state) => {
      state.storeResetPassword = null;
      state.prLoader = false;
    });
    builder.addCase(storeResetPassword.pending, (state) => {
      state.storeResetPassword = null;
      state.prLoader = true;
    });

    builder.addCase(updateExpiredPassword.fulfilled, (state, action) => {
      state.updateExpiredPassword = action.payload;
      state.prLoader = false;
    });
    builder.addCase(updateExpiredPassword.rejected, (state) => {
      state.updateExpiredPassword = null;
      state.prLoader = false;
    });
    builder.addCase(updateExpiredPassword.pending, (state) => {
      state.updateExpiredPassword = null;
      state.prLoader = true;
    });
  },
});

export const {
  logout,
  resetMfaSetup,
  forgotPasswordSuccess,
  resetForgotPasswordState,
  setForceResetState,
  resetStoredPasswordDetails,
  resetExpiredPasswordDetails,
  resetLogin,
  hideForgotPasswordSnackbar,
  handleChangeEulaStatus,
} = authentication.actions;

export default authentication.reducer;
