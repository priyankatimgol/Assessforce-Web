import {
  gridColumnLookupSelector,
  GridEditInputCell,
  GridEditSingleSelectCell,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

const CustomSingleSelectEditCell = (props) => {
  const { id, field } = props;
  const apiRef = useGridApiContext();
  const columnLookup = useGridSelector(apiRef, gridColumnLookupSelector);

  const column = columnLookup[field];
  const type = column?.type;

  const handleSingleSelectChange = async (event) => {
    const newValue = event.target.value;

    // Set the value and exit edit mode
    await apiRef.current.setEditCellValue({ id, field, value: newValue }, event);
    apiRef.current.stopCellEditMode({ id, field });
  };

  const handleTextChange = (event) => {
    const newValue = event.target.value;

    // Set the value but do NOT stop editing
    apiRef.current.setEditCellValue({ id, field, value: newValue }, event);
  };

  if (type === 'singleSelect') {
    return (
      <GridEditSingleSelectCell {...props} onValueChange={handleSingleSelectChange} sx={{ padding: 0 }} />
    );
  }

  // Fallback to text editor (default for strings)
  return <GridEditInputCell {...props} onChange={handleTextChange} sx={{ padding: 0 }} />;
};

export default CustomSingleSelectEditCell;
