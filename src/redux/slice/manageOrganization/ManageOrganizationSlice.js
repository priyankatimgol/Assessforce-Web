import Apis from '../../../api/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  organizationListingDetails: [],
  organizationViewDetails: null,
  organizationViewLoader: false,
  organizationEditHistoryDetails: null,
  organizationEditHistoryLoader: false,
  organizationFormFields: null,
  organizationFormFieldsLoader: false,
  editOrganizationData: null,
  editOrganizationLoader: false,
  formFieldData: null,
  formFieldLoader: false,
  createOrganizationResponse: null,
  createOrganizationLoader: false,
  editOrganizationDetailsLoader: false,
};

export const fetchOrganizationDetails = createAsyncThunk('mo/organization-listing', async () => {
  const response = await Apis.getOrganizationListing();
  const listingDetails = response?.data?.data;

  const organizationHeadersList = [
    ...Object.entries(listingDetails.default_columns).map(([key, value], index) => {
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

    ...Object.entries(listingDetails.columns)
      .filter(([key]) => !Object.keys(listingDetails.default_columns).includes(key))
      .map(([key, value], index) => {
        let type = null;
        let headerName = value;

        if (value.includes(' - ')) {
          const [name, typePart] = value.split(' - ');
          headerName = name.trim();
          type = typePart.trim();
        }

        return {
          id: Object.keys(listingDetails.default_columns).length + index,
          field: key,
          headerName,
          default: false,
          ...(type && { type }),
        };
      }),

    {
      id: Object.keys(listingDetails.default_columns).length + Object.keys(listingDetails.columns).length,
      field: 'actions',
      headerName: '',
    },
  ];

  const organizationListing = listingDetails?.organizations;
  const organizationKpiDetails = listingDetails?.kpi;
  const orgQuickActions = listingDetails?.organization_actions;

  return { organizationHeadersList, organizationListing, organizationKpiDetails, orgQuickActions };
});

export const viewOrganizationDetail = createAsyncThunk('mo/organization-view', async (payload) => {
  const response = await Apis.getOrganizationDetails(payload);
  const orgResponse = response?.data;

  return orgResponse;
});

export const editOrganizationDetails = createAsyncThunk('mo/organization-edit', async (payload) => {
  const response = await Apis.editOrganization(payload);
  const orgResponse = response?.data?.data;
  const infoTypes = orgResponse?.organizations?.info_type;
  const orgTypes = orgResponse?.organizations?.organization_type;

  return {
    infoTypes,
    orgTypes,
  };
});

export const getOrganizationEditHistory = createAsyncThunk(
  'mo/organization-edit-history',
  async (payload) => {
    const response = await Apis.getOrganizationEditHistory(payload);
    const orgResponse = response?.data?.data || {};

    const KpiDetails = Object.values(orgResponse.node_history || {}).map(({ title, value }) => ({
      title,
      label1: typeof value === 'object' && value !== null ? value.name : value,
      label2: typeof value === 'object' && value !== null ? value.role : null,
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
  }
);

export const fetchFormFields = createAsyncThunk('mo/organization-form-fields', async (payload) => {
  const response = await Apis.getOrganizationFormFields(payload);
  const formFieldResponse = response?.data?.data;

  return formFieldResponse;
});

export const createOrganizationAction = createAsyncThunk('mo/organization-create', async (payload) => {
  const response = await Apis.createOrganization(payload);
  const formFieldResponse = response?.data;

  return formFieldResponse;
});

export const updateOrganizationAction = createAsyncThunk(
  'mo/organization-update',
  async ({ id, payload }) => {
    console.log(payload);
    const response = await Apis.updateOrganization(id, payload);
    const formFieldResponse = response?.data;

    return formFieldResponse;
  }
);

const ManageOrganizationSlice = createSlice({
  name: 'mo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchOrganizationDetails.pending, (state) => {
      state.organizationListingDetails = [];
    });
    builder.addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
      state.organizationListingDetails = action.payload || [];
    });
    builder.addCase(fetchOrganizationDetails.rejected, (state) => {
      state.organizationListingDetails = [];
    });

    builder.addCase(viewOrganizationDetail.pending, (state) => {
      state.organizationViewDetails = null;
      state.organizationViewLoader = true;
    });
    builder.addCase(viewOrganizationDetail.fulfilled, (state, action) => {
      state.organizationViewDetails = action.payload;
      state.organizationViewLoader = false;
    });
    builder.addCase(viewOrganizationDetail.rejected, (state) => {
      state.organizationViewDetails = null;
      state.organizationViewLoader = false;
    });

    builder.addCase(getOrganizationEditHistory.pending, (state) => {
      state.organizationEditHistoryLoader = true;
      state.organizationEditHistoryDetails = null;
    });
    builder.addCase(getOrganizationEditHistory.fulfilled, (state, action) => {
      state.organizationEditHistoryLoader = false;
      state.organizationEditHistoryDetails = action.payload;
    });
    builder.addCase(getOrganizationEditHistory.rejected, (state) => {
      state.organizationEditHistoryLoader = false;
      state.organizationEditHistoryDetails = null;
    });

    builder.addCase(editOrganizationDetails.pending, (state) => {
      state.editOrganizationLoader = true;
      state.editOrganizationData = null;
    });
    builder.addCase(editOrganizationDetails.fulfilled, (state, action) => {
      state.editOrganizationLoader = false;
      state.editOrganizationData = action.payload;
    });
    builder.addCase(editOrganizationDetails.rejected, (state) => {
      state.editOrganizationLoader = false;
      state.editOrganizationData = null;
    });

    builder.addCase(fetchFormFields.pending, (state) => {
      state.formFieldData = null;
      state.formFieldLoader = true;
    });
    builder.addCase(fetchFormFields.fulfilled, (state, action) => {
      state.formFieldData = action.payload;
      state.formFieldLoader = false;
    });
    builder.addCase(fetchFormFields.rejected, (state) => {
      state.formFieldData = null;
      state.formFieldLoader = false;
    });

    builder.addCase(createOrganizationAction.pending, (state) => {
      state.createOrganizationLoader = true;
      state.createOrganizationResponse = null;
    });

    builder.addCase(createOrganizationAction.fulfilled, (state, action) => {
      state.createOrganizationLoader = false;
      state.createOrganizationResponse = action.payload;
    });
    builder.addCase(createOrganizationAction.rejected, (state) => {
      state.createOrganizationLoader = false;
      state.createOrganizationResponse = null;
    });

    builder.addCase(updateOrganizationAction.pending, (state) => {
      state.editOrganizationDetailsLoader = true;
    });
    builder.addCase(updateOrganizationAction.fulfilled, (state) => {
      state.editOrganizationDetailsLoader = false;
    });
    builder.addCase(updateOrganizationAction.rejected, (state) => {
      state.editOrganizationDetailsLoader = false;
    });
  },
});

export default ManageOrganizationSlice.reducer;
