import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { getCustomerEditHistory } from '../../../redux/slice/manageCustomers/ManageCustomersSlice';
import ASDataGrid from '../../../components/mainComponents/ASDataGrid';
import { useLocation } from 'react-router-dom';
import OrgBuildingIcon from '../../../assets/customSVGIcons/OrgBuildingIcon';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import { modalActions } from '../../../utils/constants';
import CustKpiCards from './CustKpiCards';
import getRoleColor from '../../../utils/getRolesColor';
import { EDITS_HISTORY } from '../../../utils/enums/CustomersEnums';
import { EditHistoryContext } from '../ManageCustomers';

const EditsHistory = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { rowDataUid } = location.state || {};

  const { currentEnv } = useSelector((state) => state?.authenticationSlice);

  const editHistoryDetailsContext = useContext(EditHistoryContext);

  const { openEditsHistory, setOpenEditsHistory, selectedOption } = editHistoryDetailsContext || {};

  const { getCustomerEditHistoryData, reqCustomerLoader } = useSelector((state) => state?.manageCustomers);

  const { gridData, KpiDetails } = getCustomerEditHistoryData || {};

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
    edited_by: true,
    role_by: true,
    date: true,
    field: true,
    from: true,
    to: true,
    account_display_name: false,
  });
  const defaultSortModel = [
    {
      field: 'edited_by',
      sort: 'asc',
    },
  ];

  useEffect(() => {
    if (selectedOption?.title === 'Edits History') {
      dispatch(getCustomerEditHistory(rowDataUid));
    }
  }, [dispatch, openEditsHistory === true, selectedOption, rowDataUid]);

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
          {params.value || '-'}
        </Box>
      ),
      type: 'number',
      headerAlign: 'left',
    },
    {
      field: 'edited_by',
      headerName: 'Edited By',
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
      headerAlign: 'left',
    },
    {
      field: 'role_by',
      headerName: 'Role',
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => {
        const role_key = params?.row?.role_key;
        const role_name = params?.row?.role_by;
        const color = getRoleColor(role_key);

        return (
          <Box
            sx={{
              cursor: 'not-allowed',
            }}
          >
            <Chip
              variant="outlined"
              color={color}
              label={role_name}
              sx={{ cursor: 'pointer', color: color, borderColor: color }}
            />
          </Box>
        );
      },
      headerAlign: 'left',
    },
    {
      field: 'date',
      headerName: 'Date/Time',
      width: 150,
      minWidth: 150,
      align: 'left',
      renderCell: (params) => {
        const value = params.value;
        let formattedDate = '-';
        if (value) {
          const date = new Date(value);
          const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          };
          formattedDate = date
            .toLocaleString('en-US', options)
            .replace(',', '');
        }
        return (
          <Box
            sx={{
              cursor: 'not-allowed',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {formattedDate}
          </Box>
        );
      },
      headerAlign: 'left',
    },
    {
      field: 'field',
      headerName: 'Field',
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
      headerAlign: 'left',
    },
    {
      field: 'from',
      headerName: 'From',
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
      headerAlign: 'left',
    },
    {
      field: 'to',
      headerName: 'To',
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
      headerAlign: 'left',
    },
  ];

  return (
    <>
      <ASDrawer
        {...{
          open: openEditsHistory,
          setOpen: setOpenEditsHistory,
          action: 'Create',
          headerName: EDITS_HISTORY,
          showFooter: false,
          headerImage: OrgBuildingIcon,
          rightIcons: (
            <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
              <DropdownMenu options={modalActions || []} onOptionSelect={() => { }} selectedOption={null} />
            </div>
          ),
          width: 800,
        }}
        mainLoader={reqCustomerLoader}
        width="73.75rem"
      >
        <Grid
          container
          className="ua-dashboard-card"
          gap={2.5}
          size={{ xs: 12 }}
          sx={{
            marginTop: { xs: 4, md: 2 },
            overflowX: 'auto',
            display: 'flex',
            flexWrap: { xs: 'nowrap', md: 'nowrap' },
            padding: { xs: '0 0 16px 0', md: 0 },
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { height: '8px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#BCE6F1', borderRadius: '4px' },
          }}
        >
          {KpiDetails?.map((item, index) => (
            <Grid size={{ xs: 12 }} key={index} sx={{ minWidth: 'auto' }}>
              <CustKpiCards data={item} timeZone={currentEnv} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ width: '100%' }}>
          <ASDataGrid
            columns={columns}
            rows={gridData || []}
            pageSize={10}
            cNameToAddAvatar="edited_by"
            exportFileName="history"
            columnVisibilityModel={columnVisibilityModel}
            setColumnVisibilityModel={setColumnVisibilityModel}
            defaultSortModel={defaultSortModel}
          />
        </Box>
      </ASDrawer>
    </>
  );

};

export default EditsHistory;
