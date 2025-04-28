import { useId } from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const ASRadiobutton = ({
  label,
  options,
  name,
  value,
  onChange,
  row = false,
  labelStyle,
  radioStyle,
  groupStyle,
}) => {
  const uniqueId = useId();
  const inputId = `${label?.replaceAll(' ', '')}-${uniqueId}`;

  return (
    <FormControl component="fieldset" sx={groupStyle}>
      {label && (
        <FormLabel component="legend" sx={labelStyle} htmlFor={inputId}>
          {label}
        </FormLabel>
      )}
      <RadioGroup row={row} name={name} value={value} onChange={onChange} sx={{ marginTop: label ? 1 : 0 }}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio sx={radioStyle} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

ASRadiobutton.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  row: PropTypes.bool,
  labelStyle: PropTypes.object,
  radioStyle: PropTypes.object,
  groupStyle: PropTypes.object,
};

export default ASRadiobutton;
