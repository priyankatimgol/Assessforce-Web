import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DataGridPro,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  gridFilterModelSelector,
  useGridApiContext,
  useGridSelector,
  useGridApiRef,
  GridPreferencePanelsValue,
  gridPreferencePanelStateSelector,
  GridColumnHeaderSortIcon,
  gridColumnFieldsSelector,
} from '@mui/x-data-grid-pro';
import {
  Avatar,
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  useMediaQuery,
  Button,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import dayjs from 'dayjs';
import { utils, writeFile } from 'xlsx';
import ASCSort from '../../assets/customSVGIcons/headers/ASCSort';
import FilterIcon from '../../assets/customSVGIcons/headers/FilterIcon';
import PinToRight from '../../assets/customSVGIcons/headers/PinToRight';
import PinToLeft from '../../assets/customSVGIcons/headers/PinToLeft';
import HideColumnIcon from '../../assets/customSVGIcons/headers/HideColumnIcon';
import ManageColumnsIcon from '../../assets/customSVGIcons/headers/ManageColumnsIcon';
import DESCSort from '../../assets/customSVGIcons/headers/DESCSort';
import TrashIcon from '../../assets/customSVGIcons/headers/TrashIcon';
import { useDispatch, useSelector } from 'react-redux';
import StickyHeaders from '../StickyHeaders';
import { fetchCustomerDetails } from '../../redux/slice/manageCustomers/ManageCustomersSlice';
import DropdownMenu from './DropdownMenu';
import useDebounce from '../../hooks/useDebounce';
import { ThemeContext } from '../../context/ThemeContext';
import ButtonIconRenderer from '../../modules/manageCustomers/helper/ButtonIconRenderer';
import '../../styles/commonCSS.styles.css';

const ASDataGridCustomer = ({
  pageSize = 10,
  rowsPerPageOptions = [10, 20, 50],
  checkboxSelection = false,
  disableSelectionOnClick = true,
  autoHeight = true,
  isReordering = false,
  exportFileName = 'Customer',
  handleOptionSelect,
  handleCellClick,
  gridApiFlag,
  setGridApiFlag,
  listOptions,
  ...props
}) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiRef(null);
  const containerRef = useRef(null);
  const columnVisibilityRef = useRef(null);
  const isInitialSortApplied = useRef(false);

  const { mode } = useContext(ThemeContext);
  const isMobile = useMediaQuery('(max-width:900px)');
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const { customersData } = useSelector((state) => state?.manageCustomers);
  const { customerHeadersList, TotalRecords, TotalPages, currentPageRes, custQuickActions } =
    customersData || {};
  const { sort_key, avatar_key, click_to_view } = custQuickActions || {};
  const [forceRender, setForceRender] = useState(0);
  const [currentPage, setCurrentPage] = useState(currentPageRes || 1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [showHeaderFilters, setShowHeaderFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(TotalPages);
  const [totalRows, setTotalRows] = useState();
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [selectedDensity, setDensity] = useState('standard');
  const [columnVisibility, setColumnVisibility] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [sortModel, setSortModel] = useState([]);
  const debouncedFilterModel = useDebounce(filterModel, 500);

  const date = dayjs()?.tz(currentEnv?.time_zone)?.format(`${currentEnv?.date_format}_HH:mm:ss`);
  const cNameToAddAvatar = avatar_key;
  const fileName = `${exportFileName}-${date}`;
  const hiddenFields = ['actions'];

  const fetchData = async ({ page, pageSize, filterModel, sortModel }) => {
    setLoader(true);

    const payload = {
      page,
      pageSize,
      filterModel: JSON.stringify(filterModel),
      sortModel: JSON.stringify(sortModel),
    };
    const queryString = new URLSearchParams(payload).toString();
    let actionResult;
    actionResult = dispatch(fetchCustomerDetails(queryString));
    actionResult
      .unwrap()
      .then((result) => {
        setRows(result?.customerListingDetails);
        setTotalPages(Math.ceil(result?.TotalRecords / currentPageSize));
        setTotalRows(result?.TotalRecords);
        setCurrentPage(result?.currentPageRes);
        // handleColumns(result?.customerHeadersList);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData({
      page: currentPage,
      pageSize: currentPageSize,
      filterModel: debouncedFilterModel,
      sortModel,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentPageSize, debouncedFilterModel, sortModel]);

  useEffect(() => {
    if (gridApiFlag) {
      setGridApiFlag(false);
      fetchData({
        page: currentPage,
        pageSize: currentPageSize,
        filterModel: debouncedFilterModel,
        sortModel,
      });
    }
  }, [gridApiFlag]);

  useEffect(() => {
    if (customerHeadersList) {
      const columnVisibilityModel = customerHeadersList?.reduce((model, column) => {
        model[column.field] = column.default;
        setForceRender((prev) => prev + 1); //Force re-render
        return model;
      }, {});

      setColumnVisibility(columnVisibilityModel);
    }
  }, [customerHeadersList]);

  useEffect(() => {
    columnVisibilityRef.current = columnVisibility;
  }, [columnVisibility]);

  useEffect(() => {
    setAppBarHeight(getAppBarHeight());
  }, []);

  useEffect(() => {
    handleColumns(customerHeadersList, listOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerHeadersList, listOptions]);

  const handleColumns = useCallback(
    (customerHeadersList, listOptions) => {
      const listOptionsDataRaw = Object.entries(listOptions || {})
        // eslint-disable-next-line no-unused-vars
        ?.filter(([_, value]) => typeof value === 'string')
        ?.map(([key, value]) => ({
          label: value,
          value: key,
          icon: () => <ButtonIconRenderer type={value} />,
        }));

      listOptionsDataRaw.splice(6, 0, {
        label: 'Divider',
        icon: '',
      });

      const listOptionsData = listOptionsDataRaw?.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      const config_columns = customerHeadersList?.map((column) => ({
        ...column,
        width: column?.field === 'actions' ? 80 : 150,
        minWidth: column?.field === 'actions' ? 80 : 200,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => {
          return (
            <>
              {column?.field === 'actions' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                  <DropdownMenu
                    options={listOptionsData}
                    onOptionSelect={(option) =>
                      handleOptionSelect(option, params.row, params?.row?.type === 'HM' ? 'HM' : 'Created')
                    }
                    selectedOption={null}
                    // setIsHovered={setIsHovered}
                    className="customer-options"
                    type="Customer"
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                    // cursor: column?.field === 'name' ? 'pointer' : 'not-allowed',
                    cursor: 'not-allowed',
                  }}
                >
                  {column?.field === 'type' ? (
                    <Chip
                      variant="filled"
                      color={
                        params?.value === 'Created'
                          ? 'success'
                          : params?.value === 'Imported'
                            ? 'error'
                            : 'default'
                      }
                      label={params?.value}
                      sx={{
                        //cursor: 'pointer',
                        fontFamily: 'inter-regular',
                        padding: '3px 4px',
                        // backgroundColor: params?.value === 'HM' ? '#EF6C00' : undefined,
                        // color: params?.value === 'HM' ? 'white' : undefined,
                        backgroundColor:
                          params?.value === 'customer_profile'
                            ? '#2E7D32'
                            : params?.value === 'household_member_profile'
                              ? '#EF6C00'
                              : undefined,
                        color:
                          params?.value === 'customer_profile'
                            ? '#FFFFFF'
                            : params?.value === 'household_member_profile'
                              ? '#FFFFFF'
                              : undefined,
                      }}
                      size="small"
                    />
                  ) : (
                    params?.value || '-'
                  )}
                </Box>
              )}
            </>
          );
        },
      }));

      setColumns(config_columns);
    },
    [listOptions]
  );

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangePageSize = (event) => {
    setCurrentPageSize(event.target.value);
    setCurrentPage(1);
  };

  const useColumnsState = (apiRef, columns) => {
    const [widths, setWidths] = React.useState({});
    const [orderedFields, setOrderedFields] = React.useState([]);

    React.useEffect(() => {
      if (columns) {
        setOrderedFields(columns.map((column) => column.field));
      }
    }, [columns]);

    const onColumnWidthChange = React.useCallback(({ colDef, width }) => {
      setWidths((prev) => ({ ...prev, [colDef.field]: width }));
    }, []);

    const onColumnOrderChange = React.useCallback(() => {
      const updatedFields = gridColumnFieldsSelector(apiRef);
      setOrderedFields(updatedFields);
    }, [apiRef]);

    const computedColumns = React.useMemo(() => {
      return orderedFields
        ?.map((field) => {
          const column = columns?.find((col) => col.field === field);
          if (!column) return null;
          return {
            ...column,
            flex: widths[field] ? undefined : 1,
            width: widths[field] || column.width,
          };
        })
        ?.filter(Boolean);
    }, [columns, widths, orderedFields]);

    return { columns: computedColumns, onColumnWidthChange, onColumnOrderChange };
  };

  const getDefaultFilter = (field) => ({ field, operator: 'equals' });
  const transformLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const AdminFilter = (props) => {
    // eslint-disable-next-line react/prop-types
    const { colDef, filterOptions, filterItem, headerFilter = false } = props;
    const apiRef = useGridApiContext();
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
    const currentFieldFilters = useMemo(
      () => filterModel.items?.filter(({ field }) => field === colDef?.field),
      [colDef?.field, filterModel.items]
    );

    const handleChange = useCallback(
      (event) => {
        const newValue = event.target.value;
        let valueIndexSelected = currentFieldFilters.find((item) => item.id === filterItem?.id);

        if (headerFilter) {
          const newFilterItem = {
            // eslint-disable-next-line react/prop-types
            ...(currentFieldFilters[0] || getDefaultFilter(colDef?.field)),
            value: newValue,
          };

          const updatedFilters = [
            // eslint-disable-next-line react/prop-types
            ...filterModel.items.filter(({ field }) => field !== colDef?.field),
            newFilterItem,
          ];
          apiRef.current.setFilterModel({ ...filterModel, items: updatedFilters });
        } else {
          const updatedFilters = filterModel.items.map((item) =>
            item.id === valueIndexSelected?.id
              ? { ...item, value: newValue === 'select' ? null : newValue }
              : item
          );
          apiRef.current.setFilterModel({ ...filterModel, items: updatedFilters });
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [apiRef, colDef?.field, currentFieldFilters, filterModel]
    );

    const value = filterItem?.value ?? '';
    const label = value === '' ? 'select' : transformLabel(value);

    return (
      <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }} fullWidth>
        <InputLabel id="select-is-admin-label" sx={{ color: !headerFilter && 'var(--muted-text)' }}>
          {headerFilter ? 'Equals' : 'Value'}
        </InputLabel>
        <Select
          labelId="select-is-admin-label"
          id="select-is-admin"
          value={value}
          onChange={handleChange}
          label={label}
          sx={{ textTransform: 'capitalize', fontFamily: 'inter-regular' }}
        >
          <MenuItem value={headerFilter ? '' : 'select'}>Select</MenuItem>
          {filterOptions?.map((item) => (
            <MenuItem value={item?.value} key={item?.label}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  const modifiedColumns = useMemo(() => {
    const clickableFields = Object.keys(click_to_view || {});
    return columns?.map((col) => {
      if (col?.field === cNameToAddAvatar) {
        return {
          ...col,
          renderCell: (params) => {
            const avatarColors = [
              '#AB47BC', //purple
              '#D81B60', //pink
              '#A84300', //amber
              '#1B7C95', //logocolor
              '#00796B', //teal
              '#33691E', //green
              '#5C6BC0', //indigo
              '#0277BD', //blue
            ];
            const name = params.row?.[`${cNameToAddAvatar}`];

            const initials =
              name && name.trim()
                ? name?.includes(' ')
                  ? name?.split(' ')[0]?.charAt(0) + name?.split(' ')[1]?.charAt(0)
                  : name?.length === 1
                    ? name?.charAt(0) + 'X'
                    : name?.charAt(0) + name?.charAt(1)
                : ', XX';
            function getInitialsMagicNumber(initials) {
              const numbers = initials
                ?.toLowerCase()
                ?.split('')
                ?.map((char) => char?.charCodeAt(0));
              const spice = numbers?.[0] < numbers?.[1] ? 0 : 1;
              return numbers?.reduce((acc, n) => acc + n) + spice;
            }

            const magicNumber = getInitialsMagicNumber(initials);
            const colorIndex = magicNumber % avatarColors.length;
            const randomColor = avatarColors[colorIndex];

            return (
              <Tooltip title={params?.value || ''}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Avatar
                    sx={{
                      width: '1.875rem',
                      height: '1.875rem',
                      marginRight: 1,
                      textTransform: 'uppercase',
                      fontSize: '.8rem',
                      backgroundColor: randomColor,
                    }}
                  >
                    <Typography
                      component="text"
                      sx={{
                        fontSize: '.8rem',
                        color: 'var(--pure-color)',
                      }}
                    >
                      {name
                        ? name?.includes(' ')
                          ? name?.split(' ')[0].charAt(0) + name?.split(' ')[1].charAt(0)
                          : name?.length === 1
                            ? name?.charAt(0) + 'X'
                            : name?.charAt(0) + name?.charAt(1)
                        : 'XX'}
                    </Typography>
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {name}
                  </Typography>
                </Box>
              </Tooltip>
            );
          },
        };
      }
      if (clickableFields.includes(col?.field)) {
        return {
          ...col,
          renderCell: (params) => (
            <Box
              sx={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {params?.value}
            </Box>
          ),
        };
      }

      const chipFilterOptions = Array.from(new Set(rows.map((item) => item?.type).filter(Boolean))).map(
        (type) => ({
          label: type,
          value: type,
        })
      );

      return {
        ...col,
        filterOperators:
          col?.field === 'type'
            ? [
                {
                  value: 'equals',
                  getApplyFilterFn: (filterItem) => {
                    if (!filterItem?.value || filterItem?.value?.length === 0) {
                      return null;
                    }
                    return (value) => {
                      return filterItem?.value?.includes(String(value));
                    };
                  },
                  InputComponent: (prop) => (
                    <AdminFilter
                      {...prop}
                      colDef={col}
                      filterItem={prop?.item}
                      filterOptions={chipFilterOptions}
                    />
                  ),
                },
              ]
            : col?.filterOperators,
        renderHeaderFilter:
          col?.field === 'type'
            ? (params) => (
                <AdminFilter
                  {...params}
                  filterItem={params?.item}
                  headerFilter={true}
                  filterOptions={chipFilterOptions}
                />
              )
            : col?.renderHeaderFilter,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, props.filterOptionsForRoles]);

  const CustomPagination = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-end',
          padding: isMobile ? 1 : 2,
          gap: isMobile ? 1 : 2,
        }}
      >
        {/* Top row: Rows per page, Select, and page info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 1 : 2,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {/* Rows per page */}
          <InputLabel
            htmlFor="row-per-page-select"
            id="row-per-page-select-label"
            sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: 'text.secondary' }}
          >
            Rows per page:
          </InputLabel>
          <Select
            //id="row-per-page-select"
            inputProps={{ id: 'row-per-page-select' }}
            labelId="row-per-page-select-label"
            value={currentPageSize}
            onChange={handleChangePageSize}
            size="small"
            sx={{
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              width: isMobile ? '80px' : 'auto',
              border: 'none',
              '& fieldset': {
                border: 'none',
              },
            }}
          >
            {rowsPerPageOptions?.map((option, index) => (
              <MenuItem id={`${option}-${index}`} key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          {/* Page info */}
          <Typography
            variant="body2"
            sx={{
              fontSize: isMobile ? '0.8rem' : '0.9rem',
            }}
          >
            {totalRows === 0
              ? '0-0 of 0'
              : `${(currentPage - 1) * currentPageSize + 1}-${Math.min(currentPage * currentPageSize, totalRows)} of ${totalRows}`}
          </Typography>
        </Box>

        {/* Bottom row: Pagination icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 0.5 : 1,
            marginTop: isMobile ? 1 : 0,
          }}
        >
          <Tooltip title="Go to first page">
            <IconButton
              onClick={() => handleChangePage(0)}
              disabled={currentPage === 0}
              size="small"
              sx={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
              }}
            >
              <SkipPreviousIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to previous page">
            <IconButton
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage === 0}
              size="small"
              sx={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to next page">
            <IconButton
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              size="small"
              sx={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to last page">
            <IconButton
              onClick={() => handleChangePage(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
              size="small"
              sx={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
              }}
            >
              <SkipNextIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );
  };

  const handleExportExcel = () => {
    try {
      const filteredColumns = columns?.filter(
        (col) =>
          !hiddenFields.includes(col.field) &&
          (columnVisibilityRef.current[col.field] === true || !(col.field in columnVisibilityRef.current))
      );

      const columnHeaders = filteredColumns?.reduce((acc, col) => {
        acc[col.field] = col.headerName;
        return acc;
      }, {});

      const filteredRows = rows?.map((row) => {
        const filteredRow = {};
        filteredColumns?.forEach((col) => {
          filteredRow[col.headerName] = row[col.field] !== undefined ? row[col.field] : '-';
        });
        return filteredRow;
      });

      const ws = utils.json_to_sheet(filteredRows);

      const headerRow = Object.values(columnHeaders)?.map((header) => header.toUpperCase());
      utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });

      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');

      writeFile(wb, `${fileName}.xlsx`);
    } catch (err) {
      console.error('Error exporting to Excel:', err);
    }
  };

  const getTogglableColumns = (columns) => {
    return columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);
  };

  const handleColumnsClick = () => {
    const preferencePanelState = gridPreferencePanelStateSelector(apiRef.current.state);
    if (preferencePanelState.open) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    }
  };

  const CustomToolbar = useCallback(() => {
    return (
      <GridToolbarContainer
        className="custom-toolbar"
        sx={{
          marginTop: { xs: '20px', md: '0px' },
          marginLeft: { xs: '-5px', md: 0 },
        }}
      >
        <GridToolbarColumnsButton
          onClick={handleColumnsClick}
          //ref={setAnchorEl}
          slotProps={{
            tooltip: { title: 'Select columns to display' },
            button: { sx: { textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 500 } },
          }}
        />

        <Tooltip title="Show filters">
          <Button
            variant="text"
            size="small"
            onClick={() => setShowHeaderFilters(!showHeaderFilters)}
            startIcon={<FilterListRoundedIcon />}
            sx={{ textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Filters
          </Button>
        </Tooltip>
        <GridToolbarDensitySelector
          slotProps={{
            tooltip: { title: 'Adjust row height' },
            button: { sx: { textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 500 } },
          }}
        />
        <Tooltip title="Export table data">
          <Button
            variant="text"
            size="small"
            onClick={handleExportExcel}
            startIcon={<SaveAltRoundedIcon />}
            sx={{ textTransform: 'capitalize', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Export
          </Button>
        </Tooltip>
      </GridToolbarContainer>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHeaderFilters, rows]);

  // Custom Sort Icon with Tooltip
  const CustomSortIcon = (props) => {
    // eslint-disable-next-line react/prop-types
    const { field } = props;
    const column = modifiedColumns.find((col) => col.field === field);
    const headerName = column ? column.headerName : field;
    return (
      <Tooltip title={`Sort by ${headerName}`}>
        <span>
          <GridColumnHeaderSortIcon {...props} />
        </span>
      </Tooltip>
    );
  };

  /*Sticky Header start*/
  const getAppBarHeight = () => {
    const appBar = document.querySelector('.MuiAppBar-root');
    return appBar ? appBar.offsetHeight - 1 : 64; // Fallback if not found
  };

  StickyHeaders({ containerRef, topOffset: appBarHeight });
  /*Sticky Header end*/

  const columnsState = useColumnsState(apiRef, modifiedColumns);

  useEffect(() => {
    if (sort_key && !isInitialSortApplied.current) {
      setSortModel([{ field: sort_key, sort: 'asc' }]);
      isInitialSortApplied.current = true;
    }
  }, [sort_key]);

  const handleSortChange = (newSortModel) => {
    let finalSortArray = [...newSortModel];

    const alreadyExists = finalSortArray.some((item) => item.field === sort_key);

    if (!alreadyExists && sort_key) {
      finalSortArray.push({
        field: sort_key,
        sort: 'asc',
      });
    }

    setSortModel(finalSortArray);
    setCurrentPage(1);
  };
  const handleFilterChange = (newFilterModel) => {
    let updatedFilterModel = { ...newFilterModel };

    if (updatedFilterModel.items.length === 0) {
      delete updatedFilterModel.logicOperator;
    }
    setFilterModel(updatedFilterModel);
    setCurrentPage(1);
  };
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: { xs: 0, md: 8 }, left: { xs: 0, md: 10 } }}>
        <Typography
          className="grid-result-count"
          fontSize="0.9rem"
          fontFamily="inter-regular"
          color="text.primary"
        >
          {TotalRecords} {TotalRecords === 1 || TotalRecords === 0 ? 'Result' : 'Results'}
        </Typography>
      </Box>
      <div ref={containerRef} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <DataGridPro
          key={forceRender} //key to force re-render
          apiRef={apiRef}
          columns={columnsState.columns}
          rows={rows}
          filterModel={filterModel}
          // onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel || { items: [] })}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick={disableSelectionOnClick}
          autoHeight={autoHeight}
          headerFilters={showHeaderFilters}
          slots={{
            columnHeaderSortIcon: CustomSortIcon, // Override the sort icon
            columnMenuSortAscendingIcon: ASCSort, // Custom Ascending Sort Icon
            columnMenuSortDescendingIcon: DESCSort, // Custom Descending Sort Icon
            columnMenuFilterIcon: FilterIcon, // Custom Filter Icon
            columnMenuPinRightIcon: PinToRight, // Custom Pin to Right Icon
            columnMenuPinLeftIcon: PinToLeft, // Custom Pin to Left Icon
            columnMenuHideIcon: HideColumnIcon, // Custom Hide Column Icon
            columnMenuManageColumnsIcon: ManageColumnsIcon, // Custom Manage Columns Icon
            filterPanelRemoveAllIcon: TrashIcon,
            toolbar: CustomToolbar,
            footer: CustomPagination,
            noRowsOverlay: () => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  mt: 2,
                }}
              >
                No results found.
              </Box>
            ),
          }}
          slotProps={{
            panel: {
              placement: 'bottom-end',
            },
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
            columnsManagement: {
              getTogglableColumns,
            },
            basePopper: {
              sx: {
                // '& .MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before': {
                //   borderBottom: '1px solid var(--primary-color)',
                // },
                '& .MuiDataGrid-columnsManagementHeader': {
                  paddingLeft: '8px !important',
                  paddingRight: '8px !important',
                  '&::before': {
                    content: '"Find Column"',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary-color)',
                    lineHeight: '0.75rem',
                    fontFamily: 'inter-regular',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiInputBase-root': {
                    borderBottom: '1px solid #0000003b',
                    borderRadius: 0,
                    paddingLeft: '0px !important',
                    '& .MuiInputAdornment-root': {
                      color: 'var(--primary-color)',
                    },
                  },
                },
              },
            },
          }}
          rowReordering={isReordering}
          loading={loader}
          getRowId={(row, index) => row?.profile_id || `${index}`}
          columnVisibilityModel={columnVisibility}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibility(newModel)}
          disableRowSelectionOnClick
          sortModel={sortModel}
          // onSortModelChange={setSortModel}
          onCellClick={handleCellClick}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          rowCount={totalRows}
          pageSize={currentPageSize}
          page={currentPage}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          onFilterModelChange={handleFilterChange}
          onSortModelChange={handleSortChange}
          disableMultipleColumnsSorting={false}
          headerFilterHeight={
            selectedDensity === 'compact' ? 80 : selectedDensity === 'comfortable' ? 45 : 58
          }
          onDensityChange={(data) => setDensity(data)}
          //onColumnResize={onColumnResized}
          onColumnWidthChange={columnsState.onColumnWidthChange}
          onColumnOrderChange={columnsState.onColumnOrderChange}
          sx={{
            /* Target the selected value inside the filter select list */
            // '& .MuiDataGrid-headerFilterRow .MuiDataGrid-columnHeader .MuiInputBase-input': {
            //   fontSize: '0.875rem', /* Adjust font size */
            // },
            '& .MuiDataGrid-headerFilterRow .MuiDataGrid-columnHeader .MuiInputBase-root': {
              fontSize: '0.875rem' /* Adjust font size */,
            },
            border: 0,
            minHeight: rows?.length === 0 ? 200 : 'auto',
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'scroll !important',
              borderBottom: `1px solid ${mode === 'dark' ? 'var(--divider-color)' : 'var(--DataGrid-rowBorderColor)'} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderLeft: 'none',
              borderRight: 'none',
              lineHeight: 'normal',
              borderRadius: 0,
            },
            '& .MuiDataGrid-cell': {
              borderLeft: 'none',
              borderRight: 'none',
              fontFamily: 'inter-regular',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 'normal',
            },
            '& .MuiDataGrid-toolbarContainer': {
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              paddingRight: '10px',
              alignSelf: 'flex-end',
            },
            '& .MuiDataGrid-columnHeader': {
              borderRight: 'none',
              fontWeight: 'bold !important',
              color: 'var(--text-secondary-color) !important',
              fontSize: '0.8rem',
              borderTop: `1px solid ${mode === 'dark' ? 'var(--divider-color)' : 'var(--DataGrid-rowBorderColor)'}`,
              borderBottom: `1px solid ${mode === 'dark' ? 'var(--divider-color)' : 'var(--DataGrid-rowBorderColor)'} !important`,
            },
            '& .MuiDataGrid-row': {
              '--rowBorderColor': `${mode === 'dark' ? 'var(--divider-color)' : 'var(--DataGrid-rowBorderColor)'}`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textTransform: 'uppercase !important',
              fontFamily: 'inter-regular',
              color: 'text.secondary',
            },
            '& .MuiDataGrid-filterForm .MuiInputBase-input': {
              textTransform: 'none',
            },
            '& .MuiDataGrid-filterForm .MuiInputBase-input::placeholder': {
              textTransform: 'none',
            },
            '& .MuiDataGrid-sortIcon:hover': {
              opacity: '1 !important',
              color: 'var(--primary-color) !important', // Change to blue when hovering over the icon
            },
          }}
          {...props}
        />
      </div>
    </Box>
  );
};

ASDataGridCustomer.propTypes = {
  pageSize: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  autoHeight: PropTypes.bool,
  checkboxSelection: PropTypes.bool,
  disableSelectionOnClick: PropTypes.bool,
  cNameToAddAvatar: PropTypes.string,
  isReordering: PropTypes.bool,
  exportFileName: PropTypes.string,
  columnVisibilityModel: PropTypes.object,
  handleOptionSelect: PropTypes.func,
  handleCellClick: PropTypes.func,
  filterOptions: PropTypes.array,
  filterOptionsForRoles: PropTypes.array,
  filterItem: PropTypes.any,
  colDef: PropTypes.any,
  gridApiFlag: PropTypes.bool,
  setGridApiFlag: PropTypes.func,
  listOptions: PropTypes.any,
};

export default ASDataGridCustomer;
