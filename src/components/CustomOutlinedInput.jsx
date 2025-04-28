import { OutlinedInput, FormControl, FormHelperText, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ErrorIcon from '@mui/icons-material/Error';
import { useContext, useId, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CustomOutlinedInput = ({
  id,
  type = 'text',
  label,
  isError,
  placeholder,
  style,
  isRequired = false,
  errorMessage,
  allowPaste = true,
  isErrorIcon = true,
  onlyMessage = false,
  // fieldType = 'text',
  maxLength = 128,
  multiline = false,
  settings,
  onChange,
  typeFromSettings = false,
  inputRef,
  ...props
}) => {
  const uniqueId = useId(); // Create a unique id for each input and label

  // Generate unique id for the label and input field
  const inputId = id || `${label?.replaceAll(' ', '')}-${uniqueId}`;
  const { mode } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState('');

  const { character_limit, decimal_points, comma_separated, negative_entry } = settings || {};

  const allowComma = comma_separated === '1';
  const allowNegative = negative_entry === '1';
  const decimalLimit = parseInt(decimal_points);
  const maxChars = parseInt(character_limit);

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (typeFromSettings && type === 'number') {
      value = value.replace(/[^0-9.-]/g, '');
      if (!allowNegative && value.includes('-')) {
        return;
      }

      const isNegative = value.startsWith('-');
      const hasAnotherHyphen = allowNegative ? value.slice(1).includes('-') : false;

      if (hasAnotherHyphen) {
        return;
      }

      if (hasAnotherHyphen) { // || value.includes(',')
        return; // Prevent input if extra '-' or ',' is detected
      }

      // Allow only one dot
      const dotCount = (value.match(/\./g) || []).length;
      if (dotCount > 1) {
        return;
      }

      if (allowNegative && isNegative) {
        value = '-' + value.replace(/-/g, '');
      } else {
        value = value.replace(/-/g, '');
      }

      const parts = value.split('.');
      const integerPart = parts[0] || '';
      const decimalPart = parts[1] || '';

      // If decimalLimit is set, ensure the integer part is restricted to maxChars - decimalLimit
      if (decimalLimit && maxChars) {
        const maxIntegerLength = maxChars - decimalLimit;

        if (integerPart.length > maxIntegerLength) {
          return;
        }
      }

      // Allow user to enter '.' only once
      if (parts.length > 2) {
        return;
      }
      
      // Limit decimal places based on decimalLimit
      if (decimalLimit && decimalPart.length > decimalLimit) {
        return;
      }
    }

    setInputValue(value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e) => {
    if (typeFromSettings && type === 'number') {
      let value = e.target.value.replace(/,/g, '');
      if (onChange) {
        onChange({ target: { value } });
      }
    }
  };

  return (
    <FormControl variant="outlined" fullWidth style={{ marginBottom: '8px' }}>
      {label && (
        <Typography className="input-label" component="label" htmlFor={inputId}>
          {label}
          {isRequired && <span>*</span>}
        </Typography>
      )}
      <OutlinedInput
        inputRef={inputRef}
        id={inputId}
        aria-label={inputId}
        type={typeFromSettings ? 'text' : type}
        placeholder={placeholder}
        error={isError}
        multiline={multiline}
        style={{
          borderRadius: isError ? '.3rem' : '.3rem',
          fontFamily: 'inter-regular',
          // border: isError ? '0.063rem solid var(--danger-color)' : '',
          ...style,
        }}
        inputProps={{
          style: {
            padding: type === 'textarea' ? 0 : '0.75rem 0.875rem',
            height: '1.5rem',
          },
          maxLength,
        }}
        sx={{
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // borderColor: isError ? 'transparent' : 'var(--primary-color)',
          },
          // '& .MuiOutlinedInput-notchedOutline': {
          //   borderColor: isError ? 'var(--danger-color)' : '',
          // },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: !isError && mode === 'dark' ? 'var(--pure-color)' : 'var(--primary-color-hover)',
          },
        }}
        onPaste={(e) => !allowPaste && e.preventDefault()}
        onKeyDown={(e) => {
          if (type === 'number') {
            let allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', '-', 'Delete'];
            let isNumber = /^[0-9]$/.test(e.key);

            //Allow user to type '.'.
            if (typeFromSettings) {
              allowedKeys?.push('.');
            }

            if (typeFromSettings && allowComma && e.key === ',') {
              isNumber = true;
            }

            if (!allowedKeys.includes(e.key) && !isNumber) {
              e.preventDefault();
            }
          }
        }}
        onChange={handleInputChange}
        onBlur={(e) => {
          let value = e.target.value;

          if (typeFromSettings && type === 'number' && decimalLimit && value) {
            if (!value.includes('.')) {
              value = `${value}.${'0'.repeat(decimalLimit)}`;
            } else {
              const [integerPart, decimalPart = ''] = value.split('.');
              value = `${integerPart}.${decimalPart.padEnd(decimalLimit, '0').slice(0, decimalLimit)}`;
            }

            // Add commas for thousands separator
            const [integerPart, decimalPart] = value.split('.');
            const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            value = `${formattedInteger}.${decimalPart}`;
          }

          setInputValue(value); // Update state to reflect in UI

          if (onChange) {
            onChange({ target: { value } }); // Ensure parent receives updated value
          }
        }}
        onFocus={handleFocus}
        {...props}
      />
      {isError && (
        <FormHelperText
          style={{
            marginLeft: '0',
            color: 'var(--danger-color)',
            fontFamily: 'inter-regular',
            alignItems: 'flex-start',
          }}
          className="items-center"
        >
          {isErrorIcon && (
            <>
              <ErrorIcon
                fontSize="small"
                color="var(--danger-color)"
                style={{ marginRight: '.2rem', color: 'var(--danger-color)' }}
              />
            </>
          )}
          {errorMessage}
        </FormHelperText>
      )}
      {onlyMessage && (
        <FormHelperText
          style={{ marginLeft: '0', color: 'var(--danger-color)', fontFamily: 'inter-regular' }}
          className="items-center"
        >
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CustomOutlinedInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isError: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowPaste: PropTypes.bool,
  isErrorIcon: PropTypes.bool,
  onlyMessage: PropTypes.bool,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  settings: PropTypes.any,
  onChange: PropTypes.func,
  typeFromSettings: PropTypes.bool,
  inputRef: PropTypes.any,
};

export default CustomOutlinedInput;
