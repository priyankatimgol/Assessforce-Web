import { useState } from 'react';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';

const CombinedFields = () => {
  const [title, setTitle] = useState('Mr.');
  const [name, setName] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <FormControl sx={{ width: '25rem' }}>
      <Grid container spacing={0} alignItems="center">
        {/* Select Component */}
        <Grid item>
          <FormControl>
            <Select
              value={title}
              onChange={handleTitleChange}
              displayEmpty
              variant="outlined"
              style={{ minWidth: 80, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Mr.">Mr.</MenuItem>
              <MenuItem value="Ms.">Ms.</MenuItem>
              <MenuItem value="Mrs.">Mrs.</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Text Field Component */}
        <Grid item xs>
          <TextField
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            placeholder="Enter your name"
            fullWidth
            InputProps={{
              style: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default CombinedFields;
