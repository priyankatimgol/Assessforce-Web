import { useContext, useEffect, useState } from 'react';
import ASDrawer from '../../../components/mainComponents/ASDrawer';
import { Box, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import caTree from '../../../assets/images/caTree.svg';
import { modalActions } from '../../../utils/constants';
import DropdownMenu from '../../../components/mainComponents/DropdownMenu';
import { EditOrganizationHistoryContext } from '../ManageOrganizations';
import OrgKpiEditHistory from './OrgKpiEditHistory';
import ASDataGrid from '../../../components/mainComponents/ASDataGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizationEditHistory } from '../../../redux/slice/manageOrganization/ManageOrganizationSlice';
import getRoleColor from '../../../utils/getRolesColor';
import OrgBuildingSvg from '../../../assets/customSVGIcons/OrgBuildingSvg';

const EditOrganizationHistory = () => {
  const dispatch = useDispatch();
  const EditOrganizationHistory = useContext(EditOrganizationHistoryContext);
  const { openOrganizationHistory, setOpenOrganizationHistory, selectedRow, setSelectedOption } =
    EditOrganizationHistory || {};
  const { organizationEditHistoryDetails, organizationEditHistoryLoader } = useSelector(
    (state) => state?.manageOrganizations
  );
  const { gridData, KpiDetails } = organizationEditHistoryDetails || {};
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const [filterRoles, setFilterData] = useState([]);
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
      field: 'date',
      sort: 'desc',
    },
  ];

  useEffect(() => {
    if (selectedRow?.id) dispatch(getOrganizationEditHistory(selectedRow?.id));

    return () => {
      setSelectedOption({ label: 'Edit' });
    };
  }, [dispatch, openOrganizationHistory]);

  useEffect(() => {
    if(gridData) {
      const uniqueRoles = Array.from(
        new Set(gridData?.map(item => item.role_by))
      ).map(role => ({
        label: role,
        value: role
      }));
    
      setFilterData(uniqueRoles);
    }
  }, [gridData]);

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
        const role_name = params?.row?.role_by;
        const color = getRoleColor(role_name);

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
              size="small"
              sx={{ cursor: 'pointer', color: color, borderColor: color, padding: '3px 4px' }}
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
          open: openOrganizationHistory,
          setOpen: setOpenOrganizationHistory,
          action: 'Create',
          headerName: 'Edits History',
          showFooter: false,
          headerImage: OrgBuildingSvg,
          rightIcons: (
            <div style={{ gap: 3, fontFamily: 'inter-regular' }} className="items-center">
              <DropdownMenu options={modalActions || []} onOptionSelect={() => {}} selectedOption={null} />
            </div>
          ),
          width: 800,
        }}
        mainLoader={organizationEditHistoryLoader}
        width="75rem"
      >
        <Grid container>
          <Grid
            container
            className="ua-dashboard-card"
            gap={2}
            size={{ xs: 12 }}
            sx={{
              marginTop: { xs: 4, md: 2 },
              marginBottom: '20px',
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
                <OrgKpiEditHistory data={item} timeZone={currentEnv} />
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
              filterOptionsForRoles={filterRoles}
            />
          </Box>
        </Grid>
      </ASDrawer>
    </>
  );
};

export default EditOrganizationHistory;
