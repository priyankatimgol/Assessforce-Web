import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  eulaDetails: null,
};

export const fetchEulaDetails = createAsyncThunk('eula/ULA', async (data) => {
  const response = await Apis.fetchUserLicenseAggrement(data);
  const mfaResponse = response?.data;

  return mfaResponse;
});

export const verifyEulaDetails = createAsyncThunk('eula/verify', async (data) => {
  const response = await Apis.verifyEula(data);
  const mfaResponse = response?.data;

  return mfaResponse;
});

const eulaSlice = createSlice({
  name: 'eula',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchEulaDetails.fulfilled, (state, action) => {
      state.eulaDetails = action.payload;
    });
    builder.addCase(fetchEulaDetails.rejected, (state) => {
      state.eulaDetails = null;
    });
    builder.addCase(fetchEulaDetails.pending, (state) => {
      state.eulaDetails = null;
    });
  },
});

export default eulaSlice.reducer;
