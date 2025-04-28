import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActivityData, ChangeHoHDatas, hmGriddata, hmGridEditData, tabList } from '../../../DummyJson';
import { convertParentOptions } from '../../../modules/manageAccounts/helpers/getOptionsByCategory';

const initialState = {
  customersData: null,
  customerViewDetails: null,
  customerViewLoader: false,
  customerGridData: null,
  customerFormFields: null,
  editCustomerData: null,
  editCustomerLoader: false,
  hmFormFields: null,
  hmFormFieldsData: null,
  CustomerTabListData: null,
  requestEditSubmitLoader: false,
  importFormFieldData: null,
  importCustomerData: null,
  importCustomerActionData: null,
  requestEditData: null,
  changeHOHDetailsData: null,
  customerUserProfileData: null,
  getCustomerEditHistoryData: null,
  reqCustomerLoader: false,
  requestedEditsHistoryDetails: null,

  activityHistoryDetails: null,

  importHouseholdCardData: null,

  getCustomerActionTabData: null,
};

export const fetchCustomerDetails = createAsyncThunk('customer/customer-listing', async (queryString) => {
  const response = await Apis.getCustomerListing(queryString);
  const customerList = response?.data?.data;
  const customerHeadersList = [
    ...Object.entries(customerList.default_columns).map(([key, value], index) => {
      let type = null;
      let headerName = value;

      if (value.includes(' - ')) {
        const [name, typePart] = value.split(' - ');
        headerName = name.trim();
        type = typePart.trim();
      }

      return {
        id: index,
        field: key,
        headerName,
        default: true,
        ...(type && { type }),
      };
    }),

    ...Object.entries(customerList.columns)
      .filter(([key]) => !Object.keys(customerList.default_columns).includes(key))
      .map(([key, value], index) => {
        let type = null;
        let headerName = value;

        if (value.includes(' - ')) {
          const [name, typePart] = value.split(' - ');
          headerName = name.trim();
          type = typePart.trim();
        }

        return {
          id: Object.keys(customerList.default_columns).length + index,
          field: key,
          headerName,
          default: false,
          ...(type && { type }),
        };
      }),

    {
      id: Object.keys(customerList.default_columns).length + Object.keys(customerList.columns).length,
      field: 'actions',
      headerName: '',
    },
  ];

  const customerListingDetails = (customerList?.customers && customerList.customers) || [];
  const customerKpiDetails = customerList?.kpi;
  const TotalRecords = response?.data?.total_records;
  const TotalPages = response?.data?.total_pages;
  const currentPageRes = response?.data?.current_page;
  const custQuickActions = customerList?.customer_actions;
  const showCreateButton=customerList?.active_create_btn
  const showImportButton=customerList?.import_create_btn
  return {
    customerHeadersList,
    customerListingDetails,
    customerKpiDetails,
    TotalRecords,
    TotalPages,
    currentPageRes,
    custQuickActions,
    showCreateButton,
    showImportButton,
  };
});

export const viewCustomerDetail = createAsyncThunk('mo/customer-view', async (payload) => {
  const response = await Apis.getCustomerDetails(payload);
  // const response = customerviewData;

  return response;
});

export const getCustomerFormFields = createAsyncThunk('customer-list', async () => {
  const response = await Apis.getCustomerFormFields();
  // const response = customerGriddata?.data;
  const responseData = response?.data;

  return responseData;
});

export const createNewCustomerAction = createAsyncThunk('mo/customer-create', async (payload) => {
  const response = await Apis.createNewCustomer(payload);
  const formFieldResponse = response?.data;

  return formFieldResponse;
});

export const editCustomerDetails = createAsyncThunk('mo/Customer-edit', async (payload) => {
  const response = await Apis.getEditCustomerData(payload);

  const infoTypes = response?.data?.data?.customers?.info_type;

  return { infoTypes };
  // const orgResponse = response?.data?.data;
  // const infoTypes = orgResponse?.organizations?.info_type;
  // const orgTypes = orgResponse?.organizations?.organization_type;

  // return {
  //   infoTypes,
  //   orgTypes,
  // };
});

export const updateCustomerDataAction = createAsyncThunk('mo/customer-update', async ({ id, payload }) => {
  const cleanedPayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, value === '-' ? '' : value])
  );

  const response = await Apis.updateCustomer(id, cleanedPayload);

  const formFieldResponse = response?.data;

  return formFieldResponse;
});

export const getHMFormFields = createAsyncThunk('hm-list', async () => {
  const response = hmGriddata?.data;
  return response;
});

