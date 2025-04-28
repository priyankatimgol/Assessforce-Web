import { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from '../../context/ThemeContext';
import { Tooltip } from '@mui/material';

const ASButton = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon = null,
  endIcon = null,
  isLoading = false,
  fullWidth = false,
  children,
  tooltip,
  ...props
}) => {
  const { mode } = useContext(ThemeContext);
  const buttonAndIconColor =
    mode === 'dark' ? 'var(--pure-color)' : mode === 'light' ? 'var(--pure-color)' : 'var(--black-color)';

  return (
    <Tooltip title={tooltip? tooltip : null}>
      <Button
        variant={variant}
        color={color}
        size={size}
        startIcon={!isLoading ? startIcon : null}
        endIcon={!isLoading ? endIcon : null}
        fullWidth={fullWidth}
        disabled={isLoading}
        sx={{
          // color: mode === 'dark' ? 'var(--black-color)' : 'var(--pure-color)',
          '& span': {
            fontFamily: 'inter-medium', // Apply font to the button's text
            textTransform: 'capitalize',
          },
          backgroundColor: variant === 'contained' && 'var(--primary-color)',
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
            backgroundColor:
              variant === 'contained'
                ? mode === 'dark'
                  ? '#297FD5'
                  : '#174675'
                : mode === 'dark' && '#2574c20a',
            color: ['contained', 'outlined'].includes(variant) && buttonAndIconColor,
            '& .MuiButton-startIcon, & .MuiButton-endIcon': {
              color: buttonAndIconColor,
            },
          },
        }}
        {...props}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
      </Button>
    </Tooltip>
  );
};

ASButton.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
};

export default ASButton;
