import { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
// import Grid from '@mui/material/Grid2';
import DashboardLayoutContainer from '../../components/dashboardLayout/DashboardLayoutContainer';
import ASDataGrid from '../../components/mainComponents/ASDataGrid';
import ASButton from '../../components/mainComponents/ASButton';
import DropdownMenu from '../../components/mainComponents/DropdownMenu';
import { orgActions } from '../../utils/constants';
import OrgKpiCards from './components/OrgKpiCards';
import '../../styles/manageOrg.styles.css';
import CreateOrganization from './components/CreateOrganization';
import { fetchOrganizationDetails } from '../../redux/slice/manageOrganization/ManageOrganizationSlice';
import ViewOrganizationDetails from './components/ViewOrganizationDetails';
import EditOrganizationHistory from './components/EditOrganizationHistory';
import { useRowClassName } from '../../components/mainComponents/UseRowClassName';
import OrgCreateIcon from '../../assets/customSVGIcons/OrgCreateIcon';
import Breadcrumb from '../../components/mainComponents/Breadcrumb';

export const OrganizationContext = createContext();
export const OrganizationDetailsContext = createContext();
export const EditOrganizationHistoryContext = createContext();

const ManageOrganizations = () => {
  const dispatch = useDispatch();
  const { organizationListingDetails, organizationViewDetails, organizationViewLoader } = useSelector(
    (state) => state?.manageOrganizations
  );
  const { organizationHeadersList, organizationListing, organizationKpiDetails, orgQuickActions } =
    organizationListingDetails || {};
  const { sort_key, avatar_key, click_to_view } = orgQuickActions || {};
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openOrganizationHistory, setOpenOrganizationHistory] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const sortModel = [{ field: sort_key, sort: 'asc' }];

  const OPTIONS = { EDIT: 'Edit', VIEW: 'View', CREATE: 'Create', EDITS_HISTORY: 'Edits History' };
  const getRowClassName = useRowClassName(isHovered, selectedRow?.id);

  useEffect(() => {
    dispatch(fetchOrganizationDetails());
  }, []);

  const handleCreateAccount = () => {
    setOpen(true);
    setSelectedOption({ label: OPTIONS.CREATE, value: OPTIONS.CREATE });
  };

  const handleCellClick = (params) => {
    const { field, row } = params;
    if (Object.values(click_to_view ?? {})?.includes(field)) {
      setSelectedOption(OPTIONS.EDIT);
      setSelectedRow(row);
      setOpenViewDetails(true);
    }
  };

  const handleOptionSelect = useCallback(
    (option, row) => {
      setSelectedOption(option);
      setSelectedRow(row);

      if (option.label === OPTIONS.EDIT) {
        setOpen(true);
      } else if (option.label === OPTIONS.VIEW) {
        setOpenViewDetails(true);
      } else if (option.label === OPTIONS.EDITS_HISTORY) {
        setOpenOrganizationHistory(true);
      }
    },
    [OPTIONS.EDIT, OPTIONS.EDITS_HISTORY, OPTIONS.VIEW]
  );

  const renderCellActions = useCallback(
    (params) => {
      const handleSelect = (option) => {
        handleOptionSelect(option, params?.row);
      };

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
          <DropdownMenu
            options={orgActions?.filter((item) => item.label !== 'Report an Issue') || []}
            onOptionSelect={(option) => handleSelect(option)}
            selectedOption={null}
            setIsHovered={setIsHovered}
          />
        </Box>
      );
    },
    [handleOptionSelect]
  );

  const sortedHeadersList = [...(organizationHeadersList || [])]?.sort((a, b) =>
    a.field === avatar_key ? -1 : b.field === avatar_key ? 1 : 0
  );

  const columns = sortedHeadersList?.map((column) => ({
    ...column,
    width: column?.field === 'actions' ? 50 : 150,
    minWidth: column?.field === 'actions' ? 50 : 150,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => {
      const showChip = ['Active', 'Not Active'].includes(params?.value);

      return (
        <>
          {column?.field === 'actions' ? (
            renderCellActions(params)
          ) : (
            <Box
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: Object.values(click_to_view ?? {})?.includes(column?.field)
                  ? 'pointer'
                  : 'not-allowed',
              }}
            >
              {showChip ? (
                <Chip
                  variant="filled"
                  color={params?.value === 'Active' ? 'success' : 'error'}
                  label={params?.value}
                  sx={{ fontFamily: 'inter-regular', padding: '3px 4px' }}
                  size="small"
                />
              ) : (
                <Tooltip title={['id', 'title']?.includes(column?.field) ? params?.value : null}>
                  {params?.value || '-'}
                </Tooltip>
              )}
            </Box>
          )}
        </>
      );
    },
  }));

  useEffect(() => {
    if (organizationHeadersList) {
      const columnVisibilityModel = organizationHeadersList.reduce((model, column) => {
        model[column.field] = column.default;
        setForceRender((prev) => prev + 1); //Force re-render
        return model;
      }, {});

      setColumnVisibilityModel(columnVisibilityModel);
    }
  }, [organizationHeadersList]);

  useEffect(() => {
    if (organizationListing) {
      setListingData(organizationListing);
    }
  }, [organizationListing]);

  return (
    <DashboardLayoutContainer navigationItems={[]}>
      <OrganizationContext.Provider
        value={{
          open,
          setOpen,
          selectedOption,
          selectedRow,
          setOpenOrganizationHistory,
          setSelectedOption,
          openOrganizationHistory,
        }}
      >
        <CreateOrganization />
      </OrganizationContext.Provider>

      <OrganizationDetailsContext.Provider
        value={{
          openViewDetails,
          setOpenViewDetails,
          organizationDetails: organizationViewDetails?.data,
          selectedRow,
          setSelectedOption,
          selectedOption,
          setOpen,
          organizationViewLoader,
          setOpenOrganizationHistory,
        }}
      >
        <ViewOrganizationDetails />
      </OrganizationDetailsContext.Provider>

      <EditOrganizationHistoryContext.Provider
        value={{ openOrganizationHistory, setOpenOrganizationHistory, selectedRow, setSelectedOption }}
      >
        <EditOrganizationHistory />
      </EditOrganizationHistoryContext.Provider>

      <Breadcrumb />
      <div className="ma-title">
        <Typography variant="h5" fontFamily="inter-semibold" marginBottom={{ xs: 2, md: 0 }}>
          Manage Organizations
        </Typography>
        <ASButton
          variant="contained"
          startIcon={<OrgCreateIcon />}
          onClick={handleCreateAccount}
          style={{ textTransform: 'capitalize', fontFamily: 'inter-medium' }}
          tooltip='Create an organization'
        >
          Create
        </ASButton>
      </div>

      <Grid
        container
        className="mo-dashboard-card"
        gap={2}
        sx={{
          minHeight: '123px',
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
        {organizationKpiDetails?.map((item, index) => (
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }} key={index} sx={{ minWidth: 'auto' }}>
            <OrgKpiCards data={item} index={index} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: '100%' }}>
        <ASDataGrid
          key={forceRender} //key to force re-render
          columns={columns || []}
          rows={listingData}
          pageSize={10}
          cNameToAddAvatar={avatar_key}
          exportFileName="organizations"
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
          defaultSortModel={sortModel}
          handleCellClick={handleCellClick}
          isFlex={true}
          getRowClassName={getRowClassName}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};

export default ManageOrganizations;