export const getHMFormFieldsData = createAsyncThunk('hm-list-fieldsData', async () => {
  const response = hmGridEditData?.data;
  return response;
});

export const CustomerTabList = createAsyncThunk('mo/Customer-tab-list', async () => {
  // const response = await Apis.getEditCustomerData(payload);
  const response = tabList;
  return response;
});

export const getImportCustomerFormFields = createAsyncThunk('import-customer-list', async () => {
  const response = await Apis.importCustomerFormFields();
  // const response = customerGriddata?.data;
  const responseData = response?.data;

  return responseData;
});

export const gethouseholdCardData = createAsyncThunk('get-household-card-data', async (id) => {
  const response = await Apis.fetchHouseholdCardData(id);
  const responseData = response?.data;
  return responseData;
});

export const createImportCustomerAction = createAsyncThunk('mo/import-customer-create', async (payload) => {
  const response = await Apis.postImportCustomer(payload);
  const formFieldResponse = response?.data;

  return formFieldResponse;
});

export const importCustomerAction = createAsyncThunk('mo/import-customer', async (payload) => {
  const response = await Apis.importCustomer(payload);
  const formFieldResponse = response?.data;

  return formFieldResponse;
});

export const getRequestEdit = createAsyncThunk('edits-history-list', async (profileId) => {
  const response = await Apis.requestEdit(profileId);

  const typeOptions = response?.data?.data?.rows[0]?.field?.options
    ? convertParentOptions(response?.data?.data?.rows[0]?.field?.options)
    : [];

  const kpiDetails = response?.data?.data?.cust_history;
  const KpiData = Object.values(kpiDetails || {}).map(({ title, value }) => ({
    title,
    label1: typeof value === 'object' && value !== null ? value.name : value,
    label2: typeof value === 'object' && value !== null ? value.role : null,
  }));
  const Title = response?.title;
  const from = response?.data?.data?.rows[0]?.from;
  return {
    typeOptions,
    kpiDetails: KpiData,
    Title,
    from,
  };
});

export const requestEditSubmit = createAsyncThunk('mo/request-edit-customer-submit', async (payload) => {
  const response = await Apis.requestEditSubmitData(payload);
  return response;
});

export const getUserProfile = createAsyncThunk('user-profile-data', async (profileId) => {
  const response = await Apis.fetchProfileDetails(profileId);

  if (response?.status === 200) {
    const { data } = response?.data || {};

    const user_data = data?.customers?.info_type || [];
    const buttons = data?.customers?.buttons || [];
    const profile_data = data?.customers?.user_info || [];

    return {
      user_data,
      buttons,
      profile_data,
    };
  }
});

export const getCustomerEditHistory = createAsyncThunk('mo/customer-edit-history', async (payload) => {
  const response = await Apis.customerEditHistory(payload);
  const orgResponse = response?.data?.data || {};

  const KpiDetails = Object.values(orgResponse.cust_history || {}).map(({ title, value }) => ({
    title,
    label1: typeof value === 'object' && value !== null ? value.name : value,
    label2: typeof value === 'object' && value !== null ? value.role : null,
  }));

  const gridData = Array.isArray(orgResponse.rows) ? [...orgResponse.rows] : [];
  return {
    gridData,
    KpiDetails,
  };
});

// export const getChangeHOHDetails = createAsyncThunk('mo/get-change-hoh-deatils', async (payload) => {
//   const response = await Apis.getChangeHOHData(payload);

//   return response;
// });

export const getChangeHOHDetails = createAsyncThunk('mo/get-change-hoh-deatils', async (payload) => {
  const response = await Apis.getChangeHOHData(payload);
  const orgResponse = ChangeHoHDatas?.data || {};

  // const KpiDetails = Object.values(orgResponse.node_history || {}).map(({ title, value }) => ({
  //   title,
  //   label1: typeof value === 'object' && value !== null ? value.name : value,
  //   label2: typeof value === 'object' && value !== null ? value.role : null,
  // }));

  const KpiDetails = Object.values(orgResponse.node_history || {}).map(({ title, value }) => ({
    title,
    label:
      typeof value === 'object' && value !== null
        ? Object.values(value).filter((v) => v) // Extract values from object (e.g., name, role)
        : [value], // Wrap non-object values in an array
  }));

  const form_fields = Array.isArray(orgResponse.form_fields) ? [...orgResponse.form_fields] : [];
  // const formatterGridData = gridData?.map((_, index) => {
  //   return {
  //     ..._, id: index
  //   }
  // });

  return {
    form_fields,
    KpiDetails,
  };
});

