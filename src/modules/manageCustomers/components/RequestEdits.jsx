import { Box, Button, Divider, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  getRequestEdit,
  getRequestEditsHistory,
  requestEditSubmit,
} from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import Grid from '@mui/material/Grid2';
import IconCustomer from '../../../assets/images/IconCustomer.svg';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Person_filled_ASF from '../../../assets/customSVGIcons/Person_filled_ASF';
import ASTable from '../../../components/mainComponents/ASTable';
import EFormDelete from '../../../assets/customSVGIcons/EFormDelete';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from '../../../context/SnackbarContext';
import { RequestEditsHistoryContext, UserProfileContext } from '../ManageCustomers';
import RequestEditHistoryIcon from '../../../assets/customSVGIcons/customer/RequestEditHistoryIcon';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import SectionHeaders from '../../../components/mainComponents/SectionHeaders';
import RequestEditsKpi from './RequestEditsKpi';
import RequestedEditsHistory from './RequestedEditsHistory';
import { modalActions, viewCustomerDetailsActions } from '../../../utils/constants';

const RequestEdits = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { showSnackbar } = useSnackbar();
  const userProfileDetailsContext = useContext(UserProfileContext);
  const { openReqEdit, setOpenReqEdit, selectedOption, setSelectedOption } = userProfileDetailsContext || {};
  const { requestEditData, requestEditSubmitLoader } = useSelector((state) => state?.manageCustomers);
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [rows, setRows] = useState([]);
  const [openRequestedEditsHistory, setOpenRequestedEditsHistory] = useState(false);
  useEffect(() => {
    if (openReqEdit && selectedOption?.label === 'ReqEdits') {
      dispatch(getRequestEdit(state?.id));
    }
  }, [dispatch, selectedOption?.label, openReqEdit]);

  useEffect(() => {
    return () => {
      setOpenReqEdit && setOpenReqEdit(false);
    };
  }, []);

  const handleSubmit = async () => {
    const formattedData = {
      id: state?.id ?? '',
      ...(Array.isArray(rows)
        ? Object.fromEntries(
            rows
              .filter((item) => item?.field != null && item?.to != null)
              .map((item) => [item.field, item.to])
          )
        : {}),
    };

    const finalAction = requestEditSubmit(formattedData);
    dispatch(finalAction).then((data) => {
      const response = data?.payload;
      if (response?.data?.status === 'error') {
        if (response?.data?.message) {
          showSnackbar({
            message: response?.data?.message,
            severity: 'error',
          });
        }
      } else {
        setOpenReqEdit(false);
        showSnackbar({
          message: response?.data?.message + 'Done',
          severity: response?.data?.status === 'error' ? 'error' : 'success',
        });
      }
    });
  };

  const handleDeleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      field: 'Select',
      from: '',
      to: '',
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleDrawerNavigations = (option) => {
    if (option === 'REQUEST_EDITS_HISTORY') {
      dispatch(getRequestEditsHistory(state?.rowDataUid));
      setSelectedOption({ label: 'REQUEST_EDITS_HISTORY' });
      setOpenRequestedEditsHistory(true);
    }
  };

  const columns = [
    {
      field: 'field',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            FIELD
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

      valueOptions: [
        'Select',
        ...(Array.isArray(requestEditData?.typeOptions) ? requestEditData.typeOptions : []),
      ],
      renderCell: (params) => {
        const selectedLabel =
          requestEditData?.typeOptions?.find((opt) => opt.value === params.value)?.label || 'Select';
        return (
          <Box
            style={{ height: '100%' }}
            className="items-center"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {selectedLabel}
            </span>
            <ExpandMoreRoundedIcon sx={{ color: 'var(--text-secondary-color)' }} />
          </Box>
        );
      },
    },
    {
      field: 'from',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            FROM
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
      type: 'text',
      renderCell: (params) => (
        <span style={{ color: params.value ? 'inherit' : '#aaa' }}>{params.value || '-'}</span>
      ),
    },
    {
      field: 'to',
      headerName: (
        <Box display="flex" alignItems="flex-start">
          <Box component="span" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
            TO
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
      type: 'text',
      renderCell: (params) => (
        <span style={{ color: params.value ? 'inherit' : '#aaa' }}>{params.value || 'Enter value...'}</span>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 10,
      minWidth: 50,
      maxWidth: 50,
      renderCell: (params) => {
        return (
          <Box style={{ height: '100%' }} className="items-center" justifyContent="flex-end">
            <Tooltip title="Delete row">
              <EFormDelete className="pointer" onClick={() => handleDeleteRow(params.id)} />
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <RequestEditsHistoryContext.Provider
        value={{
          openRequestedEditsHistory,
          setOpenRequestedEditsHistory,
        }}
      >
        <RequestedEditsHistory />
      </RequestEditsHistoryContext.Provider>
      <ASDrawer
        open={openReqEdit} //openReqEdit
        setOpen={setOpenReqEdit}
        action={selectedOption?.label}
        headerName={'Request Edits'}
        showFooter={true}
        mainLoader={requestEditSubmitLoader}
        onSubmit={handleSubmit}
        headerImage={IconCustomer}
        width="820px"
        rightIcons={
          <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
            {!isMobile && (
              <Tooltip title="View requested edits history">
                <IconButton
                  aria-haspopup="true"
                  onClick={() => handleDrawerNavigations('REQUEST_EDITS_HISTORY')}
                >
                  <RequestEditHistoryIcon className="hover-icon pointer" color="currentColor" />
                </IconButton>
              </Tooltip>
            )}
            {/* <DropdownMenu options={modalActions || []} onOptionSelect={() => {}} selectedOption={null} /> */}
            <div className="view_modal_dropdown_icon">
              <DropdownMenu
                options={isMobile ? viewCustomerDetailsActions : modalActions || []}
                // onOptionSelect={(option) => handleOptionSelect(option)}
                selectedOption={selectedOption}
                // callBack={callBack}
              />
            </div>
          </div>
        }
      >
        <Grid
          container
          flexDirection={'column'}
          alignItems={'flex-start'}
          sx={{
            width: '100%',
            gap: '20px',
          }}
        >
          <Grid
            container
            className="ua-dashboard-card"
            gap={2}
            size={{ xs: 12 }}
            sx={{
              marginTop: { xs: 4, md: 2 },
              marginBottom: '0px',
              overflowX: 'auto',
              display: 'flex',
              flexWrap: { xs: 'nowrap', md: 'nowrap' },
              padding: { xs: '0 0 16px 0', md: 0 },
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#BCE6F1', borderRadius: '4px' },
            }}
          >
            {requestEditData?.kpiDetails &&
              Object.values(requestEditData?.kpiDetails).map((val, index) => (
                <Grid size={{ xs: 12 }} key={index} sx={{ minWidth: 'auto' }}>
                  <RequestEditsKpi data={val} timeZone={currentEnv} />
                </Grid>
              ))}
          </Grid>

          <Grid size={{ xs: 12, md: 12 }} className="tableShadow" spacing={2}>
            <SectionHeaders title="Account Information" />

            <Box display="flex" flexDirection="column" sx={{ mt: '20px' }}>
              <ASTable
                columns={columns}
                rows={rows}
                onRowsChange={setRows}
                requestEditData={requestEditData?.from}
              />
              <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="text" color="primary" onClick={handleAddRow} sx={{ fontSize: '0.813rem' }}>
                  Add Row
                </Button>
              </Box>
              <Divider style={{ width: '100%', marginBottom: '30px', marginTop: '30px' }} />
            </Box>
          </Grid>
        </Grid>
      </ASDrawer>
    </>
  );
};

export default RequestEdits;
