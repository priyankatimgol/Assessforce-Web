import {} from 'react';
import { CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

const AppLoader = ({ size = 60, thickness = 4, color = 'primary' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--app-loader-bg)',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={size} thickness={thickness} color={color} />
    </Box>
  );
};

AppLoader.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  color: PropTypes.string,
};

export default AppLoader;
