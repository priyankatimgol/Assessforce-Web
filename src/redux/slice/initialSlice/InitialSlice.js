import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  logoDetails: {},
  eventualRequestData: null,
  generalSettingsData: null,
};

export const fetchLogos = createAsyncThunk('login/details', async () => {
  const response = await Apis.fetchLogo();
  const finalData = response?.data;

  return finalData;
});

export const cancelEventualRequest = createAsyncThunk('cancel/request', async (data) => {
  const response = await Apis.cancelApiExecutions(data);
  const finalResponse = response?.data;

  return finalResponse;
});

export const generalSettingsDetails = createAsyncThunk('settings/general', async (data) => {
  const response = await Apis.fetchGeneralSettings(data);
  const finalResponse = response?.data;

  return finalResponse;
});

const logoData = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearEventualRequest: (state) => {
      state.eventualRequestData = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogos.pending, (state) => {
      state.logoDetails = state.logoDetails || {};
    });
    builder.addCase(fetchLogos.fulfilled, (state, action) => {
      const newLogoDetails = action.payload;

      if (
        state.logoDetails.site_logo !== newLogoDetails.site_logo ||
        state.logoDetails.login_front_page_image !== newLogoDetails.login_front_page_image
      ) {
        state.logoDetails = newLogoDetails;
      }
    });
    builder.addCase(fetchLogos.rejected, (state) => {
      state.logoDetails = {};
    });

    builder.addCase(cancelEventualRequest.fulfilled, (state, action) => {
      state.eventualRequestData = action?.payload;
    });
    builder.addCase(cancelEventualRequest.rejected, (state) => {
      state.eventualRequestData = null;
    });
    builder.addCase(cancelEventualRequest.pending, (state) => {
      state.eventualRequestData = null;
    });

    builder.addCase(generalSettingsDetails.fulfilled, (state, action) => {
      state.generalSettingsData = action?.payload;
    });
    builder.addCase(generalSettingsDetails.rejected, (state) => {
      state.generalSettingsData = null;
    });
    builder.addCase(generalSettingsDetails.pending, (state) => {
      state.generalSettingsData = null;
    });
  },
});

export const { clearEventualRequest } = logoData.actions;

export default logoData.reducer;
