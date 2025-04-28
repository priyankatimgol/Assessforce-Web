import {} from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const OperationalIcon = ({ ...props }) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g mask="url(#mask0_18364_24308)">
          <path
            d="M10.2375 3.24431L12.75 5.25056H14.25C14.6625 5.25056 15.0156 5.39744 15.3094 5.69119C15.6031 5.98494 15.75 6.33806 15.75 6.75056V15.0006H2.25V6.75056C2.25 6.43806 2.3875 6.21306 2.6625 6.07556C2.9375 5.93806 3.2 5.96306 3.45 6.15056L5.25 7.50056L8.08125 3.54431C8.33125 3.19431 8.66875 2.98806 9.09375 2.92556C9.51875 2.86306 9.9 2.96931 10.2375 3.24431ZM3.75 8.25056V10.9506L6 12.7506L9 8.62556L14.25 12.7131V6.75056H12.225L9.3 4.40681L5.5875 9.61931L3.75 8.25056Z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

OperationalIcon.propTypes = {
  color: PropTypes.string,
};

export default OperationalIcon;
