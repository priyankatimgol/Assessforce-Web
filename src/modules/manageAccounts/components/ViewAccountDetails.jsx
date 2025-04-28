import { useContext, useEffect, useState } from 'react';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { AccountDetailsContext } from '../ManageAccounts';
import { Box, Chip, Divider, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAccountDetailsData,
  editAccountDetails,
  fetchFormFields,
  viewAccountDetails,
} from '../../../redux/slice/manageAccounts/ManageAccountsSlice';
import ASTable from '../../../components/mainComponents/ASTable';
import caTree from '../../../assets/images/caTree.svg';
import { modalActions, ViewAccountActions } from '../../../utils/constants';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import dayjs from 'dayjs';

const ViewAccountDetails = () => {
  const dispatch = useDispatch();
  const viewAccountDetailsContext = useContext(AccountDetailsContext);
  const {
    openViewDetails,
    setOpenViewDetails,
    selectedRow,
    openAddEditModal,
    setOpenAddEditModal,
    setSelectedOption,
  } = viewAccountDetailsContext || {};
  const { accountDetailsData, accountDetailsLoader, formFields } =
    useSelector((state) => state?.manageAccounts) || {};
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const isMobile = useMediaQuery('(max-width:768px)');

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (selectedRow && selectedRow?.id !== undefined) {
      dispatch(viewAccountDetails(selectedRow?.id));
    }
  }, [dispatch, selectedRow]);

  const {
    data: {
      entity_permissions,
      field_date_node,
      field_node_name,
      title,
      status,
      field_user_cap,
      field_parent_name,
      field_deactivated_date_node,
      default_field_user_cap,
    } = {},
  } = accountDetailsData || {};

  const columns = [
    {
      field: 'type',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            TYPE
          </Box>
          <Box
            component="span"
            sx={{
              marginLeft: '2px',
              alignSelf: 'flex-start',
              borderRight: 'none',
              fontFamily: 'inter-regular',
            }}
          >
            *
          </Box>
        </Box>
      ),
      width: 150,
      align: 'left',
      editable: true,
      type: 'singleSelect',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            EFORM
          </Box>
          <Box
            component="span"
            sx={{
              marginLeft: '2px',
              alignSelf: 'flex-start',
              borderRight: 'none',
              fontFamily: 'inter-regular',
            }}
          >
            *
          </Box>
        </Box>
      ),
      width: 150,
      align: 'left',
      editable: true,
      type: 'singleSelect',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: 'access',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            ACCESS
          </Box>
          <Box
            component="span"
            sx={{
              marginLeft: '2px',
              alignSelf: 'flex-start',
              borderRight: 'none',
              fontFamily: 'inter-regular',
            }}
          >
            *
          </Box>
        </Box>
      ),
      width: 150,
      align: 'left',
      editable: true,
      type: 'singleSelect',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    if (entity_permissions) {
      const transformedData = entity_permissions?.map((item, index) => ({
        ...item,
        id: index,
      }));

      setRows(transformedData);
    }
  }, [accountDetailsData, entity_permissions]);

  const handleEditAccount = () => {
    if (selectedRow) {
      setSelectedOption({ label: 'Edit' });
      // setOpenViewDetails(false);
      setOpenAddEditModal(true);
      dispatch(fetchFormFields());
      dispatch(editAccountDetails(selectedRow?.id));
    }
  };

  useEffect(() => {
    return () => {
      setOpenAddEditModal(false);
      dispatch(clearAccountDetailsData());
    };
  }, [openAddEditModal, setOpenAddEditModal, dispatch]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option?.label === 'Edit') {
      handleEditAccount();
    }
  };

  return (
    <>
      <ASDrawer
        {...{
          open: openViewDetails,
          setOpen: setOpenViewDetails,
          action: 'Create',
          headerName: 'Account',
          showFooter: false,
          headerImage: caTree,
          leftIcons: status && (
            <div className="responsive-chip">
              <Chip
                variant="filled"
                color={status === 'Active' ? 'success' : 'error'}
                label={status}
                size="small"
                sx={{ padding: '3px 4px' }}
              />
            </div>
          ),
          rightIcons: (
            <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
              {!isMobile && selectedRow?.is_edit === 'true' && (
                <Tooltip title="Edit account">
                  <IconButton aria-haspopup="true" onClick={handleEditAccount}>
                    <EditRoundedIcon className="hover-icon pointer" />
                  </IconButton>
                </Tooltip>
              )}
              <DropdownMenu
                options={
                  isMobile && selectedRow?.is_edit === 'true' ? ViewAccountActions : modalActions || []
                }
                onOptionSelect={(option) => handleOptionSelect(option)}
                selectedOption={null}
              />
            </div>
          ),
        }}
        mainLoader={accountDetailsLoader}
      >
        <Grid size={{ xs: 12 }} container spacing={2} marginTop={1}>
          <Grid size={{ xs: 12 }}>
            <SectionHeaders title="Account Information" />
            <Grid container>
              <Grid size={{ xs: 12 }} sx={[{ marginTop: '16px' }]}></Grid>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography className="aaa">Name</Typography>
              </Grid>
              <Grid size={{ xs:8, md:9}}>
                <Typography className="bbb">{title || '-'}</Typography>
              </Grid>
              {/* <Grid size={{ xs:12}} className="empty_div"></Grid> */}
              <Grid size={{ xs: 12 }} sx={[{ marginTop: '16px' }]}></Grid>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography className="aaa">Display Name</Typography>
              </Grid>
              <Grid size={{ xs:8, md:9}}>
                <Typography className="bbb">{field_node_name || '-'}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }} sx={[{ marginTop: '16px' }]}></Grid>
              {/* <Grid size={{ xs:12}} className="empty_div"></Grid> */}
              <Grid size={{ xs:4, md:3}}>
                <Typography className="aaa">Parent</Typography>
              </Grid>
              <Grid size={{ xs:8, md:9}}>
                <Typography className="bbb">{field_parent_name || '-'}</Typography>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                sx={[{ marginTop: formFields?.showUserCap === 2 ? '16px' : '0px' }]}
              ></Grid>
              {formFields?.showUserCap === 2 && (
                <>
                  <Grid size={{ xs:4, md:3}}>
                    <Typography className="aaa">Default User Cap</Typography>
                  </Grid>
                  <Grid size={{ xs:8, md:9}}>
                    <Typography className="bbb">{default_field_user_cap || '-'}</Typography>
                  </Grid>
                </>
              )}
              <Grid
                size={{ xs: 12 }}
                sx={[
                  {
                    marginTop: formFields?.showUserCap === 2 ? '16px' : '0px',
                  },
                ]}
              ></Grid>
              {formFields?.showUserCap === 2 && (
                <>
                  <Grid size={{ xs:4, md:3}}>
                    <Typography className="aaa">User Cap Override</Typography>
                  </Grid>
                  <Grid size={{ xs:8, md:9}}>
                    <Typography className="bbb">{field_user_cap || '-'}</Typography>
                  </Grid>
                  {/* <Grid size={{ xs:12}} className="empty_div"></Grid> */}
                </>
              )}
            </Grid>
          </Grid>
          {/* <Grid
            size={{ xs: 12 }}
            sx={[
              {
                marginBottom: formFields?.showUserCap === 2 ? '16px' : '10px',
              },
            ]}
          > */}
          <Grid item size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
            <Divider />
          </Grid>
          {/* </Grid> */}
        </Grid>

        <Grid container size={{ xs: 12 }} spacing={2}>
          <Grid size={{ xs: 12 }}>
            <SectionHeaders title="Status" />

            <Grid container marginTop={2}>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography className="aaa">
                  {status === 'Active' ? 'Activated On' : 'Deactivated On'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 8, md: 9 }}>
                <Typography className="bbb">
                  {status === 'Active'
                    ? field_date_node
                      ? dayjs(field_date_node)?.tz(currentEnv?.time_zone)?.format(currentEnv?.date_format)
                      : '-'
                    : field_deactivated_date_node
                      ? dayjs(field_deactivated_date_node)
                          ?.tz(currentEnv?.time_zone)
                          ?.format(currentEnv?.date_format) || '-'
                      : '-'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12 }}
            // sx={[
            //   {
            //     marginTop: '16px',
            //   },
            // ]}
          >
            <Grid item size={{ xs: 12 }} style={{ marginBottom: '1.25rem', marginTop: '1.25rem' }}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} size={{ xs: 12 }}>
          <Grid size={{ xs: 12 }}>
            <SectionHeaders title="Access To eForms" />
            <Grid size={{ xs: 12, md: 12 }} marginTop={3} className="tableShadow">
              <ASTable
                columns={columns}
                rows={rows}
                onRowsChange={setRows}
                rowReordering={false}
                editable={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </ASDrawer>
    </>
  );
};

export default ViewAccountDetails;
