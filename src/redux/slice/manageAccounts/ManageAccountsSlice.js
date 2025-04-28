import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { convertParentOptions } from '../../../modules/manageAccounts/helpers/getOptionsByCategory';

const initialState = {
  accountListingDetails: [],
  accountListingLoader: false,
  createEditAccountLoader: false,
  createAccountDetails: null,
  accountDetailsData: {},
  accountDetailsLoader: false,
  editAccountDetailsData: null,
  editAccountLoader: false,
  formFields: null,
  editInfoDetails: null,
  editInfoLoader: false,
};

export const fetchAccountDetails = createAsyncThunk('ua/account-listing', async (payload) => {
  const response = await Apis.accountGridData(payload);
  const userResponse = response?.data;

  return userResponse;
});

export const createNewAccount = createAsyncThunk('ua/create', async (data, { dispatch }) => {
  const response = await Apis.createNewAccount(data);
  const userResponse = response?.data;

  if (userResponse?.status === 'success') {
    dispatch(fetchAccountDetails());
  }

  return userResponse;
});

export const viewAccountDetails = createAsyncThunk('ua/view', async (data) => {
  const response = await Apis.viewAccountDetails(data);
  const userResponse = response?.data;

  return userResponse;
});

export const editAccountDetails = createAsyncThunk('ua/edit', async (data) => {
  const response = await Apis.editAccountDetails(data);
  const userResponse = response?.data;

  return userResponse;
});

export const fetchFormFields = createAsyncThunk('ua/form-fields', async () => {
  const response = await Apis.getAccountFormFields();
  const formFields = response?.data;

  const entryParentData = formFields?.data?.parent?.options;
  const parentOptions = entryParentData
    ? entryParentData.map((item) => {
        const [value, label] = Object.entries(item)[0];
        return { value, label };
      })
    : [];
  const typeOptions = formFields?.data?.type?.options
    ? convertParentOptions(formFields?.data?.type?.options)
    : [];
  const allFields = formFields?.data?.eform_list;
  const accessFields = formFields?.data?.access?.options
    ? convertParentOptions(formFields?.data?.access?.options)
    : [];
  const showUserCap = formFields?.data?.user_cap_settings_level;
  const defaultUserCap = formFields?.data?.default_field_user_cap;

  const transformOptions = (options) => {
    const transformed = {};

    for (const category in options) {
      let id = 0;
      transformed[category] = [
        {
          id: id++,
          label: 'Select',
          value: 'Select',
        },
        ...Object.entries(options[category])
          .map(([value, label]) => ({
            id: id++,
            label,
            value,
          }))
          .sort((a, b) => b.id - a.id),
      ];
    }

    return transformed;
  };

  const formattedOptions = transformOptions(allFields?.options);

  return {
    parentOptions,
    typeOptions,
    allFields: formattedOptions,
    accessFields,
    showUserCap,
    defaultUserCap,
  };
});

export const saveEditedAccountDetails = createAsyncThunk('ua/edit-data', async (data, { dispatch }) => {
  const response = await Apis.saveEditedAccountData(data?.id, data?.payload);
  const userResponse = response?.data;

  if (userResponse?.status === 'success') {
    dispatch(fetchAccountDetails());
    dispatch(viewAccountDetails(data?.id));
  }

  return userResponse;
});

const ManageAccountsSlice = createSlice({
  name: 'ua',
  initialState,
  reducers: {
    clearEditedData: (state) => {
      state.editAccountDetailsData = null;
      state.editAccountLoader = false;
      state.createAccountDetails = null;
      state.createEditAccountLoader = false;
    },
    clearAccountDetailsData: (state) => {
      state.accountDetailsData = {};
      state.accountDetailsLoader = false;
    },
    clearEditInfoDetails: (state) => {
      state.editInfoDetails = null;
      state.editInfoLoader = false;
      state.createAccountDetails = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAccountDetails.pending, (state) => {
      state.accountListingDetails = [];
      state.accountListingLoader = true;
    });
    builder.addCase(fetchAccountDetails.fulfilled, (state, action) => {
      state.accountListingDetails = action.payload?.data;
      state.accountListingLoader = false;
    });
    builder.addCase(fetchAccountDetails.rejected, (state) => {
      state.accountListingDetails = [];
      state.accountListingLoader = false;
    });

    builder.addCase(createNewAccount.pending, (state) => {
      state.createEditAccountLoader = true;
    });
    builder.addCase(createNewAccount.fulfilled, (state, action) => {
      state.createAccountDetails = action.payload;
      state.createEditAccountLoader = false;
    });
    builder.addCase(createNewAccount.rejected, (state, action) => {
      state.createAccountDetails = null;
      state.createEditAccountLoader = false;
    });

    builder.addCase(viewAccountDetails.pending, (state) => {
      state.accountDetailsLoader = true;
    });
    builder.addCase(viewAccountDetails.fulfilled, (state, action) => {
      state.accountDetailsData = action.payload;
      state.accountDetailsLoader = false;
    });
    builder.addCase(viewAccountDetails.rejected, (state) => {
      state.accountDetailsData = {};
      state.accountDetailsLoader = false;
    });

    builder.addCase(editAccountDetails.pending, (state) => {
      state.editAccountLoader = true;
    });
    builder.addCase(editAccountDetails.fulfilled, (state, action) => {
      state.editAccountDetailsData = action.payload?.data;
      state.editAccountLoader = false;
    });
    builder.addCase(editAccountDetails.rejected, (state) => {
      state.editAccountDetailsData = null;
      state.editAccountLoader = false;
    });

    builder.addCase(fetchFormFields.pending, (state) => {
      state.formFields = null;
    });
    builder.addCase(fetchFormFields.fulfilled, (state, action) => {
      state.formFields = action.payload;
    });
    builder.addCase(fetchFormFields.rejected, (state) => {
      state.formFields = null;
    });

    builder.addCase(saveEditedAccountDetails.pending, (state) => {
      state.editInfoLoader = true;
    });
    builder.addCase(saveEditedAccountDetails.fulfilled, (state, action) => {
      state.editInfoDetails = action?.payload;
      state.editInfoLoader = false;
    });
    builder.addCase(saveEditedAccountDetails.rejected, (state, action) => {
      state.editInfoDetails = null;
      state.editInfoLoader = false;
    });
  },
});

export const { clearEditedData, clearAccountDetailsData, clearEditInfoDetails } = ManageAccountsSlice.actions;

export default ManageAccountsSlice.reducer;
