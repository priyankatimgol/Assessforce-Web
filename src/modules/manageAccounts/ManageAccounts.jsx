import { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DashboardLayoutContainer from '../../components/dashboardLayout/DashboardLayoutContainer';
import ASDataGrid from '../../components/mainComponents/ASDataGrid';
import ASButton from '../../components/mainComponents/ASButton';
import DropdownMenu from '../../components/mainComponents/DropdownMenu';
import AccountKpiCards from './components/AccountKpiCards';
import AddEditAccount from './components/AddEditAccount';
import ViewAccountDetails from './components/ViewAccountDetails';
import {
  editAccountDetails,
  fetchAccountDetails,
  fetchFormFields,
} from '../../redux/slice/manageAccounts/ManageAccountsSlice';
import '../../styles/manageAccounts.styles.css';
import { gridActions } from '../../utils/constants';
import createAccountGroupIcon from '../../assets/images/createAccountIcon.svg';
import Breadcrumb from '../../components/mainComponents/Breadcrumb';
import { useRowClassName } from '../../components/mainComponents/UseRowClassName';
import CreateAccountIcon from '../../assets/customSVGIcons/CreateAccountIcon';

export const AccountContext = createContext();
export const AccountDetailsContext = createContext();

const ManageAccounts = () => {
  const dispatch = useDispatch();
  const { accountListingDetails, accountListingLoader, formFields } = useSelector(
    (state) => state?.manageAccounts
  );

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    title: false,
    field_parent_name: true,
    account_manager: true,
    status: true,
    field_node_name: true,
    field_user_cap: true,
    default_user_cap: true,
    id: false,
  });
  const defaultSortModel = [
    {
      field: 'field_node_name',
      sort: 'asc',
    },
  ];
  const { kpi, account_manager_label, accounts } = accountListingDetails || {};
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const OPTIONS = {
    EDIT: 'Edit',
    VIEW: 'View',
    CREATE: 'Create',
  };

  useEffect(() => {
    dispatch(fetchFormFields());
  }, [dispatch]);

  const handleOptionSelect = useCallback(
    (option, row) => {
      setSelectedOption(option);
      setSelectedRow(row);

      // if (!formFields) {
      //   dispatch(fetchFormFields());
      // }

      if (option?.label === OPTIONS?.EDIT) {
        setOpen(true);
        dispatch(fetchFormFields());
        dispatch(editAccountDetails(row?.id));
      } else if (option.label === OPTIONS.VIEW) {
        setOpenViewDetails(true);
      }
    },
    [dispatch]
  );

  const handleCreateAccount = () => {
    setOpen(true);
    dispatch(fetchFormFields());
    setSelectedOption({ label: OPTIONS.CREATE, value: OPTIONS.CREATE });
  };

  useEffect(() => {
    dispatch(fetchAccountDetails());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      setSelectedOption(null);
    };
  }, []);

  const handleCellClick = (params) => {
    setSelectedRowId(params?.row?.id);
    const { field, row } = params;
    if (field === 'title' || field === 'field_node_name' || field === 'id') {
      setSelectedOption(OPTIONS.EDIT);
      setSelectedRow(row);
      setOpenViewDetails(true);
    }
  };

  const renderCellActions = useCallback(
    (params) => {
      const handleSelect = (option) => {
        handleOptionSelect(option, params?.row);
      };

      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'auto',
          }}
        >
          <DropdownMenu
            options={gridActions || []}
            //onOptionSelect={(option) => handleOptionSelect(option, params?.row)}
            onOptionSelect={(option) => {
              handleSelect(option);
            }}
            //selectedOption={selectedOption}
            isMenuDisabled={params?.row?.is_edit === 'false' && ['edit']}
            setIsHovered={setIsHovered}
          />
        </Box>
      );
    },
    [handleOptionSelect]
  ); // Add dependencies only if necessary

  const shouldHideColumn = formFields?.showUserCap === 2 || formFields?.showUserCap === undefined;
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => (
        <Box
          sx={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Tooltip title={params.value}>{params.value || '-'}</Tooltip>
        </Box>
      ),
      type: 'number',
      headerAlign: 'left',
    },
    {
      field: 'title',
      headerName: 'Name',
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => (
        <Box
          sx={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Tooltip title={params.value}>{params.value || '-'}</Tooltip>
        </Box>
      ),
    },
    {
      field: 'field_node_name',
      headerName: 'Display Name',
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => <Box>{params.value || '-'}</Box>,
    },
    {
      field: 'field_parent_name',
      headerName: 'Parent',
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => (
        <Box
          sx={{
            cursor: 'not-allowed',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {params.value || '-'}
        </Box>
      ),
    },
    {
      field: 'account_manager',
      headerName: account_manager_label,
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    shouldHideColumn
      ? {
          field: 'field_user_cap',
          headerName: 'User Cap Override',
          width: 150,
          minWidth: 150,
          align: 'left',
          headerAlign: 'left',
          type: 'number',
          hideable: shouldHideColumn,
          renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
        }
      : null,
    shouldHideColumn
      ? {
          field: 'default_user_cap',
          headerName: 'Default User Cap',
          width: 150,
          minWidth: 150,
          align: 'left',
          type: 'number',
          headerAlign: 'left',
          renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
        }
      : null,
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => {
        const isActive = params?.row?.status?.toLowerCase() === 'active';

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
            }}
          >
            <Chip
              variant="filled"
              color={isActive ? 'success' : 'error'}
              label={params?.row?.status}
              size="small"
              sx={{ padding: '3px 4px' }}
            />
          </Box>
        );
      },
    },

    {
      field: 'actions',
      headerName: '',
      align: 'center',
      width: 50,
      minWidth: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: renderCellActions,
    },
  ]?.filter(Boolean);

  const getRowClassName = useRowClassName(isHovered, selectedRowId);

  return (
    <DashboardLayoutContainer navigationItems={[]}>
      <AccountContext.Provider value={{ open, setOpen, selectedOption, selectedRow }}>
        <AddEditAccount />
      </AccountContext.Provider>

      <AccountDetailsContext.Provider
        value={{
          openViewDetails,
          setOpenViewDetails,
          selectedRow,
          openAddEditmModal: open,
          setOpenAddEditModal: setOpen,
          setSelectedOption,
        }}
      >
        <ViewAccountDetails />
      </AccountDetailsContext.Provider>

      <Breadcrumb />

      <div className="ma-title">
        <Typography
          variant="h1"
          fontSize="1.5rem"
          fontFamily="inter-semibold"
          marginBottom={{ xs: 1, md: 0 }}
          lineHeight={'150%'}
        >
          Manage Accounts
        </Typography>
        <ASButton
          variant="contained"
          startIcon={<CreateAccountIcon />}
          onClick={handleCreateAccount}
          style={{ textTransform: 'capitalize', fontFamily: 'inter-medium' }}
          tooltip='Create an account'
        >
          Create
        </ASButton>
      </div>

      <Grid
        container
        className="ua-dashboard-card"
        spacing={2}
        sx={{
          minHeight: '52px',
          //marginTop: { xs: 0.5, md: 1, lg: 2 },
          marginBottom: '26px',
          marginTop: '20px',
          overflowX: 'auto',
          //display: 'flex',
          flexWrap: 'nowrap',
          //padding: { xs: '0 0 16px 0', md: '0 0 16px 0', lg: 0 },
        }}
      >
        {kpi?.map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ minWidth: '18.125rem' }}>
            <AccountKpiCards count={item?.count} label={item?.title} index={index} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: '100%' }}>
        <ASDataGrid
          columns={columns}
          rows={accounts || []}
          pageSize={10}
          cNameToAddAvatar="field_node_name"
          exportFileName="accounts"
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
          defaultSortModel={defaultSortModel}
          handleCellClick={handleCellClick}
          loader={accountListingLoader}
          getRowClassName={getRowClassName}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};

export default ManageAccounts;
