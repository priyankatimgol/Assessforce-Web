import { useCallback, useState } from 'react';
import { Paper, useMediaQuery } from '@mui/material';
import { DataGridPro, GridCellModes } from '@mui/x-data-grid-pro';
import PropTypes from 'prop-types';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import CustomSingleSelectEditCell from '../CustomSingleSelectEditCell';

const ASTable = ({
  columns,
  rows,
  onRowsChange,
  rowReordering = true,
  editable = true,
  requestEditData,
  ...props
}) => {
  const [cellModesModel, setCellModesModel] = useState({});
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleCellClick = useCallback((params, event) => {
    if (!params.isEditable) {
      return;
    }

    if (!event.currentTarget.contains(event.target)) {
      return;
    }

    setCellModesModel((prevModel) => {
      return {
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes?.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes?.Edit },
        },
      };
    });
  }, []);

  const handleCellModesModelChange = useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  const processedColumns = columns.map((column) => ({
    ...column,
    resizable: false,
    flex: isMobile ? null : 1,
    disableColumnMenu: true,
    sortable: false,
    renderEditCell: (params) => <CustomSingleSelectEditCell {...params} />,
    // cellClassName: (params) => {
    //   if (params.value === 'Select' && params.cellMode !== 'edit') {
    //     return 'initial-select-value';
    //   }
    //   return '';
    // },
  }));

  const processRowUpdate = (newRow) => {
    const oldRow = rows.find((row) => row.id === newRow.id);

    if (oldRow && oldRow.type !== newRow.type) {
      newRow.eform = 'Select';
    }
    if (oldRow && oldRow.field !== newRow.field) {
      newRow.from = requestEditData[newRow.field] || '';
    }

    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    onRowsChange(updatedRows);

    return newRow;
  };

  const isEmptyRowPresent = rows?.some(
    (r) => r?.type === 'Select' || r?.eform === 'Select' || r?.access === 'Select'
  );

  return (
    <Paper className="astable-container" sx={{ boxShadow: 'none' }}>
      <div className="astable-wrapper">
        <DataGridPro
          rows={rows}
          columns={processedColumns}
          editMode={editable ? 'cell' : null}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          autoHeight={true}
          disableRowSelectionOnClick={editable ? false : true}
          rowReordering={isEmptyRowPresent ? false : rowReordering}
          onCellModesModelChange={rowReordering && handleCellModesModelChange}
          onCellClick={rowReordering && handleCellClick}
          cellModesModel={rowReordering && cellModesModel}
          hideFooter
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
            baseSelect: {
              IconComponent: ExpandMoreRoundedIcon,
            },
          }}
          sx={{
            '& .MuiDataGrid-container--top [role=row]': {
              background: 'transparent',
            },
            '--DataGrid-overlayHeight': '50px',
            overflow: 'visible',
            minHeight: 'auto',
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeader': {
              borderRight: 'none',
              color: 'gray !important',
              fontFamily: 'inter-regular',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textTransform: 'uppercase',
              fontFamily: 'inter-regular',
              color: 'var(--text-secondary-color)',
            },
            '& .MuiDataGrid-iconSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-filterForm .MuiInputBase-input': {
              textTransform: 'none',
            },
            '& .MuiDataGrid-filterForm .MuiInputBase-input::placeholder': {
              textTransform: 'none',
            },
            '& .MuiDataGrid-root': {
              boxShadow: 'none',
            },
            '& .highlight-empty-cell': {
              color: 'var(--danger-color) !important',
            },
          }}
          {...props}
        />
      </div>
    </Paper>
  );
};

ASTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowsChange: PropTypes.func.isRequired,
  rowReordering: PropTypes.bool,
  editable: PropTypes.bool,
};

export default ASTable;
