import {} from 'react';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

const FilterIcon = ({ ...props }) => {
  return (
    <SvgIcon style={{ color: 'currentColor' }} className='svg-effect' {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g>
          <path
            d="M9.1669 16.6693C8.93078 16.6693 8.73287 16.5894 8.57315 16.4297C8.41342 16.27 8.33356 16.072 8.33356 15.8359V10.8359L3.50023 4.66927C3.2919 4.39149 3.26065 4.09983 3.40648 3.79427C3.55231 3.48872 3.80579 3.33594 4.1669 3.33594H15.8336C16.1947 3.33594 16.4481 3.48872 16.594 3.79427C16.7398 4.09983 16.7086 4.39149 16.5002 4.66927L11.6669 10.8359V15.8359C11.6669 16.072 11.587 16.27 11.4273 16.4297C11.2676 16.5894 11.0697 16.6693 10.8336 16.6693H9.1669ZM10.0002 10.2526L14.1252 5.0026H5.87523L10.0002 10.2526Z"
            fill="currentColor"
            fillOpacity="1"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

FilterIcon.propTypes = {
  color: PropTypes.string,
};

export default FilterIcon;
