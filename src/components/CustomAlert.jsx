import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

const CustomAlert = ({ severity, message, icon, customIcon }) => {
  // If a custom icon is passed, use it; otherwise, use the default icon for the severity
  return (
    <Alert
      severity={severity}
      icon={customIcon || icon} // Set custom or default icon
      sx={{
        backgroundColor: '#FFF9F1',
        color: '#E65100',
        borderRadius: '6px',
        display: 'flex', // Ensures the content is centered
        alignItems: 'flex-start', // Vertically center the content
        // '& .MuiAlert-icon svg': {  // Target the SVG inside icon
        //   width: '16px',
        //   height: '16px'
        // }
      }}
    >
      {message}
    </Alert>
  );
};

CustomAlert.propTypes = {
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  customIcon: PropTypes.element, // Optional: Custom icon
  icon: PropTypes.element, // Default icon (optional)
};

CustomAlert.defaultProps = {
  icon: null, // Use default icon if not provided
  customIcon: null, // Custom icon is optional
};

export default CustomAlert;
