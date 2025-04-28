import { useContext } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/ThemeContext';

const Android12Switch = styled(Switch)((isChecked) => {
  return {
    padding: 8,
    width: '65px',
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      position: 'relative',
      backgroundColor: (() => {
        if (isChecked?.mode === 'dark') {
          return isChecked?.checked ? '#66bb6a' : '#ffffff29';
        } else {
          return isChecked?.checked ? '#2e7d32' : '#00000061';
        }
      })(),
      opacity: isChecked?.defaultExpanded && isChecked?.isDisabled ? '0.45 !important' : '1 !important',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        content: '"ON"',
        fontSize: '0.75rem',
        color: isChecked?.checked ? 'var(--pure-color)' : 'transparent',
        left: '6.5px',
        top: 12,
      },
      '&::after': {
        content: '"OFF"',
        fontSize: '0.75rem',
        color: !isChecked?.checked ? isChecked?.mode === 'dark' ? 'var(--xd-top-border)' : 'var(--pure-color)' : 'transparent',
        right: '12px',
        top: 12,
        fontFamily: 'inter-medium'
      },
    },
    // '& .Mui-checked + .MuiSwitch-track': {
    //   backgroundColor: isChecked?.mode === 'dark' ? '#66bb6a' : '#2e7d32' + ' !important',
    //   opacity: '1 !important',
    // },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: isChecked?.checked ? '2px 0 0 10px' : '2px 0 0 2px',
      transition: 'transform 0s',
    },
    '& .Mui-checked .MuiSwitch-thumb': {
    backgroundColor: 'var(--pure-color) !important',
  },
  };
});

const CustomSwitch = ({ checked, onChange, isDisabled, defaultExpanded }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <FormControlLabel
      control={
        <Android12Switch
          checked={checked}
          onChange={onChange}
          value={checked ? 'On' : 'Off'}
          color={checked ? 'success' : 'default'}
          size="medium"
          mode={mode}
          defaultExpanded={defaultExpanded}
          isDisabled={isDisabled}
        />
      }
      sx={{ marginRight: '-8px' }}
      disabled={isDisabled}
    />
  );
};

CustomSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
};

export default CustomSwitch;
