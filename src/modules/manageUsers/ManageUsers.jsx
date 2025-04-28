//react
import React, { createContext, useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Box from '@mui/material/Box';

//component
import DashboardLayoutContainer from '../../components/dashboardLayout/DashboardLayoutContainer';
import ASButton from '../../components/mainComponents/ASButton';
import KpiCard from './components/KpiCard';
import AddUserModal from './components/AddUserModal';
import ViewUserDataModal from './components/ViewUserDataModal';

import {
  editUserViewDetails,
  fetchUserDetails,
  fetchUsersGridData,
  getUserFormFields,
} from '../../redux/slice/manageUsers/ManageUsersSlice';

//ui
import ASDataGrid from '../../components/mainComponents/ASDataGrid';
import DropdownMenu from '../../components/mainComponents/DropdownMenu';
import { gridActions } from '../../utils/constants';
import '../../styles/manageUsers.styles.css';
import { useSnackbar } from '../../context/SnackbarContext';
import getRoleColor from '../../utils/getRolesColor';
import Breadcrumb from '../../components/mainComponents/Breadcrumb';
import { useRowClassName } from '../../components/mainComponents/UseRowClassName';

export const ManageUsersContext = createContext();
export const UsersDetailsContext = createContext();

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const manageUserData = useSelector((state) => state?.manageUsers?.userGridData);
  const manageUsersCards = manageUserData?.data?.kpi;
  const userGridData = manageUserData?.data?.users;

  const formFieldsData = useSelector((state) => state?.manageUsers?.userFormFields);
  const userInfo = useSelector((state) => state?.manageUsers?.muUsersDetails?.data);
  const { viewUserDetailsLoader, userGridLoader } = useSelector((state) => state?.manageUsers);

  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState('');
  const [isEdit, setIsEdit] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    fullName: true,
    role: true,
    assigned_to: true,
    site: true,
    field_office_no: true,
    status: true,
    field_mobile_no_: true,
    id: false,
    email: false,
    field_first_name: false,
    field_last_name: false,
    account: false,
    field_address_line_1: false,
    field_address_line_2: false,
    field_address_state: false,
    field_address_county: false,
    field_address_zip_code: false,
  });
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const defaultSortModel = [
    {
      field: 'fullName',
      sort: 'asc',
    },
  ];

  useEffect(() => {
    userInfo && setUserDetail(userInfo);
    const transformedData = userGridData && Object.values(userGridData).map((item) => item);
    setUsersList(transformedData);
  }, [userGridData, userInfo]);

  useEffect(() => {
    dispatch(getUserFormFields());
    dispatch(fetchUsersGridData());
  }, [dispatch]);

  const handleOptionSelect = useCallback((option, row) => {
    setIsEdit(row?.edit);
    setSelectedOption(option);
    setUserId(row?.id);
    if (option?.label === 'Edit') {
      if (row?.edit) {
        setOpenAddUserModal(true);
        dispatch(editUserViewDetails(row?.id));
      }
    } else if (option?.label === 'View') {
      setOpenViewModal(true);
      dispatch(fetchUserDetails(row?.id));
    }
  }, [dispatch]);

  const renderCellActions = useCallback((params) => {
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
          isMenuDisabled={!params?.row?.edit && ['edit']}
          setIsHovered={setIsHovered}
        />
      </Box>
    );
  }, [handleOptionSelect]); // Add dependencies only if necessary

  const columns = useMemo(() => {

    return [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 150,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
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
      field: 'fullName',
      headerName: 'Name',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box>{params.value || '-'}</Box>,
    },
    {
      field: 'field_first_name',
      headerName: 'First Name',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_last_name',
      headerName: 'Last Name',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      minWidth: 150,
      renderCell: (params) => {
        const role_key = params?.row?.role_key;
        const role_name = params?.row?.role;
        const color = getRoleColor(role_key);

        return (
          <Box
          className="cursor-not-allowed"
          >
            <Chip
              variant="outlined"
              color={color}
              label={role_name}
              size="small"
              sx={{
                color: color,
                borderColor: color,
                padding: '3px 4px',
              }}
            />
          </Box>
        );
      },
    },
    {
      field: 'assigned_to',
      headerName: 'Assigned To',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'site',
      headerName: 'Site',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_mobile_no_',
      headerName: 'Mobile',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_office_no',
      headerName: 'Office',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'account',
      headerName: 'Account',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_address_line_1',
      headerName: 'Site Address - Street 1',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_address_line_2',
      headerName: 'Site Address - Street 2',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_address_county',
      headerName: 'Site Address - City',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_address_state',
      headerName: 'Site Address - State',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },
    {
      field: 'field_address_zip_code',
      headerName: 'Site Address - ZIP',
      width: 150,
      minWidth: 150,
      renderCell: (params) => <Box className="cursor-not-allowed">{params.value || '-'}</Box>,
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      minWidth: 150,
      renderCell: (params) => {
        const status = params?.row?.status;
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
            <Chip
              variant="filled"
              color={status === 'Active' ? 'success' : 'error'}
              label={status}
              size="small"
              sx={{
                cursor: 'not-allowed',
                fontFamily: 'inter-regular',
                padding: '3px 4px',
              }}
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
    }
  ];
  }, [renderCellActions]);

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setUserDetail({});
    setUserId('');
    setSelectedOption(null);
  };

  const handleCloseAddModal = () => {
    setOpenAddUserModal(false);
    setSelectedOption(null);
    if (!openViewModal) {
      setUserId('');
    }
  };

  const handleToggleEdit = (id) => {
    setUserId(id);
    setOpenAddUserModal(true);
    dispatch(editUserViewDetails(id));
  };

  const handleCellClick = useCallback((params) => {
    setSelectedRowId(params?.row?.index);
    if (params?.field === 'fullName' || params?.field === 'id') {
      setIsEdit(params?.row?.edit);
      setUserId(params?.row?.id);
      setOpenViewModal(true);
      dispatch(fetchUserDetails(params?.row?.id));
    }
  }, [dispatch]);

  const handleCreate = () => {
    if (manageUserData?.data?.active_user_cap_alert !== '') {
      showSnackbar({
        message: manageUserData?.data?.active_user_cap_alert,
        severity: 'error',
      });
    } else {
      setOpenAddUserModal(true);
      setUserDetail({});
      setUserId('');
      dispatch(getUserFormFields());
    }
  };

  //const memoizedColumns = useMemo(() => columns, [columns]);
  //const rows = useMemo(() => usersList || [], [usersList]);
  const getRowClassName = useRowClassName(isHovered, selectedRowId);
  return (
    <DashboardLayoutContainer navigationItems={[]}>
      <ManageUsersContext.Provider
        value={{
          openAddUserModal,
          handleCloseAddModal,
          userId,
          formFieldsData,
        }}
      >
        <AddUserModal />
      </ManageUsersContext.Provider>
      <UsersDetailsContext.Provider
        value={{
          openViewModal,
          handleCloseViewModal,
          userDetail,
          userId,
          handleToggleEdit,
          loader: viewUserDetailsLoader,
          isEdit: isEdit,
        }}
      >
        <ViewUserDataModal />
      </UsersDetailsContext.Provider>

      <Breadcrumb />
      <div className="kpi-dashboard">
        <Typography
          variant="h1"
          fontSize="1.5rem"
          fontFamily="inter-semibold"
          marginBottom={{ xs: 1, md: 0 }}
          lineHeight={'150%'}
        >
          Manage Users
        </Typography>
        {manageUserData?.data?.active_create_btn && (
          <ASButton
            variant="contained"
            startIcon={<PersonAddAltOutlinedIcon />}
            onClick={handleCreate}
            style={{ textTransform: 'capitalize', fontFamily: 'inter-medium' }}
            tooltip="Create a user"
          >
            Create
          </ASButton>
        )}
      </div>

      <Grid
        container
        className="dashboard-card"
        spacing={2}
        sx={{
          minHeight: '101px',
          overflowX: 'auto',
          marginBottom: '26px',
          marginTop: '20px',
          //paddingBottom: '20px',
          flexWrap: 'nowrap', // This keeps them on one line
          '& .MuiGrid-item': {
            display: 'flex',
            height: '100%',
          },
        }}
      >
        {manageUsersCards?.length > 0 &&
          manageUsersCards?.map((item, idx) => (
            <Grid
              size={{ xs: 2 }}
              key={idx}
              sx={{
                minWidth: { xs: '9.5rem', lg: '8.175rem' },
                flexDirection: 'column',
              }}
            >
              <KpiCard
                count={item?.count}
                label={item?.title?.role_label || item?.title}
                icon={item?.icon}
                index={idx}
              />
            </Grid>
          ))}
      </Grid>

      {/* <Box sx={{ height: 400, width: '100%' }}> */}
      <Box sx={{ width: '100%' }}>
        <ASDataGrid
          rows={usersList || []}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.index}
          cNameToAddAvatar="fullName"
          exportFileName="users"
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
          defaultSortModel={defaultSortModel}
          handleCellClick={handleCellClick}
          filterOptionsForRoles={[...new Set(usersList?.map((item) => item.role))].map((role) => ({
            label: role,
            value: role,
          }))}
          loader={userGridLoader}
          getRowClassName={getRowClassName}
        />
      </Box>
    </DashboardLayoutContainer>
  );
};

export default ManageUsers;
