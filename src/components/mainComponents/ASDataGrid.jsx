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
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { utils, writeFile } from 'xlsx';
import dayjs from 'dayjs';
import '../../styles/commonCSS.styles.css';
import { filterOptionsForOrg, filterOptionsForStatus } from '../../utils/constants';
import ASCSort from '../../assets/customSVGIcons/headers/ASCSort';
import FilterIcon from '../../assets/customSVGIcons/headers/FilterIcon';
import PinToRight from '../../assets/customSVGIcons/headers/PinToRight';
import PinToLeft from '../../assets/customSVGIcons/headers/PinToLeft';
import HideColumnIcon from '../../assets/customSVGIcons/headers/HideColumnIcon';
import ManageColumnsIcon from '../../assets/customSVGIcons/headers/ManageColumnsIcon';
import DESCSort from '../../assets/customSVGIcons/headers/DESCSort';
import TrashIcon from '../../assets/customSVGIcons/headers/TrashIcon';
import { useSelector } from 'react-redux';
import StickyHeaders from '../StickyHeaders';
import { ThemeContext } from '../../context/ThemeContext';
import ClearIcon from '@mui/icons-material/Clear';

const ASDataGrid = ({
  columns,
  rows,
  pageSize = 10,
  rowsPerPageOptions = [10, 20, 50],
  checkboxSelection = false,
  disableSelectionOnClick = true,
  autoHeight = true,
  cNameToAddAvatar,
  isReordering = false,
  exportFileName = 'Assessforce',
  columnVisibilityModel,
  defaultSortModel,
  handleCellClick,
  loader = false,
  ...props
}) => {
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);

  const apiRef = useGridApiRef(null);
  const columnVisibilityRef = useRef(columnVisibilityModel);
  const { mode } = useContext(ThemeContext);

  const [sortModel, setSortModel] = useState(defaultSortModel);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(pageSize);
  const [showHeaderFilters, setShowHeaderFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(rows?.length);
  const [totalRows, setTotalRows] = useState(rows?.length);
  const [processedRows, setProcessedRows] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [finalRows, setFinalRows] = useState([]);
  const [selectedDensity, setDensity] = useState('standard');
  const [previousFilterModel, setPreviousFilterModel] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState(columnVisibilityModel);

  const date = dayjs()?.tz(currentEnv?.time_zone)?.format(`MM-DD-YYYY HH:mm:ss`);

  const fileName = `${exportFileName}-${date}`;

  const hiddenFields = ['actions'];

  useEffect(() => {
    if (columnVisibilityModel) {
      setColumnVisibility(columnVisibilityModel);
    }
  }, [columnVisibilityModel]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangePageSize = (event) => {
    setCurrentPageSize(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    let updatedRows = [...rows];

    // Detect filter change
    const isFilterChanged =
      JSON.stringify(filterModel?.items || []) !== JSON.stringify(previousFilterModel?.items || []);

    if (isFilterChanged) {
      // Reset to page 0 only if the filter model has changed
      setCurrentPage(0);
      setPreviousFilterModel(filterModel);
    }

    // Apply Filter
    if (filterModel?.items?.length > 0) {
      const { items, logicOperator = 'and' } = filterModel;

      updatedRows = updatedRows?.filter((row) => {
        return logicOperator === 'or'
          ? items.some((filter) => applyFilter(row, filter, logicOperator))
          : items.every((filter) => applyFilter(row, filter, logicOperator));
      });
    }

    // Apply sorting
    if (sortModel?.length > 0) {
      updatedRows.sort((a, b) => {
        for (let sort of sortModel) {
          const field = sort.field;
          const sortOrder = sort.sort === 'asc' ? 1 : sort.sort === 'desc' ? -1 : 0;
          if (sortOrder === 0) return 0;

          let valueA = a[field];
          let valueB = b[field];

          // Ensure values are strings for consistency
          valueA = valueA != null ? String(valueA).trim() : '';
          valueB = valueB != null ? String(valueB).trim() : '';

          // Check if both values are numeric strings
          const numA = parseFloat(valueA);
          const numB = parseFloat(valueB);

          const isNumericA = !isNaN(numA) && valueA === numA.toString();
          const isNumericB = !isNaN(numB) && valueB === numB.toString();

          if (isNumericA && isNumericB) {
            // Compare as numbers
            if (numA < numB) return -1 * sortOrder;
            if (numA > numB) return 1 * sortOrder;
          } else {
            // Compare as strings (case-insensitive)
            if (valueA.toLowerCase() < valueB.toLowerCase()) return -1 * sortOrder;
            if (valueA.toLowerCase() > valueB.toLowerCase()) return 1 * sortOrder;
          }
        }
        return 0;
      });
    }

    // Pagination
    const start = currentPage * currentPageSize;
    const end = start + currentPageSize;
    setFinalRows(updatedRows);
    const finalRows = updatedRows?.slice(start, end);
    const totalRows = updatedRows?.length;
    const totalPages = Math.ceil(totalRows / currentPageSize);
    setProcessedRows(finalRows);
    setTotalPages(totalPages);
    setTotalRows(totalRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, currentPage, currentPageSize, sortModel, filterModel]);

  const applyFilter = (row, filter, logicOperator) => {
    if (
      filter.operator !== 'isEmpty' &&
      filter.operator !== 'isNotEmpty' &&
      (!('value' in filter) || filter.value === undefined || filter.value === null || filter.value === '')
    ) {
      return logicOperator === 'or' ? false : true;
    }

    const rowValue =
      typeof row[filter.field] === 'string'
        ? row[filter.field]?.toString().toLowerCase()
        : Number(row[filter.field]);

    const filterValue =
      typeof filter.value === 'string' ? filter?.value?.toString().toLowerCase() : filter?.value;

    switch (filter.operator) {
      case 'contains':
        return rowValue?.includes(filterValue);
      case 'doesNotContain':
        return !rowValue?.includes(filterValue);
      case typeof filterValue === 'string' ? 'equals' : '=':
        return rowValue === filterValue;
      case typeof filterValue === 'string' ? 'doesNotEqual' : '!=':
        return rowValue !== filterValue;
      case 'startsWith':
        return rowValue?.startsWith(filterValue);
      case 'endsWith':
        return rowValue?.endsWith(filterValue);
      case 'isEmpty':
        return rowValue === '';
      case 'isNotEmpty':
        return rowValue !== '';
      case '>':
        return parseFloat(rowValue) > parseFloat(filterValue);
      case '<':
        return parseFloat(rowValue) < parseFloat(filterValue);
      case '>=':
        return parseFloat(rowValue) >= parseFloat(filterValue);
      case '<=':
        return parseFloat(rowValue) <= parseFloat(filterValue);
      default:
        return true;
    }
  };

  const useColumnsState = (apiRef, columns) => {
    const [widths, setWidths] = React.useState({});
    const [orderedFields, setOrderedFields] = React.useState(() => columns.map((column) => column.field));

    const onColumnWidthChange = React.useCallback(
      ({ colDef, width }) => {
        setWidths((prev) => ({ ...prev, [colDef.field]: width }));
      },
      [setWidths]
    );

    const onColumnOrderChange = React.useCallback(() => {
      setOrderedFields(gridColumnFieldsSelector(apiRef));
    }, [apiRef, setOrderedFields]);

    const computedColumns = React.useMemo(() => {
      return orderedFields
        .map((field) => {
          const column = columns.find((col) => col.field === field);
          if (!column) return null; // Skip if column is missing (edge case)

          return {
            ...column,
            flex: widths[field] ? undefined : 1, // Default flex: 1, but remove after resizing
            width: widths[field] || column.width, // Apply width if resized, else keep original
          };
        })
        .filter(Boolean); // Remove any `null` values
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
          {headerFilter ? 'Select' : 'Value'}
        </InputLabel>

        <Select
          labelId="select-is-admin-label"
          id="select-is-admin"
          value={value}
          onChange={handleChange}
          label={label}
          sx={{ textTransform: 'capitalize', fontFamily: 'inter-regular' }}
          displayEmpty
          renderValue={(selectedValue) =>
            value ? (
              <Box
                sx={{
                  alignItems: 'center',
                  width: '85%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  textTransform: 'capitalize',
                  fontFamily: 'inter-regular',
                }}
              >
                {transformLabel(selectedValue)}
              </Box>
            ) : ''
          }
        >
          <MenuItem value={headerFilter ? '' : 'select'}>Select</MenuItem>
          {filterOptions?.map((item) => (
            <MenuItem value={item?.value} key={item?.label}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>

        {value && (
          <Box
            sx={{
              position: 'absolute',
              right: 22,
              top: '53%',
              transform: 'translateY(-25%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                handleChange({ target: { value: '' } });
              }}
              sx={{
                pointerEvents: 'auto',
              }}
            >
              <ClearIcon fontSize="small" sx={{ height: 18, width: 18 }} />
            </IconButton>
          </Box>
        )}

      </FormControl>
    );
  };

  const modifiedColumns = useMemo(() => {
    return columns.map((col) => {
      // To hide the header filter from actions column
      if (col.field === 'actions') {
        return {
          ...col,
          filterable: false,
          renderHeaderFilter: undefined,
          sortable: false,
        };
      }

      if (col.field === cNameToAddAvatar) {
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
            // const generateHash = (str) => {
            //   if (!str) return 0;
            //   let hash = 0;
            //   for (let i = 0; i < str.length; i++) {
            //     hash = (hash * 31 + str.charCodeAt(i)) % avatarColors.length;
            //   }
            //   return hash;
            // };
            // const index = generateHash(name);
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

      const fromOrg = [
        'field_orgz_status',
        'field_orgz_gen_sponser_status',
        'field_orgz_self_sponser_status',
        'field_orgz_service_pro_status',
      ]?.includes(col?.field);

      return {
        ...col,
        filterOperators:
          col?.field === 'status' || col?.field === 'role' || col?.field === 'role_by' || fromOrg
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
                      filterOptions={
                        col?.field === 'role' || col?.field === 'role_by'
                          ? props.filterOptionsForRoles
                          : fromOrg
                            ? filterOptionsForOrg
                            : filterOptionsForStatus
                      }
                    />
                  ),
                },
              ]
            : col?.filterOperators,
        renderHeaderFilter:
          col?.field === 'status' || col?.field === 'role'  || col?.field === 'role_by' || fromOrg
            ? (params) => (
                <AdminFilter
                  {...params}
                  filterItem={params?.item}
                  headerFilter={true}
                  filterOptions={
                    col?.field === 'role'  || col?.field === 'role_by'
                      ? props?.filterOptionsForRoles
                      : fromOrg
                        ? filterOptionsForOrg
                        : filterOptionsForStatus
                  }
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
            inputProps={{ id: 'row-per-page-select', tabIndex: 0 }}
            labelId="row-per-page-select-label"
            value={currentPageSize}
            onChange={handleChangePageSize}
            size="small"
            sx={{
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              width: isMobile ? '80px' : 'auto',
              border: 'none',
              '& fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: '1px solid var(--primary-color) !important' },
            }}
          >
            {rowsPerPageOptions.map((option, index) => (
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
              : `${currentPage * currentPageSize + 1}-${Math.min((currentPage + 1) * currentPageSize, totalRows)} of ${totalRows}`}
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

      const filteredRows = finalRows?.map((row) => {
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

  useEffect(() => {
    columnVisibilityRef.current = columnVisibility;
  }, [columnVisibility]);

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
  }, [showHeaderFilters, finalRows]);

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
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    setAppBarHeight(getAppBarHeight());
    //const updateHeight = () => setAppBarHeight(getAppBarHeight());
    //window.addEventListener('resize', updateHeight);
    //return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const containerRef = useRef(null);
  StickyHeaders({ containerRef, topOffset: appBarHeight });
  /*Sticky Header end*/

  const columnsState = useColumnsState(apiRef, modifiedColumns);

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: { xs: 0, md: 8 }, left: { xs: 0, md: 10 } }}>
        <Typography
          className="grid-result-count"
          fontSize="0.9rem"
          fontFamily="inter-regular"
          color="text.primary"
        >
          {totalRows} {totalRows === 1 || totalRows === 0 ? 'Result' : 'Results'}
        </Typography>
      </Box>
      <div ref={containerRef} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <DataGridPro
          apiRef={apiRef}
          columns={columnsState.columns}
          rows={processedRows}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel || { items: [] })}
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
          getRowId={(row, index) => row?.nid || row?.id || row?.uid || `${index}`}
          columnVisibilityModel={columnVisibility}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibility(newModel)}
          disableRowSelectionOnClick
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          onCellClick={handleCellClick}
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
              // borderLeft: 'none',
              // borderRight: 'none',
              lineHeight: 'normal',
              borderRadius: 0,
            },
            '& .MuiDataGrid-cell': {
              // borderLeft: 'none',
              // borderRight: 'none',
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
              // borderRight: 'none',
              fontWeight: 'bold !important',
              color: 'var(--text-secondary-color) !important',
              fontSize: '0.8rem',
              borderTop: `1px solid ${mode === 'dark' ? 'var(--divider-color)' : 'var(--DataGrid-rowBorderColor)'}`,
              borderBottom: `1px solid ${mode === 'dark' ? 'var(--divider-color)' : 'var(--DataGrid-rowBorderColor)'} !important`, //var(--DataGrid-rowBorderColor)
            },
            '& .MuiDataGrid-columnHeaders div[role="row"]': {
              //bgcolor: props.isDrawer ? 'background.paper' : 'background.default',
              backgroundImage: 'var(--Paper-overlay)'
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

ASDataGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  checkboxSelection: PropTypes.bool,
  disableSelectionOnClick: PropTypes.bool,
  autoHeight: PropTypes.bool,
  cNameToAddAvatar: PropTypes.string,
  isReordering: PropTypes.bool,
  exportFileName: PropTypes.string,
  columnVisibilityModel: PropTypes.object,
  defaultSortModel: PropTypes.array,
  handleCellClick: PropTypes.func,
  filterOptions: PropTypes.array,
  filterOptionsForRoles: PropTypes.array,
  loader: PropTypes.bool,
  filterItem: PropTypes.any,
  colDef: PropTypes.any,
};

export default ASDataGrid;
