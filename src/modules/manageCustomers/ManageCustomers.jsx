import { createContext, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import DashboardLayoutContainer from '../../components/dashboardLayout/DashboardLayoutContainer';
import ASButton from '../../components/mainComponents/ASButton';
import CustomersKpiCards from './components/CustomersKpiCards';
import CreateCustomer from './components/CreateCustomer';
import Breadcrumb from '../../components/mainComponents/Breadcrumb';
import ViewCustomerDetails from './components/ViewCustomerDetails';
import ImportCustomer from './components/ImportCustomer';
import ImportButtonIcon from '../../assets/customSVGIcons/ImportButtonIcon';
import CreateIcon from '../../assets/customSVGIcons/sidebarIcons/CreateIcon';
import ChangeHOH from './components/ChangeHOH';
import ASDataGridCustomer from '../../components/mainComponents/ASDataGridCustomer';
import RequestedEditsHistory from './components/RequestedEditsHistory';
import RequestEdits from './components/RequestEdits';
import ActivityHistory from './components/ActivityHistory';
import {
  getActivityHistory,
  getCustomerEditHistory,
  getRequestEditsHistory,
} from '../../redux/slice/manageCustomers/ManageCustomersSlice';
import EditsHistory from './components/EditsHistory';
import '../../styles/manageCustomers.styles.css';

export const CustomersContext = createContext();
export const CustomersDetailsContext = createContext();
export const EditCustomersHistoryContext = createContext();
export const ChangeHOHContext = createContext();
export const HistoryContext = createContext();
export const RequestEditsHistoryContext = createContext();

export const UserProfileContext = createContext();
export const EditHistoryContext = createContext();
export const ReqEditHistoryContext = createContext();
export const ActivityHistoryContext = createContext();

const ManageCustomers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customersData, customerViewDetails, customerViewLoader } = useSelector(
    (state) => state?.manageCustomers
  );
  const { customerKpiDetails, custQuickActions } = customersData || {};
  const { click_to_view } = custQuickActions || {};

  const [open, setOpen] = useState(false);
  const [openReqEdit, setOpenReqEdit] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openImportCustomer, setOpenImportCustomer] = useState(false);
  const [openReqEdits, setOpenReqEdits] = useState(false);
  const [openChangeHOH, setOpenChangeHOH] = useState(false);
  const [selectedOptionForEdit, setSelectedOptionForEdit] = useState(null);
  const [gridApiFlag, setGridApiFlag] = useState(false);
  const [openRequestedEditsHistory, setOpenRequestedEditsHistory] = useState(false);
  const [listingOptions, setListingOptions] = useState(null);
  const [openActivityHistory, setOpenActivityHistory] = useState(false);
  const [openEditsHistory, setOpenEditsHistory] = useState(false);

  const OPTIONS = {
    EDIT: 'Edit',
    VIEW: 'View',
    CREATE: 'Create',
    CREATEHM: 'CreateHM',
    SUBMIT: 'Submit',
    IMPORT_CUSTOMER: 'Import Customer',
    REQ_EDIT: 'ReqEdits',
    CHANGEHOH: 'ChangeHOH',
    EDITS_HISTORY: 'EDITS_HISTORY',
    ACTIVITYSHISTORY: 'ACTIVITYSHISTORY',
    REQUEST_EDITS_HISTORY: 'REQUEST_EDITS_HISTORY',
  };

  const handleCreateCustomer = () => {
    setOpen(true);
    setSelectedOption({ label: OPTIONS.CREATE, value: OPTIONS.CREATE });
  };

  const handleImportCreate = () => {
    setOpenImportCustomer(true);
    setSelectedOption({ label: OPTIONS.IMPORT_CUSTOMER, value: OPTIONS.IMPORT_CUSTOMER });
  };

  const handleCellClick = (params) => {
    const { field, row } = params;
    if (Object.values(click_to_view ?? {})?.includes(field)) {
      setSelectedOption(OPTIONS.EDIT);
      setSelectedRow(row);
      setOpenViewDetails(true);
    }
    if (row.list_options && Object.keys(row.list_options).length > 0) {
      setListingOptions(row.list_options);
    }
  };

  const handleOptionSelect = useCallback((option, row, type) => {
    setSelectedOptionForEdit(type);
    setSelectedOption(option);
    setSelectedRow(row);
    if (option?.label === OPTIONS.EDIT) {
      setOpen(true);
    } else if (option?.label === OPTIONS.VIEW) {
      setOpenViewDetails(true);
    }
    if (option?.label === 'Profile') {
      navigate(`/manage-customers/${option?.value}`, {
        state: { id: row?.profile_id, rowDataUid: row?.uid },
      });
    } else if (option?.label === 'Household') {
      navigate(`/manage-customers/${option?.value}`, {
        state: { id: row?.profile_id, rowDataUid: row?.uid },
      });
    } else if (option?.label === 'Request Edits History') {
      dispatch(getRequestEditsHistory(row?.uid));
      setOpenRequestedEditsHistory(true);
    } else if (option?.label === 'Activity History') {
      dispatch(getActivityHistory(row?.uid));
      setOpenActivityHistory(true);
    } else if (option?.label === 'Edits History') {
      dispatch(getCustomerEditHistory(row?.uid));
      setOpenEditsHistory(true);
    }
  }, []);

  return (
    <DashboardLayoutContainer navigationItems={[]}>
      <CustomersContext.Provider
        value={{
          open,
          setOpen,
          selectedOption,
          selectedRow,
          selectedOptionForEdit,
          setGridApiFlag,
        }}
      >
        <CreateCustomer />
      </CustomersContext.Provider>

      <CustomersContext.Provider
        value={{
          openImportCustomer,
          setOpenImportCustomer,
          open,
          setOpen,
          selectedOption,
          selectedRow,
          selectedOptionForEdit,
          setGridApiFlag,
        }}
      >
        <ImportCustomer />
      </CustomersContext.Provider>

      <ChangeHOHContext.Provider
        value={{
          openChangeHOH,
          setOpenChangeHOH,
          openReqEdits,
          setOpenReqEdits,
          selectedOption,
          selectedRow,
          selectedOptionForEdit,
        }}
      >
        <ChangeHOH />
      </ChangeHOHContext.Provider>

      <CustomersDetailsContext.Provider
        value={{
          openViewDetails,
          setOpenViewDetails,
          customerDetails: customerViewDetails?.data,
          selectedRow,
          setSelectedOption,
          setOpen,
          selectedOption,
          customerViewLoader,
          selectedOptionForEdit,
          openReqEdit,
          setOpenReqEdit,
          setOpenRequestedEditsHistory,
        }}
      >
        <ViewCustomerDetails />
      </CustomersDetailsContext.Provider>

      <RequestEditsHistoryContext.Provider
        value={{
          openRequestedEditsHistory,
          setOpenRequestedEditsHistory,
        }}
      >
        <RequestedEditsHistory />
      </RequestEditsHistoryContext.Provider>

      {/* Request Edits */}
      <UserProfileContext.Provider
        value={{ openReqEdit, setOpenReqEdit, selectedOption, selectedOptionForEdit, setSelectedOption }}
      >
        <RequestEdits />
      </UserProfileContext.Provider>

      <ActivityHistoryContext.Provider
        value={{
          openActivityHistory,
          setOpenActivityHistory,
        }}
      >
        <ActivityHistory />
      </ActivityHistoryContext.Provider>

      <EditHistoryContext.Provider
        value={{ openEditsHistory, setOpenEditsHistory, selectedOption, selectedOptionForEdit }}
      >
        <EditsHistory />
      </EditHistoryContext.Provider>

      <Breadcrumb />
      <div className="ma-title">
        <Typography variant="h5" fontFamily="inter-semibold" marginBottom={{ xs: 2, md: 0 }}>
          Manage Customers
        </Typography>

        <Grid container alignItems={'start'} spacing={2} className="ma-title" size={{ xs: 12, md: 12 }}>
          {customersData?.showCreateButton && (
            <Grid size={{ xs: 'auto' }}>
              <ASButton
                variant="contained"
                startIcon={<CreateIcon sx={{ fill: 'currentColor' }} />}
                onClick={handleCreateCustomer}
                style={{ textTransform: 'capitalize' }}
                tooltip="Create Customer"
              >
                Create
              </ASButton>
            </Grid>
          )}
          {customersData?.showImportButton && (
            <Grid size={{ xs: 'auto' }}>
              <ASButton
                variant="outlined"
                startIcon={<ImportButtonIcon sx={{ fill: 'var(--primary-color) !important' }} />}
                onClick={handleImportCreate}
                style={{
                  textTransform: 'capitalize',
                  color: 'var(--primary-color) !important',
                }}
                tooltip="Import"
              >
                Import
              </ASButton>
            </Grid>
          )}
        </Grid>
      </div>

      <Grid
        container
        className="dashboard-card"
        gap={2}
        sx={{
          minHeight: '101px',
          marginBottom: '26px',
          marginTop: '20px',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          justifyContent: 'stretch',
          '& .MuiGrid-item': {
            display: 'flex',
            height: '100%',
          },
        }}
      >
        {customerKpiDetails?.length > 0 &&
          customerKpiDetails?.map((item, index) => (
            <Grid size={{ sx: 12, md: 2.38 }} key={index} sx={{}}>
              <CustomersKpiCards data={item} index={index} />
            </Grid>
          ))}
      </Grid>

      <Box sx={{ width: '100%' }}>
        <ASDataGridCustomer
          handleOptionSelect={handleOptionSelect}
          handleCellClick={handleCellClick}
          gridApiFlag={gridApiFlag}
          setGridApiFlag={setGridApiFlag}
          listOptions={listingOptions}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};

export default ManageCustomers;
