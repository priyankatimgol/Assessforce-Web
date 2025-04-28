import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  mfaDetails: null,
  mfaStatus: null,
  mfaStatusLoader: false,
  resetMFACodes: null,
  resetMFALoader: false,
  finalMfaMessage: '',
  userMfaStatus: null,
};

export const setMFASetup = createAsyncThunk('mfa/set-mfa-setup', async (data) => {
  const response = await Apis.mfaSetup(data);
  const mfaResponse = response?.data;

  return mfaResponse;
});

export const verifyMfaAction = createAsyncThunk('mfa/verify-mfa-setup', async ({ authCode, secretkey }) => {
  const payload = secretkey ? { authCode, secretkey } : { authCode };
  const response = await Apis.verifyMFA(payload);
  const mfaResponse = response?.data;

  return mfaResponse;
});

export const storeMFA = createAsyncThunk('mfa/store-mfa-setup', async (data) => {
  const response = await Apis.storeMFA(data);
  const mfaResponse = response?.data;

  return mfaResponse;
});

export const resetMFADetails = createAsyncThunk('mfa/reset-mfa-code', async (data) => {
  const response = await Apis.resetMFA(data);
  const mfaResponse = response?.data;

  return mfaResponse;
});


export const setUserMfaStatus = createAsyncThunk('mfa/user-mfa-status', async (data) => {
  const response = await Apis.checkUserMfaStatus(data);
  const mfaResponse = response?.data;

  return mfaResponse;
});

const mfaSlice = createSlice({
  name: 'mfa',
  initialState,
  reducers: {
    clearMfa: (state) => {
      state.resetMFACodes = null;
      state.resetMFALoader = false;
      state.mfaStatus = null;
      state.resetMFALoader = false;
      state.mfaDetails = null;
      // state.userMfaStatus = null;
    },
    setMfaMessageOnAttemptEnd: (state, action) => {
      state.finalMfaMessage = action.payload?.message;
    },
    resetMfaMessageOnAttemptEnd: (state) => {
      state.finalMfaMessage = '';
    },
    resetUserMfaStatus: (state) => {
      state.userMfaStatus = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(setMFASetup.fulfilled, (state, action) => {
      state.mfaDetails = action.payload;
    });
    builder.addCase(setMFASetup.rejected, (state) => {
      state.mfaDetails = null;
    });
    builder.addCase(setMFASetup.pending, (state) => {
      state.mfaDetails = null;
    });

    builder.addCase(verifyMfaAction.fulfilled, (state, action) => {
      state.mfaStatus = action.payload;
      state.mfaStatusLoader = false;
    });
    builder.addCase(verifyMfaAction.rejected, (state, action) => {
      state.mfaStatus = action.payload || {
        status: 'error',
        message: 'Unknown error',
      };
      state.mfaStatusLoader = false;
    });
    builder.addCase(verifyMfaAction.pending, (state) => {
      state.mfaStatus = null;
      state.mfaStatusLoader = true;
    });

    builder.addCase(resetMFADetails.fulfilled, (state, action) => {
      state.resetMFACodes = action.payload;
      state.resetMFALoader = false;
    });
    builder.addCase(resetMFADetails.rejected, (state) => {
      state.resetMFACodes = null;
      state.resetMFALoader = false;
    });
    builder.addCase(resetMFADetails.pending, (state) => {
      state.resetMFACodes = null;
      state.resetMFALoader = true;
    });

    builder.addCase(setUserMfaStatus.fulfilled, (state, action) => {
      state.userMfaStatus = action.payload;
    });
    builder.addCase(setUserMfaStatus.rejected, (state) => {
      state.userMfaStatus = null;
    });
    builder.addCase(setUserMfaStatus.pending, (state) => {
      state.userMfaStatus = null;
    });
  },
});

export const { clearMfa, setMfaMessageOnAttemptEnd, resetMfaMessageOnAttemptEnd, resetUserMfaStatus } = mfaSlice.actions;

export default mfaSlice.reducer;
