import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';

const CustomButton = ({
  type = 'contained',
  children,
  disabled = false,
  loader = false,
  onClick,
  size = 'large',
  ...props
}) => {
  const { mode } = useContext(ThemeContext);

  const getButtonStyles = (type, disabled) => {
    if (disabled) {
      return {
        backgroundColor: type === 'outlined' ? 'transparent' : 'var(--disabled-color)',
        color: type === 'outlined' ? 'var(--disabled-color)' : 'var(--text-secondary-color)',
        borderColor: 'var(--disabled-color)',
        cursor: 'not-allowed',
        fontSize: '1rem',
        fontWeight: 500,
        fontFamily: 'inter-medium',
        textTransform: 'capitalize',
      };
    }

    if (loader) {
      return {
        backgroundColor: 'var(--primary-pressed)',
        color: 'var(--pure-color)',
        borderColor: 'var(--disabled-color)',
        cursor: 'not-allowed',
        fontSize: '1rem',
        fontWeight: 500,
        fontFamily: 'inter-medium',
        textTransform: 'capitalize',
      };
    }

    switch (type) {
      case 'contained':
        return {
          backgroundColor: 'var(--primary-color)',
          // color: 'var(--pure-color)',
          fontSize: '1rem',
          fontFamily: 'inter-medium',
          fontWeight: 500,
          textTransform: 'capitalize',
        };
      case 'outlined':
        return {
          // backgroundColor: 'transparent',
          border: '0.063rem solid var(--card-border-color)',
          // color: 'var(--primary-color)',
          fontSize: '1rem',
          fontFamily: 'inter-medium',
          fontWeight: 500,
          textTransform: 'capitalize',
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: '#333',
          fontSize: '1rem',
          fontFamily: 'inter-medium',
          fontWeight: 500,
        };
      default:
        return {
          backgroundColor: 'var(--primary-color)',
          color: 'var(--pure-color)',
          fontSize: '1rem',
          fontFamily: 'inter-medium',
          fontWeight: 500,
        };
    }
  };

  return (
    <Button
      variant={type}
      fullWidth
      size={size}
      disabled={disabled}
      {...props}
      sx={{
        marginBottom: '1rem',
        height: '3rem',
        fontFamily: 'inter-medium',
        boxShadow: 'none !important',
        ...getButtonStyles(type, disabled),
        ':hover': {
          boxShadow: 'none',
          backgroundColor:
            type === 'contained'
              ? !loader && mode === 'dark'
                ? '#297FD5'
                : '#174675'
              : mode === 'dark' && '#2574c20a',
          border: type === 'outlined' && '0.063rem solid var(--primary-color)',
          color:
            ['contained', 'outlined'].includes(type) && mode === 'dark'
              ? 'var(--pure-color)'
              : mode === 'light'
                ? type === 'outlined'
                  ? 'var(--primary-color)'
                  : 'var(--pure-color)'
                : 'var(--black-color)',
        },
        ':focus-visible': {
          border: '2px dashed var(--black-color)', // Dashed border on focus
          outline: 'none', // Prevent default focus outline
          transition: 'border 0.2s ease-in-out', // Smooth transition for border
        },
      }}
      // md={{
      //   marginBottom: '0',
      // }}
      className="customButtonStyle"
      onClick={() => !disabled && !loader && onClick()}
      // disableFocusRipple
      disableRipple
    >
      {loader ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.oneOf(['contained', 'outlined', 'text']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  loader: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default CustomButton;
