import {} from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const ManageColumnsIcon = ({ ...props }) => {
  return (
    <SvgIcon style={{ color: 'currentColor' }} className='svg-effect' {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g>
          <path
            d="M2.51953 14.1641V5.83073C2.51953 5.3724 2.68273 4.98003 3.00911 4.65365C3.3355 4.32726 3.72786 4.16406 4.1862 4.16406H15.832C16.2904 4.16406 16.6827 4.32726 17.0091 4.65365C17.3355 4.98003 17.4987 5.3724 17.4987 5.83073V14.1641C17.4987 14.6224 17.3355 15.0148 17.0091 15.3411C16.6827 15.6675 16.2904 15.8307 15.832 15.8307H4.1862C3.72786 15.8307 3.3355 15.6675 3.00911 15.3411C2.68273 15.0148 2.51953 14.6224 2.51953 14.1641ZM4.16536 14.1641H6.9362V5.83073H4.16536V14.1641ZM8.60286 14.1641H11.3737V5.83073H8.60286V14.1641ZM13.0404 14.1641H15.8112V5.83073H13.0404V14.1641Z"
            fill="currentColor"
            fillOpacity="1"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

ManageColumnsIcon.propTypes = {
  color: PropTypes.string,
};

export default ManageColumnsIcon;
