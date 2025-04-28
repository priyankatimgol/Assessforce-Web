import { useId } from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const ASRadioButtonGroup = ({ name, options, row = true, onChange, value, defaultValue }) => {
  const uniqueId = useId();
  const inputId = `${name?.replaceAll(' ', '')}-${uniqueId}`;

  return (
    <FormControl>
      <RadioGroup
        row={row}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        htmlFor={inputId}
      >
        {options?.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled}
            className="mo-radio-label"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: 'var(--text-secondary-color)',
                fontFamily: 'inter-regular',
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

// Define PropTypes for the component
ASRadioButtonGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  row: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default ASRadioButtonGroup;
