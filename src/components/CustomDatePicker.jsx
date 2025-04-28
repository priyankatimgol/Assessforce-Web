import { useContext, useState } from 'react';
import { FormHelperText, IconButton } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import ErrorIcon from '@mui/icons-material/Error';
import { useSelector } from 'react-redux';
import CalendarSVG from '../assets/customSVGIcons/CalendarSVG';
import { ThemeContext } from '../context/ThemeContext';

const CustomDatePicker = ({
  id = '',
  value,
  onChange,
  minDate,
  maxDate,
  isError,
  errorMessage,
  ...props
}) => {
  const { currentEnv } = useSelector((state) => state?.authenticationSlice);
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useContext(ThemeContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        views={['year', 'month', 'day']} // Allows selection of year, month, and day
        timezone={currentEnv?.time_zone}
        format={currentEnv?.date_format}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        componentsProps={{
          actionBar: {
            sx: {
              '& .MuiSvgIcon-root': {
                color: 'var(--primary-color)',
              },
            },
          },
        }}
        slotProps={{
          field: { clearable: true, onClear: () => {} },
          textField: {
            id: id,
            onClick: () => !props?.disabled && setIsOpen(true),
            sx: {
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'dark' ? 'var(--pure-color)' : 'var(--primary-color)',
              },
              '& .MuiInputBase-input': {
                cursor:  !props?.disabled && 'pointer',
              },
              width: '100%',
            },
            error: !!isError,
            inputProps: { readOnly: true },
            InputProps: {
              sx: {
                '& .MuiSvgIcon-root': {
                  color: !props?.disabled ? 'var(--primary-color)' : 'var(--muted-color)',
                },
                height: '3rem',
              },
            },
          },
        }}
        slots={{
          openPickerIcon: CalendarSVG,
          openPickerButton: (props) => <IconButton {...props} onClick={() => setIsOpen(true)} />,
        }}
        //shouldDisableDate={shouldDisableDate}
        {...props}
      />
      {isError && (
        <FormHelperText
          style={{ marginLeft: '0', color: 'var(--danger-color)', fontFamily: 'inter-regular' }}
          className="items-center"
        >
          <>
            <ErrorIcon fontSize="small" color="var(--danger-color)" style={{ marginRight: '.2rem' }} />
          </>
          {errorMessage}
        </FormHelperText>
      )}
    </LocalizationProvider>
  );
};

CustomDatePicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomDatePicker;
