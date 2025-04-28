import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const CustomIcons = ({ children, ...props }) => <SvgIcon {...props}>{children}</SvgIcon>;

CustomIcons.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomIcons;
