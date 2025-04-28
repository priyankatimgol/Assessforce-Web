import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LocalStorageHelper from '../../../utils/LocalStorageHelper';
import { setCSRFToken } from '../../../api/apiServices';

const initialState = {
  recoveryCodes: null,
  storeRcoveryCodeDetails: null,
};

export const fetchRecoveryCodes = createAsyncThunk('recovery-code', async (data) => {
  const response = await Apis.fetchRecoveryCodeDetails(data);
  const mfaResponse = response?.data;

  if (mfaResponse && mfaResponse?.token) {
    LocalStorageHelper.setToken(mfaResponse?.token);
  }

  return mfaResponse;
});

export const storeRecoveryCodes = createAsyncThunk('store-recovery-code', async (data) => {
  const response = await Apis.storeRecoveryCodes(data);
  const finalResponse = response?.data;

  if (finalResponse && finalResponse?.csrf_token) {
    LocalStorageHelper.setCSRFToken(finalResponse?.csrf_token);
    LocalStorageHelper.setLogoutToken(finalResponse?.logout_token);
    LocalStorageHelper.removeToken();
    //setCSRFToken(finalResponse?.csrf_token);
  }

  return finalResponse;
});

const recoveryCode = createSlice({
  name: 'rc',
  initialState,
  reducers: {
    clearStoreRcoveryCode: (state) => {
      state.storeRcoveryCodeDetails = null;
      state.recoveryCodes = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRecoveryCodes.fulfilled, (state, action) => {
      state.recoveryCodes = action.payload;
    });
    builder.addCase(fetchRecoveryCodes.rejected, (state) => {
      state.recoveryCodes = null;
    });
    builder.addCase(fetchRecoveryCodes.pending, (state) => {
      state.recoveryCodes = null;
    });

    builder.addCase(storeRecoveryCodes.fulfilled, (state, action) => {
      state.storeRcoveryCodeDetails = action.payload;
    });
    builder.addCase(storeRecoveryCodes.rejected, (state) => {
      state.storeRcoveryCodeDetails = null;
    });
    builder.addCase(storeRecoveryCodes.pending, (state) => {
      state.storeRcoveryCodeDetails = null;
    });
  },
});

export const { clearStoreRcoveryCode } = recoveryCode.actions;

export default recoveryCode.reducer;