export const getRequestEditsHistory = createAsyncThunk('mo/request-edits-history', async (payload) => {
  const response = await Apis.getRequestEditsHistory(payload);
  const orgResponse = response?.data?.data || {};

  const KpiDetails = Object.values(orgResponse.cust_history || {}).map(({ title, value }) => ({
    title,
    label1: typeof value === 'object' && value !== null ? value.name : value,
    label2: typeof value === 'object' && value !== null ? value.role : null,
  }));

  const gridData = Array.isArray(orgResponse.rows) ? [...orgResponse.rows] : [];

  return {
    gridData,
    KpiDetails,
  };
});

export const getActivityHistory = createAsyncThunk('mo/customer-activity-history', async (payload) => {
  const response = await Apis.getActivityHistory(payload);
  const orgResponse = ActivityData?.data || {};

  // const KpiDetails = Object.values(orgResponse.node_history || {}).map(({ title, value }) => ({
  //   title,
  //   label1: typeof value === 'object' && value !== null ? value.name : value,
  //   label2: typeof value === 'object' && value !== null ? value.role : null,
  // }));

  const KpiDetails = Object.values(orgResponse.node_history || {}).map(({ title, value }) => ({
    title,
    label:
      typeof value === 'object' && value !== null
        ? Object.values(value).filter((v) => v) // Extract values from object (e.g., name, role)
        : [value], // Wrap non-object values in an array
  }));

  const gridData = Array.isArray(orgResponse.rows) ? [...orgResponse.rows] : [];
  // const formatterGridData = gridData?.map((_, index) => {
  //   return {
  //     ..._, id: index
  //   }
  // });

  return {
    gridData,
    KpiDetails,
  };
});

const ManageCustomersSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerDetails.pending, (state) => {
      state.customersData = null;
    });
    builder.addCase(fetchCustomerDetails.fulfilled, (state, action) => {
      state.customersData = action.payload || null;
    });
    builder.addCase(fetchCustomerDetails.rejected, (state) => {
      state.customersData = null;
    });

    builder.addCase(viewCustomerDetail.pending, (state) => {
      state.customerViewLoader = true;
      state.customerViewDetails = null;
    });
    builder.addCase(viewCustomerDetail.fulfilled, (state, action) => {
      state.customerViewLoader = false;
      state.customerViewDetails = action.payload;
    });
    builder.addCase(viewCustomerDetail.rejected, (state) => {
      state.customerViewLoader = false;
      state.customerViewDetails = null;
    });

    builder.addCase(getCustomerFormFields.pending, (state) => {
      state.customerViewLoader = true;
      state.customerFormFields = null;
    });
    builder.addCase(getCustomerFormFields.fulfilled, (state, action) => {
      state.customerViewLoader = false;
      state.customerFormFields = action.payload;
    });
    builder.addCase(getCustomerFormFields.rejected, (state) => {
      state.customerViewLoader = false;
      state.customerFormFields = null;
    });

    builder.addCase(createNewCustomerAction.pending, (state) => {
      state.createCustomerResponse = null;
    });
    builder.addCase(createNewCustomerAction.fulfilled, (state, action) => {
      state.createCustomerResponse = action.payload;
    });
    builder.addCase(createNewCustomerAction.rejected, (state) => {
      state.createCustomerResponse = null;
    });

    builder.addCase(editCustomerDetails.pending, (state) => {
      state.editCustomerLoader = true;
      state.editCustomerData = null;
    });
    builder.addCase(editCustomerDetails.fulfilled, (state, action) => {
      state.editCustomerLoader = false;
      state.editCustomerData = action.payload;
    });
    builder.addCase(editCustomerDetails.rejected, (state) => {
      state.editCustomerLoader = false;
      state.editCustomerData = null;
    });

    builder.addCase(getChangeHOHDetails.pending, (state) => {
      state.changeHOHDetailsData = null;
    });
    builder.addCase(getChangeHOHDetails.fulfilled, (state, action) => {
      state.changeHOHDetailsData = action.payload;
    });
    builder.addCase(getChangeHOHDetails.rejected, (state) => {
      state.changeHOHDetailsData = null;
    });

    builder.addCase(getHMFormFields.pending, (state) => {
      state.hmFormFields = null;
    });

    builder.addCase(getHMFormFields.fulfilled, (state, action) => {
      state.hmFormFields = action.payload;
    });

    builder.addCase(getHMFormFields.rejected, (state) => {
      state.hmFormFields = null;
    });

    builder.addCase(getHMFormFieldsData.pending, (state) => {
      state.hmFormFieldsData = null;
    });

    builder.addCase(getHMFormFieldsData.fulfilled, (state, action) => {
      state.hmFormFieldsData = action.payload;
    });

    builder.addCase(getHMFormFieldsData.rejected, (state) => {
      state.hmFormFieldsData = null;
    });

    builder.addCase(CustomerTabList.pending, (state) => {
      state.CustomerTabListData = null;
    });

    builder.addCase(CustomerTabList.fulfilled, (state, action) => {
      state.CustomerTabListData = action.payload;
    });

    builder.addCase(CustomerTabList.rejected, (state) => {
      state.CustomerTabListData = null;
    });

    builder.addCase(getImportCustomerFormFields.pending, (state) => {
      state.importFormFieldData = null;
    });

    builder.addCase(getImportCustomerFormFields.fulfilled, (state, action) => {
      state.importFormFieldData = action.payload;
    });

    builder.addCase(getImportCustomerFormFields.rejected, (state) => {
      state.importFormFieldData = null;
    });

    builder.addCase(gethouseholdCardData.pending, (state) => {
      state.importHouseholdCardData = null;
    });

    builder.addCase(gethouseholdCardData.fulfilled, (state, action) => {
      state.importHouseholdCardData = action.payload;
    });

    builder.addCase(gethouseholdCardData.rejected, (state) => {
      state.importHouseholdCardData = null;
    });

    builder.addCase(createImportCustomerAction.pending, (state) => {
      state.importCustomerData = null;
    });

    builder.addCase(createImportCustomerAction.fulfilled, (state, action) => {
      state.importCustomerData = action.payload;
    });

    builder.addCase(createImportCustomerAction.rejected, (state) => {
      state.importCustomerData = null;
    });

    builder.addCase(importCustomerAction.pending, (state) => {
      state.importCustomerActionData = null;
    });

    builder.addCase(importCustomerAction.fulfilled, (state, action) => {
      state.importCustomerActionData = action.payload;
    });

    builder.addCase(importCustomerAction.rejected, (state) => {
      state.importCustomerActionData = null;
    });
    builder.addCase(getRequestEdit.pending, (state) => {
      state.requestEditData = null;
    });

    builder.addCase(getRequestEdit.fulfilled, (state, action) => {
      state.requestEditData = action.payload;
    });

    builder.addCase(getRequestEdit.rejected, (state) => {
      state.requestEditData = null;
    });

    builder.addCase(requestEditSubmit.pending, (state) => {
      state.requestEditSubmitLoader = true;
    });
    builder.addCase(requestEditSubmit.fulfilled, (state) => {
      state.requestEditSubmitLoader = false;
    });
    builder.addCase(requestEditSubmit.rejected, (state) => {
      state.requestEditSubmitLoader = false;
    });

    builder.addCase(getUserProfile.pending, (state) => {
      state.customerUserProfileData = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.customerUserProfileData = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.customerUserProfileData = null;
    });

    builder.addCase(getCustomerEditHistory.pending, (state) => {
      state.reqCustomerLoader = true;
      state.getCustomerEditHistoryData = null;
    });
    builder.addCase(getCustomerEditHistory.fulfilled, (state, action) => {
      state.reqCustomerLoader = false;
      state.getCustomerEditHistoryData = action.payload;
    });
    builder.addCase(getCustomerEditHistory.rejected, (state) => {
      state.reqCustomerLoader = false;
      state.getCustomerEditHistoryData = null;
    });

    builder.addCase(getRequestEditsHistory.pending, (state) => {
      state.reqCustomerLoader = true;
      state.requestedEditsHistoryDetails = null;
    });
    builder.addCase(getRequestEditsHistory.fulfilled, (state, action) => {
      state.reqCustomerLoader = false;
      state.requestedEditsHistoryDetails = action.payload;
    });
    builder.addCase(getRequestEditsHistory.rejected, (state) => {
      state.reqCustomerLoader = false;
      state.requestedEditsHistoryDetails = null;
    });

    builder.addCase(getActivityHistory.pending, (state) => {
      state.reqCustomerLoader = true;
      state.activityHistoryDetails = null;
    });
    builder.addCase(getActivityHistory.fulfilled, (state, action) => {
      state.reqCustomerLoader = false;
      state.activityHistoryDetails = action.payload;
    });
    builder.addCase(getActivityHistory.rejected, (state) => {
      state.reqCustomerLoader = false;
      state.activityHistoryDetails = null;
    });
  },
});

export default ManageCustomersSlice.reducer;
