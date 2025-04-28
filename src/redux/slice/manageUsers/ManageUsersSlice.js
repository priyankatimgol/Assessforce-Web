import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  muUsersDetails: null,
  userEditDetails: null,
  userEditLoader: false,
  createUserDetails: null,
  createUserLoader: false,
  userGridData: null,
  userGridLoader: false,
  userFormFields: null,
  viewUserDetailsLoader: false,
  editUserViewDetails: null,
  editUserViewloader: false,
  siteDetails: null,
};

export const fetchUserDetails = createAsyncThunk('mu-details', async (uid) => {
  const response = await Apis.fetchUserDetails(uid);
  const userResponse = response?.data;
  return userResponse;
});

export const editUserViewDetails = createAsyncThunk('mu-edit-view-detail', async (uid) => {
  const response = await Apis.fetchEditUserDetails(uid);
  const userResponse = response?.data;
  return userResponse;
});

export const getSiteDetails = createAsyncThunk('mu-site-detail', async (uid) => {
  const response = await Apis.fetchSiteDetails(uid);
  const userResponse = response?.data;
  return userResponse;
});

export const fetchUsersGridData = createAsyncThunk('mu-list', async () => {
  const response = await Apis.usersGridData();
  response?.data?.data?.users?.map((item, i) => {
    item.index = i;
    item.fullName = item?.field_first_name + ' ' + item?.field_last_name;
  });
  return response?.data;
});

export const editUserDetails = createAsyncThunk('mu-edit', async (payload, thunkApi) => {
  const response = await Apis.editUser(payload);
  const userResponse = response?.data;
  if (userResponse) {
    if (userResponse?.status !== 'error') {
      thunkApi?.dispatch(fetchUsersGridData());
      thunkApi?.dispatch(fetchUserDetails(payload?.id));
    }
  }
  return userResponse;
});

export const createNewUser = createAsyncThunk('mu-create', async (payload, thunkApi) => {
  const response = await Apis.createNewUser(payload);
  const userResponse = response?.data;
  if (userResponse) {
    if (userResponse?.status !== 'error') {
      thunkApi?.dispatch(fetchUsersGridData());
    }
  }
  return userResponse;
});
export const getUserFormFields = createAsyncThunk('mu-formFields', async (data) => {
  const response = await Apis.getUserFormFields(data);
  const userResponse = response?.data;

  return userResponse;
});

const ManageUsersSlice = createSlice({
  name: 'mu',
  initialState,
  reducers: {
    clearEditUserInfoDetails: (state) => {
      state.userEditDetails = null;
      state.userEditLoader = false;
      state.createUserDetails = null;
      state.createUserLoader = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.muUsersDetails = action.payload;
      state.viewUserDetailsLoader = false;
    });
    builder.addCase(fetchUserDetails.rejected, (state) => {
      state.muUsersDetails = null;
      state.viewUserDetailsLoader = false;
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.muUsersDetails = null;
      state.viewUserDetailsLoader = true;
    });
    builder.addCase(getSiteDetails.fulfilled, (state, action) => {
      state.siteDetails = action.payload;
    });
    builder.addCase(getSiteDetails.rejected, (state) => {
      state.siteDetails = null;
    });
    builder.addCase(getSiteDetails.pending, (state) => {
      state.siteDetails = null;
    });
    builder.addCase(editUserViewDetails.fulfilled, (state, action) => {
      state.editUserViewDetails = action.payload;
      state.editUserViewloader = false;
    });
    builder.addCase(editUserViewDetails.rejected, (state) => {
      state.editUserViewDetails = null;
      state.editUserViewloader = false;
    });
    builder.addCase(editUserViewDetails.pending, (state) => {
      state.editUserViewDetails = null;
      state.editUserViewloader = true;
    });

    builder.addCase(editUserDetails.fulfilled, (state, action) => {
      state.userEditDetails = action.payload;
      state.userEditLoader = false;
    });
    builder.addCase(editUserDetails.rejected, (state, action) => {
      state.userEditDetails = null;
      state.userEditLoader = false;
    });
    builder.addCase(editUserDetails.pending, (state) => {
      state.userEditDetails = null;
      state.userEditLoader = true;
    });

    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.createUserDetails = action.payload;
      state.createUserLoader = false;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.createUserDetails = null;
      state.createUserLoader = false;
    });
    builder.addCase(createNewUser.pending, (state) => {
      state.createUserDetails = null;
      state.createUserLoader = true;
    });
    builder.addCase(fetchUsersGridData.pending, (state) => {
      state.userGridData = null;
      state.userGridLoader = true;
    });

    builder.addCase(fetchUsersGridData.rejected, (state) => {
      state.userGridData = null;
      state.userGridLoader = false;
    });
    builder.addCase(fetchUsersGridData.fulfilled, (state, action) => {
      state.userGridData = action.payload;
      state.userGridLoader = false;
    });

    builder.addCase(getUserFormFields.pending, (state) => {
      state.userFormFields = null;
    });

    builder.addCase(getUserFormFields.rejected, (state) => {
      state.userFormFields = null;
    });
    builder.addCase(getUserFormFields.fulfilled, (state, action) => {
      state.userFormFields = action.payload;
    });
  },
});

export const { clearEditUserInfoDetails } = ManageUsersSlice.actions;

export default ManageUsersSlice.reducer;
